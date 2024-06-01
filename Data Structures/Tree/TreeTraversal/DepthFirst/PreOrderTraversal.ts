/**PreOrder traversal is a popular depth first tree travesal permutation in which we follow order of
 * root -> left -> right.
 * 
 * For ex:                     10
 *                        |           |
 *                       20          30
 *                              |        |
 *                             40         50
 * 
 * So the preOrder traversal of this tree will be 
 * o/p 10,20,30,40,50 */


/**Approach: 0(n),0(h) where n is number of nodes in tree and h is height of tree which is
 * max possible nodes from root to a leaf node.
 * 
 * Explanation is similar to InorderTravesal.
 */
class TreeNode<T> {
    data: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    constructor(data: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    preOrderTraversal(root: TreeNode<T> | null, arr: T[]): T[] {
        if (root === null) return arr;
        arr.push(root.data);
        this.preOrderTraversal(root.left, arr);
        this.preOrderTraversal(root.right, arr);
        return arr;
    }
}

let root = new TreeNode<number>(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);
root.right.left = new TreeNode(40);
root.right.right = new TreeNode(50);
console.log(root.preOrderTraversal(root, []));