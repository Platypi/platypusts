module plat.processing {
    /**
     * The class responsible for initializing and data-binding values to text nodes.
     */
    export class TextManager extends NodeManager implements ITextManager {
        /**
         * Determines if a text node has markup, and creates a TextManager if it does.
         * A TextManager or empty TextManager will be added to the managers array.
         * 
         * @static
         * @param node The Node used to find markup.
         * @param parent The parent ITemplateControl for the node.
         */
        static create(node: Node, parent: IElementManager): ITextManager {
            var value = node.nodeValue,
                manager = new TextManager();

            if (NodeManager.hasMarkup(value)) {
                var expressions = NodeManager.findMarkup(value),
                    map = {
                        nodes: [{
                            node: node,
                            expressions: expressions,
                            identifiers: NodeManager.findUniqueIdentifiers(expressions),
                        }]
                    };

                manager.initialize(map, parent);

                return manager;
            }

            manager.initialize(null, parent);
            manager.bind = noop;

            return manager;
        }

        /**
         * Clones an INodeMap with a new text node.
         * 
         * @static
         * @param sourceMap The original INodeMap.
         * @param newNode The new text node used for cloning.
         */
        static _cloneNodeMap(sourceMap: INodeMap, newNode: Node): INodeMap {
            var node = sourceMap.nodes[0],
                nodeMap: INodeMap = {
                    nodes: [{
                        identifiers: node.identifiers,
                        expressions: node.expressions,
                        nodeName: node.nodeName,
                        node: newNode
                    }]
                };
            return nodeMap;
        }

        /**
         * Clones a TextManager with a new text node.
         * 
         * @static
         * @param sourceManager The original INodeManager.
         * @param node The new text node to associate with the clone.
         * @param parent The parent IElementManager for the new clone.
         */
        static _clone(sourceManager: INodeManager, node: Node, parent: IElementManager): ITextManager {
            var map = sourceManager.nodeMap,
                manager = new TextManager();

            if (!isNull(map)) {
                manager.initialize(TextManager._cloneNodeMap(map, node), parent);
            } else {
                manager.initialize(null, parent);
                manager.bind = noop;
            }

            return manager;
        }

        /**
         * Specifies the type for this INodeManager.
         */
        type: string = 'text';

        clone(newNode: Node, parentManager: IElementManager): number {
            TextManager._clone(this, newNode, parentManager);
            return 1;
        }

        bind(): void {
            var parent = this.getParentControl(),
                node = this.nodeMap.nodes[0],
                textNode = node.node,
                expressions = node.expressions;

            NodeManager.observeIdentifiers(node.identifiers, parent,
                this._setText.bind(this, textNode, parent, expressions));

            this._setText(textNode, parent, expressions);
        }

        /**
         * Builds the node expression and sets the value.
         * 
         * @param Node The associated node whose value will be set.
         * @param control The control whose context will be used to bind 
         * the data.
         * @param expressions An array of parsed expressions used to build 
         * the node value.
         */
        _setText(node: Node, control: ui.ITemplateControl, expressions: Array<expressions.IParsedExpression>): void {
            var control = control || <ui.ITemplateControl>{},
                value: any;

            value = NodeManager.build(expressions, control);

            node.nodeValue = value;
        }
    }

    /**
     * The Type for referencing the '$TextManagerFactory' injectable as a dependency.
     */
    export function ITextManagerFactory(): ITextManagerFactory {
        return TextManager;
    }

    register.injectable(__TextManagerFactory, ITextManagerFactory, null, register.FACTORY);

    /**
     * Creates and manages a class for dealing with Text nodes.
     */
    export interface ITextManagerFactory {
        /**
         * Determines if a text node has markup, and creates a TextManager if it does.
         * A TextManager or empty TextManager will be added to the managers array.
         * 
         * @static
         * @param node The Node used to find markup.
         * @param parent The parent ui.ITemplateControl for the node.
         */
        create(node: Node, parent?: IElementManager): ITextManager;
    }

    /**
     * An object responsible for initializing and data-binding values to text nodes.
     */
    export interface ITextManager extends INodeManager {
        /**
         * Clones this ITextManager with a new node.
         * 
         * @param newNode The new node attached to the cloned ITextManager.
         * @param parentManager The parent IElementManager for the clone.
         */
        clone(newNode: Node, parentManager: IElementManager): number;

        /**
         * The function used for data-binding a data context to the DOM.
         */
        bind(): void;
    }
}
