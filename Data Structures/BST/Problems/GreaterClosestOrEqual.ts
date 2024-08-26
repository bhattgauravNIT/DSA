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

    private getInorder(root: BST<T> | null, inOrder: BST<T>[]) {
        if (root === null) return inOrder;
        this.getInorder(root.left, inOrder);
        inOrder.push(root);
        this.getInorder(root.right, inOrder);
        return inOrder;
    }

    /**Approach1: 0(n),0(n)
     *
     * [5,6,7,8,19,20]
     * 
     */
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
     *                                10
     *                      5                   15
     *                                   12           30
     * 
     * x = 14
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