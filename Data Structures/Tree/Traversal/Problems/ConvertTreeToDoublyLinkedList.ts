/**The task is given a tree , we need to convert it to a doubly linked list in an inorder fashion for ex:
 * 
 *                          10
 *                  |             |
 *                  5             20
 *                            30       35
 * 
 * So the inorder traversal of the above binary tree looks like: 5,10,30,20,35.
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
    size: number;

    constructor() {
        this.head = null;
        this.end = null;
        this.size = 0;
    }
}

class TreeNode<T> {
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    data: T;
    dLinkedList: DoublyLinkedList<T>;

    constructor(data: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.dLinkedList = new DoublyLinkedList<T>();
    }

    getPreOrderTraversal(root: TreeNode<T> | null, arr: T[] = []) {
        if (root === null) return arr;
        this.getPreOrderTraversal(root.left, arr);
        arr.push(root.data);
        this.getPreOrderTraversal(root.right, arr);
        return arr;
    }

    /**Approach1: 0(n),0(n)
    * 
    * This approach is simple we first store the inOrder traversal of the tree in a array
    * then we iterate over the array and create a doubly linked list from it.
    * 
    * The time to do inOrderTraversal of the tree is 0(n),0(h) , auxiliary space of recursion call stack.
    * After this we again iterate over the array which is 0(n) and then we create a doubly linked list .
    * 
    * So overall time complexity is 0(n),0(n) however this approach is not the most optimized one as
    * we are using a aux array to store the preOrder traversal and then we are creating a doubly linked list
    * out of it.
    * 
    * We can somehow optimize it via creating the doubly linked list only during the inorder traversal of 
    * the tree.
    */
    convertTreeToDoublyLinkedList(root: TreeNode<T> | null) {
        if (root === null) return null;
        const preOrder: T[] = this.getPreOrderTraversal(root, []);
        let dll = new DoublyLinkedList<T>();
        for (let i = 0; i < preOrder.length; i++) {
            let n = new DLLNode(preOrder[i]);
            if (dll.head === null) {
                dll.head = n;
                dll.end = n;
            } else {
                n.prev = dll.end;
                if (dll.end !== null) {
                    dll.end.next = n
                }
                dll.end = n;
            }
        }
        return dll.head;
    }


    /**Approach2: 0(n),(h)
     * 
     * Although the time complexity of the approach1 and approach 2 remains same but its time complexity differs
     * as in above case we are first storing the inorder traversal in a array which is 0(n), here we are only using the function
     * call stack auxiliary space which is 0(h).
     * The idea is create a doubly linked list while traversal of the tree in inOrder fashion directly.
     * 
     * In this case we will be needing a global variable of doubly linked list which will be shared across all the
     * function call stack and is not individual standalone for every call stack.
     * 
     * Simply in Inorder traversal when we formulate/print the node , there only we will be creating a doubly linked list.
     * Since we are maintaining a tail pointer thus this insertion at the end of doubly linked list is happening
     * in 0(1) time.
     */
    convertTreeToDoublyLinkedList1(root: TreeNode<T> | null) {
        if (root === null) return null;
        this.convertTreeToDoublyLinkedList1(root.left);
        let n = new DLLNode(root.data);
        if (this.dLinkedList.head === null) {
            this.dLinkedList.head = n;
            this.dLinkedList.end = n;
        } else {
            n.prev = this.dLinkedList.end;
            if (this.dLinkedList.end !== null) {
                this.dLinkedList.end.next = n;
            }
            this.dLinkedList.end = n;
        }
        this.convertTreeToDoublyLinkedList1(root.right);
        return this.dLinkedList.head;
    }
}

let root = new TreeNode<number>(10);
root.left = new TreeNode(5);
root.right = new TreeNode(20);
root.right.left = new TreeNode(30);
root.right.right = new TreeNode(35);
console.log(root.convertTreeToDoublyLinkedList(root));
