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
 * Ex:                         10
 *                        |            |
 *                       20           30
 *                   |        |      |
 *                 40         50     60
 * 
 * o/p: 40,20,50,10,60,30
 *      
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
     * Approach: 0(n),0(h)
     * 
     * This itearive approach is also having the same time and space complexities as that of a recursive
     * solution.
     * 
     * Lets understand this with the help of below example
     * 
     * For ex:                  10
 *                        |            |
 *                       20           30
 *                   |        |      |
 *                 40         50     60
 * 
 *    So the inorder traversal of this binary tree is
 *    [40,20,50,10,60,30]
 * 
 *    Lets use a stack so we say current as root and create a stack of treeNode object.
 *    now while(current is not null || the stack becomes empty) we went inside a loop.
 *    
 *    Since this traversal is left root right thus first we need to process the left nodes.
 *    So we go till the last current->left i,e 40 and keep pushing everything into a stack.
 * 
 *    So at this point out stack looks like:
 * 
 *    40
 *    20
 *    10
 * 
 *    So left is all processed and made a part of stack.
 *    Now we take them out one by one and will try and process the right side because its left root right
 *    and root is where we print the current root.
 *    
 *    So we take out 40, print it and make current as current->right.
 *    Now the process continues so there is nothing right of it.
 * 
 *    Our stack looks like
 * 
 *    20
 *    10 
 * 
 *    So we don't go inside the inner loop and again pop and print from stack i,e 20 so our stack looks like
 * 
 *    10 and current is 20 , now we make current as current.right i,e 50.
 * 
 *    If there would have been anything left od 50 , we would have went there till extreme left.
 * 
 *    and so on....................
 * 
 *    So in short for the given root we push everything left to it in stack.
 *    then take the top , pop it print it and move right to it.
 *    Cycle repeats.
 * 
 * 
     */
    inorderIterative(root: TreeNode<T> | null) {
        if (root === null) return;
        let stack: TreeNode<T>[] = [];
        let current: TreeNode<T> | null = root;
        while (current !== null || stack.length > 0) {
            while (current !== null) {
                stack.push(current);
                current = current.left;
            }
            current = stack[stack.length - 1];
            stack.pop();
            console.log(current.data);
            current = current.right;
        }
    }
}

let root = new TreeNode<number>(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);
root.left.left = new TreeNode(40);
root.left.right = new TreeNode(50);
root.right.left = new TreeNode(60);
root.inorderIterative(root);