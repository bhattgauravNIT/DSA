/**Given a binary tree and two nodes of it , the task is to find the lowest common level ancestor for these two
 * nodes.
 * 
 * For ex:                            10
 *                          20                   30
 *                                        40           50
 *                                   60            70      80
 * 
 * i/p: n1 = 60, n2 = 70
 * o/p: 30
 * 
 * all possible ancestors of 60 = [10,30,40,60]
 * all possible ancestors of 70 = [10,30,50,70]
 * 
 * clearly 30 and 10 are the common ancestors however 30 comes in lower level as compared to 10, thus o/p is 30.
 * 
 * 
 * For ex:                       10
 *                      |                   |
 *                     50                   60
 *                   |      |
 *                  70      20
 *                |        |   |
 *               40      90    80
 *                      |
 *                      30
 * 
 * i/p: n1 = 30,n2 = 80
 * o/p 20
 * 
 * all possible ancestors of 30 = [10,50,20,90,30]
 * all possible ancestors of 80 = [10,50,20,80]
 * 
 * clearly the lowest level common ancestor is 20.
 * 
 */

class TreeNode<T> {
    data: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    path1: TreeNode<T>[];
    path2: TreeNode<T>[];

    constructor(data: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.path1 = [];
        this.path2 = [];
    }

    getPath(root: TreeNode<T> | null, targetNode: TreeNode<T> | null, pathArr: TreeNode<T>[]): boolean {
        if (root === null || targetNode === null) return false;
        if (root.data === targetNode.data) return true;
        pathArr.push(root);
        const isOnLeft = this.getPath(root.left, targetNode, pathArr);
        const isOnRight = this.getPath(root.right, targetNode, pathArr);
        if (isOnLeft || isOnRight) {
            return true;
        } else {
            pathArr.pop();
            return false;
        }
    }
    /**Approach1: 0(n),0(n)
     * 
     *  For ex:                  10
 *                      |                   |
 *                     50                   60
 *                   |      |
 *                  70      20
 *                |        |   |
 *               40      90    80
 *                      |
 *                      30
 * 
 * n1 = 30,n2 = 80
 * 
 *   In this approach we will be creating two path Arrays one for the targetNode1 and other for the targetNode2.
 *   So lets for now suppose we somehow make pathArray for targetNode 30.
 * 
 *    pathArray1 = [10,50,20,90,30] it will somewhat look like this.
 * 
 *    similarly say we somehow create path array for targetNode 2 which is
 *    pathArray2 = [10,50,20,80]
 * 
 *    Now the index after which the nodes are not same in pathArray1 and pathArray2 is the lowest common ancestor
 *    for the targetNodes.
 *    i,e
 *      
 *     [10,50,20,90,30]
 *     [10,50,20,80]
 *     
 *     Clearly both starts differing from node 20 so node 20 is the result.
 * 
 *    Lets talk about how we can find pathArr for targetNodes.
 * 
 *    So initially if the root is null or the targetNode is null return false meaning that node is not present in the given
 *    binary tree.
 * 
 *    Now if the value of the root is equal to that of targetNode's value return true stating that yes we found the targetNode.
 *    simply push the root node into an array.
 * 
 *    i,e till now
 *    if (root === null || targetNode === null) return false;
      if (root.data === targetNode.data) return true;
      pathArr.push(root);

      now check for the left subTree and the right subTree if any of them is throwing true it means yes the targetNode is
      found.
      else
      simply pop from the root and return false.

      Lets understand this with hep of an example:

                                10
 *                      |                   |
 *                     50                   60
 *                   |      |
 *                  70      20
 *                |        |   |
 *               40      90    80
 *                      |
 *                      30
 * 
 *  Say we need to create pathArray for node 30.
 * 
 *  Now root is not null or the targetNode is not null so we proceed.
 *  we check if targetNode.data is equal to root.data which is also not there so we proceed.
 *  push(root) to pathArr
 * 
 *  getPath(root.left) called
 *  getPath(50)
 *             - again checks for all condition and pushed 50 to path, so path till here is [10,50]
 *               calls left again
 *               getPath(70)
 *                      - again checks for all condition and pushed 70 to path, so path till here is [10,50,70]
 *                        calls left again
 *                        getPath(40)
 *                                  -- again checks for all condition and pushed 70 to path, so path till here is [10,50,70,40]
 *                                     calls left again
 *                                     getPath(null) returns false
 *                                     call goes back to parent i,e getPath(40).
 *                                     
 *                                     left call returned false
 *                                     calls right
 *                                     getPath(null) returns false
 *                                     call goes back to parent i,e getPath(40).
 *                           both left and right call returned false so pop from path now path is [10,50,70]
 *                   Similar things happen for getPath 70 and getPath 50.
 * 
 *     In the same way the path gets prepared and becomes [10,50,20,90]
 * 
 * 
 * 
 * */
    lowestLevelCommonAncestor(root: TreeNode<T> | null, targetNode1: TreeNode<T> | null, targetNode2: TreeNode<T> | null) {
        if (root === null || targetNode1 === null || targetNode2 === null) return null;
        if (!this.getPath(root, targetNode1, this.path1) || !this.getPath(root, targetNode2, this.path2)) {
            return null;
        }
        let i = 0, j = 0, cnt = 0;
        while (i < this.path1.length && j < this.path2.length) {
            if (this.path1[i].data === this.path2[j].data) {
                i++;
                j++;
            } else {
                cnt++;
                break;
            }
        }
        return this.path1[i-1].data

    }
}

/**
 * For ex:                       10
 *                      |                   |
 *                     50                   60
 *                   |      |
 *                  70      20
 *                |        |   |
 *               40      90    80
 *                      |
 *                      30
 * 
 * i/p: n1 = 30,n2 = 80
 * o/p 20
 */
let root = new TreeNode(10);
root.left = new TreeNode(50);
root.right = new TreeNode(60);

root.left.left = new TreeNode(70);
root.left.right = new TreeNode(20);

root.left.left.left = new TreeNode(40);

root.left.right.left = new TreeNode(90);
root.left.right.right = new TreeNode(80);

root.left.right.left.left = new TreeNode(30);

console.log(root.lowestLevelCommonAncestor(root, root.left.right.left.left, root.left.right.right));