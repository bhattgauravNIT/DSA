/**Queue class is based on First In and first out. 
 * 
 * The task is to create a class of queue which has a capacity of 10.
 * 
 * Implement methods like enqueue, dequeue, isEmpty, isFull, getFront, getRear.
 * 
 * Enqueue method is used to push a element into a queue. So if a array is used we can simply push element to the array which is
 * 0(1) time complexity.
 * We maintain a rear pointer and simply make this.arr[this.rear] = data;
 * 
 * Dequeue operation in  queue is removing the first elment from the queue and thus in array operartion its 0(n) time complexity.
 * We shift all the elements towards left one side and thus removes the first element from the queue.
 * 
 * getFront()
 * It should give the first element of the queue which is simple arr[0] and thus its 0(1) time complexity.
 * 
 * getRear()
 * It should give the last element of the queue or at which the rear is currently poiting to. which is arr[rear] and thus its simply 0(1) time complexity.
 * 
 * isEmpty() 
 * It sees that if the size of the array is 0. simply 0(1)
 * 
 * isFull()
 * it sees that wether the current size of the queue is equal to the entire capacity of the queue. simply 0(1).
 */

/**Approach1 */
class Queue<T> {
    private arr: T[] | null[];
    private capacity: number;
    private size: number;
    private rear: number;

    constructor() {
        this.arr = Array.apply(null, Array(10))
            .map(() => null);

        this.capacity = 10;
        this.size = 0;
        this.rear = -1;
    }

    /**Approach: 0(1) */
    enqueue(data: T | null): void {
        if (this.size === this.capacity) return;
        this.rear++;
        this.arr[this.rear] = data;
        this.size++;
    }

    /**Approach: 0(n) */
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

    /**Approach: 0(1) */
    isEmpty(): boolean {
        return this.size === 0;
    }

    /**Approach: 0(1) */
    isFull(): boolean {
        return this.size === this.capacity;
    }

    /**Approach: 0(1) */
    getFront(): T | null {
        return this.arr[0];
    }

    /**Approach: 0(1) */
    getRear(): T | null {
        return this.arr[this.rear];
    }
}

let q = new Queue<number>();
q.enqueue(10);
q.enqueue(20);
q.enqueue(30);
q.enqueue(40);
q.enqueue(50);
q.enqueue(60);
q.enqueue(70);
q.enqueue(80);
q.enqueue(90);
q.enqueue(100);
console.log(q.isEmpty());
console.log(q.isFull());
console.log(q.getFront());
console.log(q.getRear());


/**Approach2
 * 
 * The problem with the above approach was that the dequeue opeartion was of 0(n) time complexity although apart from that all
 * opeartions were of 0(1) time complexity.
 * Since in previous approach we always deque from the front i,e 0th index and thus in a way if we had a front pointer than we are always maintaining
 * it at 0th index and thus while dequeing we have to shift everything towards left so that front is always starting index 0. However if we can bypass 
 * this way then we can achiever dequieng in 0(1) time complexity.
 * 
 * So the idea is to use a kind of circular array. 
 * 
 * Ex: say initailly arr = [null,null,null,null,null] with a 5 capacity.
 * Now we enqueue 10 so front was at -1 and rear at -1. We move rear as (rear+1)%capacity and rear becomes 0 we push arr[0] with data.
 * Since the front was -1 so we increase front.
 * 
 * Now simply we keep pushing with help of rear. 
 * 
 * Now front and rear are equal.
 * 
 * Say we push again so we simply increment rear as (rear+1)%capacity and pushed using rear. Say now the arr lokks like
 * 
 * [10,20, null, null, null] with front as 10 and rear as 20.
 * 
 * Now we dequeue so we will make front as null and now we shift front to (front+1)%capacity now front is 20 and rear is also 20.
 * so arr lokks like
 * 
 * [null,20, null, null, null]
 * 
 * Say we enqued 3 more items now.
 * 
 * [null,20, 30, 40, 50] front is 20 and rear is 50.
 * 
 * Now if we wish to push one more item we make rear as (rear+1)%capacity = (4+1)%5 = 0.
 * Since here the size is not equal to capacity thus we can push one more element at index 0 .
 * 
 * 
 */

class Queue1<T> {
    private arr: (T | undefined)[];
    private capacity: number;
    private size: number;
    private front: number;
    private rear: number;

    constructor(capacity: number = 100) {
        this.arr = new Array<T | undefined>(capacity).fill(undefined);
        this.capacity = capacity;
        this.size = 0;
        this.front = 0;
        this.rear = -1;
    }

    enqueue(data: T): void {
        if (this.isFull()) return;
        this.rear = (this.rear + 1) % this.capacity;
        this.arr[this.rear] = data;
        this.size++;
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) return undefined;
        const data = this.arr[this.front];
        this.arr[this.front] = undefined;
        this.front = (this.front + 1) % this.capacity;
        this.size--;
        return data;
    }

    getFront(): T | undefined {
        if (this.isEmpty()) return undefined;
        return this.arr[this.front];
    }

    getRear(): T | undefined {
        if (this.isEmpty()) return undefined;
        return this.arr[this.rear];
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    isFull(): boolean {
        return this.size === this.capacity;
    }
}