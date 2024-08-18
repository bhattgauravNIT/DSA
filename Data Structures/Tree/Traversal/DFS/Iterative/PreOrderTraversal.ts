/**PreOrder traversal is a popular depth first tree travesal permutation in which we follow order of
 * root -> left -> right. We need to do it iteratively without recursion
 * 
 * For ex:                     10                                  
 *                        |           |                             
 *                       20          30                               
 *                   |        |      |                                
 *                 40         50     60
 * 
 * So the preOrder traversal of this tree will be 
 * o/p : 10,20,40,50,30,60
 * 
 * */

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
     * The recursion and iterative approach both have same time complexity i,e 0(n),0(h).
     * Lets understand this iterative approach with help of an example.
     * 
     * 
 * For ex:                     10                                  
 *                        |           |                             
 *                       20          30                               
 *                   |        |      |                                
 *                 40         50     60
 * 
 *     
 *      So the preOrder o/p for this tree is 10,20,40,50,30,60
 * 
 *      Lets maintain a stack.
 *      we can see that first we printed everything left including the root i,e 10,20,40. root was 10.
 *      After that the right child of parent of last node i,e right child of 20 is printed i,e 50.
 *      After that right child of the parent node of this node that is right child of 10 i,e 30 is printed.
 *      Now we go left of 30 and so on................
 * 
 * 
 *     So we maintain a stack and mark current as root node.
 *     while(root !== null || stacklength>0)
 *     we keep going left and printing data and pushing the current's right to a stack.
 * 
 *    Now if stack has length we mark current as the top of the stack and pop it and process repeats.
     * 
     
     */
    iterativePreOrderTraversal(root: TreeNode<T> | null) {
        if (root === null) return;
        let stack: TreeNode<T>[] = [];
        let current: TreeNode<T> | null = root;
        while (current !== null || stack.length > 0) {
            while (current !== null) {
                console.log(current?.data);
                if (current.right) {
                    stack.push(current.right);
                }
                current = current.left;
            }
            if (stack.length > 0) {
                current = stack[stack.length - 1];
                stack.pop();
            }
        }

    }
}

let root = new TreeNode<number>(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);
root.left.left = new TreeNode(40);
root.left.right = new TreeNode(50);
root.right.left = new TreeNode(60);
root.iterativePreOrderTraversal(root);
