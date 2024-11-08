/**Given a value n, the task is to find the nth fibonacci number
 * 
 * For ex: n=0, o/p = 0
 * 
 * For ex: n=1 , o/p = 1
 * 
 * For ex: n=2, o/p = 1
 * 
 * For ex: n = 3, o/p = 2
*/


/**Approach1: 0(2^n),0(n) 
 * 
 * Recursive approach
 * 
 * This approach is simply based on recursion 
 * For ex: Fib(3) = Fib(2)+ Fib(1)
 * 
 * So any fibonacci number can be written as fib(n) = fib(n-1)+fib(n-2)
 * i,e the sum of the last two fib numbers from it.
 * 
 * We can formulate the base cases for recursion as Fib(0) = 0 and fib(1) = 1.
 * 
 * Lets understand this: say n=4
 * 
 *                                          fib(4)
 *                            fib(3)                        fib(2)
 *                      fib(2)        fib(1)           fib(1)      fib(0)
 *                 fib(1)     fib(0)
 * 
 * Clearly we can see that there are multiple overlapping sub problems which are being computed again and again and thus
 * we can optimize it using dp.
 * 
 * Using memoization which is top to bottom approach or tabulation which is bottom to top approach.
 * 
 * 
*/
function nthFibonacci(n: number) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    return nthFibonacci(n - 1) + nthFibonacci(n - 2);
}


/**Approach2: 0(n),0(n) 
 * 
 * Now since in the previous solution we were computing overlapping subProblems again and again thus we can use
 * top to bottom approach and store the computation of the subProblems in a memo table and use it for the overlapping
 * sub problems.
 * 
 * So we create a memoize table and try to fill it.
 * 
 * say for n=4.
 * 
 * Initially memoize table is empty for n=4
 * 
 * So we went into recursion from top to bottom approach, i,e fib(4) = fib(3)+fib(2)
 * 
 * Now again first for fib(3), n=3 table entry is also empty so we went fib(2)+fib(1)
 * 
 * n=2 entry is empty so we went fib(1)+fib(0)
 * 
 * now n=1 so we set res as n, so memoize[1] = 1 now
 * now for n=0 we set res as n, so memoize[0] = 0 now
 * 
 * Now the call returns to parent i,e fib(2) which gets set as fib(1)+fib(0) i,e memo[2] = 1
 * Similarly the call gets back to parent and fib(3) gets set as fib(2)+fib(1) i,e memo[3] = 1+1 = 2
 * 
 * Now again call gets back to parent and fib(4) gets set as fib(3)+fib(2) i,e memo[4] = 2+1 = 3
 * 
*/
let memoize: number[] | undefined[] = [];
function nthFibonacci1(n: number) {
    if (memoize[n] === undefined) {
        let res: number;
        if (n === 0 || n === 1) {
            res = n;
        } else {
            res = nthFibonacci1(n - 1) + nthFibonacci1(n - 2);
        }

        memoize[n] = res;
    }
    return memoize[n];
}

/**Approach3: 0(n),0(n)
 * 
 * Tabulation approach , its also known as bottom to top approach and is more preferred solution in dp.
 * Now lets understand that we need a table of how many dimensions.
 * Since there is only one parameter which is changing in this function i,e n over time in the previous recursion call and
 * thus we need a 1-D array.
 * 
 * Now here we are moving from bottom to top i,e for n=4 we start from n=0 till we reach 4.
 * 
 * so lets first fill table based on base cases.
 * 
 * n=0, res = 0
 * n=1, res= 1
 * 
 * so dp[0] = 0;
 * dp[1] = 1
 * 
 * now dp[2] = dp[1]+dp[0] i,e 0+1 = 1
 * 
 * simply we can say that if i start traversal from i=2, then
 * dp[i] = dp[i-1]+dp[i-2];
 * 
 * simply return dp[n]
 * 
 */
let dp: number[] = [0, 1];
function nthFibonacci2(n: number) {
    if (dp[n] !== undefined) return dp[n];
    let lastIndex = dp.length - 1;
    for (let i = lastIndex + 1; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
