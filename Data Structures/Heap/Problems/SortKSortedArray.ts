/**Given a input array and a value k, any index value in the given array can be placed from i=i-k to i=i+k provided
 * i-k >=0 and i+k <= arr.length-1.
 * 
 * The task is to correctly sort the array.
 * 
 *  A k sorted array is a array in which a element is atmost k position away from its actual targeted value.
    Ex: arr = [9,8,7,18,19,17], k =2
    So the actual sorted array is [7,8,9,17,18,19]
    If we look at 7 then actually its at index 2 and its ideal position is 0, i,e its k position
    deviated away from its actual target position.
 * 
 * Ex: arr = [9,8,7,18,19,17]
 *     k = 2
 * 
 * o/p : [7,8,9,17,18,19]
 * 
  */

/**Approach: 0(nlogn),0(1) */
function sortKSortedArray(arr: number[], k: number): number[] {
    return arr.sort((a, b) => a - b);
}


/**Approach2: 
 * 
 * Lets understand this with the help of an example.
 * arr = [9,8,7,18,19,17] and k=2.
 * 
 * So constraint is at this array is being formed in such a way that
 *  any given index can be placed anywhere from i=i-k to i=i+k to make this array sorted.
 * 
 * We need to sort this array.
 * 
 * So we will be using a priority queue which will have an internal implementation of a minHeap.
 * 
 * First place k elements in the priority queue.
 * 
 * So the minHeap looks like: [9,8,7,18,19,17] where k elements are 9,8
 * 
 *                      8
 *               9
 * 
 * Now we itearte over k+1 elements till the last element in the array.
 * First we pop from the priority queue.
 * 
 * 8.
 * 
 * Now we initiate a index = 0.
 * And place this popped item in index. ie, arr[0] = 8.
 * Now we place ith element in the pQ.
 * and increment index.
 * 
 * So arr = [8,8,7,18,19,17]
 * heap looks like:
 * 
 *                     7
 *               9
 * 
 * 
 * and so on.... 
 * 
 *                      
 */
class PriorityQueue<T> {
    private arr: T[];
    constructor() {
        this.arr = [];
    }

    private getParentIndex(index: number): number | undefined {
        let parentIndex = Math.floor((index - 1) / 2);
        if (index > 0) {
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
        let rightChildIndex = 2 * index + 2;
        if (rightChildIndex < this.arr.length) {
            return rightChildIndex;
        }
    }

    add(value: T): void {
        this.arr.push(value);
        let currentIndex = this.arr.length - 1;
        while (currentIndex > 0) {
            let parentIndex = this.getParentIndex(currentIndex);
            if (parentIndex !== undefined && this.arr[currentIndex] < this.arr[parentIndex]) {
                let temp = this.arr[currentIndex];
                this.arr[currentIndex] = this.arr[parentIndex];
                this.arr[parentIndex] = temp;
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    peek(): T | undefined {
        if (this.arr.length > 0) {
            return this.arr[0];
        }
    }

    pop(): T | undefined {
        if (this.arr.length > 0) {
            const val = this.arr[0];
            this.arr[0] = this.arr[this.arr.length - 1];
            this.arr.pop();
            this.minHeapfify(0);
            return val;
        }
    }

    private minHeapfify(index: number): void {
        let leftChildIndex = this.getLeftChildIndex(index);
        let rightChildIndex = this.getRightChildIndex(index);
        let min = index;
        if (leftChildIndex && this.arr[leftChildIndex] < this.arr[index]) {
            min = leftChildIndex;
        }
        if (rightChildIndex && this.arr[rightChildIndex] < this.arr[min]) {
            min = rightChildIndex;
        }
        if (index !== min) {
            let temp = this.arr[index];
            this.arr[index] = this.arr[min];
            this.arr[min] = temp;
            this.minHeapfify(min);
        }
    }

    isEmpty(): boolean {
        return this.arr.length === 0;
    }
}

function sortKSortedArray1(arr: number[], k: number): number[] {
    let pq = new PriorityQueue<number>();
    let index = 0;
    for (let i = 0; i <= k; i++) {
        pq.add(arr[i]);
    }
    for (let i = k + 1; i < arr.length; i++) {
        const val = pq.pop();
        if (val !== undefined) {
            arr[index++] = val;
            pq.add(arr[i]);
        }
    }
    while (!pq.isEmpty()) {
        const val = pq.pop();
        if (val !== undefined) {
            arr[index++] = val;
        }
    }
    return arr;
}