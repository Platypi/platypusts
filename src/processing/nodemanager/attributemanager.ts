module plat.processing {

    /**
     * @name AttributeManager
     * @memberof plat.processing
     * @kind class
     *
     * @description
     * Used to facilitate observing expressions on attributes. Has the ability to alert {@link plat.ui.Attributes|Attributes}
     * with changes. Handles dynamic and static attributes (dynamic meaning "class"-like attributes).
     */
    export class AttributeManager {
        /**
         * @name element
         * @memberof plat.processing.AttributeManager
         * @kind property
         * @access public
         *
         * @type {HTMLElement}
         *
         * @description
         * The element that contains the attribute for this manager.
         */
        element: HTMLElement;

        /**
         * @name node
         * @memberof plat.processing.AttributeManager
         * @kind property
         * @access public
         *
         * @type {plat.processing.INode}
         *
         * @description
         * The {@link plat.processing.INode|INode} that contains the attribute for this manager.
         */
        node: INode;

        /**
         * @name parent
         * @memberof plat.processing.AttributeManager
         * @kind property
         * @access public
         *
         * @type {plat.ui.TemplateControl}
         *
         * @description
         * The parent control for the controls associated with this manager.
         */
        parent: ui.TemplateControl;

        /**
         * @name replace
         * @memberof plat.processing.AttributeManager
         * @kind property
         * @access public
         *
         * @type {boolean}
         *
         * @description
         * Whether or not the element that contains this attribute is replaced in the DOM.
         */
        replace: boolean;

        /**
         * @name attributeChanged
         * @memberof plat.processing.AttributeManager
         * @kind property
         * @access public
         *
         * @type {() => void}
         *
         * @description
         * The public interface for sending notifications of changes to this attribute.
         */
        attributeChanged: () => void;

        /**
         * @name _NodeManager
         * @memberof plat.processing.AttributeManager
         * @kind property
         * @access protected
         *
         * @type {plat.processing.INodeManagerStatic}
         *
         * @description
         * Reference to the {@link plat.processing.INodeManagerStatic|INodeManagerStatic} injectable.
         */
        protected _NodeManager: INodeManagerStatic;

        /**
         * @name _controls
         * @memberof plat.processing.AttributeManager
         * @kind property
         * @access protected
         *
         * @type {Array<plat.Control>}
         *
         * @description
         * The controls which need to be notified of changes to this attribute.
         */
        protected _controls: Array<Control>;

        /**
         * @name _bindingExpressions
         * @memberof plat.processing.AttributeManager
         * @kind property
         * @access protected
         *
         * @type {Array<plat.expressions.IParsedExpression>}
         *
         * @description
         * The filtered expressions for a "dynamic" attribute.
         */
        protected _bindingExpressions: Array<expressions.IParsedExpression>;

        /**
         * @name _lastValues
         * @memberof plat.processing.AttributeManager
         * @kind property
         * @access protected
         *
         * @type {plat.IObject<boolean>}
         *
         * @description
         * Keeps track of the previous bound values of a "dynamic" attribute.
         */
        protected _lastValues: IObject<boolean> = {};

        /**
         * @name getInstance
         * @memberof plat.processing.AttributeManager
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Returns a new instance of an AttributeManager.
         *
         * @returns {plat.processing.AttributeManager}
         */
        static getInstance(): AttributeManager {
            let manager = new AttributeManager();
            manager._NodeManager = <INodeManagerStatic>acquire(__NodeManagerStatic);
            return manager;
        }

        /**
         * @name initialize
         * @memberof plat.processing.AttributeManager
         * @kind function
         * @access public
         *
         * @description
         * Initializes the manager and determines what method should be used to handle attribute changes.
         *
         * @param {HTMLElement} element The element that contains this attribute.
         * @param {plat.processing.INode} node The INode associated with this attribute.
         * @param {plat.ui.TemplateControl} parent The parent control for all the controls associated with
         * the element.
         * @param {Array<plat.Control>} controls The controls associated with the element.
         * @param {boolean} replace? Whether or not the element is replaced.
         *
         * @returns {void}
         */
        initialize(element: Element, node: INode, parent: ui.TemplateControl, controls: Array<Control>, replace?: boolean): void {
            this.element = <HTMLElement>element;
            this.node = node;
            this.parent = parent;
            this._controls = controls;
            this.replace = replace;

            if (node.nodeName !== __CLASS) {
                this.attributeChanged = this._staticAttributeChanged;
            } else {
                this.attributeChanged = this._dynamicAttributeChanged;
            }
        }

        /**
         * @name _dynamicAttributeChanged
         * @memberof plat.processing.AttributeManager
         * @kind function
         * @access protected
         *
         * @description
         * Handles changes to dynamic attributes. Takes into account that the attribute may have been changed programmatically, and
         * we need to only mutate the piece of the attribute corresponding to expressions with markup.
         *
         * @returns {void}
         */
        protected _dynamicAttributeChanged(): void {
            let node = this.node,
                attr: Attr = <Attr>node.node,
                nodeManager = this._NodeManager,
                nodeValue = attr.value,
                classes = nodeManager.build(node.expressions, this.parent).trim().split(/\s+/),
                last = this._lastValues,
                element: HTMLElement = this.element,
                c: string,
                length = classes.length,
                i: number;

            if (nodeManager.hasMarkup(nodeValue)) {
                let start: number,
                    end: number,
                    startLength = __startSymbol.length,
                    endLength = __endSymbol.length,
                    endChar = __endSymbol[endLength - 1];

                while ((start = nodeValue.indexOf(__startSymbol)) !== -1 && (end = nodeValue.indexOf(__endSymbol)) !== -1) {
                    // incremement with while loop instead of just += 2 for nested object literal case.
                    while (nodeValue[end++] !== endChar || nodeValue[end] === endChar) { }

                    nodeValue = nodeValue.slice(0, start).trim() + ' ' + nodeValue.slice(end).trim();
                }

                attr.value = nodeValue.trim();
            }

            for (i = 0; i < length; ++i) {
                last[classes[i]] = true;
            }

            classes = Object.keys(last);
            length = classes.length;

            for (i = 0; i < length; ++i) {
                c = classes[i];
                if (last[c]) {
                    addClass(element, c);
                    last[c] = false;
                } else {
                    deleteProperty(last, c);
                    removeClass(element, c);
                }
            }

            this._notifyAttributes(node.nodeName, attr.value);
        }

        /**
         * @name _staticAttributeChanged
         * @memberof plat.processing.AttributeManager
         * @kind function
         * @access protected
         *
         * @description
         * Handles changes to static attributes. Builds a string from the node expressions, then sets the attribute value
         * and notifies the associated {@link plat.ui.Attributes|Attributes}.
         *
         * @returns {void}
         */
        protected _staticAttributeChanged(): void {
            let controls = this._controls,
                node = this.node,
                key = camelCase(node.nodeName),
                value = this._NodeManager.build(node.expressions, this.parent);

            this._notifyAttributes(key, value);

            if (!this.replace) {
                (<Attr>node.node).value = value;
            }
        }

        /**
         * @name _notifyAttributes
         * @memberof plat.processing.AttributeManager
         * @kind function
         * @access protected
         *
         * @description
         * Notifies the necessary {@link plat.ui.Attributes|Attributes} of changes to an attribute.
         *
         * @returns {void}
         */
        protected _notifyAttributes(key: string, value: any): void {
            let controls = this._controls,
                length = controls.length,
                attributes: ui.Attributes,
                oldValue: any;

            for (var i = 0; i < length; ++i) {
                attributes = <ui.Attributes>controls[i].attributes;
                oldValue = attributes[key];
                attributes[key] = value;

                (<any>attributes)._attributeChanged(key, value, oldValue);
            }
        }
    }
}
