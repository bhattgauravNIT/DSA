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

