/**Given an array find the maxProduct of the subArray
 * 
 * Ex: arr = [1,2,3]
 * O/p is 6
 * as all the subarray of the arr is
 * [1], [1,2],[1,2,3]
   [2], [2,3]
   [3]
   
 */

/**Approach1: O(n^3):O(1) 
 * 
 * Find all the subArray for the given array and compute the max Product of them.
 * [1], [1,2],[1,2,3]
   0-0  0-1   0-2
   [2], [2,3]
   1-1  1-2
   [3]
   2-2

   See the pattern in index 0-0 is a subArray similary , 0-1 is a subarray, 0-2 is a subarray, then 1-1 is a subarray..... and so
   on.
*/
function maxProductSubArray(arr) {
    let i = 0, j = 0, maxProd = Number.MIN_SAFE_INTEGER;
    while (i < arr.length) {
        while (j < arr.length) {
            let k = i, prod = 1;
            while (k <= j) {
                prod *= arr[k];
                k++
            }
            if (prod >= maxProd) {
                maxProd = prod;
            }
            j++;
        }
        i++;
        j = i;
    }
    return maxProd;
}

/**Approach2: 0(n^2),0(1)
 * Ex: arr = [1,2,3]
 * we maintain two pointers i and j both starting at 0, we keep track of the product being encountered for every j
 * such that j=i and j< arr.length
 * if product is greater than max at any time , max should be updated.
 * Based on brute force fact that 
 * all products will be 1, 1*2, 1*2*3, 2, 2*3, 3
 */
function maxProductSubArray1(arr) {
    let i = 0, j = 0, max = Number.MIN_SAFE_INTEGER;
    while (i < arr.length) {
        let prod = 1;
        while (j < arr.length) {
            prod *= arr[j];
            if (prod > max) {
                max = prod;
            }
            j++;
        }
        i++;
        j = i;
    }
    return max;
}
