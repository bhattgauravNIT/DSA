/**Given a stream the task is to find the median at every point in the stream.
 * 
 * For ex: stream = [20,10,30,7];
 *         
 *  initially in the stream we have only 20 so median of 20 is 20 only
 *  now stream has [20,10] i,e even numbers so meadian is (10+20)/2 = 15
 *  now stream has [20,10,30] i,e odd values so if we sort them it becomes [10,20,30] so median is 20
 *  now stream has [20,10,30,7] i,e even values so if we sort them it becomes [7,10,20,30] and median is (10+20)/2 = 15
 * 
 * So o/p is [20,15,20,15]
 * 
 * For ex: stream = [25,7,10,15,20]
 *         o/p = [25,16,10,12.5,15]
 */

/**Approach: */

class PriorityQueue {
    smallerHeap: number[];
    greaterHeap: number[];

    constructor() {
        this.smallerHeap = [];
        this.greaterHeap = [];
    }

    private getParentIndex(index: number): number | undefined {
        let parentIndex = Math.floor((index - 1) / 2);
        if (index > 0) {
            return parentIndex;
        }
    }

    private getLeftChildIndex(index: number, arr: number[]): number | undefined {
        let leftChildIndex = 2 * index + 1;
        if (leftChildIndex < arr.length) {
            return leftChildIndex;
        }
    }

    private getRightChildIndex(index: number, arr: number[]): number | undefined {
        let rightChildIndex = 2 * index + 2;
        if (rightChildIndex < arr.length) {
            return rightChildIndex;
        }
    }

    addSmallerHeap(value: number) {
        this.smallerHeap.push(value);
        let currentIndex = this.smallerHeap.length - 1;
        while (currentIndex > 0) {
            let parentIndex = this.getParentIndex(currentIndex);
            if (parentIndex !== undefined && this.smallerHeap[currentIndex] > this.greaterHeap[parentIndex]) {
                let temp = this.smallerHeap[currentIndex];
                this.smallerHeap[currentIndex] = this.smallerHeap[parentIndex];
                this.smallerHeap[parentIndex] = temp;
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    addGreaterHeap(value: number) {
        this.greaterHeap.push(value);
        let currentIndex = this.greaterHeap.length - 1;
        while (currentIndex > 0) {
            let parentIndex = this.getParentIndex(currentIndex);
            if (parentIndex !== undefined && this.greaterHeap[currentIndex] < this.greaterHeap[parentIndex]) {
                let temp = this.greaterHeap[currentIndex];
                this.greaterHeap[currentIndex] = this.greaterHeap[parentIndex];
                this.greaterHeap[parentIndex] = temp;
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    popSmallerHeap() {
        if (this.smallerHeap.length > 0) {
            const val = this.smallerHeap[0];
            this.smallerHeap[0] = this.smallerHeap[this.smallerHeap.length - 1];
            this.smallerHeap.pop();
            this.maxHeapfify(0);
            return val;
        }

    }

    popGreaterHeap() {
        if (this.greaterHeap.length > 0) {
            const val = this.greaterHeap[0];
            this.greaterHeap[0] = this.greaterHeap[this.greaterHeap.length - 1];
            this.greaterHeap.pop();
            this.minHeapfify(0);
            return val;
        }
    }

    private minHeapfify(index: number): void {
        let leftChildIndex = this.getLeftChildIndex(index, this.greaterHeap);
        let rightChildIndex = this.getRightChildIndex(index, this.greaterHeap);
        let min = index;
        if (leftChildIndex && this.greaterHeap[leftChildIndex] < this.greaterHeap[index]) {
            min = leftChildIndex;
        }
        if (rightChildIndex && this.greaterHeap[rightChildIndex] < this.greaterHeap[min]) {
            min = rightChildIndex;
        }
        if (index !== min) {
            let temp = this.greaterHeap[index];
            this.greaterHeap[index] = this.greaterHeap[min];
            this.greaterHeap[min] = temp;
            this.minHeapfify(min);
        }
    }

    private maxHeapfify(index: number): void {
        let leftChildIndex = this.getLeftChildIndex(index, this.smallerHeap);
        let rightChildIndex = this.getRightChildIndex(index, this.smallerHeap);
        let max = index;
        if (leftChildIndex && this.smallerHeap[leftChildIndex] > this.smallerHeap[index]) {
            max = leftChildIndex;
        }
        if (rightChildIndex && this.smallerHeap[rightChildIndex] > this.greaterHeap[max]) {
            max = rightChildIndex;
        }
        if (index !== max) {
            let temp = this.smallerHeap[index];
            this.smallerHeap[index] = this.smallerHeap[max];
            this.smallerHeap[max] = temp;
            this.maxHeapfify(max);
        }
    }


    peekSmallerHeap() {
        if (this.smallerHeap.length > 0) {
            return this.smallerHeap[0];
        }
    }

    peekGreaterHeap() {
        if (this.greaterHeap.length > 0) {
            return this.greaterHeap[0];
        }
    }

    getSizeSmallerHeap() {
        return this.smallerHeap.length;
    }

    getSizeGreaterHeap() {
        return this.greaterHeap.length;
    }
}

function medianOfAStream(stream: number[]) {
    let pq = new PriorityQueue();
    let res: number[] = [stream[0]];
    pq.addSmallerHeap(stream[0]);
    for (let i = 1; i < stream.length; i++) {
        if (pq.getSizeSmallerHeap() > pq.getSizeGreaterHeap()) {
            let smallerHeapTop = pq.peekSmallerHeap();
            if (smallerHeapTop !== undefined && smallerHeapTop > stream[i]) {
                const val = pq.popSmallerHeap();
                if (val !== undefined) {
                    pq.addGreaterHeap(val);
                }
                pq.addSmallerHeap(stream[i]);
            } else {
                pq.addGreaterHeap(stream[i]);
            }
            const mid = pq.peekSmallerHeap();
            const mid1 = pq.peekGreaterHeap();
            if (mid1 !== undefined && mid !== undefined) {
                const val = (mid + mid1) / 2;
                res.push(val);
            }
        } else {
            let greaterHeapTop = pq.peekGreaterHeap();
            if (greaterHeapTop !== undefined && greaterHeapTop < stream[i]) {
                const val = pq.popGreaterHeap();
                if (val !== undefined) {
                    pq.addSmallerHeap(val);
                }
                pq.addGreaterHeap(stream[i]);
            } else {
                pq.addSmallerHeap(stream[i]);
            }
            const mid = pq.peekSmallerHeap();
            if (mid !== undefined) {
                res.push(mid);
            }
        }
    }

}

console.log(medianOfAStream([20, 10, 30, 7]));