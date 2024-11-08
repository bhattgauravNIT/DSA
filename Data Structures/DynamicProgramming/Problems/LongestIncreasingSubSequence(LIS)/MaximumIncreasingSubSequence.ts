/**Given the array, find the maximum sum increasing subSequence, i,e out of all the increasing subSequence 
 * find the max sum of these increasing subsequence.
 * 
 * Ex: 1. [3,20,4,6,7,30] o/p: 53 i,e of {3,20,30}
       2. [5,10,20] o/p: 35 i,e {5,10,20}
       3. [20,10,5] o/p: 20 i,e {20}

 */

/**Approach: 0(n*n),0(n)
 * 
 * The logic and root will remain same as that of LIS, however in LIS using DP, we find the length of longest increasing sequence for every ith element ending at it.
 * In this case instead of storing the length of LIS for every ith element ending at it, we will be storing the sum of longest increasing sequence for every ith element
 * ending at it.
 * 
 * Created a LIS array initialized with arr[0].
 * 
 * Start iteration from i=1 and for every j i,e from i-1 -> 0 see if arr[i] is greater than arr[j] , if yes this means that the arr[i] can be a part of
 * arr[j]th LIS sum now.
 * So we find the max sum out of all LIS[j] such that arr[i] > arr[j].
 * 
 * If max is -1 only , this means that there exists no arr[j] such that j moves from i-1 -> 0 , in which arr[j] can be a part of max sum LIS so we update
 * Lis[i] as arr[i]
 * 
 * If max is not -1, this means arr[i] can be a part of max sum of LIS so we update lis[i] as max + lis[i].
 * 
 * Now the LIS sum array contains all max possible sum of LIS so we take out the max from it and that will be the answer.
 */

function maxIncreasingSumSubsequence(arr: number[]): number {
    let msis: number[] = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        let maxSum = -1;
        for (let j = i - 1; j >= 0; j--) {
            if (arr[j] < arr[i]) {
                maxSum = Math.max(msis[j], maxSum);
            }
        }
        if (maxSum !== -1) {
            msis[i] = maxSum + arr[i];
        } else {
            msis[i] = arr[i];
        }
    }

    let res = msis[0];
    for (let i = 1; i < msis.length; i++) {
        res = Math.max(res, msis[i]);
    }
    return res;
}


const arr = [3, 20, 4, 6, 7, 30];
console.log(maxIncreasingSumSubsequence(arr));


