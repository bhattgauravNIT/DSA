/**Given a value k, such that the size of linked list is always greater than or equal to k, the task is to delete the
 * kth node from beginning.
 * 
 * Ex: 1->2->3
 *     |     |
 *     -------
 *     k=2 delete 2nd node thus new linked list will look like  1->3(3 pointing back to head.)
 */

class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}
class SinglyCircularLinkedList {
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
    /**0(k),0(1)
     * 
     * Case1: K is less than 0 or 0 or this.head is null meaning simply return .
     * 
     * Case2: 
     * If k==1 and the size of the list is 1 only meaning this.head.next =this.head then simply make this.head as null.
     * 
     * Case3: if k===1 and this.head.next !== this.head meaning the size of list is greater than 1.
     * This is same case of deletion of the head node we can simply achieve it in 0(1),0(1) using 
     * 
     * ex: Head-> [10,next]->[20,next]->[30,head] k=1.
     * 
     * Swap the data of the 2nd node with head node
     * Head-> [20,next]->[20,next]->[30,head] k=1.
     * 
     * Now simply make this.head.next = this.head.next.next;
     * 
     * Head-> [10,next]->[30,head]
     * 
     * Case4: If k===this.size meaning we have to remove the last node of the list.
     * Simply travese to the second last node of the list and make it next as head.
     * 
     * Case5: K>1 && k< this.size;
     * Simply iterate till k-1th node.
     * 
     * Make the next of k-1th node as current.next.next.
     * 
     * In this case of deletion of the node from the end we have to travese till the second last end of the node and thus 
     * the time complexity is simply 0(k) in worst case.
     */
    deleteKthNode(k) {
        let current = this.head;
        if (this.head === null || k === 0 || k < 0) {
            return;
        }
        if ((k === 1 && this.head.next === this.head) || (k === 1 && this.size === 1)) {
            this.head = null;
        } else if ((k == 1 && this.head.next !== this.head) || (k == 1 && this.size > 1)) {
            this.head.data = current.next.data;
            this.head.next = current.next.next;
        } else if (k === this.size) {
            while (current.next.next !== this.head) {
                current = current.next;
            }
            current.next = this.head;
        } else {
            let cnt = 1;
            while (cnt !== k - 1) {
                cnt++;
                current = current.next;
            }
            current.next = current.next.next;
        }
    }
}
scll = new SinglyCircularLinkedList();
scll.insert(10);
scll.insert(20);
scll.insert(30);
scll.insert(40);
scll.deleteKthNode(2);
scll.print();
// console.log(scll);