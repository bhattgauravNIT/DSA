/**Given the inOrder and preOrder traversal of a binary tree, the task is to contruct the entire binary tree.
 * 
 * For ex: InOrder = [20,10,30];
 *         PreOrder = [10,20,30];
 * 
 * O/p                       10
 *                       20     30
 * 
 * For ex: Inorder = [40,20,50,10,30,80,70,90];
 *         PreOrder = [10,20,40,50,30,70,80,90];
 * 
 * 
 * O/p                 10
 *               20         30
 *         40        50        70
 *                         80      90
 * 
 * For ex: Inorder = [20,10,40,30,50];
 *         PreOrder = [10,20,30,40,50];
 * 
 * O/p                         10
 *                     20            30
 *                                40     50
 * 
 * 
 */

class TreeNode {
    data: number;
    left: TreeNode | null;
    right: TreeNode | null;
    preIndex: number;
    constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.preIndex = 0;
    }

    /**Approach: 0(n^2)
     * 
     * For every ith index in the preOrder array we have to look for that ith value in inOrder travesal.
     * 
     * How ever we can simplify this approach to 0(n) if we can somehow find a better way to look for
     * every ith index of preOrder inside the preOrder and thus can be done using hashing.
     * 
     * Since we need to find in inorder there fore we can create a key value pair where key is the
     * elements of the inoderTraversal and value is simply their indexes.
     * 
     * And we can simply get the indexes of the inoderTraversal keys using thisn look up table.
     *      
    * Lets take an example to understand
    * 
    * For ex: Inorder = [20,10,40,30,50];
    *         PreOrder = [10,20,30,40,50];
    * 
    * O/p                         10
    *                     20            30
    *                                40     50
    * 
    * 
    * The preorder travesal in in fashion root->left->right, 
    * so i=0, in preoder is the root of binary tree.
    * Now lets find this in inoder Travesal so 10 is at index 1 in inoder traversal.
    * Since Inoder traversal follows the fashion left-> root -> right so if we found the root than anything left of this root
    * is the left subTree and everything right of it is the right subTree.
    * 
    * So the tree will look like:
    * 
    *                                10
    *                    20                   40,30,50
    * 
    * Now i=1 in preoder is the next root. Lets find it in inoder traversal, so its at index 0 in inoder array.
    * Everything to left of it will be the left subTree and everything to the right of it  till root is the right subTree.
    * 
    * So there is nothing left of it and nothing right of it till root thus its a leaf node.
    * 
    * The tree looks like
    * 
    *                                    10
    *                            |           |
    *                         20           40,30,50
    * 
    * Lets move to i=2 in PreorderTravesal i,e 30.Lets find the index of 30 in InoderderTraversal.
    * 30 is at index 3.
    * 
    * Everything from root till 30 is the left part and everything right to 30 is the right part of tree.So we can see in inoder 
    * traversal that 40 is the left of 30 and 50 is right of 30. So tree looks like
    * 
    *                                  10
    *                            |           |
    *                         20            30
    *                                    |       |
    *                                   40       50
    * 
    * Now we move to i=3 in preoder travesal i,e 40. We find 40 in Inoder travesal so 40 is at index 2.
    * There is nothing left of 40 (i,e from root 10-> 40 in inoder travesal) and nothing right of 40 i,e (40->30 in order travesal).
    * 
    * Similar for i=4 ie, 50 hence by this algo we can formulate the tree.
    * 
    * 
   */
    constructTree(inOrder: number[], preOrder: number[], inorderStart: number, inOrderEnd: number) {
        if (inorderStart > inOrderEnd) return null;
        let root = new TreeNode(preOrder[this.preIndex++]);
        let index: number = 0;
        for (let i = inorderStart; i <= inOrderEnd; i++) {
            if (inOrder[i] === root.data) {
                index = i;
                break;
            }
        }
        root.left = this.constructTree(inOrder, preOrder, inorderStart, index - 1);
        root.right = this.constructTree(inOrder, preOrder, index + 1, inOrderEnd);
        return root;
    }
}

let root = new TreeNode(0);
root.constructTree([20, 10, 40, 30, 50], [10, 20, 30, 40, 50], 0, 4)