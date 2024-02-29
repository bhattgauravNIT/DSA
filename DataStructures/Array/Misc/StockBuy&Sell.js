/**Given an array resembling prices of stocks on ith day, find the max profit.
 * 
 * Ex: arr = [1,5,3,8,12]
 * 
 * If we buy on day 1 at price 1 and sell at price 5 on day 2. Profit is 4
 * Again we buy on day 3 at price 3 and sell on price 12 . Profit is 9
 * So max profit we can get is 13 i,e (9+4)
 */

/**Approach: 0(n),0(1)
 * 
 * Idea is ex:
 * 
 * arr = [1,5,3,8,12];
 * 
 * so we can have a max profit if and only if arr[i]> arr[i-1]. Because then only we should sell to get a profit.
 * In above example if we buy at day 1 with value 1 and sell at day 2 at value 5 our profit is getting 4. 
 * Then if we buy at day 3 at price 3 and sell at day 5 at price 12 our profit is 12-3 = 9
 * 
 * So overall profit is 4+9 = 13.
 * 
 * Another way of thinking this is:
 * 
 * so we can have a max profit if and only if arr[i]> arr[i-1]. Because then only we should sell to get a profit.
 * In above example if we buy at day 1 with value 1 and sell at day 2 at value 5 our profit is getting 4. 
 * Then if we buy at day 3 at price 3 and sell at day 4 at price 8 our profit is 5.
 * Again we buy at day 4 at price 8 and sell at day 5 at price 12 we get profit 4.
 * 
 * Overall profit is 4+5+4 = 13.
 * 
 * So irrespective of having an additional buy and sell in the below scenario our profit remains same and thus 
 * 
 * if(arr[i]>arr[i-1]) we can have a profit.
 */
function MaxProfit(arr) {
    let profit = 0;
    let i = 1;
    while (i < arr.length) {
        if (arr[i] > arr[i - 1]) {
            profit += arr[i] - arr[i - 1];
        }
        i++;
    }
    return profit
}
