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
 * Lets understand the Plain recursion approach.
 * We will start will end of both the strings lets suppose m is length of s1 and n is length of s2.
 * say s1 = "abc" , s2 = "adc"
 * 
 * so for the base case of recursion we will see if at any point m===0 or n===0 meaning say we need to find longest common subsequence
 * for "","ab" or we need to find longest common subsequence for "ab","" so answer will be 0, because empty string subsequence only
 * will be common in the subsequence of both the strings.
 * 
 * Now s1 = "abc" , s2 = "adc"
 * so there can arise two cases while computing length of longest common subsequence.
 * We will consider from last chars of both the strings as in this we does not need to maintain additional pointers and can directly use 
 * lengths of both the strings respectively.
 * 
 * Case1: Both the chars matches: This char is a potential candidate in longest common subsequence and thus
 * if(s1[m-1]===s2[n-1]) then we include this char in longest common subsequence length and recursively check for remaining chars in both strings
 * i,e 1 + recursively check for remaining chars in both strings
 * 
 * i,e 1 +  longestCommonSubSequence(str, m-1,n-1);
 * 
 * Case2: Both the chars does not match so lets say 
 * s1 = "abc" , s2 = "adc"
 * after first check we are not with substrings "ab","ad"
 * last chars of these does not match now so in this we will check for two possibilities
 *     a) Recursively check for substring by Including last char of first string and not including last char of second string.
 *     b) Recursively check for subString by not including last char of first string and including last char of second string.
 * 
 *     For a) longestCommonSubSequence(str,m,n-1)
 *         b) longestCommonSubSequence(str,m-1,n)
 * 
 *  Since we need length of longest common subsequence so we take out max from both the calls.
 * 
 * Lets understand it better with diagram.
 * 
 *   "abc","adc" -> Last character matches check for "ab","ad"
 *                              1 + 
 *                              -> Last char does not matches 
 *                                         str1 = "ab",str2 = "ad"
 *                                         a) Include last char of str1 and exclude last char of str2: "ab","a"
 *                                                       -> last char does not matches:
 *                                                          str1 = "ab",str2=  "a"
 *                                                          a1) Include last char of str1 and exclude last char of str2
 *                                                              str1 = "ab",str2 = "" base case reached-> return 0.
 * 
 *                                                          b1)Exclude last char of str1 and include last char of str2
 *                                                              str1 = "a",str2 = "a"
 *                    
 *                                                              Last character matches check for str1 = "",str2 = ""
 *                                                              Base case reached return 0.
 * 
 *                                                              This call returned 1+0 = 1.
 * 
 *                                         b) Exclude last char of str1 and include last char of str2: "a","ad"
 *                                                         last char does not match 
 *                                                         ba1)Include last char of str1 and exclude last char of str2
 *                                                             str1 = "a",str2 = "a"
 *                                                             This we have already solved previously in b1
 *                                                             return 1.
 *                                                    
 *                                                         ba2)Exclude last char of str1 and include last char of str2
 *                                                             str1 = "",str2 = "ad"
 *                                                             Base case reached return 0
 * 
 * So max from left call and right call is (1) which gets added to 1 initially for parent call and thus we get 2 which is the 
 * length of longest common subsequence.
 *  
 *                                            
 * 
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
 * Memoization with recursion.
 * 
 * Since there were overlapping subProblems which we seen in recursive solution which were getting computed again and again thus we can use dynamic programming.
 * Since there are two parameters which are changing in recursion i,e length of s1 and length of s2 thus we need a 2d array.
 * 
 * So lets call it memo;
 * So memo: number[][] = []
 * 
 * Now we are considering rows as m and columns as n.So if memo[m] is undefined then memo[n] = [];
 * If memo[m][n] is undefined this means this subproblem which we are encountering is seen for the first time and hasn't been computed yet and thus
 * we compute it via plane recursion.
 * 
 * The base case is when n===0 or m===0 meaning we are encountering empty string then simply we returned 0 as the common subsequence in such cases is an
 * empty string only which is of length 0, thus memo[m][n] when n===0 || m===0 will be 0 only.
 * 
 * Now we use above simply recursion and instead of returning as above we will store it in memo array.
 * 
 * So if 
 * 1) Last ending chars matches i,e s1[m - 1] === s2[n - 1]
 *                 we store value of 1 + recursivelyCallFor(str1,str2,m-1,n-1) in memo[m][n]
 * 
 * 2) Last ending chars does not match
 * a) Recursively check for substring by Including last char of first string and not including last char of second string.
 * b) Recursively check for subString by not including last char of first string and including last char of second string.
 * 
 * Store mac of both in memo[m][n]
 * 
 * If memo[m][n] is itself now undefined meaning its been computed earlier as well. Thus we simply return memo[m][n]
 * 
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
 * Now this is bottom to top approach in DP, here we will be prefilling the dp 2-d array which we need because of two changing parameters and then will fill
 * rest of the entries based on previous entries.
 * 
 * Lets understand this:
 * Initially we will be having a dp[][] say of dimension (m+1)*(n+1), we are using (m+1) * (n+1) and not m*n because we 
 * need an extra row and column to handle the base case where one of the strings has a length of 0.
 * 
 * So say s1 = "abc" , s2 = "adc"
 * 
 * So we will make a 4*4 dp array starting index 0,1,2,3 for rows and
 * starting index 0,1,2,3 for columns.
 * 
 * Now if m===0 or say n===0 this simply means that length of longest common subsequence will simply be 0 as we are encountering an empty string.
 * Now our dp table looks like
 * 
 * dp = [ 0, 0, 0, 0
 *        0       
 *        0
 *        0         ]
 * 
 *  we start filling from i=1 and j=1.
 *  so if s1[i-1] === s2[j-1] where we are considering i pointer for str1 and j pointer for str2.
 *  if last char matches this means dp[i][j] will simply be 1 + dp[i-1][j-1] because previously in recursion we were doing 1 + recursivelyCallFor(str1,str2,m-1,n-1)
 *  i,e  1 + removing the last char from both the strings.
 * 
 *   we have included the matching last char in longest common subsequence and we after removing the last char from s1 we will have i pointer
     to i-1 and removing last char from s2 our j pointer will be at j-1. So dp[i-1][j-1] will be storing the value of longest common
     subsequence after removing last char from both strings.
 * 
 *  Now else when last char does not matches in recursion we were doing Math.max(longestCommonSubSequence1(s1, s2, m - 1, n), longestCommonSubSequence1(s1, s2, m, n - 1))
 * this means 
 * 
 *   dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1]);
 *  
 *  If last char does not match then 
    a) remove the last char of first string and keep second string as it is , so i points to i-1 and j remains as it is.
       dp[i-1][j] contains the length of longest common subsequence for this substring.

    b) do not remove the last char of second string and remove the last char of second string, so i remains as it is and j points to j-1
       dp[i][j-1] contains the length of longest common subsequence for this substring.
                           
    Take max of it as we need the longest common subsequence.
 * 
 *   Now thus using this logic our dp table will get filled.
 *   Since we need longest common subsequence of str1 of original length 3 and str2 of original length 3 i,e s1 = "abc" , s2 = "adc"
 *   thus dp[3][3] will be storing the answer.
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