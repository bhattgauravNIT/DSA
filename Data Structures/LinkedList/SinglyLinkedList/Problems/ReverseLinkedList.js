/**Given a link list the task is to reverse it. The list should be reversed in place.
 * 
 * Ex: ll = 10->20->30->40->50
 * O/p = 50->40->30->20->10
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
    /**Approach1: 0(n),0(n)
     * 
     * The idea is we will maintain a stack and push all the elements of the linked list into the stack.
     * Now we will travese this stack and keep changing the data of the linked list.
     * 
     * Since stack is will reverse the data so we just place the stack data into the linked list.
     * 
     * clearly we are using additional space thus time complexity is O(n) and space complexity is O(n)
     */
    reverse() {
        if (this.head === null) {
            return
        } else {
            let stack = [];
            let current = this.head;
            while (current !== null) {
                stack.push(current.data);
                current = current.next;
            }
            current = this.head;
            for (let i = stack.length - 1; i >= 0; i--) {
                current.data = stack[i];
                current = current.next;
            }
        }
    }
    /**Approach2: 0(n),0(1)
     * 
     * Ex: 10->20->30->40->50
     * 
     * The idea is to reverse the links something like 
     * 10<-20<-30<-40<-50
     * 
     * Now lets say we have a prevNode and a nextNode and a current node.
     * prevNode is null, nextNode is null and current is head.
     * 
     * Next node should be current.next.
     * Now current.next should be prevNode.
     * Now prev Node should be current and current should be nextNode. 
     * 
     * Lets do a dry run
     * Ex: [10,next]->[20,next]->[30,next]->[40,next]->[50,null]
     * 
     * So prev is null, next is null and current is [10,next]
     * 
     * Now current.next !== null
     * so we change the ndexNode to current.next i.e [20,next]
     * now the current.next should be prev i.e null
     * now prev should be current i.e [10,next]
     * 
     * Move current node to nextNode i.e [20,next].
     */
    reverse() {
        if (this.head === null) {
            return
        } else {
            let current = this.head;
            let nextNode = null;
            let prevNode = null;
            while (current.next !== null) {
                nextNode = current.next;
                current.next = prevNode;
                prevNode = current;
                current = nextNode;
            }
            current.next = prevNode;
            this.head = current;
        }
    }
}

let ll = new LinkedList();
ll.insert(10);
ll.insert(20);
ll.insert(30);
ll.insert(40);
ll.insert(50);
ll.reverse();
ll.print();


