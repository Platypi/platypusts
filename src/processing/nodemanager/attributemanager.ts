namespace plat.processing {
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
        public element: HTMLElement;

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
        public node: INode;

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
        public parent: ui.TemplateControl;

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
        public replace: boolean;

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
        public attributeChanged: () => void;

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
        protected _controls: Control[];

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
        protected _bindingExpressions: expressions.IParsedExpression[];

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
        public static getInstance(): AttributeManager {
            const manager = new AttributeManager();
            manager._NodeManager = <INodeManagerStatic>acquire(
                __NodeManagerStatic
            );

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
        public initialize(
            element: Element,
            node: INode,
            parent: ui.TemplateControl,
            controls: Control[],
            replace?: boolean
        ): void {
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
            const node = this.node;
            const attr: Attr = <Attr>node.node;
            const nodeManager = this._NodeManager;
            const last = this._lastValues;
            const element: HTMLElement = this.element;
            let nodeValue = attr.value;
            let classes = nodeManager
                .build(node.expressions, this.parent)
                .trim()
                .split(/\s+/);
            let c: string;
            let length = classes.length;
            let i: number;

            if (nodeManager.hasMarkup(nodeValue)) {
                const startLength = __startSymbol.length;
                const endLength = __endSymbol.length;
                const endChar = __endSymbol[endLength - 1];
                let start: number = nodeValue.indexOf(__startSymbol);
                let end: number = nodeValue.indexOf(__endSymbol);

                while (start !== -1 && end !== -1) {
                    // increment with while loop instead of just += 2 for nested object literal case.
                    while (
                        nodeValue[end] !== endChar ||
                        nodeValue[end + 1] === endChar
                    ) {
                        end += 1;
                    }

                    nodeValue = `${nodeValue
                        .slice(0, start)
                        .trim()} ${nodeValue.slice(end).trim()}`;
                    start = nodeValue.indexOf(__startSymbol);
                    end = nodeValue.indexOf(__endSymbol);
                }

                attr.value = nodeValue.trim();
            }

            for (i = 0; i < length; i += 1) {
                last[classes[i]] = true;
            }

            classes = Object.keys(last);
            length = classes.length;

            for (i = 0; i < length; i += 1) {
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
            const controls = this._controls;
            const node = this.node;
            const key = camelCase(node.nodeName);
            const value = this._NodeManager.build(
                node.expressions,
                this.parent
            );

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
            const controls = this._controls;
            const length = controls.length;
            let attributes: ui.Attributes;
            let oldValue: any;

            for (let i = 0; i < length; i += 1) {
                attributes = controls[i].attributes;
                oldValue = attributes[key];
                attributes[key] = value;

                (<any>attributes)._attributeChanged(key, value, oldValue);
            }
        }
    }
}
