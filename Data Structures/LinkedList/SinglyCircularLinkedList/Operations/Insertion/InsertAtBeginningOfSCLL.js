/**The task is to inert a node at the beginning of a singly circular linked list */
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
    /**Approach: 0(n),0(1)
     * The idea is simple:
     * Case1: The head is null , thus its the firts element and also the head now of the list so
     * this.head = node
     * node.next = this.head
     * 
     * Case2: The head is not null
     * Ex: head-> [20,10]->[10,head]
     * So first travese to end of linked list and make the last node point to new Node.
     * Now new node.next should point to previous head.
     * New head should be this node.
     * head -> [30,20]->[20,10]->[10,head]
     * 
     * The above approach does this in 0(n),0(1), is there any way of doing in in 0(1),0(1) time.
     * 
     * Approach1: Maintain a tail pointer. If in the previous algo we didn't needed to go to the end of the list 
     * and we simply woould have maintained a tail pointer in SingularlyCircularLinkedList class itself then simply
     * we just needed to change the next of this tail pointer to new node and make the head as new node which would have been in 0(1),0(1).
     * 
     * Approach2: 
     * Lets take an example: head -> [30,20]->[20,10]->[10,head]
     * Now if we want to insert 40 at start then how we achieve it in 0(1),0(1).
     * 
     * If we somehow insert this 40 at index 2 (considering 1 based indexing). So the new list will look like
     * [30,20]->[40,20]->[20,10]->[10,head]
     * 
     * Now if we swap nodes at index 1 and index 2 then it becomes
     * 
     * Head: [40,30]->[30,20]->[20,10]->[10,head]
     * 
     * It will reduce the complexity from 0(n) to 0(1).
     */
    inertAtStart(data) {
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
            node.next = this.head;
            this.head = node;
        }
    }

    /**Approach2: 0(1),0(1)
     * Now in the previous use case in which we were inserting the node at the head of singly circular linked list we were able
     * to achieve it in 0(n),0(1). However we can use a trick to achieve in 0(1),0(1).
     * 
     * Case1: SCLL is empty i,e this.head===null. simply make this node as head node and make next of head point to itself.
     * Case2:
     * Ex:  Head-> [40,next]->[30,next]->[20,next]->[10,head]
     * Now we wish to insert 50 at head so lets insert it just next to the already existing head node or at index 1
     * 
     * Head-> [40,next]->[50,next]->[30,next]->[20,next]->[10,head]
     * 
     * Now swap the data of the head node and this new node.
     * 
     * Head: [50,next]->[40,next]->[30,next]->[20,next]->[10,head]
     * 
     * Since the head is not changed thus the last node will still be pointing to the head and head is now having this data which needs
     * to be inserted at beginning.
     * 
     * Clearly thats what we wanted to achieve and we did it in 0(1),0(1).
     */
    insertAtStart1(data) {
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
        }
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
scll.inertAtStart(10);
scll.inertAtStart(20);
scll.inertAtStart(30);
scll.print();
console.log(scll);