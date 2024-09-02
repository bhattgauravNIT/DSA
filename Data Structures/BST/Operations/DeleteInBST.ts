/**The task is to delete a node in a given BST.
 * 
 * For ex: 
 *                                  50
 *                        30                  70
 *                  10       40          60        80
 *                                   55
 * 
 * delete(55) so node with value 55 should be deleted from the BST.
 * 
 * For ex:                          50
 *                      30                    70
 *             10            40          60       80
 * 
 * delete(50) should delete 50 from BST
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

    insert1(root: BST<T> | null, val: T): BST<T> {
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

    /**Approach: 0(h),0(h) ~= 0(n),0(n) in case of skewed tree
     * 
     * Lets understand this recursion with the help of an example
     * 
     *                               50
     *                      30                    70
     *             10            40          60       80
     *          8
     * 
     * Recursion:
     * Case1: Node to be deleted is only having a left or a right child.
     *        Ex: we need to delete 10 from the above BST, clearly 10 is having only one left child.
     * 
     * 
     * Case2: Node to be deleted is a leaf node and not having any child.
     *        Ex: we need to delete 8 from the above BST, clearly 8 is a leaf node.
     * 
     * 
     * Case3: Node to be deleted is having both left & right child.
     *        Ex: we need to delete 50 from the above BST.
     * 
     * so if root === null we simply return root stating that either we were asked to delete from a null tree or we have traversed
     * the entire tree but not found the target value to be deleted.
     * 
     * if(x < root.val) we make root.left linkage via calling function recursively with root.left and target value to be deleted.
     * else if(x > root.val) we make root.right linkage vai calling function recursively with root.right and target value to be deleted.
     * else meaning we found the node which is to be deleted.
     * 
     * so case1: if root.left === null but root.right is present we simply return root.right and thus cutting off this node from
     * the parent call.
     * 
     * case 2: if root.left !== null but root.right is null we simply return root.left and thus cutting off this node from the
     * parent call.
     * 
     * case 3: it has both left and right child.
     * 
     * Lets understand this case with help of an example.
     * 
     *                               50
     *                      30                    70
     *             10            40          60       80
     *          8
     * 
     * Say we need to delete 50, clearly it has both left and right child.
     * 
     * In such scenarios we find either the nextClosestGreater value of the current node or the nextClosestSmaller value of the current
     * node.
     * 
     * So in case we find the nextClosetGreater value of current node i,e 50 we will get 60.
     * which is nothing but move right and get the left extreme leaf node.
     * This approach to move right and get the left extreme leaf node for closest greater node works for this situation as we are sure that currentNode is
     * having both children.
     * 
     * it would not worked any generalized situation as say we need to get nextClosetGreater to 40, so its 50 and we can't get
     * it via moving to right and getting left extreme leaf node.
     * 
     * 
     * So, 
     * now we got the nextClosetGreater element of 50, which is 60.
     * now we make 50's value as 60, so BST becomes
     * 
     * 
     *                               60
     *                      30                    70
     *             10            40          60       80
     *          8
     * 
     * now if we recursively call for delete(root.right, nextClosestGreater.val)
     * i,e we want to delete this 60 which is now at leaf on right extreme of root node 60.
     * In this way we can delete from a BST.
     */

    getGreaterClosestValue(root: BST<T>) {
        let current = root;
        while (current !== null && current.left !== null) {
            current = current.left;
        }
        return current;
    }

    delete(root: BST<T> | null, x: T) {
        if (root === null) return null;
        if (x < root.val) {
            root.left = this.delete(root.left, x);
        } else if (x > root.val) {
            root.right = this.delete(root.right, x);
        } else {
            if (root.left === null && root.right !== null) {
                return root.right;
            } else if (root.left !== null && root.right === null) {
                return root.left;
            } else if (root.left === null && root.right === null) {
                return null;
            } else {
                if (root.right) {
                    let temp = this.getGreaterClosestValue(root.right);
                    root.val = temp.val;
                    root.right = this.delete(root.right, temp.val);
                }
            }
        }
        return root;
    }
}

