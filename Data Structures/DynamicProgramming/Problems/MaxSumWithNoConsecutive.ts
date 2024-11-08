/**
 * Given an array of number, we need to find what max sum we can obtain from the array such that the elements which we are
 * including in fetching the sum should not be consecutive.
 * 
 * For ex: arr: [1,10,2]
 *        o/p: 10
 * 
 * possible sums are 1 if we take {1}, {1,2 = 3}, {2} if we take 2 only and {10} 
 * out of them max is 10.
 * 
 * arr: [8,7,6,10]
 * o/p: 18 i,e from {8,10}
 * 
 * arr: [10,5,15,20,2,30]
 * o/p: {10,20,30} i,e 60
 */

/**Approach1:0(2^n),0(n)
 * 
 * Lets talk about base cases so 
 * 
 * 1.if n===1 this means that there exist only one element in the array and thus we simply will take that value only
 * i,e arr[0]
 * 
 * 2. if array has only two elements than we take max out of them as we cant take both because they are consecutive.
 * 
 * we wont use any additional pointer for array traversal rather we will only use n as a pointer itself and traverse from end of the array.
 * 
 * Now we consider both the possibilities 
 * a) we do not consider an element:
 *    In this we will simply move to next element which is n-1
 * 
 * b) we consider element, in this case we will move to next to next element as consecutive element selection is not allowed i,e n-2 and we will include the
 * value of this element.
 * 
 * We need to maximize the sum and thus we take max of these two cases.
 */

function maxSumNoConsecutive(arr: number[], n: number) {
    if (n === 1) return arr[0];
    if (n === 2) return Math.max(arr[0], arr[1]);
    return Math.max(
        /**do not consider the last element */
        maxSumNoConsecutive(arr, n - 1),
        /**consider the last element */
        maxSumNoConsecutive(arr, n - 2) + arr[n - 1]
    )
}


/**Approach2:0(n),0(n)
 * 
 * Lets solve using dp so there was only parameter which was changing i,e n or the pointer through which we were traversing the
 * array so we will make a 1-d dp array.
 * 
 * dp[0] = 0 as if there exists no element in the array or length is 0 then max consecutive sum is 0 also.
 * dp[1] = arr[0] as there exists only one element in the array thus max consecutive sum is arr[0] 
 * dp[2] = max(arr[0],arr[1]) as there exits only two elements in array and we cant select both of them as then it will be consecutive thus we take max of them.
 * 
 * now we iterate from i=3 and
 * we have two choices.
 * 1) We do not consider ith element
 *    if we do not consider ith element then dp[i] = dp[i-1]
 * 
 * 2) If we consider ith item then
 * dp[i] = dp[i-2]+ arr[i-1].
 * 
 * We need max of these two cases so 
 * 
 * dp[i] = Math.max(dp[i-1], dp[i-2]+ arr[i-1])
 * 
 * return dp[n];
 *    
 */

function maxSumNoConsecutive1(arr: number[], n: number) {
    let dp: number[] = [];
    dp[0] = 0;
    dp[1] = arr[0];
    dp[2] = Math.max(arr[0], arr[1]);

    for (let i = 3; i <= n; i++) {
        dp[i] = Math.max(dp[i - 1], arr[i - 1] + dp[i - 2]);
    }
    return dp[n];
}