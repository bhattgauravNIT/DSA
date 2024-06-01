/**Given a binary tree we need to find the max width of the tree.
 * 
 * For ex:                        10
 *                             |          |
 *                            20         30
 *                      |         |   |      |
 *                     40        50   60     70
 *                  | 
 *                 80
 * 
 * O/p is 4.
 * 
 * For ex: Null o/p is 0.
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
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    maxLevel: number;
    constructor(data: number, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.maxLevel = 0;
    }

    /**Approach: 0(n),0(width of binary tree)| 0(n)
     * 
     * The idea is simple in level order traversal or say breadth first traversal at any point of time
     * while we traverse level by level in a queue. The max size of the queue at any particular level
     * is the width of the binary tree.
     */
    maxWidthOfBinaryTree(root: TreeNode<T> | null): number {
        if (root === null) return 0;
        let q = new Queue<TreeNode<T> | null>();
        q.enqueue(root);
        let res = 0;
        while (!q.isEmpty()) {
            let s = q.getSize();
            res = Math.max(s, res);
            for (let i = 0; i < s; i++) {
                let val = q.dequeue();
                if (val?.left) {
                    q.enqueue(val.left);
                }
                if (val?.right) {
                    q.enqueue(val.right);
                }
            }
        }
        return res;
    }
}

let root = new TreeNode(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);

root.left.left = new TreeNode(40);
root.left.right = new TreeNode(50);

root.right.left = new TreeNode(60);
root.right.right = new TreeNode(70);

root.left.left.left = new TreeNode(80);
console.log(root.maxWidthOfBinaryTree(root));
