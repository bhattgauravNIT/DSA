/**The task is to insert nodes in a BST. Such that the property of BST is maintained i,e left should be less than
 * the root and right should be greater than the root and this applies for every root in the tree.
 * Assuming that every node is unique in BST and in case of addition of a node value which already exists then don't insert that
 * node in the BST;
 * 
 * Ex: insert(10), initially root is null so root becomes 10.
 *     insert(5), so BST becomes
 *                                10
 *                             5
 * 
 *     insert(7) so BST becomes
 *                                         10
 *                                     5
 *                                        7
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

    /**Approach1: 0(h),0(h) ~= 0(n),0(n) in case of skewed tree
     * 
     * This is a recursive approach to insert into a BST.
     * Initially when root is null then we simply insert a new node of value x.
     * Now if the root is not null'
     * we check if value to be inserted is smaller than its root if yes, we recursively call for left subTree
     * and make root.left =  insert(root.left,x).
     * 
     * If the value to be inserted is greater than the root than it should be inserted in the right portion of subTree
     * and thus we make root.right = insert(root.right,x).
     * 
     * Since every call will be returning root thus this left tree is getting formed via the call 
     * root.left = recursionOnLeft(root.left,x)
     * 
     * and every right subTree is getting formed via root.right = recursionOnLeft(root.right,x)
     * 
     * 
      */
    insert(root: BST<T> | null, x: T) {
        if (root === null) return new BST<T>(x);
        if (x < root.val) {
            root.left = this.insert(root.left, x);

        } else if (x > root.val) {
            root.right = this.insert(root.right, x);
        }
        return root;
    }

    /**Approach2: 0(h),0(1) ~= 0(n),0(1) in case of skewed tree
     * 
     * This is a iterative approach.
     * If root is null we simply make root as a new BST node.
     * else we maintain a current and a parent , current is initially root and is being used to traverse through the tree.
     * parent is used to keep track of parent of current lest understand this.
     * 
     * Insert(10), initially root is null so we insert 10 as a new BST node
     *                            10
     * 
     * insert(20).
     * 
     * Now root is given and is not null.
     * current = root and we check if value to be inserted > current.val or less than, so we got greater value
     * thus we move right.
     * 
     * Now right of root is null so we come out of loop.
     * This current is used to reach to the right position where this node should be inserted.
     * 
     * With help of parent we insert the node.
     * 
     * So
     * Parent is still the root.
     * So we insert parent.right = new BST node.
     * We inserted at right because inserted value is greater than the parent value.
     * 
     * We simply return root.
     * 
     * Note here is if while traversing through BST using current we found that the value to be inserted is already present
     * i,e current.val === val
     * 
     * we simply return root i,e we don't insert in BST.
     */
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
}

let bst = new BST(10);
bst.insert(bst, 20);
bst.insert(bst, 8);
bst.insert(bst, 7);
bst.insert(bst, 30);
bst.insert(bst, 0);

