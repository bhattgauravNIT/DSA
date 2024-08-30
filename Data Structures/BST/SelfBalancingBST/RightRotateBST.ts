/**Given a root node of a BST, the task is to do a right rotation of the BST by root. 
 * 
 * For ex: 
 *                             
              7
            6
         5
 * 
   after RightRotation the BST becomes:
                                                      6
 *                                                5        7

    For ex:                        
              10
            7
         5     8

    after right rotation the BST becomes:

                                                 7
                                            5         10
                                                    8

*/

class BST<T> {
    val: T;
    left: BST<T> | null;
    right: BST<T> | null;

    constructor(val: T, left: BST<T> | null = null, right: BST<T> | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    /**Approach: 0(1),0(1)
     * 
     * Lets understand this with help of an example
     * 
     *                           
              7                                  
            6                 ->>>>>      
         5

                                                      6
 *                                                5        7


         So we need to right rotate this.

         In the right rotated BST, 
         
         1. new root is the current's root left, 
         so let newRoot = root.left;


         2. Whatever is in new root's right will be smaller than current root and thus should be placed in left of current root.
         so root.left = newRoot.right;

         3. Now newRoot's right should be having everything from the root so
         newRoot.right = root.
     * 
     * 
     */
    rightRotate(root: BST<T> | null) {
        if (root === null || root.left === null) return null;
        let newRoot = root.left;
        root.left = newRoot.right;
        newRoot.right = root;
        return newRoot;
    }
}

let root = new BST(7);
root.left = new BST(6);
root.left.left = new BST(5);
console.log(root.rightRotate(root));