module plat.processing {
    /**
     * A NodeManager is responsible for data binding a data context to a Node.
     */
    export class NodeManager implements INodeManager {
        static $regex: expressions.IRegex;
        static $ContextManagerStatic: observable.IContextManagerStatic;
        static $parser: expressions.IParser;
        static $ExceptionStatic: IExceptionStatic;
        static $TemplateControlStatic: ui.ITemplateControlStatic;
        /**
         * The start markup notation.
         */
        static startSymbol: string = '{{';

        /**
         * The end markup notation.
         */
        static endSymbol: string = '}}';

        /**
         * Given an IParsedExpression array, creates an array of unique identifers
         * to use with binding. This allows us to avoid creating multiple listeners
         * for the identifier and node.
         * 
         * @static
         * @param expressions An IParsedExpression array to search for identifiers.
         * @return {Array<string>} An array of identifiers.
         */
        static findUniqueIdentifiers(expressions: Array<expressions.IParsedExpression>) {
            var length = expressions.length,
                uniqueIdentifierObject = {},
                uniqueIdentifiers = [],
                identifiers,
                identifier,
                j, jLength;

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
         * Determines if a string has the markup notation.
         * 
         * @param text The text string in which to search for markup.
         * @return {Boolean} Indicates whether or not there is markup.
         */
        static hasMarkup(text: string) {
            return NodeManager.$regex.markupRegex.test(text);
        }

        /**
         * Given a string, finds markup in the string and creates an IParsedExpression array.
         * 
         * @static
         * @param text The text string to parse.
         */
        static findMarkup(text: string): Array<expressions.IParsedExpression> {
            var start,
                end,
                regex = NodeManager.$regex,
                newLineRegex = regex.newLineRegex,
                text = text.replace(newLineRegex, ''),
                parsedExpressions: Array<expressions.IParsedExpression> = [],
                startSymbol = NodeManager.startSymbol,
                endSymbol = NodeManager.endSymbol,
                wrapExpression = NodeManager._wrapExpression,
                substring,
                expression: expressions.IParsedExpression,
                parser = NodeManager.$parser;

            while ((start = text.indexOf(startSymbol)) !== -1 && (end = text.indexOf(endSymbol)) !== -1) {
                if (start !== 0) {
                    parsedExpressions.push(wrapExpression(text.substring(0, start)));
                }

                // incremement with while loop instead of just += 2 for nested object literal case.
                while (text[++end] === '}') { }

                substring = text.substring(start + 2, end - 2);

                //check for one-time databinding
                if (substring[0] === '=') {
                    substring = substring.substr(1).trim();
                    expression = parser.parse(substring);
                    expression = {
                        expression: expression.expression,
                        evaluate: expression.evaluate,
                        identifiers: [],
                        aliases: expression.aliases,
                        oneTime: true
                    };
                    parsedExpressions.push(expression);
                } else {
                    parsedExpressions.push(parser.parse(substring.trim()));
                }

                text = text.substr(end);
            }

            if (start > -1 && end >= 0) {
                parsedExpressions.push(wrapExpression(text.substring(end)));
            } else if (text !== '') {
                parsedExpressions.push(wrapExpression(text));
            }

            return parsedExpressions;
        }

        /**
         * Takes in data context and an IParsedExpression array and outputs a string of the evaluated
         * expressions.
         * 
         * @static
         * @param expressions The IParsedExpression array to evaluate.
         * @param control The IControl used to parse the expressions.
         * @return {string} The evaluated expressions.
         */
        static build(expressions: Array<expressions.IParsedExpression>, control?: ui.ITemplateControl) {
            var text = '',
                length = expressions.length,
                resources = {},
                expression: expressions.IParsedExpression,
                value,
                evaluateExpression = NodeManager.$TemplateControlStatic.evaluateExpression;

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
;
                        NodeManager.$ExceptionStatic.warn(e, Exception.PARSE);
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
         * Registers a listener to be notified of a change in any associated identifier.
         * 
         * @static
         * @param identifiers An Array of identifiers to observe.
         * @param control The control associated to the identifiers.
         * @param listener The listener to call when any identifier property changes.
         */
        static observeIdentifiers(identifiers: Array<string>, control: ui.ITemplateControl,
            listener: (...args: Array<any>) => void) {
            var length = identifiers.length,
                ContextManager = NodeManager.$ContextManagerStatic,
                contextManager = ContextManager.getManager(Control.getRootControl(control)),
                absoluteContextPath = control.absoluteContextPath,
                context = control.context,
                observableCallback = {
                    listener: listener,
                    uid: control.uid
                },
                resources = {},
                resourceObj,
                manager: observable.IContextManager,
                split,
                alias: string,
                absoluteIdentifier,
                identifier: string;

            for (var i = 0; i < length; ++i) {
                identifier = identifiers[i];
                absoluteIdentifier = '';

                if (identifier[0] === '@') {
                    // We found an alias
                    split = identifier.split('.');
                    alias = split.shift().substr(1);

                    if (split.length > 0) {
                        absoluteIdentifier = '.' + split.join('.');
                    }

                    resourceObj = resources[alias];

                    if (isNull(resourceObj)) {
                        resourceObj = resources[alias] = control.findResource(alias);
                    }

                    if (!isNull(resourceObj) && !isNull(resourceObj.resource) && resourceObj.resource.type === 'observable') {
                        manager = ContextManager.getManager(resources[alias].control);
                        absoluteIdentifier = 'resources.' + alias + '.value' + absoluteIdentifier;
                    } else {
                        continue;
                    }
                } else {
                    // Look on the control.context
                    split = identifier.split('.');

                    if (!isNull(ContextManager.getContext(context, split))) {
                        manager = contextManager;
                        absoluteIdentifier = absoluteContextPath + '.' + identifier;
                    } else if (!isNull(ContextManager.getContext(control, split))) {
                        manager = null;
                    } else {
                        manager = contextManager;
                        absoluteIdentifier = absoluteContextPath + '.' + identifier;
                    }
                }

                if (!isNull(manager)) {
                    manager.observe(absoluteIdentifier, observableCallback);
                }
            }
        }

        /**
         * Wraps constant text as an IParsedExpression.
         * 
         * @param text The text to wrap.
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
         * Specifies the type of NodeManager.
         */
        type: string;

        /**
         * Lets us know when an ElementManager is a cloned manager, or the compiled 
         * manager from BindableTemplates. We do not want to bindAndLoad compiled 
         * managers that are clones.
         */
        isClone: boolean = false;

        /**
         * The INodeMap associated with this NodeManager. We have to use an 
         * INodeMap instead of an INode so we can treat all INodeManagers the same.
         */
        nodeMap: INodeMap;

        /**
         * The parent ElementManager for this NodeManager.
         */
        parent: IElementManager;

        /**
         * Initiailzes this ElementManger instance.
         * 
         * @param nodeMap The INodeMap associated with this NodeManager. We have to use an 
         * INodeMap instead of an INode so we can treat all INodeManagers the same.
         * @param parent The parent ElementManager for this NodeManager.
         */
        initialize(nodeMap: INodeMap, parent: IElementManager) {
            this.nodeMap = nodeMap;
            this.parent = parent;

            if (!isNull(parent)) {
                this.isClone = parent.isClone;
                parent.children.push(this);
            }
        }

        /**
         * Retrieves the parent control for this NodeManager.
         */
        getParentControl() {
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
         * Clones this NodeManager with the new node.
         * 
         * @param newNode The node used to clone this NodeManager.
         * @param parentManager The parent NodeManager for the clone.
         */
        clone(newNode: Node, parentManager: IElementManager) { return 1; }

        /**
         * The function used for data-binding a data context to the DOM.
         */
        bind() { }
    }

    /**
     * The Type for referencing the '$NodeManagerStatic' injectable as a dependency.
     */
    export function NodeManagerStatic(
        $regex,
        $ContextManagerStatic,
        $parser,
        $ExceptionStatic,
        $TemplateControlStatic) {
        NodeManager.$regex = $regex;
        NodeManager.$ContextManagerStatic = $ContextManagerStatic;
        NodeManager.$parser = $parser;
        NodeManager.$ExceptionStatic = $ExceptionStatic;
        NodeManager.$TemplateControlStatic = $TemplateControlStatic;
        return NodeManager;
    }

    register.injectable('$NodeManagerStatic', NodeManagerStatic, [
        '$regex',
        '$ContextManagerStatic',
        '$parser',
        '$ExceptionStatic',
        '$TemplateControlStatic'
    ], register.injectableType.STATIC);

    /**
     * Describes an object that takes a Node and provides a way to data-bind to that node.
     */
    export interface INodeManager {
        /**
         * The type of INodeManager
         */
        type: string;

        /**
         * The INodeMap for this INodeManager. Contains the compiled Node.
         */
        nodeMap?: INodeMap;

        /**
         * The parent manager for this INodeManager.
         */
        parent?: IElementManager;

        /**
         * Retrieves the parent control associated with the parent manager.
         */
        getParentControl? (): ui.ITemplateControl;

        /**
         * Clones this NodeManager with the new node.
         * 
         * @param newNode The node used to clone this NodeManager.
         * @param parentManager The parent IElementManager for the clone.
         */
        clone? (newNode: Node, parentManager: IElementManager): number;

        /**
         * Initializes the object's properties.
         * 
         * @param nodeMap The INodeMap associated with this TextManager. We have to use an 
         * INodeMap instead of an INode so we can treat all INodeManagers the same.
         * @param parent The parent IElementManager.
         */
        initialize?(nodeMap: INodeMap, parent: IElementManager): void;

        /**
         * The function used for data-binding a data context to the DOM.
         */
        bind(): void;
    }

    /**
     * Describes a compiled Node.
     */
    export interface INode {
        /**
         * The control associated with the Node, if one exists.
         */
        control?: IControl;

        /**
         * The Node that is compiled.
         */
        node?: Node;

        /**
         * The name of the Node.
         */
        nodeName?: string;

        /**
         * Any IParsedExpressions contained in the Node.
         */
        expressions?: Array<expressions.IParsedExpression>;

        /**
         * Unique identifiers contained in the Node.
         */
        identifiers?: Array<string>;

        /**
         * The injector for a control associated with the Node, if one exists.
         */
        injector?: dependency.IInjector<IControl>;
    }


    /**
     * Defines the interface for a compiled HTMLElement.
     */
    export interface IUiControlNode extends INode {
        /**
         * The control associated with the HTMLElement, if one exists.
         */
        control: ui.ITemplateControl;

        /**
         * The resources element defined as the control element's first
         * element child.
         */
        resourceElement?: HTMLElement;
    }


    /**
     * Describes a compiled HTMLElement with all 
     * associated nodes contained within its tag.
     */
    export interface INodeMap {
        /**
         * The HTMLElement that is compiled.
         */
        element?: HTMLElement;

        /**
         * The compiled attribute Nodes for the HTMLElement
         */
        nodes: Array<INode>;

        /**
         * An object of key/value attribute pairs.
         */
        attributes?: IObject<string>;

        /**
         * The plat-context path for the next UIControl, if specified.
         */
        childContext?: string;

        /**
         * Indicates whether or not a IControl was found on the HTMLElement.
         */
        hasControl?: boolean;

        /**
         * The INode for the UIControl, if one was found for the HTMLElement.
         */
        uiControlNode?: IUiControlNode;
    }

    /**
     * The external interface for the '$NodeManagerStatic' injectable.
     */
    export interface INodeManagerStatic {
        /**
         * The start markup notation.
         */
        startSymbol: string;

        /**
         * The end markup notation.
         */
        endSymbol: string;

        /**
         * The regular expression for finding markup in a string.
         */
        markupRegex: RegExp;

        /**
         * Given an IParsedExpression array, creates an array of unique identifers
         * to use with binding. This allows us to avoid creating multiple listeners
         * for the identifier and node.
         *
         * @static
         * @param expressions An IParsedExpression array to search for identifiers.
         * @return {Array<string>} An array of identifiers.
         */
        findUniqueIdentifiers(expressions: Array<expressions.IParsedExpression>): Array<string>;

        /**
         * Determines if a string has the markup notation.
         *
         * @param text The text string in which to search for markup.
         * @return {Boolean} Indicates whether or not there is markup.
         */
        hasMarkup(text: string): boolean;

        /**
         * Given a string, finds markup in the string and creates an IParsedExpression array.
         *
         * @static
         * @param text The text string to parse.
         * @return {Array<IParsedExpression>}
         */
        findMarkup(text: string): Array<expressions.IParsedExpression>;

        /**
         * Takes in data context and an IParsedExpression array and outputs a string of the evaluated
         * expressions.
         *
         * @static
         * @param expressions The IParsedExpression array to evaluate.
         * @param control The IControl used to parse the expressions.
         * @return {string} The evaluated expressions.
         */
        build(expressions: Array<expressions.IParsedExpression>, control?: ui.ITemplateControl): string;

        /**
         * Registers a listener to be notified of a change in any associated identifier.
         *
         * @static
         * @param identifiers An Array of identifiers to observe.
         * @param control The control associated to the identifiers.
         * @param listener The listener to call when any identifier property changes.
         */
        observeIdentifiers(identifiers: Array<string>,
            control: ui.ITemplateControl, listener: (...args: Array<any>) => void): void;
    }
}
