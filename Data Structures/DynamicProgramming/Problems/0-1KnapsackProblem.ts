/**Given an array of arrays or say array of object where each object has two properties one is weight and one is 
 * the value of that.
 * 
 * We are also given a knapsack or say a bag of certain capacity that this much weight it can hold.
 * The task is to place the items in this knapsack/bag in such a way that we can get the max value.
 * We are not allowed to place fractional weights in the bag.
 * 
 * Fractional weights are allowed in a different problem which was fractional knapsack problem in greedy.
 * 
 * For ex:
 * 
 * [{weight: 5, value: 10}, {weight: 4, value: 40}, {weight: 6, value: 30},{weight:3, value: 50}]
 * knapsack capacity = 10.
 * 
 * o/p: 90 i,e weight 3 of value 50 and weight 4 of value 40 we can choose to maximize the value within the given knapsack
 * capacity limit.
 * 
 * 
 * For ex: 
 * [{weight: 10, value: 60}, {weight: 20, value: 100}, {weight: 30, value: 120}]
 *  knapsack capacity = 50
 * 
 *  o/p: 220 i,e we can choose weight 30 of value 120 and weight 20 value 100 to maximize the value within the given knapsack
 * capacity limit.
 * 
 * 
 */

/**Approach1: 0(2^n),0(n)
 * 
 * Recursion there are two possible cases which can arise.
 * 
 * Case1: the weight is greater than the given capacity so we don't choose it and move ahead.
 * Case2: The weight is lesser or equal to the given capacity so we have two options
 *        1. Choose it
 *        2. Don't choose it
 *        
 *        We have to get max of these two cases.
 * 
 * Since we need to find the max value thus when we consider an item or choose it we also add the value associated with that item
 */

function zeroOneKnapSackProblem(weights: number[], values: number[], n: number, capacity: number) {
    if (n === 0 || capacity === 0) return 0;
    if (weights[n - 1] > capacity) {
        return zeroOneKnapSackProblem(weights, values, n - 1, capacity);
    } else {
        return Math.max(
            zeroOneKnapSackProblem(weights, values, n - 1, capacity),
            values[n - 1] + zeroOneKnapSackProblem(weights, values, n - 1, capacity - weights[n - 1])
        );
    }
}



/**Approach3: 0(w*n)
 * 
 * In the above recursion two parameters are changing i,e capacity and n which is the pointer for iteration over value or weight array.
 * So we will be formulating a 2-d dp array of dimensions (n+1)*(capacity+1).
 * 
 * now if n===0 this means that there is no value or weight so simply we mark that row as 0.
 * now if knapsack capacity is 0 then also irr respective of value of n, we mark it as 0 since we can't get value associated with this case even.
 * 
 * so till now out dp array looks like:
 * 
 * Say for example: 
 * 
 * weight = [5,4,6,3]
 * value = [10,40,30,50]
 * n = 4
 * capacity = 10
 * 
 * dp = [0,0,0,0,0,0,0,0,0,0,0
 *       0
 *       0
 *       0
 *       ]
 * 
 * now we start iteration from i=1 resembling rows and j=1 resembling columns.
 * dp[i][j] represents max value which we can collect with i items and a knapsack capacity of j.
 * 
 * So there arise two cases 
 * Case1: the weight is greater than the given capacity so we don't choose it and move ahead.
 * Case2: The weight is lesser or equal to the given capacity so we have two options
 *        1. Choose it
 *        2. Don't choose it
 *        
 *        We have to get max of these two cases.
 * 
 * So if weight[i-1] > j this means that the weight is greater than the given capacity so we don't choose it and move ahead
 *      dp[i][j] = dp[i-1][j]
 * 
 * Case2: The weight is lesser or equal to the given capacity so we have two options
 *        1. Choose it
 *        2. Don't choose it
 * 
 * if we choose it this means dp[i][j] = dp[i-1][j-weights[i-1]]
 * if we don't choose this means dp[i][j] = dp[i-1][j]
 * and if we choose then the value of the item also needs to be considered i,e values[i - 1]
 * 
 * we need to take max of them
 * 
 * dp[i][j]= Math.max(dp[i - 1][j],
                    values[i - 1] + dp[i - 1][j - weights[i - 1]])
 *
 */

function zeroOneKnapSackProblem1(weights: number[], values: number[], n: number, capacity: number) {
    let dp: number[][] = [];
    for (let i = 0; i <= n; i++) {
        dp[i] = [];
        dp[i][0] = 0;
    }
    for (let i = 0; i <= capacity; i++) {
        dp[0][i] = 0;
    }    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= capacity; j++) {
            if (weights[i - 1] > j) {
                dp[i][j] = dp[i - 1][j];
            } else {
                dp[i][j] = Math.max(
                    dp[i - 1][j],
                    values[i - 1] + dp[i - 1][j - weights[i - 1]]
                )
            }
        }
    }
    return dp[n][capacity];
}

console.log(zeroOneKnapSackProblem1([5,4,6,3],[10,40,30,50],4,10))
