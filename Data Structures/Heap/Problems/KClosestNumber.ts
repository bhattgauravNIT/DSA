/**Given an array arr , a value x and a value k. We need to give k closest values to x in the arr.
 * 
 * For ex: arr = [10,15,7,3,4];
 *          x = 8
 *          k = 2
 * 
 * So 2 closest numbers to 8 in the arr is [7,10]
 * 
 * For ex: arr = [100,80,10,5,70]
 *         x = 2
 *         k = 3
 *  So 3 closest number to 2 in arr is [5,10,70]
 */

/**Approach1: nLog(n),0(n)
 * We will use hashing here.
 * Lets say i/p arr = [10,15,7,3,4]
 * x = 8, k =2
 * 
 * So first we create a map with mapping
 * 
 * dist of arr[i] with x -> arr[i].
 * 
 * SO the map will look like:
 * 
 * {
 *  2->10
 *  7->15
 *  1->7
 *  5->3
 *  4->4
 * }
 * 
 * now since we need to give k closest elements so we will sort this map based on dist i,e the key.
 * 
 * so we do      sortedArray = Arrays.from(mp.entries());
 *   Thus we have created a 2 dimensional array i,e sortedArray using mp entries.
 *   So sorted array will look like:
 * 
 *   sortedArray = [[2,10],[7,15],[1,7],[5,3],[4,4]].
 *   now we will sort the sortedArray based on index 0 i,e key in map.
 * 
 *  sortedArray.sort((a,b)=> a[0]-b[0]) in ascending order.
 * 
 * Now the sorted array looks like 
 *    [[1,7],[2,10],[4,4],[5,3],[7,15]]
 * 
 * Now we will convert this array into a map using
 * 
 * mp = new Map(sortedArray);
 * 
 * Now we will take k elements from the map.
 * 
 */

function kClosestNumber(arr: number[], x: number, k: number) {
    let mp = new Map<number, number>();
    let res: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        mp.set(Math.abs(arr[i] - x), arr[i]);
    }
    const sortedArray = Array.from(mp.entries()).sort(([keyA], [keyB]) => keyA - keyB);
    const sortedMap = new Map(sortedArray);
    let i = 1;
    for (const [, value] of sortedMap) {
        if (i <= k) {
            res.push(value);
            i++;
        } else {
            break;
        }
    }
    return res;
}

/**Approach2: 0(n*k), 0(n) */
function kClosestNumber1(arr: number[], x: number, k: number) {
    let visited: boolean[] = [];
    let res: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        visited[i] = false;
    }

    for (let i = 0; i < k; i++) {
        let minDist = Number.MAX_SAFE_INTEGER;
        let minIndex = -1;
        for (let j = 0; j < arr.length; j++) {
            if (!visited[j] && Math.abs(arr[j] - x) <= minDist) {
                minDist = Math.abs(arr[j] - x);
                minIndex = j;
            }
        }
        visited[minIndex] = true;
        res.push(arr[minIndex]);
    }

    return res;
}

/**Approach3:
 * 
 * Lets solve this using a priority queue of a max heap.
 * So we will create a maxHeap of arr: Array<{ minDist: number, index: number }>; i,e minDist and index.
 * 
 * Now we will itearte over the k elements of the array i,e from 0->k and will place the {minDist,index} pair in a maxHeap
 * So with this iteartion the maxHeap will look like:
 * 
 *       [Math.abs(10-8),0] = {2,0}
 *       [Math.abs(15-8),1] = {7,1}
 * 
 * Placing them in maxHeap will make the maxHeap look like:
 *                        
 *                      {7,1}
 *                  {2,0}
 * 
 * Now we will itearte form k till the end of the input array and will check that if the top of the heap is greater than
 * the existing value of Math.abs(arr[i]-x) then we will replace the top of the heap with this existing pair.
 * THe heap makes itself maxHeapfigy internally.
 * 
 * Lets understand this with help of an example:
 * 
 * input = [10, 15, 7, 3, 4], x = 8, k =2
 * 
 * Initially we put k elements in maxHeap i,e we place [Math.abs(10-8),0] = {2,0}
 *       [Math.abs(15-8),1] = {7,1}
 * 
 * 
 *                             {7,1}
 *                  {2,0}
 * 
 * Now we itearte for 7-> end of the array in input arr.
 * 
 * i= 2 i.e 7.      Math.abs(7-8) = 1 which is smaller than top minDist so we pop from heap and inert this to heap.
 * 
 *  Heap looks like
 *                              {1,2}
 *                    {2,0}
 * 
 * Same process we repeat .
 * 
 * In the end the heap will be having two elemenst which are the minDist elements. 
 *     
 */

class PriorityQueue {
    arr: Array<{ minDist: number, index: number }>;
    constructor() {
        this.arr = [];
    }

    private getParentIndex(index: number): number | undefined {
        const parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex >= 0) {
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
        let leftRightIndex = 2 * index + 2;
        if (leftRightIndex < this.arr.length) {
            return leftRightIndex;
        }
    }


    push(minDist: number, index: number) {
        const val = { minDist, index };
        this.arr.push(val);
        if (this.arr.length === 1) return;
        let temp = this.arr[this.arr.length - 1];
        this.arr[this.arr.length - 1] = this.arr[0];
        this.arr[0] = temp;
        this.maxHeapify(0);
    }

    peek() {
        return this.arr[0];
    }

    pop() {
        const val = this.arr[0];
        this.arr[0] = this.arr[this.arr.length - 1];
        this.arr.pop();
        this.maxHeapify(0);
        return val;
    }

    isEmpty() {
        return this.arr.length === 0;
    }

    private maxHeapify(index: number) {
        let leftChildIndex = this.getLeftChildIndex(index);
        let rightChildIndex = this.getRightChildIndex(index);
        let max = index;
        if (leftChildIndex !== undefined && this.arr[leftChildIndex].minDist > this.arr[index].minDist) {
            max = leftChildIndex;
        }
        if (rightChildIndex !== undefined && this.arr[rightChildIndex].minDist > this.arr[max].minDist) {
            max = rightChildIndex;
        }
        if (max !== index) {
            let temp = this.arr[index];
            this.arr[index] = this.arr[max];
            this.arr[max] = temp;
            this.maxHeapify(max);
        }
    }
}

function kClosestNumber2(arr: number[], x: number, k: number): number[] {
    let pq = new PriorityQueue();
    const res: number[] = [];
    for (let i = 0; i < k; i++) {
        pq.push(Math.abs(arr[i] - x), i);
    }
    for (let i = k; i < arr.length; i++) {
        const val = pq.peek();
        if (val.minDist > Math.abs(arr[i] - x)) {
            pq.pop();
            pq.push(Math.abs(arr[i] - x), i);
        }
    }
    while (!pq.isEmpty()) {
        res.push(arr[pq.pop().index]);
    }
    return res;
}

console.log(kClosestNumber([10, 15, 7, 3, 4], 8, 2));




