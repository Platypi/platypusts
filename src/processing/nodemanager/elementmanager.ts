namespace plat.processing {
    'use strict';

    /**
     * @name ElementManager
     * @memberof plat.processing
     * @kind class
     *
     * @extends {plat.processing.NodeManager}
     *
     * @description
     * A class used to manage element nodes. Provides a way for compiling and binding the
     * element/template. Also provides methods for cloning an
     * {@link plat.processing.ElementManager|ElementManager}.
     */
    export class ElementManager extends NodeManager {
        protected static _inject: any = {
            _Promise: __Promise,
            _ContextManager: __ContextManagerStatic,
            _compiler: __Compiler,
            _CommentManagerFactory: __CommentManagerFactory,
            _ControlFactory: __ControlFactory,
            _TemplateControlFactory: __TemplateControlFactory,
            _BindableTemplatesFactory: __BindableTemplatesFactory,
            _log: __Log,
        };

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
         * @type {plat.storage.Cache<processing.ElementManager>}
         *
         * @description
         * Reference to a cache injectable that stores {@link plat.processing.ElementManager|ElementManagers}.
         */
        protected static _managerCache: storage.Cache<ElementManager>;

        /**
         * @name _ResourcesFactory
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         *
         * @type {plat.ui.IResourcesFactory}
         *
         * @description
         * Reference to the {@link plat.ui.IResourcesFactory|ResourcesFactory} injectable.
         */
        protected static _ResourcesFactory: ui.IResourcesFactory;

        /**
         * @name _AttributesFactory
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         *
         * @type {plat.ui.Attributes}
         *
         * @description
         * Reference to the {@link plat.ui.Attributes|Attributes} injectable.
         */
        protected static _AttributesFactory: typeof ui.Attributes;

        /**
         * @name _BindableTemplatesFactory
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         *
         * @type {plat.ui.IBindableTemplatesFactory}
         *
         * @description
         * Reference to the {@link plat.ui.IBindableTemplatesFactory|BindableTemplatesFactory} injectable.
         */
        protected static _BindableTemplatesFactory: ui.IBindableTemplatesFactory;

        /**
         * @name _log
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         * @static
         *
         * @type {plat.debug.Log}
         * @description
         * Reference to the {@link plat.debug.Log|Log} injectable.
         */
        protected static _log: debug.Log;

        /**
         * @name _Promise
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         *
         * @type {plat.async.IPromise}
         *
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        protected _Promise: async.IPromise;

        /**
         * @name _compiler
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         *
         * @type {plat.processing.Compiler}
         *
         * @description
         * Reference to the {@link plat.processing.Compiler|Compiler} injectable.
         */
        protected _compiler: Compiler;

        /**
         * @name _ContextManager
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         *
         * @type {plat.observable.IContextManagerStatic}
         *
         * @description
         * Reference to the {@link plat.observable.IContextManagerStatic|ContextManagerStatic} injectable.
         */
        protected _ContextManager: observable.IContextManagerStatic;

        /**
         * @name _CommentManagerFactory
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         *
         * @type {plat.processing.ICommentManagerFactory}
         *
         * @description
         * Reference to the {@link plat.processing.ICommentManagerFactory|ICommentManagerFactory} injectable.
         */
        protected _CommentManagerFactory: ICommentManagerFactory;

        /**
         * @name _ControlFactory
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         *
         * @type {plat.IControlFactory}
         *
         * @description
         * Reference to the {@link plat.IControlFactory|IControlFactory} injectable.
         */
        protected _ControlFactory: IControlFactory;

        /**
         * @name _TemplateControlFactory
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         *
         * @type {plat.ui.ITemplateControlFactory}
         *
         * @description
         * Reference to the {@link plat.ui.ITemplateControlFactory|ITemplateControlFactory} injectable.
         */
        protected _TemplateControlFactory: ui.ITemplateControlFactory;

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
        protected _BindableTemplatesFactory: ui.IBindableTemplatesFactory;

        /**
         * @name _log
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         *
         * @type {plat.debug.Log}
         * @description
         * Reference to the {@link plat.debug.Log|Log} injectable.
         */
        protected _log: debug.Log;

        /**
         * @name children
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         *
         * @type {Array<plat.processing.NodeManager>}
         *
         * @description
         * The child managers for this manager.
         */
        public children: NodeManager[] = [];

        /**
         * @name type
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * Specifies the type for this {@link plat.processing.NodeManager|NodeManager}.
         * It's value is "element".
         */
        public type: string = 'element';

        /**
         * @name replace
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         *
         * @type {boolean}
         *
         * @description
         * Specifies whether or not this manager has a {@link plat.ui.TemplateControl|TemplateControl} which has a
         * replaceWith property set to null or empty string.
         */
        public replace: boolean = false;

        /**
         * @name hasOwnContext
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         *
         * @type {boolean}
         *
         * @description
         * Indicates whether the {@link plat.ui.TemplateControl|TemplateControl} for this manager has its own context
         * or inherits it from a parent.
         */
        public hasOwnContext: boolean = false;

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
        public replaceNodeLength: number;

        /**
         * @name contextPromise
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         *
         * @type {plat.async.Promise<void>}
         *
         * @description
         * In the event that a control does not have its own context, we need a promise to fulfill
         * when the control's context has been set.
         */
        public contextPromise: async.Promise<void>;

        /**
         * @name templatePromise
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access public
         *
         * @type {plat.async.Promise<void>}
         *
         * @description
         * A promise that is set when an {@link plat.ui.TemplateControl|TemplateControl} specifies a templateUrl
         * and its HTML needs to be asynchronously obtained.
         */
        public templatePromise: async.Promise<void>;

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
         * else an empty {@link plat.processing.NodeManager|NodeManager} will be added to the Array of
         * {@link plat.processing.NodeManager|NodeManagers}.
         *
         * @param {Element} element The Element to use to identifier markup and controls.
         * @param {plat.processing.ElementManager} parent? The parent {@link plat.processing.ElementManager|ElementManager}
         * used for context inheritance.
         *
         * @returns {plat.processing.ElementManager}
         */
        public static create(
            element: Element,
            parent?: ElementManager
        ): ElementManager {
            let name = element.nodeName.toLowerCase();
            const nodeName = name;
            let injector = controlInjectors[name];

            if (!isObject(injector)) {
                injector = viewControlInjectors[name];
            }

            let noControlAttribute = true;
            let hasUiControl = false;
            let uiControlNode: IUiControlNode;

            if (isNull(injector)) {
                if (element.hasAttribute(__Control)) {
                    name = element.getAttribute(__Control).toLowerCase();
                    injector = controlInjectors[name];

                    if (!isObject(injector)) {
                        injector = viewControlInjectors[name];
                    }

                    noControlAttribute = false;
                } else if (
                    element.hasAttribute(__AttributePrefix + __Control)
                ) {
                    name = element
                        .getAttribute(__AttributePrefix + __Control)
                        .toLowerCase();
                    injector = controlInjectors[name];

                    if (!isObject(injector)) {
                        injector = viewControlInjectors[name];
                    }

                    noControlAttribute = false;
                }
            }

            if (!isNull(injector)) {
                const uiControl = <ui.TemplateControl>injector.inject();
                const resourceElement = ElementManager.locateResources(element);

                uiControlNode = {
                    control: uiControl,
                    resourceElement: resourceElement,
                    nodeName: name,
                    expressions: [],
                    injector: injector,
                };

                hasUiControl = true;

                if (noControlAttribute) {
                    element.setAttribute(__Control, name);
                }

                let replacementType = uiControl.replaceWith;
                const replaceWithDiv =
                    replacementType === 'any' && noControlAttribute;
                if (
                    !isEmpty(replacementType) &&
                    (replacementType !== 'any' || replaceWithDiv) &&
                    replacementType.toLowerCase() !== nodeName
                ) {
                    if (replaceWithDiv) {
                        replacementType = 'div';
                    }

                    const replacement = ElementManager._document.createElement(
                        replacementType
                    );
                    if (replacement.nodeType === Node.ELEMENT_NODE) {
                        element = replaceWith(element, replacement);
                    }
                }
            }

            const elementMap = ElementManager._collectAttributes(
                element.attributes
            );
            const manager: ElementManager = ElementManager.getInstance();

            elementMap.element = <HTMLElement>element;

            if (!hasUiControl && isString(elementMap.childContext)) {
                injector = injectableInjectors[__TemplateControlInstance];
                hasUiControl = true;
                elementMap.uiControlNode = {
                    control: <ui.TemplateControl>injector.inject(),
                    resourceElement: null,
                    nodeName: __TemplateContext,
                    expressions: [],
                    injector: injector,
                };
            } else {
                elementMap.uiControlNode = uiControlNode;
            }

            manager.initialize(elementMap, parent);

            if (!(elementMap.hasControl || hasUiControl)) {
                manager.bind = (): Control[] => {
                    return [];
                };
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
         * defined {@link plat.ui.Resources|Resources} in a <plat-resources> tags.
         *
         * @param {Node} node The node whose child nodes may contain {@link plat.ui.Resources|Resources}.
         *
         * @returns {HTMLElement} The HTML element that represents the defined {@link plat.ui.Resources|Resources}.
         */
        public static locateResources(node: Node): HTMLElement {
            const childNodes: Node[] = Array.prototype.slice.call(
                node.childNodes
            );
            let childNode: Node;
            let nodeName: string;

            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                nodeName = childNode.nodeName.toLowerCase();

                if (
                    nodeName === __Resources ||
                    nodeName === `x-${__Resources}`
                ) {
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
         * Clones an {@link plat.processing.ElementManager|ElementManager} with a new element.
         *
         * @param {plat.processing.ElementManager} sourceManager The original {@link plat.processing.ElementManager|ElementManager}.
         * @param {plat.processing.ElementManager} parent The parent {@link plat.processing.ElementManager|ElementManager}
         * for the new clone.
         * @param {Element} element The new element to associate with the clone.
         * @param {plat.ui.TemplateControl} newControl? An optional control to associate with the clone.
         * @param {plat.processing.INodeMap} nodeMap? The {@link plat.processing.INodeMap} used to clone this
         * {@link plat.processing.ElementManager|ElementManager}.
         *
         * @returns {plat.processing.ElementManager} The cloned {@link plat.processing.ElementManager|ElementManager}.
         */
        public static clone(
            sourceManager: ElementManager,
            parent: ElementManager,
            element: Element,
            newControl?: ui.TemplateControl,
            nodeMap?: INodeMap
        ): ElementManager {
            if (isNull(nodeMap)) {
                let parentControl = parent.getUiControl();

                if (!isObject(parentControl)) {
                    parentControl = parent.getParentControl();
                }

                nodeMap = ElementManager._cloneNodeMap(
                    sourceManager.nodeMap,
                    element,
                    parentControl,
                    newControl
                );
            }

            const manager: ElementManager = ElementManager.getInstance();
            const hasNewControl = !isNull(newControl);

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
                manager.bind = (): Control[] => {
                    return [];
                };
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
         * Clones an {@link plat.ui.TemplateControl|TemplateControl} with a new {@link plat.processing.INodeMap|INodeMap}.
         *
         * @param {plat.processing.INodeMap} sourceMap The source {@link plat.processing.INodeMap|INodeMap} used to clone the
         * {@link plat.ui.TemplateControl|TemplateControl}.
         * @param {plat.ui.TemplateControl} parent The parent control of the clone.
         *
         * @returns {plat.ui.TemplateControl} The cloned {@link plat.ui.TemplateControl|TemplateControl}.
         */
        public static cloneUiControl(
            sourceMap: INodeMap,
            parent: ui.TemplateControl
        ): ui.TemplateControl {
            const uiControlNode = sourceMap.uiControlNode;

            if (isNull(uiControlNode) || isNull(uiControlNode.injector)) {
                return;
            }

            const uiControl = uiControlNode.control;
            const newUiControl = <ui.TemplateControl>uiControlNode.injector.inject();
            const resources = ElementManager._ResourcesFactory.getInstance();
            const attributes: ui.Attributes = ElementManager._AttributesFactory.getInstance();

            newUiControl.parent = parent;
            parent.controls.push(newUiControl);
            newUiControl.controls = [];

            attributes.initialize(newUiControl, sourceMap.attributes);
            newUiControl.attributes = attributes;

            resources.initialize(newUiControl, uiControl.resources);
            newUiControl.resources = resources;

            ElementManager._ResourcesFactory.addControlResources(newUiControl);

            if (!isNull(uiControl.innerTemplate)) {
                newUiControl.innerTemplate = <DocumentFragment>uiControl.innerTemplate.cloneNode(
                    true
                );
            }

            newUiControl.type = uiControl.type;
            newUiControl.bindableTemplates = ElementManager._BindableTemplatesFactory.create(
                newUiControl,
                uiControl.bindableTemplates
            );
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
         * @param {plat.ui.TemplateControl} parent The parent {@link plat.ui.TemplateControl|TemplateControl} for
         * the newly created controls.
         * @param {plat.ui.TemplateControl} templateControl? The {@link plat.ui.TemplateControl|TemplateControl}
         * linked to these created controls if one exists.
         * @param {Element} newElement? An optional element to use for attributes (used in cloning).
         * @param {boolean} isClone? Whether or not these controls are clones.
         *
         * @returns {Array<plat.processing.INode>} An array of the newly created {@link plat.processing.INode|INodes}.
         */
        public static createAttributeControls(
            nodeMap: INodeMap,
            parent: ui.TemplateControl,
            templateControl?: ui.TemplateControl,
            newElement?: Element,
            isClone?: boolean
        ): INode[] {
            const nodes = nodeMap.nodes;
            const element = isClone === true ? newElement : nodeMap.element;
            let attributes: NamedNodeMap;

            if (isNode(element)) {
                if (element.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                    return isClone === true
                        ? ElementManager._copyAttributeNodes(nodes)
                        : [];
                }

                attributes = element.attributes;
            }

            const attrs = nodeMap.attributes;
            const newNodes: INode[] = [];
            const length = nodes.length;
            let newAttributes: ui.Attributes;
            let node: INode;
            let injector: dependency.Injector<Control>;
            let control: AttributeControl;
            let nodeName: string;
            let i: number;

            for (i = 0; i < length; i += 1) {
                node = nodes[i];
                nodeName = node.nodeName;
                injector = node.injector;
                control = null;

                if (!isNull(injector)) {
                    control = <AttributeControl>injector.inject();
                    node.control = control;
                    control.parent = parent;
                    control.element = <HTMLElement>element;

                    newAttributes = ElementManager._AttributesFactory.getInstance();
                    newAttributes.initialize(control, attrs);
                    control.attributes = newAttributes;

                    control.type = nodeName;

                    if (!isString(control.uid)) {
                        control.uid = uniqueId(__Plat);
                    }

                    control.templateControl = templateControl;
                }

                if (isClone === true) {
                    const haveAttributes = isObject(attributes);
                    let namedItem = null;

                    if (haveAttributes) {
                        namedItem = attributes.getNamedItem(nodeName);

                        if (!isObject(namedItem)) {
                            namedItem = attributes.getNamedItem(
                                __AttributePrefix + nodeName
                            );
                        }
                    }

                    newNodes.push({
                        control: control,
                        expressions: node.expressions,
                        node: namedItem,
                        nodeName: nodeName,
                        injector: injector,
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
                nodes.sort((a, b): number => {
                    const aControl = <AttributeControl>a.control;
                    const bControl = <AttributeControl>b.control;

                    if (isNull(aControl)) {
                        return 1;
                    } else if (isNull(bControl)) {
                        return -1;
                    }

                    const aPriority = isNumber(aControl.priority)
                        ? aControl.priority
                        : 0;
                    const bPriority = isNumber(bControl.priority)
                        ? bControl.priority
                        : 0;

                    return bPriority - aPriority;
                });

                for (i = 0; i < length; i += 1) {
                    node = nodes[i];
                    control = <AttributeControl>node.control;

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
         * @returns {plat.processing.ElementManager}
         */
        public static getInstance(): ElementManager {
            const manager = new ElementManager();

            manager._Promise = acquire(__Promise);
            manager._ContextManager = NodeManager._ContextManager;
            manager._compiler = acquire(__Compiler);
            manager._CommentManagerFactory = acquire(__CommentManagerFactory);
            manager._ControlFactory = acquire(__ControlFactory);
            manager._TemplateControlFactory =
                NodeManager._TemplateControlFactory;
            manager._BindableTemplatesFactory =
                ElementManager._BindableTemplatesFactory;
            manager._log = ElementManager._log;

            return manager;
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
         * This map will contain injectors for all the {@link plat.Control|Controls} as well as parsed expressions
         * and identifiers found for each Attribute (useful for data binding).
         *
         * @param {NamedNodeMap} attributes The attributes used to create the {@link plat.processing.INodeMap|INodeMap}.
         *
         * @returns {plat.processing.INodeMap} The compiled {@link plat.processing.INodeMap|INodeMap}.
         */
        protected static _collectAttributes(
            attributes: NamedNodeMap
        ): INodeMap {
            const nodes: INode[] = [];
            const hasMarkupFn = NodeManager.hasMarkup;
            const findMarkup = NodeManager.findMarkup;
            const _parser = NodeManager._parser;
            const length = attributes.length;
            const controlAttributes: IObject<string> = {};
            let attribute: Attr;
            let name: string;
            let value: string;
            let childContext: expressions.IParsedExpression;
            let childIdentifier: string;
            let hasMarkup: boolean;
            let expressions: expressions.IParsedExpression[];
            let hasControl = false;
            let injector: dependency.Injector<Control>;

            for (let i = 0; i < length; i += 1) {
                attribute = attributes[i];
                value = attribute.value;
                name = attribute.name.replace(/^data-/i, '').toLowerCase();
                injector = controlInjectors[name];

                if (!isObject(injector)) {
                    injector = viewControlInjectors[name];
                }

                if (name === __Context) {
                    if (value !== '') {
                        childContext = _parser.parse(value);
                        if (childContext.identifiers.length !== 1) {
                            ElementManager._log.warn(
                                `Incorrect ${__Context}: ${value}, must contain a single identifier.`
                            );
                        }
                        childIdentifier = childContext.identifiers[0];
                    }
                } else if (name !== __Control) {
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
                        injector: injector,
                    });
                }

                controlAttributes[camelCase(name)] = value;
            }

            return {
                element: null,
                attributes: controlAttributes,
                nodes: nodes,
                childContext: childIdentifier,
                hasControl: hasControl,
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
        protected static _copyAttributeNodes(nodes: INode[]): INode[] {
            const newNodes: INode[] = [];
            const length = nodes.length;
            let node: INode;

            for (let i = 0; i < length; i += 1) {
                node = nodes[i];
                newNodes.push({
                    expressions: node.expressions,
                    nodeName: node.nodeName,
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
         * @param {plat.ui.TemplateControl} newControl? An optional new control to associate with the cloned node.
         *
         * @returns {plat.processing.INode} The cloned {@link plat.processing.INode|INode}.
         */
        protected static _cloneNode(
            sourceNode: INode,
            node: Node,
            newControl?: ui.TemplateControl
        ): INode {
            return {
                control: newControl,
                injector: sourceNode.injector,
                expressions: sourceNode.expressions,
                node: node,
                nodeName: sourceNode.nodeName,
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
         * @param {plat.ui.TemplateControl} parent The {@link plat.ui.TemplateControl|TemplateControl} associated
         * with the parent {@link plat.processing.ElementManager|ElementManager}.
         * @param {plat.ui.TemplateControl} newControl? An optional new {@link plat.ui.TemplateControl|TemplateControl}
         * to associate with the element.
         *
         * @returns {plat.processing.INodeMap} The cloned {@link plat.processing.INodeMap|INodeMap}.
         */
        protected static _cloneNodeMap(
            sourceMap: INodeMap,
            element: Element,
            parent: ui.TemplateControl,
            newControl?: ui.TemplateControl
        ): INodeMap {
            const hasControl = sourceMap.hasControl;
            const nodeMap: INodeMap = {
                attributes: sourceMap.attributes,
                childContext: sourceMap.childContext,
                nodes: [],
                element: <HTMLElement>element,
                uiControlNode: !isNull(sourceMap.uiControlNode)
                    ? <IUiControlNode>ElementManager._cloneNode(
                          sourceMap.uiControlNode,
                          element,
                          newControl
                      )
                    : null,
                hasControl: hasControl,
            };

            if (hasControl) {
                nodeMap.nodes = ElementManager.createAttributeControls(
                    sourceMap,
                    parent,
                    newControl,
                    element,
                    true
                );
            }

            return nodeMap;
        }

        /**
         * @name clone
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         *
         * @description
         * Clones the {@link plat.processing.ElementManager|ElementManager} with a new node.
         *
         * @param {Node} newNode The new element used to clone the ElementManager.
         * @param {plat.processing.ElementManager} parentManager The parent manager for the clone.
         * @param {plat.processing.INodeMap} nodeMap? An optional INodeMap to clone a ui control if needed.
         *
         * @returns {number} The number of nodes to advance while node traversal is in progress.
         */
        public clone(
            newNode: Node,
            parentManager: ElementManager,
            nodeMap?: INodeMap
        ): number {
            const replace = this.replace;
            const children = this.children;
            let newControl = !isNull(nodeMap)
                ? nodeMap.uiControlNode.control
                : null;
            let newControlExists = !isNull(newControl);
            let childNodes: Node[];
            let clonedManager: ElementManager;
            let startNodeManager: NodeManager;
            let endNodeManager: NodeManager;

            if (!newControlExists) {
                // create new control
                let toClone = parentManager.getUiControl();

                if (!isObject(toClone)) {
                    toClone = parentManager.getParentControl();
                }

                newControl = ElementManager.cloneUiControl(
                    this.nodeMap,
                    toClone
                );

                newControlExists = !isNull(newControl);
            }

            if (replace) {
                // definitely have newControl
                const nodes = newNode.parentNode.childNodes;
                const arrayProto = Array.prototype;
                const startIndex: number = arrayProto.indexOf.call(
                    nodes,
                    newNode
                );

                childNodes = arrayProto.slice.call(
                    nodes,
                    startIndex + 1,
                    startIndex + this.replaceNodeLength
                );
                clonedManager = ElementManager.clone(
                    this,
                    parentManager,
                    null,
                    newControl,
                    nodeMap
                );
                newControl.elementNodes = childNodes;
                newControl.startNode = <Comment>newNode;
                newControl.endNode = <Comment>childNodes.pop();

                startNodeManager = children.shift();
                endNodeManager = children.shift();

                startNodeManager.clone(newControl.startNode, clonedManager);
                endNodeManager.clone(newControl.endNode, clonedManager);

                if (isFunction(newControl.initialize)) {
                    newControl.initialize();
                }
            } else {
                childNodes = Array.prototype.slice.call(newNode.childNodes);
                clonedManager = ElementManager.clone(
                    this,
                    parentManager,
                    <Element>newNode,
                    newControl,
                    nodeMap
                );
                nodeMap = clonedManager.nodeMap;

                if (newControlExists) {
                    newControl.element = <HTMLElement>newNode;
                    if (isFunction(newControl.initialize)) {
                        newControl.initialize();
                    }
                }
            }

            const length = children.length;
            let childNodeOffset = 0;

            for (let i = 0; i < length; i += 1) {
                // clone children
                childNodeOffset += children[i].clone(
                    childNodes[childNodeOffset],
                    clonedManager
                );
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
         * associated with this {@link plat.processing.ElementManager|ElementManager}.
         * @param {plat.processing.ElementManager} parent The parent
         * {@link plat.processing.ElementManager|ElementManager}.
         * @param {boolean} dontInitialize? Specifies whether or not the initialize method should
         * be called for a {@link plat.ui.TemplateControl|TemplateControl} if one is attached
         * to this {@link plat.processing.ElementManager|ElementManager}.
         *
         * @returns {void}
         */
        public initialize(
            nodeMap: INodeMap,
            parent: ElementManager,
            dontInitialize?: boolean
        ): void {
            super.initialize(nodeMap, parent);

            const controlNode = nodeMap.uiControlNode;
            const hasUiControl = !isNull(controlNode);
            let control: ui.TemplateControl;

            if (hasUiControl) {
                this._populateUiControl();
                control = controlNode.control;
                this.hasOwnContext = control.hasOwnContext;
            }

            if (nodeMap.hasControl) {
                ElementManager.createAttributeControls(
                    nodeMap,
                    this.getParentControl(),
                    control
                );
            }

            if (
                !dontInitialize &&
                hasUiControl &&
                isFunction(control.initialize)
            ) {
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
         * @returns {Array<plat.Control>} An array of the controls contained within this
         * {@link plat.processing.ElementManager|ElementManager's} associated
         * {@link plat.processing.INodeMap|INodeMap}.
         */
        public bind(): Control[] {
            const nodeMap = this.nodeMap;
            const parent = this.getParentControl();
            const controlNode = nodeMap.uiControlNode;
            const controls: Control[] = [];

            if (!isNull(controlNode)) {
                const uiControl = controlNode.control;
                const _TemplateControlFactory = this._TemplateControlFactory;
                const inheritsContext = !uiControl.hasOwnContext;
                const getManager = this._ContextManager.getManager;
                let childContext = <string>nodeMap.childContext;
                let contextManager: observable.ContextManager;
                let absoluteContextPath = isNull(parent)
                    ? __CONTEXT
                    : parent.absoluteContextPath;

                controls.push(uiControl);

                if (inheritsContext && !isNull(childContext)) {
                    if (childContext[0] === '@') {
                        const split = childContext.split('.');
                        const topIdentifier = split.shift();
                        const alias = topIdentifier.slice(1);
                        const resourceObj = _TemplateControlFactory.findResource(
                            uiControl,
                            alias
                        );

                        if (isObject(resourceObj)) {
                            const resource = resourceObj.resource;
                            childContext =
                                split.length > 0 ? `.${split.join('.')}` : '';

                            if (alias === __CONTEXT_RESOURCE) {
                                absoluteContextPath += childContext;
                            } else if (alias === __ROOT_CONTEXT_RESOURCE) {
                                absoluteContextPath = __CONTEXT + childContext;
                            } else if (
                                resource.type === __OBSERVABLE_RESOURCE ||
                                resource.type === __LITERAL_RESOURCE
                            ) {
                                absoluteContextPath = `resources.${alias}.value${childContext}`;
                                uiControl.root = resourceObj.control;
                            } else {
                                this._log.warn(
                                    'Only resources of type "observable" can be set as context.'
                                );
                            }
                        } else {
                            this._log.warn(
                                `Could not set the context of ${
                                    uiControl.type
                                } with the resource specified as "${childContext}".`
                            );
                        }
                    } else {
                        absoluteContextPath += `.${childContext}`;
                    }
                }

                if (!isObject(uiControl.root)) {
                    uiControl.root = this._ControlFactory.getRootControl(
                        uiControl
                    );

                    if (!isObject(uiControl.root)) {
                        uiControl.root = uiControl;
                    }
                }

                contextManager = getManager(uiControl.root);

                let awaitContext = false;

                if (inheritsContext) {
                    uiControl.context = contextManager.getContext(
                        absoluteContextPath.split('.'),
                        false
                    );
                    awaitContext =
                        isUndefined(uiControl.context) &&
                        !this._BindableTemplatesFactory.isBoundControl(
                            uiControl
                        );
                } else {
                    absoluteContextPath = __CONTEXT;
                }

                if (awaitContext) {
                    this.contextPromise = new this._Promise<void>(
                        (resolve, reject): void => {
                            const removeListener = contextManager.observe(
                                absoluteContextPath,
                                {
                                    uid: uiControl.uid,
                                    listener: (newValue, oldValue): void => {
                                        if (isUndefined(newValue)) {
                                            return;
                                        }
                                        removeListener();
                                        uiControl.context = newValue;
                                        this._beforeLoad(
                                            uiControl,
                                            absoluteContextPath
                                        );
                                        resolve();
                                    },
                                }
                            );
                        }
                    );
                } else {
                    this._beforeLoad(uiControl, absoluteContextPath);
                }
            }

            this._observeControlIdentifiers(
                nodeMap.nodes,
                parent,
                controls,
                nodeMap.element
            );

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
         * calling its associated {@link plat.ui.TemplateControl|TemplateControl's}
         * setTemplate method.
         *
         * @param {string} templateUrl? The URL for the associated {@link plat.ui.TemplateControl|TemplateControl's}
         * HTML template.
         *
         * @returns {void}
         */
        public setUiControlTemplate(templateUrl?: string): void {
            const controlNode = this.nodeMap.uiControlNode;

            if (!isNull(controlNode)) {
                const control = controlNode.control;

                this.templatePromise = this._TemplateControlFactory
                    .determineTemplate(control, templateUrl)
                    .then(
                        (template): void => {
                            this.templatePromise = null;
                            this._initializeControl(
                                control,
                                <DocumentFragment>template.cloneNode(true)
                            );
                        },
                        (error: any): void => {
                            this.templatePromise = null;
                            if (isNull(error)) {
                                let template: DocumentFragment = error;

                                if (
                                    this._BindableTemplatesFactory.isBoundControl(
                                        control
                                    )
                                ) {
                                    template = <DocumentFragment>appendChildren(
                                        control.element.childNodes
                                    );
                                }

                                this._initializeControl(control, template);
                            } else {
                                postpone((): void => {
                                    if (isString(error)) {
                                        error = new Error(error);
                                    }

                                    this._log.error(error);
                                });
                            }
                        }
                    );

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
         * Retrieves the {@link plat.ui.TemplateControl|TemplateControl} instance
         * associated with this {@link plat.processing.ElementManager|ElementManager}.
         *
         * @returns {plat.ui.TemplateControl} The {@link plat.ui.TemplateControl|TemplateControl} instance
         * associated with this {@link plat.processing.ElementManager|ElementManager}.
         */
        public getUiControl(): ui.TemplateControl {
            const uiControlNode = this.nodeMap.uiControlNode;
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
         * Fulfills any template promises and finishes the compile phase for the HTML template associated
         * with this {@link plat.processing.ElementManager|ElementManager}.
         *
         * @returns {plat.async.Promise<void>} A promise that resolves when this manager's template and all
         * child manager's templates have been fulfilled.
         */
        public fulfillTemplate(): async.Promise<void | void[]> {
            if (!isNull(this.templatePromise)) {
                return this.templatePromise.then((): async.Promise<void | void[]> => {
                    return this._fulfillChildTemplates();
                });
            }

            return this._fulfillChildTemplates();
        }

        /**
         * @name fulfillAndLoad
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access public
         *
         * @description
         * Fulfills the template promise prior to binding and loading the control.
         *
         * @returns {plat.async.Promise<void>} A promise that fulfills when this manager and
         * its associated controls are bound and loaded.
         */
        public fulfillAndLoad(): async.Promise<void> {
            return this.fulfillTemplate()
                .then((): async.Promise<void> => {
                    return this.bindAndLoad();
                })
                .catch((error: any): void => {
                    postpone((): void => {
                        if (isString(error)) {
                            error = new Error(error);
                        }

                        this._log.error(error);
                    });
                });
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
         * @returns {plat.async.Promise<void>} A promise that resolves when this manager's controls and all
         * child manager's controls have been bound and loaded.
         */
        public bindAndLoad(): async.Promise<void> {
            const controls = this.bind();
            let promise: async.Promise<void[]>;

            if (isPromise(this.contextPromise)) {
                promise = this.contextPromise.then((): async.Promise<
                    void[]
                > => {
                    return this._bindChildren();
                });
            } else {
                promise = this._bindChildren();
            }

            return promise
                .then((): async.Promise<void> => {
                    return this._loadControls(
                        <AttributeControl[]>controls,
                        this.getUiControl()
                    );
                })
                .catch((error: any): void => {
                    postpone((): void => {
                        if (isString(error)) {
                            error = new Error(error);
                        }

                        this._log.error(error);
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
         * @param {plat.ui.TemplateControl} root The {@link plat.ui.TemplateControl|TemplateControl} specifying its own context.
         * @param {() => async.Promise<void>} loadMethod The function to initiate the loading of the root control and its
         * children.
         *
         * @returns {plat.async.Promise<void>} A promise that fulfills when the context has been set on the control.
         */
        public observeRootContext(
            root: ui.TemplateControl,
            loadMethod: () => async.Promise<void>
        ): async.Promise<void> {
            loadMethod = loadMethod.bind(this);
            if (!isNull(root.context)) {
                return loadMethod();
            }

            return new this._Promise<void>((resolve): void => {
                const removeListener = this._ContextManager
                    .getManager(root)
                    .observe(__CONTEXT, {
                        listener: (): void => {
                            removeListener();
                            loadMethod().then(resolve);
                        },
                        uid: root.uid,
                    });
            }).catch((error): void => {
                postpone((): void => {
                    if (isString(error)) {
                        error = new Error(error);
                    }

                    this._log.error(error);
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
         * Finalizes all the properties on an {@link plat.ui.TemplateControl|TemplateControl}
         * before loading.
         *
         * @param {plat.ui.TemplateControl} uiControl The control to finalize.
         * @param {string} absoluteContextPath The absoluteContextPath of the uiControl.
         *
         * @returns {void}
         */
        protected _beforeLoad(
            uiControl: ui.TemplateControl,
            absoluteContextPath: string
        ): void {
            const contextManager = this._ContextManager.getManager(
                uiControl.root
            );
            const _TemplateControlFactory = this._TemplateControlFactory;

            (<any>uiControl).zCC__plat = contextManager.observe(
                absoluteContextPath,
                {
                    uid: uiControl.uid,
                    priority: __CONTEXT_CHANGED_PRIORITY,
                    listener: (newValue, oldValue): void => {
                        uiControl.context = newValue;
                    },
                }
            );

            _TemplateControlFactory.setAbsoluteContextPath(
                uiControl,
                absoluteContextPath
            );
            _TemplateControlFactory.setContextResources(uiControl);
            ElementManager._ResourcesFactory.bindResources(uiControl.resources);
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
         * @returns {plat.async.Promise<void[]>} A promise that resolves when this manager's controls and all
         * child manager's controls have been bound and loaded.
         */
        protected _bindChildren(): async.Promise<void[]> {
            const children = this.children;
            const length = children.length;
            const promises: async.Promise<void>[] = [];
            let child: ElementManager;

            for (let i = 0; i < length; i += 1) {
                child = <ElementManager>children[i];

                if (child.hasOwnContext) {
                    if (this.isClone) {
                        promises.push(
                            child.observeRootContext(
                                child.getUiControl(),
                                child.bindAndLoad
                            )
                        );
                    } else {
                        promises.push(
                            child.observeRootContext(
                                child.getUiControl(),
                                child.fulfillAndLoad
                            )
                        );
                    }
                } else if (!isUndefined(child.children)) {
                    promises.push(child.bindAndLoad());
                } else {
                    child.bind();
                }
            }

            return this._Promise.all(promises);
        }

        /**
         * @name _loadControls
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         *
         * @description
         * Loads the potential attribute based controls associated with this
         * {@link plat.processing.ElementManager|ElementManager} and
         * attaches the corresponding {@link plat.ui.TemplateControl|TemplateControl} if available.
         *
         * @param {Array<plat.AttributeControl>} controls The array of attribute based controls to load.
         * @param {plat.ui.TemplateControl} templateControl The {@link plat.ui.TemplateControl|TemplateControl}
         * associated with this manager.
         *
         * @returns {void}
         */
        protected _loadControls(
            controls: AttributeControl[],
            templateControl: ui.TemplateControl
        ): async.Promise<void> {
            const length = controls.length;
            const load = this._ControlFactory.load;
            let control: AttributeControl;
            let templateControlLoaded = isNull(templateControl);
            let promise: async.Promise<void>;
            let templateControlPriority: number;
            let i: number;

            if (templateControlLoaded) {
                // don't need to set templateControlPriority because it will never be checked.
                i = 0;
            } else {
                const priority = templateControl.priority;
                templateControlPriority = isNumber(priority) ? priority : 100;
                i = 1;
            }

            for (; i < length; i += 1) {
                control = controls[i];
                control.templateControl = templateControl;

                if (
                    !templateControlLoaded &&
                    templateControlPriority > control.priority
                ) {
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
         * @name _populateUiControl
         * @memberof plat.processing.ElementManager
         * @kind function
         * @access protected
         *
         * @description
         * Populates the {@link plat.ui.TemplateControl|TemplateControl} properties associated with this manager
         * if one exists.
         *
         * @returns {void}
         */
        protected _populateUiControl(): void {
            const nodeMap = this.nodeMap;
            const parent = this.getParentControl();
            const controlNode = nodeMap.uiControlNode;
            const uiControl = controlNode.control;
            const element = nodeMap.element;
            const childNodes = Array.prototype.slice.call(element.childNodes);
            const newAttributes: ui.Attributes = ElementManager._AttributesFactory.getInstance();
            const replace = (this.replace =
                uiControl.replaceWith === null || uiControl.replaceWith === '');
            let uid = uiControl.uid;
            let resources = uiControl.resources;

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

            if (!isObject(uiControl.bindableTemplates)) {
                uiControl.bindableTemplates = this._BindableTemplatesFactory.create(
                    uiControl
                );
            }

            if (
                childNodes.length > 0 &&
                (!isEmpty(uiControl.templateString) ||
                    !isEmpty(uiControl.templateUrl))
            ) {
                uiControl.innerTemplate = <DocumentFragment>appendChildren(
                    childNodes
                );
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
         * Removes the {@link plat.ui.TemplateControl|TemplateControl's} element. Called if its replaceWith property is
         * null or empty string.
         *
         * @param {plat.ui.TemplateControl} control The {@link plat.ui.TemplateControl|TemplateControl} whose element
         * will be removed.
         * @param {plat.processing.INodeMap} nodeMap The {@link plat.processing.INodeMap|INodeMap} associated with this manager.
         *
         * @returns {void}
         */
        protected _replaceElement(
            control: ui.TemplateControl,
            nodeMap: INodeMap
        ): void {
            const element = nodeMap.element;
            const parentNode = element.parentNode;
            const _document = ElementManager._document;
            const controlType = control.type;
            const controlUid = control.uid;
            const startNode = (control.startNode = _document.createComment(
                `${controlType} ${controlUid}${__START_NODE}`
            ));
            const endNode = (control.endNode = _document.createComment(
                `${controlType} ${controlUid}${__END_NODE}`
            ));
            const create = this._CommentManagerFactory.create;

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
         * @param {plat.ui.TemplateControl} uiControl The {@link plat.ui.TemplateControl|TemplateControl}
         * associated with this manager.
         * @param {DocumentFragment} template The associated {@link plat.ui.TemplateControl|TemplateControl's}
         * template.
         *
         * @returns {void}
         */
        protected _initializeControl(
            uiControl: ui.TemplateControl,
            template: DocumentFragment
        ): void {
            const element = this.nodeMap.element;
            // have to check if null since isNull checks for undefined case
            const replaceElement = this.replace;
            let endNode: Node;

            if (!isNull(template)) {
                const resourceElement = ElementManager.locateResources(
                    template
                );

                if (!isNull(resourceElement)) {
                    uiControl.resources.add(
                        ElementManager._ResourcesFactory.parseElement(
                            resourceElement
                        )
                    );
                }

                if (replaceElement) {
                    endNode = uiControl.endNode;
                    uiControl.elementNodes = Array.prototype.slice.call(
                        template.childNodes
                    );
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
                const startNode = uiControl.startNode;
                const parentNode = startNode.parentNode;
                const childNodes: Node[] = Array.prototype.slice.call(
                    parentNode.childNodes
                );

                endNode = uiControl.endNode;

                uiControl.elementNodes = childNodes.slice(
                    childNodes.indexOf(startNode) + 1,
                    childNodes.indexOf(endNode)
                );
                this.replaceNodeLength = uiControl.elementNodes.length + 2;
            } else {
                this._compiler.compile(element, uiControl);
            }

            if (isNull(uiControl.parent)) {
                this.fulfillAndLoad();
            }
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
         * @param {plat.ui.TemplateControl} parent The parent {@link plat.ui.TemplateControl|TemplateControl} for context.
         * @param {Array<plat.Control>} controls The array of controls whose attributes will need to be updated
         * upon the context changing.
         *
         * @returns {void}
         */
        protected _observeControlIdentifiers(
            nodes: INode[],
            parent: ui.TemplateControl,
            controls: Control[],
            element: Element
        ): void {
            const hasParent = !isNull(parent);
            const replace = this.replace;
            const managers: AttributeManager[] = [];
            let length = nodes.length;
            let node: INode;
            let control: Control;
            let i = 0;
            let manager: AttributeManager;

            for (; i < length; i += 1) {
                node = nodes[i];
                control = node.control;

                if (hasParent && node.expressions.length > 0) {
                    manager = AttributeManager.getInstance();
                    managers.push(manager);
                    manager.initialize(
                        element,
                        node,
                        parent,
                        controls,
                        replace
                    );
                    NodeManager.observeExpressions(
                        node.expressions,
                        parent,
                        manager.attributeChanged.bind(manager)
                    );
                }

                if (!isNull(control)) {
                    controls.push(control);
                }
            }

            length = managers.length;
            for (i = 0; i < length; i += 1) {
                managers[i].attributeChanged();
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
         * @returns {plat.async.Promise<void>} A promise that fulfills when all
         * child managers have fulfilled their templates.
         */
        protected _fulfillChildTemplates(): async.Promise<void | void[]> {
            const children = this.children;
            const length = children.length;
            const promises: async.Promise<void>[] = [];
            let child: ElementManager;

            for (let i = 0; i < length; i += 1) {
                child = <ElementManager>children[i];
                if (!isUndefined(child.children)) {
                    promises.push(<any>child.fulfillTemplate());
                }
            }

            return this._Promise.all(promises).catch((error: any): void => {
                postpone((): void => {
                    if (isString(error)) {
                        error = new Error(error);
                    }

                    this._log.error(error);
                });
            });
        }
    }

    /**
     * The Type for referencing the '_ElementManagerFactory' injectable as a dependency.
     */
    export function IElementManagerFactory(
        _document?: Document,
        _managerCache?: storage.Cache<ElementManager>,
        _ResourcesFactory?: ui.IResourcesFactory,
        _AttributesFactory?: typeof ui.Attributes,
        _BindableTemplatesFactory?: ui.IBindableTemplatesFactory,
        _log?: debug.Log
    ): IElementManagerFactory {
        (<any>ElementManager)._document = _document;
        (<any>ElementManager)._managerCache = _managerCache;
        (<any>ElementManager)._ResourcesFactory = _ResourcesFactory;
        (<any>ElementManager)._AttributesFactory = _AttributesFactory;
        (<any>ElementManager)._BindableTemplatesFactory = _BindableTemplatesFactory;
        (<any>ElementManager)._log = _log;

        return ElementManager;
    }

    register.injectable(
        __ElementManagerFactory,
        IElementManagerFactory,
        [
            __Document,
            __ManagerCache,
            __ResourcesFactory,
            __AttributesFactory,
            __BindableTemplatesFactory,
            __Log,
        ],
        __FACTORY
    );

    register.injectable(
        __ElementManagerInstance,
        ElementManager,
        null,
        __INSTANCE
    );

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
         * else an empty {@link plat.processing.NodeManager|NodeManager} will be added to the Array of
         * {@link plat.processing.NodeManager|NodeManagers}.
         *
         * @param {Element} element The Element to use to identifier markup and controls.
         * @param {plat.processing.ElementManager} parent? The parent {@link plat.processing.ElementManager|ElementManager}
         * used for context inheritance.
         *
         * @returns {plat.processing.ElementManager}
         */
        create(element: Element, parent?: ElementManager): ElementManager;

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
         * @param {plat.ui.TemplateControl} parent The parent {@link plat.ui.TemplateControl|TemplateControl} for
         * the newly created controls.
         * @param {plat.ui.TemplateControl} templateControl? The {@link plat.ui.TemplateControl|TemplateControl}
         * linked to these created controls if one exists.
         * @param {Element} newElement? An optional element to use for attributes (used in cloning).
         * @param {boolean} isClone? Whether or not these controls are clones.
         *
         * @returns {Array<plat.processing.INode>} An array of the newly created {@link plat.processing.INode|INodes}.
         */
        createAttributeControls(
            nodeMap: INodeMap,
            parent: ui.TemplateControl,
            templateControl?: ui.TemplateControl,
            newElement?: Element,
            isClone?: boolean
        ): INode[];

        /**
         * @name cloneUiControl
         * @memberof plat.processing.IElementManagerFactory
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Clones an {@link plat.ui.TemplateControl|TemplateControl} with a new {@link plat.processing.INodeMap|INodeMap}.
         *
         * @param {plat.processing.INodeMap} sourceMap The source {@link plat.processing.INodeMap|INodeMap} used to clone the
         * {@link plat.ui.TemplateControl|TemplateControl}.
         * @param {plat.ui.TemplateControl} parent The parent control of the clone.
         *
         * @returns {plat.ui.TemplateControl} The cloned {@link plat.ui.TemplateControl|TemplateControl}.
         */
        cloneUiControl(
            sourceMap: INodeMap,
            parent: ui.TemplateControl
        ): ui.TemplateControl;

        /**
         * @name clone
         * @memberof plat.processing.IElementManagerFactory
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Clones an {@link plat.processing.ElementManager|ElementManager} with a new element.
         *
         * @param {plat.processing.ElementManager} sourceManager The original {@link plat.processing.ElementManager|ElementManager}.
         * @param {plat.processing.ElementManager} parent The parent {@link plat.processing.ElementManager|ElementManager}
         * for the new clone.
         * @param {Element} element The new element to associate with the clone.
         * @param {plat.ui.TemplateControl} newControl? An optional control to associate with the clone.
         * @param {plat.processing.INodeMap} nodeMap? The {@link plat.processing.INodeMap} used to clone this
         * {@link plat.processing.ElementManager|ElementManager}.
         *
         * @returns {plat.processing.ElementManager} The cloned {@link plat.processing.ElementManager|ElementManager}.
         */
        clone(
            sourceManager: ElementManager,
            parent: ElementManager,
            element: Element,
            newControl?: ui.TemplateControl,
            nodeMap?: INodeMap
        ): ElementManager;

        /**
         * @name locateResources
         * @memberof plat.processing.IElementManagerFactory
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Looks through the Node's child nodes to try and find any
         * defined {@link plat.ui.Resources|Resources} in a <plat-resources> tags.
         *
         * @param {Node} node The node whose child nodes may contain {@link plat.ui.Resources|Resources}.
         *
         * @returns {HTMLElement} The HTML element that represents the defined {@link plat.ui.Resources|Resources}.
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
         * @returns {plat.processing.ElementManager}
         */
        getInstance(): ElementManager;
    }
}
