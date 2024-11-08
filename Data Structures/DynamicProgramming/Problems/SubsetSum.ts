/**
 * Given an array, and a sum value the task is to tell the number of subsets whose sum is 
 * equal to the given sum.
 * 
 * For ex: arr = [10,5,2,3,6], sum = 8
 * o/p:2 there are two subsets with sum 8 i,e {5,3} and {2,6}
 * 
 * arr = [1,2,3] , sum = 4
 * o/p: 1 i,e {1,3}
 * 
 * arr = [10,20,15]
 * sum = 37
 * 
 * o/p: 0, there exits no subset with sum 37
 * 
 * arr = [10,20,15]
 * sum = 0
 * 
 * o/p: 1 there exists one subset {} empty subset whose sum is zero.
 * 
 * In subsets the oder does not matter whereas in subsequence the order matter.
 */

/**Approach1: 0(2^n),0(n)
 * 
 * We will be using recursion to solve the problem.
 * Lets understand base cases:
 * 
 * We will be reducing the given sum value via inclusion and exclusion of every element of the array.
 * If sum becomes 0 it resembles that yes we found a valid subset of the given sum and thus
 * we return 1 , stating we found one subset.
 * 
 * If n===0 this means that no elements are left and thus if we don't have any element than simply there can be no subset and thus we return 0.
 * 
 * We won't be using any separate pointer as will simply be using n i,e the length of array as pointer only.
 *  
 * Now there are two cases for every element. 
 * 1. We include it
 * 2. We don't include it.
 * 
 * If we include the element then we reduce the n by 1 stating we move to next element and also reduce the sum by sum - arr[n-1], 
 * subsetSum(arr, n - 1, sum - arr[n - 1]);
 * 
 * If we exclude the element then we reduce the n by 1 stating we move to next element and now don't reduce the sum i,e subsetSum(arr, n - 1, sum);
 * 
 * We return the sum of both these cases.
 */

function subsetSum(arr: number[], n: number, sum: number): number {
    if (sum === 0) return 1;  
    if (n === 0) return 0;

    let excludeLast = subsetSum(arr, n - 1, sum);

    let includeLast = 0;
    if (arr[n - 1] <= sum) {
        includeLast = subsetSum(arr, n - 1, sum - arr[n - 1]);
    }

    return includeLast + excludeLast;
}

/**Approach2:0(n*sum)
 * 
 * Now there are two parameters which are changing in the above recursion i,e the sum and n.
 * So we need to formulate a 2-d dp array of size (n+1)*(sum+1).
 * 
 * Lets understand the base case:
 * if sum === 0, then no matter the value of n we return 1, as if sum becomes 0 it resembles that yes we found a valid subset of the given sum and thus
 * we return 1 , stating we found one subset.
 * so dp[i][0] = 1
 * 
 * if n===0 then matter what the value of sum is the entry should be 0, as if n===0 this means that no elements are left and thus if we don't 
 * have any element than simply there can be no subset and thus we return 0.
 * dp[0][j] = 0
 * 
 * so for ex: arr = [1,2,3] , sum = 4
 * 
 * dp array will look like:
 * 
 * dp = [1,0,0,0,0
 *       1
 *       1
 *       1
 *       ]
 * 
 * Now we start from i=1 and j=1 and will try and compute number of subsets with sum j for every ith size array.
 * 
 * So there were two cases:
 * 1. We include it
 * 2. We don't include it.
 * 
 * if we don't include the ith element than, then 
 * dp[i][j] = dp[i-1][j]
 * 
 * if we include the ith element
 * dp[i][j] = dp[i-1][j-dp[i-1]]
 * 
 * Overall dp[i][j] will be the sum of included and excluded case
 * 
 */
function subsetSum1(arr: number[], n: number, sum: number) {
    let dp: number[][] = [];
    for (let i = 0; i <= n; i++) {
        dp[i] = []
        dp[i][0] = 1;
    }
    for (let j = 1; j <= sum; j++) {
        dp[0][j] = 0;
    }
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= sum; j++) {
            if (j < arr[i - 1]) {
                /**exclude directly */
                dp[i][j] = dp[i - 1][j];
            } else {
                /**once exclude and once include */
                dp[i][j] = dp[i - 1][j] + dp[i - 1][j - arr[i - 1]];
            }
        }
    }
    return dp[n][sum];
}


console.log(subsetSum([1, 2, 3], 3, 4));