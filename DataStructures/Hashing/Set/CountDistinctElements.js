/**Given a array arr such that it contains some elements which are repeated and some non repeated
 * 
 * ex: arr = [15,12,13,12,13,13,18] count all the distinct elements in the array
 * o/p 4 so 15,12,13,18 are distinct rest all are the repeating elements of either of these 4 elements.
 */

/**Approach: 0(n),0(n)
 * 
 * The approach is based on the idea that a set always contains unique values thus once we have completely
 * iterated over the arr and put everything in set all the distinct elements will be there in set and thus
 *  the size of the set will be the answer.
 */
function countDistinct(arr) {
    let s = new Set();
    for (let i = 0; i < arr.length; i++) {
        s.add(arr[i]);
    }
    return s.size;
}