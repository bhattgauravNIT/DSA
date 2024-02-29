/**Given an sorted array arr=[10,20,20,30,40,50] and a elemnet k, give the index of the 
 * first occurnce of element k in the sorted array, if the element is not present return -1.
 * 
 * Ex: arr = [10,20,20,30,40,50], k = 20 O/p is 1.
 */

/**Approach1: 0(n),0(1)
 * 
 * Simple iteration over the entire array and finding the index at which elemnet is present.
 * Return at the first occurence index.
 */
function indexOfFirstOccurence(arr, k) {
    let i = 0;
    while (i < arr.length) {
        if (arr[i] === k) {
            return i;
        }
        i++;
    }
    return -1;
}

/**Approach2: 0(log(n)),0(1) 
 * 
 * We will be using binary search, so lets take an exmple:
 * 
 * arr = [5,10,10,15,20,20], k = 20
 * 
 * If k= arr[mid] then mid is the answer.
 * If k> arr[mid] than element can't be present before mid index and thus low = mid+1.
 * If k< arr[mid] than element can't be present after the mid index and thus high = mid-1.
 * 
 * This is simple binary search however this doesn't gurantee the first occurence so in order
 * to get the first occurence we need to optimize this a little
 * 
 * So lets have a low as 0 and high as 5, now mid will be 0+5/2 = 2.
 * Now k>arr[mid] this means that the elemnet will be present only after the mid so we say make low to mid+1.
 * Now the subarray that we need to search in will start from 3 till 5.
 * Now we take out mid again and it will be (3+5)/2 = 4.
 * Now arr[mid]===k so we ensure that this elemnet will now be present in arr, however it doesn't necessarily means that
 * it will be the first occurence.
 * So now we check for arr[mid-1] value if its still equal to k then lets take a subarray from low = low and high = mid-1.
 * We made high = mid-1 beacuse we dont know how many occurences more could be present in the left part thus we made high = mid-1 to check that.
 * However if the arr[mid-1] !=== k this means that the elemnet which we encountered was surely the first occurence in the array, but 
 * mid-1 cant be computed if mid === 0 so if (mid===0 || arr[mid-1]!==k) return mid.
*/
function indexOfFirstOccurence(arr, k) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === k) {
            if (mid === 0 || arr[mid - 1] !== k) {
                return mid
            } else {
                high = mid - 1;
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

function indexOfFirstOccurence(arr, k, low, high) {
    if (low > high) return -1;
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === k) {
        if (arr[mid - 1] !== k || mid === 0) {
            return mid
        } else {
            return indexOfFirstOccurence(arr, k, low, mid - 1);
        }
    } else if (k > arr[mid]) {
        return indexOfFirstOccurence(arr, k, mid + 1, high);
    } else {
        return indexOfFirstOccurence(arr, k, low, mid - 1);
    }
}

