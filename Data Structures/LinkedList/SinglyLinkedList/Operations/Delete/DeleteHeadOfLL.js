/**The task is to delete the head of the linked list. */

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
    insert(data) {
        if (this.head === null) {
            this.head = new Node(data);
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = new Node(data);
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

    /* delete the head node of linked list
    Simply make the head.next as the head of the linked list in this way the previous head connection is lost.
    0(1),0(1)

    Corner case are:
    1. Head is null then it means list is not present
    2. Head.next === null then it means only size of ll is 1 and its only the head node, thus make head node as null.
    */
    deleteHead() {
        if (this.head !== null) {
            if (this.head.next === null) {
                this.head = null;
            } else {
                this.head = this.head.next
            }
        }else{
            console.log('No list present')
        }
    }
}

let ll = new LinkedList();
ll.insert(1);
ll.insert(2);
ll.insert(3);
ll.deleteHead();
ll.printList();
