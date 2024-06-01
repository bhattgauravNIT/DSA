/**Given a binary tree , the task is to find the size of the binary tree.
 * By size we refer to the total number of nodes present in a binary tree.
 * 
 * For ex:                         10
 *                            |          |
 *                           80         70
 *                      |        |
 *                     30        40
 * 
 * O/p is 5.    
 * 
 * For ex: null O/p is 0
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

class TreeNode<T> {
    data: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    constructor(data: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    /**Approach: 0(n),0(width of tree)| 0(max number of nodes at a level)| 0(n)
     * 
     * Approach is simple we will do a level order/ breadth first traversal of
     * the tree.
     * First we insert a root node in queue.
     * Then we put a loop
     * while(!q.isEmpty()) we dequeue and increment res.
     * Now to this dequeued value we insert the left and the right child
     * of this value.
     * 
     * We repeat the process and retun this res.
     */
    sizeOfBinaryTree(root: TreeNode<T> | null): number {
        if (root === null) return 0;
        let res = 0;
        let q = new Queue<TreeNode<T> | null>
        q.enqueue(root);
        while (!q.isEmpty()) {
            let val = q.dequeue();
            res++;
            if (val?.left) {
                q.enqueue(val.left);
            }
            if (val?.right) {
                q.enqueue(val.right);
            }
        }
        return res;
    }

    /**approach: 0(n),0(H) where h is the height of the binary tree.
     * 
     * Lets understand this recursion.
     * 
     * For ex:                     10
 *                            |          |
 *                           80         70
 *                      |        |
 *                     30        40
 * 
 *  Root is at 10 which is non null, now it calls left
 *                            sizeOfBinaryTree1(80) its non null calls left
 *                                          sizeOfBinaryTree1(30) is non null calls left
 *                                                     sizeOfBinaryTree1(null) returns 0.
 *                                              left call is complete so now it calls right of it
 *                                                      sizeOfBinaryTree1(null) return 0
 *                                            Both calls of sizeOfBinaryTree1(30) completes return (left+right+1) = 1
 *                                            to parent call sizeOfBinaryTree1(80)
 *                                 Left call is complete and returned 1. Now calls right of it
 *                                            sizeOfBinaryTree1(40) is non null calls left of it
 *                                                          sizeOfBinaryTree1(null) return 0
 *                                                       left call is complete returned 0 now calls right of it.
 *                                                          sizeOfBinaryTree1(null) return 0
 *                                                       Both calls of sizeOfBinaryTree1(40) completes return (left+right+1) = 1
 *                                    Both calls for sizeOfBinaryTree1(80) is complete returnes left+right+1 = (1+1)+1 = 3 to parent call sizeOfBinaryTree1(10).
 *                    Left call is complete with value 3 now calls right of it
 *                             sizeOfBinaryTree1(70) is non null calls left of it
 *                                        sizeOfBinaryTree1(null) returns 0.
 *                                     Left call is complete now calls right of it
 *                                        sizeOfBinaryTree1(null) returns 0
 *                               Both left and right calls are complete returns (left+right)+1 = (0+0)+1 = 1.
 *               Both calls are complete returns (left+right)+1 = (3+1)+1 = 5
 * 
 * 
 * 
     */
    sizeOfBinaryTree1(root: TreeNode<T> | null): number {
        if (root === null) return 0;
        const val1 = this.sizeOfBinaryTree1(root?.left);
        const val2 = this.sizeOfBinaryTree1(root?.right);
        return val1 + val2 + 1;
    }
}

let root = new TreeNode<number>(10);
root.left = new TreeNode(80);
root.right = new TreeNode(70);
root.left.left = new TreeNode(30);
root.left.right = new TreeNode(40);
console.log(root.sizeOfBinaryTree1(root));
