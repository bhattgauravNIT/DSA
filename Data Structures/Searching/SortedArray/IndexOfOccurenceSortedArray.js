/**Given an sorted array and an elemnet k, find the index of occurence of element in arr,
 * if there is no index return -1, if there are multiple occurence return any index of occurence.
 */


/**Approach 1: 0(n),0(1)
 * 
 * The approach is simple, iterate over the array and check if the element is equal to
 * thye element which is to be searched.
 */
function indexOfElement(arr, k) {
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
 * Its called binary search, lets ay we have an array = [10,20,30,40,50] and k = 40
 * So we compute the mid index of arr, take a low as starting index of array and high as ending index of array
 * 
 * If k= arr[mid] then mid is the answer.
 * If k> arr[mid] than element can't be present before mid index and thus low = mid+1.
 * If k< arr[mid] than element can't be present after the mid index and thus high = mid-1.
 */
function indexOfElement1(arr, k) {
    let low = 0, high = arr.length - 1;
    while (high >= low) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === k) {
            return mid;
        } else if (k > arr[mid]) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}

/**Recursive approach: 0(log(n)),0(log(n))
 * 
 * we will have 0(log(n)) auxilary space required beacuse , we need to store 0(log(n)) call stacks during this recusrion.
 * 
 * The algo crux remains same , we are just writing it in an recursive way.
 */
function indexOfElementRecursion(arr, k, low, high) {
    if (low > high) return -1;
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === k) {
        return mid;
    } else if (k > arr[mid]) {
        return indexOfElementRecursion(arr, k, mid + 1, high);
    } else {
        return indexOfElementRecursion(arr, k, low, mid - 1);
    }
}

/**Note here is that binary search does not necessarily give the index of first occurence of the element,
 * in case of an elemnet which is to be found is repeated its not compulsory that binary search gives
 * the first index of occurence.
 */
