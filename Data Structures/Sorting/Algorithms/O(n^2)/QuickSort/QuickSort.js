/**Quick sort algo is also a divide and conqur algo however the main differnce between it and merge sort
 * is that merge sort sort array considering the middle element always and then sorting the left half and the right half
 * however in quick sort we consider one pivot element, by default if we consider the pivot element as the last element than
 * we try to achieve a state such that the pivot element is a point where all the elements smaller than the pivot element are
 * towards the left of it and all the elements greater than the pivot element are towards the right of it.
 * 
 * Now to this left subArray we again try to acheive the state considering the end elemnet of this left subArray as pivot and
 * placing it to a position where all the elements smaller that it are placed towards left of it and all the elements greater
 * than it are placed towards right of it.
 * 
 * THis we do recursively.
 * 
 * Now coming to the point that how we partition array in such a way that the pivot element acheievs a position where
 * all the elements smaller to it are towards left and all elements greater than it are towards right.
 * This is done via lamuoto parition. 
 */

function quickSort(arr, low, high) {
    if (low < high) {
        let pivot = lamutoPartition(arr, low, high);
        quickSort(arr, low, pivot - 1);
        quickSort(arr, pivot + 1, high);
    }
}

function lamutoPartition(arr, low, high) {
    let pivot = arr[high];
    let smallerWindow = low - 1, largerWindow = low;
    while (largerWindow < high) {
        if (arr[largerWindow] < pivot) {
            smallerWindow++;
            arr = swap(arr, smallerWindow, largerWindow);
        }
        largerWindow++;
    }
    arr = swap(arr, smallerWindow + 1, high);
    return smallerWindow + 1;
}

function swap(arr, index1, index2) {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    return arr;
}

let arr = [10, 9, 8, 7, 6, 1];
quickSort(arr, 0, arr.length - 1);
console.log(arr);
