/// <reference path="../../references.d.ts" />

module plat.processing {
    'use strict';

    /**
     * @name TextManager
     * @memberof plat.processing
     * @kind class
     * 
     * @extends {plat.processing.NodeManager}
     * 
     * @description
     * The class responsible for initializing and data-binding values to text nodes.
     */
    export class TextManager extends NodeManager {
        /**
         * @name type
         * @memberof plat.processing.TextManager
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Specifies the type for this {@link plat.processing.NodeManager|NodeManager}. 
         * It's value is "text".
         */
        type = 'text';

        /**
         * @name create
         * @memberof plat.processing.TextManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Determines if a text node has markup, and creates a {@link plat.processing.TextManager|TextManager} if it does. 
         * An {@link plat.processing.TextManager|TextManager} responsible for markup in the passed in node or an empty 
         * {@link plat.processing.TextManager|TextManager} if not markup is found will be added to the managers array.
         * 
         * @param {Node} node The Node used to find markup.
         * @param {plat.processing.ElementManager} parent The parent {@link plat.processing.ElementManager|ElementManager} 
         * for the node.
         * 
         * @returns {plat.processing.TextManager} The newly created {@link plat.processing.TextManager|TextManager} 
         * responsible for the passed in Text Node.
         */
        static create(node: Node, parent: ElementManager): TextManager {
            var value = node.nodeValue,
                manager = new TextManager();

            if (NodeManager.hasMarkup(value)) {
                var expressions = NodeManager.findMarkup(value),
                    map = {
                        nodes: [{
                            node: node,
                            expressions: expressions
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
         * @name _cloneNodeMap
         * @memberof plat.processing.TextManager
         * @kind function
         * @access protected
         * @static
         * 
         * @description
         * Clones an {@link plat.processing.INodeMap|INodeMap} with a new text node.
         * 
         * @param {plat.processing.INodeMap} sourceMap The original {@link plat.processing.INodeMap|INodeMap}.
         * @param {Node} newNode The new text node used for cloning.
         * 
         * @returns {plat.processing.INodeMap} The cloned {@link plat.processing.INodeMap|INodeMap}.
         */
        protected static _cloneNodeMap(sourceMap: INodeMap, newNode: Node): INodeMap {
            var node = sourceMap.nodes[0],
                nodeMap: INodeMap = {
                    nodes: [{
                        expressions: node.expressions,
                        nodeName: node.nodeName,
                        node: newNode
                    }]
                };
            return nodeMap;
        }

        /**
         * @name _clone
         * @memberof plat.processing.TextManager
         * @kind function
         * @access protected
         * @static
         * 
         * @description
         * Clones a {@link plat.processing.TextManager|TextManager} with a new text node.
         * 
         * @param {plat.processing.NodeManager} sourceManager The original {@link plat.processing.NodeManager|NodeManager}.
         * @param {Node} node The new text node to associate with the clone.
         * @param {plat.processing.ElementManager} parent The parent {@link plat.processing.ElementManager|ElementManager} 
         * for the new clone.
         * 
         * @returns {plat.processing.TextManager} The cloned {@link plat.processing.TextManager|TextManager}.
         */
        protected static _clone(sourceManager: NodeManager, node: Node, parent: ElementManager): TextManager {
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
         * @name clone
         * @memberof plat.processing.TextManager
         * @kind function
         * @access public
         * 
         * @description
         * Clones this {@link plat.processing.TextManager|TextManager} with a new node.
         * 
         * @param {Node} newNode The new node attached to the cloned {@link plat.processing.TextManager|TextManager}.
         * @param {plat.processing.ElementManager} parentManager The parent {@link plat.processing.ElementManager|ElementManager} 
         * for the clone.
         * 
         * @returns {number} The number of nodes to advance while node traversal is in progress (returns 1).
         */
        clone(newNode: Node, parentManager: ElementManager): number {
            TextManager._clone(this, newNode, parentManager);
            return 1;
        }

        /**
         * @name bind
         * @memberof plat.processing.TextManager
         * @kind function
         * @access public
         * 
         * @description
         * The function used for data-binding a data context to the DOM.
         * 
         * @returns {void}
         */
        bind(): void {
            var parent = this.getParentControl(),
                node = this.nodeMap.nodes[0],
                textNode = node.node,
                expressions = node.expressions;

            NodeManager.observeExpressions(node.expressions, parent,
                this._setText.bind(this, textNode, parent, expressions));

            this._setText(textNode, parent, expressions);
        }

        /**
         * @name _setText
         * @memberof plat.processing.TextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Builds the node expression and sets the value.
         * 
         * @param {Node} Node The associated node whose value will be set.
         * @param {plat.ui.TemplateControl} control The control whose context will be used to bind 
         * the data.
         * @param {Array<plat.expressions.IParsedExpression>} expressions An array of parsed expressions used to build 
         * the node value.
         * 
         * @returns {void}
         */
        protected _setText(node: Node, control: ui.TemplateControl, expressions: Array<expressions.IParsedExpression>): void {
            node.nodeValue = NodeManager.build(expressions,(control || <ui.TemplateControl>{}));
        }
    }

    /**
     * The Type for referencing the '_TextManager' injectable as a dependency.
     */
    export function ITextManagerFactory(): ITextManagerFactory {
        return TextManager;
    }

    register.injectable(__TextManagerFactory, ITextManagerFactory, null, __FACTORY);
    register.injectable(__TextManagerInstance, TextManager, null, __INSTANCE);

    /**
     * @name ITextManagerFactory
     * @memberof plat.processing
     * @kind interface
     * 
     * @description
     * Creates and manages a class for dealing with DOM Text Nodes.
     */
    export interface ITextManagerFactory {
        /**
         * @name create
         * @memberof plat.processing.ITextManagerFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Determines if a text node has markup, and creates a {@link plat.processing.TextManager|TextManager} if it does. 
         * An {@link plat.processing.TextManager|TextManager} responsible for markup in the passed in node or an empty 
         * {@link plat.processing.TextManager|TextManager} if not markup is found will be added to the managers array.
         * 
         * @param {Node} node The Node used to find markup.
         * @param {plat.processing.ElementManager} parent The parent {@link plat.processing.ElementManager|ElementManager} 
         * for the node.
         * 
         * @returns {plat.processing.TextManager} The newly created {@link plat.processing.TextManager|TextManager} 
         * responsible for the passed in Text Node.
         */
        create(node: Node, parent?: ElementManager): TextManager;
    }
}
