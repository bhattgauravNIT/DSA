/**Given an array, find the index of the largest element of the array 
 * 
 * arr = [2,8,10,1,99,80] 0/p is 4
*/

/**Approach: 0(n),O(1)
 * 
 * Have a (- infinty) as starting keep comparing every element with it, 
 * if array elemnet is greater than set max as array element and res as current index.
 * 
 * Max is the max element and res will have index at which max is found.
 */
function maxIndexValue(arr) {
    let max = Number.MIN_SAFE_INTEGER;
    let i = 0, res = 0;
    while (i < arr.length) {
        if (arr[i] > max) {
            max = arr[i];
            res = i;
        }
        i++;
    }
    return res;
}