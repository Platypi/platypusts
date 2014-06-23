module plat.processing {
    /**
     * Responsible for iterating through the DOM and collecting controls.
     */
    export class Compiler implements ICompiler {
        $ElementManagerFactory: IElementManagerFactory = acquire(__ElementManagerFactory);
        $TextManagerFactory: ITextManagerFactory = acquire(__TextManagerFactory);
        $CommentManagerFactory: ICommentManagerFactory = acquire(__CommentManagerFactory);
        $ManagerCache: storage.ICache<INodeManager> = acquire(__ManagerCache);

        compile(node: Node, control?: ui.ITemplateControl): void;
        compile(nodes: Array<Node>, control?: ui.ITemplateControl): void;
        compile(nodes: NodeList, control?: ui.ITemplateControl): void;
        compile(node: any, control?: ui.ITemplateControl) {
            var childNodes = node.childNodes,
                length: number,
                newLength: number,
                childNode: Node,
                hasControl = !isNull(control),
                manager = <IElementManager>(hasControl ? this.$ManagerCache.read(control.uid) : null),
                create = this.$ElementManagerFactory.create;

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
         * Iterates through the array of nodes creating Element Managers on Element 
         * nodes, Text Managers on text nodes, and Comment Managers on comment nodes.
         * 
         * @param nodes The NodeList to be compiled. 
         * @param manager The parent Element Manager for the given array of nodes.
         */
        _compileNodes(nodes: Array<Node>, manager: IElementManager): void {
            var length = nodes.length,
                node: Node,
                newManager: IElementManager,
                newLength: number,
                create = this.$ElementManagerFactory.create,
                commentCreate = this.$CommentManagerFactory.create,
                textCreate = this.$TextManagerFactory.create;

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

    /**
     * The Type for referencing the '$Compiler' injectable as a dependency.
     */
    export function ICompiler(): ICompiler {
        return new Compiler();
    }

    register.injectable(__Compiler, ICompiler);

    /**
     * Describes an object that iterates through the DOM and collects controls.
     */
    export interface ICompiler {
        /**
         * Goes through the childNodes of the given Node, finding elements that contain controls as well as
         * text that contains markup.
         * 
         * @param node The node whose childNodes are going to be compiled.
         * @param control The parent control for the given Node. The parent must implement ui.ITemplateControl
         * since only controls that implement ui.ITemplateControl can contain templates.
         */
        compile(node: Node, control?: ui.ITemplateControl): void;
        /**
         * Goes through the Node array, finding elements that contain controls as well as
         * text that contains markup.
         * 
         * @param nodes The Node array to be compiled.
         * @param control The parent control for the given Node array. The parent must implement ui.ITemplateControl
         * since only controls that implement ui.ITemplateControl are responsible for creating DOM.
         */
        compile(nodes: Array<Node>, control?: ui.ITemplateControl): void;
        /**
         * Goes through the NodeList, finding elements that contain controls as well as
         * text that contains markup.
         * 
         * @param nodes The NodeList to be compiled. 
         * @param control The parent control for the given NodeList. The parent must implement ui.ITemplateControl
         * since only controls that implement ui.ITemplateControl are responsible for creating DOM.
         */
        compile(nodes: NodeList, control?: ui.ITemplateControl): void;
    }
}
