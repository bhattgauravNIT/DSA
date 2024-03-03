/**Given an array arr , print the frequencies of all the distinct elements of the array.
 * 
 * Ex: arr = [10,12,10,15,10,20,12,12];
 * 
 * o/P 10 -> 3
 *     12 -> 3
 *     15 -> 1
 *     20 -> 1
 * 
 */

/**Approach: 0(n),0(n)
 * 
 * Simply use a map to store the key value pairs for elements.
 * If the elemnet is already present in the map then get its value and increment it by 1, else
 * set the value of the element as 1.
 */
function elementFrequencies(arr) {
    let mp = new Map();
    for (let i = 0; i < arr.length; i++) {
        mp.has(arr[i]) ? mp.set(arr[i], mp.get(arr[i]) + 1) : mp.set(arr[i], 1);
    }
    for (let [key, value] of mp) {
        console.log(`${key} => ${value}`);
    }
}
