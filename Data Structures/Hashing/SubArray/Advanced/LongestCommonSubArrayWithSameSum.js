/**Given two binary arrays, arr1 and arr2 of same length, we need to find the largest length of the common
 * subarray in arr1 and arr2 such that it has same sum.
 * 
 * Ex: 
 * arr1 = [0,1,0,0,0,0]
 * arr2 = [1,0,1,0,0,1]
 * 
 * So if we look at index i=1 to i=4, i,e subArray [1,0,0,0] in arr1 and [0,1,0,0] in arr2.
 * 
 * this is the common subArray of same sum in both arrays.
 * 
 * Common subArray means that the starting and ending index of the subArray found in both arr1 and arr2 should be same.
 * 
 * O/p is 4.
 * 
 * Ex: arr1 = [0,1,0,1,1,1,1]
 *     arr2 = [1,1,1,1,1,0,1]
 * 
 * subArray from index i=1 to i=6 i,e subArray [1,0,1,1,1,1] in arr1 and [1,1,1,1,0,1] in arr2 is common and have same sum 5.
 * o/p is 6
 * 
 * Ex: arr1 = [0,0,0]
 *     arr2 = [1,1,1] o/p is 0
 * 
 * Ex: arr1 = [0,0,1,0]
 *     arr2 = [1,1,1,1]
 *  o/p is 1 as subArray from index 2->2 in both subArray.
  */

/**Approach1: 0(n^2),0(1) 
 * 
 * the approach is simple.Lets consider
 * arr1 = [0,1,0,0,0,0]
 * arr2 = [1,0,1,0,0,1]
 * 
 * All possible subArray in arr1 will be 
 * 0,1,0,0,0,0
 * 
 * [0],[0,1],[0,1,0],[0,1,0,0],[0,1,0,0,0], [0,1,0,0,0,0]
 * [1], [1,0],[1,0,0], [1,0,0,0], [1,0,0,0,0]
 * [0], [0,0], ........... 
 * 
 * So we will calculate the sum of all possible SubArrays in arr1, in the same way all possible subArray in arr2 will be
 * 1,0,1,0,0,1
 * [1],[1,0],[1,0,1],[1,0,1,0],[1,0,1,0,0], [1,0,1,0,0,1]
 * [0],[0,1],[0,1,0],[0,1,0,0],[0,1,0,0,1]
 * [1],.....................
 * 
 * So we will calculate the sum of all possible sum of subArray in arr2.
 * 
 * Since length of both the array are same thus we can use single i and j pointer to iterate over both the arrays.
 * 
 * If at any point of time sm1===sm2 meaning the subArray in arr1 has same sum as subArray in arr2 then find the length
 * of that subArray which will simply be j-i+1.
 * 
 * We will take the max with this length, res = Max(res, j-i+1).
 * 
 * this is the simple brute force way of solving this.
 * 
*/
function longestCommonSubArrayEqualSum(arr1, arr2) {
    let i = 0;
    let res = 0;
    while (i < arr1.length || i < arr2.length) {
        let j = i;
        let sm1 = arr1[j];
        let sm2 = arr2[j];
        while (j < arr1.length || j < arr2.length) {
            if (sm1 === sm2) {
                res = Math.max(res, j - i + 1);
            }
            j++;
            sm1 += arr1[j];
            sm2 += arr2[j];
        }
        i++;
    }
    return res;
}

/**Approach2: 0(n),0(n)
 * 
 * This approach is based on the fact that if we create a temp array such that temp[i] = arr1[i]-arr2[i].
 * 
 * then this problem reduces to finding the longest subarray in temp whose value is 0.
 * Ex: 
 * arr1 = [0,1,0,0,0,0]
 * arr2 = [1,0,1,0,0,1]
 * 
 * temp  =[-1,1,-1,0,0,1]
 * 
 * now the longest subArray in temp whose sum is 0 will the longest subArraycommon in both arr1 and arr2 whose sum is equal.
 * 
 * Compute the longest 0 sum subArray in temp using hashing and prefix sum.
 * 
 * If pfSum === 0 means there exists a subArray from index 0 till current index with 0 sum.
 * If mp has pfSum already then this subArray has zero sum hence compute length of this subArray as 
 * 
 * i- mp.get(pfSum).
 * 
 * Check with res for max Length
 */
function longestCommonSubArrayEqualSum(arr1, arr2) {
    let temp = [];
    for (let i = 0; i < arr1.length; i++) {
        temp.push(arr1[i] - arr2[i]);
    }
    let pfSum = 0;
    let mp = new Map();
    let res = 0;
    for (let i = 0; i < temp.length; i++) {
        pfSum += temp[i];
        if (pfSum === 0) {
            res = Math.max(res, i + 1);
        }
        if (!mp.has(pfSum)) {
            mp.set(pfSum, i);
        } else {
            res = Math.max(res, i - mp.get(pfSum));
        }
    }
    return res;
}