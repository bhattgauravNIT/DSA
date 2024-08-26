/**Given the root of a BST and a value k, the task is to give kth smallest element in the array.
 * If no such value exist return -1. There exists no duplicates in the BST.
 * 
 * For ex: 
 *                                     10
 *                                 6           15
 *                             2     7     12       18
 * 
 * k = 3
 * 
 * O/p: 7
 * The 3rd smallest element in the BST is 6.
 * 
 * For ex: 
 *                                     10
 *                                 6           15
 *                             2     7     12       18
 * 
 * 
 * k = 5
 * o/p: 12
 * The 5th smallest element in the BST is 15.
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

    /**
     * Approach1: 0(n),0(n)
     * 
     */

    getInorder(root: BST<T> | null, inOrder: number[]): number[] {
        if (root === null) return inOrder;
        this.getInorder(root.left, inOrder);
        inOrder.push(Number(root.val));
        this.getInorder(root.right, inOrder);
        return inOrder;
    }

    kthSmallest(root: BST<T> | null, k: number): number | undefined {
        if (root === null) return;
        let inOrder = this.getInorder(root, []);
        return inOrder[k - 1];
    }


    /**Approach2: 0(h+k),0(h+k)   */
    kthSmallest1(root: BST<T> | null, k: number) {
        if (root === null) return;
        let obj = { cnt: 0, value: -1 };
        this.inorder(root, k, obj);
        return obj.value;

    }

    inorder(root: BST<T> | null, k: number, obj: { cnt: number, value: number }): { cnt: number, value: number } {
        if (root === null) return obj;
        obj = this.inorder(root.left, k, obj);
        obj.cnt++;
        if (obj.cnt === k) {
            obj.value = Number(root.val);
            return obj;
        }
        return this.inorder(root.right, k, obj);
    }
}

let root = new BST<number>(10);
root.insert(root, 5);
root.insert(root, 7);
root.insert(root, 15);
root.insert(root, 18);
console.log(root.kthSmallest1(root, 2))


/**Approach3: 
 * 
 * Augmented BST
 */

class AugmentedBst<T> {
    val: T;
    left: AugmentedBst<T> | null;
    right: AugmentedBst<T> | null;
    leftCount: number;

    constructor(val: T, left: AugmentedBst<T> | null = null, right: AugmentedBst<T> | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
        this.leftCount = 0;
    }

    insert(root: AugmentedBst<T> | null, x: T) {
        if (root === null) return new AugmentedBst<T>(x);
        let current: AugmentedBst<T> | null = root;
        let parent: AugmentedBst<T> | null = null;
        while (current !== null) {
            parent = current;
            if (x < current.val) {
                current.leftCount++;
                current = current.left;
            } else if (x > current.val) {
                current = current.right;
            } else {
                return root;
            }
        }
        if (parent && x < parent.val) {
            parent.left = new AugmentedBst<T>(x);
        } else if (parent && x > parent.val) {
            parent.right = new AugmentedBst<T>(x);
        }
        return root;
    }

    findKSmallest(root: AugmentedBst<T> | null, k: number) {
        if (root === null) return;
        let current: AugmentedBst<T> | null = root;
        while (current !== null) {
            if (current.leftCount + 1 === k) {
                return current.val;
            } else if (current.leftCount + 1 > k) {
                current = current.left;
            } else {
                k = k - (current.leftCount + 1);
                current = current.right;
            }
        }
    }
}

/**
 *                         10(2)
 *                    5(0)         15(0)
 *                       7(0)           18(0)
 *              
 * 
 */
let root1 = new AugmentedBst<number>(10);
root1.insert(root1, 5);
root1.insert(root1, 7);
root1.insert(root1, 15);
root1.insert(root1, 18);
root1.findKSmallest(root1, 5);


