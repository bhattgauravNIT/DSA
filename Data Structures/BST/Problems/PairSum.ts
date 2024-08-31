/**Given a BST and a sum, the task is to check wether there exists a pair in BST whose sum is equal to the
 * given sum.
 * 
 * For ex:                   
 *                                  10
 *                             8          20
 *                       4       9     11      30
 *                                           25
 * 
 * Sum = 33
 * o/p yes
 * there exists 25 and 8 whose sum is 33.
 * 
 * 
 * For ex:                             20
 *                              8            40
 *                                        35
 * 
 * Sum = 49
 * o/p no
  */

class BST<T> {
    val: T;
    left: BST<T> | null;
    right: BST<T> | null;

    constructor(val: T, left: BST<T> | null = null, right: BST<T> | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    insert(root: BST<T> | null, x: T) {
        if (root === null) return new BST<T>(x);
        if (x < root.val) {
            root.left = this.insert(root.left, x);

        } else if (x > root.val) {
            root.right = this.insert(root.right, x);
        }
        return root;
    }

    /**Approach: 0(n),0(n)
     * 
     * Lets understand this with the help of an example.
     * 
     *        
 *                                  10
 *                             8          20
 *                       4       9     11      30
 *                                           25
 * 
 *     Sum = 33
 * 
 *      This approach is that we will do a traversal of the tree, say inOrder , we can choose any traversal and this solution can be used to
 *      find 
     *  pair sum in any tree. Now we check if sum-node.val is present in the map already for the current node which we are processing, if yes
     *  we simply return true . However if not so we will insert this node's value in map.
     * 
     *  So lets say we pass a object in traversal function through parent function call as objects are passed by reference.
     *  obj = {isPairSum: false}
     * 
     *  Now we hit the inOrder traversal and we check 
     * if (!mp.has(sm - Number(root.val))) {
            mp.set(Number(root.val), 1);
        }
        
        else in case we found the map containing sm-Number.val we simply do obj.isPairSum as true and return obj.

        Clearly in worst case when there exists no pair in the tree whose sum is equal to k, we have to traverse through all the
        nodes of BST and thus 0(n) and we also need to store all elements in a map apart from that the recursion call stack takes 0(h) time
        so in total space complexity is 0(n)+0(h) ~= 0(n).
     */
    hasPairSum(root: BST<T> | null, sum: number): boolean {
        if (root === null) return false;
        let obj = { isPairSum: false };
        obj = this.inOrder(root, sum, obj);
        return obj.isPairSum;
    }

    inOrder(root: BST<T> | null, sm: number, obj: { isPairSum: boolean }, mp: Map<number, number> = new Map()) {
        if (root === null) return obj
        let leftObj = this.inOrder(root.left, sm, obj, mp);
        if (!mp.has(sm - Number(root.val))) {
            mp.set(Number(root.val), 1);
        } else {
            leftObj.isPairSum = true;
            return obj;
        }
        return this.inOrder(root.right, sm, leftObj, mp);
    }
}

let root = new BST(10);
root.left = new BST(8);
root.right = new BST(20);

root.left.left = new BST(4);
root.left.right = new BST(9);

root.right.left = new BST(11);
root.right.right = new BST(30);

root.right.right.left = new BST(25);
console.log(root.hasPairSum(root, 33));

