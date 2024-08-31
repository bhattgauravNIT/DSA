/**Given a tree, state wether the given tree is a BST or not.
 * 
 * For ex:                               10
 *                                8            20
 *                                          13    24
 * 
 * O/p: true, every subTree of left has values smaller than root and every subTree on right has greater values 
 * and this applies to all the roots.
 * 
 * 
 * For ex:                         20
 *                           8          30
 *                                  18       35
 * 
 * O/p: false, every subTree of left has values smaller than root however every subTree on right does not has greater values 
 *    18 is present on right subTree of 20 and has value smaller than it.
 * 
 * 
 * For ex: null
 * O/p: true
 * 
 * 
 * For ex:      10
 *          12       30
 * 
 * O/p: false
 * 
 */

class Tree<T> {
    val: T;
    left: Tree<T> | null;
    right: Tree<T> | null;

    constructor(val: T, left: Tree<T> | null = null, right: Tree<T> | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    /**Approach1: 0(n),0(n)
     * 
     * This approach is simply based on fact that inOrder traversal of a BST always give sorted traversal.
     * So simply do a inOrder traversal and get it in a array.
     * 
     * Check if the array is sorted.If at any point of time we found a discrepancy than it resembles that the tree is not a BST.
     */
    getInorder(root: Tree<T> | null, inOrder: T[]): T[] {
        if (root === null) return inOrder;
        this.getInorder(root.left, inOrder);
        inOrder.push(root.val);
        this.getInorder(root.right, inOrder);
        return inOrder;
    }

    isBst(root: Tree<T> | null): boolean {
        if (root === null || (root.left === null && root.right === null)) return true;
        let inOrder = this.getInorder(root, []);
        for (let i = 1; i < inOrder.length; i++) {
            if (inOrder[i - 1] > inOrder[i]) {
                return false;
            }
        }
        return true;
    }

    /**Approach2: 0(n),0(h)
     * 
     * Lets understand this approach with help of an example:
     * 
     * 
     * For ex:                         20
     *                           8          30
     *                                  18       35
     * 
     * Since its a BST thus every subTree of left should be smaller than root and every subTree on right should be greater than it.
     * 
     * So lets say the root's value is between -Infinity to +Infinity
     * 
     *                                                  -Infinity          20                +Infinity
     * 
     * Now leftSubTree node of 20 i,e 8 should be less than root i,e 20 which means it should be between -Infinity and 20, in the same way 
     * for right subTree node 30 should be greater than 30 and thus it should be between 20 and +Infinity.
     * 
     * In the same way we can formulate range for every node and if in case we found any node violating this range than its not a BST.
     * 
     *                                                  20     ->>>>>   (-Infinity to +Infinity)
     *                (-infinity to 20)           8          30      ------------------------>       (20 to +infinity)
     *                 (20 to 30)                        18       35                    ----------> (20 to 30)
     * 
     * Clearly node with value 18 has to be in range 20 to 30 but however it is violating this and thus this tree is not a BST.
     * 
     * 
     * So initially we will mark lowerLimit as Number.MIN_SAFE_INTEGER and upperLimit as Number.MAX_SAFE_INTEGER
     * Now we will check if the root.val lies in the range i,e
     * 
     * if its greater than lowerLimit and lesser than upperLimit.
     * If not than simply we return false.
     * 
     * Now we recursively call for leftSubTree and the lowerLimit remains same however now the upperLimit should be modified to root.val, because the leftShould should 
     * be smaller than the root value.
     * 
     * We recursively call for rightSubTree and the lowerLimit now is updated to root.val however upper limit remains same as the right should be greater than 
     * the root value. 
     * 
     */
    isBst1(root: Tree<T> | null, lower: number = Number.MIN_SAFE_INTEGER, upper: number = Number.MAX_SAFE_INTEGER): boolean {
        if (root === null) return true;
        if (!(Number(root.val) < upper && Number(root.val) > lower)) {
            return false;
        }
        let isLeftBst = this.isBst1(root.left, lower, Number(root.val));
        let isRightBst = this.isBst1(root.right, Number(root.val), upper);
        return isLeftBst && isRightBst;
    }
}

let root = new Tree<number>(10);
root.left = new Tree(8);
root.right = new Tree(20);
root.right.left = new Tree(13);
root.right.right = new Tree(24);
console.log(root.isBst1(root));


let root1 = new Tree<number>(20);
root1.left = new Tree(8);
root1.right = new Tree(30);
root1.right.left = new Tree(18);
root1.right.right = new Tree(35);
console.log(root1.isBst1(root1));

let root2 = new Tree(null);
console.log(root2.isBst1(root2));

let root3 = new Tree<number>(10);
root3.left = new Tree(12);
root3.right = new Tree(30);
console.log(root3.isBst1(root3));
