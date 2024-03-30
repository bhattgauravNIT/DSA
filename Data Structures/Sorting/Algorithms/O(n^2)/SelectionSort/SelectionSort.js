/**Selection sort is an unstable sorting algo, its based on the idea that
 * 
 * We try to find the smallest element and place it at beggining, again we try and find the smallest element amongst
 * remaining elements and place it at beggining+1, and so on...
*/

/**Approach: 0(n^2),0(1) 
 * Ex: arr = [10,5,8,20,2,18]
 * 
 * We start from i=0 take a pointer j=0 till end of the array and found out the min Element present in the array.
 * We swap it with i=0th element,
 * Now we move to i=1, start a pointer from j=1 till end and found the second smallest element in the array and swap it 
 * with i=1th element.
 * 
 * And so on..... 
 * 
*/
function selectionSort(arr) {
    let i = 0;
    while (i < arr.length) {
        let j = i, min = Number.MAX_SAFE_INTEGER, minIndex = i;
        while (j < arr.length) {
            if (arr[j] < min) {
                min = arr[j];
                minIndex = j;
            }
            j++;
        }
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
        i++;
    }
    return arr;
}