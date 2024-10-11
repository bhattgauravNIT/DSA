/**Given a sorted array, find the frequencies of the element */

/**Approach1: O(n),0(n)
 * 
 * The approach is simply to use a hashMap which will store key value pair for the item and its total number of occurrence.
 * If element is not present in map simply push in map and make its count as 1.
 * If element is already present in map, increment its existing count.
 */
function frequenciesInSortedArray(arr) {
    let i = 0, mp = new Map();
    while (i < arr.length) {
        mp.has(arr[i]) ? mp.set(arr[i], mp.get(arr[i]) + 1) : mp.set(arr[i], 1);
        i++;
    }
    for (let [key, value] of mp) {
        console.log(`${key}` + '->' + `${value}`);
    }
}

/**Approach2: 0(n),0(1)
 * 
 *  Since the array is already sorted and thus we simply can count the total occurrence of any element by maintaining a cnt variable.
 * This will reduce the additional space which we are taking to store elements in map.
 */
function frequenciesInSortedArray1(arr) {
    let i = 0;
    while (i < arr.length) {
        let j = i + 1, cnt = 1;
        while (arr[j] === arr[i]) {
            j++;
            cnt++;
        }
        console.log(`${arr[i]}` + '->' + `${cnt}`);
        i = j;
    }
}