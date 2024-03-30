/**given two unsorted array arr1 & arr2 , we need to find the intersection elements between them and the result
 * should be in order of arr1.
 * 
 * Assume that all the elements in both the array are distinct.
 * 
 * ex: arr1 = [10,15,20,25,30,50];
 * arr2 = [30,5,15,80];
 * 
 * o/p is 15,30
 */

/**Approach: 0(m+n),0(m),
 * 
 * Where n is size of arr1 & m is size of arr2.
 * 
 * The idea is simple put all the elements of arr2 in a set. Now for every element of arr1 check if its present in set or not if yes
 * then push it to res.
 * 
 * Searching complexity is case of set is 0(1) average as we use hashing to insert elements in the set.
 */
function unsortedIntersection(arr1, arr2) {
    let s = new Set();
    let res = [];
    for (let i = 0; i < arr2.length; i++) {
        s.add(arr2[i]);
    }
    for (let i = 0; i < arr1.length; i++) {
        if (s.has(arr1[i])) {
            res.push(arr1[i]);
        }
    }
    return res;
}
