/**Given k sorted arrays inside a main array, the task is to merge them to get one single sorted array.
 * 
 * For ex: 
 *      arr = [
 *             [10,20,30],
 *             [5,15],
 *             [1,9,11,18]
 *            ]
 * 
 *     o/p = [1,9,10,11,15,18,20,30];
 */

/**
 * Approach1: 0(n*Klog(n*k)), 0(n*k)
 * 
 * where n is the max number of elements is the array or the max length of the inner array present in main array and
 * k is the length of the mainArray.
*/
function mergeKSortedArray(arr) {
    let res: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            res.push(arr[i][j]);
        }
    }
    return res.sort((a, b) => a - b);
}

/**Approach2:
 * 
 */

class PriorityQueue {
    res: Array<{ value: number, rowIndex: number, columnIndex: number }>;
    constructor() {
        this.res = [];
    }

    private getParentIndex(index: number): number | undefined {
        if (this.res.length === 0 || index === 0) return;
        const parentIndex = Math.floor((index - 1) / 2);
        return parentIndex;
    }

    private getLeftChild(index: number): number | undefined {
        if (this.res.length === 0) return;
        let leftChildIndex = 2 * index + 1;
        if (leftChildIndex < this.res.length) {
            return leftChildIndex;
        }
    }

    private getRightChild(index: number): number | undefined {
        if (this.res.length === 0) return;
        let rightChildIndex = 2 * index + 2;
        if (rightChildIndex < this.res.length) {
            return rightChildIndex;
        }
    }

    insert(value: number, rowIndex: number, columnIndex: number) {
        const item = { value, rowIndex, columnIndex };
        this.res.push(item);
        let index = this.res.length - 1;
        while (index > 0) {
            let parentindex = this.getParentIndex(index);
            if (parentindex !== undefined && this.res[index].value < this.res[parentindex].value) {
                let temp = this.res[index];
                this.res[index] = this.res[parentindex];
                this.res[parentindex] = temp;
                index = parentindex;
            } else {
                return;
            }
        }
    }

    pop() {
        if (this.res.length === 0) return;
        if (this.res.length === 1) {
            return this.res.pop();
        }
        this.res = this.swap(this.res, 0, this.res.length - 1);
        const val = this.res[this.res.length - 1];
        this.res.pop();
        this.minHeapify(0);
        return val;
    }

    private minHeapify(index: number) {
        let leftChildIndex = this.getLeftChild(index);
        let rightChildIndex = this.getRightChild(index);
        let min = index;
        if (leftChildIndex && this.res[leftChildIndex].value < this.res[index].value) {
            min = leftChildIndex;
        }
        if (rightChildIndex && this.res[rightChildIndex].value < this.res[min].value) {
            min = rightChildIndex;
        }
        if (index !== min) {
            this.res = this.swap(this.res, index, min);
            this.minHeapify(min);
        }
    }

    private swap(ar, index1: number, index2: number) {
        let temp = ar[index1];
        ar[index1] = ar[index2];
        ar[index2] = temp;
        return ar;
    }

    isEmpty(): boolean {
        return this.res.length === 0;
    }
}


function mergeKSortedArray1(arr) {
    let pq = new PriorityQueue();
    for (let i = 0; i < arr.length; i++) {
        pq.insert(arr[i][0], i, 0);
    }
    let sortedArr: number[] = [];

    while (!pq.isEmpty()) {
        const item = pq.pop();
        if (item !== undefined) {
            sortedArr.push(item.value);
            let rowIndex = item.rowIndex;
            let columnIndex = item.columnIndex;
            if (columnIndex + 1 < arr[rowIndex].length) {
                pq.insert(arr[rowIndex][columnIndex + 1], rowIndex, columnIndex + 1)
            }
        }
    }
    return sortedArr;

}

console.log(mergeKSortedArray1([
    [10, 20, 30],
    [5, 15],
    [1, 9, 11, 18]
]))


