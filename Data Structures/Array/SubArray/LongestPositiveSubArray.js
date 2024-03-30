/**Given an array find the length of the longest positive subarray
 * 
 * Ex: arr = [1,2,3,-6,8,9,10,12,-9]
 * O/p is 4 i,e subarray [8,9,10,12];
 * 
 * Ex: arr = [-2,-1,-9]
 * o/p is 0
 */

/**Approach 1: O(n^2),0(1)
 * 
 * Ex: arr = [1,2,3,-6,8,9,10,12,-9]
 * for every ith element where i starts from 0, see if we can start a subarray from it, if else keep checking
 * till be only get positives.
 * Once a negative is reached check if its the max length subarray, if yes update max.
 * 
 * So i=0->arr.length
 * j = i,cnt = 0
 * j->i -> arr.length
 * if(arr[j]>0){
 * cnt++
 * j++
 * }else{
 * break
 * } 
 * for the loop j.
 * Check if its the max length and again start from i++;
 */
function longestAllPositiveSubArray(arr) {
    let i = 0, max = 0;
    while (i < arr.length) {
        let j = i, cnt = 0;
        while (j < arr.length) {
            if (arr[j] > 0) {
                cnt++;
                j++;
            } else {
                break;
            }
        }
        if (cnt > max) {
            max = cnt;
        }
        i++;
    }
    return max;
}

/**Approach2: O(n),O(1) 
 * 
 * Kadane's algo: Usage
 * For every ith index check its it can be a part of the subarray or not.

 * The approach is for every ith element if its positive then yes it can be a part of the subarray,
 * make it part of subarray by increment cnt.
 * Check if cnt is greater than max, modify max.
 * If its negative than it cant be a part of the array so the subArray till here break, and thus cnt = 0;
*/

function longestAllPositiveSubArray(arr) {
    let i = 0, max = 0, cnt = 0;
    while (i < arr.length) {
        if (arr[i] > 0) {
            cnt++;
            if (cnt > max) {
                max = cnt;
            }
        } else {
            cnt = 0;
        }
        i++;
    }
    return max;
}
