/** Given an array find all possible subArray.
 * A subArray is a contagious elements sub array of an array.
 * 
 * Ex: arr = [1,2,3]
 * All possible subArray is [1],[1,2],[1,2,3],[2],[2,3],[3]
*/

/**Approach: 0(n^3),O(1) 
 * 
 * for all i from 0 to arr.length, 
 * lets have a j that starts from i goes till arr.length 
 * and prints everything from i to j.
 * 
 * [1], [1,2],[1,2,3]
   0-0  0-1   0-2

   [2], [2,3]
   1-1  1-2
   
   [3]
   2-2

   See the pattern in index 0-0 is a subArray similar , 0-1 is a subarray, 0-2 is a subarray, then 1-1 is a subarray..... and so
   on.
*/
function allSubArray(arr) {
    let i = 0, j = 0;
    while (i < arr.length) {
        while (j < arr.length) {
            let k = i, temp = [];
            while (k <= j) {
                temp.push(arr[k]);
                k++;
            }
            console.log(temp);
            j++;
        }
        i++;
        j = i;
    }
}