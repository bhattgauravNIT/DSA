/**Given a linked list, find the middle of the link list.
 * 
 * ex: 10->5->20->15->25->30 middle is 15
 * ex: 10->5->20->15->25 middle is 20
 * ex: 10->5-> middle is 5
 * ex: 10-> middle is 10
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
    /**Approach1: 0(n),0(1)
     * The approach is based on the fact suppose we dont know the size of the list so we first iterate to end of the
     * list to find its size.
     * Now the middle of the list is size/2+1.
     * 
     * Now we again iterate to the middle of the list and print the data.
     * 
     * Here we are iterating in the list twice so complexity is 0(2n) ~= 0(n).
     */
    middle() {
        if (this.head === null) {
            return;
        } else {
            let current = this.head;
            let cnt = 0;
            while (current !== null) {
                cnt++;
                current = current.next;
            }
            let mid = 1;
            let k = 1;
            mid = Math.floor(cnt / 2) + 1;
            current = this.head;
            while (k !== mid) {
                current = current.next;
                k++;
            }
            console.log(current.data);
        }
    }
    /**Approach2 : 0(n),0(1)
     * The approach is based on the fact that we can use two pointers, slow and fast.
     * This we can achieve only in one single traversal of the list.
     * Ex: Consider odd length list 
     * 
     * 10->5->20->15->25->30
     * 
     * Initially slow and fast both at head. So slow will move one step whereas fast will move two steps.
     * 
     * So lets talk about fast pointer, it will move to 20, then 25
     * Now fast.next is not null however fast.next.next is null so break the loop.
     * At this point slow pointer is at 20 so the middle is slow.next.
     * 
     * Now consider a even length list 
     * 
     * ex: 10->5->20->15->25
     * 
     * so lets talj about fast pointer, it will move to 20, then 25
     * Fast.next is null so break.
     * At this point slow is at 20 so the middle is slow.data.
     */
    middle() {
        if (this.head === null) {
            return;
        } else {
            let slow = this.head;
            let fast = this.head;
            while (fast !== null) {
                if (fast.next === null || fast.next.next == null) {
                    break;
                }
                slow = slow.next;
                fast = fast.next.next;
            }
            if (fast.next === null) {
                console.log(slow.data);
            } else {
                console.log(slow.next.data);
            }
        }
    }
}

let ll = new LinkedList();
ll.insert(10);
ll.insert(5);
ll.insert(20);
ll.insert(15);
ll.insert(25);
ll.insert(30);
ll.middle();
