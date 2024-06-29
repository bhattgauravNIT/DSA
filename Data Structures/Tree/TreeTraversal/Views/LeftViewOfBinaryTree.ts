/**Given a binary tree the task is to print the left view of the binary tree.
 * 
 * For ex:                    10
 *                       |          |
 *                      20         30
 *                   |      |         | 
 *                  40     50         60
 * 
 * O/p is 10,20,40
 * 
 * If we look from the left side to this tree then the visible nodes are 10,20,40.
 *             
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

class TreeNode<T> {
    data: number;
    left: TreeNode<T> | null;    // 10, null, 20,30
    right: TreeNode<T> | null;
    maxLevel: number;
    constructor(data: number, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.maxLevel = 0;
    }

    /**Approach: 0(n),0(width of tree)| 0(max number of nodes in a level) | 0(n)
     * 
     * The left view of a binary tree will simply be the first node of every level.
     * So we simply do a level order traversal of the tree and for every level we print
     * the first node of it.
     */
    leftViewOfBinaryTree(root: TreeNode<T> | null): void {
        let q = new Queue<TreeNode<T> | null>();
        q.enqueue(root);
        while (!q.isEmpty()) {
            let size = q.getSize();
            for (let i = 0; i < size; i++) {
                if (i === 0) {
                    console.log(q.getFront()?.data);
                }
                let val = q.dequeue();
                if (val?.left) {
                    q.enqueue(val.left);
                }
                if (val?.right) {
                    q.enqueue(val.right);
                }
            }
        }
    }

    /**Approach2: 0(n),(h)
     * 
     * Lets understand this recursion
     * So we maintain two varibales one a global varibale called as max level and one local function varible'
     * of recursion called level.
     * 
     * If we have a tree ex: 
     *                        10
 *                       |          |
 *                      20         30
 *                   |      |         | 
 *                  40     50         60
 * 
 *  In case we do a preOrder traversal i,e root,left,right then we can notice than all the left side nodes are
 * coming first in comparison to the inner nodes which can get hidden in the left view of a binary tree.
 * 
 * So initially in leftview the root has to be printed so lets say the local varibale to recursion is level = 1 and 
 * global varibale is 0 initially.
 * So our level> maxLevel thus print node and make maxLevel = level.
 * 
 * 10 gets printed.
 * 
 * Now    leftViewOfBinaryTree1(10)     , Maxlevel = 0, level = 1. 10 gets printed calls for left subTree
 *                       leftViewOfBinaryTree1(20), MaxLevel = 1, level=2, 20 gets printed calls for leftSubTree
 *                              leftViewOfBinaryTree1(40), MaxLevel = 2, level = 3, 40 gets printed calls for left.
 *                                                         Maxlevel becomes 3, level = 3
 *                                          leftViewOfBinaryTree1(null) returns 
 *                                   Left side completed calls for right
 *                                          leftViewOfBinaryTree1(null) returns
 *                                  Both letf and right call gets completed calls goes back to 20.
 *                          Left call gets completed ,  MaxLevel = 3, level = 2 calls right
 *                                          leftViewOfBinaryTree1(50) maxLevel = 3, level = 3 condition unsatisfied calls left
 *                                                        leftViewOfBinaryTree1(null) returns
 *                                               Left complete calls right
 *                                                        leftViewOfBinaryTree1(null) returns.
 *                Left side is complete MaxLevel = 3, level = 1, calls right
 *                       leftViewOfBinaryTree1(30) MaxLevel3, level=2, unsatiffied calls left
 *                                            leftViewOfBinaryTree1(null) return
 *                                       Left complete calls right
 *                                             leftViewOfBinaryTree1(60) MaxLevel = 3, level=3 unsatified calls left
 *                                                       leftViewOfBinaryTree1(null) returns
 *                                                    Left complete calls right
 *                                                       leftViewOfBinaryTree1(null) returns
 *                        Both left and right calls complete
 *               Both left and right calls are complete.                   
 * 
*/
    leftViewOfBinaryTree1(root: TreeNode<T> | null, level: number): void {
        if (root === null) return;
        if (level > this.maxLevel) {
            console.log(root.data);
            this.maxLevel = level;
        }
        this.leftViewOfBinaryTree1(root.left, level + 1);
        this.leftViewOfBinaryTree1(root.right, level + 1);
    }
}

let root = new TreeNode<number>(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);
root.left.left = new TreeNode(40);
root.left.right = new TreeNode(50);
root.right.right = new TreeNode(60);
root.leftViewOfBinaryTree(root);
root.leftViewOfBinaryTree1(root, 1);

