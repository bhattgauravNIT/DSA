/**The task is to delete the head node of the singly circular linked list. */
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}
class SinglyCircularLinkedList {

    constructor() {
        this.head = null;
        this.size = 0;
    }

    insert(data) {
        let node = new Node(data);
        if (this.head === null) {
            this.head = node;
            this.head.next = this.head;
        } else {
            let current = this.head;
            node.next = current.next;
            this.head.next = node;
            node.data = this.head.data;
            this.head.data = data;
            this.head = node;
        }
        this.size++;
    }

    print() {
        if (this.head === null) {
            return
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                console.log(current.data);
                current = current.next;
            }
            console.log(current.data);
        }
    }
    /**Approach1: 0(n),0(1)
     * 
     * Use case:
     * 1. The head is null, meaning the list is empty.
     * 2. The head is not null, 
     * Move to the end of list and make the last node point to this.head.next;
     * 
     * Ex:  Head-> [10,next]->[20,next]->[30,head]
     * 
     * Make the last node [30,head] point to node at index 1.
     * Now make the head as the node at index 1 which is this.head = this.head.next;
     * 
     * Ex:  Head->[20,next]->[30,head]
     */

    deleteHead() {
        if (this.head === null) {
            return;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = this.head.next;
            this.head = this.head.next;
        }
        this.size--;
    }
    /**
     * Approach: 0(1),0(1)
     * The problem with above approach was it was taking 0(n),0(1) time.
     * Now lets try and achieve it in 0(1),0(1).
     * 
     * Case1: The head is itself null , then its an empty list
     * Case2: The head is the only node , simply make head as null.
     * Case3:
     * 
     * Ex:  Head-> [10,next]->[20,next]->[30,head]
     * Now we need to delete the head.
     * 
     * Lets swap the data at head.next/index1 node with head.
     * 
     * Head -> [20,next]->[20,next]->[30,head].
     * Now simply make the head point to head.next.next so cutting the link to the node at index 1 from head.
     * 
     * Head-> [20,next]->[30,head].
     * 
     * Clearly the head is removed in 0(1),0(1).
     */
    deleteHead1() {
        if (this.head === null) {
            return;
        } else if (this.head.next === null) {
            this.head = null;
        }
        else {
            let temp = this.head.next;
            this.head.data = temp.data;
            this.head.next = temp.next;
        }
        this.size--;
    }
}
scll = new SinglyCircularLinkedList();
scll.insert(10);
scll.insert(20);
scll.insert(30);
scll.deleteHead()
scll.print();
console.log(scll);