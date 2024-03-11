/**The task is to delete the last node of the linked list */

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

    printList() {
        let current = this.head;
        while (current !== null) {
            console.log(current.data);
            current = current.next;
        }
    }

    /*delete the last node of a linked list
    0(n),0(1)
    Corner case: 
    1. Head is itself null.(Means list does not has anything or list is empty).
    2. Size of linked list is 1 meaning head.next === null , then make head as null.

    Simply iterate to the second last node of the link list using while(current.next.next).
    Current will end up being at second last node.
    Make the next of this second last node/current to null, removing the link to the last node of the linked list.
    */
    delete() {
        if (!this.head) {
            console.log('List is not present');
        }
        else if (this.head.next === null || this.size === 1) {
            this.head = null;
        } else {
            let current = this.head;
            while (current.next.next) {
                current = current.next;
            }
            current.next = null;
        }
    }

}

let ll = new LinkedList();
ll.insert(1);
ll.insert(2);
ll.insert(3);
ll.insert(4);
ll.delete()
ll.printList();
