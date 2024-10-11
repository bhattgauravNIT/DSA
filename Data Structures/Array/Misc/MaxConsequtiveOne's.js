/**Given an binary array, find the count of max consecutive one's 
 * 
 * Ex: arr = [0,1,1,0,0,1,1,1,1,0]
 * o/p is 4
*/

/**O(n),0(1) */
function maximumConsecutiveOnes(arr) {
    let i = 0, max = 0;
    while (i < arr.length) {
        if (arr[i] === 1) {
            let j = i + 1, cnt = 1;
            while (arr[j] === arr[i]) {
                j++;
                cnt++;
            }
            if (cnt > max) {
                max = cnt;
            }
            i = j;
        } else {
            i++;
        }
    }
    return max;
}
