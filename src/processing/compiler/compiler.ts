/**
 * @name processing
 * @memberof plat
 * @kind namespace
 * @access public
 *
 * @description
 * Holds classes and interfaces related to Document processing in platypus.
 */
module plat.processing {
    'use strict';

    /**
     * @name Compiler
     * @memberof plat.processing
     * @kind class
     *
     * @description
     * Responsible for iterating through the DOM and collecting controls.
     */
    export class Compiler {
        protected static _inject: any = {
            _ElementManagerFactory: __ElementManagerFactory,
            _TextManagerFactory: __TextManagerFactory,
            _CommentManagerFactory: __CommentManagerFactory,
            _managerCache: __ManagerCache
        };

        /**
         * @name _ElementManagerFactory
         * @memberof plat.processing.Compiler
         * @kind property
         * @access protected
         *
         * @type {plat.processing.IElementManagerFactory}
         *
         * @description
         * Reference to the {@link plat.processing.IElementManagerFactory|IElementManagerFactory} injectable.
         */
        protected _ElementManagerFactory: IElementManagerFactory;

        /**
         * @name _TextManager
         * @memberof plat.processing.Compiler
         * @kind property
         * @access protected
         *
         * @type {plat.processing.IElementManagerFactory}
         *
         * @description
         * Reference to the {@link plat.processing.ITextManagerFactory|ITextManagerFactory} injectable.
         */
        protected _TextManagerFactory: ITextManagerFactory;

        /**
         * @name _CommentManagerFactory
         * @memberof plat.processing.Compiler
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
         * @name _managerCache
         * @memberof plat.processing.Compiler
         * @kind property
         * @access protected
         *
         * @type {plat.storage.Cache<processing.ElementManager>}
         *
         * @description
         * Reference to a cache injectable that stores {@link plat.processing.ElementManager|ElementManagers}.
         */
        protected _managerCache: storage.Cache<NodeManager>;

        /**
         * @name compile
         * @memberof plat.processing.Compiler
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * Goes through the child Nodes of the given Node, finding elements that contain controls as well as
         * text that contains markup.
         *
         * @param {Node} node The node whose childNodes are going to be compiled.
         * @param {plat.ui.TemplateControl} control? The parent control for the given Node. The parent must implement the
         * {@link plat.ui.TemplateControl|TemplateControl interface} since only they can contain templates.
         *
         * @returns {void}
         */
        compile(node: Node, control?: ui.TemplateControl): void;
        /**
         * @name compile
         * @memberof plat.processing.Compiler
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * Goes through the Node array, finding elements that contain controls as well as
         * text that contains markup.
         *
         * @param {Array<Node>} nodes The nodes that are going to be compiled.
         * @param {plat.ui.TemplateControl} control? The parent control for the given Node. The parent must implement the
         * {@link plat.ui.TemplateControl|TemplateControl interface} since only they can contain templates.
         *
         * @returns {void}
         */
        compile(nodes: Array<Node>, control?: ui.TemplateControl): void;
        /**
         * @name compile
         * @memberof plat.processing.Compiler
         * @kind function
         * @access public
         * @variation 2
         *
         * @description
         * Goes through the NodeList, finding elements that contain controls as well as
         * text that contains markup.
         *
         * @param {NodeList} nodes The NodeList that is going to be compiled.
         * @param {plat.ui.TemplateControl} control? The parent control for the given Node. The parent must implement the
         * {@link plat.ui.TemplateControl|TemplateControl interface} since only they can contain templates.
         *
         * @returns {void}
         */
        compile(nodes: NodeList, control?: ui.TemplateControl): void;
        compile(node: any, control?: ui.TemplateControl): void {
            let childNodes = node.childNodes,
                length: number,
                newLength: number,
                childNode: Node,
                hasControl = !isNull(control),
                manager = <ElementManager>(hasControl ? this._managerCache.read(control.uid) : null),
                create = this._ElementManagerFactory.create;

            if (!isUndefined(childNodes)) {
                childNodes = Array.prototype.slice.call(childNodes);
            } else if (isFunction(node.push)) {
                childNodes = node;
            } else {
                childNodes = Array.prototype.slice.call(node);
            }

            if (isNull(manager)) {
                length = childNodes.length;

                for (var i = 0; i < length; ++i) {
                    childNode = childNodes[i];
                    if (childNode.nodeType === Node.ELEMENT_NODE) {
                        if (!isNull(create(<Element>childNode))) {
                            this.compile(childNode);
                        }
                    }

                    newLength = childNodes.length;
                    i += newLength - length;
                    length = newLength;
                }
            } else {
                this._compileNodes(childNodes, manager);
            }
        }

        /**
         * @name _compileNodes
         * @memberof plat.processing.Compiler
         * @kind function
         * @access protected
         *
         * @description
         * Iterates through the array of nodes creating {@link plat.processing.ElementManager|ElementManagers} on Element
         * nodes, {@link plat.processing.TextManager|TextManagers} on text nodes, and
         * {@link plat.processing.CommentManager|CommentManagers} on comment nodes.
         *
         * @param {Array<Node>} nodes The array of nodes to be compiled.
         * @param {plat.processing.ElementManager} manager The parent {@link plat.processing.ElementManager|ElementManagers}
         * for the given array of nodes.
         *
         * @returns {void}
         */
        /**
         * Iterates through the array of nodes creating Element Managers on Element
         * nodes, Text Managers on text nodes, and Comment Managers on comment nodes.
         *
         * @param nodes The NodeList to be compiled.
         * @param manager The parent Element Manager for the given array of nodes.
         */
        protected _compileNodes(nodes: Array<Node>, manager: ElementManager): void {
            let length = nodes.length,
                node: Node,
                newManager: ElementManager,
                newLength: number,
                create = this._ElementManagerFactory.create,
                commentCreate = this._CommentManagerFactory.create,
                textCreate = this._TextManagerFactory.create;

            for (var i = 0; i < length; ++i) {
                node = nodes[i];
                switch (node.nodeType) {
                    case Node.ELEMENT_NODE:
                        newManager = create(<Element>node, manager);
                        if (!isNull(newManager)) {
                            this._compileNodes(Array.prototype.slice.call(node.childNodes), newManager);
                        }
                        break;
                    case Node.TEXT_NODE:
                        textCreate(node, manager);
                        break;
                    case Node.COMMENT_NODE:
                        commentCreate(node, manager);
                        break;
                }
                newLength = nodes.length;
                i += newLength - length;
                length = newLength;
            }
        }
    }

    register.injectable(__Compiler, Compiler);
}
