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

    /**Approach:0(1),0(1)
     * 
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