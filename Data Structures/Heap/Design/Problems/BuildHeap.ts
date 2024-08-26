/**Given the random number values array the task is to build a min binary heap out of it.
 * 
 * For ex: I/p arr = [10,5,20,2,4,8]
 * O/p = [2,4,8,5,10,20]
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

    /**Approach1:
     * 
     * Lets understand this with the help of an example
     * 
     * I/p arr = [10,5,20,2,4,8]
     * We need to convert this into a min heap.
     * 
     * So the approach is to iterate over every element of this given input array and place the value at right index.
     * So we iterate over the input arr.
     * 
     * At index 0: 
     *    The parent index for index 0 is Math.floor(0-1/2) = -1 which our getParentIndex returns undefined.
     *    So we simply push to arr as this is correct only.
     * 
     * At index1: 
     *    The parentIndex for index 1 is Math.floor(1-1/2) = 0 . 
     *    We check is the parent is greater than the index1 element than we swap because we need to create a min heap and 
     *    in min heap every parent node should be smaller than its children.
     * 
     * We do the same for all the index i,e 0(n* logn)
     * 
     */
    buildMinHeap(inputArr: number[]): void {
        for (let i = 0; i < inputArr.length; i++) {
            this.arr.push(inputArr[i]);
            let index = this.arr.length - 1;
            while (index > 0) {
                let parentIndex = this.getParentIndex(index);
                if (parentIndex !== undefined && this.arr[parentIndex] > this.arr[index]) {
                    this.arr = this.swap(this.arr, parentIndex, index);
                    index = parentIndex;
                } else {
                    break;
                }
            }
        }
    }

    /**Approach2: 0(n),0(n)
     * 
     * Lets understand this intuition:
     * i/p = [10,5,20,2,4,8]
     * 
     *  If we represent the above given input array into complete binary tree then it will look like this.
     * 
     *                     10
     *                 5        20
     *              2    4    8
     * 
     * 
     * Now if we heapfiy node 20 i,e place it at correct position then the complete binary tree will look like
     *                     10
     *                 5         8
     *              2    4    20
     * 
     * 

     * Now if we heapfiy node 5 i,e place it at correct position then the complete binary tree will look like
     * 
     *                     10
     *                 2        8
     *              5    4    20
     * 
     * 
     * 
     * Now if we heapfiy root node i,e 10 then this complete binary tree will look like
     * 
     *                      2
     *                 4         8
     *              5    10    20
     * 
     * And here we have formed a minHeap.
     * 
     * So the idea is to start minHeapfying from right most last parent node which is 2 in our case ie node with value 20 in
     * given input array.
     * 
     * Clearly for a given input array  [10,5,20,2,4,8]
     * The last right most parent node will be the child of the last indexed element 
     * so we take out parent of this.arr.length-1.
     * 
     * And then do minHeapification from that index till root index.
     * 
     * Its time complexity comes out to be 0(n) although it gives an intuition of 0(n*logn)
     * 
     */
    buildHeap1() {
        let lastIndex = this.arr.length - 1;
        let startIndex = this.getParentIndex(lastIndex);
        if (startIndex !== undefined) {
            for (let i = startIndex; i >= 0; i--) {
                this.minHeapify(i);
            }
        }
    }

    minHeapify(index: number) {
        let leftChildIndex = this.getLeftChild(index);
        let rightChildIndex = this.getRightChild(index);
        let min = index;
        if (leftChildIndex !== undefined && this.arr[leftChildIndex] < this.arr[index]) {
            min = leftChildIndex;
        }
        if (rightChildIndex !== undefined && this.arr[rightChildIndex] < this.arr[min]) {
            min = rightChildIndex;
        }
        if (min !== index) {
            this.arr = this.swap(this.arr, min, index);
            this.minHeapify(min);
        }
    }

    private swap(ar: number[], index1: number, index2: number): number[] {
        let temp = ar[index1];
        ar[index1] = ar[index2];
        ar[index2] = temp;
        return ar;
    }
}

let minHeap = new MinHeap();
// minHeap.buildMinHeap([10, 5, 20, 2, 4, 8]);
// console.log(minHeap.arr);
minHeap.arr = [10, 5, 20, 2, 4, 8]
minHeap.buildHeap1();
console.log(minHeap.arr);
