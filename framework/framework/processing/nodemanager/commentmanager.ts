module plat.processing {
    /**
     * @name CommentManager
     * @memberof plat.processing
     * @kind class
     * 
     * @extends {plat.processing.NodeManager}
     * @implements {plat.processing.CommentManager}
     * 
     * @description
     * A class used to manage Comment nodes. Provides a way to 
     * clone a Comment node.
     */
    export class CommentManager extends NodeManager {
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
         * @param {plat.processing.ElementManager} parent The parent 
         * {@link plat.processing.ElementManager|ElementManager}.
         * 
         * @returns {plat.processing.CommentManager} The newly created {@link plat.processing.CommentManager|CommentManager} 
         * responsible for the passed in Comment Node.
         */
        static create(node: Node, parent: ElementManager): CommentManager {
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
         * Specifies the type for this {@link plat.processing.NodeManager|NodeManager}. 
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
         * @param {plat.processing.ElementManager} parentManager The parent {@link plat.processing.ElementManager|ElementManager} 
         * for the clone.
         * 
         * @returns {number} The number of nodes to advance while node traversal is in progress (returns 1).
         */
        clone(newNode: Node, parentManager: ElementManager): number {
            CommentManager.create(newNode, parentManager);
            return 1;
        }
    }

    /**
     * The Type for referencing the '_CommentManagerFactory' injectable as a dependency.
     */
    export function ICommentManagerFactory(): ICommentManagerFactory {
        return CommentManager;
    }

    register.injectable(__CommentManagerFactory, ICommentManagerFactory, null, __FACTORY);
    register.injectable(__CommentManagerInstance, CommentManager, null, __INSTANCE);
    
    /**
     * @name CommentManagerFactory
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
         * @param {plat.processing.ElementManager} parent The parent 
         * {@link plat.processing.ElementManager|ElementManager}.
         * 
         * @returns {plat.processing.CommentManager} The newly created {@link plat.processing.CommentManager|CommentManager} 
         * responsible for the passed in Comment Node.
         */
        create(node: Node, parent: ElementManager): CommentManager;
    }
}
