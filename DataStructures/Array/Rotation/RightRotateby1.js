/**Given an array arr, right rotate it by 1
 * 
 * ex: arr = [1,2,3,4,5,6,7]
 * after right rotation by 1:
 * 
 * arr = [7,1,2,3,4,5,6]
 */

/**Approach: 0(n),0(1) */
function rightRotateby1(arr) {
    arr.unshift(arr[arr.length - 1]);
    arr.pop();
    return arr;
}