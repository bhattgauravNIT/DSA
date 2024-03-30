/**Given a linked list such that it is able to accomodate elements, print all the elements of the linked list */
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
    /* inserts node at end of linked list.
    0(n),0(1)
    */
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
    /* prints all the elements of the linked list.
    0(n),0(1)
    Simply iterate from the head of the linked list till end and keep printing all elements.
    */
    printList() {
        let current = this.head;
        while (current !== null) {
            console.log(current.data);
            current = current.next;
        }
    }
}

let ll = new LinkedList();
ll.insert(1);
ll.insert(3);
ll.insert(2);
ll.printList();