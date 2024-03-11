/**The task is to insert nodes at end of the doubly linked list. */
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
    /**O(n),0(1)
     * A doubly linked list looks something like 
     * 
     * [null, data, ,node1]--------> [node1, data, null];
     * It means unlike linked list it also have a address of previous node.
     * 
     * So a single node consist of three things adress to its left node, the data and the address to its right node.
     * When we see that the element being inserted will be the firts element of doubly linked list, it means it will be the head.
     * Thus for only one node which is head the address to previous node will be null and the address to the next node will also
     * be null.
     * 
     * Now if the list is having head then we iterate till end of list using 
     * current = this.head, while(current.next).
     * Now our current will be at the end of the list thus simply to current.next we insert a new node and
     * this new node should also have the adress to current node  something like this
     * 
     * [null, data, ,new node]--------> [prevNode, data, null];
     * 
     * Considering the last node being the new node inserted in dll.
     */
    insert(data) {
        let node = new Node(data);
        if (this.head === null) {
            this.head = node
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
            node.prev = current;
        }
        this.size++;
    }
}
let dll = new DoublyLinkedList();
dll.insert(1);
dll.insert(2);
dll.insert(3);
console.log(dll);
