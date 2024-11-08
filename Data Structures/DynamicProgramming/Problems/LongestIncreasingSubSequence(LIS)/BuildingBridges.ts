/**
 * Given an array of pairs such that index 0 of every pair or first element of any pair represents a city
 * with some number and the second element of the pair represents a city with some number.
 * 
 * the task is the make bridges between city 1 and city2 i,e city represented by first element of pair
 * and city represented by second element of pair in such a way that we should maximize the total
 * number of bridges which we are making however no two bridges can intersect each other.
 * 
 * For ex: [(6,2),(4,3),(2,6),(1,5)]
 * 
 *          1     2     3     4    5    6
 *                
 *          1     2     3     4    5    6
 * 
 * o/p: 2 we can make at most two bridges such that no two bridges intersect i,e
 *     2,6 and 1,5.
 * 
 * For ex: [(8,1),(1,2),(4,3),(3,4),(2,6),(6,7),(7,8),(5,5)]
 * 
 * o/p: 5 i,e (1,2),(3,4),(5,5),(6,7),(7,8) if we make these bridges we can make at most bridges and no two
 *     bridges will intersect.
 * 
 * For ex: [(6,2),(4,3),(2,6),(1,5),(1,3)]
 * 
 *          1     2     3     4    5    6
 *                
 *          1     2     3     4    5    6
 * 
 * o/p: 3 we can make at most two bridges such that no two bridges intersect i,e
 *     (1,3) and 2,6 and 1,5.
 *          
 * 
 */

/**Approach:
 * 
 * 1. Sort all pairs based on first element of pair, if two pairs have same first element sort them on basis of
 * second element of pair.
 * 
 * 2. Find the LIS based on second element in pair.
 * 
 * [(6,2),(4,3),(2,6),(1,5)]
 * 
 * After step1:
 * 
 * [(1,5),(2,6),(4,3),(6,2)]
 * 
 * Step2:
 * 
 * Max length LIS based on second element in pair is: {5,6} of length 2 
 */

/**
 * Approach: 0(n log(n)),0(n)
 */

function maxBridges(arr: number[][]) {
    arr.sort((a, b) => {
        if (a[0] != b[0]) {
            return a[0] - b[0]
        } else {
            return a[1] - b[1]
        }
    })
    let num: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        num.push(arr[i][1]);
    }
    return longestIncreasingSubSequence(num);
}

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
    return tail.length;
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