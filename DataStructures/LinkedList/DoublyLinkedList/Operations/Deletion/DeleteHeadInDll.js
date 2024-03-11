/**the task is to delete the head node of the doubly linked list */

/**the task is to delete the head node of the doubly linked list */

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
    /**O(1),0(1)
     * The idea is simple :
     * Case1: The head is null then there is no list then return 
     * Case2: Head.next is null meaning there is only one element at dll and its at head so make head null directly.
     * Case2: The head exists and size is greater than 1.
     * 
     * So we will have : Head-> [null,data,data1] -> [old head,data1,data2] -> [data1, data3,null]
     * & we need to make :  Head-> [null,data1,data2]-> [data1,data3,null] 
     * 
     * So we simply make the head as current.next where current is the existing head. And we make the current.next = null;
     * Also the new head should have prev as null.
     */
    deleteHead() {
        let current = this.head;
        if (current === null) {
            return
        } else if (current.next === null) {
            this.head = null;
        }
        else {
            this.head = current.next;
            this.head.prev = null;
            current.next = null;
        }
    }
}

let dll = new DoublyLinkedList();
dll.insert(10);
dll.insert(20);
dll.insert(30);
dll.insert(40);
dll.deleteHead();
dll.print();
console.log(dll);