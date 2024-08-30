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
     * This approach is simply based on the idea that inOrder traversal of an BST is a sorted array.
     * So once we get inorder traversal of BST the problem reduced to finding kth smallest element in an sorted array.
     * If we assume that BST is not containing any duplicates than inorder[k-1] is the kth smallest element in the array 
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


    /**Approach2: 0(h+k),0(h+k) 
     * 
     * Previously we were doing inOrder traversal completely and thus the time complexity was 0(n) and then storing this inOrder
     * in an array therefore increasing space complexity even to 0(n).
     * 
     * If somehow doing inOrder traversal only we can come up with the kth smallest element than it can significantly reduce the
     * time complexity from 0(n)-> 0(h+k) where h is the height of the BST.
     * 
     * so we pass a global variable say let obj = { cnt: 0, value: -1 } which holds the cnt and a value initially as -1
     * indicating there exits no kth smallest element at this time.
     * 
     * Now we start inOrderTraversal but where we were pushing root.val into inOrder array previously we will increment the obj.cnt
     * and will check if obj.cnt === k this means that this root.val is the kth smallest element so we update obj.value
     * and return from the recursion and there by not even going further.
      */
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
        obj = this.inorder(root.right, k, obj);
        return obj;
    }
}

let root = new BST<number>(10);
root.insert(root, 5);
root.insert(root, 7);
root.insert(root, 15);
root.insert(root, 18);
console.log(root.kthSmallest1(root, 2))


/**Approach3: 0(logn),0(1)
 * 
 * We will be using the concept of Augmented BST, every node apart from storing the address to left node, value and address to right node
 * will now also be storing the leftCount or the count of total number of left nodes from it which are present in the left subTree.
 * 
 * So during insertion if we are moving left in order to find the correct position where the node should be placed, we will be incrementing
 * the leftCount.
 * 
 * In this way during insertion process only we will be able to have left count handy for all the nodes.
 * 
 * Now while traversing in the bST there are three possibilities.
 * 
 * 1. The value of leftCount +1 of the node which we are visiting right now is greater than k.
 * This means on the leftSide there exits ample number of nodes from which one is kth smallest and thus we simply move left.
 * 
 * 2. The value of leftCount + 1 of the node which we are visiting right now is equal to k.
 * This means its the kth smallest element in the BST.
 * 
 * 3. The value of leftCount + 1 of the node which we are visiting right now is lesser than the k.
 * This means on the leftSide there don't exits ample number of nodes for which one is kth smallest so we have to move right now
 * but since every node is having additional value of number of nodes present left of it and if we are moving right this means k has to be
 * modified as  k - (current.leftCount + 1);
 * 
 * Lets understand with help of an example
 * 
 * Case1.        k=3 i,e give me 3rd smallest element.
 *                              
 *                                            10
 *                                    8              12     
 *                                7      6        11
 * 
 *  
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


