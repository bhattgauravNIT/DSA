/**Given an array arr and an index and an element. Insert element at index of the given array
 * 
 * Ex: arr = [1,2,3,4,5]
 *     index = 3 , element = 8
 *     arr =  [1,2,3,8,4,5]
 */

/**Approach1 : O(n),O(n) */
function insertElementAtIndex(arr, index, element) {
    if (index === arr.length) {
        arr.push(element);
    } else {
        let temp = [];
        let i = 0;
        while (i < arr.length) {
            if (i === index) {
                temp.push(element);
            }
            temp.push(arr[i]);
            i++;
        }
        i = 0;
        while (i < temp.length) {
            arr[i] = temp[i];
            i++;
        }
    }

    console.log(arr);
}

/**Approach2 : O(n),O(1) 
 * 
 * We try to create the space into the array by first kind of adding new element which is the last element itself
   present in the array and then swapping elements till we reach the index value.
   Then we simply insert the element at the index.

   So the array look like now arr = [1,2,3,4,5]
   Now start from j = arr.length till the input index and do arr[j] = arr[j-1]
   So the input arr now will look like [1,2,3,3,4,5]

   Now mark arr[index] = input element.
*/
function insertElementAtIndex1(arr, index, element) {
    let j = arr.length;
    while (j > index) {
        arr[j] = arr[j - 1];
        j--;
    }
    arr[index] = element;
    return arr;
}

