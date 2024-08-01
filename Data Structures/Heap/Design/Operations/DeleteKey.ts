/**Given a minHeap and a index the task is to delete the key from the minHeap such that
 * the minHeap still persist all of it properties i,e it should be a complete
 * binary tree with if the last level is not having all 2 child then they must be arranged from left to right
 * and every root should be smaller than its descendant subTree.
 * 
 * Ex: i/p = [10,20,30,40,50,35,38,45] index = 3
 *    o/p = [10,20,30,45,50,35,38] 
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
     * Approach: 0(logn),0(logn)
     * 
     * Lets understand this problem with help of an example:
     * 
     * Say i/p = [10,20,30,40,50,35,38,45] index = 3 , i,e we need to delete a key which is at given index = 3 from a min heap.
     * This problem can be co related to extract min.
     * 
     *                   10
     *               20                30
     *       40          50         35     38
     *   45
     * 
     * 
     * In extract min also we used to extract the min from the min Heap which simply used to be the root or index 0
     * of the minHeap atrray, this time the index can be anything from 0-> minHeap.length-1.
     * 
     * So if we somehow first make this index which is to be deleted as the min of the array and make it the root, then
     * the problem simply becomes extract the min from the array.
     * 
     * So in order to do it we simply make this index value as -infinity ensuring that this index value is now
     * the min of the array.
     * 
     * 
     *                   10
     *               20                30
     *      -Infinity          50         35     38
     *   45
     * 
     * 
     * Now we manipulate this index such that it becomes the root and minHeap properties is still intact for this 
     * we simply check this index value with parent and keep swapping with parent till we reach the root.
     * 
     * 
     * Loop1:              10
     *        -Infinity                 30
     *      20         50         35     38
     *   45
     * 
     * 
     * 
     *  Loop2:      -Infinity 
     *           10             30
     *      20         50         35     38
     *   45
     * 
     * Now this is the state of the binary min heap.
     * 
     * Now simply we need to extract min from the binary min heap which is the root.
     * So in order to do that we fisrt swap this root with the last indexed element in the binary heap because removal
     * from the last index of array is 0(1) opeartion.
     * 
     *                 45
     *           10             30
     *      20         50         35     38
     *   -Infinity
     * 
     * Now we pop the last index element from the heap so the heap becomes.
     * 
     *                  45
     *           10             30
     *      20         50         35     38
     *   
     * Now the problem becomes minHeapify problem in which we suspect the index 0 to be the cuplrit for 
     * not ensuring the binary heap properties and therefore we need to place this index at the correct position.
     * 
     * So we use minHeapfiy in which we check the root index with left and right child .
     * If index value is smaller than left we swap leftchild and index value and update index as left child index
     * If index value is smaller than right child then we swap the right child and index value and update index as right child index.
     * 
     * If the min of all three is the index value only we dont do anything.
     * 
     * Repeat this process till min === index.
     *
     * 
     */

    deleteKey(index: number) {
        if (this.arr.length === 0) return;
        if (this.arr.length === 1 && index === 0) return this.arr = [];
        this.decreseKey(Number.MIN_SAFE_INTEGER, index);
        this.extractMin();
    }

    private decreseKey(x: number, index: number) {
        this.arr[index] = x;
        while (index > 0) {
            let parentIndex = this.getParentIndex(index);
            if (parentIndex !== undefined && this.arr[parentIndex] > this.arr[index]) {
                this.arr = this.swap(this.arr, parentIndex, index);
                index = parentIndex;
            } else {
                return;
            }
        }
    }

    private extractMin() {
        this.arr = this.swap(this.arr, 0, this.arr.length - 1);
        this.arr.pop();
        this.minHeapify(0);
    }

    private minHeapify(index: number) {
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
minHeap.arr = [10, 20, 30, 40, 50, 35, 38, 45];
minHeap.deleteKey(3);
console.log(minHeap.arr);


