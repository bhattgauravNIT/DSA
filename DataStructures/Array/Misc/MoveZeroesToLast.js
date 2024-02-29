/**Given an array that may or may not contain 0, if it contains zero move them to the last.
 * Modify the original array in place.
 * 
 * Ex: [8,5,0,10,0,20]
 * O/p [8,5,10,20,0,0]
 */

/**Approach2: 0(n*n),0(1)
 * 
 * The approach is simple, if we encounter a zero, keep finding till the point we dont encounter a zero, swap them.
 */
function moveZeroesToEnd(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] !== 0) {
                    arr[i] = arr[i] + arr[j];
                    arr[j] = arr[i] - arr[j];
                    arr[i] = arr[i] - arr[j];
                    break;
                }
            }
        }
    }
    console.log(arr);
}

/**Approach1 : 0(n),0(n)
 * 
 * Use additional space to store elements other than 0,
 * till the size of the temp array, keep replacing elements in original array and once temp size is reached make rest all of original
 * array elements as 0.
 */
function moveZeroesToEnd1(arr) {
    let temp = [];
    let i = 0, j = -1;
    while (i < arr.length) {
        if (arr[i] !== 0) {
            /**
             * using 
             * j++;
               temp[j] = arr[i]
               ~=
               instead of temp.push(arr[i]);
             */
            j++;
            temp[j] = arr[i];
        }
        i++;
    }
    i = 0;
    while (i < arr.length) {
        if (i < temp.length) {
            arr[i] = temp[i];
        } else {
            arr[i] = 0;
        }
        i++;
    }
    console.log(arr);
}

/**Approach: O(n),O(1) 
 * 
 * Ex: [10,5,0,0,8]
 * Initally nz and z pointer is at index 0.
 * So nz is pointing to non zero value and z is also pointing to non zero value.
 * Since nz is pointing to non zero value swap with z pointer and incremnet both, so 10 gets swapped to itself.
 * 
 * Now nz is at index 1 and z is also at index 1.
 * Again nz is non zero so swap with z pointer. 
 * 5 gets swapped with itself.
 * Now again both incremented.
 * nz reached index 2 which is 0 and z also reached index 2 which is 0 value.
 * So nz is unhappy thus increase nz , nz beacome 3, whose index value is again 0, so again increase nz.
 * Nz becomes 4 which is finally a non zero value so swap nz and z. z value was index 2.
 * Swap nz and z.
 * 
 * Algo:
 * Consider two pointers one non zero and other zero. 
 * Idea is simple, non zero pointer should always be at non zero value so if you find a non zero value , hold it there.
 * Perfomr swap with zero pointer then incremnet both.
 * If you see non zero pointer at zero value increment non zero pointer.
 * 
*/

function moveZeroesToEnd2(arr) {
    let nz = 0, z = 0;
    while (nz < arr.length) {
        if (arr[nz] === 0) {
            nz++;
        }
        else {
            let temp = arr[nz];
            arr[nz] = arr[z];
            arr[z] = temp;
            nz++;
            z++;
        }
    }
    console.log(arr)
}
