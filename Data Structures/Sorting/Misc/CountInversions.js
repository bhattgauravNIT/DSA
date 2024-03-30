/**Given an array arr, a pair in an array (x,y) is called an inversion pair if
 * 
 * i<j and arr[i]>arr[j].
 * 
 * Ex: arr = [2,4,1,3,5]
 * O/p is 3 
 * Clearly the pairs that satisfy the condition such that i< j and arr[i]>arr[j] are 
 * 
 * (2,1)(4,1)(4,3).
 */

/**Approach1: 0(n^2),0(1) */
function countInversionPair(arr) {
    let cnt = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                cnt++
            }
        }
    }
    return cnt;
}

/**Approach2: 0(nlog(n)),0(n)
 * 
 * Explanation pending.....................
 */
function countInversionPair(arr, l, r) {
    let res = 0;
    if (l < r) {
        let m = l + Math.floor((r - l) / 2);
        res += countInversionPair(arr, l, m);
        res += countInversionPair(arr, m + 1, r);
        res += mergeAndCount(arr, l, m, r);
    }
    return res;
}

function mergeAndCount(arr, l, m, r) {
    let left = [], right = [], res = 0;
    let i = 0;
    while (i <= m) {
        left.push(arr[i]);
        i++;
    }
    while (i < arr.length) {
        right.push(arr[i]);
        i++;
    }
    i = 0;
    let k = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            res += (left.length - i);
            j++;
        }
        k++;
    }
    while (i < left.length) {
        arr[k] = left[i];
        k++;
        i++;
    }
    while (j < right.length) {
        arr[k] = right[j];
        k++;
        j++;
    }
    return res;
}
