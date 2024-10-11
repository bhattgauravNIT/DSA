/**Left rotate the array by 1.
 * 
 * Given arr = [1,2,3,4,5]
 * Left rotate by 1 means rotate the array counterclockwise by 1 such that now the array will become
 * 
 * arr = [2,3,4,5,1];
 */


/**Approach 1: O(n), O(1)
 * 
 * This approach is to use two pointers.
 * Starting at i=0 and j=1.
 * Now keep swapping till j is less than the length of the array.
 * increment i and j.
 * 
 * Ex: arr = [1,2,3,4,5]
 *     i=0,j=1
 *     
 * after 1st swap:   arr = [2,1,3,4,5]
 * i=1,j=2
 * 
 * after 2nd swap:  arr = [2,3,1,4,5]
 * 
 * i=2,j=3
 * 
 * after third swap: arr = [2,3,4,1,5]
 * i=3,j=4
 * 
 * after 4th swap: arr = [2,3,4,5,1]
 */
function leftRotateBy1(arr) {
    let i = 0, j = 1;
    while (j < arr.length) {
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
        i++;
        j++;
    }
    return arr;
}

/**Approach 2: 0(n),0(1)
 * 
 * Initially mark temp as arr[0] and start making arr[i-1] as arr[i] starting from i=1.
 * 
 * Initially arr = [1,2,3,4,5]
 * Store arr[0] in temp 
 * 
 * After first Iteration: [2,2,3,4,5]
 * After second iteration: [2,3,3,4,5]
 * After third iteration: [2,3,4,4,5]
 * After 4th iteration: [2,3,4,5,5]
 * 
 * Now make the last element as the temp
 * 
 * arr = [2,3,4,5,1]
 * 
 * 
*/
function leftRotateBy12(arr) {
    let temp = arr[0];
    let i = 1;
    while (i < arr.length) {
        arr[i - 1] = arr[i];
        i++;
    }
    arr[arr.length - 1] = temp;
    return arr;
}

