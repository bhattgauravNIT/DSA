/**Left rotate the array by 1.
 * 
 * Given arr = [1,2,3,4,5]
 * Left rotate by 1 means rotate the array counterclockwise by 1 such that now the array will become
 * 
 * arr = [2,3,4,5,1];
 */

/**Approach 1: O(n), O(1)
 * Two pointer just keep swaping and incrementing i and j.
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

/**Approach 2: 0(n),0(1)*/
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

