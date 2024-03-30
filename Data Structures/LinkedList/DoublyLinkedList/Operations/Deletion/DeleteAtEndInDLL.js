/**The task is to delete the last node of the doubly linked list. */

class Node {
    constructor(data, prev = null, next = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    insert(data) {
        let node = new Node(data);
        if (this.head === null) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            node.prev = current;
            current.next = node;
        }
        this.size++;
    }
    print() {
        if (this.head === null) {
            return
        } else {
            let current = this.head;
            while (current !== null) {
                console.log(current.data);
                current = current.next;
            }
        }
    }
    /**0(n),0(1)
     * The idea is
     * Case1: The head is null so there is no element in dll.
     * Case2: The head.next is null means there is only one element in dll which is the head itself.
     * Case3: Iterate over the dll move till last and second last element using current and previous pointer.
     * Make the next of previous pointer as null cutting the link to last node of dll.
     */
    delete() {
        if (this.head === null) {
            return null;
        } else if (this.head.next === null) {
            this.head = null;
        } else {
            let current = this.head;
            let previous;
            while (current.next !== null) {
                previous = current;
                current = current.next;
            }
            previous.next = null;
            current.prev = null;
            current.next = null;
        }
    }
}

let dll = new DoublyLinkedList();
dll.insert(10);
dll.insert(20);
dll.insert(30);
dll.insert(40);
dll.delete();
dll.print();
