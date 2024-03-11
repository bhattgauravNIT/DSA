/**Given a element, the task is to insert the element as a node in beginning of the linked list. */

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
    /**Insert node at beginning 0(1),0(1)
     * 
     * The idea is if the ll is empty or it dont have a head , then this new will simply be the head node.
     * Now if the head is not null that means we have a linked list suppose it looks like
     * 
     * [1,2]->[2,null].
     * 
     * Now a new Node that will be created has to be the head and the address at this node should be the old head.
     * 
     * [x,1]->[1,2]->[2,null].
     * 
     * We can also write this in form of ternary operations like 
     *  this.head = this.head ? new Node(data, this.head) : new Node(data);
     * 
     * Note point here is if we keep inserting elements at head, the order in which we insert them and order in which
     * it comes out from linked list is reversed , which is obvious as well. 
     * 
     * Ex: ll.insertAtStart(1);
     * ll.insertAtStart(2);
     * ll.insertAtStart(3);
     * 
     * So i called for 1,2,3 and when i will print the ll it will come out as 3,2,1
    */
    insertAtStart(data) {
        if (this.head === null) {
            this.head = new Node(data);
        } else {
            this.head = new Node(data, this.head)
        }
        this.size++;

        // this.head = this.head ? new Node(data, this.head) : new Node(data);
    }
    printList() {
        let current = this.head;
        while (current !== null) {
            console.log(current.data);
            current = current.next;
        }
    }
}
ll = new LinkedList();
ll.insertAtStart(1);
ll.insertAtStart(2);
ll.insertAtStart(3);
ll.printList();
