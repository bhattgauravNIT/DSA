/**Given a binary tree the task is to print all the nodes of this binary tree in level order fashion.
 * 
 * Ex:              10
 *             |          |
 *            20         30
 *        |       |           |
 *       8        7           6
 *             |      |
 *            9       15
 * 
 * 
 * o/p is 10,20,30,8,7,6,9,15
 * 
 * 
 * Ex:             3
 *               |
 *              4
 *                |
 *                 5
 * 
 * o/p is 3,4,5
 * 
 * 
 * 
 * 
 * 
 */

class Queue<T> {
    private arr: (T | undefined)[];
    private capacity: number;
    private size: number;
    private front: number;
    private rear: number;

    constructor(capacity: number = 100) {
        this.arr = new Array<T | undefined>(capacity).fill(undefined);
        this.capacity = capacity;
        this.size = 0;
        this.front = 0;
        this.rear = -1;
    }

    enqueue(data: T): void {
        if (this.isFull()) return;
        this.rear = (this.rear + 1) % this.capacity;
        this.arr[this.rear] = data;
        this.size++;
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) return undefined;
        const data = this.arr[this.front];
        this.arr[this.front] = undefined;
        this.front = (this.front + 1) % this.capacity;
        this.size--;
        return data;
    }

    getFront(): T | undefined {
        if (this.isEmpty()) return undefined;
        return this.arr[this.front];
    }

    getRear(): T | undefined {
        if (this.isEmpty()) return undefined;
        return this.arr[this.rear];
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    isFull(): boolean {
        return this.size === this.capacity;
    }
}

/**Approach: 0(n), 0(n)| 0(width of binary tree)| 0(number of nodes at any level).
 * 
 * The approach is we cant use recursion to print level order
 * traversal of a binary tree and it will went to recurison and will come out only 
 * once either left gets empty or right gets empty thus. We will be using a queue.
 * 
 * Ex:              10
 *             |          |
 *            20         30
 *        |       |           |
 *       8        7           6
 *             |      |
 *            9       15
 * 
 * So in a queue insert root node .Now 
 * dequeue the root node and print it.
 * Insert its child first left then right.
 * 
 * Again same whatever in in front of queue.
 * Dequeue it and insert its left and right child.
 * 
 * q = new Queue();
 * q.push(root);
 * 
 * So while(!q.empty){
 * const val = q.dequeue();
 * console.log(val.data);
 * push(val.left);
 * push(val.right);
 * }
 * 
 */
class TreeNode<T> {
    data: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(data: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    levelOrderTraversal(root: TreeNode<T> | null): void {
        if (root === null) return;
        let q = new Queue<TreeNode<T>>();
        q.enqueue(root);
        while (!q.isEmpty()) {
            const node = q.dequeue();
            if (node) {
                console.log(node.data);
                if (node.left) {
                    q.enqueue(node.left);
                }
                if (node.right) {
                    q.enqueue(node.right);
                }
            }
        }
    }
}

let root = new TreeNode<number>(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);
root.left.left = new TreeNode(8);
root.left.right = new TreeNode(7);
root.left.right.left = new TreeNode(9);
root.left.right.right = new TreeNode(15);
root.right.right = new TreeNode(6);

root.levelOrderTraversal(root);
