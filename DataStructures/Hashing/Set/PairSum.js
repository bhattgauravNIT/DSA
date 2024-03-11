/**Given an array arr and a sum k, return true if the array contains a pair such that
 * 
 * (arr[i]+arr[j] === k) else return false.
 * 
 * ex: arr = [3,2,8,15,-8], k = 17 o/p true (2,15).
 *     arr = [2,1,6,3], k = 6 o/p false.
 */

/**Approach1: 0(n^2),O(1) 
 * 
 * The approach is simply to find every pair i,j such that i>j and check if arr[i]+arr[j]===k.
 * If yes return true else false.
*/
function pairSum(arr, k) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === k) {
                return true;
            }
        }
    }
    return false;
}

/**Approach2: 0(nlog(n)),0(1) 
 * 
 * Sort the array and use two pointer approach, 
 * place first pointer at i=0 and j pointer at arr.length-1.
 * 
 * If arr[i]+arr[j]>k means j--
 * else if (arr[i]+arr[j]<k) means i++;
 * else pair is present.
*/
function pairSum(arr, k) {
    arr.sort((a, b) => a - b);
    let i = 0, j = arr.length - 1;
    while (i < j) {
        if (arr[i] + arr[j] === k) {
            return true;
        } else if (arr[i] + arr[j] > k) {
            j--;
        } else {
            i++;
        }
    }
    return false;

}


/**Approach3: 0(n),0(n)
 * 
 * the approach is to use hashing, 
 * arr[i]+arr[j]=k implies 
 * arr[j] = k-arr[i].
 * 
 * Lets have a set, now if the set contains k-arr[i] then we are sure that there exists a pair such that arr[i]+arr[j]=k
 * else put the arr[i] into set which signies visited index and have the possibility to be used later to form the pair.
 * 
 * ex: arr = [3,2,8,15,-8], k = 17
 * 
 * at i=0, 3 is not in set as set is empty so place 3 in set.
 * at i=1, 2 (k-arr[i]) ~= 17-2 = 15 is not in set , so place 2 in set
 * at i=2, 8 (17-8 = 9) is not in set so placve 8 in set.
 * at i=3, 15 (17-15 = 2) is present in set 
 * 
 * Thus we formed a pair (15+2 = 7) thus o/p is true.
 * 
 * Searching complexity for k-arr[i] in set is o(1).
 */
function pairSum(arr, k) {
    let s = new Set();
    for (let i = 0; i < arr.length; i++) {
        if (s.has(k - arr[i])) {
            return true;
        } else {
            s.add(arr[i]);
        }
    }
    return false;
}