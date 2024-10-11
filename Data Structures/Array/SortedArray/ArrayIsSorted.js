/**Given an array, check if the array is sorted in ascending order or not */

/**Approach: 0(n),0(1) 
 * 
 * Simply maintain two pointers and check if jth element is always greater than the ith element.
 * If not return false
*/
function isSorted(arr) {
    let i = 0, j = 1;
    while (j < arr.length) {
        if (arr[j] >= arr[i]) {
            i++;
            j++;
        } else {
            return false;
        }
    }
    return true;
}