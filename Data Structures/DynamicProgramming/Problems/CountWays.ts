/**
 * Given an infinite supply of coin the task is to give the total number of ways in which this given sum can be formulated out of the given
 * infinite supply of coin.
 * 
 * For ex; coins = [1,2,3]
 *         sum = 4
 * 
 * The number of ways in which we can make a sum 4 out of given infinite supply of coins are:
 * 
 * 1. (1,1,1,1) i,e 4 coins of 1
 * 2. (2,2) i,e 2 coins of 2
 * 3. (1,3) i,e one coin of 1 and one coin of 3
 * 4. (2,1,1) i,e 1 coin of two and 2 coins of 1
 * 
 * o/p : 4
 * 
 * 
 * For ex: [2,5,3,6]
 *          sum = 10
 * 
 * o/p: 5
 * 
 * 1. (2*5) i,e 5 coins of two
 * 2. (2*2 + 3*2) i,e two coins of 2 and 2 coins of 3
 * 3. (2,3,5) i,e one coin of 2 and 3 and 5
 * 4. (2,2,6) i,e 2 coins of 2 and 1 coin of 6
 * 5. (5,5) i,e two coins of 5.
 */

/**Approach1: 0(2^n),0(n)
 * 
 * Recursive approach
 * 
 * arr = [1,2,3]
 * sum = 4
 * 
 * Lets understand this recursion:
 * Total ways = Ways in which a coin is being included + ways in which a coin is not being included.
   So for every coin we have two choices either to include it or not to include it.

   We start considering coins from last coin as we need not to maintain a separate pointer in case of considering from last as the
   given length of the coins array can itself be used as a pointer.

   let includeLastCoinWays = recursivelyCallFor(coins, n, sum -arr[n-1]);
   here n does not change i,e even after including the last coin there is again of possibility of including it again in subsequent calls as its infinite
   in number. The sum will get changed now as we have included one instance of the last coin and thus sum becomes sum - arr[n-1].

   let excludeLastCoinWays =  recursivelyCallFor(coins, n-1, sum);
   here n has changed to n-1 and we have excluded the last coin and checking for remaining length array of coins, since we didn't included the last coin so
   the sum remain unchanged.

   return includeLastCoinWays + excludeLastCoinWays

 */

function countWays(coins: number[], n: number, sum: number): number {
    if (sum === 0) return 1;
    if (sum < 0) return 0;
    if (n === 0) return 0;
    let lastCoinIncluded = countWays(coins, n, sum - coins[n - 1]);
    let lastCoinNotIncluded = countWays(coins, n - 1, sum);
    return lastCoinIncluded + lastCoinNotIncluded;
}


/**Approach2: 0(n*s),0(n*s)
 * 
 * DP based solution.
 * 
 * Now in the above recursion we saw that two parameters were changing i,e sum and n. So we need a 2-d dp array.
 * We will be doing some pre computation based on our base cases.
 * 
 * So our dp array will be of dimension (n+1) * (sum+1)
 * i,e rows from 0->n and column from 0->sum
 * 
 * we are using an addition 0th row and 0th column to handle the base cases.
 * if(n===0) meaning that there exits no coin thus dp[0][j] should be zero meaning there exists no way.
 * 
 * if(sum === 0) meaning the sum itself is 0. If n===0 && sum ===0 , it should simply be also 1 i,e dp[0][0] as there exist no coin and sum is also 0 so there exists
 * 1 way i,e we don't choose any coin at all.
 * 
 * in other cells if sum if 0 and n is non zero, i,e dp[i][j] where j=0 and i>0
 * it indicate that we found a way and we have achieved by coins combination thus 1 way we found.
 * 
 * so dp array will look like initially say for ex: coins = [1,2,3], sum = 4
 * 
 * dp = [ 1, 0, 0, 0, 0
 *        1
 *        1
 *        1
 *      ]
 * 
 *  Now we will start from i=1 and j=1.
 *  One way is that we include the last coin
 *  One way is that we do not include the last coin
 * 
 *   So if we do not include:
 *   dp[i][j] = dp[i-1][j] where i resembles coins and j resembles sum as we have not included so coins will be reduced and we will be pointing
 *   to i-1 coins where as the sum will remain same i,e j so dp[i-1][j]
 * 
 *   Now if we include so we need to change the current jth sum to (jth sum - this included coin value)
 *   i,e sum = jth sum - coins[i-1]; i - 1 is used because the dp array is set up with an extra row to handle the case when no coins are included i,e i=0
 *   so we cross check wether jth sum >= coins[i-1] then only we include this coin
 * 
 *   dp[i][j] += dp[i][j-coins[i-1]];
 * 
 *   Previously we were adding using lastCoinIncluded + lastCoinNotIncluded'
 *   here we have first marked value of dp[i][j] via case in which we didn't included the coin 
 *   and then to this value only added i,e dp[i][j] += the case when coin is included.
 * 
 *   return dp[n][sum] as we have n coins in coins array and sum is given so dp[n][sum] contains the answer.
 * 
 * 
 **/
function countWays1(coins: number[], n: number, sum: number) {
    let dp: number[][] = [];
    for (let i = 0; i <= n; i++) {
        dp[i] = [];
    }

    for (let i = 0; i < dp.length; i++) {
        dp[i][0] = 1;
    }

    for (let j = 1; j <= sum; j++) {
        dp[0][j] = 0;
    }

    for (let i = 1; i < dp.length; i++) {
        for (let j = 1; j <= sum; j++) {
            dp[i][j] = dp[i - 1][j];
            if (j >= coins[i - 1]) {
                dp[i][j] += dp[i][j - coins[i - 1]];
            }
        }
    }
    return dp[n][sum];
}

