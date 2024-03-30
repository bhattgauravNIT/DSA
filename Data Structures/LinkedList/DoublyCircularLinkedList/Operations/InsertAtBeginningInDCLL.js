/**The task is to insert a node at the beginning of the doubly circular linked list */
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
    /**Approach1: 0(n),0(1)
     * 
     * Case1: If this.head === null , meaning there is no element in list and thus simply make the node as head node.
     * this.head = node;
     * Make the next of head as head & make the prev of the head also as head only.
     * 
     * Case2: 
     * 
     * Ex: [last,10,next]->[prev,20,next]->[prev,30,head]
     * We need to insert 40 at head.
     * 
     * So first find the last node thorugh travesal i,e 30 so now current is having last node.
     * 
     * Now the next of the new node should point to head node so node.next = this.head
     * Now the previous of head should point to node, so this.head.prev = node;
     * Now node should be the new head so this.head=node;
     * Now the last node should point to this new node so current.next = this.head;
     * Now lastly the head node prev should point to the last node thus, this.head.prev = current;
     * 
     * Clearly since we need to do iteration to reach to the last node therefore it takes 0(n),0(1) time.
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
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
            current.next = this.head;
            this.head.prev = current;
        }
        this.size++;
    }
    /**Approach: 0(1),0(1)
     * 
     * Case1: If head is null , clearly this is the first node and make it as head.
     * this.head = node;
     * this.head.next = this.head;
     * this.head.prev = this.head;
     * 
     * Case2: The head is non null,
     * 
     * Ex: [last,10,next]->[prev,20,next]->[prev,30,head]
     * Now previously in order to get last we were iterating from current till end however now the head.prev will simply give us
     * the last node of the list.
     * 
     * So first make new node next point to current Head
     * node.next = this.head;
     * 
     * Now the last node should point to new node as eventually new node will be going to be the head.
     * this.head.prev.next = node;
     * 
     * The new nodes prev should point to the last node
     * this.node.prev = this.head.prev
     * 
     * The prev of current head should now point to node.
     * this.head.prev = node;
     * 
     * Lastly node should be the new head.
     * this.head=node;
     * 
     * Clearly its in 0(1),0(1).
     * 
     */
    insert(data) {
        let node = new Node(data);
        if (this.head === null) {
            this.head = node;
            this.head.prev = this.head;
            this.head.next = this.head;
        } else {
            node.next = this.head;
            this.head.prev.next = node;
            node.prev = this.head.prev;
            this.head.prev = node;
            this.head = node;
        }
        this.size++;
    }
}
let dcll = new DoublyCircularLinkedList();
dcll.insert(10);
dcll.insert(20);
dcll.insert(30);
console.log(dcll);