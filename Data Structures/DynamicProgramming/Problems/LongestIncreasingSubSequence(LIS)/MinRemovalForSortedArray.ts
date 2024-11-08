/**Given an array, give me the min number of elements which should be removed so that the
 * array becomes sorted.
 * 
 * Ex: [5,10,3,6,7,8] o/p: 2 i,e remove {10,3} or {5,10}
 * 
 * ex: [10,20,30] o/p: 0 as elements in array are already sorted
 * 
 * ex: [30,20,10] o/p: 2 remove either {30,20},{30,10},{20,10},{10,30} i,e we need to have only element 
 *     remaining rest remove all others.
 */


/**Approach: 0(n(logn)),0(n)
 * 
 *  Simply find the LIS for the given array, so in the above case Ex: [5,10,3,6,7,8] o/p: 2 i,e remove {10,3} or {5,10}
 *  the LIS length will be 4 i,e {5,6,7,8} or {3,6,7,8}, reduce this length from the
    total length of the array. The o/p will give us the min number of elements required to make array sorted.
    LIS can be found via Dynamic programming or via binary search approach.
    Binary search approach is preferred because of time complexity of 0(n(logn)),0(n)

    For detail explanation of LIS using binary search refer LongestIncreasingSequence.ts

*/

function longestIncreasingSubSequence(arr: number[]) {
    let tail: number[] = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > tail[tail.length - 1]) {
            tail.push(arr[i]);
        } else {
            let index = findCeilIndex(tail, 0, tail.length - 1, arr[i]);
            tail[index] = arr[i];
        }
    }
    return arr.length -tail.length
}

function findCeilIndex(tail: number[], start: number, end: number, value: number) {
    while (start < end) {
        let mid = Math.floor(start + (end - start) / 2);
        if (tail[mid] >= value) {
            end = mid;
        } else {
            start = mid + 1;
        }
    }
    return end;
}

console.log(longestIncreasingSubSequence([5,10,3,6,7,8]))