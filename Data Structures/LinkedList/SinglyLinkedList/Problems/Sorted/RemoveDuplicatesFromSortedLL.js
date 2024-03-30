/**Given a sorted linked list the task is to remove the duplicates from the sorted list.
 * 
 * Ex: ll = 1 -> 2 -> 2 -> 3 -> 3 -> 3 -> 4
 * o/p = 1 -> 2 -> 3 -> 4
 */

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
        let node = new Node(data);
        if (this.head === null) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }
    print() {
        if (this.head === null) {
            return;
        } else {
            let current = this.head;
            while (current !== null) {
                console.log(current.data);
                current = current.next;
            }
        }
    }
    /**Approach: 0(n),0(n)
     * 
     * the idea is to use a set as set allows only unique elements.
     * So traverse the list and add the elements to the set.
     * 
     * Then travese the set and update the list.
     * 
     * Ex: ll = 1 -> 2 -> 2 -> 3 -> 3 -> 3 -> 4
     * 
     * So after updation of elements in list from the set the list becomes
     * 
     * ll = 1->2->3->4->3->3->4
     *  
     * So clearly we need to remove the link after the duplicates are rmoved so list becomes
     * ll = 1->2->3->4
     * 
     * Now since its aleardy given that the linked list will always be sorted this means we can use a better way to
     * achieve it.
     */
    removeDuplicates() {
        if (this.head === null) {
            return;
        } else {
            let s = new Set();
            let current = this.head;
            while (current !== null) {
                s.add(current.data);
                current = current.next;
            }
            current = this.head;
            let prev = null;
            for (let val of s) {
                current.data = val;
                prev = current;
                current = current.next;
            }
            prev.next = null;
        }
    }
    /**Approach2: 0(n),0(1)
     * 
     * the idea is to use two pointers prevNode and currentNode.
     * Ex: ll = 1 -> 2 -> 2 -> 3 -> 3 -> 3 -> 4
     * 
     * Initailly prevNode = 1 and currentNode = 2
     * If the prevNode data is not equal to current Node data than simply make the
     * 
     *  prevNode.next = currentNode and move the prevNode to currentNode and currentNode to next.
     * 
     * So here the prevNode data is not same as current node data so we say prevNode.next = currentNode
     * prevNode = currentNode and currentNode = currentNode.next.
     * 
     * Now prevNOde = 2 and currentNode = 2
     * Clearly both the data are same so we will keep incrementing the currentNode till we get a different data.
     * Ansd then will update the prevNode.next = currentNode and prevNode = currentNode and currentNode = currentNode.next.
     * 
     * In last we will simply make the prevNode.next = null in order to remove the links after the duplicates are removed.
     */
    removeDuplicates() {
        if (this.head === null) {
            return;
        } else {
            let prevNode = this.head;
            let currentNode = this.head.next;
            while (currentNode !== null) {
                if (currentNode.data !== prevNode.data) {
                    prevNode.next = currentNode;
                    prevNode = currentNode;
                    currentNode = currentNode.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
            prevNode.next = null;
        }
    }
}

let ll = new LinkedList();
ll.insert(10);
ll.insert(20);
ll.insert(30);
ll.insert(30);
ll.insert(30);
ll.insert(30);
ll.removeDuplicates();
ll.print();

