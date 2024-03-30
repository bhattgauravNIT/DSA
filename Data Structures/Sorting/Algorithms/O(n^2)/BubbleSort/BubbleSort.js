/**Bubble sort algo for sorting is a stable sorting algo as it doesn't effect the position of same values and these positions
 * remains intact as its in original array.
 * 
 * Ex: obj = [{name: 'Gaurav', marks:20},{name: 'Punnet', marks:30},{name: 'Adam', marks:20}]
 * 
 * i,e  obj.sort((a,b)=> a.marks-b.marks);
 * 
 * If we sort this object based on marks by bubble sort(considering the above sort function if in cases uses bubble sort) 
 * than since gaurav and adam has same marks and gaurav is coming before
 * adam , thus this position will remain intact.
 * 
 * Lets take example: [2,8,10,7]
 * 
 * In 1st pass we try to shift the greatest element in the end and stick it there at (n-1)th position.
 * Then in the next pass we again try to shift the next second greater element to the end and stick it to (n-2)th position
 * We continue the same.
 * 
 * Ex: [2,10,8,7].
 * 
 * 1st pass: 
 * 
 * 1. 2,8,10,7
 * 2. 2,8,7,10
 * 
 * the greatest element is at the end 1st pass end.
 * 
 * 
 * 2nd pass:
 * 
 * 1. 2,7,8,10   the second greatest is now at n-2 the position second pass end
 * 
 * 3rd pass: 
 * 
 * 1. 2,7,8,10
 * 
 * The third largest element is at the n-3th position .
 * 
 * End.
 * 
 * Refer resources for more visvulazied info.
 */

/**Approach: 0(n^2),0(1)
 * 
 * This approach always take 0(n^2) even in the cases where user provide a already sorted array.
 * Thus we can optimize it to work in 0(n) in best case i,e when the array is already sorted or in between any phase the
 * array become sorted then we dont need to carry on to the nexct phases.
 */
function bubbleSort(arr) {
    let i = 1, k = arr.length - 1;
    while (i < arr.length) {
        let j = 1;
        while (j <= k) {
            if (arr[j - 1] > arr[j]) {
                let temp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = temp;
                j--;
            }
            j++;
        }
        i++;
        k--;
    }
    return arr;
}

/**Appraoch 2: WorstCase: 0(n^2),0(1), BestCase: 0(n),0(1)
 * 
 * If the array is alreday sorted then there will be no swapping even in the 1st phase and thus we check that if no swapping has 
 * happened in a phase this means that we dont even need to go into next phase as array has become sorted.
 * 
 * Similar case if after any phase the array becomes sorted it will check that and then we dont need tp go to any other phase after
 * it.
 */
function bubbleSort(arr) {
    let i = 1, k = arr.length - 1, isSwapped = false;
    while (i < arr.length) {
        let j = 1;
        while (j <= k) {
            if (arr[j - 1] > arr[j]) {
                let temp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = temp;
                j--;
                isSwapped = true;
            }
            j++;
        }
        if (isSwapped = false) {
            break;
        }
        i++;
        k--;
    }

    console.log(arr);
}

