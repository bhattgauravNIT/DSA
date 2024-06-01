/**The implementation of stack using linked list to achieve stack operations
 * like push, pop , peek etc in 0(1) time complexity
 * and thus in order to achieve that we only insert anything at the head and thus in this way
 * elements keeps on pushing towards back in linked list and we are able to achive it in 0(1).
 * 
 * Ex: we said 
 * s.push(10);
 * s.push(20);
 * s.push(30);
 * 
 * Now intially the 10 will be inserted at head of linked list
 * 
 * Head -> [10,null]
 * 
 * Then
 * 
 * linked list will change like
 * 
 * Head -> [20,next] -> [10,null];
 * 
 * then
 * 
 * linked list will again gets changed like
 * 
 * Head -> [30,next] -> [20,next] -> [10,null];
 * 
 * Now if we wish to pop so we pop 30 i,e the head node 
 * and peek also gives the value of the head node.
 */
class ListNode<T>{
    data: T;
    next: ListNode<T> | null;
    constructor(data: T, next: ListNode<T> | null = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList<T>{
    head: ListNode<T> | null;
    size: number;
    constructor() {
        this.head = null;
        this.size = 0;
    }
}

class Stack<T> {
    ll: LinkedList<T>;

    constructor() {
        this.ll = new LinkedList<T>();
    }

    /**Approach: 0(1)
     * 
     * Since we keep inserting at head of the linked list and thus it works in 0(1)
     * watch out for case if head is null then insert node at head.
     * 
     * If head is not null, insert node at head node.
     */
    push(value: T): void {
        let node = new ListNode<T>(value);
        if (this.ll.head === null) {
            this.ll.head = node;
        } else {
            node.next = this.ll.head;
            this.ll.head = node;
        }
        this.ll.size++;
    }

    /**Approach: 0(1)
     * 
     * Simply return the head data in case head exists else return undefined.
     */
    peek(): T | undefined {
        if (this.ll.head === null) {
            return undefined;
        } else {
            return this.ll.head.data;
        }
    }

    /**Approach: 0(1)
     * 
     * We need to remove the head and make head.next as the new head.
     * WEatch out for the case when the list only have one node in that case if we do
     * the pop opeartion than simply we need to make this head node as null.
     */
    pop(): T | undefined {
        if (this.ll.head === null) {
            return undefined;
        } else {
            this.ll.size--;
            if (this.ll.head.next !== null) {
                this.ll.head = this.ll.head.next;
                return this.ll.head.data;
            } else {
                this.ll.head = null;
                return undefined;
            }
        }
    }

    /**Approach: 0(1)
     * 
     * Simply return the size of the list.
     */
    size(): number {
        return this.ll.size;
    }

    /**Approach: 0(1)
     * 
     * If the size is 0 means that list is empty thus return true
     * else return false.
     */
    isEmpty(): boolean {
        return this.ll.size === 0;
    }
}

let s1 = new Stack<number>();
s1.push(10);
s1.push(20);
s1.push(30);
console.log(s1.peek());
s1.pop();
console.log(s1.peek());
s1.pop();
console.log(s1.peek());
s1.pop();
console.log(s1.peek());
console.log(s1.size());
console.log(s1.isEmpty());

