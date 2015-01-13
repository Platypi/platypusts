module plat.processing {
    /**
     * @name ElementManager
     * @memberof plat.processing
     * @kind class
     * 
     * @extends {plat.processing.NodeManager}
     * @implements {plat.processing.IElementManager}
     * 
     * @description
     * A class used to manage element nodes. Provides a way for compiling and binding the 
     * element/template. Also provides methods for cloning an 
     * {@link plat.processing.IElementManager|IElementManager}.
     */
    export class ElementManager extends NodeManager implements IElementManager {
        /**
         * @name _document
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         * @static
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        protected static _document: Document;

        /**
         * @name _managerCache
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         * 
         * @type {plat.storage.ICache<processing.IElementManager>}
         * 
         * @description
         * Reference to a cache injectable that stores {@link plat.processing.IElementManager|IElementManagers}.
         */
        protected static _managerCache: storage.ICache<IElementManager>;

        /**
         * @name _ResourcesFactory
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.IResourcesFactory}
         * 
         * @description
         * Reference to the {@link plat.ui.IResourcesFactory|IResourcesFactory} injectable.
         */
        protected static _ResourcesFactory: ui.IResourcesFactory;

        /**
         * @name _BindableTemplatesFactory
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.IBindableTemplatesFactory}
         * 
         * @description
         * Reference to the {@link plat.ui.IBindableTemplatesFactory|IBindableTemplatesFactory} injectable.
         */
        protected static _BindableTemplatesFactory: ui.IBindableTemplatesFactory;

        /**
         * @name create
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Determines if the associated Element has controls that need to be instantiated or Attr nodes
         * containing text markup. If controls exist or markup is found a new 
         * {@link plat.processing.ElementManager|ElementManager} will be created,
         * else an empty {@link plat.processing.INodeManager|INodeManager} will be added to the Array of 
         * {@link plat.processing.INodeManager|INodeManagers}.
         * 
         * @param {Element} element The Element to use to identifier markup and controls.
         * @param {plat.processing.IElementManager} parent? The parent {@link plat.processing.IElementManager|IElementManager} 
         * used for context inheritance.
         * 
         * @returns {plat.processing.IElementManager}
         */
        static create(element: Element, parent?: IElementManager): IElementManager {
            var name = element.nodeName.toLowerCase(),
                nodeName = name,
                injector = controlInjectors[name] || viewControlInjectors[name],
                noControlAttribute = true,
                hasUiControl = false,
                uiControlNode: IUiControlNode;

            if (isNull(injector)) {
                if (element.hasAttribute('plat-control')) {
                    name = element.getAttribute('plat-control').toLowerCase();
                    injector = controlInjectors[name] || viewControlInjectors[name];
                    noControlAttribute = false;
                } else if (element.hasAttribute('data-plat-control')) {
                    name = element.getAttribute('data-plat-control').toLowerCase();
                    injector = controlInjectors[name] || viewControlInjectors[name];
                    noControlAttribute = false;
                }
            }

            if (!isNull(injector)) {
                var uiControl = <ui.ITemplateControl>injector.inject(),
                    resourceElement = ElementManager.locateResources(element);

                uiControlNode = {
                    control: uiControl,
                    resourceElement: resourceElement,
                    nodeName: name,
                    expressions: [],
                    injector: injector
                };

                hasUiControl = true;

                if (noControlAttribute) {
                    element.setAttribute('plat-control', name);
                }

                var replacementType = uiControl.replaceWith,
                    replaceWithDiv = replacementType === 'any' && noControlAttribute;
                if (!isEmpty(replacementType) && (replacementType !== 'any' || replaceWithDiv) &&
                    replacementType.toLowerCase() !== nodeName) {
                    if (replaceWithDiv) {
                        replacementType = 'div';
                    }

                    var replacement = ElementManager._document.createElement(replacementType);
                    if (replacement.nodeType === Node.ELEMENT_NODE) {
                        element = replaceWith(element, <HTMLElement>replacement.cloneNode(true));
                    }
                }
            }

            var elementMap = ElementManager._collectAttributes(element.attributes),
                manager = new ElementManager();

            elementMap.element = <HTMLElement>element;
            elementMap.uiControlNode = uiControlNode;

            manager.initialize(elementMap, parent);

            if (!(elementMap.hasControl || hasUiControl)) {
                manager.bind = () => { return []; };
            } else {
                manager.setUiControlTemplate();
                return hasUiControl ? null : manager;
            }

            return manager;
        }

        /**
         * @name locateResources
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Looks through the Node's child nodes to try and find any 
         * defined {@link plat.ui.IResources|IResources} in a <plat-resources> tags.
         * 
         * @param {Node} node The node whose child nodes may contain {@link plat.ui.IResources|IResources}.
         * 
         * @returns {HTMLElement} The HTML element that represents the defined {@link plat.ui.IResources|IResources}.
         */
        static locateResources(node: Node): HTMLElement {
            var childNodes: Array<Node> = Array.prototype.slice.call(node.childNodes),
                childNode: Node;

            while (childNodes.length > 0) {
                childNode = childNodes.shift();

                if (childNode.nodeName.toLowerCase() === 'plat-resources') {
                    return <HTMLElement>node.removeChild(childNode);
                }
            }

            return null;
        }

        /**
         * @name clone
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Clones an {@link plat.processing.IElementManager|IElementManager} with a new element.
         * 
         * @param {plat.processing.IElementManager} sourceManager The original {@link plat.processing.IElementManager|IElementManager}.
         * @param {plat.processing.IElementManager} parent The parent {@link plat.processing.IElementManager|IElementManager} 
         * for the new clone.
         * @param {Element} element The new element to associate with the clone.
         * @param {plat.ui.ITemplateControl} newControl? An optional control to associate with the clone.
         * @param {plat.processing.INodeMap} nodeMap? The {@link plat.processing.INodeMap} used to clone this 
         * {@link plat.processing.IElementManager|IElementManager}.
         * 
         * @returns {plat.processing.IElementManager} The cloned {@link plat.processing.IElementManager|IElementManager}.
         */
        static clone(sourceManager: IElementManager, parent: IElementManager,
            element: Element, newControl?: ui.ITemplateControl, nodeMap?: INodeMap): IElementManager {

            if (isNull(nodeMap)) {
                nodeMap = ElementManager._cloneNodeMap(sourceManager.nodeMap, element, parent.getUiControl() ||
                    parent.getParentControl(), newControl);
            }

            var manager = new ElementManager(),
                hasNewControl = !isNull(newControl);

            manager.nodeMap = nodeMap;
            manager.parent = parent;

            if (!isNull(parent)) {
                parent.children.push(manager);
            }

            manager.replace = sourceManager.replace;
            manager.replaceNodeLength = sourceManager.replaceNodeLength;
            manager.hasOwnContext = sourceManager.hasOwnContext;
            manager.isClone = true;

            if (!(nodeMap.hasControl || hasNewControl)) {
                manager.bind = () => { return []; };
            }

            if (hasNewControl) {
                ElementManager._managerCache.put(newControl.uid, manager);
            }

            return manager;
        }

        /**
         * @name cloneUiControl
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Clones an {@link plat.ui.ITemplateControl|ITemplateControl} with a new {@link plat.processing.INodeMap|INodeMap}.
         * 
         * @param {plat.processing.INodeMap} sourceMap The source {@link plat.processing.INodeMap|INodeMap} used to clone the 
         * {@link plat.ui.ITemplateControl|ITemplateControl}.
         * @param {plat.ui.ITemplateControl} parent The parent control of the clone.
         * 
         * @returns {plat.ui.ITemplateControl} The cloned {@link plat.ui.ITemplateControl|ITemplateControl}.
         */
        static cloneUiControl(sourceMap: INodeMap, parent: ui.ITemplateControl): ui.ITemplateControl {
            var uiControlNode = sourceMap.uiControlNode;

            if (isNull(uiControlNode) || isNull(uiControlNode.injector)) {
                return;
            }

            var uiControl = uiControlNode.control,
                newUiControl = <ui.ITemplateControl>uiControlNode.injector.inject(),
                resources = ElementManager._ResourcesFactory.getInstance(),
                attributes: ui.IAttributesInstance = acquire(__AttributesInstance);

            newUiControl.parent = parent;
            parent.controls.push(newUiControl);
            newUiControl.controls = [];

            attributes.initialize(newUiControl, sourceMap.attributes);
            newUiControl.attributes = attributes;

            resources.initialize(newUiControl, uiControl.resources);
            newUiControl.resources = resources;

            ElementManager._ResourcesFactory.addControlResources(newUiControl);

            if (!isNull(uiControl.innerTemplate)) {
                newUiControl.innerTemplate = <DocumentFragment>uiControl.innerTemplate.cloneNode(true);
            }

            newUiControl.type = uiControl.type;
            newUiControl.bindableTemplates = ElementManager._BindableTemplatesFactory.create(newUiControl, uiControl.bindableTemplates);
            newUiControl.replaceWith = uiControl.replaceWith;

            return newUiControl;
        }

        /**
         * @name createAttributeControls
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Creates new {@link plat.processing.INode|INodes} corresponding to the element 
         * associated with the {@link plat.processing.INodeMap|INodeMap} or the passed-in element.
         * 
         * @param {plat.processing.INodeMap} nodeMap The {@link plat.processing.INodeMap|INodeMap} that contains 
         * the attribute nodes.
         * @param {plat.ui.ITemplateControl} parent The parent {@link plat.ui.ITemplateControl|ITemplateControl} for 
         * the newly created controls.
         * @param {plat.ui.ITemplateControl} templateControl? The {@link plat.ui.ITemplateControl|ITemplateControl} 
         * linked to these created controls if one exists.
         * @param {Element} newElement? An optional element to use for attributes (used in cloning).
         * @param {boolean} isClone? Whether or not these controls are clones.
         * 
         * @returns {Array<plat.processing.INode>} An array of the newly created {@link plat.processing.INode|INodes}.
         */
        static createAttributeControls(nodeMap: INodeMap, parent: ui.ITemplateControl,
            templateControl?: ui.ITemplateControl, newElement?: Element, isClone?: boolean): Array<INode> {
            var nodes = nodeMap.nodes,
                element = isClone === true ? newElement : nodeMap.element,
                attributes: NamedNodeMap;

            if (isNode(element)) {
                if (element.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                    return isClone === true ? ElementManager._copyAttributeNodes(nodes) : [];
                }

                attributes = element.attributes;
            }

            var attrs = nodeMap.attributes,
                newAttributes: ui.IAttributesInstance,
                node: INode,
                injector: dependency.IInjector<IControl>,
                control: IAttributeControl,
                newNodes: Array<INode> = [],
                length = nodes.length,
                nodeName: string,
                i: number;

            for (i = 0; i < length; ++i) {
                node = nodes[i];
                nodeName = node.nodeName;
                injector = node.injector;
                control = null;

                if (!isNull(injector)) {
                    control = <IAttributeControl>injector.inject();
                    node.control = control;
                    control.parent = parent;
                    control.element = <HTMLElement>element;

                    newAttributes = acquire(__AttributesInstance);
                    newAttributes.initialize(control, attrs);
                    control.attributes = newAttributes;

                    control.type = nodeName;

                    if (!isString(control.uid)) {
                        control.uid = uniqueId(__Plat);
                    }

                    control.templateControl = templateControl;
                }

                if (isClone === true) {
                    newNodes.push({
                        control: control,
                        expressions: node.expressions,
                        node: !attributes ? null : (attributes.getNamedItem(nodeName) || attributes.getNamedItem('data-' + nodeName)),
                        nodeName: nodeName,
                        injector: injector
                    });

                    if (!isNull(control)) {
                        if (!isNull(parent)) {
                            parent.controls.push(control);
                        }

                        if (isFunction(control.initialize)) {
                            control.initialize();
                        }
                    }
                }
            }

            if (!isClone) {
                nodes.sort((a, b) => {
                    var aControl = <IAttributeControl>a.control,
                        bControl = <IAttributeControl>b.control;

                    if (isNull(aControl)) {
                        return 1;
                    } else if (isNull(bControl)) {
                        return -1;
                    }

                    var aPriority = isNumber(aControl.priority) ? aControl.priority : 0,
                        bPriority = isNumber(bControl.priority) ? bControl.priority : 0;

                    return bPriority - aPriority;
                });

                for (i = 0; i < length; ++i) {
                    node = nodes[i];
                    control = <IAttributeControl>node.control;

                    if (!isNull(control)) {
                        if (!isNull(parent)) {
                            parent.controls.push(control);
                        }

                        if (isFunction(control.initialize)) {
                            control.initialize();
                        }
                    }
                }
            }

            return newNodes;
        }

        /**
         * @name getInstance
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Returns a new instance of an {@link plat.processing.ElementManager|ElementManager}.
         * 
         * @returns {plat.processing.IElementManager}
         */
        static getInstance(): IElementManager {
            return new ElementManager();
        }

        /**
         * @name _collectAttributes
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         * @static
         * 
         * @description
         * Iterates over the attributes (NamedNodeMap), creating an {@link plat.processing.INodeMap|INodeMap}. 
         * This map will contain injectors for all the {@link plat.IControl|IControls} as well as parsed expressions 
         * and identifiers found for each Attribute (useful for data binding).
         * 
         * @param {NamedNodeMap} attributes The attributes used to create the {@link plat.processing.INodeMap|INodeMap}.
         * 
         * @returns {plat.processing.INodeMap} The compiled {@link plat.processing.INodeMap|INodeMap}.
         */
        protected static _collectAttributes(attributes: NamedNodeMap): INodeMap {
            var nodes: Array<INode> = [],
                attribute: Attr,
                name: string,
                value: string,
                childContext: expressions.IParsedExpression,
                childIdentifier: string,
                hasMarkup: boolean,
                hasMarkupFn = NodeManager.hasMarkup,
                findMarkup = NodeManager.findMarkup,
                _parser = NodeManager._parser,
                build = NodeManager.build,
                expressions: Array<expressions.IParsedExpression>,
                hasControl = false,
                injector: dependency.IInjector<IControl>,
                length = attributes.length,
                controlAttributes: IObject<string> = {};

            for (var i = 0; i < length; ++i) {
                attribute = attributes[i];
                value = attribute.value;
                name = attribute.name.replace(/^data-/i, '').toLowerCase();
                injector = controlInjectors[name] || viewControlInjectors[name];

                if (name === 'plat-context') {
                    if (value !== '') {
                        childContext = _parser.parse(value);
                        if (childContext.identifiers.length !== 1) {
                            var _Exception: IExceptionStatic = acquire(__ExceptionStatic);
                            _Exception.warn('Incorrect plat-context: ' +
                                value + ', must contain a single identifier.', _Exception.COMPILE);
                        }
                        childIdentifier = childContext.identifiers[0];
                    }
                } else if (name !== 'plat-control') {
                    hasMarkup = hasMarkupFn(value);
                    expressions = hasMarkup ? findMarkup(value) : [];

                    if (!hasControl && (hasMarkup || !isNull(injector))) {
                        hasControl = true;
                    }

                    nodes.push({
                        control: null,
                        node: attribute,
                        nodeName: name,
                        expressions: expressions,
                        injector: injector
                    });
                }

                controlAttributes[camelCase(name)] = value;
            }

            return {
                element: null,
                attributes: controlAttributes,
                nodes: nodes,
                childContext: childIdentifier,
                hasControl: hasControl
            };
        }

        /**
         * @name _copyAttributeNodes
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         * @static
         * 
         * @description
         * Used to copy the attribute nodes during the cloning process.
         * 
         * @param {Array<plat.processing.INode>} nodes The compiled {@link plat.processing.INode|INodes} 
         * to be cloned.
         * 
         * @returns {Array<plat.processing.INode>} The cloned array of {@link plat.processing.INode|INodes}.
         */
        protected static _copyAttributeNodes(nodes: Array<INode>): Array<INode> {
            var newNodes: Array<INode> = [],
                length = nodes.length,
                node: INode;

            for (var i = 0; i < length; ++i) {
                node = nodes[i];
                newNodes.push({
                    expressions: node.expressions,
                    nodeName: node.nodeName
                });
            }

            return newNodes;
        }

        /**
         * @name _cloneNode
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         * @static
         * 
         * @description
         * Clones an {@link plat.processing.INode|INode} with a new node.
         * 
         * @param {plat.processing.INode} sourceNode The original {@link plat.processing.INode|INode}.
         * @param {Node} node The new node used for cloning.
         * @param {plat.ui.ITemplateControl} newControl? An optional new control to associate with the cloned node.
         * 
         * @returns {plat.processing.INode} The cloned {@link plat.processing.INode|INode}.
         */
        protected static _cloneNode(sourceNode: INode, node: Node, newControl?: ui.ITemplateControl): INode {
            return {
                control: newControl,
                injector: sourceNode.injector,
                expressions: sourceNode.expressions,
                node: node,
                nodeName: sourceNode.nodeName
            };
        }

        /**
         * @name _cloneNodeMap
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         * @static
         * 
         * @description
         * Clones an {@link plat.processing.INodeMap|INodeMap} with a new element.
         * 
         * @param {plat.processing.INodeMap} sourceMap The original {@link plat.processing.INodeMap|INodeMap}.
         * @param {Element} element The new Element used for cloning.
         * @param {plat.ui.ITemplateControl} parent The {@link plat.ui.ITemplateControl|ITemplateControl} associated 
         * with the parent {@link plat.processing.IElementManager|IElementManager}. 
         * @param {plat.ui.ITemplateControl} newControl? An optional new {@link plat.ui.ITemplateControl|ITemplateControl} 
         * to associate with the element.
         * 
         * @returns {plat.processing.INodeMap} The cloned {@link plat.processing.INodeMap|INodeMap}.
         */
        protected static _cloneNodeMap(sourceMap: INodeMap, element: Element,
            parent: ui.ITemplateControl, newControl?: ui.ITemplateControl): INodeMap {
            var hasControl = sourceMap.hasControl,
                nodeMap: INodeMap = {
                    attributes: sourceMap.attributes,
                    childContext: sourceMap.childContext,
                    nodes: [],
                    element: <HTMLElement>element,
                    uiControlNode: !isNull(sourceMap.uiControlNode) ?
                    <IUiControlNode>ElementManager._cloneNode(sourceMap.uiControlNode, element, newControl) : null,
                    hasControl: hasControl
                };

            if (hasControl) {
                nodeMap.nodes = ElementManager.createAttributeControls(sourceMap, parent, newControl, element, true);
            }

            return nodeMap;
        }

        /**
         * @name _Promise
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         * 
         * @type {plat.async.IPromise}
         * 
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        _Promise: async.IPromise = acquire(__Promise);
        /**
         * @name _compiler
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         * 
         * @type {plat.processing.ICompiler}
         * 
         * @description
         * Reference to the {@link plat.processing.ICompiler|ICompiler} injectable.
         */
        _compiler: ICompiler = acquire(__Compiler);
        /**
         * @name _ContextManager
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IContextManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.observable.IContextManagerStatic|IContextManagerStatic} injectable.
         */
        _ContextManager: observable.IContextManagerStatic = acquire(__ContextManagerStatic);
        /**
         * @name _CommentManagerFactory
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         * 
         * @type {plat.processing.ICommentManagerFactory}
         * 
         * @description
         * Reference to the {@link plat.processing.ICommentManagerFactory|ICommentManagerFactory} injectable.
         */
        _CommentManagerFactory: ICommentManagerFactory = acquire(__CommentManagerFactory);
        /**
         * @name _ControlFactory
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         * 
         * @type {plat.IControlFactory}
         * 
         * @description
         * Reference to the {@link plat.IControlFactory|IControlFactory} injectable.
         */
        _ControlFactory: IControlFactory = acquire(__ControlFactory);
        /**
         * @name _TemplateControlFactory
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         * 
         * @type {plat.ui.ITemplateControlFactory}
         * 
         * @description
         * Reference to the {@link plat.ui.ITemplateControlFactory|ITemplateControlFactory} injectable.
         */
        _TemplateControlFactory: ui.ITemplateControlFactory = acquire(__TemplateControlFactory);

        /**
         * @name _BindableTemplatesFactory
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IBindableTemplatesFactory}
         * 
         * @description
         * Reference to the {@link plat.ui.IBindableTemplatesFactory|IBindableTemplatesFactory} injectable.
         */
        _BindableTemplatesFactory: ui.IBindableTemplatesFactory = acquire(__BindableTemplatesFactory);

        /**
         * @name children
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         * 
         * @type {Array<plat.processing.INodeManager>}
         * 
         * @description
         * The child managers for this manager.
         */
        children: Array<INodeManager> = [];

        /**
         * @name type
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Specifies the type for this {@link plat.processing.INodeManager|INodeManager}. 
         * It's value is "element".
         */
        type = 'element';

        /**
         * @name replace
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Specifies whether or not this manager has a {@link plat.ui.ITemplateControl|ITemplateControl} which has a 
         * replaceWith property set to null or empty string.
         */
        replace = false;

        /**
         * @name hasOwnContext
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Indicates whether the {@link plat.ui.ITemplateControl|ITemplateControl} for this manager has its own context 
         * or inherits it from a parent.
         */
        hasOwnContext = false;

        /**
         * @name replaceNodeLength
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The length of a replaced control, indicates the number of nodes to slice 
         * out of the parent's childNodes.
         */
        replaceNodeLength: number;

        /**
         * @name loadedPromise
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         * 
         * @type {plat.async.IThenable<void>}
         * 
         * @description
         * In the event that a control has its own context, we need a promise to fullfill 
         * when the control is loaded to avoid loading its parent control first.
         */
        loadedPromise: async.IThenable<void>;

        /**
         * @name contextPromise
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         * 
         * @type {plat.async.IThenable<void>}
         * 
         * @description
         * In the event that a control does not have its own context, we need a promise to fullfill 
         * when the control's context has been set.
         */
        contextPromise: async.IThenable<void>;

        /**
         * @name templatePromise
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         * 
         * @type {plat.async.IThenable<void>}
         * 
         * @description
         * A promise that is set when an {@link plat.ui.ITemplateControl|ITemplateControl} specifies a templateUrl 
         * and its HTML needs to be asynchronously obtained.
         */
        templatePromise: async.IThenable<void>;

        /**
         * @name clone
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Clones the {@link plat.processing.IElementManager|IElementManager} with a new node.
         * 
         * @param {Node} newNode The new element used to clone the ElementManager.
         * @param {plat.processing.IElementManager} parentManager The parent manager for the clone.
         * @param {plat.processing.INodeMap} nodeMap? An optional INodeMap to clone a ui control if needed.
         * 
         * @returns {number} The number of nodes to advance while node traversal is in progress.
         */
        clone(newNode: Node, parentManager: IElementManager, nodeMap?: INodeMap): number {
            var childNodes: Array<Node>,
                clonedManager: IElementManager,
                replace = this.replace,
                children = this.children,
                newControl = !isNull(nodeMap) ? nodeMap.uiControlNode.control : null,
                newControlExists = !isNull(newControl),
                startNodeManager: INodeManager,
                endNodeManager: INodeManager;

            if (!newControlExists) {
                // create new control
                newControl = ElementManager.cloneUiControl(this.nodeMap,
                    (parentManager.getUiControl() || parentManager.getParentControl()));

                newControlExists = !isNull(newControl);
            }

            if (replace) {
                // definitely have newControl
                var nodes = newNode.parentNode.childNodes,
                    arrayProto = Array.prototype,
                    startIndex = arrayProto.indexOf.call(nodes, newNode);

                childNodes = arrayProto.slice.call(nodes, startIndex + 1, startIndex + this.replaceNodeLength);
                clonedManager = ElementManager.clone(this, parentManager, null, newControl, nodeMap);
                newControl.elementNodes = childNodes;
                newControl.startNode = newNode;
                newControl.endNode = childNodes.pop();

                startNodeManager = children.shift();
                endNodeManager = children.shift();

                startNodeManager.clone(newControl.startNode, clonedManager);
                endNodeManager.clone(newControl.endNode, clonedManager);

                if (isFunction(newControl.initialize)) {
                    newControl.initialize();
                }
            } else {
                childNodes = Array.prototype.slice.call(newNode.childNodes);
                clonedManager = ElementManager.clone(this, parentManager, <Element>newNode, newControl, nodeMap);
                nodeMap = clonedManager.nodeMap;

                if (newControlExists) {
                    newControl.element = <HTMLElement>newNode;
                    if (isFunction(newControl.initialize)) {
                        newControl.initialize();
                    }
                }
            }

            if (clonedManager.hasOwnContext) {
                postpone(() => {
                    clonedManager.observeRootContext(newControl, clonedManager.bindAndLoad);
                });
            }

            var length = children.length,
                childNodeOffset = 0;

            for (var i = 0; i < length; ++i) {
                // clone children
                childNodeOffset += children[i].clone(childNodes[childNodeOffset], clonedManager);
            }

            if (replace) {
                children.unshift(endNodeManager);
                children.unshift(startNodeManager);

                return childNodeOffset + 2;
            }

            return 1;
        }

        /**
         * @name initialize
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Initializes both the manager itself and all the controls associated to the manager's 
         * {@link plat.processing.INodeMap|INodeMap}.
         * 
         * @param {plat.processing.INodeMap} nodeMap A map of the nodes (element and attributes) 
         * associated with this {@link plat.processing.IElementManager|IElementManager}.
         * @param {plat.processing.IElementManager} parent The parent 
         * {@link plat.processing.IElementManager|IElementManager}.
         * @param {boolean} dontInitialize? Specifies whether or not the initialize method should 
         * be called for a {@link plat.ui.ITemplateControl|ITemplateControl} if one is attached 
         * to this {@link plat.processing.IElementManager|IElementManager}.
         * 
         * @returns {void}
         */
        initialize(nodeMap: INodeMap, parent: IElementManager, dontInitialize?: boolean): void {
            super.initialize(nodeMap, parent);

            var controlNode = nodeMap.uiControlNode,
                hasUiControl = !isNull(controlNode),
                control: ui.ITemplateControl;

            if (hasUiControl) {
                this._populateUiControl();
                control = controlNode.control;
                this.hasOwnContext = control.hasOwnContext;
            }

            if (nodeMap.hasControl) {
                ElementManager.createAttributeControls(nodeMap, this.getParentControl(), control);
            }

            if (!dontInitialize && hasUiControl && isFunction(control.initialize)) {
                control.initialize();
            }
        }

        /**
         * @name bind
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Links the data context to the DOM (data-binding).
         * 
         * @returns {Array<plat.IControl>} An array of the controls contained within this 
         * {@link plat.processing.IElementManager|IElementManager's} associated 
         * {@link plat.processing.INodeMap|INodeMap}.
         */
        bind(): Array<IControl> {
            var nodeMap = this.nodeMap,
                parent = this.getParentControl(),
                controlNode = nodeMap.uiControlNode,
                controls: Array<IControl> = [];

            if (!isNull(controlNode)) {
                var uiControl = controlNode.control,
                    childContext = nodeMap.childContext,
                    getManager = this._ContextManager.getManager,
                    contextManager: observable.IContextManager,
                    absoluteContextPath = isNull(parent) ? __CONTEXT : parent.absoluteContextPath,
                    _TemplateControlFactory = this._TemplateControlFactory,
                    inheritsContext = !uiControl.hasOwnContext;

                controls.push(uiControl);

                if (inheritsContext && !isNull(childContext)) {
                    if (childContext[0] === '@') {
                        var split = childContext.split('.'),
                            alias = split.shift().slice(1),
                            resourceObj = _TemplateControlFactory.findResource(uiControl, alias),
                            _Exception: IExceptionStatic;

                        if (isObject(resourceObj)) {
                            var resource = resourceObj.resource;
                            if (isObject(resource) && resource.type === __OBSERVABLE_RESOURCE) {
                                absoluteContextPath = 'resources.' + alias + '.value' + (split.length > 0 ? ('.' + split.join('.')) : '');
                                uiControl.root = resourceObj.control;
                            } else {
                                _Exception = acquire(__ExceptionStatic);
                                _Exception.warn('Only resources of type "observable" can be set as context.',
                                    _Exception.CONTEXT);
                            }
                        } else {
                            _Exception = acquire(__ExceptionStatic);
                            _Exception.warn('Could not set the context of ' + uiControl.type +
                                ' with the resource specified as "' + childContext + '".',
                                _Exception.CONTEXT);
                        }
                    } else {
                        absoluteContextPath += '.' + childContext;
                    }
                }

                uiControl.root = this._ControlFactory.getRootControl(uiControl) || uiControl;

                contextManager = getManager(uiControl.root);

                var awaitContext = false;

                if (inheritsContext) {
                    uiControl.context = contextManager.getContext(absoluteContextPath.split('.'));
                    awaitContext = isUndefined(uiControl.context);
                } else {
                    absoluteContextPath = __CONTEXT;
                }

                if (awaitContext) {
                    this.contextPromise = new this._Promise<void>((resolve, reject) => {
                        var removeListener = contextManager.observe(absoluteContextPath, {
                            uid: uiControl.uid,
                            listener: (newValue, oldValue) => {
                                if (isUndefined(newValue)) {
                                    return;
                                }
                                removeListener();
                                uiControl.context = newValue;
                                this._beforeLoad(uiControl, absoluteContextPath);
                                resolve();
                            }
                        });
                    });
                } else {
                    this._beforeLoad(uiControl, absoluteContextPath);
                }
            }

            this._observeControlIdentifiers(nodeMap.nodes, parent, controls);

            return controls;
        }

        /**
         * @name setUiControlTemplate
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Sets the template for an manager by obtaining any needed HTML templates and 
         * calling its associated {@link plat.ui.ITemplateControl|ITemplateControl's} 
         * setTemplate method.
         * 
         * @param {string} templateUrl? The URL for the associated {@link plat.ui.ITemplateControl|ITemplateControl's} 
         * HTML template.
         * 
         * @returns {void}
         */
        setUiControlTemplate(templateUrl?: string): void {
            var controlNode = this.nodeMap.uiControlNode;

            if (!isNull(controlNode)) {
                var control = controlNode.control;

                this.templatePromise = this._TemplateControlFactory.determineTemplate(control, templateUrl).then((template) => {
                    this.templatePromise = null;
                    this._initializeControl(control, <DocumentFragment>template.cloneNode(true));
                }, (error) => {
                        this.templatePromise = null;
                        if (isNull(error)) {
                            var template: DocumentFragment = error;

                            if (this._BindableTemplatesFactory.isBoundControl(control)) {
                                template = <DocumentFragment>appendChildren(control.element.childNodes);
                            }

                            this._initializeControl(control, template);
                        } else {
                            postpone(() => {
                                var _Exception: IExceptionStatic = acquire(__ExceptionStatic);
                                _Exception.fatal(error, _Exception.COMPILE);
                            });
                        }
                    });

                return;
            }

            if (!isNull(this.parent)) {
                return;
            }

            this.bindAndLoad();
        }

        /**
         * @name getUiControl
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Retrieves the {@link plat.ui.ITemplateControl|ITemplateControl} instance 
         * associated with this {@link plat.processing.IElementManager|IElementManager}.
         * 
         * @returns {plat.ui.ITemplateControl} The {@link plat.ui.ITemplateControl|ITemplateControl} instance 
         * associated with this {@link plat.processing.IElementManager|IElementManager}.
         */
        getUiControl(): ui.ITemplateControl {
            var uiControlNode = this.nodeMap.uiControlNode;
            if (isNull(uiControlNode)) {
                return;
            }

            return uiControlNode.control;
        }

        /**
         * @name fulfillTemplate
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Fullfills any template promises and finishes the compile phase for the HTML template associated 
         * with this {@link plat.processing.IElementManager|IElementManager}.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when this manager's template and all 
         * child manager's templates have been fulfilled.
         */
        fulfillTemplate(): async.IThenable<void> {
            if (!isNull(this.templatePromise)) {
                return this.templatePromise.then(() => {
                    return this._fulfillChildTemplates();
                });
            }

            return this._fulfillChildTemplates();
        }

        /**
         * @name bindAndLoad
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Binds context to the DOM and loads controls.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when this manager's controls and all 
         * child manager's controls have been bound and loaded.
         */
        bindAndLoad(): async.IThenable<void> {
            var controls = this.bind(),
                promise: async.IThenable<void[]>;

            if (isPromise(this.contextPromise)) {
                promise = this.contextPromise.then(() => {
                    return this._bindChildren();
                });
            } else {
                promise = this._bindChildren();
            }

            return promise.then(() => {
                return this._loadControls(<Array<IAttributeControl>>controls, this.getUiControl());
            }).catch((error: any) => {
                    postpone(() => {
                        var _Exception: IExceptionStatic = acquire(__ExceptionStatic);
                        _Exception.fatal(error, _Exception.BIND);
                    });
                });
        }

        /**
         * @name observeRootContext
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Observes the root context for controls that specify their own context, and initiates 
         * a load upon a successful set of the context.
         * 
         * @param {plat.ui.ITemplateControl} root The {@link plat.ui.ITemplateControl|ITemplateControl} specifying its own context.
         * @param {() => async.IThenable<void>} loadMethod The function to initiate the loading of the root control and its 
         * children.
         * 
         * @returns {void}
         */
        observeRootContext(root: ui.ITemplateControl, loadMethod: () => async.IThenable<void>): void {
            loadMethod = loadMethod.bind(this);
            if (!isNull(root.context)) {
                this.loadedPromise = loadMethod();
                return;
            }

            this.loadedPromise = new this._Promise<void>((resolve) => {
                var removeListener = this._ContextManager.getManager(root).observe(__CONTEXT, {
                    listener: () => {
                        removeListener();
                        loadMethod().then(resolve);
                    },
                    uid: root.uid
                });
            }).catch((error) => {
                    postpone(() => {
                        var _Exception: IExceptionStatic = acquire(__ExceptionStatic);
                        _Exception.fatal(error, _Exception.BIND);
                    });
                });
        }

        /**
         * @name _beforeLoad
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         * 
         * @description
         * Finalizes all the properties on an {@link plat.ui.ITemplateControl|ITemplateControl} 
         * before loading.
         * 
         * @param {plat.ui.ITemplateControl} uiControl The control to finalize.
         * @param {string} absoluteContextPath The absoluteContextPath of the uiControl.
         * 
         * @returns {void}
         */
        protected _beforeLoad(uiControl: ui.ITemplateControl, absoluteContextPath: string): void {
            var contextManager = this._ContextManager.getManager(uiControl.root),
                _TemplateControlFactory = this._TemplateControlFactory;

            (<any>uiControl).zCC__plat = contextManager.observe(absoluteContextPath, {
                uid: uiControl.uid,
                listener: (newValue, oldValue) => {
                    uiControl.context = newValue;
                }
            });

            _TemplateControlFactory.setAbsoluteContextPath(uiControl, absoluteContextPath);
            _TemplateControlFactory.setContextResources(uiControl);
            ElementManager._ResourcesFactory.bindResources(uiControl.resources);

            if (!this.replace) {
                var element = uiControl.element;
                if (!isNull(element) && isFunction(element.removeAttribute)) {
                    element.removeAttribute(__Hide);
                }
            }
        }

        /**
         * @name _bindChildren
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         * 
         * @description
         * Binds context to the DOM and calls bindAndLoad on all children.
         * 
         * @returns {plat.async.IThenable<void[]>} A promise that resolves when this manager's controls and all 
         * child manager's controls have been bound and loaded.
         */
        protected _bindChildren(): async.IThenable<void[]> {
            var children = this.children,
                length = children.length,
                child: IElementManager,
                promises: Array<async.IThenable<void>> = [];

            for (var i = 0; i < length; ++i) {
                child = <IElementManager>children[i];

                if (child.hasOwnContext) {
                    promises.push(child.loadedPromise);
                } else if (!isUndefined(child.children)) {
                    promises.push(child.bindAndLoad());
                } else {
                    child.bind();
                }
            }

            return this._Promise.all(promises);
        }

        /**
         * @name _observeControlIdentifiers
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         * 
         * @description
         * Observes the identifiers associated with this manager's {@link plat.processing.INode|INodes}.
         * 
         * @param {Array<plat.processing.INode>} nodes The array of {@link plat.processing.INode|INodes} to iterate through.
         * @param {plat.ui.ITemplateControl} parent The parent {@link plat.ui.ITemplateControl|ITemplateControl} for context.
         * @param {Array<plat.IControl>} controls The array of controls whose attributes will need to be updated 
         * upon the context changing.
         * 
         * @returns {void}
         */
        protected _observeControlIdentifiers(nodes: Array<INode>, parent: ui.ITemplateControl, controls: Array<IControl>): void {
            var length = nodes.length,
                bindings: Array<INode> = [],
                attributeChanged = this._attributeChanged,
                hasParent = !isNull(parent),
                node: INode,
                control: IControl,
                i = 0;

            for (; i < length; ++i) {
                node = nodes[i];
                control = node.control;

                if (hasParent && node.expressions.length > 0) {
                    NodeManager.observeExpressions(node.expressions, parent,
                        attributeChanged.bind(this, node, parent, controls));
                    bindings.push(node);
                }

                if (!isNull(control)) {
                    controls.push(control);
                }
            }

            length = bindings.length;
            for (i = 0; i < length; ++i) {
                this._attributeChanged(bindings[i], parent, controls);
            }
        }

        /**
         * @name _loadControls
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         * 
         * @description
         * Loads the potential attribute based controls associated with this 
         * {@link plat.processing.IElementManager|IElementManager} and 
         * attaches the corresponding {@link plat.ui.ITemplateControl|ITemplateControl} if available.
         * 
         * @param {Array<plat.IAttributeControl>} controls The array of attribute based controls to load.
         * @param {plat.ui.ITemplateControl} templateControl The {@link plat.ui.ITemplateControl|ITemplateControl} 
         * associated with this manager.
         * 
         * @returns {void}
         */
        protected _loadControls(controls: Array<IAttributeControl>, templateControl: ui.ITemplateControl): async.IThenable<void> {
            var length = controls.length,
                control: IAttributeControl,
                load = this._ControlFactory.load,
                templateControlLoaded = isNull(templateControl),
                promise: async.IThenable<void>,
                templateControlPriority: number,
                i: number;

            if (templateControlLoaded) {
                // don't need to set templateControlPriority because it will never be checked.
                i = 0;
            } else {
                var priority = templateControl.priority;
                templateControlPriority = isNumber(priority) ? priority : 100;
                i = 1;
            }

            for (; i < length; ++i) {
                control = controls[i];
                control.templateControl = templateControl;

                if (!templateControlLoaded && templateControlPriority > control.priority) {
                    templateControlLoaded = true;
                    promise = load(templateControl);
                }

                load(control);
            }

            if (!templateControlLoaded) {
                promise = load(templateControl);
            }

            return promise;
        }

        /**
         * @name _fulfillAndLoad
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         * 
         * @description
         * Fulfills the template promise prior to binding and loading the control.
         * 
         * @returns {plat.async.IThenable<void>} A promise that fulfills when this manager and 
         * its associated controls are bound and loaded.
         */
        protected _fulfillAndLoad(): async.IThenable<void> {
            return this.fulfillTemplate().then(() => {
                return this.bindAndLoad();
            }).catch((error) => {
                    postpone(() => {
                        var _Exception: IExceptionStatic = acquire(__ExceptionStatic);
                        _Exception.fatal(error, _Exception.BIND);
                    });
                });
        }

        /**
         * @name _populateUiControl
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         * 
         * @description
         * Populates the {@link plat.ui.ITemplateControl|ITemplateControl} properties associated with this manager  
         * if one exists.
         * 
         * @returns {void}
         */
        protected _populateUiControl(): void {
            var nodeMap = this.nodeMap,
                parent = this.getParentControl(),
                controlNode = nodeMap.uiControlNode,
                uiControl = controlNode.control,
                uid = uiControl.uid,
                resources = uiControl.resources,
                element = nodeMap.element,
                childNodes = Array.prototype.slice.call(element.childNodes),
                newAttributes: ui.IAttributesInstance = acquire(__AttributesInstance),
                replace = this.replace = (uiControl.replaceWith === null || uiControl.replaceWith === '');

            if (!isString(uid)) {
                uid = uiControl.uid = uniqueId(__Plat);
            }

            ElementManager._managerCache.put(uid, this);

            if (!isNull(parent) && uiControl.parent !== parent) {
                parent.controls.push(uiControl);
                uiControl.parent = parent;
            }

            if (isFunction(element.setAttribute)) {
                element.setAttribute(__Hide, '');
            }

            uiControl.element = element;
            uiControl.controls = [];

            newAttributes.initialize(uiControl, nodeMap.attributes);
            uiControl.attributes = newAttributes;

            if (isObject(resources) && isFunction(resources.add)) {
                resources.add(controlNode.resourceElement);
            } else {
                resources = ElementManager._ResourcesFactory.getInstance();
                resources.initialize(uiControl, controlNode.resourceElement);
                uiControl.resources = resources;
            }

            ElementManager._ResourcesFactory.addControlResources(uiControl);
            uiControl.type = controlNode.nodeName;

            uiControl.bindableTemplates = uiControl.bindableTemplates ||
            ElementManager._BindableTemplatesFactory.create(uiControl);

            if (childNodes.length > 0 && (!isEmpty(uiControl.templateString) || !isEmpty(uiControl.templateUrl))) {
                uiControl.innerTemplate = <DocumentFragment>appendChildren(childNodes);
            }

            if (replace) {
                this._replaceElement(uiControl, nodeMap);
            }
        }

        /**
         * @name _replaceElement
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         * 
         * @description
         * Removes the {@link plat.ui.ITemplateControl|ITemplateControl's} element. Called if its replaceWith property is 
         * null or empty string.
         * 
         * @param {plat.ui.ITemplateControl} control The {@link plat.ui.ITemplateControl|ITemplateControl} whose element 
         * will be removed.
         * @param {plat.processing.INodeMap} nodeMap The {@link plat.processing.INodeMap|INodeMap} associated with this manager.
         * 
         * @returns {void}
         */
        protected _replaceElement(control: ui.ITemplateControl, nodeMap: INodeMap): void {
            var element = nodeMap.element,
                parentNode = element.parentNode,
                _document = ElementManager._document,
                controlType = control.type,
                controlUid = control.uid,
                startNode = control.startNode = _document.createComment(controlType + ' ' + controlUid + __START_NODE),
                endNode = control.endNode = _document.createComment(controlType + ' ' + controlUid + __END_NODE),
                create = this._CommentManagerFactory.create;

            create(startNode, this);
            create(endNode, this);

            parentNode.insertBefore(startNode, element);
            parentNode.insertBefore(endNode, element.nextSibling);
            control.elementNodes = replace(element);

            control.element = nodeMap.element = null;
        }

        /**
         * @name _initializeControl
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         * 
         * @description
         * Initializes a control's template and compiles the control.
         * 
         * @param {plat.ui.ITemplateControl} uiControl The {@link plat.ui.ITemplateControl|ITemplateControl} 
         * associated with this manager.
         * @param {DocumentFragment} template The associated {@link plat.ui.ITemplateControl|ITemplateControl's} 
         * template.
         * 
         * @returns {void}
         */
        protected _initializeControl(uiControl: ui.ITemplateControl, template: DocumentFragment): void {
            var element = this.nodeMap.element,
                // have to check if null since isNull checks for undefined case
                replaceElement = this.replace,
                endNode: Node;

            if (!isNull(template)) {
                var resourceElement = ElementManager.locateResources(template);

                if (!isNull(resourceElement)) {
                    uiControl.resources.add(ElementManager._ResourcesFactory.parseElement(resourceElement));
                }

                if (replaceElement) {
                    endNode = uiControl.endNode;
                    uiControl.elementNodes = Array.prototype.slice.call(template.childNodes);
                    insertBefore(endNode.parentNode, template, endNode);
                } else {
                    insertBefore(element, template, element.lastChild);
                }
            }

            if (isFunction(uiControl.setTemplate)) {
                uiControl.setTemplate();
            }

            if (replaceElement) {
                this._compiler.compile(uiControl.elementNodes, uiControl);
                var startNode = uiControl.startNode,
                    parentNode = startNode.parentNode,
                    childNodes: Array<Node> = Array.prototype.slice.call(parentNode.childNodes);

                endNode = uiControl.endNode;

                uiControl.elementNodes = childNodes.slice(childNodes.indexOf(startNode) + 1, childNodes.indexOf(endNode));
                this.replaceNodeLength = uiControl.elementNodes.length + 2;
            } else {
                this._compiler.compile(element, uiControl);
            }

            if (uiControl.hasOwnContext && !this.isClone) {
                this.observeRootContext(uiControl, this._fulfillAndLoad);
            } else if (isNull(uiControl.parent)) {
                this._fulfillAndLoad();
            }
        }

        /**
         * @name _attributeChanged
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         * 
         * @description
         * A function to handle updating an attribute on all controls that have it 
         * as a property upon a change in its value.
         * 
         * @param {plat.processing.INode} node The {@link plat.processing.INode|INode} where the change occurred.
         * @param {plat.ui.ITemplateControl} parent The parent {@link plat.ui.ITemplateControl|ITemplateControl} used for context.
         * @param {Array<plat.IControl>} controls The controls that have the changed attribute as a property.
         * 
         * @returns {void}
         */
        protected _attributeChanged(node: INode, parent: ui.ITemplateControl, controls: Array<IControl>): void {
            var length = controls.length,
                key = camelCase(node.nodeName),
                value = NodeManager.build(node.expressions, parent),
                attributes: ui.Attributes,
                oldValue: any;

            for (var i = 0; i < length; ++i) {
                attributes = <ui.Attributes>controls[i].attributes;
                oldValue = attributes[key];
                attributes[key] = value;

                (<any>attributes)._attributeChanged(key, value, oldValue);
            }

            if (!this.replace) {
                (<Attr>node.node).value = value;
            }
        }

        /**
         * @name _fulfillChildTemplates
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         * 
         * @description
         * Runs through all the children of this manager and calls fulfillTemplate.
         * 
         * @returns {plat.async.IThenable<void>} A promise that fullfills when all 
         * child managers have fullfilled their templates.
         */
        protected _fulfillChildTemplates(): async.IThenable<void> {
            var children = this.children,
                child: IElementManager,
                length = children.length,
                promises: Array<async.IThenable<void>> = [];

            for (var i = 0; i < length; ++i) {
                child = <IElementManager>children[i];
                if (!isUndefined(child.children)) {
                    promises.push(child.fulfillTemplate());
                }
            }

            return this._Promise.all(promises).catch((error) => {
                postpone(() => {
                    var _Exception: IExceptionStatic = acquire(__ExceptionStatic);
                    _Exception.fatal(error, _Exception.COMPILE);
                });
            });
        }
    }

    /**
     * The Type for referencing the '_ElementManagerFactory' injectable as a dependency.
     */
    export function IElementManagerFactory(
        _document?: Document,
        _managerCache?: storage.ICache<IElementManager>,
        _ResourcesFactory?: ui.IResourcesFactory,
        _BindableTemplatesFactory?: ui.IBindableTemplatesFactory): IElementManagerFactory {
        (<any>ElementManager)._document = _document;
        (<any>ElementManager)._managerCache = _managerCache;
        (<any>ElementManager)._ResourcesFactory = _ResourcesFactory;
        (<any>ElementManager)._BindableTemplatesFactory = _BindableTemplatesFactory;
        return ElementManager;
    }

    register.injectable(__ElementManagerFactory, IElementManagerFactory, [
        __Document,
        __ManagerCache,
        __ResourcesFactory,
        __BindableTemplatesFactory
    ], __FACTORY);

    /**
     * @name IElementManagerFactory
     * @memberof plat.processing
     * @kind interface
     * 
     * @description
     * Creates and manages a class for dealing with Element nodes.
     */
    export interface IElementManagerFactory {
        /**
         * @name create
         * @memberof plat.processing.IElementManagerFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Determines if the associated Element has controls that need to be instantiated or Attr nodes
         * containing text markup. If controls exist or markup is found a new 
         * {@link plat.processing.ElementManager|ElementManager} will be created,
         * else an empty {@link plat.processing.INodeManager|INodeManager} will be added to the Array of 
         * {@link plat.processing.INodeManager|INodeManagers}.
         * 
         * @param {Element} element The Element to use to identifier markup and controls.
         * @param {plat.processing.IElementManager} parent? The parent {@link plat.processing.IElementManager|IElementManager} 
         * used for context inheritance.
         * 
         * @returns {plat.processing.IElementManager}
         */
        create(element: Element, parent?: IElementManager): IElementManager;

        /**
         * @name createAttributeControls
         * @memberof plat.processing.IElementManagerFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Creates new {@link plat.processing.INode|INodes} corresponding to the element 
         * associated with the {@link plat.processing.INodeMap|INodeMap} or the passed-in element.
         * 
         * @param {plat.processing.INodeMap} nodeMap The {@link plat.processing.INodeMap|INodeMap} that contains 
         * the attribute nodes.
         * @param {plat.ui.ITemplateControl} parent The parent {@link plat.ui.ITemplateControl|ITemplateControl} for 
         * the newly created controls.
         * @param {plat.ui.ITemplateControl} templateControl? The {@link plat.ui.ITemplateControl|ITemplateControl} 
         * linked to these created controls if one exists.
         * @param {Element} newElement? An optional element to use for attributes (used in cloning).
         * @param {boolean} isClone? Whether or not these controls are clones.
         * 
         * @returns {Array<plat.processing.INode>} An array of the newly created {@link plat.processing.INode|INodes}.
         */
        createAttributeControls(nodeMap: INodeMap, parent: ui.ITemplateControl,
            templateControl?: ui.ITemplateControl, newElement?: Element, isClone?: boolean): Array<INode>;

        /**
         * @name cloneUiControl
         * @memberof plat.processing.IElementManagerFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Clones an {@link plat.ui.ITemplateControl|ITemplateControl} with a new {@link plat.processing.INodeMap|INodeMap}.
         * 
         * @param {plat.processing.INodeMap} sourceMap The source {@link plat.processing.INodeMap|INodeMap} used to clone the 
         * {@link plat.ui.ITemplateControl|ITemplateControl}.
         * @param {plat.ui.ITemplateControl} parent The parent control of the clone.
         * 
         * @returns {plat.ui.ITemplateControl} The cloned {@link plat.ui.ITemplateControl|ITemplateControl}.
         */
        cloneUiControl(sourceMap: INodeMap, parent: ui.ITemplateControl): ui.ITemplateControl;

        /**
         * @name clone
         * @memberof plat.processing.IElementManagerFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Clones an {@link plat.processing.IElementManager|IElementManager} with a new element.
         * 
         * @param {plat.processing.IElementManager} sourceManager The original {@link plat.processing.IElementManager|IElementManager}.
         * @param {plat.processing.IElementManager} parent The parent {@link plat.processing.IElementManager|IElementManager} 
         * for the new clone.
         * @param {Element} element The new element to associate with the clone.
         * @param {plat.ui.ITemplateControl} newControl? An optional control to associate with the clone.
         * @param {plat.processing.INodeMap} nodeMap? The {@link plat.processing.INodeMap} used to clone this 
         * {@link plat.processing.IElementManager|IElementManager}.
         * 
         * @returns {plat.processing.IElementManager} The cloned {@link plat.processing.IElementManager|IElementManager}.
         */
        clone(sourceManager: IElementManager, parent: IElementManager,
            element: Element, newControl?: ui.ITemplateControl, nodeMap?: INodeMap): IElementManager;

        /**
         * @name locateResources
         * @memberof plat.processing.IElementManagerFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Looks through the Node's child nodes to try and find any 
         * defined {@link plat.ui.IResources|IResources} in a <plat-resources> tags.
         * 
         * @param {Node} node The node whose child nodes may contain {@link plat.ui.IResources|IResources}.
         * 
         * @returns {HTMLElement} The HTML element that represents the defined {@link plat.ui.IResources|IResources}.
         */
        locateResources(node: Node): HTMLElement;

        /**
         * @name getInstance
         * @memberof plat.processing.IElementManagerFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Returns a new instance of an {@link plat.processing.ElementManager|ElementManager}.
         * 
         * @returns {plat.processing.IElementManager}
         */
        getInstance(): IElementManager;
    }

    /**
     * @name IElementManager
     * @memberof plat.processing
     * @kind interface
     * 
     * @extends {plat.processing.INodeManager}
     * 
     * @description
     * Responsible for initializing and data-binding controls associated to an Element.
     */
    export interface IElementManager extends INodeManager {
        /**
         * @name children
         * @memberof plat.processing.IElementManager
         * @kind property
         * @access public
         * 
         * @type {Array<plat.processing.INodeManager>}
         * 
         * @description
         * The child managers for this manager.
         */
        children: Array<INodeManager>;

        /**
         * @name replace
         * @memberof plat.processing.IElementManager
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Specifies whether or not this manager has a {@link plat.ui.ITemplateControl|ITemplateControl} which has a 
         * replaceWith property set to null or empty string.
         */
        replace: boolean;

        /**
         * @name replaceNodeLength
         * @memberof plat.processing.IElementManager
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The length of a replaced control, indicates the number of nodes to slice 
         * out of the parent's childNodes.
         */
        replaceNodeLength: number;

        /**
         * @name hasOwnContext
         * @memberof plat.processing.IElementManager
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Indicates whether the {@link plat.ui.ITemplateControl|ITemplateControl} for this manager has its own context 
         * or inherits it from a parent.
         */
        hasOwnContext: boolean;

        /**
         * @name isClone
         * @memberof plat.processing.IElementManager
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Lets us know when an {@link plat.processing.IElementManager|IElementManager} is a cloned manager, or the compiled 
         * manager from {@link plat.ui.IBindableTemplates|IBindableTemplates}. We do not want to bind and load compiled 
         * managers that are clones.
         */
        isClone: boolean;

        /**
         * @name loadedPromise
         * @memberof plat.processing.IElementManager
         * @kind property
         * @access public
         * 
         * @type {plat.async.IThenable<void>}
         * 
         * @description
         * In the event that a control has its own context, we need a promise to fullfill 
         * when the control is loaded to avoid loading its parent control first.
         */
        loadedPromise: async.IThenable<void>;

        /**
         * @name contextPromise
         * @memberof plat.processing.IElementManager
         * @kind property
         * @access public
         * 
         * @type {plat.async.IThenable<void>}
         * 
         * @description
         * In the event that a control does not have its own context, we need a promise to fullfill 
         * when the control's context has been set.
         */
        contextPromise: async.IThenable<void>;

        /**
         * @name templatePromise
         * @memberof plat.processing.IElementManager
         * @kind property
         * @access public
         * 
         * @type {plat.async.IThenable<void>}
         * 
         * @description
         * A promise that is set when an {@link plat.ui.ITemplateControl|ITemplateControl} specifies a templateUrl 
         * and its HTML needs to be asynchronously obtained.
         */
        templatePromise: async.IThenable<void>;

        /**
         * @name clone
         * @memberof plat.processing.IElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Clones the {@link plat.processing.IElementManager|IElementManager} with a new node.
         * 
         * @param {Node} newNode The new element used to clone the ElementManager.
         * @param {plat.processing.IElementManager} parentManager The parent manager for the clone.
         * @param {plat.processing.INodeMap} nodeMap? An optional INodeMap to clone a ui control if needed.
         * 
         * @returns {number} The number of nodes to advance while node traversal is in progress.
         */
        clone(newNode: Node, parentManager: IElementManager, nodeMap?: INodeMap): number;

        /**
         * @name initialize
         * @memberof plat.processing.IElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Initializes both the manager itself and all the controls associated to the manager's 
         * {@link plat.processing.INodeMap|INodeMap}.
         * 
         * @param {plat.processing.INodeMap} nodeMap A map of the nodes (element and attributes) 
         * associated with this {@link plat.processing.IElementManager|IElementManager}.
         * @param {plat.processing.IElementManager} parent The parent 
         * {@link plat.processing.IElementManager|IElementManager}.
         * @param {boolean} dontInitialize? Specifies whether or not the initialize method should 
         * be called for a {@link plat.ui.ITemplateControl|ITemplateControl} if one is attached 
         * to this {@link plat.processing.IElementManager|IElementManager}.
         * 
         * @returns {void}
         */
        initialize(nodeMap: INodeMap, parent: IElementManager, dontInitialize?: boolean): void;

        /**
         * @name bind
         * @memberof plat.processing.IElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Links the data context to the DOM (data-binding).
         * 
         * @returns {Array<plat.IControl>} An array of the controls contained within this 
         * {@link plat.processing.IElementManager|IElementManager's} associated 
         * {@link plat.processing.INodeMap|INodeMap}.
         */
        bind(): void;

        /**
         * @name setUiControlTemplate
         * @memberof plat.processing.IElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Sets the template for an manager by obtaining any needed HTML templates and 
         * calling its associated {@link plat.ui.ITemplateControl|ITemplateControl's} 
         * setTemplate method.
         * 
         * @param {string} templateUrl? The URL for the associated {@link plat.ui.ITemplateControl|ITemplateControl's} 
         * HTML template.
         * 
         * @returns {void}
         */
        setUiControlTemplate(templateUrl?: string): void;

        /**
         * @name getUiControl
         * @memberof plat.processing.IElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Retrieves the {@link plat.ui.ITemplateControl|ITemplateControl} instance 
         * associated with this {@link plat.processing.IElementManager|IElementManager}.
         * 
         * @returns {plat.ui.ITemplateControl} The {@link plat.ui.ITemplateControl|ITemplateControl} instance 
         * associated with this {@link plat.processing.IElementManager|IElementManager}.
         */
        getUiControl(): ui.ITemplateControl;

        /**
         * @name fulfillTemplate
         * @memberof plat.processing.IElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Fullfills any template promises and finishes the compile phase for the HTML template associated 
         * with this {@link plat.processing.IElementManager|IElementManager}.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when this manager's template and all 
         * child manager's templates have been fulfilled.
         */
        fulfillTemplate(): async.IThenable<void>;

        /**
         * @name observeRootContext
         * @memberof plat.processing.IElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Observes the root context for controls that specify their own context, and initiates 
         * a load upon a successful set of the context.
         * 
         * @param {plat.ui.ITemplateControl} root The {@link plat.ui.ITemplateControl|ITemplateControl} specifying its own context.
         * @param {() => async.IThenable<void>} loadMethod The function to initiate the loading of the root control and its 
         * children.
         * 
         * @returns {void}
         */
        observeRootContext(root: ui.ITemplateControl, loadMethod: () => async.IThenable<void>): void;

        /**
         * @name bindAndLoad
         * @memberof plat.processing.IElementManager
         * @kind function
         * @access public
         * 
         * @description
         * Binds context to the DOM and loads controls.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when this manager's controls and all 
         * child manager's controls have been bound and loaded.
         */
        bindAndLoad(): async.IThenable<void>;
    }
}

