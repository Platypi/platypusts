module plat.ui {
    /**
     * An extensible class dealing with the creation, deletion, and modification 
     * of DOM.
     */
    export class Dom implements IDom {
        $domEvents: ui.IDomEvents = acquire('$domEvents');

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
        addEventListener(element: any, type: string, listener: ui.IGestureListener, useCapture?: boolean) {
            return this.$domEvents.addEventListener(element, type, listener, useCapture);
        }

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
        appendChildren(nodeList: any, root?: Node) {
            return appendChildren(nodeList, root);
        }

        /**
         * Clears a DOM Node by removing all of its childNodes.
         * 
         * @param node The DOM Node to clear.
         */
        clearNode(node: Node) {
            return clearNode(node);
        }

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
        clearNodeBlock(nodeList: any, parent?: Node) {
            return clearNodeBlock(nodeList, parent);
        }

        /**
         * Sets the innerHTML of a Node. Can take in a Node rather than an HTMLElement
         * because it does not use innerHTML on the passed-in Node (it appends its 
         * childNodes).
         * 
         * @param node The Node to set innerHTML.
         * @param html HTML string to be put inside the node.
         * 
         * @return {Node} The same node passed in, with innerHTML set.
         */
        setInnerHtml(node: Node, html: string): Node {
            return setInnerHtml(node, html);
        }

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
        insertBefore(parent: Node, nodes: any, endNode?: Node) {
            return insertBefore(parent, nodes, endNode);
        }

        /**
         * Takes the child nodes of the given node and places them above the node
         * in the DOM. Then removes the given node.
         * 
         * @param node The Node to replace.
         * 
         * @return {Array<Node>} A Node Array that represents the childNodes of the
         * given node.
         */
        replace(node: Node): Array<Node> {
            return replace(node);
        }

        /**
         * Takes the childNodes of the given element and appends them to the newElement.
         * Then replaces the element in its parent's tree with the newElement.
         * 
         * @param element The HTMLElement to remove from its parent.
         * @param newElement The HTMLElement populate with childNodes and add to the 
         * elemnent's parent.
         * 
         * @return {HTMLElement} The replaced element (newElement).
         */
        replaceWith(element: HTMLElement, newElement: HTMLElement): HTMLElement;
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
        replaceWith(node: any, newNode: any) {
            return replaceWith(node, newNode);
        }

        /**
         * Takes in a string representing innerHTML and returns a DocumentFragment
         * containing the serialized DOM.
         * 
         * @param html The DOM string.
         * 
         * @return {DocumentFragment} The serialized DOM.
         */
        serializeHtml(html: string): DocumentFragment {
            return serializeHtml(html);
        }

        /**
         * Takes in a startNode and endNode, each having the same parentNode. 
         * Removes every node in between the startNode.  If endNode is not specified, 
         * DOM will be removed until the end of the parentNode's children.
         * 
         * @param startNode The starting node, which will not be removed.
         * @param endNode The ending node, which will not be removed.
         */
        removeBetween(startNode: Node, endNode?: Node) {
            return removeBetween(startNode, endNode);
        }

        /**
         * Takes in a startNode and endNode, each having the same parentNode. 
         * Removes every node in between the startNode and endNode as well as 
         * the startNode and the endNode.  If endNode is not specified, DOM 
         * will be removed until the end of the parentNode's children.
         * 
         * @param startNode The first node to remove.
         * @param endNode The last node to remove.
         */
        removeAll(startNode: Node, endNode?: Node) {
            return removeAll(startNode, endNode);
        }
    }

    register.injectable('$dom', Dom);

    function appendChildren(nodeList: any, root?: Node): Node {
        var fragment: DocumentFragment,
            isFragment = root instanceof DocumentFragment,
            nullRoot = isNull(root),
            $document = acquire('$document');

        if (isFragment) {
            fragment = <DocumentFragment>root;
        } else {
            fragment = $document.createDocumentFragment();
        }

        if (nullRoot) {
            root = fragment;
        }

        var list: Array<Node>;
        if (isFunction(nodeList.push)) {
            list = nodeList;
        } else {
            list = Array.prototype.slice.call(nodeList);
        }

        while (list.length > 0) {
            fragment.insertBefore(list.shift(), null);
        }

        if (!(isFragment || nullRoot)) {
            root.appendChild(fragment);
        }

        return root;
    }

    function clearNode(node: Node): void {
        var childNodes = Array.prototype.slice.call(node.childNodes);

        while (childNodes.length > 0) {
            node.removeChild(childNodes.pop());
        }
    }

    function clearNodeBlock(nodeList: any, parent: Node): void {
        if (!isFunction(nodeList.push)) {
            nodeList = Array.prototype.slice.call(nodeList);
        }

        if (!isNull(parent)) {
            clearNodeBlockWithParent(nodeList, parent);
            return;
        }

        var node: Node;

        while (nodeList.length > 0) {
            node = nodeList.pop();
            parent = node.parentNode;

            if (isNull(parent)) {
                continue;
            }

            parent.removeChild(node);
        }
    }

    function clearNodeBlockWithParent(nodeList: Array<Node>, parent: Node): void {
        while (nodeList.length > 0) {
            parent.removeChild(nodeList.pop());
        }
    }

    function stringToNode(html: string): Node {
        var compat: ICompat = acquire('$compat'),
            $document: Document = acquire('$document');

        if (compat.pushState) {
            return innerHtml($document.createElement('div'), html);
        }

        var nodeName = /<([\w:]+)/.exec(html);
        var element: HTMLElement = $document.createElement('div');

        if (isNull(nodeName)) {
            element = innerHtml(element, html);
            return element.removeChild(element.lastChild);
        }

        // string trim
        html = html.replace(/^\s+|\s+$/g, '');

        var mapTag = nodeName[1];

        if (mapTag === 'body') {
            element = innerHtml($document.createElement('html'), html);
            return element.removeChild(element.lastChild);
        }

        var wrapper = innerHtmlWrappers[mapTag] || (<any>innerHtmlWrappers)._default,
            depth = wrapper[0],
            parentStart = wrapper[1],
            parentEnd = wrapper[2];

        element = innerHtml(element, parentStart + html + parentEnd);

        while (depth-- > 0) {
            element = <HTMLElement>element.lastChild;
        }

        return element;
    }

    function setInnerHtml(node: Node, html: string) {
        clearNode(node);

        if (isEmpty(html)) {
            return;
        }

        var element = stringToNode(html);

        if (element.childNodes.length > 0) {
            appendChildren(element.childNodes, node);
        } else {
            node.insertBefore(element, null);
        }

        return node;
    }

    function insertBefore(parent: Node, nodes: any, endNode: Node = null) {
        if (isNull(parent)) {
            return;
        }

        var fragment: DocumentFragment;

        if (isNode(nodes)) {
            fragment = nodes;

            nodes = Array.prototype.slice.call(fragment.childNodes);
            parent.insertBefore(fragment, endNode);

            return nodes;
        }

        if (!isFunction(nodes.push)) {
            nodes = Array.prototype.slice.call(nodes);
        }

        var $document = acquire('$document'),
            length = nodes.length;

        fragment = $document.createDocumentFragment();

        for (var i = 0; i < length; ++i) {
            fragment.insertBefore(nodes[i], null);
        }

        parent.insertBefore(fragment, endNode);

        return nodes;
    }

    function replace(node: Node) {
        var parent = node.parentNode,
            nodes = insertBefore(parent, node.childNodes, node);

        parent.removeChild(node);

        return nodes;
    }

    function replaceWith(node: any, newNode: any) {
        if (isNull(newNode)) {
            return newNode;
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            var attributes = node.attributes,
                length = attributes.length,
                attribute: Attr;

            for (var i = 0; i < length; ++i) {
                attribute = attributes[i];
                newNode.setAttribute(attribute.name, attribute.value);
            }
        }

        var parent = node.parentNode;

        insertBefore(newNode, node.childNodes);
        parent.replaceChild(newNode, node);

        return newNode;
    }

    function serializeHtml(html?: string): DocumentFragment {
        var $document = acquire('$document'),
            templateElement = $document.createDocumentFragment();

        if (!isEmpty(html)) {
            setInnerHtml(templateElement, html);
        }

        return templateElement;
    }

    function removeBetween(startNode: Node, endNode?: Node): void {
        if (isNull(startNode)) {
            return;
        }

        var currentNode = startNode.nextSibling,
            parentNode = startNode.parentNode,
            tempNode: Node;

        if (isNull(endNode)) {
            endNode = null;
        }

        if (isNull(parentNode) || (!isNull(endNode) && endNode.parentNode !== parentNode)) {
            return;
        }

        while (currentNode !== endNode) {
            tempNode = currentNode.nextSibling;
            parentNode.removeChild(currentNode);
            currentNode = tempNode;
        }
    }

    function removeAll(startNode: Node, endNode?: Node): void {
        if (isNull(startNode)) {
            return;
        }

        removeBetween(startNode, endNode);

        removeNode(startNode);
        removeNode(endNode);
    }

    var __option = [1, '<select multiple="multiple">', '</select>'],
        __table = [1, '<table>', '</table>'],
        __tableData = [3, '<table><tbody><tr>', '</tr></tbody></table>'],
        __svg = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', '</svg>'],
        innerHtmlWrappers: IObject<Array<any>> = {
            option: __option,
            optgroup: __option,
            legend: [1, '<fieldset>', '</fieldset>'],
            area: [1, '<map>', '</map>'],
            param: [1, '<object>', '</object>'],
            thead: __table,
            tbody: __table,
            tfoot: __table,
            colgroup: __table,
            caption: __table,
            tr: [2, '<table><tbody>', '</tbody></table>'],
            col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
            td: __tableData,
            th: __tableData,
            text: __svg,
            circle: __svg,
            ellipse: __svg,
            line: __svg,
            path: __svg,
            polygon: __svg,
            polyline: __svg,
            rect: __svg,
            _default: [0, '', '']
        };

    /**
     * Safely sets innerHTML of an element. Uses MSApp.execUnsafeLocalFunction if 
     * available.
     */
    function innerHtml(element: HTMLElement, html: string): HTMLElement {
        var compat = acquire('$compat');

        if (compat.msApp) {
            MSApp.execUnsafeLocalFunction(() => {
                element.innerHTML = html;
            });
        } else {
            element.innerHTML = html;
        }

        return element;
    }

    function removeNode(node: Node): void {
        if (isNull(node)) {
            return;
        }

        var parentNode = node.parentNode;

        if (!isNull(parentNode)) {
            node.parentNode.removeChild(node);
        }
    }

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
        addEventListener(element: Window, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;

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
         * Sets the innerHTML of a Node. Can take in a Node rather than an HTMLElement
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
         * @param element The HTMLElement to remove from its parent.
         * @param newElement The HTMLElement populate with childNodes and add to the
         * elemnent's parent.
         * 
         * @return {HTMLElement} The replaced element (newElement).
         */
        replaceWith(element: HTMLElement, newElement: HTMLElement): HTMLElement;
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
    }
}
