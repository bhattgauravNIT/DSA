/**The task is to find the max value in a binary tree.
 * For ex:
 * 
 *                          10
 *                      |       |
 *                    30        40
 *                  |        |     |
 *                 80       60     20
 *                     |
 *                    70
 * 
 * O/p 80
 * 
 * For ex: null o/p -Infinty
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
     * 
     * Approach1: 0(n),0(h) where h is the height of the binary tree.
     * 
     * Lets understand this recusrsion. 
     * 
 *                          10
 *                      |       |
 *                    30        40
 *                  |        |     |
 *                 80       60     20
 *                     |
 *                    70
 * 
 *     
     * maxInBinaryTree(10) root is not null calls for left subTree
     *                            maxInBinaryTree(30) root is not null calls for left subTree
     *                                            maxInBinaryTree(80) root is not null calls for left subTree
     *                                                     maxInBinaryTree(null) returns -infinty.
     *                                                Left call is complete call its right
     *                                                      maxInBinaryTree(70) not null calls left
     *                                                               maxInBinaryTree(null) return -infinity
     *                                                         Left call is complete calls right
     *                                                               maxInBinaryTree(null) returns -infinity
     *                                                         Both left and right call is complete returns Max(-infi,-infi,70) = 70 to parent call
     *                                                Both left and right calls complete returns (-infi,70,80) returns 80 to parent call.
     *                                 Left call is complete with 80 now calls right
     *                                            maxInBinaryTree(null) returns Max(-infi,80,30) = 80 back to parent call.
     *                           Left call is complete calls right .............
     *                                              .....................................................
     *                                              .................................................
     * 
     * 
     *                                               and so on......
     * 
     * So we basically take max of left call, right call and node.data.
     */
    maxInBinaryTree(root: TreeNode | null): number {
        if (root === null) return Number.MIN_SAFE_INTEGER;
        return Math.max(this.maxInBinaryTree(root.left), this.maxInBinaryTree(root.right), root.data)
    }

    /**Approach2: 0(n),0(Width of binary tree)| 0(max nodes in one level of tree)| 0(n) 
     * 
     * This approach is simply based on level order traversal of the tree, we simply
     * after dequeiung check for Max(res,node.data).
    */
    maxInBinaryTree1(root: TreeNode | null): number {
        if (root === null) return Number.MIN_SAFE_INTEGER;
        let q = new Queue<TreeNode | null>();
        let res = root.data;
        q.enqueue(root);
        while (!q.isEmpty()) {            
            const val = q.dequeue();
            if (val) {
                res = Math.max(val.data, res);
                if (val.left) {
                    q.enqueue(val.left);
                }
                if (val.right) {
                    q.enqueue(val.right)
                }
            }
        }
        return res;
    }
}

let root = new TreeNode(10);
root.left = new TreeNode(30);
root.right = new TreeNode(40);
root.left.left = new TreeNode(80);
root.left.left.right = new TreeNode(70);
root.right.left = new TreeNode(60);
root.right.right = new TreeNode(20);
console.log(root.maxInBinaryTree(root));




