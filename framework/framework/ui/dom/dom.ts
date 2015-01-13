module plat.ui {
    /**
     * @name Dom
     * @memberof plat.ui
     * @kind class
     * 
     * @implements {plat.ui.IDom}
     * 
     * @description
     * An extensible class dealing with the creation, deletion, and modification 
     * of DOM.
     */
    export class Dom implements IDom {
        /**
         * @name _domEvents
         * @memberof plat.ui.Dom
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.IDomEvents}
         * 
         * @description
         * Reference to the {@link plat.ui.IDomEvents|IDomEvents} injectable.
         */
        protected _domEvents: ui.IDomEvents = acquire(__DomEvents);

        /**
         * @name addEventListener
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Adds an event listener of the specified type to the specified element.
         * 
         * @param {Node} element The element to add the event listener to.
         * @param {string} type The type of event to listen to.
         * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         * 
         * @returns {plat.IRemoveListener} A function for removing the added event listener.
         */
        addEventListener(element: Node, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * @name addEventListener
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Adds an event listener of the specified type to the specified element.
         * 
         * @param {Window} element The window object.
         * @param {string} type The type of event to listen to.
         * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         * 
         * @returns {plat.IRemoveListener} A function for removing the added event listener.
         */
        addEventListener(element: Window, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * @name addEventListener
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Adds an event listener of the specified type to the specified element.
         * 
         * @param {Node} element The element to add the event listener to.
         * @param {string} type The type of event to listen to.
         * @param {EventListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         * 
         * @returns {plat.IRemoveListener} A function for removing the added event listener.
         */
        addEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        /**
         * @name addEventListener
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 3
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
        addEventListener(element: Window, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        addEventListener(element: any, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener {
            return this._domEvents.addEventListener(element, type, listener, useCapture);
        }

        /**
         * @name appendChildren
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Takes a Node Array and creates a DocumentFragment and adds the nodes to the Fragment.
         * 
         * @param {Array<Node>} nodeList A Node Array to be appended to the DocumentFragment
         * 
         * @returns {DocumentFragment} A DocumentFragment.
         */
        appendChildren(nodeList: Array<Node>): DocumentFragment;
        /**
         * @name appendChildren
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Takes a NodeList and creates a DocumentFragment and adds the NodeList to the Fragment.
         * 
         * @param {NodeList} nodeList A NodeList to be appended to the DocumentFragment
         * 
         * @returns {DocumentFragment} A DocumentFragment.
         */
        appendChildren(nodeList: NodeList): DocumentFragment;
        /**
         * @name appendChildren
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Takes a Node Array and either adds it to the passed in Node,
         * or creates a DocumentFragment and adds the nodes to the
         * Fragment.
         * 
         * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
         * @param {Node} root? An optional Node to append the nodeList.
         * 
         * @returns {Node} The root Node or a DocumentFragment.
         */
        appendChildren(nodeList: Array<Node>, root?: Node): Node;
        /**
         * @name appendChildren
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 3
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
        appendChildren(nodeList: NodeList, root?: Node): Node;
        appendChildren(nodeList: any, root?: Node): any {
            return appendChildren(nodeList, root);
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
        clearNode(node: Node): void {
            return clearNode(node);
        }

        /**
         * @name clearNodeBlock
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Removes all the Nodes in the Array from the parent Node.
         * 
         * @param {Array<Node>} nodeList The Node Array to remove from the parent Node.
         * @param {Node} parent? The parent Node used to remove the nodeList.
         * 
         * @returns {void}
         */
        clearNodeBlock(nodeList: Array<Node>, parent?: Node): void;
        /**
         * @name clearNodeBlock
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Removes all the Nodes in the NodeList from the parent Node.
         * 
         * @param {NodeList} nodeList The NodeList to remove from the parent Node.
         * @param {Node} parent? The parent Node used to remove the nodeList.
         * 
         * @returns {void}
         */
        clearNodeBlock(nodeList: NodeList, parent?: Node): void;
        clearNodeBlock(nodeList: any, parent?: Node): void {
            return clearNodeBlock(nodeList, parent);
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
        setInnerHtml(node: Node, html: string): Node {
            return setInnerHtml(node, html);
        }

        /**
         * @name insertBefore
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Inserts a list of Nodes before the designated end Node.
         * 
         * @param {Node} parent The parent node into which to insert nodes.
         * @param {Array<Node>} nodes The Node Array to insert into the parent.
         * @param {Node} endNode? An optional endNode to use to insert nodes.
         * 
         * @returns {Array<Node>} An Array copy of the nodes.
         */
        insertBefore(parent: Node, nodes: Array<Node>, endNode?: Node): Array<Node>;
        /**
         * @name insertBefore
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Inserts a list of Nodes before the designated end Node.
         * 
         * @param {Node} parent The parent node into which to insert nodes.
         * @param {NodeList} nodes The NodeList to insert into the parent.
         * @param {Node} endNode? An optional endNode to use to insert nodes.
         * 
         * @returns {Array<Node>} An Array copy of the nodes.
         */
        insertBefore(parent: Node, nodes: NodeList, endNode?: Node): Array<Node>;
        /**
         * @name insertBefore
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Inserts a DocumentFragment before the designated end Node.
         * 
         * @param {Node} parent The parent node into which to insert nodes.
         * @param {DocumentFragment} fragment The DocumentFragment to insert into the parent.
         * @param {Node} endNode? An optional endNode to use to insert nodes.
         * 
         * @returns {Array<Node>} An Array copy of the fragment's childNodes.
         */
        insertBefore(parent: Node, fragment: DocumentFragment, endNode?: Node): Array<Node>;
        /**
         * @name insertBefore
         * @memberof plat.ui.Dom
         * @kind function
         * @access public
         * @variation 3
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
        insertBefore(parent: Node, node: Node, endNode?: Node): Array<Node>;
        insertBefore(parent: Node, nodes: any, endNode?: Node): Array<Node> {
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
        replace(node: Node): Array<Node> {
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
        replaceWith(node: Node, newElement: HTMLElement): HTMLElement;
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
        replaceWith(node: Node, newElement: Element): Element;
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
        replaceWith(node: Node, newNode: Node): Node;
        replaceWith(node: any, newNode: any): any {
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
        serializeHtml(html: string): DocumentFragment {
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
        removeBetween(startNode: Node, endNode?: Node): void {
            return removeBetween(startNode, endNode);
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
        removeAll(startNode: Node, endNode?: Node): void {
            return removeAll(startNode, endNode);
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
        addClass(element: Element, className: string): void {
            return addClass(<HTMLElement>element, className);
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
        removeClass(element: Element, className: string): void {
            return removeClass(<HTMLElement>element, className);
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
        toggleClass(element: Element, className: string): void {
            return toggleClass(<HTMLElement>element, className);
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
        replaceClass(element: Element, oldClass: string, newClass: string): void {
            return replaceClass(<HTMLElement>element, oldClass, newClass);
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
        hasClass(element: Element, className: string): boolean {
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
         * @returns {plat.async.IThenable<DocumentFragment>} A thenable that will resolve with the template, serialized as a 
         * DocumentFragment.
         */
        getTemplate(templateUrl: string): async.IThenable<DocumentFragment> {
            return getTemplate(templateUrl);
        }
    }

    /**
     * The Type for referencing the '_dom' injectable as a dependency.
     */
    export function IDom(): IDom {
        return new Dom();
    }

    register.injectable(__Dom, IDom);

    /**
     * @name IDom
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * An object that deals with the creation, deletion, and modification 
     * of DOM.
     */
    export interface IDom {
        /**
         * @name addEventListener
         * @memberof plat.ui.IDom
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Adds an event listener of the specified type to the specified element.
         * 
         * @param {Node} element The element to add the event listener to.
         * @param {string} type The type of event to listen to.
         * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         * 
         * @returns {plat.IRemoveListener} A function for removing the added event listener.
         */
        addEventListener(element: Node, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * @name addEventListener
         * @memberof plat.ui.IDom
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Adds an event listener of the specified type to the specified element.
         * 
         * @param {Window} element The window object.
         * @param {string} type The type of event to listen to.
         * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         * 
         * @returns {plat.IRemoveListener} A function for removing the added event listener.
         */
        addEventListener(element: Window, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * @name addEventListener
         * @memberof plat.ui.IDom
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Adds an event listener of the specified type to the specified element.
         * 
         * @param {Node} element The element to add the event listener to.
         * @param {string} type The type of event to listen to.
         * @param {EventListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         * 
         * @returns {plat.IRemoveListener} A function for removing the added event listener.
         */
        addEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        /**
         * @name addEventListener
         * @memberof plat.ui.IDom
         * @kind function
         * @access public
         * @variation 3
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
        addEventListener(element: Window, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;

        /**
         * @name appendChildren
         * @memberof plat.ui.IDom
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Takes a Node Array and creates a DocumentFragment and adds the nodes to the Fragment.
         * 
         * @param {Array<Node>} nodeList A Node Array to be appended to the DocumentFragment
         * 
         * @returns {DocumentFragment} A DocumentFragment.
         */
        appendChildren(nodeList: Array<Node>): DocumentFragment;
        /**
         * @name appendChildren
         * @memberof plat.ui.IDom
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Takes a NodeList and creates a DocumentFragment and adds the NodeList to the Fragment.
         * 
         * @param {NodeList} nodeList A NodeList to be appended to the DocumentFragment
         * 
         * @returns {DocumentFragment} A DocumentFragment.
         */
        appendChildren(nodeList: NodeList): DocumentFragment;
        /**
         * @name appendChildren
         * @memberof plat.ui.IDom
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Takes a Node Array and either adds it to the passed in Node,
         * or creates a DocumentFragment and adds the nodes to the
         * Fragment.
         * 
         * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
         * @param {Node} root? An optional Node to append the nodeList.
         * 
         * @returns {Node} The root Node or a DocumentFragment.
         */
        appendChildren(nodeList: Array<Node>, root?: Node): Node;
        /**
         * @name appendChildren
         * @memberof plat.ui.IDom
         * @kind function
         * @access public
         * @variation 3
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
        appendChildren(nodeList: NodeList, root?: Node): Node;

        /**
         * @name clearNode
         * @memberof plat.ui.IDom
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
        clearNode(node: Node): void;

        /**
         * @name clearNodeBlock
         * @memberof plat.ui.IDom
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Removes all the Nodes in the Array from the parent Node.
         * 
         * @param {Array<Node>} nodeList The Node Array to remove from the parent Node.
         * @param {Node} parent? The parent Node used to remove the nodeList.
         * 
         * @returns {void}
         */
        clearNodeBlock(nodeList: Array<Node>, parent?: Node): void;
        /**
         * @name clearNodeBlock
         * @memberof plat.ui.IDom
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Removes all the Nodes in the NodeList from the parent Node.
         * 
         * @param {NodeList} nodeList The NodeList to remove from the parent Node.
         * @param {Node} parent? The parent Node used to remove the nodeList.
         * 
         * @returns {void}
         */
        clearNodeBlock(nodeList: NodeList, parent?: Node): void;

        /**
         * @name setInnerHtml
         * @memberof plat.ui.IDom
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
        setInnerHtml(node: Node, html: string): Node;

        /**
         * @name insertBefore
         * @memberof plat.ui.IDom
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Inserts a list of Nodes before the designated end Node.
         * 
         * @param {Node} parent The parent node into which to insert nodes.
         * @param {Array<Node>} nodes The Node Array to insert into the parent.
         * @param {Node} endNode? An optional endNode to use to insert nodes.
         * 
         * @returns {Array<Node>} An Array copy of the nodes.
         */
        insertBefore(parent: Node, nodes: Array<Node>, endNode?: Node): Array<Node>;
        /**
         * @name insertBefore
         * @memberof plat.ui.IDom
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Inserts a list of Nodes before the designated end Node.
         * 
         * @param {Node} parent The parent node into which to insert nodes.
         * @param {NodeList} nodes The NodeList to insert into the parent.
         * @param {Node} endNode? An optional endNode to use to insert nodes.
         * 
         * @returns {Array<Node>} An Array copy of the nodes.
         */
        insertBefore(parent: Node, nodes: NodeList, endNode?: Node): Array<Node>;
        /**
         * @name insertBefore
         * @memberof plat.ui.IDom
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Inserts a DocumentFragment before the designated end Node.
         * 
         * @param {Node} parent The parent node into which to insert nodes.
         * @param {DocumentFragment} fragment The DocumentFragment to insert into the parent.
         * @param {Node} endNode? An optional endNode to use to insert nodes.
         * 
         * @returns {Array<Node>} An Array copy of the fragment's childNodes.
         */
        insertBefore(parent: Node, fragment: DocumentFragment, endNode?: Node): Array<Node>;
        /**
         * @name insertBefore
         * @memberof plat.ui.IDom
         * @kind function
         * @access public
         * @variation 3
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
        insertBefore(parent: Node, node: Node, endNode?: Node): Array<Node>;

        /**
         * @name replace
         * @memberof plat.ui.IDom
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
        replace(node: Node): Array<Node>;

        /**
         * @name replaceWith
         * @memberof plat.ui.IDom
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
        replaceWith(node: Node, newElement: HTMLElement): HTMLElement;
        /**
         * @name replaceWith
         * @memberof plat.ui.IDom
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
        replaceWith(node: Node, newElement: Element): Element;
        /**
         * @name replaceWith
         * @memberof plat.ui.IDom
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
        replaceWith(node: Node, newNode: Node): Node;

        /**
         * @name serializeHtml
         * @memberof plat.ui.IDom
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
        serializeHtml(html?: string): DocumentFragment;

        /**
         * @name removeBetween
         * @memberof plat.ui.IDom
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
        removeBetween(startNode: Node, endNode?: Node): void;

        /**
         * @name removeAll
         * @memberof plat.ui.IDom
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
        removeAll(startNode: Node, endNode?: Node): void;

        /**
         * @name addClass
         * @memberof plat.ui.IDom
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
        addClass(element: Element, className: string): void;

        /**
         * @name removeClass
         * @memberof plat.ui.IDom
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
        removeClass(element: Element, className: string): void;

        /**
         * @name toggleClass
         * @memberof plat.ui.IDom
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
        toggleClass(element: Element, className: string): void;

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
        replaceClass(element: Element, oldClass: string, newClass: string): void;

        /**
         * @name hasClass
         * @memberof plat.ui.IDom
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
        hasClass(element: Element, className: string): boolean;

        /**
         * @name getTemplate
         * @memberof plat.ui.IDom
         * @kind function
         * @access public
         * 
         * @description
         * Retrieves and serializes HTML from an HTML template file using ajax. Will facilitate caching the template 
         * as well.
         * 
         * @param {string} templateUrl The url where the HTML template is stored.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} A thenable that will resolve with the template, serialized as a 
         * DocumentFragment.
         */
        getTemplate(templateUrl: string): async.IThenable<DocumentFragment>;
    }

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
