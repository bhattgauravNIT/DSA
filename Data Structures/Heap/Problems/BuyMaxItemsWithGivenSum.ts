/**Given an array which resembels the cost of any ith item, the task is to give the count of
 * the max numbers of items which we can buy for a given amount of sum.
 * 
 * For ex: I/p = [1,12,5,111,200]
 * sum = 10
 * 
 * O/p = 2 
 * 
 * as at max we can can two items of worth 1 & 5. After that we cant buy anything we the remaining amount.
 * 
 * Ex: [20,10,5,30,100]
 * sum = 35
 * 
 * O/p = 3 we can at max buy 3 items of worth 5,10,20
 */

/**Approach1: */
function maxNumberOfBuys(items: number[], sum: number): number {
    let res = 0;
    items = items.sort((a, b) => a - b);
    let exhaustedValue = 0;
    let i = 0;
    while (i < items.length && exhaustedValue + items[i] <= sum) {
        exhaustedValue += items[i];
        i++;
        res++;
    }
    return res;
}

/**Approach2: 0(n),0(1)*/

class PriorityQueue {
    constructor() { }

    getParentIndex(index: number): number | undefined {
        let parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex >= 0) {
            return parentIndex;
        }
    }

    getLeftChildIndex(arr: number[], index: number): number | undefined {
        let leftChildIndex = 2 * index + 1;
        if (leftChildIndex < arr.length) {
            return leftChildIndex;
        }
    }

    getRightChildIndex(arr: number[], index: number): number | undefined {
        let rightChildIndex = 2 * index + 2;
        if (rightChildIndex < arr.length) {
            return rightChildIndex;
        }
    }


    buildHeap(arr: number[]): number[] {
        let nodeIndex = this.getParentIndex(arr.length - 1);
        if (nodeIndex !== undefined) {
            for (let i = nodeIndex; i >= 0; i--) {
                arr = this.minHeapify(arr, i);
            }
        }
        return arr;
    }

    minHeapify(arr: number[], index: number) {
        let leftChildIndex = this.getLeftChildIndex(arr, index);
        let rightChildIndex = this.getRightChildIndex(arr, index);
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
            arr = this.minHeapify(arr, min);
        }
        return arr;
    }

    pop(arr: number[]): { val: number, arr: number[] } | undefined {
        if (arr.length > 0) {
            const val = arr[0];
            arr[0] = arr[arr.length - 1];
            arr.pop();
            arr = this.minHeapify(arr, 0);
            return { val, arr };
        }
    }
}

function maxNumberOfBuys1(items: number[], sum: number): number {
    let pq = new PriorityQueue();
    items = pq.buildHeap(items);
    let res = 0;
    while (sum >= 0 && items.length > 0) {
        const result = pq.pop(items);
        if (result) {
            const { val, arr } = result;
            items = arr;
            if (sum >= val) {
                sum -= val;
                res++;
            } else {
                break;
            }
        } else {
            break;
        }
    }
    return res;
}

maxNumberOfBuys1([91, 20, 4, 6, 100], 30)