/**Inorder traversal is a popular depth first tree traversal permutation in which we follow order of
 * left -> root -> right.
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



/**Approach: 0(n),0(heightOfBinaryTree) where n is the number of nodes in the tree.
 * 
 * Height of binary tree is the number of nodes from root to leaf on the longest path.
 * At most in the function call stack we will have either the left function calls or the right function calls
 * thus its 0(heightOfBinaryTree).
 * 
 * This will get clear in explanation below.
 * 
 * In our approach instead of simply printing the tree data in inorder fashion we are storing it a array and then
 * returning back this array. We could having simply printed as well via code 
 * 
 * inorderTraversal(root: TreeNode<T> | null): void {
        if (root === null) return;
        this.inorderTraversal(root.left);
        console.log(root.data);
        this.inorderTraversal(root.right);
    }

    Now lets understand the above simpler recursion first than we will understand how we can store them in a array and
    return back that array.

    Taking example of: 
                               10
 *                        |           |
 *                       20          30
 *                              |        |
 *                             40         50
 * 
 * 
 * First we have passed the root in inorderFunction so root is 10, now in first line it calls for inorder again but with
 * root.left so in call stack root which is 10 node gets stored so stack looks like 
 * 
 * inorder(10)
 * 
 * Now at 20 node as inorder function is being called so again it calls for root.left and thus now the function control is 
 * getting away from 20 so this node gets stored in function call stack. Now stack looks like
 * 
 * 20(node)
 * 10(node) 

    Now it again calls for root.left which is left of 20 (20->left) which is null and thus root===null return condition
    gets invoked and now, control comes back to 20.

    Now this inorder(20) logs the data i,e root.data as all left call of this is completed

    o/p ~~~~~~~~~~~~~~20

    and call for 20-> right 
    Its again null thus returns and now inorder(20) function has completed all its task thus gets removed from stack.

    So stack looks like 

    inorder(10)(node)  now its has completed all its left task so it prints console.log(10).

    O/p ~~~~~~ 20,10 Till now

    Now calls for right task.

    So inorder(30) now inOrder(30) again calls for inOrder(30->left) thus control is getting away from
    30 and thus it gets stored in stack.


    inOrder(30)
    inOrder(10)

    Now inOrder(30) again calls for left of it.i,e inorder (40).
    Inorder 40 now calls left of it again so control is getting away so it gets stored in stack.


    inorder(40)
    inOrder(30)
    inOrder(10)

    Now inOrder(40) calls for left of it which is null and thus returns.
    Now it prints 40 as all left calls are completed

    O/p ~~~~~~ 20,10,40 Till now

    And goes to right of it which is again null and thus inOrder(40) call gets completed and it
    gets removed from stack.

    inOrder(30)
    inOrder(10)

    Now all left call of inOrder(30) is completed so it prints itself 
    
    O/p ~~~~~~ 20,10,40,30 Till now

    and calls right,

    inOrder(50). Now inorder 50 calls for left of it now again pointer is getting removed from inOrder(50) so it
    gets stacked


    inorder(50)
    inOrder(30)
    inOrder(10)

    Now 50 calls left of it which is null.
    Now all left calls of inOrder(50) is complete so it prints itself 
    
   O/p ~~~~~~ 20,10,40,30 ,50

    and calls for right of it
    
    right of 50 is null so it returns and since all calls of 50 are complete thus it gets removed from stack.
    All calls of 30 are complete so it gets removed from stack.
    All calls of 10 are complete so it gets removed from stack.

    In case of storing in array we simply need to pass an array parameter to function.
    This array will store in place of logging and will be send in every recursive call to the
    function itself .

    In last when everything is over we return the arr.

    We can clearly see that at most 3 items were there at a time in function call stack which
    are either the left parts or the right parts.
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

    inorderTraversal(root: TreeNode<T> | null, arr: T[]): T[] {
        if (root === null) return arr;
        this.inorderTraversal(root.left, arr);
        arr.push(root.data);
        this.inorderTraversal(root.right, arr);
        return arr;
    }
}

let root = new TreeNode<number>(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);
root.right.left = new TreeNode(40);
root.right.right = new TreeNode(50);
console.log(root.inorderTraversal(root, []));