/**Given an array find the longest subarray length which has alternating even and odd elements.
 * By alternating we mean, that first elemnet can be any even or odd, however 
 * if its even the next should be odd then next should be even and so on.........
 * 
 * Similarly if first element is odd then next should be even then should be odd and so on.......
 * 
 * Ex: arr = [10,12,14,7,8]
 * clearly subArray [ 14,7,8] is the longest subarray with alternative odd and even.
 * O/p is 3
 * 
 * Ex: [2,2,2]
 * Clearly there is no alternating even odd here thus o/p is 1 beacuse a single elemnt subarray is also a subarray considered
 * alternating.
 */

/**Approach1: 0(n^2),0(1) 
 * 
 * EX: arr= [10,12,14,7,8];
 * For every j where j=i+1.
 * Check if there is a subsarray such that its having an alternating odd/even elemnet.
 * for every i consider a j = i+1; and keep checking if 
 * j-1 is even than j should be odd
 * or
 * j-1 is odd the j should be even.
 * If condition matches, increment cnt and j.
 * If fails break and check for next subArray with increasing i.
*/
function longestAlternatingSubArray(arr) {
    let i = 0, max = 1;
    while (i < arr.length) {
        let j = i + 1, cnt = 1;
        while (j < arr.length) {
            if (
                (arr[j] % 2 === 0 && arr[j - 1] % 2 !== 0)
                ||
                (arr[j] % 2 !== 0 && arr[j - 1] % 2 === 0)
            ) {
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

/**Approach2: 0(n),0(1) 
 * Kadanes Algo: Usage
 * 
 * For every ith index we will see if its an alternating element.
 * If its an alternating element, make it the part of subarray,
 * else start the subarray fresh.
 * 
 * Ex: arr = [5,10,20,6,3,8];
 * start from i=1;
 * 10 is alternating even elemnet as previous to it 5 is odd. So make count it in subarray length,
 * now at 20, its not alternating element so we should start fresh from here.
 * Now the maxLength achieved till now is 2 i,e 5 and 10.
 * 
 * This is the algo. 
 * 
*/
function longestAlternatingSubArray1(arr) {
    let max = 1, cnt = 1;
    let i = 1;
    while (i < arr.length) {
        if (
            (arr[i] % 2 === 0 && arr[i - 1] % 2 !== 0)
            ||
            (arr[i] % 2 !== 0 && arr[i - 1] % 2 === 0)
        ) {
            cnt++;
            if (cnt > max) {
                max = cnt;
            }
        } else {
            cnt = 1;
        }
        i++;
    }
    return max;
}