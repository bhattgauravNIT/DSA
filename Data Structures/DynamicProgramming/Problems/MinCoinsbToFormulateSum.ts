/**Given an infinite supply of coins where coins denomination value is given via a array coins, also given a
 * sum value which we need to formulate.
 * 
 * Find the min number of coins needed to formulate the sum.
 * 
 * For ex: coins = [25,10,5] value = 30
 * 
 * Possible ways are
 * 1) Choose 1 coin of 25 and one coin of 5
 * 2) Choose 3 coins of 10
 * 3) Choose 6 coins of 5
 * 
 * Clearly min 2 coins i,e one of 25 and one of 5 are needed to make the sum thus
 * o/p: 2
 * 
 * 
 * Ex: coins = [9,6,5,1] value = 11
 * 
 * Possible ways are
 * 1) 1 coin of 9 and 2 coins of 1
 * 2) 1 coin of 6 and 1 coin of 5
 * 3) 2 coins of 5 and 1 coin of 1
 * 4) 11 coins of 1
 * 
 * clearly min number of coins to formulate the sum is 2 i,e 1 coin of 6 and one of 5
 */


/**Note Point
 * 
 * In greedy we sort the array in descending and initialize res = 0. After that we iterate over all coins and see if amount >= coin value
 * if yes we take val =  Math.floor(amount/coin[i]) and add this count to res and reduce the amount by amount - (val* coin[i]).
 * If at any time amount becomes 0 we come out of loop.
 * 
 * This approach follows greedy as we first take into account the first highest value and then process further hence called greedy. 
 * However if we consider case of say [18,1,10] coin values, so according to greedy we first sort and start with first value which is greedy way of solving it. 
 * So coins = [18,10,1] now say we need to make 20 rupees, so greedy will start with 18 and see that 1 coin of 18 is needed.
 * Added 1 to res and amount remaining is 2.
 * 
 * Clearly 2 is lesser than 18 we move to next iteration , now saw 10 again the amount remaining is lesser than 10 so move to next iteration, now
 * saw 1 which is lesser than currentAmount and thus calculated that 2 coins of 1 are needed to make the remaining amount as 0.
 * Thus give res as 1+2 =3 
 * However its not correct because 2, 10 rupees coin can make 20 rupees in more optimized way and thus greedy doesn't work in every case.
 * 
 * Greedy does not work in this case.
 */


/**Approach1: 0(coins^sum)
 *  For ex: coins = [25,10,5] value = 30
 *  Base case of recursion: if sum becomes 0 this means we have successfully formulated a path and we simply return 0 as no more coins are needed further as sum 
 *  itself is 0.
 * 
 *  We start our iteration and for every ith coin we see if coin value is lesser than sum, then we take that coin by reducing the sum value with coin value
 *  and recursively search that how we can now formulate the remaining sum.
 * 
 *  if this recursion is giving us a valid answer then we check for min using res = Math.min(res, sub_res + 1);
 *  + 1 is added to account for the current coin we just used to form part of the target sum.
  */

function minCoinsToFormulateSum(coins: number[], sum: number) {
    if (sum === 0) return 0;
    let res = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < coins.length; i++) {
        if (coins[i] <= sum) {
            let sub_res = minCoinsToFormulateSum(coins, sum - coins[i]);
            if (sub_res && sub_res !== Number.MAX_SAFE_INTEGER) {
                res = Math.min(res, sub_res + 1);
            }
        }
    }
    return res;
}


/**Approach : 0(n*sum),0(sum)
 * 
 * Since in the above approach there are overlapping sub problems thus we can use dp tabulation technique which is bottom up.
 * In the above recursion there is only one parameter which is changing i,e sum so we create a 1-D dp array.
 * We initialize a dp array of length sum because we need to take care of base case when sum = 0 then total coins needed to formulate a sum zero is also 0.
 * 
 * Rest all other values of this dp array is infinite.
 * 
 * Now we start iteration from i=1 till -> sum
 * 
 * For every ith sum value we check what number of coins are needed and we take min out of them.
 * 
 * SO if coins[j] value is less than or equal to ith sum value then we can say then 
 * dp[i] = Math.min(dp[i],1+dp[i-coins[j]]) we did 1+ because we are including the jth coin .
 * 
 * In this way the dp array gets formulated and we return dp[sum]
 * 
 * if dp[sum] is Infinite this means no possible coins can make this sum hence we return -1.
 * 
 * Lets understand this with help of an example.
 * 
 * Coins = [1,2,3] value = 4
 * 
 * dp = [0,Infinite,Infinite,Infinite]
 * 
 * for i=1 current sum value = 1;
 *     move j from 0->coins.length
 *     j=0;
 *     1 < 1 so we can make sum 1 using a 1 rupee coin
 *     dp[1] = min(infinite, 1 + dp[1-1]) = min(infinite,1) = 1
 * 
 * and so on..... 
 *          
*/

function minCoinsToFormulateSum1(coins: number[], sum: number) {
    let dp: number[] = new Array(sum + 1).fill(Number.MAX_SAFE_INTEGER);
    dp[0] = 0;
    for (let i = 1; i <= sum; i++) {
        for (let j = 0; j < coins.length; j++) {
            if (coins[j] <= i) {
                dp[i] = Math.min(dp[i], 1 + dp[i - coins[j]])
            }
        }
    }
    return dp[sum] === Number.MAX_SAFE_INTEGER ? -1 : dp[sum];
}

console.log(minCoinsToFormulateSum1([1, 3, 4, 5], 7));