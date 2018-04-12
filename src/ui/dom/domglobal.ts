let ___document: Document;
let ___templateCache: plat.storage.TemplateCache;
let ___http: plat.async.Http;
let ___log: plat.debug.Log;

const __nodeNameRegex = /<([\w:]+)/;
const __whiteSpaceRegex = /\s+/g;
const __option = [1, '<select multiple="multiple">', '</select>'];
const __table = [1, '<table>', '</table>'];
const __tableData = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
const __svg = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', '</svg>'];
const __innerTableWrappers: plat.IObject<any[]> = {
    thead: __table,
    tbody: __table,
    tfoot: __table,
    colgroup: __table,
    caption: __table,
    tr: [2, '<table><tbody>', '</tbody></table>'],
    col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
    td: __tableData,
    th: __tableData,
};
const __innerHtmlWrappers: plat.IObject<any[]> = _extend(false, false, {}, __innerTableWrappers, {
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
    _default: [0, '', ''],
});

function appendChildren(nodeList: any, root?: Node, clone?: boolean): Node {
    if (!isObject(___document)) {
        ___document = plat.acquire(__Document);
    }

    const isFragment = isDocumentFragment(root);
    const nullRoot = !isNode(root);
    const fragment: DocumentFragment = isFragment ?
            <DocumentFragment>root : ___document.createDocumentFragment();

    if (nullRoot) {
        root = fragment;
    }

    const list: Node[] = isArray(nodeList) ? nodeList : Array.prototype.slice.call(nodeList);
    const length = list.length;
    let i: number;

    if (clone === true) {
        let item: Node;
        for (i = 0; i < length; i += 1) {
            item = list[i].cloneNode(true);
            fragment.insertBefore(item, null);
        }
    } else {
        for (i = 0; i < length; i += 1) {
            fragment.insertBefore(list[i], null);
        }
    }

    if (!(isFragment || nullRoot)) {
        root.appendChild(fragment);
    }

    return root;
}

function clearNode(node: Node): void {
    const childNodes = Array.prototype.slice.call(node.childNodes);

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

function clearNodeBlockWithParent(nodeList: Node[], parent: Node): void {
    while (nodeList.length > 0) {
        parent.removeChild(nodeList.pop());
    }
}

function stringToNode(html: string): Node {
    // ___compat is a global variable in utilsglobal
    if (!isObject(___compat)) {
        ___compat = plat.acquire(__Compat);
    }

    if (!isObject(___document)) {
        ___document = plat.acquire(__Document);
    }

    const nodeName = __nodeNameRegex.exec(html);
    let element = <HTMLElement>___document.createElement('div');

    if (isNull(nodeName)) {
        element = innerHtml(element, html);

        return element.removeChild(element.lastChild);
    }

    // trim html string
    html = html.trim();

    const mapTag = nodeName[1];
    let wrapper = __innerHtmlWrappers[mapTag];

    if (___compat.pushState && isUndefined(wrapper)) {
        return innerHtml(element, html);
    } else if (mapTag === 'body') {
        element = innerHtml(___document.createElement('html'), html);

        return element.removeChild(element.lastChild);
    }

    if (!isArray(wrapper)) {
        wrapper = __innerHtmlWrappers._default;
    }

    let depth = wrapper[0];
    const parentStart = wrapper[1];
    const parentEnd = wrapper[2];

    element = innerHtml(element, `${parentStart}${html}${parentEnd}`);

    while (depth > 0) {
        depth -= 1;
        element = <HTMLElement>element.lastChild;
    }

    return element;
}

function setInnerHtml(node: Node, html: string): Node {
    clearNode(node);

    if (isEmpty(html)) {
        return;
    }

    const element = stringToNode(html);

    if (element.childNodes.length > 0) {
        appendChildren(element.childNodes, node);
    } else {
        node.insertBefore(element, null);
    }

    return node;
}

function insertBefore(parent: Node, nodes: any, endNode?: Node): Node[] {
    if (isNull(parent) || !isObject(nodes)) {
        return;
    } else if (isUndefined(endNode)) {
        endNode = null;
    }

    let fragment: DocumentFragment | Node;

    if (isNode(nodes)) {
        fragment = nodes;

        nodes = Array.prototype.slice.call(fragment.childNodes);
        parent.insertBefore(fragment, endNode);

        return nodes;
    }

    if (!isFunction(nodes.push)) {
        nodes = Array.prototype.slice.call(nodes);
    }

    if (!isObject(___document)) {
        ___document = plat.acquire(__Document);
    }

    const length = nodes.length;

    fragment = ___document.createDocumentFragment();

    for (let i = 0; i < length; i += 1) {
        fragment.insertBefore(nodes[i], null);
    }

    parent.insertBefore(fragment, endNode);

    return nodes;
}

function replace(node: Node): Node[] {
    const parent = node.parentNode;
    const nodes = insertBefore(parent, node.childNodes, node);

    parent.removeChild(node);

    return nodes;
}

function replaceWith<T extends Node>(node: any, newNode: T): T {
    if (isNull(newNode)) {
        return newNode;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
        const attributes = node.attributes;
        const length = attributes.length;
        let attribute: Attr;

        for (let i = 0; i < length; i += 1) {
            attribute = attributes[i];
            (<HTMLElement><any>newNode).setAttribute(attribute.name, attribute.value);
        }
    }

    const parent = node.parentNode;

    insertBefore(newNode, node.childNodes);
    parent.replaceChild(newNode, node);

    return newNode;
}

function serializeHtml(html?: string): DocumentFragment {
    if (!isObject(___document)) {
        ___document = plat.acquire(__Document);
    }

    const templateElement = ___document.createDocumentFragment();

    if (!isEmpty(html)) {
        setInnerHtml(templateElement, html);
    }

    return templateElement;
}

function removeBetween(startNode: Node, endNode?: Node): void {
    if (isNull(startNode)) {
        return;
    }

    let currentNode = startNode.nextSibling;
    const parentNode = startNode.parentNode;
    let tempNode: Node;

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
    if (!isObject(___compat)) {
        ___compat = plat.acquire(__Compat);
    }

    if (___compat.msApp) {
        // tslint:disable-next-line
        (<any>MSApp).execUnsafeLocalFunction((): void => {
            // tslint:disable-next-line
            element.innerHTML = html;
        });
    } else {
        // tslint:disable-next-line
        element.innerHTML = html;
    }

    return element;
}

function removeNode(node: Node): void {
    if (!isNode(node)) {
        return;
    }

    const parentNode = node.parentNode;

    if (!isNull(parentNode)) {
        parentNode.removeChild(node);
    }
}

function addClass(element: HTMLElement, className: string): void {
    if (!isObject(element)) {
        element = <any>{};
    }

    const cName = element.className;

    if (!isString(cName) || !isString(className) || className === '') {
        return;
    }

    const split = className.split(__whiteSpaceRegex);
    let name: string;
    let classNameRegex: RegExp;

    if (isUndefined(element.classList)) {
        if (isEmpty(cName)) {
            element.className = className;

            return;
        }

        while (split.length > 0) {
            name = split.shift();
            if (name !== '') {
                classNameRegex = new RegExp(`^${name}\\s+|\\s+${name}$|\\s+${name}\\s+`, 'g');
                if (!classNameRegex.test(cName)) {
                    element.className += ` ${name}`;
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
    if (!isObject(element)) {
        element = <any>{};
    }

    let cName = element.className;

    if (!isString(cName) || !isString(className) || className === '') {
        return;
    }

    const split = className.split(__whiteSpaceRegex);
    let name: string;

    if (isUndefined(element.classList)) {
        if (cName === className) {
            element.className = '';

            return;
        }

        while (split.length > 0) {
            name = split.shift();
            if (name !== '') {
                element.className = cName = cName
                    .replace(new RegExp(`^${name}\\s+|\\s+${name}$|\\s+${name}\\s+`, 'g'), '');
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
    if (!isObject(element)) {
        element = <any>{};
    }

    let cName = element.className;

    if (!isString(cName) || !isString(className) || className === '') {
        return;
    }

    const split = className.split(__whiteSpaceRegex);
    let name: string;

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
                classNameRegex = new RegExp(`^${name}\\s+|\\s+${name}$|\\s+${name}\\s+`, 'g');
                if (classNameRegex.test(cName)) {
                    element.className = cName = cName.replace(classNameRegex, '');
                    continue;
                }

                element.className += ` ${name}`;
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
    if (!isObject(element)) {
        element = <any>{};
    }

    const cName = element.className;

    if (!isString(cName) || !isString(newClass) || newClass === '') {
        return;
    }

    if (isUndefined(element.classList)) {
        const startRegex = new RegExp(`^${oldClass}\\s+`, 'g');
        const midRegex = new RegExp(`\\s+${oldClass}\\s+`, 'g');
        const endRegex = new RegExp(`\\s+${oldClass}$`, 'g');
        element.className = cName.replace(startRegex, `${newClass} `)
            .replace(midRegex, ` ${newClass} `)
            .replace(endRegex, ` ${newClass}`);

            return;
    }

    element.classList.add(newClass);
    element.classList.remove(oldClass);
}

function hasClass(element: HTMLElement, className: string): boolean {
    if (!isObject(element)) {
        element = <any>{};
    }

    const cName = element.className;

    if (!isString(cName) || !isString(className) || className === '') {
        return false;
    }

    const split = className.split(__whiteSpaceRegex);
    let name: string;

    if (isUndefined(element.classList)) {
        if (cName === '') {
            return false;
        } else if (cName === className) {
            return true;
        }

        while (split.length > 0) {
            name = split.shift();
            if (!(name === '' || new RegExp(`^${name}\\s|\\s${name}$|\\s${name}\\s`, 'g').test(cName))) {
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

function getTemplate(templateUrl: string): plat.async.Promise<DocumentFragment> {
    if (!isObject(___templateCache)) {
        ___templateCache = plat.acquire(__TemplateCache);
    }

    if (!isObject(___http)) {
        ___http = plat.acquire(__Http);
    }

    return ___templateCache.put(templateUrl, ___templateCache.read(templateUrl)
        .catch((error: any): plat.async.AjaxPromise<plat.async.IAjaxResponse<string>> => {
            if (isNull(error)) {
                return ___http.ajax<string>({ url: templateUrl });
            }
        }).then<DocumentFragment>((success): plat.async.Promise<DocumentFragment> => {
            if (isDocumentFragment(success)) {
                return ___templateCache.put(templateUrl, <any>success);
            } else if (!isObject(success) || !isString(success.response)) {
                if (!isObject(___log)) {
                    ___log = plat.acquire(__Log);
                }

                ___log.warn(`No template found at ${templateUrl}`);

                return ___templateCache.put(templateUrl);
            }

            const templateString = success.response;

            if (isEmpty(templateString.trim())) {
                return ___templateCache.put(templateUrl);
            }

            return ___templateCache.put(templateUrl, templateString);
        }).catch((error: any): any => {
            postpone((): void => {
                if (!isObject(___log)) {
                    ___log = plat.acquire(__Log);
                }

                ___log.error(new Error(`Failure to get template from ${templateUrl}.`));
            });

            return error;
        }));
}

function whenPresent(cb: () => void, element: Element): plat.IRemoveListener {
    if (!isNode(element)) {
        if (!isObject(___log)) {
            ___log = plat.acquire(__Log);
        }

        ___log.error(new Error('Attempting to check DOM presence of something that isn\'t a Node.'));

        return noop;
    }

    if (!isObject(___document)) {
        ___document = plat.acquire(__Document);
    }

    const body = ___document.body;

    if (isNode(element.parentElement) && body.contains(element)) {
        cb();

        return noop;
    }

    // tslint:disable-next-line
    const remove = setIntervalGlobal((): void => {
        if (isNode(element.parentElement) && body.contains(element)) {
            remove();
            cb();
        }
    }, 100);

    return remove;
}

function whenVisible(cb: () => void, element: Element): plat.IRemoveListener {
    if (!isNode(element)) {
        if (!isObject(___log)) {
            ___log = plat.acquire(__Log);
        }

        ___log.error(new Error('Attempting to check visibility of something that isn\'t a Node.'));

        return noop;
    }

    const { clientWidth, clientHeight } = element;

    if (!(isNumber(clientWidth) && isNumber(clientHeight))) {
        if (!isObject(___log)) {
            ___log = plat.acquire(__Log);
        }

        ___log.error(new Error('Attempting to check visibility of something that isn\'t an Element.'));

        return noop;
    }

    if (clientWidth > 0 && clientHeight > 0) {
        cb();

        return noop;
    }

    // tslint:disable-next-line
    const remove = setIntervalGlobal((): void => {
        if (element.clientWidth > 0 && element.clientHeight > 0) {
            remove();
            cb();
        }
    }, 100);

    return remove;
}
