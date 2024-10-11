/**
 * Given two strings say s1 and s2, the task is to find the longest common subSequence.
 * A subsequence is subString of a given string which is not strictly contiguous but is in order as same of given string so for ex:
 * 
 * s = "abc" all possible subSequence of the string s is
 * 
 * ""
 * "a"
 * "b"
 * "c"
 * "ab"
 * "ac"
 * "bc"
 * "abc"
 * 
 * Clearly we can see that ac is a subSequence its not strictly contiguous but follows same order as a is before c.
 * 
 * A string of length n will be 2^n subSequences.
 * 
 * So given two strings s1 and s2 we need to find the length of the longest common subSequence.
 * 
 * For ex:
 * 
 * s1 = "abc" , s2 = "adc"
 * 
 * So length of longest common subSequence for s1 and s2 is 2 i,e ac 
 * 
 * Lets see all subSequence of s1: "abc"
 * 
 * ""
 * "a"
 * "b"
 * "c"
 * "ab"
 * "ac"
 * "bc"
 * "abc"
 * 
 * Now lets see all subSequence of s2: "adc"
 * 
 * "a"
 * "d"
 * "c"
 * "ad"
 * "ac"
 * "dc"
 * "adc"
 * 
 * Clearly there are many common subSequence like "a","c","ac". So longest is ac of length 2 so o/p is 2.
 * 
 * 
 * For ex: s1 = "acaadb"
 *          s2 = "cbda"
 * 
 * o/p: 2 i,e "ca"
 * 
 */

/**Approach1: 0(2^n),0(n)
 * 
 * Plain recursion
 */
function longestCommonSubSequence(s1: string, s2: string, m: number, n: number) {
    if (m === 0 || n === 0) {
        return 0;
    } else {
        if (s1[m - 1] === s2[n - 1]) {
            return 1 + longestCommonSubSequence(s1, s2, m - 1, n - 1);
        } else {
            return Math.max(longestCommonSubSequence(s1, s2, m - 1, n), longestCommonSubSequence(s1, s2, m, n - 1));
        }
    }
}


/**Approach2: 0(m*n),0(m*n)
 * 
 * Memoization with recursion
 */
let memo: number[][] = [];
function longestCommonSubSequence1(s1: string, s2: string, m: number, n: number) {
    if (!memo[m]) memo[m] = [];
    if (memo[m][n] === undefined) {
        if (m === 0 || n === 0) {
            memo[m][n] = 0;
        } else {
            if (s1[m - 1] === s2[n - 1]) {
                memo[m][n] = 1 + longestCommonSubSequence1(s1, s2, m - 1, n - 1);
            } else {
                memo[m][n] = Math.max(longestCommonSubSequence1(s1, s2, m - 1, n), longestCommonSubSequence1(s1, s2, m, n - 1));
            }
        }
    }
    return memo[m][n];
}

/**
 * Approach3: 0(m*n),0(m*n)
 * 
 * Tabulation
 */
function longestCommonSubSequence2(s1: string, s2: string, m: number, n: number) {
    let dp: number[][] = [];
    for (let i = 0; i <= m; i++) {
        dp[i] = [];
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = 0;
    }
    for (let i = 0; i <= m; i++) {
        dp[i][0] = 0;
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}

console.log(longestCommonSubSequence("acaadb", "cbda", 6, 4));
console.log(longestCommonSubSequence("axyz", "baz", 4, 3));


/**Applications of LCS */