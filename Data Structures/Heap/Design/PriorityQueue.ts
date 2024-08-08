/**A priority queue is exactly similar to heap datastructure. It uses the concept of heaps only,
 * infact if we need to differenetiate that we can say that heap is a concept and priorty queue is a datastructre which
 * uses the conecpt of heap.
 * 
 * The task it to create a priority queue lest say a min priority queue and implemnt functions like
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

let pq = new PriorityQueue<number>();
pq.add(10);
pq.add(20);
pq.add(15);
pq.add(2);
console.log(pq.peek());
console.log(pq.pop());
console.log(pq.peek());
