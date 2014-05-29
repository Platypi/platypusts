module plat.processing {
    /**
     * A class used to manage Comment nodes. Provides a way to 
     * clone a Comment node.
     */
    export class CommentManager extends NodeManager implements ICommentManager {
        /**
         * Creates a new CommentManager for the given Comment node.
         * 
         * @static
         * @param node The Comment to associate with the new manager.
         * @param parent The parent IElementManager.
         */
        static create(node: Node, parent: IElementManager): ICommentManager {
            var manager = new CommentManager();

            manager.initialize({
                nodes: [{
                    node: node
                }]
            }, parent);

            return manager;
        }

        /**
         * Specifies the type of INodeManager.
         */
        type: string = 'comment';

        clone(newNode: Node, parentManager: IElementManager): number {
            CommentManager.create(newNode, parentManager);
            return 1;
        }
    }

    /**
     * The Type for referencing the '$CommentManagerFactory' injectable as a dependency.
     */
    export function ICommentManagerFactory(): ICommentManagerFactory {
        return CommentManager;
    }

    register.injectable(__CommentManagerFactory, ICommentManagerFactory, null, register.FACTORY);

    /**
     * Creates and manages a class for dealing with Comment nodes.
     */
    export interface ICommentManagerFactory {
        /**
         * Creates a new CommentManager for the given Comment node.
         *
         * @static
         * @param node The Comment to associate with the new manager.
         * @param parent The parent IElementManager.
         */
        create(node: Node, parent: IElementManager): ICommentManager;
    }

    /**
     * An object used to manage Comment nodes.
     */
    export interface ICommentManager extends INodeManager {
        /**
         * A method for cloning this CommentManager.
         * 
         * @param newNode The new Comment node to associate with the cloned
         * manager.
         * @param parentManager The parent IElementManager for the new clone.
         */
        clone(newNode: Node, parentManager: IElementManager): number;
    }
}
