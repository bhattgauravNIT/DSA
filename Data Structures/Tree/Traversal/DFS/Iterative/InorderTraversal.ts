/**Given a binary tree the task is to do a inOrder traversal of this binary tree, in a iterative fashion i,e without recursion.
 * 
 * Inorder traversal is left->root->right
 * 
 * For ex:                     10
 *                        |           |
 *                       20          30
 *                              |        |
 *                             40         50
 * 
 * So the inorder traversal of this tree will be 
 * o/p 20,10,40,30,50
 * 
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

    /**
     * 
     * For ex:                 10
 *                        |           |
 *                       20          30
 *                              |        |
 *                             40         50
     */
    inorderIterative(root: TreeNode<T> | null) {
        if (root === null) return;
        let stack: TreeNode<T>[] = [root];
        let current: TreeNode<T> | null = root;
        while (stack.length > 0) {
            if (current !== null) {
                while (current.left !== null) {
                    current = current?.left;
                    stack.push(current);
                }
            }
            current = stack[stack.length - 1];
            console.log(current.data);
            stack.pop();
            current = current.right;
        }
    }
}

let root = new TreeNode<number>(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);
root.right.left = new TreeNode(40);
root.right.right = new TreeNode(50);
root.inorderIterative(root);