/**Given an array arr, reverse the array in place, i,e reverse the existing array only
 * 
 * Ex : arr = [10,5,7,30]
 *      arr = [30,7,5,10]
 */

/**Approach : O(n),O(1)
 * 
 * Idea is simple use two pointers and swap the elements. We are swapping using a temp variable.
 */
function reverseArray(arr) {
    let i = 0, j = arr.length - 1;
    while (i < j) {
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
        i++;
        j--;
    }
    return arr;
}

/**Approach : O(n),O(1)
 * 
 * Idea is same as above just we are not using additional temp to swap i,e swapping without third variable
*/

function reverseArray1(arr) {
    let i = 0, j = arr.length - 1;
    while (i < j) {
        arr[i] = arr[i] + arr[j];
        arr[j] = arr[i] - arr[j];
        arr[i] = arr[i] - arr[j];
        i++;
        j--;
    }
    return arr;
}