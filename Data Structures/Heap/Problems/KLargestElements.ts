/**Given a array arr and a value k, the task is to print total k largest elements of this array
 * 
 * EX: I/p = [5,15,10,20,8]
 *     k = 2   
 *     o/p : 15,20
 * 
 *    I/p = [8,6,4,10,9]
 *    k = 3
 *    o/p : 8,9,10
 */

/**Approach1: 0(nlogn)+ 0(k),0(1)
 * 
 * This approach is based on the case that we simply sort the array ex: i/p array is 
 * [5,15,10,20,8]
 * 
 * So we sort the array so it becomes:
 * 
 *   [20,15,10,8,5]
 * 
 * So k=2 largest elements will simply be 20 and 15 .
 * 
 *  Now the total k largest elements in the array will simply be  20.15.
 * 
 * Time complexity analysis:
 * 1) Sort the array: n*log(n).
 * 2) Iterate over k elements of the sorted array 0(k).
 */
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
 *         
 * Lets understand this with the help of an example:
 * I/p = [5,15,10,20,8]
 *     k = 2   
 * 
 * We will be creating a priority queue which internally will be a maxHeap so the maxHeap will look like:
 * 
 *                          20
 *                     15       10
 *                8       5
 * 
 * Now we keep poping from the priority queue till we have poped k elements.
 * 
 * Time complexity:
 * 
 *     First we will create a max heap from the input array.
 *     In oder to create a max heap we will find the lastInnerParent ie, if we look at binary tree representation of [5,15,10,20,8]
 *     it will be something like:
 *                                               5
 *                                      15                10
 *                               20          8 
 * 
 * Last innerParentNode is at index 2 i,e 10.
 * So we suspect this as the node which is disobeying the property of maxHeap and then once its sorted then we call for index 1 
 * and then index 0.
 * 
 * So we can say some n nodes  are calling maxHeapify i,e n*log(n).
 * 
 * Now we extract k elements from the maxHeap i,e klog(k).
 * 
 * So time complexity is n*log(n)+ klog(k). 
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