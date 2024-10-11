/**Given an array and an number d such that d <= nums.length.
 * 
 * Note if d > nums.length ~= (d % nums.length) times left rotation of array.
 * So make d = d-n;
 * 
 * Left rotate the array arr by d places.
 * Ex: arr = [1,2,3,4,5]
 * d = 2
 * 
 * So we left rotate arr by 1 place it becomes: 
 * 
 * arr = [2,3,4,5,1];
 * again left rotate it becomes
 * 
 * arr = [3,4,5,1,2];
 */


/**Approach: O(n*d),0(1)
 * 
 * See one patterns for example 
 * 
 * arr = [1,2,3,4,5,6]
 * d = 2
 * 
 * arr = [3,4,5,6,1,2];
 * 
 * again ex: 
 * 
 * arr = [10,12,7,18]
 * d = 3
 * 
 * arr = [18,10,12,7]
 * 
 * Then d resembles number of elements which needs to be shifted at back in same order of occurrence and rest elements to
 * come ahead.
 * Thus algo is push arr[0] to end
 * splice the first index element which is already being pushed to back.
 * Increment cnt till cnt<d (cnt start with 0)
 */
function leftRotateByd(arr, d) {
    let cnt = 0;
    while (cnt < d) {
        arr.push(arr[0]);
        arr.splice(0, 1);
        cnt++;
    }
    return arr;
}

/**Approach 1: 0(n*d),0(1)
 * 
 * Left rotate by 1 function call should be made d times.
 */
function leftRotateByd1(arr, d) {
    let cnt = 0;
    while (cnt < d) {
        arr = leftRotateBy1(arr);
        cnt++;
    }
    return arr;
}

function leftRotateBy1(arr) {
    let temp = arr[0];
    let i = 1;
    while (i < arr.length) {
        arr[i - 1] = arr[i];
        i++;
    }
    arr[arr.length - 1] = temp;
    return arr;
}

/**Approach 2: 0(n), O(d)
 * 
 * Say arr = [1,2,3,4,5,6] d = 2.
 * 
 * For arr index 0 and 1, i-d will be negative resembling these needs to be shifted towards back side of array.
 * Thus keep storing them in such cases in temp arr.
 * Else if(i-d >= 0) then the index at which these should be shifted inside array is [i-d] index thus move them.
 * In last starting putting temp variables from arr.length-d index in arr.
 * 
 * After negative values of i-d being pushed to temp and in case of positive values arr[i] being shifted to arr[i-d]
 * arr  = [3,4,5,6,5,6]
 * temp = [1,2]
 * 
 * Start inserting from temp in arr at index 4 which is arr.length-d.
 */
function leftRotateByd2(arr, d) {
    let i = 0;
    let temp = [];
    while (i < arr.length) {
        if ((i - d) < 0) {
            temp.push(arr[i]);
        } else {
            arr[i - d] = arr[i];
        }
        i++;
    }
    i = 0;
    let x = arr.length - d;
    while (i < temp.length) {
        arr[x] = temp[i];
        i++;
        x++;
    }
    return arr;
}

/**Approach 3: O(n),O(1) 
 * 
 * Reversal algorithm.
 * Say arr = [1,2,3,4,5,6] d =2;
 * 
 * first reverse array from 0 till d-1 index since we need to take d elements.
 * 
 * arr = [2,1,3,4,5,6]
 * Now reverse array from d till arr.length-1 index
 * 
 * arr = [2,1,6,5,4,3];
 * 
 * Now reverse array from 0 to arr.length-1 index
 * 
 * arr = [3,4,5,6,1,2]
*/

function leftRotateByd3(arr, d) {
    arr = reverse(0, d - 1, arr)
    arr = reverse(d, arr.length - 1, arr)
    arr = reverse(0, arr.length - 1, arr)
    return arr;
}

function reverse(i, j, arr) {
    while (i < j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        i++;
        j--;
    }
    return arr;
}