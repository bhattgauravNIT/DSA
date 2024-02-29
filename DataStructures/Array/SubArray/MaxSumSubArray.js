/**Given an array including both positive and negative integers , find the max subarray sum 
 * 
 * Ex: arr = [1,2,3]
 * all possible subarray are [1],[1,2],[1,2,3],[2],[2,3],[3]
 * 
 * so max possible sum is [1,2,3] i,e 6
*/

/**Approach 1: O(n^3),O(1) 
 * 
 * Find all possible subarray of the given array and take out the max sum.
*/

function maxSumSubArray(arr) {
    let i = 0, j = 0, max = Number.MIN_SAFE_INTEGER;
    while (i < arr.length) {
        while (j < arr.length) {
            let k = i, sm = 0;
            while (k <= j) {
                sm += arr[k];
                k++;
            }
            if (sm > max) {
                max = sm;
            }
            j++;
        }
        i++;
        j = i;
    }
    return max;
}

/**Approach2: O(n^2),O(1)
 * Based on the fact that all the possible sums will be  1, 1+2, 1+2+3, 2, 2+3, 3
 * Ex: arr =[1,2,3]
 * Find sum of subarray 1 then 1,2 then 1,3 then 2, then 2,3 then 3 and take out max based on the fact that
 * if you know sum of subarray [1,2] then simply if we add 3 to that sum it will be sum of subarray [1,2,3].
 */
function maxSumSubArray1(arr) {
    let i = 0, max = Number.MIN_SAFE_INTEGER;
    while (i < arr.length) {
        let j = i, sm = 0;
        while (j < arr.length) {
            sm += arr[j];
            if (sm > max) {
                max = sm;
            }
            j++;
        }
        i++;
    }
    return max;
}

/**Approach3 : O(n),O(n)
 * 
 * Kadane's algo: 
 * 
 * Lets take an example:
 * arr = [-5,1,-2,3,-1,2,-2];
 * At every index if we can take out the max possible sum at that index for sub array ending at that index.
 * 
 * So at -5, if a subarary is ending at -5, it can have max sum as -5 only beacuse there is nothing left to it.
 * at index of 1, there can be two sums 1 and ((-5)+1) that is -4. Out of (1,-4), 1 is greater so that will be max sum
 * at index of -2, there can be three possibilities, -2 itself or (1+(-2)) or (-5+1+(-2)) greater of all is -1.
 * Similary at other index same conecpt applies.
 * 
 * Now after above computation if we look at the max sum for subarray at every specific index i, considering i will be the end
 * element of the subarray, we get.
 * 
 * let maxSums = [ -5, 1, -1, 3, 2, 4,  2]
 * 
 * Since its the max at every index so the over all max of this array will be the answer.
 * 
 * Thus in order to achieve max Sums, let consider two pointer approach.
 * 
 *           i
 * arr = [-5,1,-2,3,-1,2,-2]
 * 
 *            j
 * maxSums = [-5]
 * 
 * Now initially for i=0, there is nothing left so the max sum at index 0 will be the index 0 only, thus maxSums[0] = -5.
 * Now, for i=1 (first pointer at arr).If arr[i]+arr[j] > arr[i] than maxSums should be pushed with arr[i]+arr[j].
 * The jth element in maxSums is pointing to the previous obtained maxSum.
 * So 1+(-5) is not greater than 1 thus in this case we push arr[i] to maxSum.
 * 
 * So if(arr[i]+arr[j] > arr[i]) maxSum.push(arr[i]+arr[j])
 *    else {
 *    maxSum.push(arr[i]);
 * }
 */

function maxSumSubArray2(arr) {
    let maxSums = [arr[0]];
    let i = 1, j = 0;
    while (i < arr.length) {
        if (arr[i] + maxSums[j] > arr[i]) {
            maxSums.push(arr[i] + maxSums[j]);
        } else {
            maxSums.push(arr[i]);
        }
        i++;
        j++;
    }
    let max = Number.MIN_SAFE_INTEGER;
    i = 0;
    while (i < maxSums.length) {
        if (maxSums[i] > max) {
            max = maxSums[i];
        }
        i++;
    }
    return max;
}

/**Approach3: 0(n),0(n) (Enhanced) 
 * 
 * In the above approach only, instead of maintaining finding max from maxSums in a seperate loop we can keep a max varibale
 * if the current element being pushed in maxSums is greater than max, then max = maxSums[maxSums.length-1];
 * where max should be the initially the first element of maxSums.
*/
function maxSumSubArray3(arr) {
    let maxSums = [arr[0]], max = maxSums[0];
    let i = 1, j = 0;
    while (i < arr.length) {
        if (arr[i] + maxSums[j] > arr[i]) {
            maxSums.push(arr[i] + maxSums[j]);
        } else {
            maxSums.push(arr[i]);
        }
        if (maxSums[maxSums.length - 1] > max) {
            max = maxSums[maxSums.length - 1]
        }
        i++;
        j++;
    }
    return max;
}

/** Approach4: 0(N),(1)
 * 
 * In the above approach only instead of maintaining a seperate maxSums array we can use a prevMax variable whose initial
 * value will be arr[0].
 * i will start from1.
 * If arr[i]+ prevMax > arr[i] then prevMax should be updated to arr[i]+prevMax.
 * Previously we were pushing this to an array , instead now we are changing the prevMax itself.
 * 
 * If arr[i]+ prevMax < arr[i] the prevMax = arr[i].
 * 
*/

function maxSumSubArray4(arr) {
    let max = arr[0], prevMax = arr[0];
    let i = 1, j = 0;
    while (i < arr.length) {
        if (arr[i] + prevMax > arr[i]) {
            prevMax = arr[i] + prevMax
        } else {
            prevMax = arr[i];
        }
        if (prevMax > max) {
            max = prevMax
        }
        i++;
        j++;
    }
    return max;
}