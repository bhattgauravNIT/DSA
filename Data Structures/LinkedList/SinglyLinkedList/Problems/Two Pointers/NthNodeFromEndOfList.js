/**The task is to find nth node from last of a list. N is given and N >= 1 
 * 
 * Ex: 10->20->30->40->50 N= 2 o/p is 40.
 * ex: 10->20->30 N=3 o/p is 10
 * ex: 10->20 N=3 o/p is null
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
    /**Approach: 0(n),0(1)
     * 
     * The idea is assuming we dont know the size of the linked list and there fore we will first find the length of the linked list.
     * Do a travesal of the linked list and find the length of the linked list.
     * 
     * The nth node from the end will simply be the (length - N + 1)th node from the start.
     * If length-N is negative then that node does not exist.
     * Ex: ex: 10->20 N=3 o/p is null clearly 3rd node from end does not exist.
     * 
     * Now we know the position of the node from the start, so we can simply traverse the linked list and find the node.
     * 
     * Clearly we need two travesral to find the node. First ti compute the length, then to reach the len-N+1th node.
     */
    nthNodeFromLast(N) {
        if (this.head === null) {
            return
        } else {
            let current = this.head;
            let len = 0;
            while (current !== null) {
                len++;
                current = current.next;
            }
            if (len - N < 0) return
            let k = len - N + 1;
            current = this.head;
            let cnt = 1;
            while (cnt !== k) {
                current = current.next;
                cnt++;
            }
            console.log(current.data);
        }
    }
    /**Approach2: 0(n),0(1) 
     * 
     * The above approach was using 2 travesal to find the length and then to reach the len-N+1th node.
     * We can do it in single traversal using fast and slow pointer.
     * ex:  10->20->30->40->50 N= 2 
     * 
     * Lets place the fast pointer at the head, once it reaches a poition such that position>N ex: N=2 so make it reach node 3rd,
     * then start a slow pointer.
     * 
     * After this point move both of them one at a time i,e slow = slow.next, fast=fast.next.
     * 
     * So fast reached node 30, now start a slow pointer and move both of them.
     * 
     * fast 30
     * slow 10
     * 
      fast 40
      slow 20

      fast 50
      slow 30

      fast null
      slow 40.

      So 40 is the 2nd last node of ll.

      Note: For cases like 10->20 N=3 maintain a len as well in the same loop if N > len then return .
      If N=0 then also return.
    */
    nthNodeFromLast(N) {
        if (this.head === null) {
            return
        } else {
            if (N === 0) return
            let cnt = 0;
            let fast = this.head;
            let slow = this.head;
            let len = 0;
            while (fast !== null) {
                len++;
                if (cnt < N) {
                    fast = fast.next;
                    cnt++
                } else {
                    fast = fast.next;
                    slow = slow.next;
                }
            }
            if (N > len) return
            console.log(slow.data);
        }
    }
}


let ll = new LinkedList();
ll.insert(10);
ll.insert(20);
ll.insert(30);
// ll.insert(40);
// ll.insert(50);
ll.nthNodeFromLast(1)
