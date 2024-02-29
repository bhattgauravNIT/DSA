/**Given an array which is sorted but however can be roatated by any n value, find a value of index k in it.
 * 
 * Ex: arr = [10,20,30,40,50,8,9]
 * clearly this array is rotated by 2 beacuse if the original array was arr = [8,9,10,20,30,40,50] and we rotate it by 2
 * it becomes 10,20,30,40,50,8,9
 * 
 * now k = 30
 * O/p is 2 as 30 is present at index 2.
 * 
 * In case k is not present in the array return -1.
 */

/**Approach: 0(n),0(1)
 * 
 * Simply search for k at every index i. If found return i, if not found return -1.
 */
function searchInSortedRotated(arr, k) {
    let i = 0;
    while (i < arr.length) {
        if (arr[i] === k) {
            return i;
        }
        i++;
    }
    return -1;
}

/**Approach: 0(log(n)),0(1)
 * 
 * Explanation pending.....
 */
function searchInSortedRotated1(arr, k) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === k) {
            return mid;
        }
        if (arr[mid] >= arr[0]) { // left array is sorted
            if (k >= arr[low] && k<arr[mid]) { // k is present in left half
                high = mid - 1;
            }else{
                low=mid+1;  // k is present in right half
            }
        } else {   // right array is sorted
            if (k > arr[mid] && k<=arr[high]) { // k is in right half
                low = mid + 1;
            }else{
                high=mid-1;   // k in left half
            }
        }
    }
    return -1;
}


