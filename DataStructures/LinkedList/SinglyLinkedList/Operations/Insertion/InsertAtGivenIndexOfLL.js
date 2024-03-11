/**The task is to insert a data element at a given index in a linked list. */

class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    /**Insert node at given index considering 1 based indexing
     * 
     * Here we are trying to insert a node at an index provided by user.
     * If the index <= 0 or index> linkedList size + 1 (considering 1 based indexing)
     * then its not a valid index. 
     * Ex: linked list size is 3 it means its having index from 1,2,3 now if we try
     * and insert a node at index 5 which is greater than the size of linklist + 1 then obviously its not a valid index.
     * However we can insert a node at sizeOfLinknedList + 1 ex: link list has index 1,2,3 and we need to insert at 4 index then its possible.
     * 
     * We create a new node with the data probvided by user.Now
     * If the index is 1, it means that we have to insert at the head. 
     * Thus the node.next should point to previous head (node.next = this.head) 
     * and this new node should be the new head.  (this.head=node);
     * 
     * If we are not inserting at index 1, this means that we need to keep track of the previous and the current node
     * 
     * Say ex: [10,Node1] -> [20,Node2] -> [30,Node3] -> [40,Null]
     * 
     * We need to insert at index 3 a new node of data 50.
     * 
     * So wile itearting we have a previous node [20,Node2] and current node as [30,Node3].
     * 
     * Now a new node has to be inserted between them and thus node should point to previous's next which is current only
     * and then previou's next should point to node.
     * 
     * node.next = previous.next; or node.next = current;
     * previous.next = node;
     */

    insertAt(data, index) {
        let node = new Node(data);
        if (index <= 0 || index > this.size + 1) {
            console.log('invalid index');
            return;
        }
        if (index === 1) {
            if (this.head === null) {
                this.head = node;
            } else {
                node.next = this.head;
                this.head = node;
            }
        } else {
            let cnt = 1;
            let current = this.head;
            let prev;
            while (cnt !== index) {
                cnt++;
                prev = current;
                current = current.next;
            }
            prev.next = node;
            node.next = current;
        }
        this.size++;
    }
    
    printList() {
        let current = this.head;
        while (current !== null) {
            console.log(current.data);
            current = current.next;
        }
    }
}
let ll = new LinkedList();
ll.insertAt(1, 1);
ll.insertAt(2, 1);
ll.insertAt(3, 3);
ll.insertAt(3, 1);
ll.insertAt(4, 6);
ll.printList();



