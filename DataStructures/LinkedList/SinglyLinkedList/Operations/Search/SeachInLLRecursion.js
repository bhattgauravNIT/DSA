/**The task is to search in Link list using recursion. */
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
    /**O(n),0(n)
     * The iterative approach is better than this recursive solution as it uses extra space for function call stack, and in
     * worst case there can be in total n call where n is the size of the list.
     */
    search(data, current, index) {
        if (current === null) {
            return -1;
        } else if (current.data === data) {
            return index;
        } else {
            return this.search(data, current.next, index + 1);
        }
    }

    searchFor(data) {
        let current = this.head;
        return this.search(data, current, 1);
    }
}

let ll = new LinkedList();
ll.insert(10);
ll.insert(20);
ll.insert(30);
console.log(ll.searchFor(40));

