/**Given an array find the second largest element of the array */

/**This approach will fail in situations like:
 * 
 * arr = [10,20,20,0]
 * After sorting arr = [20,20,10,0]
 * thus arr[1] is 20 which is not the second largest element but the first largest element only.
 */
/**!________________________________WRONG___________________________________________________! */
/**Approach1: O(nlog(n)),0(1) */
function secondLargestNumber(arr) {
    arr.sort((a, b) => b - a);
    return arr[1];
}
/*!________________________________WRONG___________________________________________________!*/


/**Approach 1: 0(n),O(1): 2 loops */
function secondLargestNumber1(arr) {
    let max = Number.MIN_SAFE_INTEGER;
    let i = 0;
    while (i < arr.length) {
        if (arr[i] > max) {
            max = arr[i];
        }
        i++;
    }
    i = 0; let max1 = Number.MIN_SAFE_INTEGER;
    while (i < arr.length) {
        if (arr[i] > max1) {
            if (arr[i] !== max) {
                max1 = arr[i];
            }
        }
        i++;
    }
    return max1;
}