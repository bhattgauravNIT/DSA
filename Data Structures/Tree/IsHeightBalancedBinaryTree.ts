/**Given a binary tree the task is to tell wether the given binary tree is a balanced binary tree or not.
 * A tree is a balanced binary tree if the absoulte difference of the left subTree height - right subTree height
 * is less than or equal to 1 for every node.
 * 
 * For ex:                     18
 *                        |         |
 *                        4         20
 *                              |       |
 *                             13      70
 * 
 * For root 18: |leftHeight-rightheight| = |1-2| = 1 <= 1
 * For 4:   |0-0| = 0 <=1
 * For 20:  |1-1| = 0
 * For 13: |0-0| = 0
 * for 70: |0-0| = 0.
 * 
 * Clearly for all nodes the absoulte of |left height - right height| is less than equal to 1 .so O/p is true.
 * 
 * 
 * Ex:             3
 *               |
 *              4
 *             |
 *            5
 * 
 * For root 3: |leftHeight-righTheight| = |2-0| = 2 >=1 thus false.
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


    /**Approach2: 0(n),0(h)
     * 
     * The idea is simple we will calculate height at every node if ABS(lh-rh) if its greater  than 1 return -1 else
     * simply return the height of the tree.
     * 
     * So every node is telling the info if its throwing -1 meaning its left and right height is not balanced and we simply return -1
     * from that function call.
     * 
     * If for the tree the val is coming as -1 meaning its not height balanced.
     * 
     * Lets understand this recursion.
     * 
     * For ex:                                8
     *                            |                       |
     *                            12                      15
     *                   |              |                     |
     *                  13             14                     16
     *                                                           |
     *                                                           17
     * 
     * 
     * Now isHeightBalancedBinaryTree1(8), calls left
     *                         isHeightBalancedBinaryTree1(12), calls left
     *                                    isHeightBalancedBinaryTree1(13) calls left
     *                                                  isHeightBalancedBinaryTree1(null) return 0;
     *                                             left call is complete calls right
     *                                                   isHeightBalancedBinaryTree1(null) return 0;
     *                                            Both calls completed returns Math.max(0,0)+1 = 1
     *                               Left calls completed calls right
     *                                      Similary right calls returns 1.
     *                 Left call is complete and is returned with Max(1,1)+1 = 2.
     *               Calls right now.
     *                      isHeightBalancedBinaryTree1(15) calls left
     *                                                isHeightBalancedBinaryTree1(null) returns 0;
     *                                   Left call is complete calls right
     *                                                 isHeightBalancedBinaryTree1(16) calls left
     *                                                                      isHeightBalancedBinaryTree1(null) return 0;
     *                                                         calls right
     *                                                                     isHeightBalancedBinaryTree1(17) overall returns 1.
     *                                                  Overall isHeightBalancedBinaryTree1(16) is complete and returns 2.
     *                            Left calls is giving 0 ad right is giving 2 so returns -1.
     *           Left call giving 2 and right call giving -1 returns -1 immediutaely.
     * 
     * Clearly the function returns -1 and thus its not height balanced binary tree.
     *                        
     * 
     * 
     */
    isHeightBalancedBinaryTree1(root: TreeNode<T> | null): number {
        if (root === null) return 0;
        let lh: number = this.isHeightBalancedBinaryTree1(root.left);
        if (lh === -1) return -1;
        let rh: number = this.isHeightBalancedBinaryTree1(root.right);
        if (rh === -1) return -1;
        if (Math.abs(lh - rh) <= 1) {
            return Math.max(lh, rh) + 1;
        } else {
            return -1;
        }
    }
}

const node13 = new TreeNode(13);
const node70 = new TreeNode(70);
const node4 = new TreeNode(4);
const node20 = new TreeNode(20, node13, node70);
const root = new TreeNode(18, node4, node20);