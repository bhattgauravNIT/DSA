/**Given an array arr, right rotate it by 1
 * 
 * ex: arr = [1,2,3,4,5,6,7]
 * after right rotation by 1:
 * 
 * arr = [7,1,2,3,4,5,6]
 */


/**Approach: 0(n),0(1)
 * 
 * The idea is simply to put the last element at the first place and then remove the last element from the
 * array.
 * 
 * So first we do arr.unshift(arr[arr.length - 1]); which made
 * 
 * arr = [7,1,2,3,4,5,6,7]
 * 
 * now we pop the last element from the array.
 * 
 * arr = [7,1,2,3,4,5,6]
 */
function rightRotateBy1(arr) {
    arr.unshift(arr[arr.length - 1]);
    arr.pop();
    return arr;
}