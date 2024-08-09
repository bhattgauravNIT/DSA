/**Given an array which resembels the cost of any ith item, the task is to give the count of
 * the max numbers of items which we can buy for a given amount of sum.
 * 
 * For ex: I/p = [1,12,5,111,200]
 * sum = 10
 * 
 * O/p = 2 
 * 
 * as at max we can buy two items of worth 1 & 5. After that we cant buy anything we the remaining amount.
 * 
 * Ex: [20,10,5,30,100]
 * sum = 35
 * 
 * O/p = 3 we can at max buy 3 items of worth 5,10,20
 */

/**Approach1: 0(nlogn),0(1)
 * 
 * Sort the input prices array.
 * Say input array was [1,12,5,111,200]
 * we sort it so it becomes : [1,5,12,111,200]
 * 
 * Now we itearte over this array and find the minNumber of elements which we can buy with the given sum.
 * 
 */
function maxNumberOfBuys(items: number[], sum: number): number {
    let res = 0;
    items = items.sort((a, b) => a - b);
    let exhaustedValue = 0;
    let i = 0;
    while (i < items.length && exhaustedValue + items[i] <= sum) {
        exhaustedValue += items[i];
        i++;
        res++;
    }
    return res;
}

/**Approach2: 0(n),0(1)
 * 
 * Here in this approach we are not using additional space inside the priority queue instead we are manipluating the
 * same input array.
 * 
 * So the idea is that using the main input arr we will build a minHeap from it.
 * Now we are also given a sum, so we will keep poping from the priority queue till sum is greater than 0.
 * 
 * Lets understand with the help of an example.
 * 
 * Ex: prices [91, 20, 4, 6, 100] and sum = 30.
 * 
 * First create a minHeap from this prices array directly so
 * 
 *                              4
 *                       6            20
 *                   91    100
 * 
 * Now sum = 30.
 * 
 * So first we pop from heap value is 4. sum>=val is true so we make sum =  sum-val and increment res.
 * 
 * So now the arrangementg looks like:
 * 
 *                                                       6
 *                                               20           91
 *                                       100
 * 
 * prices[] = [6,20,91,100], sum = 26.
 * 
 * Now again we pop from the heap i,e 6. Sum>= val so we do sum = sum-val
 * 
 * So now the arrangementg looks like:
 * 
 *                                                      
 *                                               20          
 *                                        100             91
 *                    
 * 
 * prices[] = [20,91,100], sum = 20.    res = 2.
 * 
 * 
 * Now again we pop from the heap i,e 20. Sum>= val so we do sum = sum-val
 * 
 * So now the arrangementg looks like:                    
 *                                                         
 *                                        100             
 *                                         91
 *                    
 * 
 * prices[] = [91,100], sum = 0.    res = 3.
 * 
 * Since sum has becomes 0 thus we stop and res is 3,ie, we can buy 3 items at max with the given sum.
 *
 * 
*/

class PriorityQueue {
    constructor() { }

    getParentIndex(index: number): number | undefined {
        let parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex >= 0) {
            return parentIndex;
        }
    }

    getLeftChildIndex(arr: number[], index: number): number | undefined {
        let leftChildIndex = 2 * index + 1;
        if (leftChildIndex < arr.length) {
            return leftChildIndex;
        }
    }

    getRightChildIndex(arr: number[], index: number): number | undefined {
        let rightChildIndex = 2 * index + 2;
        if (rightChildIndex < arr.length) {
            return rightChildIndex;
        }
    }


    buildHeap(arr: number[]): number[] {
        let nodeIndex = this.getParentIndex(arr.length - 1);
        if (nodeIndex !== undefined) {
            for (let i = nodeIndex; i >= 0; i--) {
                arr = this.minHeapify(arr, i);
            }
        }
        return arr;
    }

    minHeapify(arr: number[], index: number) {
        let leftChildIndex = this.getLeftChildIndex(arr, index);
        let rightChildIndex = this.getRightChildIndex(arr, index);
        let min = index;
        if (leftChildIndex !== undefined && arr[leftChildIndex] < arr[index]) {
            min = leftChildIndex;
        }
        if (rightChildIndex !== undefined && arr[rightChildIndex] < arr[min]) {
            min = rightChildIndex;
        }
        if (min !== index) {
            let temp = arr[index];
            arr[index] = arr[min];
            arr[min] = temp;
            arr = this.minHeapify(arr, min);
        }
        return arr;
    }

    pop(arr: number[]): { val: number, arr: number[] } | undefined {
        if (arr.length > 0) {
            const val = arr[0];
            arr[0] = arr[arr.length - 1];
            arr.pop();
            arr = this.minHeapify(arr, 0);
            return { val, arr };
        }
    }
}

function maxNumberOfBuys1(items: number[], sum: number): number {
    let pq = new PriorityQueue();
    items = pq.buildHeap(items);
    let res = 0;
    while (sum >= 0 && items.length > 0) {
        const result = pq.pop(items);
        if (result) {
            const { val, arr } = result;
            items = arr;
            if (sum >= val) {
                sum -= val;
                res++;
            } else {
                break;
            }
        } else {
            break;
        }
    }
    return res;
}

maxNumberOfBuys1([91, 20, 4, 6, 100], 30)