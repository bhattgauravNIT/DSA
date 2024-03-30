/**The task is to insert a node at the end of a doubly circular linked list. */
class Node {
    constructor(data, prev = null, next = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}
class DoublyCircularLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    /**0(n),0(1)
     * Case1: head is null this means that there is no list thus simply make this as the head node.
     * The head node will point next to head and prev also to head as well.
     * 
     * Case2: Head is non null, simply iterate to the end of the list, make the next of last node as new Node.
     * Make the prev of new node as the current/lastNode.
     * Make the next of new node as head 
     * Make the prev of the head as the node.
     * 
     * Clearly we have to travese till the end of the list and thus its 0(n),0(1).
     */
    insert(data) {
        let node = new Node(data);
        if (this.head === null) {
            this.head = node;
            this.head.next = this.head;
            this.head.prev = this.head;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = node;
            node.next = this.head;
            node.prev = current;
            this.head.prev = node;
        }
        this.size++;
    }
    /**Approach: 0(1),0(1) 
     * 
     * Case1: The head is null then simply make this as the first node/head of the doubly circular list.
     * Case2: The head is not null.
     * 
     * Ex:  Head-> [last,10,next]-> [prev,20,next]-> [prev,30,head].
     * 
     * Now we need to insert 40 at end.
     * 
     * this.head.prev is pointing to the last node of the list thus we dont need to iterate and go till the last.
     * Make the next of the last node as new node.
     * 
     * this.head.prev.next = node;
     * Make the head.prev point to the node.
     * this.head.prev = node;
     * Make the next of node as head.
     * this.node.next = head.
     * Make the prev of the node as the previous last of the list so store the temp = this.head.prev initally at the beginning.
     * this.node.prev = temp;
     * 
     * clearly it can be achieved in 0(1).
    */
    insert(data) {
        let node = new Node(data);
        if (this.head === null) {
            this.head = node;
            this.head.next = this.head;
            this.head.prev = this.head;
        } else {
            let temp = this.head.prev;
            this.head.prev.next = node;
            this.head.prev = node;
            node.next = this.head;
            node.prev = temp;
        }
        this.size++;
    }
}
let dcll = new DoublyCircularLinkedList();
dcll.insert(10);
dcll.insert(20);
dcll.insert(30);
console.log(dcll);