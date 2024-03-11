/**Given two array arr1 and arr2 find the uninon of the two unsorted array.
 * 
 * Ex: arr1 = [3,3,3,3]
 * arr2 = [3]
 * 
 * o/p is 1 beacuse 3 is the union of both the unsorted array/
 * 
 * ex: arr1 = [15,20,5,15]
 * arr2 = [15,15,15,20,10]
 * o/p is 15,20,5,10 so 4 is the output.
 */

/**Approach: 0(n+m), O(n+m)
 * 
 * Place every element of arr1 into a set and all elements of arr2 in the same set.
 * Placing elements of arr1 in set remove all the duplicates of arr1 and similarly all duplicates of arr2.
 * So now the set will contain all the distinct elements of arr1 and arr2 combined.
 */
function unsortedUnion(arr1, arr2) {
    let s = new Set();
    for (let i = 0; i < arr1.length; i++) {
        s.add(arr1[i]);
    }
    for (let i = 0; i < arr2.length; i++) {
        s.add(arr2[i]);
    }
    return s.size;
}