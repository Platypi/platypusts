module plat.processing {
    /**
     * @name NodeManager
     * @memberof plat.processing
     * @kind class
     * 
     * @implements {plat.processing.INodeManager}
     * 
     * @description
     * Responsible for data binding a data context to a Node.
     */
    export class NodeManager implements INodeManager {
        /**
         * @name _ContextManager
         * @memberof plat.processing.NodeManager
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.observable.IContextManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.observable.IContextManagerStatic|IContextManagerStatic} injectable.
         */
        static _ContextManager: observable.IContextManagerStatic;
        /**
         * @name _parser
         * @memberof plat.processing.NodeManager
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.expressions.IParser}
         * 
         * @description
         * Reference to the {@link plat.expressions.IParser|IParser} injectable.
         */
        static _parser: expressions.IParser;
        /**
         * @name _TemplateControlFactory
         * @memberof plat.processing.NodeManager
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.ui.ITemplateControlFactory}
         * 
         * @description
         * Reference to the {@link plat.ui.ITemplateControlFactory|ITemplateControlFactory} injectable.
         */
        static _TemplateControlFactory: ui.ITemplateControlFactory;

        /**
         * @name hasMarkup
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Determines if a string has the markup notation.
         * 
         * @param {string} text The text string in which to search for markup.
         * 
         * @returns {boolean} Indicates whether or not there is markup.
         */
        static hasMarkup(text: string): boolean {
            return NodeManager._markupRegex.test(text);
        }

        /**
         * @name findMarkup
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Given a string, finds markup in the string and creates an array of 
         * {@link plat.expressions.IParsedExpression|IParsedExpression}.
         * 
         * @param {string} text The text string in which to search for markup.
         * 
         * @returns {Array<plat.expressions.IParsedExpression>} An array of parsed expressions that 
         * composes the output given a proper context.
         */
        static findMarkup(text: string): Array<expressions.IParsedExpression> {
            var start: number,
                end: number,
                parsedExpressions: Array<expressions.IParsedExpression> = [],
                wrapExpression = NodeManager._wrapExpression,
                substring: string,
                expression: expressions.IParsedExpression,
                _parser = NodeManager._parser;

            text = text.replace(NodeManager._newLineRegex, '');

            while ((start = text.indexOf(__startSymbol)) !== -1 && (end = text.indexOf(__endSymbol)) !== -1) {
                if (start !== 0) {
                    parsedExpressions.push(wrapExpression(text.slice(0, start)));
                }

                // incremement with while loop instead of just += 2 for nested object literal case.
                while (text[++end] === '}') { }

                substring = text.slice(start + 2, end - 2);

                // check for one-time databinding
                if (substring[0] === '=') {
                    expression = _parser.parse(substring.slice(1).trim());
                    expression.oneTime = true;
                    parsedExpressions.push(expression);
                } else {
                    parsedExpressions.push(_parser.parse(substring.trim()));
                }

                text = text.slice(end);
            }

            if (start > -1 && end >= 0) {
                parsedExpressions.push(wrapExpression(text.slice(end)));
            } else if (text !== '') {
                parsedExpressions.push(wrapExpression(text));
            }

            return parsedExpressions;
        }

        /**
         * @name build
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Takes in a control with a data context and an array of {@link plat.expressions.IParsedExpression|IParsedExpression} 
         * and outputs a string of the evaluated expressions.
         * 
         * @param {Array<plat.expressions.IParsedExpression>} expressions The composition array to evaluate.
         * @param {plat.ui.ITemplateControl} control? The {@link plat.ui.ITemplateControl|ITemplateControl} used to parse 
         * the expressions.
         * 
         * @returns {string} The output text with all markup bound.
         */
        static build(expressions: Array<expressions.IParsedExpression>, control?: ui.ITemplateControl): string {
            var text = '',
                length = expressions.length,
                resources = <IObject<any>>{},
                expression: expressions.IParsedExpression,
                value: any,
                evaluateExpression = NodeManager._TemplateControlFactory.evaluateExpression;

            for (var i = 0; i < length; ++i) {
                expression = expressions[i];

                value = evaluateExpression(expression, control, resources);

                if (isObject(value)) {
                    try {
                        text += JSON.stringify(value, null, 4);
                    } catch (e) {
                        if (!isNull(e.description)) {
                            e.description = 'Cannot stringify object: ' + e.description;
                        }
                        e.message = 'Cannot stringify object: ' + e.message;

                        var _Exception: IExceptionStatic = acquire(__ExceptionStatic);
                        _Exception.warn(e, _Exception.PARSE);
                    }
                } else if (!isNull(value)) {
                    text += value;
                }

                if (expression.oneTime && !isUndefined(value)) {
                    expressions[i] = NodeManager._wrapExpression(value);
                }
            }

            return text;
        }

        /**
         * @name observeExpressions
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Registers a listener to be notified of a change in any associated identifier.
         * 
         * @param {Array<plat.expressions.IParsedExpression>} expressions An Array of 
         * {@link plat.expressions.IParsedExpression|IParsedExpressions} to observe.
         * @param {plat.ui.ITemplateControl} control The {@link plat.ui.ITemplateControl|ITemplateControl} associated 
         * to the identifiers.
         * @param {(...args: Array<any>) => void} listener The listener to call when any identifier property changes.
         * 
         * @returns {void}
         */
        static observeExpressions(expressions: Array<expressions.IParsedExpression>, control: ui.ITemplateControl,
            listener: (...args: Array<any>) => void): void {
            var uniqueIdentiifers = NodeManager.__findUniqueIdentifiers(expressions),
                identifiers = uniqueIdentiifers.identifiers,
                oneTimeIdentifiers = uniqueIdentiifers.oneTimeIdentifiers,
                oneTimeIdentifier: string,
                observableCallback = {
                    listener: listener,
                    uid: control.uid
                },
                observationDetails: IObservationDetails,
                manager: observable.IContextManager,
                absoluteIdentifier: string,
                stopObserving: IRemoveListener,
                stopListening: IRemoveListener;

            while (identifiers.length > 0) {
                observationDetails = NodeManager.__getObservationDetails(identifiers.pop(), control);
                manager = observationDetails.manager;
                if (!isNull(manager)) {
                    manager.observe(observationDetails.absoluteIdentifier, observableCallback);
                }
            }

            while (oneTimeIdentifiers.length > 0) {
                oneTimeIdentifier = oneTimeIdentifiers.pop();
                observationDetails = NodeManager.__getObservationDetails(oneTimeIdentifier, control);
                manager = observationDetails.manager;
                if (!(isNull(manager) || observationDetails.isDefined)) {
                    absoluteIdentifier = observationDetails.absoluteIdentifier;
                    stopObserving = manager.observe(absoluteIdentifier, observableCallback);
                    stopListening = manager.observe(absoluteIdentifier, {
                        uid: control.uid,
                        listener: () => {
                            stopObserving();
                            stopListening();
                        }
                    });
                }
            }
        }

        /**
         * @name _markupRegex
         * @memberof plat.processing.NodeManager
         * @kind property
         * @access protected
         * @static
         * 
         * @type {RegExp}
         * 
         * @description
         * A regular expression for finding markup
         */
        protected static _markupRegex: RegExp;

        /**
         * @name _newLineRegex
         * @memberof plat.processing.NodeManager
         * @kind property
         * @access protected
         * @static
         * 
         * @type {RegExp}
         * 
         * @description
         * A regular expression for finding newline characters.
         */
        protected static _newLineRegex: RegExp;

        /**
         * @name _wrapExpression
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access protected
         * @static
         * 
         * @description
         * Wraps constant text as a static {@link plat.expressions.IParsedExpression|IParsedExpression}.
         * 
         * @param text The text to wrap into a static expression.
         * 
         * @returns {plat.expressions.IParsedExpression} The wrapped, static expression.
         */
        protected static _wrapExpression(text: string): expressions.IParsedExpression {
            return {
                evaluate: () => text,
                identifiers: [],
                aliases: [],
                expression: text
            };
        }

        /**
         * @name __findUniqueIdentifiers
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Given an {@link plat.expressions.IParsedExpression|IParsedExpression} array, creates an array of unique identifers 
         * to use with binding. This allows us to avoid creating multiple listeners for the identifier and node.
         * 
         * @param {Array<plat.expressions.IParsedExpression>} expressions An array of parsed expressions to search for identifiers.
         * 
         * @returns {plat.processing.IUniqueIdentifiers} An object containing both an array of unique identifiers for 
         * one way binding as well as an array of unique identifiers for one time binding.
         */
        private static __findUniqueIdentifiers(expressions: Array<expressions.IParsedExpression>): IUniqueIdentifiers {
            var length = expressions.length,
                expression: expressions.IParsedExpression;

            if (length === 1) {
                expression = expressions[0];
                if (expression.oneTime) {
                    return {
                        identifiers: [],
                        oneTimeIdentifiers: expression.identifiers.slice(0)
                    };
                }

                return {
                    identifiers: expression.identifiers.slice(0),
                    oneTimeIdentifiers: []
                };
            }

            var uniqueIdentifierObject: IObject<boolean> = {},
                oneTimeIdentifierObject: IObject<boolean> = {},
                uniqueIdentifiers: Array<string> = [],
                oneTimeIdentifiers: Array<string> = [],
                identifiers: Array<string>,
                identifier: string,
                j: number,
                jLength: number,
                oneTime: boolean;

            for (var i = 0; i < length; ++i) {
                expression = expressions[i];
                oneTime = expression.oneTime;
                identifiers = expression.identifiers;
                jLength = identifiers.length;

                for (j = 0; j < jLength; ++j) {
                    identifier = identifiers[j];
                    if (oneTime) {
                        if (uniqueIdentifierObject[identifier] === true) {
                            continue;
                        }

                        if (!oneTimeIdentifierObject[identifier]) {
                            oneTimeIdentifierObject[identifier] = true;
                            oneTimeIdentifiers.push(identifier);
                        }
                    } else {
                        if (!uniqueIdentifierObject[identifier]) {
                            uniqueIdentifierObject[identifier] = true;
                            uniqueIdentifiers.push(identifier);
                        }

                        if (oneTimeIdentifierObject[identifier] === true) {
                            oneTimeIdentifierObject[identifier] = false;
                            oneTimeIdentifiers.splice(oneTimeIdentifiers.indexOf(identifier), 1);
                        }
                    }
                }
            }

            return {
                identifiers: uniqueIdentifiers,
                oneTimeIdentifiers: oneTimeIdentifiers
            };
        }

        /**
         * @name __getObservationDetails
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Takes in an identifier and returns an object containing both its converted absolute path and the 
         * {@link plat.observable.ContextManager|ContextManager} needed to observe it.
         * 
         * @param {string} identifier The identifier looking to be observed.
         * @param {plat.ui.ITemplateControl} control The {@link plat.ui.ITemplateControl|ITemplateControl} associated 
         * to the identifiers.
         * 
         * @returns {plat.processing.IObservationDetails} An object containing information needed for observing a the given 
         * identifier.
         */
        private static __getObservationDetails(identifier: string, control: ui.ITemplateControl): IObservationDetails {
            var $contextManager = NodeManager._ContextManager,
                manager: observable.IContextManager,
                split = identifier.split('.'),
                absoluteIdentifier = '',
                isDefined = false;

            if (identifier[0] === '@') {
                // we found an alias
                var resourceObj: { resource: ui.IResource; control: ui.ITemplateControl; },
                    resources: IObject<{
                        resource: ui.IResource;
                        control: ui.ITemplateControl;
                    }> = {},
                    alias = split.shift().slice(1);

                if (split.length > 0) {
                    absoluteIdentifier = '.' + split.join('.');
                }

                resourceObj = resources[alias];

                if (isNull(resourceObj)) {
                    resourceObj = resources[alias] = control.findResource(alias);
                }

                if (!isNull(resourceObj) && !isNull(resourceObj.resource) && resourceObj.resource.type === __OBSERVABLE_RESOURCE) {
                    manager = $contextManager.getManager(resources[alias].control);
                    absoluteIdentifier = 'resources.' + alias + '.value' + absoluteIdentifier;
                }
            } else {
                // look on the control.context
                isDefined = !isUndefined($contextManager.getContext(control.context, split));

                if (isDefined || isUndefined($contextManager.getContext(control, split))) {
                    manager = $contextManager.getManager(Control.getRootControl(control));
                    absoluteIdentifier = control.absoluteContextPath + '.' + identifier;
                } else {
                    manager = null;
                }
            }

            return {
                absoluteIdentifier: absoluteIdentifier,
                manager: manager,
                isDefined: isDefined
            };
        }

        /**
         * @name type
         * @memberof plat.processing.NodeManager
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The type of {@link plat.processing.INodeManager|INodeManager}.
         */
        type: string;
        /**
         * @name nodeMap
         * @memberof plat.processing.NodeManager
         * @kind property
         * @access public
         * 
         * @type {plat.processing.INodeMap}
         * 
         * @description
         * The {@link plat.processing.INodeMap|INodeMap} for this {@link plat.processing.INodeManager|INodeManager}. 
         * Contains the compiled Node.
         */
        nodeMap: INodeMap;
        /**
         * @name parent
         * @memberof plat.processing.NodeManager
         * @kind property
         * @access public
         * 
         * @type {plat.processing.IElementManager}
         * 
         * @description
         * The parent {@link plat.processing.IElementManager|IElementManager}.
         */
        parent: IElementManager;
        /**
         * @name isClone
         * @memberof plat.processing.NodeManager
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not this {@link plat.processing.INodeManager|INodeManager} is a clone.
         */
        isClone = false;

        /**
         * @name initialize
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access public
         * 
         * @description
         * Initializes the manager's properties.
         * 
         * @param {plat.processing.INodeMap} nodeMap The mapping associated with this manager. We have to use an 
         * Used to treat all {@link plat.processing.INodeManager|INodeManagers} the same.
         * @param {plat.processing.IElementManager} parent The parent {@link plat.processing.IElementManager|IElementManager}.
         * 
         * @returns {void}
         */
        initialize(nodeMap: INodeMap, parent: IElementManager): void {
            this.nodeMap = nodeMap;
            this.parent = parent;

            if (!isNull(parent)) {
                this.isClone = parent.isClone;
                parent.children.push(this);
            }
        }

        /**
         * @name getParentControl
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access public
         * 
         * @description
         * Retrieves the parent control associated with the parent manager.
         * 
         * @returns {plat.ui.ITemplateControl} The parent {@link plat.ui.ITemplateControl|ITemplateControl}.
         */
        getParentControl(): ui.ITemplateControl {
            var parent = this.parent,
                control: ui.ITemplateControl;

            while (isNull(control)) {
                if (isNull(parent)) {
                    break;
                }

                control = parent.getUiControl();
                parent = parent.parent;
            }

            return control;
        }

        /**
         * @name clone
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access public
         * 
         * @description
         * Clones this {@link plat.processing.INodeManager|INodeManager} with the new node.
         * 
         * @param {Node} newNode The new node associated with the new manager.
         * @param {plat.processing.IElementManager} parentManager The parent 
         * {@link plat.processing.IElementManager|IElementManager} for the clone.
         * 
         * @returns {number} The number of nodes to advance while node traversal is in progress.
         */
        clone(newNode: Node, parentManager: IElementManager): number {
            return 1;
        }

        /**
         * @name bind
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access public
         * 
         * @description
         * The function used for data-binding a data context to the DOM.
         * 
         * @returns {void}
         */
        bind(): void { }
    }

    /**
     * The Type for referencing the '_NodeManager' injectable as a dependency.
     */
    export function INodeManagerStatic(
        _regex?: expressions.IRegex,
        _ContextManager?: observable.IContextManagerStatic,
        _parser?: expressions.IParser,
        _TemplateControlFactory?: ui.ITemplateControlFactory): INodeManagerStatic {
        // NOTE: This is not advised by TypeScript, but we want to do this.
        (<any>NodeManager)._markupRegex = _regex.markupRegex;
        (<any>NodeManager)._newLineRegex = _regex.newLineRegex;

        NodeManager._ContextManager = _ContextManager;
        NodeManager._parser = _parser;
        NodeManager._TemplateControlFactory = _TemplateControlFactory;
        return NodeManager;
    }

    register.injectable(__NodeManagerStatic, INodeManagerStatic, [
        __Regex,
        __ContextManagerStatic,
        __Parser,
        __TemplateControlFactory
    ], __STATIC);

    /**
     * @name INodeManagerStatic
     * @memberof plat.processing
     * @kind interface
     * 
     * @description
     * Performs essential Node management and binding functions. 
     */
    export interface INodeManagerStatic {
        /**
         * @name hasMarkup
         * @memberof plat.processing.INodeManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Determines if a string has the markup notation.
         * 
         * @param {string} text The text string in which to search for markup.
         * 
         * @returns {boolean} Indicates whether or not there is markup.
         */
        hasMarkup(text: string): boolean;

        /**
         * @name findMarkup
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Given a string, finds markup in the string and creates an array of 
         * {@link plat.expressions.IParsedExpression|IParsedExpression}.
         * 
         * @param {string} text The text string in which to search for markup.
         * 
         * @returns {Array<plat.expressions.IParsedExpression>} An array of parsed expressions that 
         * composes the output given a proper context.
         */
        findMarkup(text: string): Array<expressions.IParsedExpression>;

        /**
         * @name build
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Takes in a control with a data context and an array of {@link plat.expressions.IParsedExpression|IParsedExpression} 
         * and outputs a string of the evaluated expressions.
         * 
         * @param {Array<plat.expressions.IParsedExpression>} expressions The composition array to evaluate.
         * @param {plat.ui.ITemplateControl} control? The {@link plat.ui.ITemplateControl|ITemplateControl} used to parse 
         * the expressions.
         * 
         * @returns {string} The output text with all markup bound.
         */
        build(expressions: Array<expressions.IParsedExpression>, control?: ui.ITemplateControl): string;

        /**
         * @name observeExpressions
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Registers a listener to be notified of a change in any associated identifier.
         * 
         * @param {Array<plat.expressions.IParsedExpression>} expressions An Array of 
         * {@link plat.expressions.IParsedExpression|IParsedExpressions} to observe.
         * @param {plat.ui.ITemplateControl} control The {@link plat.ui.ITemplateControl|ITemplateControl} associated 
         * to the identifiers.
         * @param {(...args: Array<any>) => void} listener The listener to call when any identifier property changes.
         * 
         * @returns {void}
         */
        observeExpressions(expressions: Array<expressions.IParsedExpression>,
            control: ui.ITemplateControl, listener: (...args: Array<any>) => void): void;
    }

    /**
     * @name INodeManager
     * @memberof plat.processing
     * @kind interface
     * 
     * @description
     * Describes an object that takes a Node and provides a way to data-bind to that node.
     */
    export interface INodeManager {
        /**
         * @name type
         * @memberof plat.processing.INodeManager
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The type of {@link plat.processing.INodeManager|INodeManager}.
         */
        type: string;

        /**
         * @name nodeMap
         * @memberof plat.processing.INodeManager
         * @kind property
         * @access public
         * 
         * @type {plat.processing.INodeMap}
         * 
         * @description
         * The {@link plat.processing.INodeMap|INodeMap} for this {@link plat.processing.INodeManager|INodeManager}. 
         * Contains the compiled Node.
         */
        nodeMap?: INodeMap;

        /**
         * @name parent
         * @memberof plat.processing.INodeManager
         * @kind property
         * @access public
         * 
         * @type {plat.processing.IElementManager}
         * 
         * @description
         * The parent {@link plat.processing.IElementManager|IElementManager}.
         */
        parent?: IElementManager;

        /**
         * @name isClone
         * @memberof plat.processing.INodeManager
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not this {@link plat.processing.INodeManager|INodeManager} is a clone.
         */
        isClone?: boolean;

        /**
         * @name initialize
         * @memberof plat.processing.INodeManager
         * @kind function
         * @access public
         * 
         * @description
         * Initializes the manager's properties.
         * 
         * @param {plat.processing.INodeMap} nodeMap The mapping associated with this manager. We have to use an 
         * Used to treat all {@link plat.processing.INodeManager|INodeManagers} the same.
         * @param {plat.processing.IElementManager} parent The parent {@link plat.processing.IElementManager|IElementManager}.
         * 
         * @returns {void}
         */
        initialize? (nodeMap: INodeMap, parent: IElementManager): void;

        /**
         * @name getParentControl
         * @memberof plat.processing.INodeManager
         * @kind function
         * @access public
         * 
         * @description
         * Retrieves the parent control associated with the parent manager.
         * 
         * @returns {plat.ui.ITemplateControl} The parent {@link plat.ui.ITemplateControl|ITemplateControl}.
         */
        getParentControl? (): ui.ITemplateControl;

        /**
         * @name clone
         * @memberof plat.processing.INodeManager
         * @kind function
         * @access public
         * 
         * @description
         * Clones this {@link plat.processing.INodeManager|INodeManager} with the new node.
         * 
         * @param {Node} newNode The new node associated with the new manager.
         * @param {plat.processing.IElementManager} parentManager The parent 
         * {@link plat.processing.IElementManager|IElementManager} for the clone.
         * 
         * @returns {number} The number of nodes to advance while node traversal is in progress.
         */
        clone? (newNode: Node, parentManager: IElementManager): number;

        /**
         * @name bind
         * @memberof plat.processing.INodeManager
         * @kind function
         * @access public
         * 
         * @description
         * The function used for data-binding a data context to the DOM.
         * 
         * @returns {void}
         */
        bind(): void;
    }

    /**
     * @name INode
     * @memberof plat.processing
     * @kind interface
     * 
     * @description
     * Describes a compiled Node.
     */
    export interface INode {
        /**
         * @name control
         * @memberof plat.processing.INode
         * @kind property
         * @access public
         * 
         * @type {plat.IControl}
         * 
         * @description
         * The control associated with the Node, if one exists.
         */
        control?: IControl;

        /**
         * @name node
         * @memberof plat.processing.INode
         * @kind property
         * @access public
         * 
         * @type {Node}
         * 
         * @description
         * The Node that is compiled.
         */
        node?: Node;

        /**
         * @name nodeName
         * @memberof plat.processing.INode
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The name of the Node.
         */
        nodeName?: string;

        /**
         * @name expressions
         * @memberof plat.processing.INode
         * @kind property
         * @access public
         * 
         * @type {Array<plat.expressions.IParsedExpression>}
         * 
         * @description
         * Any {@link plat.expressions.IParsedExpression|IParsedExpressions} contained in the Node.
         */
        expressions?: Array<expressions.IParsedExpression>;

        /**
         * @name injector
         * @memberof plat.processing.INode
         * @kind property
         * @access public
         * 
         * @type {plat.dependency.IInjector<plat.IControl>}
         * 
         * @description
         * The injector for a control associated with the Node, if one exists.
         */
        injector?: dependency.IInjector<IControl>;
    }

    /**
     * @name IUiControlNode
     * @memberof plat.processing
     * @kind interface
     * 
     * @extends {plat.processing.INode}
     * 
     * @description
     * Defines the interface for a compiled Element.
     */
    export interface IUiControlNode extends INode {
        /**
         * @name control
         * @memberof plat.processing.IUiControlNode
         * @kind property
         * @access public
         * 
         * @type {plat.ui.ITemplateControl}
         * 
         * @description
         * The control associated with the Element, if one exists.
         */
        control: ui.ITemplateControl;

        /**
         * @name resourceElement
         * @memberof plat.processing.IUiControlNode
         * @kind property
         * @access public
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The resources element, if one exists, defined as the control element's first
         * element child.
         */
        resourceElement?: HTMLElement;
    }

    /**
     * @name INodeMap
     * @memberof plat.processing
     * @kind interface
     * 
     * @description
     * Describes a compiled Element with all 
     * associated nodes contained within its tag.
     */
    export interface INodeMap {
        /**
         * @name element
         * @memberof plat.processing.INodeMap
         * @kind property
         * @access public
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The Element that is compiled.
         */
        element?: HTMLElement;

        /**
         * @name nodes
         * @memberof plat.processing.INodeMap
         * @kind property
         * @access public
         * 
         * @type {Array<plat.processing.INode>}
         * 
         * @description
         * The compiled attribute Nodes for the Element.
         */
        nodes: Array<INode>;

        /**
         * @name attributes
         * @memberof plat.processing.INodeMap
         * @kind property
         * @access public
         * 
         * @type {plat.IObject<string>}
         * 
         * @description
         * An object of key/value attribute pairs.
         */
        attributes?: IObject<string>;

        /**
         * @name childContext
         * @memberof plat.processing.INodeMap
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The relative context path for the node's corresponding 
         * {@link plat.ui.ITemplateControl|ITemplateControl}, if specified.
         */
        childContext?: string;

        /**
         * @name hasControl
         * @memberof plat.processing.INodeMap
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Indicates whether or not an {@link plat.IControl|IControl} was found on the Element.
         */
        hasControl?: boolean;

        /**
         * @name uiControlNode
         * @memberof plat.processing.INodeMap
         * @kind property
         * @access public
         * 
         * @type {plat.processing.IUiControlNode}
         * 
         * @description
         * A type of {@link plat.processing.INode|INode} for a node that contains a {@link plat.ui.ITemplateControl|ITemplateControl}, 
         * if one was found for the Element.
         */
        uiControlNode?: IUiControlNode;
    }

    /**
     * @name IUniqueIdentifiers
     * @memberof plat.processing
     * @kind interface
     * @exported false
     * 
     * @description
     * Holds an array of identifiers for one way bindings and an 
     * array of identifiers for one time bindings.
     */
    interface IUniqueIdentifiers {
        /**
         * @name identifiers
         * @memberof plat.processing.IUniqueIdentifiers
         * @kind property
         * @access public
         * 
         * @type {Array<string>}
         * 
         * @description
         * An array of identifiers used for one way bindings.
         */
        identifiers: Array<string>;
        /**
         * @name oneTimeIdentifiers
         * @memberof plat.processing.IUniqueIdentifiers
         * @kind property
         * @access public
         * 
         * @type {Array<string>}
         * 
         * @description
         * An array of identifiers used for one time bindings.
         */
        oneTimeIdentifiers: Array<string>;
    }

    /**
     * @name IObservationDetails
     * @memberof plat.processing
     * @kind interface
     * @exported false
     * 
     * @description
     * Contains information needed for observing properties.
     */
    interface IObservationDetails {
        /**
         * @name absoluteIdentifier
         * @memberof plat.processing.IObservationDetails
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The absolute identifier to be observed.
         */
        absoluteIdentifier: string;
        /**
         * @name manager
         * @memberof plat.processing.IObservationDetails
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IContextManager}
         * 
         * @description
         * The {@link plat.observable.ContextManager|ContextManager} that will 
         * be doing the observing.
         */
        manager: observable.IContextManager;
        /**
         * @name isDefined
         * @memberof plat.processing.IObservationDetails
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Signifies that a context value is defined for one time data binding.
         */
        isDefined: boolean;
    }
}
