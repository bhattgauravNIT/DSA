/**
 
A subarray and a subset are related concepts in the context of arrays or sets, but they have distinct meanings:

Subarray:

A subarray is a contiguous sequence of elements within an array.
Elements in a subarray must appear in the same order as they do in the original array.
For example, if you have an array [1, 2, 3, 4], then [2, 3] is a subarray, but [1, 3] is not because the elements are not contiguous in the original order.
Subset:

A subset is a collection of elements selected from a set (or an array), where the elements can be in any order, and they don't necessarily need to be contiguous.
Every array is a subset of itself.
For example, if you have a set {1, 2, 3, 4}, then both {2, 3} and {1, 3} are subsets. The order of elements doesn't matter.
In summary, the key difference lies in the arrangement of elements and the requirement for contiguity:
 
*/

/**Given a array print all the sub sets of the array.
 * 
 * Ex: arr = [1,2,3]
 * So there are 2^3 subsets i,e 
 * [],
 * [1],
 * [2],
 * [3],
 * [1,2],
 * [2,3],
 * [1,3],
 * [1,2,3]
 */

/**Approach: 0(2^(sizeOfArray) * (size of array)) =~ 0(n*(2^n)),0(1)
 * 
 * Appraoch is based on bit magic same as finding subsets of a string.
 * 
 * [],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]
 * 
 *  2^3 = 8
 * 0  -> 000     []
 * 1  -> 001     [1]
 * 2  -> 010     [2]
 * 3  -> 011     [1,2]
 * 4  -> 100     [3]
 * 5  -> 101     [1,3]
 * 6  -> 110     [2,3]
 * 7  -> 111     [1,2,3]
 */
function subSet(arr) {
    let pow = 1 << arr.length;
    let i = 0, j = 0, sub = [];
    while (i < pow) {
        while (j < arr.length) {
            let q = 1 << j;
            if ((i & q) !== 0) {
                sub.push(arr[j]);
            }
            j++;
        }
        console.log(sub);
        j = 0;
        sub = [];
        i++;
    }
}