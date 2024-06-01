/**Given a binary tree and a k value, the task is to print nodes which are at k distance from the
 * root of the binary tree.
 * 
 * For ex:            10
 *                  |      |
 *               20        30
 *           |      |    |
 *         40      50    70
 * 
 * K = 2
 * 
 * O/p is 40,50,70.
 * 
 * For ex:                10
 *                     |
 *                  20
 *                |
 *              30
 * k=1
 * 
 * o/p us 20
 * 
 */

/**Approach: 0(n),0(h)
 * 
 * Lets understand this recursion:
 * 
 * Ex:                 10
 *                  |        |
 *               20         30
 *            |      |    |
 *          40      50    70
 * 
 * So k = 2.
 * 
 * 
 *    kthNodesFromRoot(10) with root node is not null , level = 0, k=2 so goes left subTree.
 *                               kthNodesFromRoot(20), k=2, level=1 (condition unsatified- k===level) goes left again
 *                                               kthNodesFromRoot(40), k=2, level=2
 *                                                            condition satifies prints 40 and retuns dont go left of 40.
 *                                control gets back to kthNodesFromRoot(20)
 *                                k=2, level=1 at this call.
 *                                Left call is alraeady completed goes right
 *                                               kthNodesFromRoot(50), k=2, level=2
 *                                                            condition satifies prints 50 and retuns dont go left of 50.
 *                        Left call for kthNodesFromRoot(10) is complete k=2, level=0 goes right
 *                                kthNodesFromRoot(30), k=2,level=1 (condition unsatified- k===level) goes left again
 *                                                 kthNodesFromRoot(70) k=2, level=2
 *                                                         condition satifies prints 70 and retuns dont go left of 70.
 *                                    call complete for left side of 30 so calls right it is null returns
 *                  Both call for left and right completed for kthNodesFromRoot(10) .
 * 
 * This function could also be written as 
 * 
 * kthNodesFromRoot(root: TreeNode<T> | null, k: number): void {
        if (root === null) return;
        if (k===0) {
            console.log(root.data);
        }else{
            this.kthNodesFromRoot(root.left, k-1);
            this.kthNodesFromRoot(root.right, k-1);
        }
        
    }

    In this way we avoid having level varibale.
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

    kthNodesFromRoot(root: TreeNode<T> | null, k: number, level: number): void {
        if (root === null) return;
        if (level === k) {
            console.log(root.data);
            return;
        };
        this.kthNodesFromRoot(root.left, k, level + 1);
        this.kthNodesFromRoot(root.right, k, level + 1);
    }
}

let root = new TreeNode<number>(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);
root.left.left = new TreeNode(40);
root.left.right = new TreeNode(50);
root.right.left = new TreeNode(70);
root.kthNodesFromRoot(root, 2, 0);
