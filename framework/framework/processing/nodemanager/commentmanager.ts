module plat.processing {
    /**
     * @name CommentManager
     * @memberof plat.processing
     * @kind class
     * 
     * @extends {plat.processing.NodeManager}
     * @implements {plat.processing.ICommentManager}
     * 
     * @description
     * A class used to manage Comment nodes. Provides a way to 
     * clone a Comment node.
     */
    export class CommentManager extends NodeManager implements ICommentManager {
        /**
         * @name create
         * @memberof plat.processing.CommentManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Creates a new CommentManager for the given Comment node.
         * 
         * @param {Node} node The Comment to associate with the new manager.
         * @param {plat.processing.IElementManager} parent The parent 
         * {@link plat.processing.IElementManager|IElementManager}.
         * 
         * @returns {plat.processing.ICommentManager} The newly created {@link plat.processing.ICommentManager|ICommentManager} 
         * responsible for the passed in Comment Node.
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
         * @name type
         * @memberof plat.processing.CommentManager
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Specifies the type for this {@link plat.processing.INodeManager|INodeManager}. 
         * It's value is "comment".
         */
        type: string = 'comment';
        
        /**
         * @name clone
         * @memberof plat.processing.CommentManager
         * @kind function
         * @access public
         * 
         * @description
         * A method for cloning this manager with a new Comment.
         * 
         * @param {Node} newNode The new Comment node to associate with the cloned
         * manager.
         * @param {plat.processing.IElementManager} parentManager The parent {@link plat.processing.IElementManager|IElementManager} 
         * for the clone.
         * 
         * @returns {number} The number of nodes to advance while node traversal is in progress (returns 1).
         */
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

    register.injectable(__CommentManagerFactory, ICommentManagerFactory, null, __FACTORY);
    
    /**
     * @name ICommentManagerFactory
     * @memberof plat.processing
     * @kind interface
     * 
     * @description
     * Creates and manages a class for dealing with Comment nodes.
     */
    export interface ICommentManagerFactory {
        /**
         * @name create
         * @memberof plat.processing.ICommentManagerFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Creates a new CommentManager for the given Comment node.
         * 
         * @param {Node} node The Comment to associate with the new manager.
         * @param {plat.processing.IElementManager} parent The parent 
         * {@link plat.processing.IElementManager|IElementManager}.
         * 
         * @returns {plat.processing.ICommentManager} The newly created {@link plat.processing.ICommentManager|ICommentManager} 
         * responsible for the passed in Comment Node.
         */
        create(node: Node, parent: IElementManager): ICommentManager;
    }
    
    /**
     * @name ICommentManager
     * @memberof plat.processing
     * @kind interface
     * 
     * @extends {plat.processing.INodeManager}
     * 
     * @description
     * An object used to manage Comment nodes.
     */
    export interface ICommentManager extends INodeManager {
        /**
         * @name clone
         * @memberof plat.processing.ICommentManager
         * @kind function
         * @access public
         * 
         * @description
         * A method for cloning this manager with a new Comment.
         * 
         * @param {Node} newNode The new Comment node to associate with the cloned
         * manager.
         * @param {plat.processing.IElementManager} parentManager The parent {@link plat.processing.IElementManager|IElementManager} 
         * for the clone.
         * 
         * @returns {number} The number of nodes to advance while node traversal is in progress.
         */
        clone(newNode: Node, parentManager: IElementManager): number;
    }
}
