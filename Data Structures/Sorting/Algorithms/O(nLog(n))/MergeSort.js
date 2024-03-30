/**Merge sort algo give time complexity 0(nlog(n)) and use aucilary space due to call stack as well as merge function 
 * therefore it uses a sapce of 0(n), however its an stable sorting algo.
 * 
 * MergeSort is based on divide and conqur algo.
 */

/**Approach: 0(nlog(n)),0(n)
 * 
 * Lets take an example 
 * arr = [10,5,30,15,7]
 * 
 * If somehow we can make arr sorted by some mid point and then we will simply be having a array halfSorted by some midpoint,
 * then we can simply use the approach for merge half sorted array to merge both of them.
 * 
 * So considering [10,5,30,15,7]
 * Initially in merge sort we have arr,left and right.
 * 
 * Lets compute the mid point which is arr.length/2, but for very large values of arr.length we can also write it as
 * l+ Math.floor(r-l/2);
 * then we will take into considertion the left part of the given array by its mid point and will try and sort the left part of it.
 * 
 * Lets say if we can sort the left part i,e [10,5,30,15,7]
 * 
 * [5,10].
 * 
 * And also somehow sort the right part of the arr i,e [7,15,30].
 * Now clearly we have two subArray individually sorted and now simply we can write a merge function which can merge and combine 
 * them into a single sorted array.
 * 
 * Lets come to the point how we can get left sorted and right sorted by mid point first.
 * 
 * So mid point is 2 index.
 * we recursively call mergeSort(arr,0,mid);
 * Now if arr.length<=1 or say l>=r then we return to the parent call.
 * 
 * Now lets get the right sorted via calling mergeSort recursively on mergeSort(arr,mid+1,r);
 * 
 * Now once it becomes sorted we will merge them via merge function which create two sepetare arrays left and right.
 * Insert elements from 0 to mid in left & mid+1 to right in right array.
 * Then use two pointer to sort them and merge to riginal array arr.
 * 
 * Now time complexity is nlog(n) beacuse we need n time in every branch of the tree and the total branch levels that will
 * be formed will be log(n) so its nlog(n).
 * 
 * Now we need n space at every step in recursion and there are only log(n) steps (branches in tree) during entire recursion,
 * then why we need space 0(n) & not 0(nlog(n)).
 * 
 * Its beacuse at every step 0(n) space once allocated will be dealoocated once we move to next step thus
 * at any point of time in ram we will only be needing 0(n) space in memory.
 */
function mergeSort(arr, l, r) {
    if (l < r) {
        let m = l + Math.floor(((r - l) / 2));
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

function merge(arr, low, mid, high) {
    let left = [], right = [];
    let i = low;
    while (i <= high) {
        if (i <= mid) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
        i++;
    }
    i = 0;
    let j = 0, index = low;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[index] = left[i];
            i++;
        } else {
            arr[index] = right[j];
            j++;
        }
        index++;
    }
    while (i < left.length) {
        arr[index] = left[i];
        i++;
        index++
    }
    while (j < right.length) {
        arr[index] = right[j];
        j++;
        index++;
    }
}

let arr = [10, 5, 30, 15, 7]
mergeSort(arr, 0, arr.length - 1);
console.log(arr);
