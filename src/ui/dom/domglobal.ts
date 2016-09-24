/* tslint:disable:no-unused-variable */
let ___document: Document,
    ___templateCache: plat.storage.TemplateCache,
    ___http: plat.async.Http,
    ___log: plat.debug.Log;

const __nodeNameRegex = /<([\w:]+)/,
    __whiteSpaceRegex = /\s+/g,
    __option = [1, '<select multiple="multiple">', '</select>'],
    __table = [1, '<table>', '</table>'],
    __tableData = [3, '<table><tbody><tr>', '</tr></tbody></table>'],
    __svg = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', '</svg>'],
    __innerTableWrappers: plat.IObject<Array<any>> = {
        thead: __table,
        tbody: __table,
        tfoot: __table,
        colgroup: __table,
        caption: __table,
        tr: [2, '<table><tbody>', '</tbody></table>'],
        col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
        td: __tableData,
        th: __tableData
    },
    __innerHtmlWrappers: plat.IObject<Array<any>> = _extend(false, false, {}, __innerTableWrappers, {
        option: __option,
        optgroup: __option,
        legend: [1, '<fieldset>', '</fieldset>'],
        area: [1, '<map>', '</map>'],
        param: [1, '<object>', '</object>'],
        text: __svg,
        circle: __svg,
        ellipse: __svg,
        line: __svg,
        path: __svg,
        polygon: __svg,
        polyline: __svg,
        rect: __svg,
        _default: [0, '', '']
    });

function appendChildren(nodeList: any, root?: Node, clone?: boolean): Node {
    let isFragment = isDocumentFragment(root),
        nullRoot = !isNode(root),
        fragment: DocumentFragment = isFragment ?
            <DocumentFragment>root :
            (___document || (___document = plat.acquire(__Document))).createDocumentFragment();

    if (nullRoot) {
        root = fragment;
    }

    let list: Array<Node> = isArray(nodeList) ? nodeList : Array.prototype.slice.call(nodeList),
        length = list.length,
        i: number;

    if (clone === true) {
        let item: Node;
        for (i = 0; i < length; ++i) {
            item = list[i].cloneNode(true);
            fragment.insertBefore(item, null);
        }
    } else {
        for (i = 0; i < length; ++i) {
            fragment.insertBefore(list[i], null);
        }
    }

    if (!(isFragment || nullRoot)) {
        root.appendChild(fragment);
    }

    return root;
}

function clearNode(node: Node): void {
    let childNodes = Array.prototype.slice.call(node.childNodes);

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

    let node: Node;

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
    // ___compat is a global variable in utilsglobal
    ___compat = ___compat || (___compat = plat.acquire(__Compat));
    ___document = ___document || (___document = plat.acquire(__Document));
    let nodeName = __nodeNameRegex.exec(html),
        element = <HTMLElement>___document.createElement('div');

    if (isNull(nodeName)) {
        element = innerHtml(element, html);
        return element.removeChild(element.lastChild);
    }

    // trim html string
    html = html.trim();

    let mapTag = nodeName[1];

    if (___compat.pushState && isUndefined(__innerTableWrappers[mapTag])) {
        return innerHtml(element, html);
    } else if (mapTag === 'body') {
        element = innerHtml(___document.createElement('html'), html);
        return element.removeChild(element.lastChild);
    }

    let wrapper = __innerHtmlWrappers[mapTag] || (<any>__innerHtmlWrappers)._default,
        depth = wrapper[0],
        parentStart = wrapper[1],
        parentEnd = wrapper[2];

    element = innerHtml(element, parentStart + html + parentEnd);

    while (depth-- > 0) {
        element = <HTMLElement>element.lastChild;
    }

    return element;
}

function setInnerHtml(node: Node, html: string): Node {
    clearNode(node);

    if (isEmpty(html)) {
        return;
    }

    let element = stringToNode(html);

    if (element.childNodes.length > 0) {
        appendChildren(element.childNodes, node);
    } else {
        node.insertBefore(element, null);
    }

    return node;
}

function insertBefore(parent: Node, nodes: any, endNode?: Node): Array<Node> {
    if (isNull(parent) || !isObject(nodes)) {
        return;
    } else if (isUndefined(endNode)) {
        endNode = null;
    }

    let fragment: DocumentFragment;

    if (isNode(nodes)) {
        fragment = nodes;

        nodes = Array.prototype.slice.call(fragment.childNodes);
        parent.insertBefore(fragment, endNode);

        return nodes;
    }

    if (!isFunction(nodes.push)) {
        nodes = Array.prototype.slice.call(nodes);
    }

    ___document = ___document || (___document = plat.acquire(__Document));
    let length = nodes.length;

    fragment = ___document.createDocumentFragment();

    for (let i = 0; i < length; ++i) {
        fragment.insertBefore(nodes[i], null);
    }

    parent.insertBefore(fragment, endNode);

    return nodes;
}

function replace(node: Node): Array<Node> {
    let parent = node.parentNode,
        nodes = insertBefore(parent, node.childNodes, node);

    parent.removeChild(node);

    return nodes;
}

function replaceWith(node: Node, newNode: HTMLElement): HTMLElement;
function replaceWith(node: Node, newNode: Element): Element;
function replaceWith(node: Node, newNode: Node): Node;
function replaceWith(node: any, newNode: any): any {
    if (isNull(newNode)) {
        return newNode;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
        let attributes = node.attributes,
            length = attributes.length,
            attribute: Attr;

        for (let i = 0; i < length; ++i) {
            attribute = attributes[i];
            newNode.setAttribute(attribute.name, attribute.value);
        }
    }

    let parent = node.parentNode;

    insertBefore(newNode, node.childNodes);
    parent.replaceChild(newNode, node);

    return newNode;
}

function serializeHtml(html?: string): DocumentFragment {
    ___document = ___document || (___document = plat.acquire(__Document));
    let templateElement = ___document.createDocumentFragment();

    if (!isEmpty(html)) {
        setInnerHtml(templateElement, html);
    }

    return templateElement;
}

function removeBetween(startNode: Node, endNode?: Node): void {
    if (isNull(startNode)) {
        return;
    }

    let currentNode = startNode.nextSibling,
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

/**
 * Safely sets innerHTML of an element. Uses MSApp.execUnsafeLocalFunction if
 * available.
 */
function innerHtml(element: HTMLElement, html: string): HTMLElement {
    ___compat = ___compat || (___compat = plat.acquire(__Compat));

    if (___compat.msApp) {
        (<any>MSApp).execUnsafeLocalFunction((): void => {
            element.innerHTML = html;
        });
    } else {
        element.innerHTML = html;
    }

    return element;
}

function removeNode(node: Node): void {
    if (!isNode(node)) {
        return;
    }

    let parentNode = node.parentNode;

    if (!isNull(parentNode)) {
        parentNode.removeChild(node);
    }
}

function addClass(element: HTMLElement, className: string): void {
    let cName = (element || <HTMLElement>{}).className;
    if (!isString(cName) || !isString(className) || className === '') {
        return;
    }

    let split = className.split(__whiteSpaceRegex),
        name: string,
        classNameRegex: RegExp;
    if (isUndefined(element.classList)) {
        if (isEmpty(cName)) {
            element.className = className;
            return;
        }

        while (split.length > 0) {
            name = split.shift();
            if (name !== '') {
                classNameRegex = new RegExp('^' + name + '\\s+|\\s+' + name + '$|\\s+' + name + '\\s+', 'g');
                if (!classNameRegex.test(cName)) {
                    element.className += ' ' + name;
                }
            }
        }
        return;
    }

    while (split.length > 0) {
        name = split.shift();
        if (name !== '') {
            element.classList.add(name);
        }
    }
}

function removeClass(element: HTMLElement, className: string): void {
    let cName = (element || <HTMLElement>{}).className;
    if (!isString(cName) || !isString(className) || className === '') {
        return;
    }

    let split = className.split(__whiteSpaceRegex),
        name: string;
    if (isUndefined(element.classList)) {
        if (cName === className) {
            element.className = '';
            return;
        }

        while (split.length > 0) {
            name = split.shift();
            if (name !== '') {
                element.className = cName = cName
                    .replace(new RegExp('^' + name + '\\s+|\\s+' + name + '$|\\s+' + name + '\\s+', 'g'), '');
            }
        }
        return;
    }

    while (split.length > 0) {
        name = split.shift();
        if (name !== '') {
            element.classList.remove(name);
        }
    }
}

function toggleClass(element: HTMLElement, className: string): void {
    let cName = (element || <HTMLElement>{}).className;
    if (!isString(cName) || !isString(className) || className === '') {
        return;
    }

    let split = className.split(__whiteSpaceRegex),
        name: string;
    if (isUndefined(element.classList)) {
        let classNameRegex: RegExp;
        if (cName === '') {
            element.className = className;
        } else if (cName === className) {
            element.className = '';
            return;
        }

        while (split.length > 0) {
            name = split.shift();
            if (name !== '') {
                classNameRegex = new RegExp('^' + name + '\\s+|\\s+' + name + '$|\\s+' + name + '\\s+', 'g');
                if (classNameRegex.test(cName)) {
                    element.className = cName = cName.replace(classNameRegex, '');
                    continue;
                }

                element.className += ' ' + name;
            }
        }
        return;
    }

    while (split.length > 0) {
        name = split.shift();
        if (name !== '') {
            element.classList.toggle(name);
        }
    }
}

function replaceClass(element: HTMLElement, oldClass: string, newClass: string): void {
    let cName = (element || <HTMLElement>{}).className;
    if (!isString(cName) || !isString(newClass) || newClass === '') {
        return;
    }

    if (isUndefined(element.classList)) {
        let startRegex = new RegExp('^' + oldClass + '\\s+', 'g'),
            midRegex = new RegExp('\\s+' + oldClass + '\\s+', 'g'),
            endRegex = new RegExp('\\s+' + oldClass + '$', 'g');
        element.className = cName.replace(startRegex, newClass + ' ')
            .replace(midRegex, ' ' + newClass + ' ')
            .replace(endRegex, ' ' + newClass);
        return;
    }

    element.classList.add(newClass);
    element.classList.remove(oldClass);
}

function hasClass(element: HTMLElement, className: string): boolean {
    let cName = (element || <HTMLElement>{}).className;
    if (!isString(cName) || !isString(className) || className === '') {
        return false;
    }

    let split = className.split(__whiteSpaceRegex),
        name: string;

    if (isUndefined(element.classList)) {
        if (cName === '') {
            return false;
        } else if (cName === className) {
            return true;
        }

        while (split.length > 0) {
            name = split.shift();
            if (!(name === '' || new RegExp('^' + name + '\\s|\\s' + name + '$|\\s' + name + '\\s', 'g').test(cName))) {
                return false;
            }
        }
        return true;
    }

    while (split.length > 0) {
        name = split.shift();
        if (!(name === '' || element.classList.contains(name))) {
            return false;
        }
    }

    return true;
}

function getTemplate(templateUrl: string): plat.async.IThenable<DocumentFragment> {
    ___templateCache = ___templateCache || (___templateCache = plat.acquire(__TemplateCache));
    ___http = ___http || (___http = plat.acquire(__Http));

    return ___templateCache.put(templateUrl, ___templateCache.read(templateUrl)
        .catch((error: any): plat.async.AjaxPromise<string> => {
            if (isNull(error)) {
                return ___http.ajax<string>({ url: templateUrl });
            }
        }).then<DocumentFragment>((success): plat.async.IThenable<DocumentFragment> => {
            if (isDocumentFragment(success)) {
                return ___templateCache.put(templateUrl, <any>success);
            } else if (!isObject(success) || !isString(success.response)) {
                ___log = ___log || (___log = plat.acquire(__Log));
                ___log.warn('No template found at ' + templateUrl);
                return ___templateCache.put(templateUrl);
            }

            let templateString = success.response;

            if (isEmpty(templateString.trim())) {
                return ___templateCache.put(templateUrl);
            }

            return ___templateCache.put(templateUrl, templateString);
        }).catch((error: any): any => {
            postpone((): void => {
                ___log = ___log || (___log = plat.acquire(__Log));
                ___log.error(new Error('Failure to get template from ' + templateUrl + '.'));
            });
            return error;
        }));
}

function whenPresent(cb: () => void, element: Element): plat.IRemoveListener {
    if (!isNode(element)) {
        ___log = ___log || (___log = plat.acquire(__Log));
        ___log.error(new Error('Attempting to check DOM presence of something that isn\'t a Node.'));
        return noop;
    }

    ___document = ___document || (___document = plat.acquire(__Document));
    let body = ___document.body;

    if (isNode(element.parentElement) && body.contains(element)) {
        cb();
        return noop;
    }

    let remove = setIntervalGlobal((): void => {
        if (isNode(element.parentElement) && body.contains(element)) {
            remove();
            cb();
        }
    }, 100);

    return remove;
}

function whenVisible(cb: () => void, element: Element): plat.IRemoveListener {
    if (!isNode(element)) {
        ___log = ___log || (___log = plat.acquire(__Log));
        ___log.error(new Error('Attempting to check visibility of something that isn\'t a Node.'));
        return noop;
    }

    let clientWidth = element.clientWidth,
        clientHeight = element.clientHeight;

    if (!(isNumber(clientWidth) && isNumber(clientHeight))) {
        ___log = ___log || (___log = plat.acquire(__Log));
        ___log.error(new Error('Attempting to check visibility of something that isn\'t an Element.'));
        return noop;
    }

    if (clientWidth > 0 && clientHeight > 0) {
        cb();
        return noop;
    }

    let remove = setIntervalGlobal((): void => {
        if (element.clientWidth > 0 && element.clientHeight > 0) {
            remove();
            cb();
        }
    }, 100);

    return remove;
}

/* tslint:enable:no-unused-variable */
