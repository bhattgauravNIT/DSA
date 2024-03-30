/**Given an array which is half sorted by some index element i,e element is sorted from 0->k and is sepeartely
 * sorted from k+1-> end.
 * 
 * Merge it as sorted.
 * 
 * Ex: arr = [10,15,20,11,30]
 * 
 * Clearly the k here is 2, so its sorted from [0->2] and is seperate sorted from [3->4]
 * O/p is [10,11,15,20,30]
 */

/**Approach1: 0(n),0(n)
 * 
 * Ex: arr = [10,20,40,20,30], given low=0,mid=2,high=4.
 * 
 * So we create two subArray say left and right 
 * left = [10,20,40];
 * right = [20,30];
 * 
 * Now use two pointers to get the sorted array,
 * Instead of pushing these to a new array we are simply modifying the original arr.
 */
function mergeHalfSortedArray(arr, low, mid, high) {
    let left = [], right = [];
    let i = low;
    while (i <= high) {
        if (i <= mid) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
        i++;
    }
    i = 0;
    let j = 0, index = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[index] = left[i];
            i++;
        } else {
            arr[index] = right[j];
            j++;
        }
        index++;
    }
    while (i < left.length) {
        arr[index] = left[i];
        i++;
        index++
    }
    while (j < right.length) {
        arr[index] = right[j];
        j++;
        index++;
    }
    return arr;
}