/**The task is to print/ access all the elements in a singly circular linked list. */
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class SingularlyCircularLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    insert(data) {
        let node = new Node(data);
        if (this.head === null) {
            this.head = node;
            this.head.next = this.head;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = node;
            current = current.next;
            current.next = this.head;
        }
        this.size++;
    }
    /**O(n),0(1)
     * Case1: Head is initailly null then we simply return as its a empty list
     * Case2: Head is not null , so we start from head and traverse till all the nodes until we see a node whose 
     * next === head.
     * 
     * head-> {data1, node1}-> {data2, node2}-> {data3,head}.
     * The key pointy here is lets suppose I have a node in SCLL which has same data as head , we can think that this travesal 
     * loop might end here but it will not as its data is equal to head data however its exactly not equal to the head node.
     */
    print() {
        if (this.head === null) {
            return
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                console.log(current.data);
                current = current.next;
            }
            console.log(current.data);
        }
    }
}
let scll = new SingularlyCircularLinkedList();
scll.insert(10);
scll.insert(20);
scll.insert(30);
scll.insert(10);
scll.print();