/**Given an unsorted array arr, find the peak element from it.
 * 
 * An element is considered as peak element if its greater or equal to both its neighbours
 * 
 * ex: arr = [5,10,15,20,7]
 * o/p 20
 * 
 * ex: arr = [10,20,15,5,23,90,67]
 * o/p 20 or 90
 * 
 * ex: [80,70,60]
 * o/p 80
 * 
 * We need to return any of the peak element
 */

/**Approach1: 0(n),0(1)
 * 
 * Simply traverse through entire array and check for all neghibouring elements, just take attention of left most and right most
 * elements of the array.
 */
function peakElement(arr) {
    if (arr.length === 1) return arr[0]
    let i = 0, res = [];
    while (i < arr.length) {
        if (i === 0) {
            if (arr[i] >= arr[i + 1]) {
                return arr[0];
            }
        } else if (i === arr.length - 1) {
            if (arr[i] >= arr[i - 1]) {
                return arr[1];
            }
        } else {
            if (arr[i] >= arr[i - 1] && arr[i] >= arr[i + 1]) {
                return arr[i];
            }
        }

        i++;
    }
    return res;
}

/**Approach2: 0(log(n)),0(1)
 * 
 * the approach is based on a fact, if we consider any array either sorted or unsorted it will always contain a peak element
 * for ex: arr = [1], o/p is 1
 * arr = [10,20] , o/p is 20
 * arr = [30,10,70], o/p is 70
 * 
 * and any array we can think of will surely contain one peak element.
 * Now since we have to return any of the peak element present in an array.
 * So we take appraoch of binary search.
 * 
 * The solution is based on the fact that: lets compute a mid which is (high+ low)/2
 * 
 * 1. If we are at 0 index, mid===0, if arr[mid]>= arr[mid+1], its surely a potential peak element
 * 2. If we are at arr.length-1 index , if arr[mid]<= arr[mid-1], its sureky a potential peak element
 * 
 * If both of them doesn't happen surely the peak element in somewhere in between 0 and end of array 
 * 
 * 3. Find a middle element , if arr[mid]>= arr[mid-1] && arr[mid]>= arr[mid+1], simply this is a peak elemnt.
 * 4. Now if even the above does not happen then we have see that where the peak can be on the left of middle or on the right
 * of middle.
 * 
 * So if arr[mid-1]>= arr[mid], we can always say that a peak will be prsent to left of the mid so high=low-1.
 * otherwise arr[mid+1]>= arr[mid], we can always say that a peak will be present on the right of the mid so low=mid+1. 
 */
function peakElement1(arr) {
    if (arr.length === 1) return arr[0];
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (mid === 0 && arr[mid] >= arr[mid + 1]) {
            return arr[mid];
        }
        if (mid === arr.length - 1 && arr[mid] >= arr[mid - 1]) {
            return arr[mid];
        }
        if (arr[mid] >= arr[mid - 1] && arr[mid] >= arr[mid + 1]) {
            return arr[mid];
        } else if (arr[mid - 1] >= arr[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
}
