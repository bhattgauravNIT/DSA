/**The task is to create a queue using a linked list and implement operations like
 * enqueue, dequeue, size, getFront, getRear, isEmpty.
 * 
 * Enqueue: In order to insert a element in a linked list at rear of a linked list we maintain a tail
 * pointer so that we can directly insert new node at next of current tail and update the current tail.
 * This will help us to get this enqueue opeartion in 0(1) time complexity.
 * 
 * Dequeue: Since in queue we take out from the front thus we simply need to update the head to head.next.
 * This is a 0(1) opeartion.
 * 
 * Size: simply maintain a size varibale to return the current size of the queue.
 * 
 * getFront(): This will simply return the data of the head node. 0(1)
 * 
 * getRear(): This will simply return the data of the tail node. 0(1).
 */

class ListNode<T> {
    data: T;
    next: ListNode<T> | null;
    constructor(data: T, next: ListNode<T> | null = null) {
        this.data = data;
        this.next = next;
    }
}

class Queue<T> {
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;
    private sizeList: number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.sizeList = 0;
    }

    /**Approach: 0(1) */
    enqueue(data: T): void {
        let node = new ListNode<T>(data);
        if (this.head === null && this.tail === null) {
            this.head = node;
            this.tail = node;
        } else {
            if (this.tail !== null) {
                this.tail.next = node;
                this.tail = this.tail.next;
            }
        }
        this.sizeList++;
    }

    /**Approach: 0(1) */
    dequeue(): T | null {
        if (this.head === null) {
            return null;
        }
        const val = this.head.data;
        this.head = this.head.next;
        if (this.head === null) {
            this.tail = null;
        }
        this.sizeList--;
        return val;
    }

    /**Approach: 0(1) */
    size(): number {
        return this.sizeList;
    }

    /**Approach: 0(1) */
    getFront(): T | null {
        if (this.head === null) return null;
        return this.head.data;
    }

    /**Approach: 0(1) */
    getRear(): T | null {
        if (this.tail === null) {
            return null;
        }
        return this.tail.data;
    }

    /**Approach: 0(1) */
    isEmpty(): boolean {
        return this.sizeList === 0;
    }
}


let q = new Queue<number>;
q.enqueue(10);
q.enqueue(20);
q.enqueue(30);
q.dequeue();
q.dequeue();
q.dequeue();


