/**Given a tree which is not a BST currently but however its not BST just due to mismatch of two nodes.
 * The task is to identify the nodes and make the tree BST by simply swapping the nodes.
 * Return the root of the BST formed.
 * 
 * For ex:                        20
 *                        60             80
 *                 4           10     8      100
 * 
 * 
 * Clearly the two culprit nodes are 60 & 8.
 * If we swap them then the tree will look like
 * 
 *                                      20
 *                               8            80
 *                          4       10     60      100
 * 
 * 
 * which is a BST and thus we return the root of this BST formed.
 * 
 * 
 * For ex:                   60
 *                  8                  80
 *              4      10          20      100
 * 
 * two culprit nodes are 20 & 60 , so if we swap them then the tree will look like
 * 
 *                                  20
 *                            8          80
 *                       4        10   60     100
 * 
 * we return root of this BST formed.
 */

class Tree<T> {
    val: T;
    left: Tree<T> | null;
    right: Tree<T> | null;

    constructor(val: T, left: Tree<T> | null = null, right: Tree<T> | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    /**Approach1: 0(n),0(n)
     * 
     * 
     *  [40,60,10,20,8,80,100]
     */
    getInorder(root: Tree<number> | null, inOrder: number[]): number[] {
        if (root === null) return inOrder;
        this.getInorder(root.left, inOrder);
        inOrder.push(Number(root.val));
        this.getInorder(root.right, inOrder);
        return inOrder;
    }

    makeBst(root: Tree<number> | null) {
        if (root === null) return root;
        let inOrder = this.getInorder(root, []);
        let val1: number = Number.MAX_VALUE;
        let val2: number = Number.MAX_VALUE;
        //[4,60,10,20,8,80,100]
        //[4,8,10,60,20,80,100]
        for (let i = 1; i < inOrder.length; i++) {
            if (inOrder[i] < inOrder[i - 1]) {
                if (val1 === Number.MAX_VALUE) {
                    val1 = inOrder[i - 1];
                    val2 = inOrder[i];
                }
                if (val1 !== Number.MAX_VALUE) {
                    val2 = inOrder[i];
                }
            }
        }

        return root;
    }


}

let root = new Tree(20);
root.left = new Tree(60);
root.right = new Tree(80);
root.left.left = new Tree(4);
root.left.right = new Tree(10);
root.right.left = new Tree(8);
root.right.right = new Tree(100);
console.log(root.makeBst(root));