/**Given an array arr, right rotate it by k times.
 * 
 * Ex: arr = [1,2,3,4,5,6,7];
 * k = 3;
 * 
 * after 1st right rotation: arr = [7,1,2,3,4,5,6];
 * after 2nd rotation : arr = [6,7,1,2,3,4,5]
 * after 3rd rotation: arr = [5,6,7,1,2,3,4]
 */

/**Approach1: O(n*k):O(1) */
function rightRotateby1(arr) {
    arr.unshift(arr[arr.length - 1]);
    arr.pop();
    return arr;
}
function rightRotateNumsByK(nums, k) {
    if (k > nums.length) {
        k = k - nums.length;
    }
    let t = 1;
    while (t <= k) {
        nums = rightRotateby1(nums);
        t++;
    }
}