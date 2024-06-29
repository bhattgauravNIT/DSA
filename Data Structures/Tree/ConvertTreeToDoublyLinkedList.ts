/**The task is given a tree , we need to convert it to a doubly linked list in an inorder fashion for ex:
 * 
 *                          10
 *                  |             |
 *                  5             20
 *                            30       35
 * 
 * So the inorder travesal of the above binary tree looks like: 5,10,30,20,35.
 * 
 * So the doubly linked list will look like:
 * 
 *     null,5,next -> prev,10,next -> prev,30,next -> prev,20,next -> prev,35,next.
 *     or
 *     null,5,10 -> 5,10,30 -> 10,30,20 -> 30,20,35 -> 20,35,null.
 */

class DLLNode<T> {
    prev: DLLNode<T> | null;
    data: T;
    next: DLLNode<T> | null;
    constructor(data: T, prev: DLLNode<T> | null = null, next: DLLNode<T> | null = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

class DoublyLinkedList<T> {
    head: DLLNode<T> | null;
    end: DLLNode<T> | null;
    constructor() {
        this.head = null;
        this.end = null;
    }
}

class TreeNode<T> {
    data: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    /**For second approach */
    list: DoublyLinkedList<T>;
    constructor(data: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
        /**For second approach */
        this.list = new DoublyLinkedList<T>();
    }

    /**Approach1: 0(n),0(n)
     * 
     * This approach is simple we first store the inOrder traversal of the tree in a array
     * then we iterate over the array and create a doublyu linked list from it.
     * 
     * The time to do inOrderTraversal of the tree is 0(n),0(h) , auxilary space of recursion call stack.
     * After this we again iterate over the array which is 0(n) and then we create a doubly linked list .
     * 
     * So overall time complexity is 0(n),0(n) however this approach is not the most optimized one as
     * we are using a aux array to store the preOrder traversal and then we are creating a doubly linked list
     * out of it.
     * 
     * We can somehow optimize it via creating the doubly linked list only during the inorder traversal of 
     * the tree.
     */
    inOrderTravesral(root: TreeNode<T> | null, res: T[]) {
        if (root === null) return res;
        res = this.inOrderTravesral(root.left, res);
        res.push(root.data);
        res = this.inOrderTravesral(root.right, res);
        return res;
    }

    treeToDoublyLinkedList(root: TreeNode<T> | null): DLLNode<T> | null {
        const val = root?.inOrderTravesral(root, []);
        let ll = new DoublyLinkedList<T>();
        if (val && val.length > 0) {
            for (let i = 0; i < val?.length; i++) {
                let node = new DLLNode<T>(val[i]);
                if (ll.head === null) {
                    ll.head = node;
                    ll.end = node;
                } else {
                    node.prev = ll.end;
                    if (ll.end !== null) {
                        ll.end.next = node;
                    }
                    ll.end = node;
                }
            }
        }
        return ll.head;
    }

    /**Approach2: 0(n),(h)
     * 
     * Although the time complexity of the approach1 and approach 2 remians same but its timecomplexity differs
     * as in above case we are first storing the inoder traversal in a array which is 0(n), here we are only using the function
     * call stack auxilary space which is 0(h).
     * The idea is create a doubly linked list while traversal of the tree in inOrderfashion directly.
     * 
     * In this case we will be needing a global varibale of doubly linked list which will be shared across all the
     * function call stack and is not individual standalone for every call stack.
     * 
     * Simply in Inorder traversal when we formulate/print the node , there only we will be creating a doubly linked list.
     * Since we are maintaing a tail pointer thus this insertion at the end of doubly linked list is happening
     * in 0(1) time.
     */
    treeToDoublyLinkedList1(root: TreeNode<T> | null, list: DoublyLinkedList<T>): DLLNode<T> | undefined {
        if (root === null) return
        this.treeToDoublyLinkedList1(root.left, this.list);
        let node = new DLLNode(root.data);
        if (this.list.head === null) {
            this.list.head = node;
            this.list.end = node;
        } else {
            node.prev = this.list.end;
            if (this.list.end !== null) {
                this.list.end.next = node;
            }
            this.list.end = node;
        }
        this.treeToDoublyLinkedList1(root.right, this.list);
        return this.list.head;
    }
}

let root = new TreeNode<number>(10);
root.left = new TreeNode(5);
root.right = new TreeNode(20);
root.right.left = new TreeNode(30);
root.right.right = new TreeNode(35);
console.log(root.treeToDoublyLinkedList(root));
