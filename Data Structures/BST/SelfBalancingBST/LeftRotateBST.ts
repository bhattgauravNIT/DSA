/**Given a root node of a BST, the task is to do a left rotation of the BST by root. 
 * 
 * For ex: 
 *                             
              7
                8
                   9
         
 * 
   after leftRotation the BST becomes:
                                                   8
                                            7            9

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
               8                 ->>>>>      
                9

                                                      8
 *                                                7        9


         So we need to left rotate this.

         In the left rotated BST, 
         
         1. new root is the current's root right, 
         so let newRoot = root.right;


         2. Whatever is in new root's left will be greater than current root and thus should be placed in right of current root.
         so root.right = newRoot.left;

         3. Now newRoot's left should be having everything from the root so
         newRoot.left = root.
     * 
     * 
     */
    leftRotate(root: BST<T> | null) {
        if (root === null || root.right === null) return null;
        let newRoot = root.right;
        root.right = newRoot.left;
        newRoot.left = root;
        return newRoot;
    }
}

let root = new BST(7);
root.right = new BST(8);
root.right.right = new BST(9);
console.log(root.leftRotate(root));