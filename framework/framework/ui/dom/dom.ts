module plat.ui {
    /**
     * An extensible class dealing with the creation, deletion, and modification 
     * of DOM.
     */
    export class Dom implements IDom {
        $DomEvents: ui.IDomEvents = acquire(__DomEvents);

        addEventListener(element: Node, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        addEventListener(element: Window, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        addEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        addEventListener(element: Window, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        addEventListener(element: any, type: string, listener: ui.IGestureListener, useCapture?: boolean) {
            return this.$DomEvents.addEventListener(element, type, listener, useCapture);
        }

        appendChildren(nodeList: Array<Node>): DocumentFragment;
        appendChildren(nodeList: NodeList): DocumentFragment;
        appendChildren(nodeList: Array<Node>, root?: Node): Node;
        appendChildren(nodeList: NodeList, root?: Node): Node;
        appendChildren(nodeList: any, root?: Node): any {
            return appendChildren(nodeList, root);
        }

        clearNode(node: Node) {
            return clearNode(node);
        }

        clearNodeBlock(nodeList: Array<Node>, parent?: Node): void;
        clearNodeBlock(nodeList: NodeList, parent?: Node): void;
        clearNodeBlock(nodeList: any, parent?: Node) {
            return clearNodeBlock(nodeList, parent);
        }

        setInnerHtml(node: Node, html: string): Node {
            return setInnerHtml(node, html);
        }

        insertBefore(parent: Node, nodes: Array<Node>, endNode?: Node): Array<Node>;
        insertBefore(parent: Node, nodes: NodeList, endNode?: Node): Array<Node>;
        insertBefore(parent: Node, fragment: DocumentFragment, endNode?: Node): Array<Node>;
        insertBefore(parent: Node, nodes: any, endNode?: Node) {
            return insertBefore(parent, nodes, endNode);
        }

        replace(node: Node): Array<Node> {
            return replace(node);
        }

        replaceWith(node: Node, newElement: HTMLElement): HTMLElement;
        replaceWith(node: Node, newElement: Element): Element;
        replaceWith(node: Node, newNode: Node): Node;
        replaceWith(node: any, newNode: any): any {
            return replaceWith(node, newNode);
        }

        serializeHtml(html: string): DocumentFragment {
            return serializeHtml(html);
        }

        removeBetween(startNode: Node, endNode?: Node): void {
            return removeBetween(startNode, endNode);
        }

        removeAll(startNode: Node, endNode?: Node): void {
            return removeAll(startNode, endNode);
        }

        addClass(element: Element, className: string): void {
            return addClass(<HTMLElement>element, className);
        }

        removeClass(element: Element, className: string): void {
            return removeClass(<HTMLElement>element, className);
        }

        toggleClass(element: Element, className: string): void {
            return toggleClass(<HTMLElement>element, className);
        }

        hasClass(element: Element, className: string): boolean {
            return hasClass(<HTMLElement>element, className);
        }
    }

    /**
     * The Type for referencing the '$Dom' injectable as a dependency.
     */
    export function IDom(): IDom {
        return new Dom();
    }

    register.injectable(__Dom, IDom);

    /**
     * An object that deals with the creation, deletion, and modification 
     * of DOM.
     */
    export interface IDom {
        /**
         * Adds an event listener of the specified type to the specified element.
         * 
         * @param element The element to add the event listener to.
         * @param type The type of event to listen to.
         * @param listener The listener to fire when the event occurs.
         * @param useCapture Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         */
        addEventListener(element: Node, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * Adds an event listener of the specified type to the specified element.
         * 
         * @param element The window object.
         * @param type The type of event to listen to.
         * @param listener The listener to fire when the event occurs.
         * @param useCapture Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         */
        addEventListener(element: Window, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * Adds an event listener of the specified type to the specified element.
         * 
         * @param element The element to add the event listener to.
         * @param type The type of event to listen to.
         * @param listener The listener to fire when the event occurs.
         * @param useCapture Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         */
        addEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        /**
         * Adds an event listener of the specified type to the specified element.
         * 
         * @param element The window object.
         * @param type The type of event to listen to.
         * @param listener The listener to fire when the event occurs.
         * @param useCapture Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         */
        addEventListener(element: Window, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;

        /**
         * Takes a Node Array and either adds it to the passed in Node,
         * or creates a DocumentFragment and adds the NodeList to the
         * Fragment.
         * 
         * @param nodeList A Node Array to be appended to the root/DocumentFragment
         * 
         * @return {Node} The root Node or a DocumentFragment.
         */
        appendChildren(nodeList: Array<Node>): DocumentFragment;
        /**
         * Takes a Node Array and either adds it to the passed in Node,
         * or creates a DocumentFragment and adds the NodeList to the
         * Fragment.
         * 
         * @param nodeList A Node Array to be appended to the root/DocumentFragment
         * @param root An optional Node to append the nodeList.
         * 
         * @return {Node} The root Node or a DocumentFragment.
         */
        appendChildren(nodeList: NodeList): DocumentFragment;
        /**
         * Takes a Node Array and either adds it to the passed in Node,
         * or creates a DocumentFragment and adds the NodeList to the
         * Fragment.
         * 
         * @param nodeList A Node Array to be appended to the root/DocumentFragment
         * @param root An optional Node to append the nodeList.
         * 
         * @return {Node} The root Node or a DocumentFragment.
         */
        appendChildren(nodeList: Array<Node>, root?: Node): Node;
        /**
         * Takes a NodeList and either adds it to the passed in Node,
         * or creates a DocumentFragment and adds the NodeList to the
         * Fragment.
         * 
         * @param nodeList A NodeList to be appended to the root/DocumentFragment
         * @param root An optional Node to append the nodeList.
         * 
         * @return {Node} The root Node or a DocumentFragment.
         */
        appendChildren(nodeList: NodeList, root?: Node): Node;

        /**
         * Clears a DOM Node by removing all of its childNodes.
         * 
         * @param node The DOM Node to clear.
         */
        clearNode(node: Node): void;

        /**
         * Removes all the Nodes in the Array from the parent Node.
         * 
         * @param nodeList The Node Array to remove from the parent Node.
         * @param parent The parent Node used to remove the nodeList.
         */
        clearNodeBlock(nodeList: Array<Node>, parent?: Node): void;
        /**
         * Removes all the Nodes in the NodeList from the parent Node.
         * 
         * @param nodeList The NodeList to remove from the parent Node.
         * @param parent The parent Node used to remove the nodeList.
         */
        clearNodeBlock(nodeList: NodeList, parent?: Node): void;

        /**
         * Sets the innerHTML of a Node. Can take in a Node rather than an Element
         * because it does not use innerHTML on the passed-in Node (it appends its
         * childNodes).
         * 
         * @param node The Node to set innerHTML.
         * @param html HTML string to be put inside the node.
         * 
         * @return {Node} The same node passed in, with innerHTML set.
         */
        setInnerHtml(node: Node, html: string): Node;

        /**
         * Inserts a list of Nodes before the designated end Node.
         * 
         * @param parent The parent node into which to insert nodes.
         * @param nodes The Node Array to insert into the parent.
         * @param endNode An optional endNode to use to insert nodes.
         * 
         * @return {Array<Node>} An Array copy of nodes.
         */
        insertBefore(parent: Node, nodes: Array<Node>, endNode?: Node): Array<Node>;
        /**
         * Inserts a list of Nodes before the designated end Node.
         * 
         * @param parent The parent node into which to insert nodes.
         * @param nodes The NodeList to insert into the parent.
         * @param endNode An optional endNode to use to insert nodes.
         * 
         * @return {Array<Node>} An Array copy of nodes.
         */
        insertBefore(parent: Node, nodes: NodeList, endNode?: Node): Array<Node>;
        /**
         * Inserts a list of Nodes before the designated end Node.
         * 
         * @param parent The parent node into which to insert nodes.
         * @param fragment The DocumentFragment to insert into the parent.
         * @param endNode An optional endNode to use to insert the fragment.
         * 
         * @return {Array<Node>} An Array copy of the fragment's childNodes.
         */
        insertBefore(parent: Node, fragment: DocumentFragment, endNode?: Node): Array<Node>;

        /**
         * Takes the child nodes of the given node and places them above the node
         * in the DOM. Then removes the given node.
         * 
         * @param node The Node to replace.
         * 
         * @return {Array<Node>} A Node Array that represents the childNodes of the
         * given node.
         */
        replace(node: Node): Array<Node>;

        /**
         * Takes the childNodes of the given element and appends them to the newElement.
         * Then replaces the element in its parent's tree with the newElement.
         * 
         * @param node The Node to remove from its parent.
         * @param newElement The HTMLElement populate with childNodes and add to the
         * element's parent.
         * 
         * @return {HTMLElement} The replaced element (newElement).
         */
        replaceWith(node: Node, newElement: HTMLElement): HTMLElement;
        /**
         * Takes the childNodes of the given element and appends them to the newElement.
         * Then replaces the element in its parent's tree with the newElement.
         * 
         * @param node The Node to remove from its parent.
         * @param newElement The Element populate with childNodes and add to the
         * element's parent.
         * 
         * @return {Element} The replaced element (newElement).
         */
        replaceWith(node: Node, newElement: Element): Element;
        /**
         * Takes the childNodes of the given Node and appends them to the newNode.
         * Then replaces the Node in its parent's tree with the newNode.
         * 
         * @param node The Node to remove from its parent.
         * @param newElement The Node populate with childNodes and add to the
         * node's parent.
         * 
         * @return {Node} The replaced Node (newNode).
         */
        replaceWith(node: Node, newNode: Node): Node;

        /**
         * Takes in a string representing innerHTML and returns a DocumentFragment
         * containing the serialized DOM.
         * 
         * @param html The DOM string.
         * 
         * @return {DocumentFragment} The serialized DOM.
         */
        serializeHtml(html?: string): DocumentFragment;

        /**
         * Takes in a startNode and endNode, each having the same parentNode.
         * Removes every node in between the startNode.  If endNode is not specified,
         * DOM will be removed until the end of the parentNode's children.
         * 
         * @param startNode The starting node, which will not be removed.
         * @param endNode The ending node, which will not be removed.
         */
        removeBetween(startNode: Node, endNode?: Node): void;

        /**
         * Takes in a startNode and endNode, each having the same parentNode.
         * Removes every node in between the startNode and endNode as well as
         * the startNode and the endNode.  If endNode is not specified, DOM
         * will be removed until the end of the parentNode's children.
         * 
         * @param startNode The first node to remove.
         * @param endNode The last node to remove.
         */
        removeAll(startNode: Node, endNode?: Node): void;

        /**
         * Adds a class to the specified element.
         * 
         * @param element The element to which the class name is being added.
         * @param className The class name to add to the element.
         */
        addClass(element: Element, className: string): void;

        /**
         * Removes a class from the specified element.
         * 
         * @param element The element from which the class name is being removed.
         * @param className The class name to remove from the element.
         */
        removeClass(element: Element, className: string): void;

        /**
         * Toggles a class from the specified element.
         * 
         * @param element The element on which the class name is being toggled.
         * @param className The class name to toggle on the element.
         */
        toggleClass(element: Element, className: string): void;

        /**
         * Returns whether or not an element has a particular class assigned to it.
         * 
         * @param element The element on which the class name is being checked.
         * @param className The class name to check on the element.
         */
        hasClass(element: Element, className: string): void;
    }

    /**
     * An object describing custom element properties added to elements for hashing purposes.
     */
    export interface ICustomElementProperty extends IObject<string> {
        /**
         * A unique id given to the element if it's registered for a custom DOM event.
         */
        domEvent?: string;

        /**
         * A unique id given to the element if it's registered for an animation.
         */
        animation?: string;
    }

    /**
     * An interface for describing an Element with an ICustomElementProperty attached.
     */
    export interface ICustomElement extends HTMLElement {
        /**
         * The PlatypusTS custom element.
         */
        __plat: ICustomElementProperty;
    }
}
