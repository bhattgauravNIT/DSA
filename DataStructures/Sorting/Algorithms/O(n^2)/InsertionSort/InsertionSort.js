/**Insertion sort is a stable sorting algo and its based on the fact that we maintain an i-1th size array 
 * always sorted and for every ith element we plavce it in right position inside this i-1th sorted array
 * and there for making the sorted array expand.
 * 
 * Ex: arr = [20,5,40,60,10,30]
 * 
 * i=1 i,e 5 its correct position is i=0 so arr = [5,20,40,60,10,30]
 * i=2 i,e 40 is already at its correct position.
 * i=3 i,e 60 already at its correct position
 * i=4 i,e 10 has to be placed at i=1 , ie, arr = [5,10,20,40,60,30]
 * i=5 i,e 30 has to be placed at i=3 ie arr = [5,10,20,30,40,60].
*/

/**Approach: Worst case: 0(n^2),0(1) , best case: 0(n),0(1);
 * 
 * Consider example:
 * arr = [20,5,40,60,10,30]
 * 
 * We start from i=1. Lets have a j=i-1.
 * If arr[j]>arr[i] clearly it means that ith element is not present at its right place and in order to get to the right place,
 * this element should be places next to the element which is smaller than it.
 * 
 * So we start from j=i-1 subarray till j>=0, if(arr[j]>arr[j+1]) clearly the elemnet should be replaced with the element at
 * ith postion so arr[j+1]=arr[j];
 *                 arr[j]=value  where value is arr[i];
 * 
 * We keep shifiting and pushing the ith element towards left till we found a element such that arr[j]<arr[j+1], then
 * we break for current iteration.
 * 
 * So overall the idea is simple maintain a sorted array from i-1 till 0 and for every ith element place it in 
 * correct position.
 * 
 * Correct position technically can be found by the fact that this ith element should be placed just next to the element which
 * is found smaller than it as the i-1th till 0 array is already sorted.
 * 
 * In order to find this index keep puching this ith element towards left(towards 0th index).
 */
function insertionSort(arr) {
    let i = 0;
    while (i < arr.length) {
        let value = arr[i];
        let j = i - 1;
        if (arr[j] > arr[i]) {
            while (j >= 0) {
                if (arr[j] > arr[j + 1]) {
                    arr[j + 1] = arr[j];
                    arr[j] = value;
                    j--;
                } else {
                    break;
                }
            }
        }
        i++;
    }
    return arr;
}