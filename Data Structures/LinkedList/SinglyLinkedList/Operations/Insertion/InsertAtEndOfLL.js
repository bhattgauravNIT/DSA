/**Create a linked list such that it is able to accomodate elements */
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
    /* Inserts node at end of linked list.
    Case1: Initially no data is present in ll. So this first node will simply also be the head node.
    Case2: The head is not null, then the idea is to traverse to the end of the linked list and insert the node.

    Ex: [1,2]->[2,3]->[3,4]

    So at last node that is [3,4] insert a new node of data.
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
}

let ll = new LinkedList();
ll.insert(1);
ll.insert(3);
ll.insert(2);
console.log(ll);