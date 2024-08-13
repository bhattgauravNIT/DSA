/**Given a binary tree, the task is to tell wether the tree is following children sum property or not.
 * For ex:                     
 *                                        20
 *                                 |             |
 *                                8              12
 *                           |         |
 *                           3         5
 * 
 * So if we look at 2 children of 8 i,e 3,5 their sum is 8, now two children of 20 are 8 & 12 and its sum is 20.
 * So o/p is yes.
 * 
 * If sum of children is equal to that of the parent then its following children sum property.
 * 
 * Ex:                          3
 *                       |            |
 *                       1            2
 *                                |       |
 *                                1       2
 * 
 * O/p No
 * 
 * Sum of children of parent 2 is 1+2 = 3 hoverer its not equal to parent.
 * 
 * Ex: null O/p yes
 * 
 * Ex:     5 o/p yes
 * 
 * So if there is only one node than its said to follow child sum property.
 */

class Queue<T> {
    arr: T[] | undefined[];
    front: number;
    rear: number;
    size: number;
    capacity: number;
    constructor(capacity: number = 100) {
        this.arr = new Array(capacity).fill(undefined);
        this.front = -1;
        this.rear = -1;
        this.size = 0;
        this.capacity = capacity;
    }

    enqueue(data: T) {
        if (this.isFull()) return;
        this.rear = (this.rear + 1) % this.capacity;
        this.arr[this.rear] = data;
        if (this.front === -1) {
            this.front = (this.front + 1) % this.capacity;
        }
        this.size++;
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) return;
        const res = this.arr[this.front];
        this.arr[this.front] = undefined;
        this.front = (this.front + 1) % this.capacity;
        this.size--;
        return res;
    }

    isFull(): boolean {
        return this.size === this.capacity;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    getSize(): number {
        return this.size;
    }

    getFront(): T | undefined {
        if (this.front === -1) return;
        return this.arr[this.front];
    }
}

class TreeNode {
    data: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    /**
     * Approach: 0(n),0(width of binary tree) | 0(max nodes in a level) | 0(n)
     * 
     *  We simply use level order traversal and lest say 
     * 
     * ex:                              20
 *                                 |             |
 *                                8              12
 *                           |         |
 *                           3         5
 * 
 *  So first we have root in queue, we simply dequeue it , check for left and right nodes, 
 * If there is left as well as right then its sum should be equal to the root.
 * If only left is there then its sum should be equal to the root.
 * If only right is there then its sum should be equal to the root.
 * If not left and right are there then its fine.
 * 
 * We keep checking and dequeuing the parent while enqueuing the child.
 * If at any point we don't find conditions satisfying we simply return false.
 * 
     */
    isChildrenSumProperty(root: TreeNode | null): boolean {
        if (root === null) return true;
        let q = new Queue<TreeNode | null>();
        q.enqueue(root);
        while (!q.isEmpty()) {
            let val = q.dequeue();
            if (val) {
                if (val.left || val.right) {
                    if (val.left && val.right) {
                        if (val.data !== (val.left.data + val.right.data)) {
                            return false;
                        }
                    } else if (val.left && !val.right) {
                        if (val.data !== val.left.data) {
                            return false;
                        }
                    } else if (val.right && !val.left) {
                        if (val.data !== val.right.data) {
                            return false;
                        }
                    }
                }
                if (val.left) {
                    q.enqueue(val.left);
                }
                if (val.right) {
                    q.enqueue(val.right);
                }
            }
        }
        return true;
    }

    /**Approach2: 0(n),0(h)
      * 
      * Lets understand this recursion.
      * 
      *                                   20
  *                                 |             |
  *                                8              12
  *                           |         |
  *                           3         5
  * 
  * So for root 20 we have a sum variable initialize as zero.
  *  It takes sum of left node i,e if (root.left !== null) sum += root.left.data = 8
  *   and right node i,e if (root.right !== null) sum += root.right.data = 12
  *    clearly sum === root.data.
  * 
  * Now we have to recursively check for left subTree and right subTree however 
  * there has to be certain base cases which needs to be taken care.
  * 
  * If left and right both child are null return true.
  * If root is null then also return true.
      * 
      */
    isChildrenSumProperty1(root: TreeNode | null) {
        if (root === null) return true;
        if (root.left === null && root.right === null) return true;
        let sm = 0;
        if (root.left) sm += root.left.data;
        if (root.right) sm += root.right.data;
        let isLeftChildSum = this.isChildrenSumProperty1(root.left);
        let isRightChildSum = this.isChildrenSumProperty1(root.right);
        return (root.data === sm && isLeftChildSum && isRightChildSum);
    }

}

let root = new TreeNode(3);
root.left = new TreeNode(1);
root.right = new TreeNode(2);
root.right.left = new TreeNode(1);
root.right.right = new TreeNode(2);
console.log(root.isChildrenSumProperty(root));
