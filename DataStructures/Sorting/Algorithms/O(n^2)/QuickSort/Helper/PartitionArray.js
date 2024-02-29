/**Given an unsorted array arr and an index of an element within the array, the task is to partition 
 * the array based on the given index. 
 * 
 * By partition we mean that all elements greater than or equal to the value at the index should come before it and 
 * the values greater than that indexed value element should come after it.
 * 
 * Ex: arr = [3,8,6,12,10,7], p=5
 * 
 * o/p [3,6,7,8,12,10]
 * 
 * Ps: Note the order of elements does not matter only thing which matter is all elements smaller or equal than pivot index
 * element should be before it and all elements greater than pivot indexed element should be after it.
 */


/**Approach 1: 0(n),0(n)
 * 
 * Maintain two seperate array left and right , left array having all the elements smaller than or equal to given indexed ele,
 * and right array having all the elements greater the given indexed array.
 * 
 * Merge them both and make arr equal to it.
 */
function partitionArray(arr, index) {
    let left = [], right = [];
    let i = 0;
    while (i < arr.length) {
        if (arr[i] <= arr[index]) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
        i++;
    }
    i = 0;
    arr = [...left, ...right];
    return arr;
}

/**Approach2: 0(n),0(1) 
 * 
 * This approach is known as lamuto partition.
 * 
 * Lets suppose we always have to partition array based on the last element present in arr.(We will modify this later but for now
 * lets only consider this).
 * 
 * Now lets have a smallerWindow starting from index -1 and a higherWindow starting from index 0 till second last element 
 * of the array.
 * 
 * If the higherElement index value is smaller or equal to the pivot element we increment the smaller window size and swap
 * the element at smaller window and higher window.
 * 
 * In last we swap the pivot element with smallerIndex+1.
 * 
 * In this we way we are able to acheive all elements samller or equal to pivot element before it
 * and all elements greater than pivot element after it.
 * 
 * ex: arr = [5,3,8,4,2,7,1,10]
 * 
 * smallerWindow = -1, higherWindow = 0, pivot = 10
 * 
 * arr[higherWindow]<= pivot so increment smaller window and swap smaller window and higher window so 5 gets swapped to itself.
 * now higherWindow increased t0 3 , again 3 is less than pivot so increase smaller window and swap smaller window and higher window
 * so 3 gets swapped to iteself,.....
 * 
 * and so on...................
 * 
 * Note: Here we are considering only pivot as last indexed element.
 * 
*/
function lamutoPartition(arr) {
    let pivot = arr[arr.length - 1];
    let smallerWindow = -1;
    let higherWindow = 0;
    while (higherWindow < arr.length - 1) {
        if (arr[higherWindow] <= pivot) {
            smallerWindow++;
            arr = swap(arr, smallerWindow, higherWindow);
        }
        higherWindow++;
    }
    arr = swap(arr, smallerWindow + 1, arr.length - 1);
    return arr;
}

function swap(arr, index1, index2) {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    return arr;
}

/**Approach2: 0(n),0(1) (modified for any pivot index). 
 * 
 * Now lets consider an example when pivot element is not the last element and is given as an input param by the user
 * Its just an simple modification to lamuto partition.
 * 
 * lets say pivot = 3, so lets swap the last indexed element with pivot=3 to make pivot = arr[arr.length-1], i,e the 
 * last element of the array and then apply standard lamuto partition to it.
*/

function lamutoPartition1(arr, pivot) {
    arr = swap(arr, arr.length - 1, pivot);
    pivot = arr[arr.length - 1];
    let smallerWindow = -1;
    let higherWindow = 0;
    while (higherWindow < arr.length - 1) {
        if (arr[higherWindow] <= pivot) {
            smallerWindow++;
            arr = swap(arr, smallerWindow, higherWindow);
        }
        higherWindow++;
    }
    arr = swap(arr, arr.length - 1, smallerWindow + 1);
    return arr

}

function swap(arr, index1, index2) {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    return arr;
}

