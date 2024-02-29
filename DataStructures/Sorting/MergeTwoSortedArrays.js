/**Given two sorted array, print all the elements of the two arrays in sorted format only.
 * 
 * Ex: arr1 = [10,15,20];
 * arr2 = [5,6,6,15];
 * 
 * O/p is 5,6,6,10,15,15,20
 */

/**Approach: 0(n+m),0(1)
 * 
 * Two pointer approach, 
 * use one pointer on arr1 and aonther on arr2.
 * If(arr1[i]<arr2[j]) push arr1[i],i++
 * else if(arr1[i]>arr2[j]) push arr2[j],j++
 * else push both arr[i]&arr[j], i++,j++
 * 
 * The note point here is lets have one array is larger than another , so the smaller array runs out earlier 
 * as compare to larger array and thus, we need to check if say arr1 was larger array.
 * 
 * If(i<arr1.length) till i<arr1.length keep pushing the elements.
 * 
 * Now another intresting point here is the in case of arr[i]===arr[j] we have written
 * res.push(arr1[i]);
   res.push(arr2[j]);

   and not 

    res.push(arr2[j]);
    res.push(arr1[i]);

    This is due to the fact that we want to maintain stability i,e the element of arr1 should come before element of arr2 
    even if both of them are equal.
 */
function mergeSortedArray(arr1, arr2) {
    let i = 0, j = 0, res = [];
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            res.push(arr1[i])
            i++;
        } else if (arr1[i] > arr2[j]) {
            res.push(arr2[j]);
            j++
        } else {
            res.push(arr1[i]);
            res.push(arr2[j]);
            i++;
            j++;
        }
    }
    while (i < arr1.length) {
        res.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        res.push(arr2[j]);
        j++;
    }
    return res;
}