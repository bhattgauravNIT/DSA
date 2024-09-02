/**Given an array of coins where arr[i] resembles coins value and a amount.
 * 
 * The task is to use min possible coins to get the amount return -1 in case its not possible.
 * 
 * For ex: coins= [5,10,2,1]
 *         amount = 57
 * 
 * o/p: 7 coins
 *       5* 10 rupees coins
 *       1* 5 rupees coin
 *       1* 2 rupees coin
 * 
 * For ex: coins = [5,10,2,1]
 *         amount = 15
 * 
 * o/p 2 coins
 *       1* 10 rupees coin
 *       1* 5 rupees coin
 * 
 * 
 * 10,5,2,1
 * 
 * amount = 57
*/

function minCoins(coins: number[], amount: number): number {
    coins.sort((a, b) => b - a);
    if (amount < coins[coins.length - 1]) return -1;
    let res = 0;
    for (let i = 0; i < coins.length; i++) {
        if (amount >= coins[i]) {
            let val = Math.floor(amount / coins[i]);
            res += val;
            amount = amount - (val * coins[i]);
        }
        if (amount === 0) {
            break;
        }
    }
    return res;
}

console.log(minCoins([5, 10, 2, 1], 57));