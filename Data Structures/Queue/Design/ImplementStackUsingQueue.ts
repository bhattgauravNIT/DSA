/**The task is to implement a stack datastructure with opeartions like push, pop, top, size etc using a queue.
 * So we are given a queue and we need to implement stack's FisrtIn last out .
 * 
 * The idea is simple: we take into consideration two queue. Say q1 and q1.So q1 will always store data and we keep q2 empty.
 * 
 * Now lets say first query is stack.push(10);
 * Now q1 is empty so we simply insert 10 in q1.
 * 
 * Now query is stack.push(20);
 * Now we would simply enqueue 20 into q1 then q1 will look like {10,20} as queue is first in and first out now if we
 * wish to pop from stack the idea answer would be 20, but with this arrangement in q1 sincve queue gives from front
 * the answer will be 10 which is wrong thus we need to place this stack.push(20), in front of the queue.
 * 
 * So ideally our queue should look like {20,10}. Thus in order to achieve this arrangement we use a auxilary queue q2.
 * So first we put everything which is in q1 into q2 and make q1 empty.
 * 
 * q1 = {}
 * q2 = {10}
 * 
 * Now we enqueue 20 in q1 so arrangement lokks like
 * q1= {20}
 * q2={10}
 * 
 * now we place everything from q2 to q1 so the arrangement looks like:
 * q1={20,10}
 * q2={}.
 * 
 * Now again say we need to push stack.push(30) we again do the same take everything out from q1 and place in q2 
 * the arrangement will look like
 * 
 * q1 = {}
 * q2 = {20,10}
 * 
 * Now we enqueue 30 into q1 and place everything back from q2 to q1. The arrangement looks like
 * q1 = {30,20,10}
 * q2 = {}
 * 
 * Now say we need to pop so we simply dequeue from q1 i,e 30. Which is correct stack LastIn first out .
*/


class Queue<T> {
    private arr: T[];
    private capacity: number;
    private size: number;
    private rear: number;

    constructor() {
        this.arr = Array.apply(null, Array(10)).map(() => null);
        this.capacity = 10;
        this.size = 0;
        this.rear = -1;
    }

    enqueue(data: T): void {
        if (this.size === this.capacity) {
            return
        } else {
            this.rear++;
            this.arr[this.rear] = data;
        }
        this.size++;
    }

    dequeue(): T | null {
        if (this.size === 0) return null;
        const res = this.arr[0];
        for (let i = 1; i < this.arr.length; i++) {
            this.arr[i - 1] = this.arr[i];
        }
        this.rear--;
        this.size--;
        return res;
    }

    getSize(): number {
        return this.size;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    getFront(): T | null {
        if (this.size > 0) {
            return this.arr[0];
        }
        return null;
    }
}

class Stack<T> {
    private q1: Queue<T>;
    private q2: Queue<T>;
    constructor() {
        this.q1 = new Queue<T>();
        this.q2 = new Queue<T>();
    }
    push(data: T): void {
        if (this.q1.getSize() === 0) {
            this.q1.enqueue(data);
        } else {
            while (!this.q1.isEmpty()) {
                const val = this.q1.dequeue();
                if (val !== null) {
                    this.q2.enqueue(val);
                }
            }
            this.q1.enqueue(data);
            while (!this.q2.isEmpty()) {
                const val = this.q2.dequeue();
                if (val !== null) {
                    this.q1.enqueue(val);
                }
            }
        }
    }

    pop(): T | null {
        return this.q1.dequeue();
    }

    top(): T | null {
        return this.q1.getFront();
    }

    size(): number {
        return this.q1.getSize();
    }
}

let s = new Stack<number>();
s.push(10);
s.push(20);
s.push(30);
console.log(s.pop());
console.log(s.top());

/**Note:
 * 
 * The idea to implement queue using stack will also remain the same
 * We need to use 2 stacks.
 * 
 * Pushing:
 * If s1 is empty we will directly push to stack, however if the s1 is not empty we will
 * keeping poping from s1 and pushing to s2.
 * Once s1 is empty then we push data into it and then will keep poping and pushing from s2 to s1.
 * 
 * So idea is always keep s2 empty and in case of push simply first empty s1, push new data and then empty s2 into s1.
 * 
 * So push operation will be 0(n), whereas pop will simply be poping the top element from the s1. Thus its 0(1).
 */