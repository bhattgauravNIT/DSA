/**Given a sorted array arr, and a value k, return true if there exist a pair in arr such that 
 * x1+x2 = k, else false.
 * 
 * ex: arr = [2,5,8,12,30], k = 17 o/p true.
 * 
 * arr = [3,8,13,18], k = 14 o/p is false
 */

/**Approach1: 0(n^2),0(1)
 * 
 * Use brute force to find each and every pair and if at any point of time, sum of pair === k.
 * return true else false.
 */
function pairWithSumK(arr, k) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === k) {
                return true;
            }
        }
    }
    return false;
}

/**Appraoch 2: 0(n),0(n)
 * 
 * Use hashing, if at any point of time for arr[i] we found that k-arr[i] is already present in the map this means
 * that we have successfully found a pair with sum k.
 * else we push arr[i] to map.
 */
function pairWithSumK1(arr, k) {
    let mp = new Map();
    let i = 0;
    while (i < arr.length) {
        if (mp.has(k - arr[i])) {
            return true;
        } else {
            mp.set(arr[i], 1);
        }
        i++;
    }
    return false;
}

/**Appraoch: 0(n),0(1) 
 * 
 * Since the array is sorted therefore if we take a pointer at 0 and a pointer at last index of arr.
 * 
 * If at any point the arr[i]+arr[j]>sum, then since array is sorted we are sure that arr[j]>arr[i] then reduce j, as value 
 * arr[i]+arr[j] value should be reduced in order to acheieve arr[i]+arr[j]===k
 * 
 * If at any point arr[i]+arr[j]< sum, then since array is sorted we are sure that arr[i]<arr[j] thus increase i,
 * as value arr[i]+arr[j] value should be increased in order to acheieve arr[i]+arr[j]===k
*/
function pairWithSumK3(arr, k) {
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