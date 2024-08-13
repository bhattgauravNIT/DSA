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
 * Lets understand this with the help of an example.
 * 
 *                              10
 *                        |           |
 *                       20          30
 *                              |        |
 *                             40         50
 * 
 * 
 * 
 * 
 * -preOrderTraversal(10,[])
 *                  initially root is not null,
 *                  so pushes root.data to arr so arr = [10], calls left tree
 *                        - preOrderTraversal(20,[10])
 *                             calls left
 *                             root is not null, pushes to arr: arr = [10,20] and 
 *                                  - preOrderTraversal(null,[10,20])
 *                                        root is null return call goes back to parent i,e preOrderTraversal(20,[10,20])
 *                             calls right
 *                             preOrderTraversal(null,[20,10])
 *                                         root is null return call and goes back to parent
 *                           both left & right calls are complete so control goes back to preOrderTraversal(10,[10,20])
 *                  calls right 
 *                  preOrderTraversal(30,[10,20])
 *                         root is not null, pushes to arr: arr = [10,20,30] and calls left of 30.
 *                                preOrderTraversal(40,[10,20,30])
 *                                    root is not null, pushes to arr: arr = [10,20,30,40] and calls left of 40.
 *                                        preOrderTraversal(null,[10,20,30,40]);
 *                                             root is null so returns back to parent i,e 40.
 *                            calls right:
 *                            preOrderTraversal(null,[10,20,30,40])
 *                               root is null
 *                               control goes back to parent i,e 40
 *                          Both calls of 40 are complete so removed from stack and control goes back to parent 30.
 * 
 *                       30's left call is complete so call right now.
 *                                preOrderTraversal(50,[10,20,30,40]);
 *                                 root is not null so pushes to arr: arr[10,20,30,40,50]
 *                                        calls left of 50:
 *                                                 preOrderTraversal(null,[10,20,30,40,50]);
 *                                               root is null return to parent 50.
 *                                        calls right of 50:
 *                                                 preOrderTraversal(null,[10,20,30,40,50]);
 *                                                  root is null return to parent 50.
 *                      50's left and right call are complete so goes back to 30.
 *               30's left and right call are complete so goes back to 10.
 *             10's left and right call are complete so goes back and returns arr.
 *                                     
 * 
 *                             
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