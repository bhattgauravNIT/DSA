/**Given an array find max value of arr[j]-arr[i] such that j>i 
 * 
 * Example: [7, 1, 5, 3, 6, 4]
 *          o/p: 5 i,e from pair(6-1) = 5
*/

/**Approach1: O(n^n),O(1) */
function maxDifference(arr) {
    let max = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if ((arr[j] - arr[i]) > max) {
                max = arr[j] - arr[i];
            }
        }
    }
    return max;
}

/**Approach2: 0(n),0(1) 
 * The idea is 
 * we need to find max of arr[j]-arr[i], this means arr[i] should be as least as possible 
 * so keep track of difference between every element and the max difference obtained so far along with the min element
 * encountered so far.
*/

function maxDifference1(arr) {
    let res = Number.MIN_SAFE_INTEGER;
    let j = 1, min = arr[0];
    while (j < arr.length) {
        if ((arr[j] - min) > res) {
            res = arr[j] - min;
        }
        if (arr[j] < min) {
            min = arr[j];
        }
        j++;
    }
    return max;
}