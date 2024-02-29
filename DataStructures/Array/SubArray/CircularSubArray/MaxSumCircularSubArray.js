/**Given a array arr, find the max sum of all the circular subArray of arr.
 * 
 * ex: arr = [1,2,3]
 * consider it as 
 *                                  1
 *                               3    2
 * 
 * that is circular. Now, 
 * all posiibe circular sub array are 
 * [1],[1,2],[1,2,3],[2],[2,3],[3] -> all possible subsets of arr
 * [2,3,1], [3,1,2], [3,1], [2,3,1]
 * 
 * Ex; [10,5,-5]
 *                               10
 *                            -5    5
 * 
 * So all possible sunarray are:
 * [10],[10,5],[10,5,-5],[5],[5,-5],[5,-5,10],[-5],[-5,10],[-5,10,5]
 * 
 * Ex: arr = [5,-2,3,4]
 * all possible subArray is: [5],[5,-2],[5,-2,3],[5,-2,3,4]
 *                           [-2],[-2,3],[-2,3,4],[-2,3,4,5]
 *                           [3],[3,4],[3,4,5],[3,4,5,-2]
 *                           [4],[4,5],[4,5,-2],[4,5,-2,3];
 * 
 */

/**Approach1: O(n^2),O(1) 
 * Consider ex:
 * 
 * arr = [5,-2,3,4]
 * So when we are at i=0 i,e 5, we need to consider all subarray from 5 that is [5],[5,-2],[5,-2,3],[5,-2,3,4], which is a standard case
 * now when we are at index 1, i,e -2, we need to consider indexes from i=1 till N and again 0 as well.
 * Similary when we are at index 2, we need to consider all index from 2-> N and again 0 and 1.
 * 
 * So that indexes can be obtained by (i+j) % n.
*/
function maxSumCircularSubArray(arr) {
    let max = Number.MIN_SAFE_INTEGER;
    let i = 0;
    while (i < arr.length) {
        let j = 0, sm = 0;
        while (j < arr.length) {
            let index = (i + j) % arr.length
            sm += arr[index];
            if (sm > max) {
                max = sm;
            }
            j++
        }
        i++;
    }
    return max;
}

/**Approach2: 0(n),0(1) 
 * 
 * Lets take example:
 * 
 * arr = [1,-2,3,4]
 * 
 * All possible Circular subarray = normal subarray + onlyCircular subarray
 * i,e 
 * 
 * 
   [1],[1,-2],[1,-2,3],[1,-2,3,4]
   [-2],[-2,3],[-2,3,4]                  -> Normal SubArray
   [3],[3,4]
   [4] 

   [-2,3,4,1]
   [3,4,1],[3,4,1,-2]                   -> Circular subarray
   [4,1],[4,1,-2],[4,1,-2,3]  

   Now in order to find the max Circular sub array sum we can find the max sum in normal subArray and the maxSum in circular
   sub array. Max of both the sums will be the answer.

   maxSumCircularSubArray = max(maxSumNormalSubsets,maxSumCircularSubSets)
   
   Now maxSumNormalSubsets is simple by Kadane's algo in 0(n),0(1).
   In order to find maxSumCircularSubSets . 

   Consider any circular subset ex: 
   [-2,3,4,1] here the max sum is 3+4+1, obtained by from all right elements (Case1: all contigious elements)
   [4,1,-2,3] here the max sum is 3+1+4 , obtained from some left elements, some right elemnets 
   and discarding some middle elements (Case2: leave some middle elements).

   So the maxSumNormalSubsets will be nothing but the sum of the entire array subtracted by the minSumSubArray.

   This is the algo.

   In this algo there is a corner case if the maxSumSubArray is coming as negative this means that all the elemnets in the
   array is neagtive and thus the minSumSubArray and sumofallElemnets will be same and thus let res = arraySm - minSubSetSum
   will be 0 and then Math.max(normalSubSetsMax, res) will yeild 0.
   
   Ex: [-5,-2]
   All possible normal Sub array is [-5],[-2],[-5,-2] so the maxSumSubArray is -2.
   Now sumofallElemnets is -7 and minSubSetSum is -7.
   So let res = arraySm - minSubSetSum  = 0
   So Math.max(-2, 0) is 0 which is wrong .

   Cause all possible circularSubArray of [-5,-2 ] is [-5],[-2],[-5,-2].[-2,-5].
*/
function maxSumSubArray(arr) {
    let i = 1, prevSum = arr[0], max = prevSum;
    while (i < arr.length) {
        if (prevSum + arr[i] > arr[i]) {
            prevSum = prevSum + arr[i];
        } else {
            prevSum = arr[i];
        }
        if (prevSum > max) {
            max = prevSum;
        }
        i++;
    }
    return max;
}

function minSumSubArray(arr) {
    let i = 1, prevSum = arr[0], min = prevSum;
    while (i < arr.length) {
        if (prevSum + arr[i] < arr[i]) {
            prevSum = prevSum + arr[i];
        } else {
            prevSum = arr[i];
        }
        if (prevSum < min) {
            min = prevSum;
        }
        i++;
    }
    return min;
}

function maxSumCircularSubArray1(arr) {
    let normalSubSetsMax = maxSumSubArray(arr);
    if (normalSubSetsMax < 0) return normalSubSetsMax
    let i = 0, arraySm = 0;
    while (i < arr.length) {
        arraySm += arr[i];
        i++;
    }
    let minSubSetSum = minSumSubArray(arr);
    let res = arraySm - minSubSetSum;
    return Math.max(normalSubSetsMax, res);
}

/**Improvised above approach : 0(n),0(1)
 * 
 * Now in above we understood
 * maxSumCircularSubArray = max(maxSumNormalSubsets,maxSumCircularSubSets)
 * 
 * and maxSumCircularSubSets is arraySum - minSumSubArray.
 * 
 * So in above approach we have to write a seperate function to get minSumSubArray and we already had maxSumSubArray
 * that we used to calculate maxSumNormalSubsets.
 * 
 * If we invert the elements of arr than maxSumNormalSubsets will give me the minSumSubArray value.
 * Now since we have inverted hence 
 * 
 * maxSumCircularSubSets will be arraySum + maxSumSubArray.
 */

function maxSumSubArray1(arr) {
    let i = 1, prevSum = arr[0], max = prevSum;
    while (i < arr.length) {
        if (prevSum + arr[i] > arr[i]) {
            prevSum = prevSum + arr[i];
        } else {
            prevSum = arr[i];
        }
        if (prevSum > max) {
            max = prevSum;
        }
        i++;
    }
    return max;
}

function maxSumCircularSubArray2(arr) {
    let normalSubSetsMax = maxSumSubArray1(arr);
    if (normalSubSetsMax < 0) return normalSubSetsMax
    let i = 0, arraySm = 0;
    while (i < arr.length) {
        arraySm += arr[i];
        arr[i] = -arr[i];
        i++;

    }
    let minSubSetSum = maxSumSubArray1(arr);
    let res = arraySm + minSubSetSum;
    return Math.max(normalSubSetsMax, res);
}

