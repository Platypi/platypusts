module plat.processing {
    /**
     * A class used to manage element nodes. Provides a way for compiling and binding the 
     * element/template. Also provides methods for cloning an ElementManager.
     */
    export class ElementManager extends NodeManager implements IElementManager {
        static $document: Document;
        static $ManagerCacheStatic: storage.ICache<IElementManager>;
        static $ResourcesStatic: ui.IResourcesStatic;
        static $BindableTemplatesStatic: ui.IBindableTemplatesStatic;

        /**
         * Determines if the associated HTMLElement has controls that need to be instantiated or Attr nodes
         * containing text markup. If controls exist or markup is found a new ElementManager will be created,
         * else an empty INodeManager will be added to the Array of INodeManagers.
         *  
         * @static
         * @param element The HTMLElement to use to identifier markup and controls.
         * @param parent The parent ui.ITemplateControl used for context inheritance.
         */
        static create(element: HTMLElement, parent?: IElementManager): IElementManager {
            var name = element.nodeName.toLowerCase(),
                nodeName = name,
                injector = controlInjectors[name] || viewControlInjectors[name],
                hasUiControl = false,
                uiControlNode: IUiControlNode;

            if (isNull(injector)) {
                if (element.hasAttribute('plat-control')) {
                    name = element.getAttribute('plat-control').toLowerCase();
                    injector = controlInjectors[name] || viewControlInjectors[name];
                } else if (element.hasAttribute('data-plat-control')) {
                    name = element.getAttribute('data-plat-control').toLowerCase();
                    injector = controlInjectors[name] || viewControlInjectors[name];
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

                element.setAttribute('plat-control', name);

                var replacementType = uiControl.replaceWith;
                if (!isEmpty(replacementType) && (replacementType !== 'any' || nodeName === name) &&
                        replacementType.toLowerCase() !== nodeName) {
                    if (replacementType === 'any') {
                        replacementType = 'div';
                    }

                    var replacement = ElementManager.$document.createElement(replacementType);
                    if (replacement.nodeType === Node.ELEMENT_NODE) {
                        element = replaceWith(element, <HTMLElement>replacement.cloneNode(true));
                    }
                }
            }

            var attributes = element.attributes,
                elementMap = ElementManager._collectAttributes(attributes),
                manager = new ElementManager();

            elementMap.element = element;
            elementMap.uiControlNode = uiControlNode;

            manager.initialize(elementMap, parent);

            if (!(elementMap.hasControl || hasUiControl)) {
                manager.bind = noop;
            } else {
                manager.setUiControlTemplate();
                return hasUiControl ? null : manager;
            }

            return manager;
        }

        /**
         * Looks through the HTMLElement's child nodes to try and find any 
         * defined Resources in a <plat-resources> tags.
         * 
         * @param node The node who may have Resources as a child node.
         */
        static locateResources(node: Node): HTMLElement {
            var childNodes: Array<Node> = Array.prototype.slice.call(node.childNodes),
                length = childNodes.length,
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
         * Clones an ElementManager with a new element.
         *
         * @static
         * @param sourceManager The original IElementManager.
         * @param parent The parent IElementManager for the new clone.
         * @param element The new element to associate with the clone.
         * @param newControl An optional control to associate with the clone.
         * @param nodeMap The nodeMap used to clone this ElementManager.
         */
        static clone(sourceManager: IElementManager, parent: IElementManager,
            element: HTMLElement, newControl?: ui.ITemplateControl, nodeMap?: INodeMap): IElementManager {

            if (isNull(nodeMap)) {
                nodeMap = ElementManager._cloneNodeMap(sourceManager.nodeMap, element, parent.getUiControl() ||
                    parent.getParentControl(), newControl);
            }

            var manager = new ElementManager(),
                cache = ElementManager.$ManagerCacheStatic;

            manager.nodeMap = nodeMap;
            manager.parent = parent;
            
            if (!isNull(parent)) {
                parent.children.push(manager);
            }

            manager.replace = sourceManager.replace;
            manager.replaceNodeLength = sourceManager.replaceNodeLength;
            manager.hasOwnContext = sourceManager.hasOwnContext;
            manager.isClone = true;

            if (!nodeMap.hasControl && isNull(newControl)) {
                manager.bind = noop;
            }

            if (!isNull(newControl)) {
                cache.put(newControl.uid, manager);
            }

            return manager;
        }

        /**
         * Clones a UI Control with a new nodeMap.
         * 
         * @static
         * @param sourceMap The source INodeMap used to clone the UI Control
         * @param parent The parent control of the clone.
         */
        static cloneUiControl(sourceMap: INodeMap, parent: ui.ITemplateControl): ui.ITemplateControl {
            var uiControlNode = sourceMap.uiControlNode;

            if (isNull(uiControlNode)) {
                return;
            }

            var uiControl = uiControlNode.control,
                newUiControl = <ui.ITemplateControl>uiControlNode.injector.inject(),
                resources = ElementManager.$ResourcesStatic.getInstance(),
                attributes: ui.IAttributes = acquire('$attributes');

            newUiControl.parent = parent;
            parent.controls.push(newUiControl);
            newUiControl.controls = [];

            attributes.initialize(newUiControl, sourceMap.attributes);
            newUiControl.attributes = attributes;

            resources.initialize(newUiControl, uiControl.resources);
            newUiControl.resources = resources;

            ElementManager.$ResourcesStatic.addControlResources(newUiControl);

            if (!isNull(uiControl.innerTemplate)) {
                newUiControl.innerTemplate = <DocumentFragment>uiControl.innerTemplate.cloneNode(true);
            }

            newUiControl.type = uiControl.type;
            newUiControl.bindableTemplates = ElementManager.$BindableTemplatesStatic.create(newUiControl, uiControl.bindableTemplates);
            newUiControl.replaceWith = uiControl.replaceWith;

            return newUiControl;
        }

        /**
         * Creates new nodes for an INodeMap corresponding to the element associated with the nodeMap or
         * the passed-in element.
         *
         * @static
         * @param nodeMap The nodeMap to populate with attribute nodes.
         * @param parent The parent control for the new attribute controls.
         * @param templateControl The TemplateControl linked to these AttributeControls if 
         * one exists.
         * @param newElement An optional element to use for attributes (used in cloning).
         * @param isClone Whether or not these controls are clones.
         */
        static createAttributeControls(nodeMap: INodeMap, parent: ui.ITemplateControl,
            templateControl?: ui.ITemplateControl, newElement?: HTMLElement, isClone?: boolean): Array<INode> {
            var nodes = nodeMap.nodes,
                element = isClone ? newElement : nodeMap.element,
                elementExists = !isNull(element);

            if (elementExists && element.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                return isClone ? ElementManager._copyAttributeNodes(nodes) : [];
            }

            var attributes = elementExists ? element.attributes : null,
                attrs = nodeMap.attributes,
                newAttributes: ui.IAttributes,
                node: INode,
                injector: dependency.IInjector<IControl>,
                control: controls.IAttributeControl,
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
                    control = <controls.IAttributeControl>injector.inject();
                    node.control = control;
                    control.parent = parent;
                    control.element = element;

                    newAttributes = acquire('$attributes');
                    newAttributes.initialize(control, attrs);
                    control.attributes = newAttributes;

                    control.type = nodeName;
                    control.uid = control.uid || uniqueId('plat_');
                    control.templateControl = templateControl;
                }

                if (isClone) {
                    newNodes.push({
                        control: control,
                        expressions: node.expressions,
                        identifiers: node.identifiers,
                        node: !!attributes ?
                            (attributes.getNamedItem(nodeName) || attributes.getNamedItem('data-' + nodeName)) :
                            null,
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
                    var aControl = <controls.IAttributeControl>a.control,
                        bControl = <controls.IAttributeControl>b.control;

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
                    control = <controls.IAttributeControl>node.control;

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
         * Returns an instance of an ElementManager.
         */
        static getInstance(): IElementManager {
            return new ElementManager();
        }

        /**
         * Iterates over the attributes NamedNodeMap, creating an INodeMap. The INodeMap 
         * will contain injectors for all the IControls as well as parsed expressions
         * and identifiers found for each Attribute (useful for data binding).
         * 
         * @static
         * @param attributes A NamedNodeMap to compile into an INodeMap
         * @return {INodeMap} The compiled NamedNodeMap
         */
        static _collectAttributes(attributes: NamedNodeMap): INodeMap {
            var nodes: Array<INode> = [],
                attribute: Attr,
                name: string,
                value: string,
                childContext: expressions.IParsedExpression,
                childIdentifier: string,
                hasMarkup: boolean,
                hasMarkupFn = NodeManager.hasMarkup,
                findMarkup = NodeManager.findMarkup,
                findUniqueIdentifiers = NodeManager.findUniqueIdentifiers,
                parser = NodeManager.$parser,
                build = NodeManager.build,
                expressions: Array<expressions.IParsedExpression>,
                hasControl = false,
                injector: dependency.IInjector<IControl>,
                length = attributes.length,
                controlAttributes: IObject<string> = {},
                uniqueIdentifiers: Array<string>;

            for (var i = 0; i < length; ++i) {
                attribute = attributes[i];
                value = attribute.value;
                name = attribute.name.replace(/^data-/i, '').toLowerCase();
                injector = controlInjectors[name] || viewControlInjectors[name];
                expressions = [];
                uniqueIdentifiers = [];

                if (name === 'plat-context') {
                    childContext = parser.parse(value);
                    if (childContext.identifiers.length !== 1) {
                        var Exception: IExceptionStatic = acquire('$ExceptionStatic');
                        Exception.warn('Incorrect plat-context: ' +
                            value + ', must contain a single identifier.', Exception.COMPILE);
                    }
                    childIdentifier = childContext.identifiers[0];
                } else if (name !== 'plat-control') {
                    hasMarkup = hasMarkupFn(value);

                    if (hasMarkup) {
                        expressions = findMarkup(value);
                        uniqueIdentifiers = findUniqueIdentifiers(expressions);
                        if (uniqueIdentifiers.length === 0) {
                            attribute.value = value = build(expressions);
                        }
                    }

                    if (!hasControl && (hasMarkup || !isNull(injector))) {
                        hasControl = true;
                    }

                    nodes.push({
                        control: null,
                        node: attribute,
                        nodeName: name,
                        expressions: expressions,
                        identifiers: uniqueIdentifiers,
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
         * Used to copy the attribute nodes during the cloning process.
         * 
         * @static
         * @param nodes The compiled INodes to be cloned.
         * @return {INodeMap} The cloned array of INodes.
         */
        static _copyAttributeNodes(nodes: Array<INode>): Array<INode> {
            var newNodes: Array<INode> = [],
                length = nodes.length,
                node: INode;

            for (var i = 0; i < length; ++i) {
                node = nodes[i];
                newNodes.push({
                    identifiers: node.identifiers,
                    expressions: node.expressions,
                    nodeName: node.nodeName
                });
            }

            return newNodes;
        }

        /**
         * Clones an INode with a new node.
         * 
         * @static
         * @param sourceNode The original INode.
         * @param node The new node used for cloning.
         * @param newControl An optional new control to associate with the cloned node.
         * @return {INode} The clones INode.
         */
        static _cloneNode(sourceNode: INode, node: Node, newControl?: ui.ITemplateControl): INode {
            return {
                control: newControl,
                injector: sourceNode.injector,
                identifiers: sourceNode.identifiers,
                expressions: sourceNode.expressions,
                node: node,
                nodeName: sourceNode.nodeName
            };
        }

        /**
         * Clones an INodeMap with a new element.
         * 
         * @static
         * @param sourceMap The original INodeMap.
         * @param element The new HTMLElement used for cloning.
         * @param newControl An optional new control to associate with the element.
         * @return {INodeMap} The cloned INodeMap.
         */
        static _cloneNodeMap(sourceMap: INodeMap, element: HTMLElement,
            parent: ui.ITemplateControl, newControl?: ui.ITemplateControl): INodeMap {
            var hasControl = sourceMap.hasControl,
                nodeMap: INodeMap = {
                    attributes: sourceMap.attributes,
                    childContext: sourceMap.childContext,
                    nodes: [],
                    element: element,
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
         * The child managers for this manager.
         */
        children: Array<INodeManager> = [];

        /**
         * The type of INodeManager.
         */
        type: string = 'element';

        /**
         * Specifies whether or not this manager has a uiControl which has 
         * replaceWith set to null or empty string.
         */
        replace: boolean = false;

        /**
         * The length of a replaced control, indicates the number of nodes to slice 
         * out of the parent's childNodes.
         */
        replaceNodeLength: number;

        /**
         * Indicates whether the control for this manager hasOwnContext.
         */
        hasOwnContext: boolean = false;

        /**
         * In the event that a control hasOwnContext, we need a promise to fullfill 
         * when the control is loaded to avoid loading its parent control first.
         */
        loadedPromise: async.IThenable<void>;

        /**
         * A templatePromise set when a uiControl specifies a templateUrl.
         */
        templatePromise: async.IThenable<void>;

        $ElementManagerStatic: IElementManagerStatic = acquire('$ElementManagerStatic');
        $PromiseStatic: async.IPromiseStatic = acquire('$PromiseStatic');
        $compiler: ICompiler = acquire('$compiler');
        $NodeManagerStatic: INodeManagerStatic = acquire('$NodeManagerStatic');
        $ContextManagerStatic: observable.IContextManagerStatic = acquire('$ContextManagerStatic');
        $CommentManagerStatic: ICommentManagerStatic = acquire('$CommentManagerStatic');
        $ExceptionStatic: IExceptionStatic = acquire('$ExceptionStatic');
        $ControlStatic: IControlStatic = acquire('$ControlStatic');
        $TemplateControlStatic: ui.ITemplateControlStatic = acquire('$TemplateControlStatic');

        /**
         * Clones this ElementManager with a new node.
         * 
         * @param newNode The new element used to clone the ElementManager.
         * @param parentManager The parent for the clone.
         * @param nodeMap An optional INodeMap to clone a ui control if needed.
         */
        clone(newNode: Node, parentManager: IElementManager, nodeMap?: INodeMap): number {
            var childNodes: Array<Node>,
                clonedManager: IElementManager,
                replace = this.replace,
                nodeMapExists = !isNull(nodeMap),
                newControl = nodeMapExists ? nodeMap.uiControlNode.control : null,
                newControlExists = !isNull(newControl),
                startNodeManager: INodeManager,
                endNodeManager: INodeManager,
                parentControl = parentManager.getUiControl() || parentManager.getParentControl(),
                ElementManager = this.$ElementManagerStatic;

            if (!newControlExists) {
                // create new control
                newControl = ElementManager.cloneUiControl(this.nodeMap, parentControl);

                newControlExists = !isNull(newControl);
            }

            if (replace) {
                // definitely have newControl
                var nodes = newNode.parentNode.childNodes,
                    startIndex = Array.prototype.indexOf.call(nodes, newNode);

                childNodes = Array.prototype.slice.call(nodes, startIndex + 1, startIndex + this.replaceNodeLength);
                clonedManager = ElementManager.clone(this, parentManager, null, newControl, nodeMap);
                newControl.elementNodes = childNodes;
                newControl.startNode = newNode;
                newControl.endNode = childNodes.pop();

                startNodeManager = this.children.shift();
                endNodeManager = this.children.shift();

                startNodeManager.clone(newControl.startNode, clonedManager);
                endNodeManager.clone(newControl.endNode, clonedManager);

                if (isFunction(newControl.initialize)) {
                    newControl.initialize();
                }
            } else {
                childNodes = Array.prototype.slice.call(newNode.childNodes);
                clonedManager = ElementManager.clone(this, parentManager, <HTMLElement>newNode, newControl, nodeMap);
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

            var children = this.children,
                length = children.length,
                childNodeOffset = 0;

            for (var i = 0; i < length; ++i) {
                //clone children
                childNodeOffset += children[i].clone(childNodes[childNodeOffset], clonedManager);
            }

            if (replace) {
                this.children.unshift(endNodeManager);
                this.children.unshift(startNodeManager);

                return childNodeOffset + 2;
            }

            return 1;
        }

        /**
         * Initializes all the controls associated to the ElementManager's nodeMap. 
         * The INodeManager array must be passed in because if this ElementManager is 
         * used for transclusion, it can't rely on one INodeManager array.
         * 
         * @param parent The parent IElementManager.
	     * @param dontInitialize Specifies whether or not the initialize method should 
	     * be called for a control.
         * @param dontInitialize Specifies whether or not the initialize method should 
         * be called for a control.
         */
        initialize(nodeMap: INodeMap, parent: IElementManager, dontInitialize?: boolean): void {
            super.initialize(nodeMap, parent);

            var parentControl = this.getParentControl(),
                controlNode = nodeMap.uiControlNode,
                control: ui.ITemplateControl,
                hasAttributeControl = nodeMap.hasControl,
                hasUiControl = !isNull(controlNode),
                replaceElement = false;

            if (hasUiControl) {
                this._populateUiControl();
                control = controlNode.control;
                this.hasOwnContext = control.hasOwnContext;
            }

            if (hasAttributeControl) {
                this.$ElementManagerStatic.createAttributeControls(nodeMap, parentControl, control);
            }

            if (!dontInitialize && hasUiControl && isFunction(control.initialize)) {
                control.initialize();
            }
        }

        /**
         * Links the data context to the DOM (data-binding).
         */
        bind(): void {
            var nodeMap = this.nodeMap,
                parent = this.getParentControl(),
                controlNode = nodeMap.uiControlNode,
                uiControl: ui.ITemplateControl,
                nodes = nodeMap.nodes,
                node: INode,
                controls: Array<IControl> = [],
                control: IControl,
                attributes = nodeMap.attributes,
                hasParent = !isNull(parent),
                getManager = this.$ContextManagerStatic.getManager,
                contextManager: observable.IContextManager,
                absoluteContextPath = hasParent ? parent.absoluteContextPath : 'context',
                hasUiControl = !isNull(controlNode),
                replace = this.replace;

            if (hasUiControl) {
                uiControl = controlNode.control;
                controls.push(uiControl);

                var childContext = nodeMap.childContext;

                if (!isNull(childContext)) {
                    if (childContext[0] === '@') {
                        var split = childContext.split('.'),
                            alias = split.shift().substr(1),
                            resourceObj = this.$TemplateControlStatic.findResource(uiControl, alias);

                        if (!isNull(resourceObj)) {
                            if (resourceObj.resource.type === 'observable') {
                                var identifier = (split.length > 0) ? '.' + split.join('.') : '';
                                absoluteContextPath = 'resources.' + alias + '.value' + identifier;
                                contextManager = getManager(resourceObj.control);
                                uiControl.root = resourceObj.control;
                            } else {
                                this.$ExceptionStatic.warn('Only resources of type observable can be set as context.',
                                    this.$ExceptionStatic.CONTEXT);
                            }
                        }
                    } else {
                        absoluteContextPath = absoluteContextPath + '.' + childContext;
                    }
                }

                uiControl.root = this.$ControlStatic.getRootControl(uiControl) || uiControl;

                contextManager = getManager(uiControl.root);

                if (!uiControl.hasOwnContext) {
                    uiControl.context = contextManager.getContext(absoluteContextPath.split('.'));
                } else {
                    absoluteContextPath = 'context';
                }

                this.$TemplateControlStatic.setAbsoluteContextPath(uiControl, absoluteContextPath);
                this.$TemplateControlStatic.setContextResources(uiControl);
                ElementManager.$ResourcesStatic.bindResources(uiControl.resources);

                contextManager.observe(uiControl.absoluteContextPath, {
                    uid: uiControl.uid,
                    listener: (newValue, oldValue) => {
                        this.$TemplateControlStatic.contextChanged(uiControl, newValue, oldValue);
                    }
                });

                if (!replace) {
                    var element = uiControl.element;
                    if (!isNull(element) && isFunction(element.removeAttribute)) {
                        element.removeAttribute('plat-hide');
                    }
                }
            }

            this._observeControlIdentifiers(nodes, parent, controls);
            this._loadAttributeControls(<Array<controls.IAttributeControl>>controls, uiControl);
        }

        /**
         * Sets the template for an ElementManager by calling its associated UI Control's
         * setTemplate method.
         * 
         * @param templateUrl An optional templateUrl used to override the control's template.
         */
        setUiControlTemplate(templateUrl?: string): void {
            var nodeMap = this.nodeMap,
                controlNode = nodeMap.uiControlNode,
                control: ui.ITemplateControl;

            if (!isNull(controlNode)) {
                control = controlNode.control;

                this.templatePromise = this.$TemplateControlStatic.determineTemplate(control, templateUrl).then((template) => {
                    this.templatePromise = null;
                    this._initializeControl(control, <DocumentFragment>template.cloneNode(true));
                }, (error) => {
                    this.templatePromise = null;
                    if (isNull(error)) {
                        this._initializeControl(control, error);
                    } else {
                        postpone(() => {
                            this.$ExceptionStatic.fatal(error, this.$ExceptionStatic.COMPILE);
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
         * Retrieves the UI control instance for this ElementManager.
         */
        getUiControl(): ui.ITemplateControl {
            var uiControlNode = this.nodeMap.uiControlNode;
            if (isNull(uiControlNode)) {
                return;
            }

            return uiControlNode.control;
        }

        /**
         * Fullfills any template template promises and finishes the compile phase
         * for the template associated to this ElementManager.
         * 
         * @return {async.IPromise} A promise, fulfilled when the template 
         * is complete.
         */
        fulfillTemplate(): async.IThenable<any> {
            var children = this.children,
                child: INodeManager,
                length = children.length,
                promises: Array<async.IThenable<any>> = [];

            return new this.$PromiseStatic<any>((resolve, reject) => {
                if (!isNull(this.templatePromise)) {
                    promises.push(this.templatePromise);
                }

                for (var i = 0; i < length; ++i) {
                    child = children[i];
                    if (!isUndefined((<IElementManager>child).children)) {
                        promises.push((<IElementManager>child).fulfillTemplate());
                    }
                }

                this.$PromiseStatic.all<any>(promises).then(resolve, reject);
            }).catch((error) => {
                postpone(() => {
                    this.$ExceptionStatic.fatal(error, this.$ExceptionStatic.COMPILE);
                });
            });
        }

        /**
         * Binds context to the DOM and loads controls.
         */
        bindAndLoad(): async.IThenable<void> {
            var children = this.children,
                length = children.length,
                child: INodeManager,
                promises: Array<async.IThenable<void>> = [];

            this.bind();

            for (var i = 0; i < length; ++i) {
                child = children[i];
                if ((<IElementManager>child).hasOwnContext) {
                    promises.push((<IElementManager>child).loadedPromise);
                    continue;
                }

                if (!isUndefined((<IElementManager>child).children)) {
                    promises.push((<IElementManager>child).bindAndLoad());
                } else {
                    child.bind();
                }
            }

            return this.$PromiseStatic.all<void>(promises).then(() => {
                this.$ControlStatic.load(this.getUiControl());
            }).catch((error: any) => {
                postpone(() => {
                    this.$ExceptionStatic.fatal(error, this.$ExceptionStatic.BIND);
                });
            });
        }

        /**
         * Observes the root context for controls that specify their own context, and initiates 
         * a load upon a successful set of the context.
         * 
         * @param root The ITemplateControl specifying its own context.
         * @param loadMethod The function to initiate the loading of the root control and its 
         * children.
         */
        observeRootContext(root: ui.ITemplateControl, loadMethod: () => async.IThenable<void>): void {
            this.loadedPromise = new this.$PromiseStatic<void>((resolve, reject) => {
                var contextManager: observable.IContextManager = this.$ContextManagerStatic.getManager(root);

                var removeListener = contextManager.observe('context', {
                    listener: () => {
                        removeListener();

                        loadMethod.call(this).then(resolve);
                    },
                    uid: root.uid
                });

                if (!isNull(root.context)) {
                    removeListener();
                    loadMethod.call(this).then(resolve);
                }
            }).catch((error) => {
                postpone(() => {
                    this.$ExceptionStatic.fatal(error, this.$ExceptionStatic.BIND);
                });
            });
        }

        /**
         * Observes the identifiers associated with this ElementManager's INodes.
         * 
         * @param nodes The array of INodes to iterate through.
         * @param parent The parent ITemplateControl for context.
         * @param controls The array of controls whose attributes will need to be updated 
         * upon the context changing.
         */
        _observeControlIdentifiers(nodes: Array<INode>, parent: ui.ITemplateControl,
            controls: Array<IControl>): void {
            var length = nodes.length,
                bindings: Array<INode> = [],
                attributeChanged = this._attributeChanged,
                hasParent = !isNull(parent),
                node: INode,
                control: IControl;

            for (var i = 0; i < length; ++i) {
                node = nodes[i];
                control = node.control;

                if (hasParent && node.identifiers.length > 0) {
                    NodeManager.observeIdentifiers(node.identifiers, parent,
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
         * Loads the AttributeControls associated with this ElementManager and 
         * attaches the corresponding ITemplateControl if available.
         * 
         * @param controls The array of controls to load.
         * @param templateControl The ITemplateControl associated with this 
         * ElementManager.
         */
        _loadAttributeControls(controls: Array<controls.IAttributeControl>,
            templateControl: ui.ITemplateControl): void {
            var length = controls.length,
                control: controls.IAttributeControl,
                load = this.$ControlStatic.load,
                i = isNull(templateControl) ? 0 : 1;

            for (; i < length; ++i) {
                control = controls[i];
                control.templateControl = templateControl;

                load(control);
            }
        }

        /**
         * Fulfills the template promise prior to binding and loading the control.
         */
        _fulfillAndLoad(): async.IThenable<void> {
            return new this.$PromiseStatic<void>((resolve, reject) => {
                this.fulfillTemplate().then(() => {
                    return this.bindAndLoad();
                }).then(resolve);
            }).catch((error) => {
                postpone(() => {
                    this.$ExceptionStatic.fatal(error, this.$ExceptionStatic.BIND);
                });
            });
        }

        /**
         * Populates the ITemplateControl properties associated with this ElementManager 
         * if one exists.
         */
        _populateUiControl(): void {
            var nodeMap = this.nodeMap,
                parent = this.getParentControl(),
                controlNode = nodeMap.uiControlNode,
                uiControl = <ui.ITemplateControl>controlNode.control,
                hasParent = !isNull(parent),
                element = nodeMap.element,
                attributes = nodeMap.attributes,
                newAttributes: ui.IAttributes = acquire('$attributes');

            ElementManager.$ManagerCacheStatic.put(uiControl.uid, this);

            if (hasParent && uiControl.parent !== parent) {
                parent.controls.push(uiControl);
                uiControl.parent = parent;
            }
            if (isFunction(element.setAttribute)) {
                element.setAttribute('plat-hide', '');
            }
            uiControl.element = element;
            uiControl.controls = [];

            newAttributes.initialize(uiControl, attributes);
            uiControl.attributes = newAttributes;

            if (!isNull(uiControl.resources)) {
                uiControl.resources.add(controlNode.resourceElement);
            } else {
                var resources = ElementManager.$ResourcesStatic.getInstance();
                resources.initialize(uiControl, controlNode.resourceElement);
                uiControl.resources = resources;
            }

            ElementManager.$ResourcesStatic.addControlResources(uiControl);
            uiControl.type = controlNode.nodeName;
            uiControl.uid = uiControl.uid || uniqueId('plat_');
            uiControl.bindableTemplates = uiControl.bindableTemplates ||
                ElementManager.$BindableTemplatesStatic.create(uiControl);

            if ((element.childNodes.length > 0) &&
                (!isEmpty(uiControl.templateString) || !isEmpty(uiControl.templateUrl))) {
                uiControl.innerTemplate = <DocumentFragment>appendChildren(element.childNodes);
            }

            var replace = this.replace = (uiControl.replaceWith === null || uiControl.replaceWith === '');

            if (replace) {
                this._replaceElement(uiControl, nodeMap);
            }
        }

        /**
         * Removes the ITemplateControl's element. Called if its replaceWith property is 
         * null or empty string.
         * 
         * @param control The ITemplateControl whose element will be removed.
         * @param nodeMap The INodeMap associated with this ElementManager.
         */
        _replaceElement(control: ui.ITemplateControl, nodeMap: INodeMap): void {
            var element = nodeMap.element,
                parentNode = element.parentNode,
                $document = ElementManager.$document,
                controlType = control.type,
                controlUid = control.uid,
                startNode = control.startNode = $document.createComment(controlType + ' ' + controlUid + ': start node'),
                endNode = control.endNode = $document.createComment(controlType + ' ' + controlUid + ': end node'),
                create = this.$CommentManagerStatic.create;

            create(startNode, this);
            create(endNode, this);

            parentNode.insertBefore(startNode, element);
            parentNode.insertBefore(endNode, element.nextSibling);
            control.elementNodes = replace(element);

            control.element = nodeMap.element = null;
        }

        /**
         * Initializes a control's template and compiles the control.
         * 
         * @param uiControl The ITemplateControl associated with this ElementManager.
         * @param template The uiControl's template.
         */
        _initializeControl(uiControl: ui.ITemplateControl, template: DocumentFragment): void {
            var element = this.nodeMap.element,
                //have to check if null since isNull checks for undefined case
                replaceElement = this.replace,
                hasOwnContext = uiControl.hasOwnContext,
                hasParent = !isNull(uiControl.parent),
                endNode: Node;

            if (!isNull(template)) {
                var resourceElement = this.$ElementManagerStatic.locateResources(template);

                if (!isNull(resourceElement)) {
                    uiControl.resources.add(ElementManager.$ResourcesStatic.parseElement(resourceElement));
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
                this.$compiler.compile(uiControl.elementNodes, uiControl);
                var startNode = uiControl.startNode,
                    parentNode = startNode.parentNode,
                    childNodes: Array<Node> = Array.prototype.slice.call(parentNode.childNodes);

                endNode = uiControl.endNode;

                uiControl.elementNodes = childNodes.slice(childNodes.indexOf(startNode) + 1, childNodes.indexOf(endNode));
                this.replaceNodeLength = uiControl.elementNodes.length + 2;
            } else {
                this.$compiler.compile(element, uiControl);
            }

            if (hasOwnContext && !this.isClone) {
                this.observeRootContext(uiControl, this._fulfillAndLoad);
            } else if (!hasParent) {
                this._fulfillAndLoad();
            }
        }

        /**
         * A function to handle updating an attribute on all controls that have it 
         * as a property upon a change in its value.
         * 
         * @param node The INode where the change occurred.
         * @param parent The parent ITemplateControl used for context.
         * @param controls The controls that have the changed attribute as a property.
         */
        _attributeChanged(node: INode, parent: ui.ITemplateControl, controls: Array<IControl>): void {
            var length = controls.length,
                key = camelCase(node.nodeName),
                attribute = <Attr>node.node,
                value = this.$NodeManagerStatic.build(node.expressions, parent),
                attributes: ui.Attributes,
                oldValue: any;

            for (var i = 0; i < length; ++i) {
                attributes = <ui.Attributes>controls[i].attributes;
                oldValue = (<any>attributes)[key];
                (<any>attributes)[key] = value;
                attributes.attributeChanged(key, value, oldValue);
            }

            if (!this.replace) {
                attribute.value = value;
            }
        }
    }

    /**
     * The Type for referencing the '$ElementManagerStatic' injectable as a dependency.
     */
    export function ElementManagerStatic(
            $document: Document,
            $ManagerCacheStatic: storage.ICache<IElementManager>,
            $ResourcesStatic: ui.IResourcesStatic,
            $BindableTemplatesStatic: ui.IBindableTemplatesStatic) {
        ElementManager.$document = $document;
        ElementManager.$ManagerCacheStatic = $ManagerCacheStatic;
        ElementManager.$ResourcesStatic = $ResourcesStatic;
        ElementManager.$BindableTemplatesStatic = $BindableTemplatesStatic;
        return ElementManager;
    }

    register.injectable('$ElementManagerStatic', ElementManagerStatic, [
        '$document',
        '$ManagerCacheStatic',
        '$ResourcesStatic',
        '$BindableTemplatesStatic'
    ], register.injectableType.STATIC);

    /**
     * An ElementManager is responsible for initializing and data-binding controls associated to an HTMLElement.
     * 
     */
    export interface IElementManager extends INodeManager {
        /**
         * The child managers for this manager.
         */
        children: Array<INodeManager>;

        /**
         * Specifies whether or not this manager has a uiControl which has 
         * replaceWith set to null or empty string.
         */
        replace: boolean;

        /**
         * The length of a replaced control, indiates the number of nodes to slice 
         * out of the parent's childNodes.
         */
        replaceNodeLength: number;

        /**
         * Indicates whether the control for this manager hasOwnContext.
         */
        hasOwnContext: boolean;

        /**
         * Lets us know when an ElementManager is a cloned manager, or the compiled 
         * manager from BindableTemplates. We do not want to bindAndLoad compiled 
         * managers that are clones.
         */
        isClone: boolean;

        /**
         * In the event that a control hasOwnContext, we need a promise to fullfill 
         * when the control is loaded to avoid loading its parent control first.
         */
        loadedPromise: async.IThenable<void>;

        /**
         * A templatePromise set when a uiControl specifies a templateUrl.
         */
        templatePromise: async.IThenable<void>;

        /**
         * Clones the IElementManager with a new node.
         * 
         * @param newNode The new element used to clone the ElementManager.
         * @param parentManager The parent for the clone.
         * @param nodeMap An optional INodeMap to clone a ui control if needed.
         */
        clone(newNode: Node, parentManager: IElementManager, nodeMap?: INodeMap): number;

        /**
         * Initializes all the controls associated to the ElementManager's nodeMap. 
         * The INodeManager array must be passed in because if this ElementManager is 
         * used for transclusion, it can't rely on one INodeManager array.
         * 
         * @param parent The parent IElementManager.
	     * @param dontInitialize Specifies whether or not the initialize method should 
	     * be called for a control.
         * @param dontInitialize Specifies whether or not the initialize method should 
         * be called for a control.
         */
        initialize(nodeMap: INodeMap, parent: IElementManager, dontInitialize?: boolean): void;

        /**
         * Observes the root context for controls that specify their own context, and initiates 
         * a load upon a successful set of the context.
         * 
         * @param root The ITemplateControl specifying its own context.
         * @param loadMethod The function to initiate the loading of the root control and its 
         * children.
         */
        observeRootContext(root: ui.ITemplateControl, loadMethod: () => async.IThenable<void>): void;

        /**
         * Links the data context to the DOM (data-binding).
         */
        bind(): void;

        /**
         * Sets the template for an ElementManager by calling its associated UI Control's
         * setTemplate method.
         * 
         * @param templateUrl An optional templateUrl used to override the control's template.
         */
        setUiControlTemplate(templateUrl?: string): void;

        /**
         * Retrieves the UI control instance for this ElementManager.
         */
        getUiControl(): ui.ITemplateControl;

        /**
         * Fullfills any template template promises and finishes the compile phase
         * for the template associated to this ElementManager.
         * 
         * @return {async.IPromise} A promise, fulfilled when the template 
         * is complete.
         */
        fulfillTemplate(): async.IThenable<any>;

        /**
         * Binds context to the DOM and loads controls.
         */
        bindAndLoad(): async.IThenable<void>;
    }

    /**
     * The external interface for the '$ElementManagerStatic' injectable.
     */
    export interface IElementManagerStatic {
        /**
         * Determines if the associated HTMLElement has controls that need to be instantiated or Attr nodes
         * containing text markup. If controls exist or markup is found a new ElementManager will be created,
         * else an empty INodeManager will be added to the Array of INodeManagers.
         *
         * @static
         * @param element The HTMLElement to use to identifier markup and controls.
         * @param parent The parent ui.ITemplateControl used for context inheritance.
         */
        create(element: HTMLElement, parent?: IElementManager): IElementManager;

        /**
         * Creates new nodes for an INodeMap corresponding to the element associated with the nodeMap or
         * the passed-in element.
         *
         * @static
         * @param nodeMap The nodeMap to populate with attribute nodes.
         * @param parent The parent control for the new attribute controls.
         * @param templateControl The TemplateControl linked to these AttributeControls if 
         * one exists.
         * @param newElement An optional element to use for attributes (used in cloning).
         * @param isClone Whether or not these controls are clones.
         */
        createAttributeControls(nodeMap: INodeMap, parent: ui.ITemplateControl,
            templateControl?: ui.ITemplateControl, newElement?: HTMLElement, isClone?: boolean): Array<INode>;

        /**
         * Clones a UI Control with a new nodeMap.
         *
         * @static
         * @param sourceMap The source INodeMap used to clone the UI Control
         * @param parent The parent control of the clone.
         */
        cloneUiControl(sourceMap: INodeMap, parent: ui.ITemplateControl): ui.ITemplateControl;

        /**
         * Clones an ElementManager with a new element.
         *
         * @static
         * @param sourceManager The original IElementManager.
         * @param parent The parent IElementManager for the new clone.
         * @param element The new element to associate with the clone.
         * @param newControl An optional control to associate with the clone.
         * @param nodeMap The nodeMap used to clone this ElementManager.
         */
        clone(sourceManager: IElementManager, parent: IElementManager,
            element: HTMLElement, newControl?: ui.ITemplateControl, nodeMap?: INodeMap): IElementManager;

        /**
         * Looks through the HTMLElement's child nodes to try and find any
         * defined Resources in a <plat-resources> tags.
         *
         * @static
         * @param node The node who may have Resources as a child node.
         */
        locateResources(node: Node): HTMLElement;

        /**
         * Returns a new instance of an IElementManager
         * 
         * @static
         */
        getInstance(): IElementManager;
    }
}

