/**Given a binary tree the task is to get the diameter of the tree.
 * 
 * For ex:                 10
 *                  20           30
 *                          40         50
 *                      60
 * 
 * o/p: 5
 * 
 * diameter can be considered as the longest path between two leaf nodes.
 * Possible paths between two leaf nodes are:
 * 
 * 20->10->30->40->60 : length = 5
 * 60->40->30->50 : length = 4
 * 
 * Clearly path of length 5 is greater thus diameter is 5.
 * 
 * 
 * For ex: null o/p = 0
 */

class TreeNode<T> {
    data: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    mp: Map<TreeNode<T> | null, number> = new Map();
    diameter: number;

    constructor(data: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.diameter = 0;
    }

    getHeightOfTree(root: TreeNode<T> | null) {
        if (root === null) return 0;
        let lh = this.getHeightOfTree(root.left);
        let rh = this.getHeightOfTree(root.right);
        return Math.max(lh, rh) + 1;
    }

    storeHeightOfTree(root: TreeNode<T> | null) {
        if (root === null) return 0;
        const lh: number = this.storeHeightOfTree(root.left);
        const rh: number = this.storeHeightOfTree(root.right);
        const height = Math.max(lh, rh) + 1;
        this.mp.set(root, height);
        return height;
    }

    /**Approach: 0(n*n), 0(n)
     * 
     * Lets understand this with the help of an example.
     * 
     * For ex:              10
 *                  20           30
 *                          40         50
 *                      60
 * 
 *   
 *  first we compute diameter of the root node.
 *  So diameter for any root is nothing but the height of left sub tree + height of right subTree + 1.
 *  (+ 1) is done to count the node itself from where we are computing the diameter.
 * 
 *  So the idea is to find diameter for every node, and for that we recursively call the left subTree and the right subTree and find their diameter.
 *  Take max of the diameter coming from the left subTree , from the right subTree and of the node itself.
 *  That max value is the answer.
 * 
 *   So diameterOfBinaryTree(10) -> its diameter comes out to be 1 + heightOfLeftSubTree + height of right SubTree
 *   i,e    diameterOfBinaryTree(10) = dRoot =  1 + 1 + 3 = 5.
 *    
 *   Now find diameter of its left subTree which is dLeft;
 *             diameterOfBinaryTree(20)  = its diameter comes out to be 1 + heightOfLeftSubTree + height of right SubTree
 *             diameterOfBinaryTree(20)  = 1 + 0+0 = 1
 *                   now find dLeft for 20, left is null thus return 0.
 *                   noq find dRight for 20, right is null thus return 0.
 *             
 *             So diameter overall is Max(diameterOfBinaryTree(20) + diameterOfItsLeft+ diameterOfItsRight);
 *                return Max(1,0,0) = 1.
 *             So dLeft for parent i,e diameterOfBinaryTree(10) = 1 & itsOwnDiameter i,e dRoot = 5. Now we need to compute dRight of it.
 * 
 *             So calls diameterOfBinaryTree(30).
 *             Now diameterOfBinaryTree(30) = Max(dRoot,dLeft,dRight);
 *             dRoot = 1+ 2+1 = 5.
 *             dRight i,e calls diameterOfBinaryTree(50)
 * 
 *             Now diameter of diameterOfBinaryTree(50) = Max(dRoot,dLeft,dRight);
 *             dRoot = 1+0+0 = 1
 *             dLeft = 0;
 *             dRight = 0;
 *             return Max(1,0,0) = 1;
 * 
 *             so dRight for diameterOfBinaryTree(30) = 1, now we have dRoot and dRight from 30 but we need dLeft 
 *             calls diameterOfBinaryTree(40)
 *             diameterOfBinaryTree(40) = Max(dRoot,dLeft,dRight);
 *             dRoot = 1+1+0 = 2.
 *             Now we need dRight i,e dRight(null) = 0.
 *             so dRight for 40 is 0.
 * 
 *             Now we need dLeft for 40 so calls 
 *             diameterOfBinaryTree(60) = Max(dRoot,dLeft,dRight);
 *             dRoot = 1+0+0 = 1.
 *             dLeft = calls left of 60 which is null returns 0.
 *             In same way dRight of 60 which is null returns 0.
 *             So overall for node(60) returns Max(1,0,0) = 1
 * 
 *             Now d(40) has dLeft for 40 which is 1, dRight for 40 which is 0, dLeft of 40 which is 1
 *             d(40) returns Max(1,0,1) = 1 to d(30).
 * 
 *             Now d(30) has dRoot = 5 , dLeft = 1 and dRight as 1
 *             so d(30) returns Max(5,1,1) = 5 to its parent i,e d(10).
 * 
 *             Now for d(10), dRoot = 5,dLeft = 1, dRight = 5.
 *             returns Max(5,1,5) = 5
 *             Thus 5 is the answer.
 * 
     * 
     */
    diameterOfBinaryTree(root: TreeNode<T> | null): number {
        if (root === null) return 0;
        let dRoot = 1 + this.getHeightOfTree(root.left) + this.getHeightOfTree(root.right);
        let dLeft = this.diameterOfBinaryTree(root.left);
        let dRight = this.diameterOfBinaryTree(root.right);
        return Math.max(dRoot, dLeft, dRight);
    }

    /**Approach2: 0(n),0(n) 
     * 
     * The idea is to use precomputed height values for all nodes.
     * In order to setPreComputed values we use a hashMap of key as TreeNode and value as height.
     * 
     * So function 
     * storeHeightOfTree(root: TreeNode<T> | null) {
        if (root === null) return 0;
        const lh: number = this.storeHeightOfTree(root.left);
        const rh: number = this.storeHeightOfTree(root.right);
        const height = Math.max(lh, rh) + 1;
        this.mp.set(root, height);
        return height;
    }
     * 
      Its same as that of function which computes the height of a binary tree however this time it stores as well in a map.

      Now in the diameter of Binary tree in order to calculate dRoot we need 1+ leftHeight + rightHeight
      this we can simply get in 0(1) from the already stored value in map.

     * 
    */
    diameterOfBinaryTree1(root: TreeNode<T> | null): number {
        if (root === null) return 0;
        const leftHeight = this.mp.get(root.left) ?? 0;
        const rightHeight = this.mp.get(root.right) ?? 0;
        let dRoot = 1 + leftHeight + rightHeight;
        let dLeft = this.diameterOfBinaryTree(root.left);
        let dRight = this.diameterOfBinaryTree(root.right);
        return Math.max(dRoot, dLeft, dRight);
    }

    /**Approach3: 0(n),0(1)
     * 
     * The solution is based upon a modification in the heightFunction logic itself.
     * so diameter for any root was 
     *  Max(dRoot, dLeft, dRight)
     * 
     *  where dRoot  = 1+ LeftHeight + RightHeight 
     * 
     * We compute height for anyRoot as 1+ Max(leftHeight,rightHeight);
     * 
     * So if we compute the leftHeight and rightHeight and add 1 to it it gives us the diameter associated with
     * that node.
     * 
     * Lets store this diameter in a global variable and for every node we can get Diameter associated with it.
     * We need max diameter.
     * 
     * thus simply
     * 
     *  if(root === null) return 0 meaning it does have a height.
     *  getLeftHeight for any Node via recursively calling getHeight(root.left)
     *  getRightHeight for any Node via recursively calling getHeight(root.right)
     *  diameter = 1+ leftHeight+ rightHeight
     *  always store max value of currentDiameter obtained and existing diameter 
     *  return 1+ Max(lh,rh) which is simply for right on node.
     * 
     */
    diameterOfBinaryTree2(root: TreeNode<T> | null): number {
        if (root === null) return 0;
        let lh = this.diameterOfBinaryTree2(root.left);
        let rh = this.diameterOfBinaryTree2(root.right);
        this.diameter = Math.max(this.diameter, 1 + lh + rh);
        return Math.max(lh, rh) + 1;
    }
}

let root = new TreeNode(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);
root.right.left = new TreeNode(40);
root.right.right = new TreeNode(50);
root.right.left.right = new TreeNode(60);
root.storeHeightOfTree(root);
console.log(root.diameterOfBinaryTree1(root));