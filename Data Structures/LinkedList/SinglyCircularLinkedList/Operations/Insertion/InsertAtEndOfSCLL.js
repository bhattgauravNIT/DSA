/**The task is to insert a node at the end of a singularly circular linked list. */

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
    /**O(n),0(1)
     * The idea is 
     * 1. If initially the head is null then it means there is no list and thus we have to insert a node at the head.
     * Head: [data,head].
     * Now in case of singly circular linked list since its the only node and also considered as the last node thus its next will
     * not be null like an normal linked list however it will be pointing back to the start of the linked list which is head itself.
     * 
     * 2. If the current head is not null, then we iterate till the end of the linked list , the end can be found when 
     * current.next !== this.head.
     * This way we will reach end of link list now we insert a node at this via current.next = node.
     * 
     * Howver since now the last node should be pointing back to the head node again , thus we go to the last node which is now
     * the new node being inserted.
     * 
     * current = current.next and make the next of this current point to the head again 
     * current.next = this.head;
     * 
     * the problem with the above approach is we have to travel till the end of the list and then make the adjustmenst which make this
     * time complexity 0(n).
     */
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
    /**Approach2: 0(1),0(1)
     * 
     * 1. We can modify the time complexity from    0(n)->O(1) by maintaining a tail pointer so we directly insert a new node at the tail and then
     * make this node point to head.
     * 
     * 2. This is a tricky solution.
     * 
     * i need to insert 50 at end of a list containing 10,20,30,40
     * 
     * Suppose I have a list
     * 
     * Head-> [10,next]->[20,next]->[30,next]->[40,head];
     * 
     * Now lets insert a new Node of 50 as next of head i,e at index 1.
     * 
     * Head-> [10,next]->[50,next]->[20,next]->[30,next]->[40,head]
     * 
     * now lets swap the data of head node and new node inserted at index 1.
     * 
     * Head-> [50,next]->[10,next]->[20,next]->[30,next]->[40,head]
     * 
     * Now if we just change the head this new node being inserted at index1 then automatically the [50] will get inserted
     * at the end.
     * 
     *              Head
     *               |
     * [50,next]-> [10,next]->[20,next]->[30,next]->[40,previousHead]
     * 
     * Now this last node 40 will still be poiniting to previousHead which is now 50 the new node to be inserted as we didn't went and
     * change the next of 40 to this new head and thus its achieved in 0(1).
     *  
     */
    insert1(data) {
        let node = new Node(data);
        if (this.head === null) {
            this.head = node;
            this.head.next = this.head;
        } else {
            let current = this.head;
            node.next = current.next;
            this.head.next = node;
            node.data = this.head.data;
            this.head.data = data;
            this.head = node;
        }
        this.size++;
    }
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
console.log(scll);