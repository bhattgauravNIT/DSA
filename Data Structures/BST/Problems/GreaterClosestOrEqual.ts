/**Given a BST root and a value say x, the task is to find a value which is GreaterClosest to the given value x.
 * If no such value exists return null.
 * 
 * For ex; 
 *                                10
 *                      5                15
 *                                12           30
 *  x =14
 * o/p = 15 , the closest value to 14 which is greater than it is 15.
 * 
 * For ex:
 *                                10
 *                      5                15
 *                                12           30
 * 
 * x = 3
 * o/p= 5
 * 
 * For ex: 
 *                                10
 *                      5                15
 *                                12           30
 * 
 * x = 40 
 * o/p null as there exists no closest value to 40 which is greater than it.
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
     * Now simply iterate over the inOrder traversal array and find the value which is greater than the input value.
     * 
     * Iterate over the array.
     * i=0; arr[i]<14 move ahead
     * i=1; arr[i]<14 move ahead
     * i=2; arr[i]<14 move ahead
     * i=3; arr[i]>14 so arr[1] is the answer.
     * 
     * We need to take account on the condition that
     * 1. if arr[i] === x than arr[i] will only be the closest greatest value
     * 
     * 2. If root provided of BST is null then result is null as nothing exists in BST.
     * 
     * 3. If last element of the array is smaller than the value whose smallest greater is to be found, then no closest greater value exists.
     * 
     * For ex: [5,10,12,15,30]
     * x = 100
     * 
     * clearly the last element is 30 which itself is smaller than 100 thus no closest Greater element exists.
     * 
     * 4. If arr[0] > x
     * this means that the first element of the arr is itself the greater closest element in array.
     * 
     * Else find the value which is just greater than the given input value in array.
     * 
     *
     */
    private getInorder(root: BST<T> | null, inOrder: BST<T>[]) {
        if (root === null) return inOrder;
        this.getInorder(root.left, inOrder);
        inOrder.push(root);
        this.getInorder(root.right, inOrder);
        return inOrder;
    }

    closestGreatestValue(root: BST<T> | null, x: T): BST<T> | null {
        if (root === null) return null;
        let inOrder = this.getInorder(root, []);
        if (inOrder[inOrder.length - 1].val < x) {
            return null;
        }
        if (inOrder[0].val > x) {
            return inOrder[0];
        }
        for (let i = 0; i < inOrder.length; i++) {
            if (inOrder[i].val === x || inOrder[i].val > x ) {
                return inOrder[i];
            }
        }
        return null;
    }

    /**Approach2: 0(n),0(1) ~= 0(n),0(1) in case of skewed tree
     * 
     *  
     *  Lets understand this approach with the help of an example
     * 
     *                          10
 *                      5                15
 *                                12           30
 * 
     * x = 14.
     * 
     * 
     * This approach is based on simple traversal of a BST.
     * Initially we are at root 10,
     * 
     * 14 > 10 , so we should move right but since 10 < 14 , thus its not a potential candidate to be the closest greatest
     * element, so we simply move right.
     * 
     * Now we at 15.
     * 14 < 15 so 15 is a potential candidate to be closest greatest to 14 so we updated res and move left.
     * 
     * Now we are at 12, 
     * 14 > 12 and thus 12 is not a potential candidate to be closest greatest to 14 and thus we don't update res and move right.
     *   
     * we found null
     * and thus our iteration ends.
     * 
     * So we got result 15 which is smallest greatest possible value.
     * 
    */
    closestGreatestValue1(root: BST<T> | null, x: T) {
        if (root === null) return null;
        let current: BST<T> | null = root;
        let closestGreatest: BST<T> | null = null;
        while (current !== null) {
            if (current.val === x) {
                return current;
            } else if (x > current.val) {
                current = current.right;
            } else {
                closestGreatest = current;
                current = current.left;
            }
        }
        return closestGreatest;
    }
}

let root = new BST(10);
root.insert(root, 5);
root.insert(root, 15);
root.insert(root, 12);
root.insert(root, 30);
console.log(root.closestGreatestValue(root, 14))