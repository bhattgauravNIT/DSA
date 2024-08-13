/**Given a binary tree , the task is to do a spiral level order traversal of the tree.
 * 
 * For ex:                         1
 *                         2              3
 *                     4       5       6      7
 *                  8     9          10
 * 
 * O/p 1,3,2,4,5,6,7,10,9,8
 * 
 */

class Queue<T> {
    arr: T[];
    front: number;
    rear: number;
    size = 0;
    constructor() {
        this.arr = [];
        this.front = -1;
        this.rear = -1;
        this.size = 0;
    }

    push(val: T): void {
        this.rear++;
        this.arr[this.rear] = val;
        if (this.front === -1) {
            this.front++;
        }
        this.size++;
    }

    pop(): T | undefined {
        if (this.size === 0) return;
        let val = this.arr[this.front];
        this.front++;
        this.size--;
        return val;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    getSize() {
        return this.size;
    }
}

class Tree<T> {
    data: T;
    left: Tree<T> | null;
    right: Tree<T> | null;
    constructor(data: T, left: Tree<T> | null = null, right: Tree<T> | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    /**Approach1: 0(n),0(width of tree) | 0(n);
     * 
     * Lets understand this approach.
     * We will be simply doing a level order traversal however when the level is one which needs
     * reversal we will simply be putting the queue value into a stack. And in the end will 
     * print this stack.
     * 
     * For ex:                     1
 *                         2              3
 *                     4       5       6      7
 *                  8     9          10
 * 
 * Now first the queue will have 1, and isReveres will be false.
 * We will go inside the and see pop from q, now we formulate a loop till the size of the q
 * to iterate over all the elements of the next level.
 * 
 * So we see that isReverse is false for the first level and thus we simply logged this pooped value and simply
 * for level order traversal we add the left and the right child to the queue.
 * 
 * Now after the first level is completed we switched the isReverse which now becomes true.
 * So we come into the second level which now has 2 elements 2,3 in the queue.
 * We will go inside the for loop to process each value of the queue. Now we see that the isReverse for this level is 
 * true meaning this level needs to be reversed printed so we simply push the val one by one in the stack while
 * still keep pushing the left and the right child of that val of queue to the queue.
 * After all the elements of the queue for that level is processed we simply will print the stack. And again make
 * the stack empty.
 * */
    spiralTraversalOfBinaryTree(root: Tree<T> | null) {
        if (root === null) return;
        let q = new Queue<Tree<T>>();
        q.push(root);
        let stack: T[] = [];
        let isReversed: boolean = false;
        while (!q.isEmpty()) {
            let s = q.getSize();
            for (let i = 0; i < s; i++) {
                const val = q.pop();
                if (!isReversed) {
                    console.log(val?.data);
                }
                if (val && val.left) {
                    q.push(val.left);
                }
                if (val && val.right) {
                    q.push(val.right);
                }
                if (val && isReversed) {
                    stack.push(val?.data);
                }
            }
            if (stack.length > 0) {
                for (let i = stack.length - 1; i >= 0; i--) {
                    console.log(stack[i]);
                }
                stack = [];
            }
            isReversed = !isReversed;
        }
    }

    /**Approach2: 0(n),0(n)
     * In the previous approach for the level which we need to reverse we were first 
     * pushing it to a queue and then these values of that particular level were being pushed to the stack
     * so in total we were iterating more than n times where n is the nodes in the tree, however it was something say
     * 0(n+alpha) ~= 0(n).
     * 
     * Lets optimize the above solution such that we need to traverse all the nodes only once. This can be done via two stacks.
     * 
     * lets take s1 and s2.
     * 
     * In s1 i,e the first stack we push the root now at least one of s1 or s2 has some value .
     * So if s1 has some value we simply keep console logging the value and pushing the left and right of the value to the s2 stack.
     * Now when we come to s2 we keep logging the value and pushing right and then left to the s1 stack.
     * 
     * In this way we can achieve spiral order traversal.
     */
    spiralTraversalOfBinaryTree1(root: Tree<T> | null) {
        if (root === null) return;
        let s1: Tree<T>[] = [];
        let s2: Tree<T>[] = [];
        s1.push(root);
        while (s1.length !== 0 || s2.length !== 0) {
            if (s1.length !== 0) {
                for (let i = s1.length - 1; i >= 0; i--) {
                    let val = s1[i];
                    if (val) {
                        console.log(val.data);
                    }
                    if (val && val.left) {
                        s2.push(val.left);
                    }
                    if (val && val.right) {
                        s2.push(val.right);
                    }
                }
                s1.length = 0;
            } else {
                for (let i = s2.length - 1; i >= 0; i--) {
                    let val = s2[i];
                    if (val) {
                        console.log(val.data);
                    }
                    if (val && val.right) {
                        s1.push(val.right);
                    }
                    if (val && val.left) {
                        s1.push(val.left);
                    }
                }
                s2.length = 0;
            }
        }

    }
}

let root = new Tree<number>(1);
root.left = new Tree(2);
root.right = new Tree(3);
root.left.left = new Tree(4);
root.left.right = new Tree(5);
root.left.left.left = new Tree(8);
root.left.left.right = new Tree(9);

root.right.left = new Tree(6);
root.right.right = new Tree(7);
root.right.left.left = new Tree(10);
root.spiralTraversalOfBinaryTree(root);
