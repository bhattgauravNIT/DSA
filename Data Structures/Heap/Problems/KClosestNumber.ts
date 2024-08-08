/**Given an array arr , a value x and a value k. We need to give k closest values to x in the arr.
 * 
 * For ex: arr = [10,15,7,3,4];
 *          x = 8
 *          k = 2
 * 
 * So 2 closest numbers to 8 in the arr is [7,10]
 * 
 * For ex: arr = [100,80,10,5,70]
 *         x = 2
 *         k = 3
 *  So 3 closest number to 2 in arr is [5,10,70]
 */

/**Approach1: nLog(n),0(n)
 * 
 * 
 */

function kClosestNumber(arr: number[], x: number, k: number) {
    let mp = new Map<number, number>();
    let res: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        mp.set(Math.abs(arr[i] - x), arr[i]);
    }
    const sortedArray = Array.from(mp.entries()).sort(([keyA], [keyB]) => keyA - keyB);
    const sortedMap = new Map(sortedArray);
    let i = 1;
    for (const [, value] of sortedMap) {
        if (i <= k) {
            res.push(value);
            i++;
        } else {
            break;
        }
    }
    return res;
}

/**Approach2: 0(n*k), 0(n) */
function kClosestNumber1(arr: number[], x: number, k: number) {
    let visited: boolean[] = [];
    let res: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        visited[i] = false;
    }

    for (let i = 0; i < k; i++) {
        let minDist = Number.MAX_SAFE_INTEGER;
        let minIndex = -1;
        for (let j = 0; j < arr.length; j++) {
            if (!visited[j] && Math.abs(arr[j] - x) <= minDist) {
                minDist = Math.abs(arr[j] - x);
                minIndex = j;
            }
        }
        visited[minIndex] = true;
        res.push(arr[minIndex]);
    }

    return res;
}

/**Approach3:
 * 
 * 
 *     
 */

class PriorityQueue {
    arr: Array<{ minDist: number, index: number }>;
    constructor() {
        this.arr = [];
    }

    private getParentIndex(index: number): number | undefined {
        const parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex >= 0) {
            return parentIndex;
        }

    }

    private getLeftChildIndex(index: number): number | undefined {
        let leftChildIndex = 2 * index + 1;
        if (leftChildIndex < this.arr.length) {
            return leftChildIndex;
        }
    }

    private getRightChildIndex(index: number): number | undefined {
        let leftRightIndex = 2 * index + 2;
        if (leftRightIndex < this.arr.length) {
            return leftRightIndex;
        }
    }


    push(minDist: number, index: number) {
        const val = { minDist, index };
        this.arr.push(val);
        if (this.arr.length === 1) return;
        let temp = this.arr[this.arr.length - 1];
        this.arr[this.arr.length - 1] = this.arr[0];
        this.arr[0] = temp;
        this.maxHeapify(0);
    }

    peek() {
        return this.arr[0];
    }

    pop() {
        const val = this.arr[0];
        this.arr[0] = this.arr[this.arr.length - 1];
        this.arr.pop();
        this.maxHeapify(0);
        return val;
    }

    isEmpty() {
        return this.arr.length === 0;
    }

    private maxHeapify(index: number) {
        let leftChildIndex = this.getLeftChildIndex(index);
        let rightChildIndex = this.getRightChildIndex(index);
        let max = index;
        if (leftChildIndex !== undefined && this.arr[leftChildIndex].minDist > this.arr[index].minDist) {
            max = leftChildIndex;
        }
        if (rightChildIndex !== undefined && this.arr[rightChildIndex].minDist > this.arr[max].minDist) {
            max = rightChildIndex;
        }
        if (max !== index) {
            let temp = this.arr[index];
            this.arr[index] = this.arr[max];
            this.arr[max] = temp;
            this.maxHeapify(max);
        }
    }
}

function kClosestNumber2(arr: number[], x: number, k: number): number[] {
    let pq = new PriorityQueue();
    const res: number[] = [];
    for (let i = 0; i < k; i++) {
        pq.push(Math.abs(arr[i] - x), i);
    }
    for (let i = k; i < arr.length; i++) {
        const val = pq.peek();
        if (val.minDist > Math.abs(arr[i] - x)) {
            pq.pop();
            pq.push(Math.abs(arr[i] - x), i);
        }
    }
    while (!pq.isEmpty()) {
        res.push(arr[pq.pop().index]);
    }
    return res;

}


console.log(kClosestNumber([10, 15, 7, 3, 4], 8, 2));




