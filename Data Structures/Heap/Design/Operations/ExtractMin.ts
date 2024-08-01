/**Given a binary heap the task is to extract out the minimum from the binary heap.
 * 
 * For ex:  i/p = [20,25,38,240,230,40,100]
 * Clearly its a min Heap so the min will always be the root or will be present at 0,
 * so we need to return
 * 
 * o/p = [25,38,240,230,40,100]
 * 
 * We have removed the min element.
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

    /**Approach1: 0(n),0(1)
     * 
     * So suppose we are given a minHeap i,e 
     * [20,25,38,240,230,40,100]
     * 
     * We need to extract the min from the heap.
     * So the min value in the minHeap will always be present at root or index = 0.
     * 
     * In this approach we will simply remove the index=0 element from the array i,e 0(n)
     * beacuse after removing the index=0 all nodes i,e (n-1) nodes should be shifted to (-1) position back.
     * Thus its a 0(n),0(1) opearation.
     * 
     * Can we do it better. 
     */
    extractMin(): number | undefined {
        if (this.arr.length > 0) {
            const val = this.arr[0];
            this.arr.splice(0, 1);
            return val;
        }
    }

    /**Approach2: 0(logn) , 0(logn)
     * 
     * I/p = [20,25,38,240,230,40,100];
     * 
     *                               20
     *                   25                   38
     *            240       230            40      100
     * 
     * So what we do in this approach is we will first swap the first node and the last node because we can pop
     * from the end of the array in 0(1) time and the first node in a minHeap will always be the least value which we need
     * to remove from the minHeap.
     * 
     * So now our minHeap looks like [100,25,38,240,230,40,20];
     * 
     *                             100
     *                   25                   38
     *            240       230            40      20
     * 
     * Now we will pop from the minHeap so the minHeap looks like
     * [100,25,38,240,230,40];
     *                            100
     *                   25                   38
     *            240       230            40     
     * 
     * Now the problem has reduced to minHeapify a minHeap which is potentially affected by the root.
     * And minHeapify can be done in 0(logn), 0(logn) .
     * 
    */
    extractMin1(): number | undefined {
        if (this.arr.length === 0) return;
        if (this.arr.length === 1) {
            return this.arr.pop();
        }
        this.arr = this.swap(this.arr, 0, this.arr.length - 1);
        const val = this.arr[this.arr.length - 1];
        this.arr.pop();
        this.minHeapify(0);
        return val;
    }

    private minHeapify(index: number) {
        let leftChildIndex = this.getLeftChild(index);
        let rightChildIndex = this.getRightChild(index);
        let min = index;
        if (leftChildIndex && this.arr[leftChildIndex] < this.arr[index]) {
            min = leftChildIndex;
        }
        if (rightChildIndex && this.arr[rightChildIndex] < this.arr[min]) {
            min = rightChildIndex;
        }
        if (index !== min) {
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
minHeap.arr = [20, 25, 38, 240, 230, 40, 100];
console.log(minHeap.extractMin1());
console.log(minHeap.arr);
