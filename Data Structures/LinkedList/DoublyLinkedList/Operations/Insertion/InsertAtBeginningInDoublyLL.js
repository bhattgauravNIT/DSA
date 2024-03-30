/**The task is to insert a node at the beginning of the doubly linked list. */
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
    /**0(1),0(1)
     * Two cases
     * 1: It's the first an element is getting inserted in dll, if the head is null, simply create a new node and make it the head.
     * 2. Head is not null,
     *    Thus is new node needs to be the head as we are inserting at the beginning of the dll.
     *    Make the prev of existing head poiting to new node.
     *    Make the new node next pointing to existing head.
     *    Make the new node as the head.
     * 
     * Ex: [null,oldHead,null]
     * Now lets insert a node at beginning
     * 
     * [null, new Node, oldHead] -------------> [new Head, oldHead, null].
     */
    insertAtStart(data) {
        let node = new Node(data);
        if (this.head === null) {
            this.head = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
        this.size++;
    }
}
let dll = new DoublyLinkedList();
dll.insertAtStart(1);
dll.insertAtStart(2);
console.log(dll);