/**Given a binary tree the task is to find the height of the binary tree.
 * Height of a tree is defined as max number of nodes from root to a leaf node on the longest path.
 * 
 * For ex:
 * 
 *                                   10
 *                                  |
 *                                20
 *                              |
 *                           30
 *                         |
 *                       40
 *                     |
 *                   50
 * 
 * So height is 5.
 *                                                                                          
 * For ex:                      10                                                           
 *                           |     |                                                                                               
 *                         20      30
 *                     |      |   |   |
 *                   40      50   60  70
 * 
 * So height is 3.
 * 
 * For ex:                     10
 * 
 * Height is 1.
 */


/**Approach: 0(n),0(h)
 * 
 * Lets understand this recursion.
 * Ex:                                 10
 *                                 |        |
 *                                20        30
 *                                      |       |
 *                                     40       50
 * 
 * Now first call it with root which is 10.
 *                     It calls for left root which is 20
 *                                         It calls for left root which is null return 0;
 *                                         (Left call for height ofTree(20) is complete);
 *                                         It calls for right of it which is null return 0
 *                                    Both left and right call of heightOfTree(20) is complete it return max(left,right)+1 = 0+1 = 1
 *                                    to parent call which is height(10).
 *          The left call for height(10) is complete and returned 1.
 *          It calls for right of it which is 30
 *                                  height(30) calls for left of it which is 40
 *                                                   height(40) calls for left of it which is null return 0;
 *                                                   height(40) left call is complete
 *                                                   Height 40 calls for right of it which is null return 0;
 *                                                   Both left and right calls of height 40 is complete return max(left,right)+1 = 1;
 * 
 *                                       height(30) left call is complete 
 *                                       height(30) calls right i,e height(50)
 *                                                   height(50) calls left of it which is null return 0;
 *                                                   height(50) calls right of it which is null return 0;
 *                                                   Both left and right calls for height(50) is complete return max(left,right)+1 = 1;
 *                         Both calls for height 30 is complete so it return Max(left,right)+1 = (1,1)+1 = 2;
 *            Both calls for height(10) is complete so it returns Max(left,right)+1 = Max(1,2)+1 = 2+1 = 3.
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

    heightOfBinaryTree(root: TreeNode<T> | null): number {
        if (root === null) return 0;
        let leftHeight = this.heightOfBinaryTree(root.left);
        let rightHeight = this.heightOfBinaryTree(root.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
}

let root = new TreeNode<number>(10);
root.left = new TreeNode(20);
root.left.left = new TreeNode(30);
root.left.left.left = new TreeNode(40);
root.left.left.left.left = new TreeNode(50);
