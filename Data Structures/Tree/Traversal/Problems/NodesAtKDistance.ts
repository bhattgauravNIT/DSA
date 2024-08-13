/**Given a binary tree and a k value, the task is to print nodes which are at k distance from the
 * root of the binary tree.
 * 
 * For ex:            10
 *                  |      |
 *               20        30
 *           |      |    |
 *         40      50    70
 * 
 * K = 2
 * 
 * O/p is 40,50,70.
 * 
 * For ex:                10
 *                     |
 *                  20
 *                |
 *              30
 * k=1
 * 
 * o/p us 20
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

    getSize() {
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

    /**
     * Approach: 0(n),0(width of tree) ~= 0(max number of nodes at any level) ~= 0(n)2
     * 
     * Lets understand that why space is 0(n).
     * So if we have a complete binary tree i,e every parent having 2 child.
     * like:
     * 
     *                                    1
     *                               2         3
     *                           4       5   6    7
     * 
     * So there are 7 nodes in total and the last level has 4 nodes i,e n+1/2
     * In complexity analysis its 0((n+1)/2) ~= 0(n).
     * 
     * 
     * For ex:         10
 *                  |      |
 *               20        30
 *           |      |    |
 *         40      50    70
 * 
 *    K = 2
 * 
     * So nodes at dist 2 from the root are 40,50 and 70.
     * 
     * If we consider the root is at level 1, then we have to print all nodes at level k+1.
     * So dist 2 means nodes at level 3.
     * 
     * So we will be using breadth first search or level order traversal.
     * We will start enqueing all the nodes at every level and for the k+1th level we will print all the nodes
     * currently present in the queue and will break the main loop.
     * 
     * So initially our queue will be having root.
     * 
     * q = [10].
     * 
     * now while(!q.isEmpty())
     * first we get the size of the queue which is at current i,e 1.
     * 
     * we will itearte over every element of this queue at present.
     * 
     * pop from queue so queue q = [].
     * now if left and right exists then push them to queue.
     * Since initially there was only one element so now for loop ends
     * and we move into next iteartion of while loop.
     * 
     * In this way be keep inserting all nodes of a specific level and once 
     * we get k+1th level we stop and print everything which is in the queue.  
     */
    nodesAtDistK(root: TreeNode<T> | null, k: number): void {
        let q = new Queue<TreeNode<T>>();
        if (root === null) return
        q.enqueue(root);
        let i = 1;
        while (!q.isEmpty()) {
            let s = q.getSize();
            for (let i = 0; i < s; i++) {
                let val = q.dequeue();
                if (val && val !== undefined) {
                    if (val.left) {
                        q.enqueue(val.left);
                    }
                    if (val.right) {
                        q.enqueue(val.right);
                    }
                }
            }
            i++;
            if (i === k + 1) {
                while (!q.isEmpty()) {
                    console.log(q.dequeue()?.data);
                }
                break;
            }
        }
    }
}

let root = new TreeNode<number>(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);
root.left.left = new TreeNode(40);
root.left.right = new TreeNode(50);
root.right.left = new TreeNode(70);
root.nodesAtDistK(root, 2);