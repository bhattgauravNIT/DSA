/**Given two sorted array, find the median of the sorted array.
 * 
 * Ex: arr1 = [10,20,30,40,50]
 * arr2 = [5,15,25,35,45].
 * 
 * arr = [5,10,15,20,25,30,35,40,45,50]
 * Median is (25+30)/2 = 55/2 = 27.5
 * 
 * ex: arr1 = [10,20,30,40,50,60]
 * arr2 = [1,2,3,4,5]
 * arr = [1,  2,  3,  4,  5, 10, 20, 30, 40, 50, 60]
 * Median is 10
 */

/**Approach1: 0(m+n),0(m+n)
 * The approach is to main a seperate sorted array based on tyhe two array being provided.
 * Use the two pointer appraoch to get the sorted array which is the combination of two given array.
 * 
 * then take out the median in the sorted array obtained.
 */
function medianOfTwoSortedArray(arr1, arr2) {
    let arr = [];
    let i = 0, j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] === arr2[j]) {
            arr.push(arr1[i]);
            arr.push(arr2[j]);
            i++;
            j++;
        } else if (arr1[i] < arr2[j]) {
            arr.push(arr1[i]);
            i++;
        } else {
            arr.push(arr2[j]);
            j++;
        }
    }
    if (i < arr1.length) {
        while (i < arr1.length) {
            arr.push(arr1[i]);
            i++;
        }
    }
    if (j < arr2.length) {
        while (j < arr2.length) {
            arr.push(arr2[j]);
            j++;
        }
    }
    let mid = Math.floor((arr.length - 1) / 2);
    if (arr.length % 2 !== 0) {
        return arr[mid];
    } else {
        return (arr[mid] + arr[mid + 1]) / 2;
    }
}

/**Approach2: 0(log(n)),0(1) 
 * where n<=m, we need to assume that n<=m and we need to perfomr binary search only on the array whose
 * length is smaller or equal to the other array
 * 
 * Ex: a1=[1,2,3,4,5],a2= [10,20,30,40,50,60]
 * 
 * To be seen again...
 * 
 *   */