/**Given a binary tree the task is to print all the nodes of this binary tree in level order fashion however
 * every level nodes should be printed together.
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
 * o/p is 10
 *       20,30
 *       8,7,6
 *       9,15
 * 
 * 
 * Ex:             3
 *               |
 *              4
 *                |
 *                 5
 * 
 * o/p is 3
 *        4
 *        5
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

    getSize(): number {
        return this.size;
    }
}


class TreeNode<T> {
    data: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(data: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
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
 *
 * Its the same problem as that of level order traversal however the way we are printing
 * them differs a bit, here we have to print the levels like 
 * 10
 * 20 30
 * 8 7 6
 * 9 15
 * 
 * So approach is simple we store all levels in a string and will differentiate the level nodes
 * via say a null boundary insertion or a null marker.
 * As we get a null value in queue we simply print whatever is in the string.
 * And since once we got a null boundary we are ceratin that all other nodes of that level
 * are processed thus we insert null again but it should be done only till the queue is not empty
 * else we will keep inserting null and empty strings will be getting printed into a infinite loop.
 * 
 * So initially the queue will have root and null.
 * Now we dequeue so we find root is not null thus we put the data in a string and insert the
 * left and right child of it.
 * 
 * Again we dequeue so we found null, simply means this level is over and thus we print the string
 * set the string back to '' and we see that q is not empty so we insert null again to set boundary
 * for the next level as it left and right child are being already processed.
 */
    levelOrderTraversal(root: TreeNode<T> | null): void {
        if (root === null) return;
        let q = new Queue<TreeNode<T> | null>();
        q.enqueue(root)
        q.enqueue(null);
        let str: string = '';
        while (!q.isEmpty()) {
            let val = q.dequeue();
            if (val !== null) {
                str += val?.data + ' ';
                if (val?.left) {
                    q.enqueue(val?.left);
                }
                if (val?.right) {
                    q.enqueue(val.right);
                }
            } else {
                str = str.trim();
                console.log(str);
                str = '';
                if (!q.isEmpty()) {
                    q.enqueue(null);
                }
            }
        }
    }

    /**
     * Approach: 0(n),0(width of tree)| 0(max number of nodes at any level)| 0(n)
     * 
     * This approach is based on loops, 
     * initially our queue is having 10.
     * So size of the queue is 1.
     * So we run a inner loop till 1 and pop from q. Insert left and right and place this dequeued value
     * in a string.
     * 
     * Now we come out of this loop and thus print string, revert it back to ''.
     */
    levelOrderTraversal1(root: TreeNode<T> | null): void {
        if (root === null) return;
        let q = new Queue<TreeNode<T> | null>();
        q.enqueue(root);
        let str: string = '';
        while (!q.isEmpty()) {
            let size = q.getSize();
            for (let i = 0; i < size; i++) {
                let val = q.dequeue();
                if (val) {
                    str += val.data + ' ';
                }
                if (val?.left) {
                    q.enqueue(val.left);
                }
                if (val?.right) {
                    q.enqueue(val.right);
                }
            }
            str = str.trim();
            console.log(str);
            str = '';
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

