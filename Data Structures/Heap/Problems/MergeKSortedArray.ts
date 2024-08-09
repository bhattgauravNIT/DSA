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
 * Approach1: 0((n*K) log(n*k)), 0(n*k)
 * 
 * where n is the  total number of elements is the array
 * k is the total number of rows in the input array.
 * 
 * Simply first iterate over the entire input matrix and place them in a array.
 * Now sort this array.
 * 
 * Time complexity analysis.
 * The arr formed after traversal of the entire matrix is n*k and sorting of a arr with size n*k is log(n*k).
 * So overall its n*k * (logn*k)
 * 
 * The additional space required will be o(n*k).
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
 * This approach will be to use a priorityy queue.
 * 
 * So our priority queue will be a array of object where object will be having properties like
 * value, rowIndex , columnIndex.
 * 
 * i,e  res: Array<{ value: number, rowIndex: number, columnIndex: number }>;
 * 
 * Lets suppose we have an input array as 
 * arr = [
 *             [10,20,30],
 *             [5,15],
 *             [1,9,11,18]
 *            ]
 * 
 * So we itearte over the length of this array and will place the 0th column index of every queue in a min priority queue.
 * So initially our priority queue will look like:
 * 
 *                                 [1,2,0]
 *                    [10,0,0]                 [5,1,0]
 * 
 * where ex: [1,2,0] resemble value present at 2nd row 0th column is 1.
 * 
 * Now interally we are using a minHeap for implementation of a priority queue.
 * Now while the priority queue is not empty we went inside a loop i,e
 * 
 *            while (!pq.isEmpty()) 
 * 
 * We remove the top element ie, [1,2,0] gets removed .We push this value to a res array. res = [1]
 * Now we will insert the next column index of the same row in the minHeap or say the priority queue.
 * So our priority queue will look like:
 *                                        
 *                                [5,1,0]
 *                    [10,0,0]                 [9,2,1]
 * 
 * We repeat the same preocess and the res in last will be containing the sorted list of all the k sorted array.
 *          
 * Time complexity analysis:
 * 
 * 1) Insert first element of all k rows in the priority queue min heap ie, k(logk).
 * 2) There are n elements in total in the input array so every element is inserted exactly once in priority queue and also
 *  extracted once from priority queue. So n*log(k).
 * 
 * So klogk + nlogk.            
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


