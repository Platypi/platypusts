namespace plat.ui {
    'use strict';

    /**
     * @name Dom
     * @memberof plat.ui
     * @kind class
     *
     * @description
     * An extensible class dealing with the creation, deletion, and modification
     * of DOM.
     */
    export class Dom {
        protected static _inject: any = {
            _domEvents: __DomEvents,
        };

        /**
         * @name _domEvents
         * @memberof plat.ui.Dom
         * @kind property
         * @access protected
         *
         * @type {plat.ui.DomEvents}
         *
         * @description
         * Reference to the {@link plat.ui.DomEvents|DomEvents} injectable.
         */
        protected _domEvents: DomEvents = acquire(__DomEvents);

        /**
         * @name addEventListener
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Adds an event listener of the specified type to the specified element.
         *
         * @param {Window} element The window object.
         * @param {string} type The type of event to listen to.
         * @param {EventListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
         * of event propagation.
         *
         * @returns {plat.IRemoveListener} A function for removing the added event listener.
         */
        public addEventListener(
            element: Window | Node,
            type: string,
            listener: IGestureListener | EventListener,
            useCapture?: boolean
        ): IRemoveListener {
            return this._domEvents.addEventListener(
                element,
                type,
                listener,
                useCapture
            );
        }

        /**
         * @name appendChildren
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Takes a NodeList and either adds it to the passed in Node,
         * or creates a DocumentFragment and adds the NodeList to the
         * Fragment.
         *
         * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
         * @param {Node} root? An optional Node to append the nodeList.
         *
         * @returns {Node} The root Node or a DocumentFragment.
         */
        public appendChildren(nodeList: Node[] | NodeList, root?: Node): Node {
            return appendChildren(nodeList, root);
        }

        /**
         * @name cloneChildren
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Takes a NodeList, clones the nodes, and either adds it to the passed in Node,
         * or creates a DocumentFragment and adds the NodeList to the
         * Fragment.
         *
         * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
         * @param {Node} root? An optional Node to append the nodeList.
         *
         * @returns {Node} The root Node or a DocumentFragment.
         */
        public cloneChildren(nodeList: Node[] | NodeList, root?: Node): Node {
            return appendChildren(nodeList, root, true);
        }

        /**
         * @name clearNode
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Clears a DOM Node by removing all of its childNodes.
         *
         * @param {Node} node The DOM Node to clear.
         *
         * @returns {void}
         */
        public clearNode(node: Node): void {
            clearNode(node);
        }

        /**
         * @name clearNodeBlock
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Removes all the Nodes in the NodeList from the parent Node.
         *
         * @param {NodeList} nodeList The NodeList to remove from the parent Node.
         * @param {Node} parent? The parent Node used to remove the nodeList.
         *
         * @returns {void}
         */
        public clearNodeBlock(nodeList: Node[] | NodeList, parent?: Node): void;
        public clearNodeBlock(nodeList: any, parent?: Node): void {
            clearNodeBlock(nodeList, parent);
        }

        /**
         * @name setInnerHtml
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Sets the innerHTML of a Node. Can take in a Node rather than an Element
         * because it does not use innerHTML on the passed-in Node (it appends its
         * childNodes).
         *
         * @param {Node} node The Node to set innerHTML.
         * @param {string} html HTML string to be put inside the node.
         *
         * @returns {Node} The same node passed in, with innerHTML set.
         */
        public setInnerHtml(node: Node, html: string): Node {
            return setInnerHtml(node, html);
        }

        /**
         * @name insertBefore
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Inserts a Node before the designated end Node.
         *
         * @param {Node} parent The parent node into which to insert nodes.
         * @param {Node} node The Node to insert into the parent.
         * @param {Node} endNode? An optional endNode to use to insert nodes.
         *
         * @returns {Array<Node>} An Array copy of the fragment's childNodes.
         */
        public insertBefore(
            parent: Node,
            nodes: Node[] | NodeList | DocumentFragment | Node,
            endNode?: Node
        ): Node[] {
            return insertBefore(parent, nodes, endNode);
        }

        /**
         * @name replace
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Takes the child nodes of the given node and places them above the node
         * in the DOM. Then removes the given node.
         *
         * @param {Node} node The Node to replace.
         *
         * @returns {Array<Node>} A Node Array that represents the childNodes of the
         * given node.
         */
        public replace(node: Node): Node[] {
            return replace(node);
        }

        /**
         * @name replaceWith
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * Takes the childNodes of the given element and appends them to the newElement.
         * Then replaces the element in its parent's tree with the newElement.
         *
         * @param {Node} node The Node to remove from its parent.
         * @param {HTMLElement} newElement The HTMLElement to populate with childNodes and add to the
         * element's parent.
         *
         * @returns {HTMLElement} The replaced element (newElement).
         */
        public replaceWith(node: Node, newElement: HTMLElement): HTMLElement;
        /**
         * @name replaceWith
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * Takes the childNodes of the given element and appends them to the newElement.
         * Then replaces the element in its parent's tree with the newElement.
         *
         * @param {Node} node The Node to remove from its parent.
         * @param {Element} newElement The Element to populate with childNodes and add to the
         * element's parent.
         *
         * @returns {Element} The replaced element (newElement).
         */
        public replaceWith(node: Node, newElement: Element): Element;
        /**
         * @name replaceWith
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 2
         *
         * @description
         * Takes the childNodes of the given element and appends them to the newElement.
         * Then replaces the element in its parent's tree with the newElement.
         *
         * @param {Node} node The Node to remove from its parent.
         * @param {Node} newElement The Node to populate with childNodes and add to the
         * element's parent.
         *
         * @returns {Node} The replaced element (newElement).
         */
        public replaceWith(node: Node, newNode: Node): Node;
        public replaceWith(node: any, newNode: any): any {
            return replaceWith(node, newNode);
        }

        /**
         * @name serializeHtml
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Takes in a string representing innerHTML and returns a DocumentFragment
         * containing the serialized DOM.
         *
         * @param {string} html The DOM string.
         *
         * @returns {DocumentFragment} The serialized DOM.
         */
        public serializeHtml(html: string): DocumentFragment {
            return serializeHtml(html);
        }

        /**
         * @name removeBetween
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Takes in a startNode and endNode, each having the same parentNode.
         * Removes every node in between the startNode.  If endNode is not specified,
         * DOM will be removed until the end of the parentNode's children.
         *
         * @param {Node} startNode The starting node, which will not be removed.
         * @param {Node} endNode The ending node, which will not be removed.
         *
         * @returns {void}
         */
        public removeBetween(startNode: Node, endNode?: Node): void {
            removeBetween(startNode, endNode);
        }

        /**
         * @name removeAll
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Takes in a startNode and endNode, each having the same parentNode.
         * Removes every node in between the startNode and endNode as well as
         * the startNode and the endNode.  If endNode is not specified, DOM
         * will be removed until the end of the parentNode's children.
         *
         * @param {Node} startNode The first node to remove.
         * @param {Node} endNode The last node to remove.
         *
         * @returns {void}
         */
        public removeAll(startNode: Node, endNode?: Node): void {
            removeAll(startNode, endNode);
        }

        /**
         * @name addClass
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Adds a class or multiple classes to the specified element.
         *
         * @param {Element} element The element to which the class name is being added.
         * @param {string} className The class name or space delimited class names to add to the element.
         *
         * @returns {void}
         */
        public addClass(element: Element, className: string): void {
            addClass(<HTMLElement>element, className);
        }

        /**
         * @name removeClass
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Removes a class or multiple classes from the specified element.
         *
         * @param {Element} element The element from which the class name is being removed.
         * @param {string} className The class name or space delimited class names to remove from the element.
         *
         * @returns {void}
         */
        public removeClass(element: Element, className: string): void {
            removeClass(<HTMLElement>element, className);
        }

        /**
         * @name toggleClass
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Toggles a class or multiple classes from the specified element.
         *
         * @param {Element} element The element on which the class name is being toggled.
         * @param {string} className The class name or space delimited class names to toggle on the element.
         *
         * @returns {void}
         */
        public toggleClass(element: Element, className: string): void {
            toggleClass(<HTMLElement>element, className);
        }

        /**
         * @name replaceClass
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Replaces a single class with another class.
         *
         * @param {Element} element The element on which the class name is being toggled.
         * @param {string} oldClass The class name being replaced.
         * @param {string} newClass The class name doing the replacing.
         *
         * @returns {void}
         */
        public replaceClass(
            element: Element,
            oldClass: string,
            newClass: string
        ): void {
            replaceClass(<HTMLElement>element, oldClass, newClass);
        }

        /**
         * @name hasClass
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Returns whether or not an element has a particular class or classes assigned to it.
         *
         * @param {Element} element The element on which the class name is being checked.
         * @param {string} className The class name or space delimited class names to check on the element.
         *
         * @returns {boolean} Whether or not the element has the class name or all of the class names
         * specified in the className argument.
         */
        public hasClass(element: Element, className: string): boolean {
            return hasClass(<HTMLElement>element, className);
        }

        /**
         * @name getTemplate
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Retrieves and serializes HTML from an HTML template file using ajax. Will facilitate caching the template
         * as well.
         *
         * @param {string} templateUrl The url where the HTML template is stored.
         *
         * @returns {plat.async.Promise<DocumentFragment>} A thenable that will resolve with the template, serialized as a
         * DocumentFragment.
         */
        public getTemplate(
            templateUrl: string
        ): async.Promise<DocumentFragment> {
            return getTemplate(templateUrl);
        }

        /**
         * @name whenPresent
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Inspects the Element and resolves when the Element is present in the DOM body.
         *
         * @param {() => void} cb A callback that will fire when the element is present in the DOM body.
         * @param {Element} element The element whose presence is being inspected.
         *
         * @returns {plat.IRemoveListener} A function to stop listening for the element to be placed in the DOM.
         */
        public whenPresent(cb: () => void, element: Element): IRemoveListener {
            return whenPresent(cb, element);
        }

        /**
         * @name whenVisible
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         *
         * @description
         * Inspects the Element and resolves when the Element is visible in the DOM.
         *
         * @param {() => void} cb A callback that will fire when the element is visible in the DOM.
         * @param {Element} element The element whose visibility is being inspected.
         *
         * @returns {plat.IRemoveListener} A function to stop listening for the element to become visible.
         */
        public whenVisible(cb: () => void, element: Element): IRemoveListener {
            return whenVisible(cb, element);
        }
    }

    register.injectable(__Dom, Dom);

    /**
     * @name ICustomElementProperty
     * @memberof plat.ui
     * @kind interface
     *
     * @extends {plat.IObject<string>}
     *
     * @description
     * An object describing custom element properties added to elements for hashing purposes.
     */
    export interface ICustomElementProperty extends IObject<string> {
        /**
         * @name domEvent
         * @memberof plat.ui.ICustomElementProperty
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * A unique id given to the element if it's registered for a custom DOM event.
         */
        domEvent?: string;

        /**
         * @name animation
         * @memberof plat.ui.ICustomElementProperty
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * A unique id given to the element if it's registered for an animation.
         */
        animation?: string;
    }

    /**
     * @name ICustomElement
     * @memberof plat.ui
     * @kind interface
     *
     * @extends {HTMLElement}
     *
     * @description
     * An interface for describing an Element with an ICustomElementProperty attached. Primarily
     * used for element interaction with {@link plat.ui.DomEvents|DomEvents} and the
     * {@link plat.ui.animations.Animator|Animator}.
     */
    export interface ICustomElement extends HTMLElement {
        /**
         * @name __plat
         * @memberof plat.ui.ICustomElementProperty
         * @kind property
         * @access public
         *
         * @type {plat.ui.ICustomElementProperty}
         *
         * @description
         * The PlatypusTS custom element property.
         */
        __plat: ICustomElementProperty;
    }
}
