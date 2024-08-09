/**A priority queue is exactly similar to heap datastructure. It uses the concept of heaps only,
 * infact if we need to differenetiate that we can say that heap is a concept and priorty queue is a data structre which
 * uses the conecpt of heap.
 * 
 * The task it to create a priority queue say a min priority queue and implemnt functions like
 * build this priority queue, top, pop, size, isEmpty().
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

    /**Approach: 0(log(n)),0(1)
     * 
     * A min heap follows the property that every root must be smaller than its desendent subTree.
     * Initailly when minBinaryHeap array is empty then simply means we are inserting root into the binary tree.
     * 
     * Now this means we insert at end of the array or push to end of array i,e  this.arr.push(val); and this inserted value
     * will have index this.arr[this.arr.length-1];
     * 
     * Now we check wether this inserted element is smaller than its parent if yes then if we keep it there at the initial inserted index
     * its gonna violate the minHeap property then every parent should be smaller than its children.
     * 
     * Thus we swap the parent and the children.
     * 
     * Now the index will start pointing to this swapped new parent.
     * Again we check if its smaller than its parent and we keep doing it till we reach the root or index 0.
     * 
     * If in the initial point only we see that this inserted value is greater than its root then its prefectly fine and we come out of the loop
     * immediately.
     * 
     * Since in worst case we may have to decent upto the root node i,e the inserted value is smaller even than the tree node than
     * we will be iterating till the height of the tree i,e edges between the root node and child leaf.
     * 
     * Thus height is nothing 0(log(n)) where n is the number of nodes in the tree.
     */
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

    /**Approach: 0(1),0(1)
     * 
     * Peek refers to getting the top element of the minHeap.
     * So simply we need to give the root of the binary tree.
     * 
     * Note is that in peek we simply give the top element and dont remove the top element.
     */
    peek(): T | undefined {
        if (this.arr.length > 0) {
            return this.arr[0];
        }
    }

    /**Approach: 0(1),0(1)
     * 
     * Pop refers to the removal of the top element from the binary tree or say removal of the root so in order to achieve that.
     * Say we have a min heap something like :
     * 
     *                                           1
     *                                   2                3
     *                          4             5
     * 
     * So we need to remove the top element i,e 1. so initially our binaryMinHeap array looks like: [1,2,3,4,5]
     * Lets swap the top element with the last element i,e 
     * 
     *                                           5
     *                                   2                3
     *                          4             1 
     * 
     * 
     * binaryMinHeap array looks like: [5,2,3,4,1]
     * Now we pop the last element from the binaryMinHeap array as it can be done in 0(1) operation.
     * 
     * So our bianryMinHeap looks like:
     * 
     * 
     *                                           5
     *                                   2                3
     *                          4             
     * 
     * and arr = [5,2,3,4]
     * 
     * Now the problem has reduced to minHeapfiy a index suspected to break the minHeap property.
     * Thus we do minHeapify on arr with index 0. 
     */
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

    /**Approach: 0(1),0(1)
     * 
     * Checks if the length of the array is 0 or not.
     */
    isEmpty(): boolean {
        return this.arr.length === 0;
    }
}

let pq = new PriorityQueue<number>();
pq.add(10);
pq.add(20);
pq.add(15);
pq.add(2);
console.log(pq.peek());
console.log(pq.pop());
console.log(pq.peek());
