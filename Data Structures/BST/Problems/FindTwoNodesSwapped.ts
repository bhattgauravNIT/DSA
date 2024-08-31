/**Given a tree which is not a BST currently but however its not BST just due to mismatch of two nodes.
 * The task is to identify the two nodes due to which this BST is disturbed.
 *  
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
 * which is a BST
 * 
 * 
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
     * The inOrder traversal of the BST should be a sorted array, but since this tree is disturbed and thus this BST 
     * would not be a sorted array.
     * 
     * Using this inOrder traversal we can find the culprit nodes.
     * 
     * For ex:                    20
 *                        60             80
 *                 4           10     8      100
 * 
     *  
     * The inOrder traversal of this tree will look like:
     * 
     * [4,60,10,20,8,80,100]  
     * 
     * Now the two nodes which are misplaced are 60 and 8.
     * 
     * So we iterate over the array and see if  inOrder[i] < inOrder[i - 1]
     * if yes we mark the val1 as inOrder[i - 1] and val2 as inOrder[i]
     * 
     * why we marked val2 as inOrder this we will understand with help of another example say our inOrder was like
     * [4,8,10,60,20,80,100]
     * 
     * Now the two nodes which should be swapped are of value 20 and 60
     * so when we were at iteration of 20 we got inOrder[i] < inOrder[i - 1]
     * so val1 is inOrder[i-1] i,e 60 and val2 is inOrder[i].
     * 
     * So coming back to 
     * [4,60,10,20,8,80,100] 
     * 
     * so clearly we got two values which are misplaced.
     * 
     */
    getInorder(root: Tree<number> | null, inOrder: number[]): number[] {
        if (root === null) return inOrder;
        this.getInorder(root.left, inOrder);
        inOrder.push(Number(root.val));
        this.getInorder(root.right, inOrder);
        return inOrder;
    }

    fixBst(root: Tree<number> | null) {
        if (root === null) return root;
        let inOrder = this.getInorder(root, []);
        let val1: number = Number.MAX_VALUE;
        let val2: number = Number.MAX_VALUE;
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
        return { corrupted1: val1, corrupted2: val2 };
    }

    /**Approach2:
     * 0(n),0(h)
     * 
     * 
     *                                20
 *                               8            80
 *                          4       10     60      100
 * 
 *     This approach is based on previous approach only however previously we were iterating over the entire tree first
 *     then putting in Inorder array and then traversing through inOrder array again, so we were doing two iterations and
 *     using 0(n) additional space.
 * 
 *    in this we will use recursion and inTime of inOrder traversal only we will be finding out which nodes are violating
 *    the property that it should be lesser than prevNode.
 * 
     *
     * So we will be having a reference obj as let obj = { node1: root1, node2: root2, prevNode: prev }; 
     * where root1, root2 and prev are initially null.
     * 
     * Now we will pass this obj and since in ts, objects are passed by reference thus they can act as global variables.
     * 
     * Now as in Inorder traversal we recursively keep calling for left subtree.
     * So in above example we started from 20 and recursively kept calling left subTree and reached 4.
     * 
     * Now for 4, prev = null, node1 = null and node2 = null.
     * 
     * Similar to how we were checking in case of above approach 
     * if (inOrder[i] < inOrder[i - 1]) {
                if (val1 === Number.MAX_VALUE) {
                    val1 = inOrder[i - 1];
                    val2 = inOrder[i];
                }
                if (val1 !== Number.MAX_VALUE) {
                    val2 = inOrder[i];
                }
        }

        we check if prev exists and if current Node.val is lesser than prev which ideally should not happened and thus we
        need to update obj.

        if (obj.prevNode !== null && root.val < obj.prevNode) {
            if (obj.node1 === null) {
                obj.node1 = obj.prevNode;
                obj.node2 = root.val;
            } else {
                obj.node2 = root.val;
            }
        }

       Now prev node should be updated as root.val
       and thus we simply return the recursive call for function with right subtree.
     */

    fixBst1(root: Tree<number> | null) {
        if (root === null) return { root1: null, root2: null };
        let root1: number | null = null;
        let root2: number | null = null;
        let prev: number | null = null;
        let obj = { node1: root1, node2: root2, prevNode: prev };
        let res = this.inOrderOfBst(root, obj);
        return res;
    }

    inOrderOfBst(root: Tree<number> | null, obj: { node1: number | null, node2: number | null, prevNode: number | null }) {
        if (root === null) return obj;
        obj = this.inOrderOfBst(root.left, obj);
        if (obj.prevNode !== null && root.val < obj.prevNode) {
            if (obj.node1 === null) {
                obj.node1 = obj.prevNode;
                obj.node2 = root.val;
            } else {
                obj.node2 = root.val;
            }
        }
        obj.prevNode = root.val;
        return this.inOrderOfBst(root.right, obj);
    }

}

let root = new Tree(20);
root.left = new Tree(60);
root.right = new Tree(80);
root.left.left = new Tree(4);
root.left.right = new Tree(10);
root.right.left = new Tree(8);
root.right.right = new Tree(100);
console.log(root.fixBst1(root));