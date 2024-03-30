/**Given an array arr, and a window size k, we need to give all the number of distinct element in every possible
 * window of size k in arr.
 * 
 * Ex: arr = [10,20,20,10,30,40,10] , k=4.
 * 
 * So first window of size 4 is [10,20,20,10] it has 2 distinct elements
 *    second window of size 4 is [20,20,10,30] it has 3 distinct elemnets.
 *    third window of size 4 is [20,10,30,40] it has 4 distinct elements.
 *    fourth wondow of size 4 is [10,20,40,10] it has 3 disntinct elements.
 * 
 * O/p is [2,3,4,3].
 * 
 * Ex: arr = [10,10,10,10] k=3 o/p is [1,1]
 * 
 * ex: arr = [10,20,30,40] k=3 o/p is [3,3]
 */

/**Approach1: O(n^2), 0(n)
 * 
 * The approach is naive and simply we tarverse over all the elements of all the possible windows and add them in set,
 * once one window traversal is complete we place the s.size in res array and again start same from the next window.
 * 
 * Ex:  arr = [10,20,20,10,30,40,10] , k=4.
 * 
 * 1st window is i=0->j=3 for size 4.  We go from p=i->j and place everything in set which takes only distinct elements
 * after the window traversal is complete we place the size of this set in res.
 * 
 * 2nd window is i=1->j=4 for size 4. We go from p=i->j and repeat the same.
 */
function disntictElementsInKSizeWindow(arr, k) {
    let i = 0;
    let j = (i + k) - 1;
    let s = new Set();
    let res = [];
    while (j < arr.length) {
        let p = i;
        while (p <= j) {
            s.add(arr[p]);
            p++;
        }
        res.push(s.size);
        i++;
        j = (i + k) - 1
        s.clear();
    }
    return res;
}

/**Approach2: 0(n),0(1)
 * 
 * the idea is simple , its something like sliding window , once we have reached the end of the window we remove the first index
 * of the previous window and insert the next element from the end of previous window.
 * 
 * Lets take an example:
 * arr = [10,20,20,10,30,40,10] , k=4.
 * 
 * The first window will have starting index as 0 and ending index as 3.Lets mark them as pointer i & j respectively.
 * Lets place all the elements of thsi firstWindow in a hashMap as element, numberOfOccurence.
 * 
 * So mp will have {(10,2),(13,2)}.
 * Push the size of the map in res.
 * 
 * Now after j=3, every elemnet from j=3->j=arr.length-1 will contribute to a new window.
 * 
 * Now we move to j=4th index and lets remove the index 0th element one occurence
 * from the map, meaning since now we are moving to the next window
 * the first element of the previous window should be reduced from map.
 *  So reduce the occurence of i=0th elemnet from the map , Now map is: {(10,1),(13,2)}.
 * Add this j=4th element in map. Since previously it was not there thus mark as 1st occurence. {(10,1),(13,2),(30,1)}
 * Now Make sure that if occurence of any element after reducing becomes 0 then delete this key from map.
 * 
 * push size of map in res.
 * 
 * Move to j=5th and repeat the same process.
 */
function disntictElementsInKSizeWindow1(arr, k) {
    let i = 0;
    let j = k - 1 + i;
    let mp = new Map();
    let res = []
    for (let p = 0; p <= j; p++) {
        mp.has(arr[p]) ? mp.set(arr[p], mp.get(arr[p]) + 1) : mp.set(arr[p], 1);
    }
    res.push(mp.size);
    j++;
    while (j < arr.length) {
        mp.set(arr[i], mp.get(arr[i]) - 1);
        if (mp.get(arr[i]) === 0) {
            mp.delete(arr[i]);
        }
        i++;
        mp.has(arr[j]) ? mp.set(arr[j], mp.get(arr[j]) + 1) : mp.set(arr[j], 1);
        res.push(mp.size);
        j++;
    }
    return res;
}