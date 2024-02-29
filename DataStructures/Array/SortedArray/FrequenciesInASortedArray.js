/**Given a sorted array, find the freqeuncies of the element */

/**Approach1: O(n),0(n) */
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

/**Approach2: 0(n),0(1) */
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