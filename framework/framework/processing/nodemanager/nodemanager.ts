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
         * @name $ContextManagerStatic
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
        static $ContextManagerStatic: observable.IContextManagerStatic;
        /**
         * @name $Parser
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
        static $Parser: expressions.IParser;
        /**
         * @name $TemplateControlFactory
         * @memberof plat.processing.NodeManager
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.ui.ITemplateControlFactory}
         * 
         * @description
         * Reference to the {@link ui.ITemplateControlFactory|ITemplateControlFactory} injectable.
         */
        static $TemplateControlFactory: ui.ITemplateControlFactory;
        
        /**
         * @name findUniqueIdentifiers
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Given an {@link plat.expressions.IParsedExpression|IParsedExpression} array, creates an array of unique identifers 
         * to use with binding. This allows us to avoid creating multiple listeners for the identifier and node.
         * 
         * @param {Array<plat.expressions.IParsedExpression>} expressions An array of parsed expressions to search for identifiers.
         * 
         * @returns {Array<string>} An array of unique identifiers.
         */
        static findUniqueIdentifiers(expressions: Array<expressions.IParsedExpression>): Array<string> {
            var length = expressions.length,
                uniqueIdentifierObject: IObject<boolean> = {},
                uniqueIdentifiers: Array<string> = [],
                identifiers: Array<string>,
                identifier: string,
                j: number,
                jLength: number;

            if (length === 1) {
                return expressions[0].identifiers.slice(0);
            }

            for (var i = 0; i < length; ++i) {
                identifiers = expressions[i].identifiers;
                jLength = identifiers.length;

                for (j = 0; j < jLength; ++j) {
                    identifier = identifiers[j];
                    if (isNull(uniqueIdentifierObject[identifier])) {
                        uniqueIdentifierObject[identifier] = true;
                        uniqueIdentifiers.push(identifier);
                    }
                }
            }

            return uniqueIdentifiers;
        }
        
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
                $parser = NodeManager.$Parser;

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
                    substring = substring.slice(1).trim();
                    expression = $parser.parse(substring);
                    expression = {
                        expression: expression.expression,
                        evaluate: expression.evaluate,
                        identifiers: [],
                        aliases: expression.aliases,
                        oneTime: true
                    };
                    parsedExpressions.push(expression);
                } else {
                    parsedExpressions.push($parser.parse(substring.trim()));
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
                resources = {},
                expression: expressions.IParsedExpression,
                value: any,
                evaluateExpression = NodeManager.$TemplateControlFactory.evaluateExpression;

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

                        var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                        $exception.warn(e, $exception.PARSE);
                    }
                } else if (!isNull(value)) {
                    text += value;
                }

                if (expression.oneTime) {
                    expressions[i] = NodeManager._wrapExpression(value);
                }
            }

            return text;
        }
        
        /**
         * @name observeIdentifiers
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Registers a listener to be notified of a change in any associated identifier.
         * 
         * @param {Array<string>} identifiers An Array of identifiers to observe.
         * @param {plat.ui.ITemplateControl} control The {@link plat.ui.ITemplateControl|ITemplateControl} associated 
         * to the identifiers.
         * @param {(...args: Array<any>) => void} listener The listener to call when any identifier property changes.
         * 
         * @returns {void}
         */
        static observeIdentifiers(identifiers: Array<string>, control: ui.ITemplateControl,
            listener: (...args: Array<any>) => void): void {
            var length = identifiers.length,
                $contextManager = NodeManager.$ContextManagerStatic,
                rootManager = $contextManager.getManager(Control.getRootControl(control)),
                absoluteContextPath = control.absoluteContextPath,
                context = control.context,
                observableCallback = {
                    listener: listener,
                    uid: control.uid
                },
                resources: IObject<{
                    resource: ui.IResource;
                    control: ui.ITemplateControl;
                }>  = {},
                resourceObj: {
                    resource: ui.IResource;
                    control: ui.ITemplateControl;
                },
                manager: observable.IContextManager,
                split: Array<string>,
                alias: string,
                absoluteIdentifier: string,
                identifier: string;

            for (var i = 0; i < length; ++i) {
                identifier = identifiers[i];
                absoluteIdentifier = '';

                if (identifier[0] === '@') {
                    // we found an alias
                    split = identifier.split('.');
                    alias = split.shift().slice(1);

                    if (split.length > 0) {
                        absoluteIdentifier = '.' + split.join('.');
                    }

                    resourceObj = resources[alias];

                    if (isNull(resourceObj)) {
                        resourceObj = resources[alias] = control.findResource(alias);
                    }

                    if (!isNull(resourceObj) && !isNull(resourceObj.resource) && resourceObj.resource.type === 'observable') {
                        manager = $contextManager.getManager(resources[alias].control);
                        absoluteIdentifier = 'resources.' + alias + '.value' + absoluteIdentifier;
                    } else {
                        continue;
                    }
                } else {
                    // look on the control.context
                    split = identifier.split('.');

                    if (!isNull($contextManager.getContext(context, split))) {
                        manager = rootManager;
                        absoluteIdentifier = absoluteContextPath + '.' + identifier;
                    } else if (!isNull($contextManager.getContext(control, split))) {
                        manager = null;
                    } else {
                        manager = rootManager;
                        absoluteIdentifier = absoluteContextPath + '.' + identifier;
                    }
                }

                if (!isNull(manager)) {
                    manager.observe(absoluteIdentifier, observableCallback);
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
        static _markupRegex: RegExp;
        
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
        static _newLineRegex: RegExp;
        
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
        static _wrapExpression(text: string): expressions.IParsedExpression {
            return {
                evaluate: () => text,
                identifiers: [],
                aliases: [],
                expression: text
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
     * The Type for referencing the '$NodeManagerStatic' injectable as a dependency.
     */
    export function INodeManagerStatic(
        $Regex?: expressions.IRegex,
        $ContextManagerStatic?: observable.IContextManagerStatic,
        $Parser?: expressions.IParser,
        $TemplateControlFactory?: ui.ITemplateControlFactory): INodeManagerStatic {
            NodeManager._markupRegex = $Regex.markupRegex;
            NodeManager._newLineRegex = $Regex.newLineRegex;
            NodeManager.$ContextManagerStatic = $ContextManagerStatic;
            NodeManager.$Parser = $Parser;
            NodeManager.$TemplateControlFactory = $TemplateControlFactory;
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
         * @name findUniqueIdentifiers
         * @memberof plat.processing.INodeManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Given an {@link plat.expressions.IParsedExpression|IParsedExpression} array, creates an array of unique identifers 
         * to use with binding. This allows us to avoid creating multiple listeners for the identifier and node.
         * 
         * @param {Array<plat.expressions.IParsedExpression>} expressions An array of parsed expressions to search for identifiers.
         * 
         * @returns {Array<string>} An array of unique identifiers.
         */
        findUniqueIdentifiers(expressions: Array<expressions.IParsedExpression>): Array<string>;

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
         * @name observeIdentifiers
         * @memberof plat.processing.NodeManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Registers a listener to be notified of a change in any associated identifier.
         * 
         * @param {Array<string>} identifiers An Array of identifiers to observe.
         * @param {plat.ui.ITemplateControl} control The {@link plat.ui.ITemplateControl|ITemplateControl} associated 
         * to the identifiers.
         * @param {(...args: Array<any>) => void} listener The listener to call when any identifier property changes.
         * 
         * @returns {void}
         */
        observeIdentifiers(identifiers: Array<string>,
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
         * @name identifiers
         * @memberof plat.processing.INode
         * @kind property
         * @access public
         * 
         * @type {Array<string>}
         * 
         * @description
         * Unique identifiers contained in the Node.
         */
        identifiers?: Array<string>;
        
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
}
