/**Given a root of a BST and a value x we need to find the floor of the value x, i,e the smallest closest or equal value in BST.
 * 
 * 1. If the value is present in BST return node containing the value.
 * 2. If the value is not present give the closest smallest value to x.
 * 3. If there exist no value smaller than x return null
 * 
 * For ex:                      10
 *                      5                15
 *                                12           30
 *  x =14
 * 
 * So the o/p = 12 clearly 14 was not present so the closestSmallest value to 14 is 12.
 * 
 * For ex: BST = null, x = 4
 *    o/p null
 * 
 * For ex: 
 *                               10
 *                      5                15
 *                                12           30
 * x = 4
 * o/p null, since there is no smaller value than 4.
 * 
 * Ex:  
 * 
 *                              10
 *                      5                15
 *                                12           30
 * 
 * x = 100.
 * o/p 30 , since 30 is not present so the closest smallest value is 30.
 * 
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


    /**Approach1: 0(n),0(n)
     *
     * This approach uses the fact that the inOrder traversal of a BST will always be a sorted array.
     * 
     * Lets understand this approach with help of an example.
     *                           10
 *                      5                15
 *                                12           30
 * 
     * x = 14.
     * 
     * So the inorder traversal of the above BST will be like:
     * 
     * 5,10,12,15,30
     * 
     * Now simply iterate over the inOrder traversal array and find the value which is just smaller than the input value.
     * 
     * Iterate over the array.
     * i=0; arr[i]<14 move ahead
     * i=1; arr[i]<14 move ahead
     * i=2; arr[i]<14 move ahead
     * i=3; arr[i]>14 so arr[i-1] is the answer.
     * 
     * We need to take account on the condition that
     * 1. if arr[i] === x than arr[i] will only be the closest smallest value
     * 
     * 2. If root provided of BST is null then result is null as nothing exists in BST.
     * 
     * 3. If last element of the array is smaller than the value whose smallest closest is to be found, then last element of the
     * array is simply the result.
     * 
     * For ex: [5,10,12,15,30]
     * x = 100
     * 
     * clearly the smallest closest value to 100 is 30 as the last element of the inorder is even smaller than the input value.
     * 
     * 4.If arr[0] > x
     * this means there exits no value in BST which is smaller than the given value and thus return null.
     *
     */
    private getInorder(root: BST<T> | null, inOrder: BST<T>[]) {
        if (root === null) return inOrder;
        this.getInorder(root.left, inOrder);
        inOrder.push(root);
        this.getInorder(root.right, inOrder);
        return inOrder;
    }

    closestSmallestValue(root: BST<T> | null, x: T): BST<T> | null {
        if (root === null) return null;
        let inOrder = this.getInorder(root, []);
        if (inOrder[inOrder.length - 1].val < x) {
            return inOrder[inOrder.length - 1];
        }
        if (inOrder[0].val > x) {
            return null
        }
        for (let i = 0; i < inOrder.length; i++) {
            if (inOrder[i].val === x) {
                return inOrder[i];
            } else if (inOrder[i].val > x) {
                return inOrder[--i];
            }
        }
        return null;
    }

    /**Approach2: 0(h),0(1) ~= 0(n),0(1) in case of skewed tree
     * 
     *  Lets understand this approach with the help of an example
     * 
     *                         10
 *                      5                15
 *                                12           30
 * 
     * x = 14.
     * 
     * 
     * This approach is based on simple traversal of a BST.
     * Initially we are at root 10,
     * 
     * 14 > 10 , so we should move right but since 10 < 14 thus 10 is a potential candidate to be the closest smallest value
     * to 14 and thus we update res with 10.
     * 
     * Now we at 15.
     * 14 < 15 so 15 is not a potential candidate to be closest smallest to 14 so we don't updated res and move left.
     * 
     * Now we are at 12, 
     * 14 > 12 and thus 12 is a potential candidate to be closest smaller to 14 and thus we update res and move right.
     *   
     * we found null
     * and thus our iteration ends.
     * 
     * So we got result 12 which is smallest closest possible value.
     * 
    */
    closestSmallestValue1(root: BST<T> | null, x: T) {
        if (root === null) return null;
        let current: BST<T> | null = root;
        let closestSmallest: BST<T> | null = null;
        while (current !== null) {
            if (current.val === x) {
                return current;
            } else if (x > current.val) {
                closestSmallest = current;
                current = current.right;
            } else {
                current = current.left;
            }
        }
        return closestSmallest;
    }
}

let root = new BST(10);
root.insert(root, 5);
root.insert(root, 15);
root.insert(root, 12);
root.insert(root, 30);
console.log(root.closestSmallestValue(root, 14))