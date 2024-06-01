/**The task is to reverse a queue.For example queue is having elements like
 * {10,20,30,40,50} so after reversing the queue it should become {50,40,30,20,10}.
 * 
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

    /**
     * Approach: 0(n),0(n)
     * 
     * In order to reverse the queue we can simply use a stack.
     * For example q1 = {10,20,30,40,50}
     * Now we push everything to a stack so stack becomes s = [10,20,30,40,50] and q becomes {}.
     * Now we simple enque into the q from the end of this s ie, 50,40,30,20,10.
     */
    reverse(q: Queue<T>) {
        let stack: T[] = [];
        while (!q.isEmpty()) {
            let val = q.dequeue();
            if (val !== null) {
                stack.push(val);
            }
        }
        for (let i = stack.length - 1; i >= 0; i--) {
            q.enqueue(stack[i]);
        }
    }

    /**Approach2: 0(n),0(n)
     * 
     * Instead of using a seperate stack we can use build in call stack of the complier
     * and use it to reverse the queue.
     */
    reverse1(q: Queue<T>) {
        if (q.isEmpty()) return;
        const val = q.dequeue();
        this.reverse1(q);
        if (val !== null) {
            q.enqueue(val);
        }
    }
}
