/**Given a binary tree the task is to tell wether the given binary tree is a balanced binary tree or not.
 * A tree is a balanced binary tree if the absolute difference of the left subTree height - right subTree height
 * is less than or equal to 1 for every node.
 * 
 * For ex:                     18
 *                        |         |
 *                        4         20
 *                              |       |
 *                             13      70
 * 
 * For root 18: |leftHeight-rightHeight| = |1-2| = 1 <= 1
 * For 4:   |0-0| = 0 <=1
 * For 20:  |1-1| = 0
 * For 13: |0-0| = 0
 * for 70: |0-0| = 0.
 * 
 * Clearly for all nodes the absolute of |left height - right height| is less than equal to 1 .so O/p is true.
 * 
 * 
 * Ex:             3
 *               |
 *              4
 *             |
 *            5
 * 
 * For root 3: |leftHeight-rightHeight| = |2-0| = 2 >=1 thus false.
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

    heightOfBinaryTree(root: TreeNode<T> | null): number {
        if (root === null) return 0;
        let lh = this.heightOfBinaryTree(root.left);
        let rh = this.heightOfBinaryTree(root.right);
        return Math.max(lh, rh) + 1;
    }

    /**Approach1: 0(n^2),0(h)
     * 
     * For every node we will be calculating the height via heightFunction and will be checking if left height & right Height
     * abs difference is less than equal to 1. Same we will repeat for the entire left subTree & rightSubTree.
     */
    isHeightBalancedBinaryTree(root: TreeNode<T> | null): boolean {
        if (root === null) return true;
        let lh = this.heightOfBinaryTree(root.left);
        let rh = this.heightOfBinaryTree(root.right);
        return (Math.abs(lh - rh) <= 1 && this.isHeightBalancedBinaryTree(root.left) && this.isHeightBalancedBinaryTree(root.right));
    }

    /**Approach2:
     * 
     * Lets understand this with help of an example we will be using an object which will be having two keys 
     * i,e isBalanced and height.
     * 
     * isBalanced will be checking if every node is balanced or not and height will be giving the height of every node.
     * 
     * 
     * 
 * For ex:                     18
 *                        |         |
 *                        4         20
 *                              |       |
 *                             13      70
 * 
 *      
 *        isHeightBalancedBinaryTree1(18)
 *                        isHeightBalancedBinaryTree1(4)
 *                             calls left:
 *                                        isHeightBalancedBinaryTree1(null) return {true, 0}.
 *                             calls right:
 *                                        isHeightBalancedBinaryTree1(null) return {true,0}.
 *                             setIsBalanced variable as leftItem.isBalanced && rightItem.isBalanced &&
                                             Math.abs(leftItem.height - rightItem.height) <= 1 ~== true
                                setHeight as Math.max(leftItem.height, rightItem.height) + 1 ~== (0,0)+1 = 1
                                return {true,2}.
                            left call complete for isHeightBalancedBinaryTree1(18)
                            calls right.
                            isHeightBalancedBinaryTree1(20)
                                        calls left:
                                                  isHeightBalancedBinaryTree1(13)
                                                         calls left:
                                                                    isHeightBalancedBinaryTree1(null) return {true,0};
                                                          calls right:
                                                                    isHeightBalancedBinaryTree1(null) return {true,0};
                                                    both left and right call complete
                                                    setIsBalanced variable as leftItem.isBalanced && rightItem.isBalanced &&
                                                   Math.abs(leftItem.height - rightItem.height) <= 1 ~== true
                                                   setHeight as Math.max(leftItem.height, rightItem.height) + 1 ~== (0,0)+1 = 1
                                        calls right:
                                                  same for 70 returned is {true,1} from left
                                                             returned is {true,1} from right
                            calls come back to 20.
                            till here we have {true,2}

                        returns call back to 10 till now we have {true,1} from right
                                                                  {true,2} from left
                        
                        now checks const isBalanced = leftItem.isBalanced && rightItem.isBalanced &&
                       Math.abs(leftItem.height - rightItem.height) <= 1 ~== true

                       so we get {true,3}.

            overall its true meaning its a complete binary tree.

     * 
     * 
     */
    isHeightBalancedBinaryTree1(root: TreeNode<T> | null) {
        if (root === null) return { isBalanced: true, height: 0 };
        const leftItem = this.isHeightBalancedBinaryTree1(root.left);
        const rightItem = this.isHeightBalancedBinaryTree1(root.right);
        const isBalanced = leftItem.isBalanced && rightItem.isBalanced &&
            Math.abs(leftItem.height - rightItem.height) <= 1;
        const height = Math.max(leftItem.height, rightItem.height) + 1;
        return { isBalanced, height };
    }

}

const root = new TreeNode(8);
root.left = new TreeNode(4);
root.right = new TreeNode(20);
root.right.left = new TreeNode(13);
root.right.right = new TreeNode(70);
console.log(root.isHeightBalancedBinaryTree(root));