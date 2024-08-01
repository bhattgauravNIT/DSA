/**Given a minheap and a index the task is to decrese or update the given index value to a decresed value
 * such that the resultant heap is also a minHeap and resembles all properties of a heap.
 * 
 * For ex: [10,20,40,80,100,70] and i=3, x = 5.
 * 
 * So at index 3 i,e 80 we need to insert these decresed key i,e 5.
 * 
 *                               10
 *                  20                      40
 *           80          100            70
 * 
 * O/p = [5,10,40,20,100,70]
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
     * Approach: 0(logn),0(1)
     * 
     * Lets understand this with the help of an example so we are given a minHeap like
     * [10,20,40,80,100,70] and i=3, x = 5.
     * 
 
 *                               10
 *                  20                      40
 *           80          100            70
 * 
 *     Now we need to decrease the key of index 3 to value 5. i,e replace 80 with 5.
 *     Now since its a binary min heap every root should be smaller than its subtree.
 *     So if we are decreasing the key value it means that for sure it will again be smaller only
 *     from its descendant subtree but we are not sure wether it will be lesser than its parents.
 * 
 *    So we need to check with its parents and if parent is greater than the current index value this means min binary heap 
 *    property is compromised and thus we need to do swapping opeartions till be are seesing violation of min heap
 *    property and thus till we reach the root.
 *    
 *    In worst case we need to swap from last leaf node till root node which is heaight of binary tree i,e 0(log(n)).
     *
     */
    decreaseKey(index: number, x: number) {
        this.arr[index] = x;
        if (this.arr.length === 1 && x === 0) return;
        while (index > 0) {
            let parentIndex = this.getParentIndex(index);
            if (parentIndex !== undefined && this.arr[parentIndex] > this.arr[index]) {
                this.arr = this.swap(this.arr, index, parentIndex);
                index = parentIndex;
            } else {
                return;
            }
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
minHeap.arr = [10, 20, 40, 80, 100, 70];
minHeap.decreaseKey(3, 5);
console.log(minHeap.arr);
