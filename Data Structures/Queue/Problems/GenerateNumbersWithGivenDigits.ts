/**So we are given two digits n1 and n2 greater then zero 
 * the task is to get n numbers which has either of the digits or both the digits
 * in increasing order.
 * for ex: d1 = 5, d2 = 6, n=10 
 * so we need to get the 10 numbers in increasing order which has either 5 or 6 or both.
 * 
 * o/p 5,6,55,56,65,66,555,556,565,566. 
 */

/**Approach1: 0(n*d),0(1) 
 * 
 * The approach is to check all the numbers from max of d1 and d2 till be were able to get 10 numbers
 * which has only d1 digits or d2 digits.
 * Ex: we initally push 5 and 6 to res then we start from 6+1 i,e 7 and find all next 8 numbers which
 * has only digit 5 or digit 6.
 * 
 * This means till the length of the res array is not 10.
*/
function isValidNumber(d1: number, d2: number, num: number): boolean {
    while (num > 0) {
        if (num % 10 !== d1 && num % 10 !== d2) {
            return false;
        }
        num = Math.floor(num / 10);
    }
    return true;
}

function getNumbersFromDigits(d1: number, d2: number, n: number): number[] {
    let res: number[] = [];
    res.push(Math.min(d1, d2));
    res.push(Math.max(d1, d2));
    let num = Math.max(d1, d2);
    num++;
    while (res.length < n) {
        if (isValidNumber(d1, d2, num)) {
            res.push(num);
        }
        num++;
    }
    return res;
}

/**
 * Approach: 0(n),0(n);
 * The above approach is very large overhead as we will be checking for all numbers and all digits of
 * these numbers till be find the nth number which has all digits as d1 || d2 which means.
 * In previous approach we had checked from Math.max(d1,d2)+1, i,e 7 till 566 all numbers and checked all their digits.
 * 
 * There is a better approach
 * 
 * So we have two digits d1 & d2. i,e 5 and 6
 * 
 *                                     now if we try n understand then
 *                                                ......
 *                                              |                  |
 *                                              5                  6
 *                                          |         |         |      |
 *                                         55         56       65      66
 *                                    |       |    |     |
 *                                   555     556   565  566
 * 
 * So if we start with 5 and we add 5 to it we get 55, now again we add 6 to it we get 56.
 * Now to 6 if we add 5 we get 65 and we add 6 we get 66.
 * Now to 55 if we add 5 we get 555 and if we add 6 we get 556... and same goes on.
 * 
 * Its forming a kind of pattern that to every parent if we add d1 and d2 we get two childs and then these again can act
 * as parent and we can continue this till we get the total n numbers.
 * 
 * Now we can achieve this using queue.
 * So lets insert 5 and 6 to queue.
 * Now dequeue 5 and push to res now to this 5 add 5 to it so it becomes 55 and also add 6 to it so it becomes 56, 
 * lets enqueue it in a queue.
 * So queue looks like {6,55,56} and res looks like = [5]
 * Now again dequeue from q and push to res so 6 comes out
 * To this 6 add 5 so it becomes 65 and to this 6 add 6 so it becomes 66 enqueue this to q 
 * So queue looks like {55,56,65,66} and res = [5,6]
 * 
 * Stop the process when length of the res and the size of the queue is equal to n.
 *   
 */

class Queue<T> {
    private arr: T[];
    private capacity: number;
    private size: number;
    private rear: number;

    constructor() {
        this.arr = Array.apply(null, Array(100)).map(() => null);
        this.capacity = 100;
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
}

function getNumbersFromDigits1(d1: number, d2: number, n: number): number[] {
    let res: number[] = [];
    let q: Queue<number> = new Queue<number>();
    q.enqueue(Math.min(d1, d2));
    q.enqueue(Math.max(d1, d2));
    let min: string = (Math.min(d1, d2)).toString();
    let max: string = (Math.max(d1, d2)).toString();
    while (q.getSize() + res.length < n) {
        let val = (q.dequeue())?.toString();
        res.push(Number(val));
        q.enqueue(Number(val + min));
        q.enqueue(Number(val + max));
    }
    while (!q.isEmpty()) {
        let val = q.dequeue();
        if (val !== null) {
            res.push(val);
        }
    }
    return res;
}

