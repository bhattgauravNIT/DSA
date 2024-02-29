/**Given a array of nums where all numbers apprears even number of times expect for two numbers which appears odd number of times
 * Find those two numbers.
 * 
 * Ex: [3,4,3,4,5,4,4,6,7,7] o/p [ 5, 6 ]
 */

/**Approach 1: O(n): O(n) */
function twoOddOccuring(arr) {
    let mp = new Map(), i = 0, res = [];
    while (i < arr.length) {
        mp.has(arr[i]) ? mp.set(arr[i], mp.get(arr[i]) + 1) : mp.set(arr[i], 1);
        i++;
    }
    for (let [key, value] of mp) {
        if (value % 2 !== 0) {
            res.push(key);
        }
    }
    return res;
}

/** Approach 2 */