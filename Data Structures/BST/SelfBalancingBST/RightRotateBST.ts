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

    /**Approach: 0(1),0(1) */
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