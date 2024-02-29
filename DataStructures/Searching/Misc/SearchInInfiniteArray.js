/**Given an infinte sorted array, say arr = [10,20,30,50,100,.................] and k
 * Given an element k, find that element inside arr, if element is not present return -1.
*/

/**Approach1: 0(positionOfElement),0(1)
 * Ex: arr = [10,20,30,50,100,.................], k= 50
 * We travserse through the arr and if arr[i]===k, thats the index .
 * If we found an element which is greater than k which was to be found then we are certain that
 * the k is not present in arr as arr is sorted.
 */
function searchInInfiniteArray(arr, k) {
    let i = 0;
    while (i < arr.length) {
        if (arr[i] === k) {
            return i;
        } 
        if (arr[i] > k) {
            return -1;
        }
        i++;
    }
}

/**0(log(positionOfElement)),0(1)
 * 
 * Algo: Unbounded binary search
 * 
 * Ex: arr = [1,10,15,20,40,60,80,100,200,500,................]
 * The problem here was since the length of the array if very large i,e 2^31.
 * So we could not directly say high = arr.length-1, as it would have tle issues.
 * 
 * Thus first we need a mechanism to find the high index .
 * 
 * So consider i=1 and keep checking for every i*2 index.
 * If this arr[i*2] index  element === k , very well its the answer.
 * If then arr[i*2] index element is greater than k then we know that this is the highest index and if k is
 * present it must be before this index now.
 * 
 * Since we got i*2 as highest index we are sure that i/2 will be the low index as till here neither k was present nor
 * arr[i/2] was greater than k .Thus we apply binary search from i/2 -> i*2.
 */
function searchInInfiniteArray1(arr, k) {
    if (arr[0] === k) return 0;
    let i = 1;
    while (arr[i] <= k) {
        if (arr[i] === k) {
            return i;
        } else {
            i = i * 2;
        }
    }
    let low = i / 2, high = i;
    while (low <= high) {
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


