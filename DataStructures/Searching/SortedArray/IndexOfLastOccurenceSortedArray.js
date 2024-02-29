/**Given a sorted array arr and an element k, find the index of the last occurence of k
 * in the array arr, If the element is not present in the array return -1.
 * 
 * arr = [10,20,20,30,40,50], k = 20 o/p is 2.
 */

/**Approach 1: 0(n),0(1) 
 * 
 * Simple approach is to iterate the array from back and as soon as we find k return the index.
 * If the index is no where to be found return -1;
*/
function indexOfLastOccurence(arr, k) {
    let i = arr.length - 1;
    while (i >= 0) {
        if (arr[i] === k) {
            return i;
        }
        i--;
    }
    return -1;
}

/**Approach2: 0(log(n)),0(1) 
 * 
 * We will be using binary search, so lets take an exmple:
 * 
 * arr = [10,20,20,30,40,40,40], k = 40
 * 
 * If k= arr[mid] then mid is the answer.
 * If k> arr[mid] than element can't be present before mid index and thus low = mid+1.
 * If k< arr[mid] than element can't be present after the mid index and thus high = mid-1.
 * 
 * This is simple binary search however this doesn't gurantee the last occurence so in order
 * to get the last occurence we need to optimize this a little
 * 
 * So let take a low as 0 and high as 6, mid = (0+6)/2 = 3 , now 
 * k > arr[mid] so low = mid+1.
 * 
 * low = 4, high = 6 , mid = 4+6/2 = 5
 * Now clearly arr[mid]===k, this ensures that k is present in the array but does not enusre that its the last occurence of k in the array.
 * Now lets check for arr[mid+1] , if 
 * arr[mid+1]!== k or mid === arr.length-1 , ie, mid is at the last index of arr, then surely its the last occurence of k in arr.
 * else make low = mid+1.
 * 
 * We made low = mid+1 because once we got to know that arr[mid+1]===k then it might be possible that there are multiple occurences
 * after mid+1 of the same k thus we need to serahc at this subarray which starts from low=mid+1.
 * 
*/
function indexOfLastOccurence(arr, k) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === k) {
            if (mid === arr.length - 1 || arr[mid + 1] !== k) {
                return mid;
            } else {
                low = mid + 1;
            }
        } else if (k > arr[mid]) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}

/**Lets use recursion to write above solution : 0(log(n)),0(log(n)) 
 * 
 * Additional 0(log(n)) auxilary space is required in recursive approach as there are in total 0(log(n)) calls that
 * can be stored in a call stack, thus its not better than the iterative approach.
*/
function indexOfLastOccurence(arr, k, low, high) {
    if (low > high) return -1;
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === k) {
        if (mid === arr.length - 1 || arr[mid + 1] !== k) {
            return mid;
        } else {
            return indexOfLastOccurence(arr, k, mid + 1, high);
        }
    } else if (k > arr[mid]) {
        return indexOfLastOccurence(arr, k, mid + 1, high);
    } else {
        return indexOfLastOccurence(arr, k, low, mid - 1);
    }
}