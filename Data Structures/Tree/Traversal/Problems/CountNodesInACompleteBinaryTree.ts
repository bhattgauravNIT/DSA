/**Given a complete binary tree, a complete binary tree is a tree in which all levels has 2 children apart from the last
 * level which can be incomplete however, the last level should be complete from left to right.
 * 
 * The task is to given the count of the total number of nodes in this complete binary tree.
 * 
 * I/p:          10
 *          20       30
 *       40    50
 * 
 * O/p: 5
 * 
 * 
 * I/p: null = 0
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
    totalNodes: number;

    constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.totalNodes = 0;
    }

    /**Approach1: 0(n),0(h) 
 * 
 * Use depth first search approach to get the total count of the nodes in the tree.
 * Lets understand this with the help of an example:
 * 
 * I/p:          10
 *          20       30
 *       40    50
 * 
 * countNodes(10)
 *             countNodes(20)
 *                  countNodes(40)
 *                       countNodes(null) return 0;
 *                       countNodes(null) return 0;
 * 
 *                  returns 0+0+1 = 1
 *                  
 *                  countNodes(50)
 *                        countNodes(null) return 0;
 *                        countNodes(null) return 0;
 *                  returns 0+0+1 = 1
 * 
 *                 returns 1+1+1 = 3
 * 
 *                countNodes(30)
 *                        countNodes(null) return 0;
 *                        countNodes(null) return 0;
 *                return 0+0+1 = 1
 * 
 *     return 3+1+1 = 5
 * 
 * Every node return 1+ leftCount of nodes to it + right count of nodes to it;
 * 
 * 
*/
    countNodes(root: TreeNode | null) {
        if (root === null) return 0;
        let totalLeftNodes = this.countNodes(root.left);
        let totalRightNodes = this.countNodes(root.right);
        return 1 + totalLeftNodes + totalRightNodes;
    }

    /**Approach2: 0(n),0(width of tree)
     * 
     * Approach is simply to use level order traversal, since level order traversal will store all the nodes for once
     * in the queue thus every time be pop from queue, increment the node count and in last return the node count.
     */
    countNodes1(root: TreeNode | null) {
        let res = 0;
        if (root === null) return res;
        let q = new Queue<TreeNode>();
        q.enqueue(root);
        while (!q.isEmpty()) {
            const val = q.dequeue();
            res++;
            if (val && val.left) {
                q.enqueue(val.left);
            }
            if (val && val.right) {
                q.enqueue(val.right);
            }
        }
        return res;
    }

    /**Approach3: 0(log(n)*log(n))
     * 
     * Both the above approaches, work in complexity 0(n) for all types of binary tree, either its a complete binary tree,
     * or skewed binary tree or another binary tree. Lets try and figure out a approach which uses the fact that the given binary tree is a complete
     * binary tree.
     * 
     * If a tree is a complete binary tree then let say
     * 
     *                           1
     *                        2      3
     *                     4     5  6   7
     * 
     * So total nodes in this case is 7 i,e leftHeight or rightHeight is 3. 
     * So total nodes is 2^(lh)-1 = 2^3-1  =7.
     * 
     * So the idea is based on this fact we start from root and if we find left height equal to right height we directly compute the
     * totalNodes as 2^(lh)-1, else we go back to naive method in which we do 1+ recursion(left)+ recursion(right).
     * 
     * Lets understand this with help of an example:
     * 
     *                                              1
     *                                        2              3
     *                                     4      5         6    7
     *                                   8   9  10  11
     * 
     * So for root =1 , the leftHeight or if we go to left extreme we found the height as 4, and if we go to the right extreme we found the
     * height as 3, clearly leftHeight is not equal to the right height so we cant say directly that the totalNumber of nodes is
     * 2^(leftHeight)-1.
     * 
     * Thus we go to naive method and calls function recursively for root.left and root.right i,e 1+ recursion(left)+ recursion(right)
     * 
     * Now on recursion left i,e root is now 2. We found the leftHeight i,e 3 and the right Height i,e 3.
     * Clearly leftHeight is equal to the rightHeight thus we can directly say that the total number of nodes in this subTree where 2 is the root
     * will be 2^3-1 = 7.
     * 
     * Now this left recursion is complete, so the call goes back to parent i,e 1 which calls for its right i,e 3.
     * 
     * For 3 the leftHeight is 2 and rightHeight is 2 so total nodes in this subTree where 3 is the root will be 2^2-1 = 3
     * 
     * So now for 1 , from left we got nodes as 7 and from right we got nodes as 3.And it also returns 1+ left+right ie, 1+7+3 = 11
     * which is the total number of nodes in the complete binary tree.
     */

    countNodes2(root: TreeNode | null) {
        if (root === null) return 0;
        let current: TreeNode | null = root;
        let lh = 0;
        let rh = 0;
        while (current !== null) {
            lh++;
            current = current.left;
        }
        current = root;
        while (current !== null) {
            rh++;
            current = current.right;
        }
        if (lh === rh) {
            return Math.pow(2, lh) - 1;
        } else {
            return 1 + this.countNodes2(root.left) + this.countNodes2(root.right);
        }
    }
}

let root = new TreeNode(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);
root.left.left = new TreeNode(40);
root.left.right = new TreeNode(50);
root.countNodes(root);
console.log(root.totalNodes);
