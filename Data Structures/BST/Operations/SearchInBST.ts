/**Given the root of a binary search tree and a root value, the task is to state wether a root with a given
 * value is present in the binary tree or not.
 * 
 * For ex:                       
 *                               15
 *                      5                     20 
 *                  3                     18       80
 *                                     16
 * 
 * x = 18
 * 
 * o/p true
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

    insert(root: BST<T> | null, val: T): BST<T> {
        let node = new BST<T>(val);
        if (root === null) {
            root = node;
            return root;
        } else {
            let current: BST<T> | null = root;
            let parent: BST<T> | null = null
            while (current !== null) {
                parent = current;
                if (val < current.val) {
                    current = current.left;
                } else if (val > current.val) {
                    current = current.right;
                } else {
                    return root;
                }
            }
            if (parent) {
                if (val < parent.val) {
                    parent.left = node;
                }
                if (val > parent.val) {
                    parent.right = node;
                }
            }
        }
        return root;
    }

    insert1(root: BST<T> | null, x: T) {
        if (root === null) return new BST<T>(x);
        if (x < root.val) {
            root.left = this.insert1(root.left, x);

        } else if (x > root.val) {
            root.right = this.insert1(root.right, x);
        }
        return root;
    }


    /**Approach1: 0(h),0(h) in worst case of that a skewed tree i,e h ~= n, so we can also say 0(n),0(n)
     * 
     *               1 
     *                 2
     *                    3
     *                       4
     * 
     * This is a recursive approach to search for a given node in a BST.
     * Lets understand this with the help of an example.
     * 
     *             
 *                               15
 *                      5                     20 
 *                  3                     18       80
 *                                     16
 * 
 *    x = 18
 *    
 *   If root is null and we are searching for anything in a null BST eventually its not present so we simply return false;
 *   Since BST follows property that every smaller value is present on the left of the root and every greater value is present
 *   at the right of the root and this holds true for every root.
 *    
 *    So we check if value to be searched is lesser than root.val, we recursively call for search on left subTree.
 *    If the value to be found is greater than the root.val then we recursively call for search on right subTree.
 * 
 *    Lets understand this logic with a use case:
 *    
 *    
    *  search(15, 18)
    *             18 is greater than root value i,e 15 so we call for right
    *             search(20,18)
    *                    18 is lesser than the root value i,e 20 so we call left of it
    *      
    *            search(18,18)  
    *                     18 is equal to 18 so the value is found and thus return true to parent call.
    * 
    *            call goes to 20, which is getting true so it also returns true to its parent call i,e 15
    *            root 15 also simply returns true to user caller.
    * 
    * Since we can at most in worst case traverse through the longest path or root to leaf thus time complexity is 0(h).
    * Similar way recursion call stack can also have at most 0(h) nodes present in call stack at a particular time and thus
    * space complexity is also 0(h).
    * 
    * 
    */
    search(root: BST<T> | null, x: T): boolean {
        if (root === null) return false;
        else if (root.val === x) {
            return true;
        } else if (x < root.val) {
            return this.search(root.left, x);
        } else {
            return this.search(root.right, x);
        }
    }

    /**Approach2: 0(h),0(1) ~= 0(n),0(1) for a skewed tree
     * 
     * The idea behind the approach remains same its just an iterative way for searching in a BST.
     * 
     * If root is null , we simply return false stating that there exists no node with provided value in BST.
     * mark a current which is equal to root as we will be using it to iterate over the BST.
     * 
     * while(the current !== null)
     * if node to be found value is lesser than current value we simply move left.
     * if node value to be found is greater than current value we simply move right.
     * if node value is equal to the target value to be found we return true.
     * 
     * If we come out of the loop without returning true this indicated that node is not found thus return false. 
   * 
   */
    search1(root: BST<T> | null, x: T): boolean {
        if (root === null) return false;
        while (root !== null) {
            if (x < root.val) {
                root = root.left;
            } else if (x === root.val) {
                return true;
            } else {
                root = root.right;
            }
        }
        return false;
    }
}

/**
 *                                 50
 *                      10                   80
 *                          30           70
 *       
 */                         

let root = new BST(50);
root.insert(root, 10);
root.insert(root, 30);
root.insert(root, 80);
root.insert(root, 70);
console.log(root.search(root,30));






