/**Given a min heap and a index which may or may not be responsible for violation of the minHeap,
 * if this index is responnsible then place this node to its correct position such that the given
 * minHeap can be heapify.
 *
 * If its not violating then no need to do anything as the given minHeap is already heapyfied.
 *
 * Ex:  i/p = [40,20,30,35,25,80,32,100,70,60], index = 0
 * O/p  [20,25,30,35,40,80,32,100,70,60]
 *
 *
 * Ex: i/p = [20,230,38,240,25,40,100] index = 1
 *     o/p = [20,25,38,240,230,40,100]
 *
 */

class MinHeap {
    arr: number[];
    constructor() {
        this.arr = [];
    }

    private getParentIndex(index: number): number | undefined {
        if (this.arr.length === 0 || index === 0) return;
        const parentIndex = Math.floor((index - 1) / 2);
        return parentIndex;
    }

    private getLeftChild(index: number): number | undefined {
        if (this.arr.length === 0) return;
        let leftChildIndex = 2 * index + 1;
        if (leftChildIndex < this.arr.length) {
            return leftChildIndex;
        }
    }

    private getRightChild(index: number): number | undefined {
        if (this.arr.length === 0) return;
        let rightChildIndex = 2 * index + 2;
        if (rightChildIndex < this.arr.length) {
            return rightChildIndex;
        }
    }

    /**
     *
     *  40,20,30,35,25,80,32,100,70,60 , i/p =0
     *
     *                               40
     *                     20                    30
     *             35             25          80     32
     *         100   70         60
     *
     */
    minHeapify(index: number) {
        let leftChildIndex = this.getLeftChild(index);
        let rightChildIndex = this.getRightChild(index);
        let min = index;
        if (leftChildIndex && this.arr[leftChildIndex] < this.arr[index]) {
            min = leftChildIndex;
        }
        if (rightChildIndex && this.arr[rightChildIndex] < this.arr[min]) {
            min = rightChildIndex;
        }
        if (min !== index) {
            this.arr = this.swap(this.arr, index, min);
            this.minHeapify(min);
        }
    }

    private swap(ar: number[], index1: number, index2: number) {
        let temp = ar[index1];
        ar[index1] = ar[index2];
        ar[index2] = temp;
        return ar;
    }
}

let minHeap = new MinHeap();
minHeap.arr = [40, 20, 30, 35, 25, 80, 32, 100, 70, 60];
minHeap.minHeapify(0);
console.log(minHeap.arr);
