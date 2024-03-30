/**Given a doubly linked list the task is to reverse the doubly linked list.
 * 
 * Ex: dll = 10->20->30->40
 * o/P 40->30->20->10.
 */

class Node {
    constructor(data, prev = null, next = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}
class DoublyLinkedList {
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
            while (current.next) {
                current = current.next;
            }
            node.prev = current;
            current.next = node;
        }
    }
    print() {
        if (this.head === null) {
            return
        } else {
            let current = this.head;
            while (current !== null) {
                console.log(current.data);
                current = current.next;
            }
        }
    }
    /**Note that this approach is wrong because althrough we got res 40,30,20,10 for a doubly linked list
     * 10,20,30,40 but however we have not changed the pointer, so if someone again prints the dll after reverse is
     * being called than still it will be 10,20,30,40. Since dll is ideally/internally not reversed.
     */
    // reverse() {
    //     if (this.head === null) {
    //         return;
    //     } else {
    //         let stack = [];
    //         let current = this.head;
    //         while (current != null) {
    //             stack.push(current.data);
    //             current = current.next;
    //         }
    //         for (let i = stack.length - 1; i >= 0; i--) {
    //             console.log(stack[i]);
    //         }
    //     }
    // }
}
let dll = new DoublyLinkedList();
dll.insert(10);
dll.insert(20);
dll.insert(30);
dll.insert(40);
dll.print();
console.log('reverse');
dll.reverse();