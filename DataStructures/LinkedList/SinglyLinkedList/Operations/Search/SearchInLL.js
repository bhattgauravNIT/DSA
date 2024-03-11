/**The task is to search a element in a linked list. */

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
    /**O(n),0(1)
     * The idea is simple iterate over the list and once we found a node whose data is equal to the data which needs
     * to be searched we return the index at which data is found.
     * In case the data is not found in list then we return -1.
     * 
     * CornerCase:
     * 1. Head is null, then list is empty.
     */
    search(data) {
        if (!this.head) {
            console.log('list is empty');
        } else {
            let index = 1;
            let current = this.head;
            while (current !== null) {
                if (current.data === data) {
                    return index;
                }
                current = current.next;
                index++;
            }
            return -1;
        }
    }
}

let ll = new LinkedList();
ll.insert(10);
ll.insert(5);
ll.insert(20);
ll.insert(15);
console.log(ll.search(10));
// ll.printList();
