/**Given an unsorted array, the task is to find the kth smallest element in the array. 0 < k<= arr.length-1 
 * 
 * Ex: arr = [10,5,30,12]
 * k=2
 * o/p 10
 * 
 * We have all distinct elements
*/

/**Approach1: 0(nlog(n)),0(1) 
 * 
 * The idea is to first sort the array, and to provide arr[k-1] as o/p
 * The problem with this approach is if elements are repeated it will fail.
*/
function kthSmallestElement(arr, k) {
    arr.sort((a, b) => a - b);
    return arr[k - 1];
}

/**Approach2: Worst case: 0(n^2),0(1), averageCase: 0(nlog(n)),0(1)
 * 
 * Works perefctly fine with repeated elements as well.
 * 
 * Let's take an example [10,5,30,12].
 * Lets try and partition this array based on arr[arr.length-1] element, we will get
 * 
 * 10,5,12,30 and this pivot we got will be 2.
 * 
 * Now if we need to find the kth smallest element means it will be k-1th array indexed element.
 * 
 * Ex: the k=2 , 2nd smallest element in the arr is 10 and ideally if we would have sorted the array than it should have to be 
 * present at index 1.
 * 
 * So if pivot === k-1, means its the kth smallest element.
 * if pivot > k-1, this means that the required element is present at the left side so do high=pivot-1.
 * if pivot < k-1 , this means that the required element is present at the right side so do low=pivot+1.
 */
function kthSmallestElement(arr, k, low, high) {
    while (low <= high) {
        let pivot = partitionArray(arr, low, high);
        if (pivot === (k - 1)) {
            return arr[k - 1];
        } else if (pivot > k - 1) {
            high = pivot - 1;
        } else {
            low = pivot + 1;
        }
    }
    return -1
}

function partitionArray(arr, low, high) {
    let i = low - 1, j = low, pivot = arr[high];
    while (j < high) {
        if (arr[j] < pivot) {
            i++;
            arr = swap(arr, i, j);
        }
        j++;
    }
    arr = swap(arr, i + 1, high);
    return i + 1;
}

function swap(arr, i1, i2) {
    let temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
    return arr;
}

console.log(kthSmallestElement([3, 1, 7, 8, 9, 6, 2, 32,], 7, 0, 7))

