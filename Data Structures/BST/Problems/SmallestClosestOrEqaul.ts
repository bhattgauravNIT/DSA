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

    private getInorder(root: BST<T> | null, inOrder: BST<T>[]) {
        if (root === null) return inOrder;
        this.getInorder(root.left, inOrder);
        inOrder.push(root);
        this.getInorder(root.right, inOrder);
        return inOrder;
    }

    /**Approach1: 0(n),0(n)
     *
     * 
     * [5,6,7,8,9,10]
     */
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

    /**Approach2: 0(n),0(1) ~= 0(n),0(1) in case of skewed tree
     * 
     *                                10
     *                      5                   15
     *                                   12           30
     * 
     * x = 4
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