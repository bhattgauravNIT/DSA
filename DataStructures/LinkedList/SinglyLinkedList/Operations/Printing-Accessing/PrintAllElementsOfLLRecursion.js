/**Given a linked list such that it is able to accomodate elements, print all the elements of the linked list using recursion*/
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
    /* inserts node at end of linked list.*/
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
    /* prints all the elements of the linked list using recursion
    0(n),0(n)
    Iterative solution is better as compared to recursive solution beause recursive solution takes 0(n) space for
    functional call stack.
    */
    printList(head) {
        if (head === null) return;
        console.log(head.data);
        this.printList(head.next);

    }

    /*User helper function to print list as main printList function needs the initial head of linked list.*/
    print() {
        this.printList(this.head);
    }
}

let ll = new LinkedList();
ll.insert(1);
ll.insert(3);
ll.insert(2);
ll.print();