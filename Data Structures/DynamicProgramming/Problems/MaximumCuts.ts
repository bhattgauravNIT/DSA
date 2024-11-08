/**
 * Given a rod of length n, and three cut sizes i,e a, b and c.
 * Give the maximum number of cuts which can be done by cutting this rod of length n either by making cuts of a or b or c. So length of the rod after
 * making the cuts should be either a or b or c.
 * 
 * 1. n=5, a = 1, b=2, c=3
 * 
 * o/p: 5 i,e if we make 5 cuts of 1 each.
 * 
 * Another possibility i,e make cut of 2 and 3 but it will make 2 pieces only so max number of cuts is 5.
 * 
 * We need to make max number of cuts.
 * 
 * 2. n=23, a = 12, b=11, c=13
 * o/p: 2 i,e if we make two cuts of a=12 and one cut b=11 each.
 * 
 * 3. n=3, a = 2, b=4, c=2
 * o/p: -1 i,e we can't make any cut as if we make a=2 cut then n=1 will be left which is not available in remaining cuts.
 *       b=4, we can't make a cut of 4 in a rod of n=3 length
 * 
 * Thus o/p is -1.
 * 
 */


/**Approach1: 0(3^n),0(n)
 * 
 * Plain recursion same as that of rope cutting problem
 * 
   We go by the brute force way that is we recursively cut the rope by a length slice, then by b length slice and then by c length slice.
   We take max out of these cases.
   Base case: 
   1) If the rope length becomes 0 we simply return 0 indicating that there is no way to cut this rope further or it means 
      there’s no rod left to cut, so no further cuts are possible.
   2) If n becomes negative, it means we’ve tried a cut that exceeds the remaining length of the rod. 
      For example, if the remaining length is 2 and we try to cut a piece of size 3, it leaves n as -1, which is invalid.
      In this case, we return -1 to indicate that the current path of cuts does not lead to a valid solution.


 */
function maxCuts(n: number, a: number, b: number, c: number) {
    if (n === 0) return 0;
    if (n < 0) return -1;
    let res = Math.max(
        maxCuts(n - a, a, b, c),
        maxCuts(n - b, a, b, c),
        maxCuts(n - c, a, b, c),
    )
    if (res === -1) return -1;
    return res + 1;
}

/**Approach2: 0(n),0(n)
 * 
 * In the above approach there are overlapping su Problems and thus we can use DP , tabulation bottom to top approach.
 * Since in the above recursion there is only one changing parameter which is n, this we use a 1-d array.
 * We formulate a DP array of length n as we need to take care of base case when n===0
 * For n=0, dp[0] = 0 as if rod length is 0, there is no way to cut it further.
 * 
 * Now we start iteration from i=1, till n and we make cut of a if possible
 * similarly we make cut of length b if possible.
 * similarly we make cut of length c is possible.
 * 
 * So initially dp[i] = -1;
 * if(i-a) >= 0 this means yes we can make a cut of a length for current ith length of rod.
 * dp[i] = Max(dp[i],dp[i-a]);
 * 
 * if(i-b) >= 0 this means we can make a cut of b length for current ith length of rod 
 * dp[i] = Max(dp[i],dp[i-b]);
 * 
 * if(i-c) >=0 this means we can make a cut of length c for current ith length of rod
 * dp[i] = Max(dp[i],dp[i-c]);
 * 
 * So in this way dp[i] will be filled with max cuts that we can make by considering length of a,b or c.
 * 
 * Now if dp[i] === -1 this means no possible cut can be made either of a or b or c.
 * else if dp[i] !== -1 we add +1 to it indicating that we made a cut.
 * 
 * Since we need to find max cuts for nth length rod thus dp[n] is the answer.
  */

function maxCuts1(n: number, a: number, b: number, c: number) {
    let dp: number[] = [0];
    for (let i = 1; i <= n; i++) {
        dp[i] = -1;
        if (i - a >= 0) dp[i] = Math.max(dp[i], dp[i - a]);
        if (i - b >= 0) dp[i] = Math.max(dp[i], dp[i - b]);
        if (i - c >= 0) dp[i] = Math.max(dp[i], dp[i - c]);
        if(dp[i] !== -1) {
            dp[i] = dp[i]+1;
        }
    }
    return dp[n];
}

