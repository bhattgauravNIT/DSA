/**Given a array arr and a value k, the task is to print k largest elements of this array
 * 
 * EX: I/p = [5,15,10,20,8]
 *     k = 2   
 *     o/p : 15,20
 * 
 *    I/p = [8,6,4,10,9]
 *    k = 3
 *    o/p : 8,9,10
 */

/**Approach1: 0(nlogn),0(1) */
function kLargestElements(arr: number[], k: number): number[] {
    let res: number[] = [];
    arr = arr.sort((a, b) => a - b);
    for (let i = arr.length - 1; i >= 0; i--) {
        if (res.length < k) {
            res.push(arr[i]);
        }
    }
    return res;
}

/**
 * Approach2:
 *               10
 *           9        8
 *       4       6
 */

class PriorityQueue {
    constructor() { };

    getParentIndex(index: number): number | undefined {
        const parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex >= 0) {
            return parentIndex;
        }

    }

    getLeftChildIndex(index: number, arr: number[]): number | undefined {
        let leftChildIndex = 2 * index + 1;
        if (leftChildIndex < arr.length) {
            return leftChildIndex;
        }
    }

    getRightChildIndex(index: number, arr: number[]): number | undefined {
        let leftRightIndex = 2 * index + 2;
        if (leftRightIndex < arr.length) {
            return leftRightIndex;
        }
    }

    buildMaxHeap(ar: number[]): number[] {
        let lastParentNodeIndex = this.getParentIndex(ar.length - 1);
        if (lastParentNodeIndex !== undefined) {
            for (let i = lastParentNodeIndex; i >= 0; i--) {
                ar = this.maxHeapify(i, ar);
            }
        }
        return ar;
    }

    maxHeapify(index: number, arr: number[]): number[] {
        let leftChildIndex = this.getLeftChildIndex(index, arr);
        let rightChildIndex = this.getRightChildIndex(index, arr);
        let max = index;
        if (leftChildIndex !== undefined && arr[leftChildIndex] > arr[index]) {
            max = leftChildIndex;
        }
        if (rightChildIndex !== undefined && arr[rightChildIndex] > arr[max]) {
            max = rightChildIndex;
        }
        if (max !== index) {
            let temp = arr[index];
            arr[index] = arr[max];
            arr[max] = temp;
            arr = this.maxHeapify(max, arr);
        }
        return arr;
    }

    pop(arr: number[]): number {
        const val = arr[0];
        arr[0] = arr[arr.length - 1];
        arr.pop();
        arr = this.maxHeapify(0, arr);
        return val;
    }

}

function kLargestElements1(arr: number[], k: number): number[] {
    let pq = new PriorityQueue();
    let res: number[] = [];
    arr = pq.buildMaxHeap(arr);
    let i = 1;
    while (i <= k) {
        const val = pq.pop(arr);
        if (val !== undefined) {
            res.push(val);
        }
        i++;
    }
    return res;
}

/**
 * 
 * Approach3:
 */

class PriorityQueue1 {
    constructor() { };

    getParentIndex(index: number): number | undefined {
        const parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex >= 0) {
            return parentIndex;
        }

    }

    getLeftChildIndex(index: number, arr: number[]): number | undefined {
        let leftChildIndex = 2 * index + 1;
        if (leftChildIndex < arr.length) {
            return leftChildIndex;
        }
    }

    getRightChildIndex(index: number, arr: number[]): number | undefined {
        let leftRightIndex = 2 * index + 2;
        if (leftRightIndex < arr.length) {
            return leftRightIndex;
        }
    }

    buildMinHeap(ar: number[]): number[] {
        let lastParentNodeIndex = this.getParentIndex(ar.length - 1);
        if (lastParentNodeIndex !== undefined) {
            for (let i = lastParentNodeIndex; i >= 0; i--) {
                ar = this.minHeapify(i, ar);
            }
        }
        return ar;
    }

    minHeapify(index: number, arr: number[]): number[] {
        let leftChildIndex = this.getLeftChildIndex(index, arr);
        let rightChildIndex = this.getRightChildIndex(index, arr);
        let min = index;
        if (leftChildIndex !== undefined && arr[leftChildIndex] < arr[index]) {
            min = leftChildIndex;
        }
        if (rightChildIndex !== undefined && arr[rightChildIndex] < arr[min]) {
            min = rightChildIndex;
        }
        if (min !== index) {
            let temp = arr[index];
            arr[index] = arr[min];
            arr[min] = temp;
            arr = this.minHeapify(min, arr);
        }
        return arr;
    }

    pop(arr: number[]): number {
        const val = arr[0];
        arr[0] = arr[arr.length - 1];
        arr.pop();
        arr = this.minHeapify(0, arr);
        return val;
    }
}

function kLargestElements2(arr: number[], k: number): number[] {
    let pq = new PriorityQueue1();
    let res: number[] = [];
    for (let i = 0; i < k; i++) {
        res.push(arr[i]);
    }
    res = pq.buildMinHeap(res);
    for (let i = k; i < arr.length; i++) {
        const top = res[0];
        if (top < arr[i]) {
            pq.pop(res);
            res.push(arr[i]);
            res = pq.buildMinHeap(res);
        }
    }
    return res;
}

console.log(kLargestElements1([8, 6, 4, 10, 9], 3))