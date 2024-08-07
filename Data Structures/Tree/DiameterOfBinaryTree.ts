/**Given the root of a binary tree the task is the find the diameter of the tree.
 * Diameter of a binary tree is determined as the max number of nodes from one leaf to the another.
 * 
 * For ex:
 *                               10
 *                       20                30
 *              40             50     60       70
 * 
 * O/p 5
 * 
 * there are many possible paths for one leaf to another for example
 * 
 * 40->50 there are 3 nodes i,e 40,20,50.
 * 40->60 there are 4 nodes i,e 40,20,10,60.
 * but 40->70 there are 5 nodes i,e 40,20,10,30,70 thus o/p is 5.
 * 
 * For ex:
 * 
 *                              10
 *                       20             60
 *                  30        80 
 *             40      50          90
 *                                     18
 * 
 * o/p is 6 i,e path from 40->18 is the diameter of the binary tree.
 * 
 * 
 */

class TreeNode<T> {
    data: number;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    max = 0;
    constructor(data: number, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    diameterOfTheBinaryTree(root: TreeNode<T> | null): number {
        if (root === null) return 0;
        this.max = Math.max(this.max, this.diameterOfTheBinaryTree(root.left) + this.diameterOfTheBinaryTree(root.right) + 1);
        return this.max;
    }
}

const node18 = new TreeNode<number>(18);
const node90 = new TreeNode<number>(90, null, node18);
const node50 = new TreeNode<number>(50);
const node40 = new TreeNode<number>(40);
const node80 = new TreeNode<number>(80, node90);
const node30 = new TreeNode<number>(30, node40, node50);
const node60 = new TreeNode<number>(60);
const node20 = new TreeNode<number>(20, node30, node80);
const root = new TreeNode<number>(10, node20, node60);
