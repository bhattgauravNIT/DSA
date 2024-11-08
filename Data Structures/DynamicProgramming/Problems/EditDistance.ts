/**
 * Given two strings s1 and s2, we are allowed to do only these three operations i,e
 * 
 * Insertion, deletion or replace.
 * 
 * The task is give the min number of operations required to convert s1 to s2, each operation either be insertion,deletion or replace
 * is considered as 1 operation individually.
 * 
 * For ex: s1 = "CAT", s2 = "CUT"
 * 
 * o/p: 1 i,e simply replace A with U.
 * 
 * For ex: s1= "GEEK", s2 = "GEEKS"
 * 
 * o/p: 1, simply insert S in s1.
 * 
 * For ex: 
 * s1 = "SATURDAY", s2 = "SUNDAY"
 * 
 * o/p: 3
 * 
 * delete A and T
 * replace R with N
 */

/**Approach1: 0(2^(min(m,n))),0(min(m,n))
 * 
 * Using plain recursion
 * Now we need to convert s1 to s2 and thus operations needs to performed on s1.
 * There are three possible operations which can be done i,e
 * 
 * 1.Insert an element in s1 from s2
 * 2. Delete an element from s1
 * 3. Replace an element in s1 with the element in s2.
 * 
 * We will start from comparing last elements of s1 and s2 as in this case we won't be needing separate additional pointers to maintain
 * and the length of s1 i,e m and length of s2 i,e n can itself be used as pointers.
 * 
 * Case1: Last elements of both the strings matches and thus we need not to perform any of the three operation and can simply check for rest
 * strings.
 * 
 * if(s1[m-1]===s2[n-1]) then recursivelyCheckFor(s1,s2,m-1,n-1)
 * 
 * Now if the last string does not matches so we need can perform either of three operations i,e
 * 1) Insert an element in s1 from s2.
 *    In this case the length of s1 will be increased by one or we can say that the last pointer will be at m only.
 *    Since we are inserting an element from s2 to s1 so length of s2 will get reduced by 1 or last pointer will be at n-1.
 *    so recursivelyCheckFor(s1,s2,m,n-1)
 * 
 * 2) Delete an element from s1
 *    In this case since we are deleting the last element from s1 thus length of s1 will be reduced by 1 , or we can say the last pointer
 *    will now be pointing to m-1, whereas the length of s2 will remain same
 *    
 *    so recursivelyCheckFor(s1,s2,m-1,n)
 * 
 * 3) Replacing an element in s1 with the element in s2.
 *     So once we replace an element in s1 with s2, both the last ending elements will be simply same only and thus we recursively check for
 *     remaining string by removing this same char.
 * 
 *     recursivelyCheckFor(s1,s2,m-1,n-1)
 * 
 *    Since we have considered one operation thus we need to add 1 and since we need min operations to convert s1 to s2 so
 *    we take coming from the recursive calls of all these operations.
 * 
 *    return 1 + Math.min(
 *    recursivelyCheckFor(s1,s2,m,n-1),
 *    recursivelyCheckFor(s1,s2,m-1,n),
 *    recursivelyCheckFor(s1,s2,m-1,n-1)
 *    )
 * 
 *   Lets tak about the base cases, there are two parameters which are changing i,e m and n so both can becomes zero
 *   if(m===0) i,e length of s1 becomes 0 so in order to convert s1 i,e empty string to s2, we need to insert all chars of s2 to s1 and thus
 *   we need n operations.
 * 
 *   if(n===0) i,e s2 is now an empty string so inorder to convert s1 to s2 we need to delete all the elements of s1 i,e it needs m operations.
 * 
 * 
 */

function editDistance(s1: string, s2: string, m: number, n: number) {
    if (m === 0) return n; 
    if (n === 0) return m;

    if (s1[m - 1] === s2[n - 1]) {
        return editDistance(s1, s2, m - 1, n - 1);
    } else {
        return 1 + Math.min(
            editDistance(s1, s2, m, n - 1),
            editDistance(s1, s2, m - 1, n), 
            editDistance(s1, s2, m - 1, n - 1) 
        )
    }
}

/**Approach2: 0(m*n),0(m*n)
 * 
 * The above plain recursion is having overlapping sub problems and thus we can use a bottom to top approach of DP to optimize it.
 * Since there are two parameters changing in above recursion i,e  m and n, so we need a 2-d dp array.
 * Now since we need to handle the base case of n===0 or m===0 thus we need this dp array of dimension, 
 * (m+1)*(n+1)
 * 
 * now if m === 0 this means length of s1 becomes 0 so in order to convert s1 i,e empty string to s2, we need to insert all chars of s2 to s1 and thus
 * we need n operations. 
 * so dp[0][j] = j
 * 
 * now if n===0 i,e s2 is now an empty string so inorder to convert s1 to s2 we need to delete all the elements of s1 i,e it needs m operations.
 * so dp[i][0] = i
 * 
 * So initial arrangement of dp array will look like:
 * For ex: s1 = "CAT", s2 = "CUT"
 * 
 * dp = [ 0, 1, 2, 3
 *        1
 *        2
 *        3
 *      ]
 * 
 * Now we start from i=1,j=1
 * 
 * Case1: Last elements of both the strings matches and thus we need not to perform any of the three operation and can simply check for rest
 * strings.
 * 
 * so if(s1[i-1]===s2[j-1]) then dp[i][j] = dp[i-1]dp[j-1]
 * 
 * In case if the last string does not matches so we need can perform either of three operations i,e
 * a)Insert an element in s1 from s2.
 *    In this case the length of s1 will be increased by one or we can say that the  pointer will be at i only.
 *    Since we are inserting an element from s2 to s1 so length of s2 will get reduced by 1 or last pointer will be at j-1.
 *    so dp[i][j-1]
 * 
 * b) Delete an element from s1
 *    In this case since we are deleting the last element from s1 thus length of s1 will be reduced by 1 ,
 *    or we can say the  pointer
 *    will now be pointing to i-1, whereas the length of s2 will remain same
 *    so dp[i-1][j]
 * 
 * c) Replacing an element in s1 with the element in s2.
 *     So once we replace an element in s1 with s2, both the last ending elements will be simply same only and thus we check for
 *     remaining string by removing this same char.
 *     dp[i-1][j-1]
 * 
 * so dp[i][j] = 1 + Math.min(
 *                            dp[i][j-1]
 *                            dp[i-1][j]
 *                            dp[i-1][j-1]
 *                            )
 * 
 *  Since we need answer for s1 of length m and s2 of length n, thus dp[m][n] will give the res. 
 */

function editDistance1(s1: string, s2: string, m: number, n: number) {
    let dp: number[][] = [];
    for (let i = 0; i <= m; i++) {
        dp[i] = [];
    }

    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
            }
        }
    }
    return dp[m][n];
}