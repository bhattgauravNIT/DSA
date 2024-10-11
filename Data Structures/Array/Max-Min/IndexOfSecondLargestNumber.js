/**Given an array find index of second largest element in array if there is no second largest return -1
 * 
 * Ex: arr = [11,9,0,12,8] O/p is 11
 *     arr = [10,10,10] O/p is -1
 *     arr = [11,11,9,8,10] O/p is 10
 */

/**O(n),O(1) 
 * 
 * In the first iteration find the max element from the array.
 * In the second iteration find element which is largest but not equal to the first iteration's max element.
 * This element will be the second largest element , keep track of the index where its found.
*/
function indexSecondLargestNumber(arr) {
    let max = Number.MIN_SAFE_INTEGER;
    let i = 0;
    while (i < arr.length) {
        if (arr[i] > max) {
            max = arr[i];
        }
        i++;
    }
    i = 0; let max1 = Number.MIN_SAFE_INTEGER, res = -1;
    while (i < arr.length) {
        if (arr[i] > max1) {
            if (arr[i] !== max) {
                max1 = arr[i];
                res = i;
            }
        }
        i++;
    }
    console.log(max, max1);
    return res;
}