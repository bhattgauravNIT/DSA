/**Given an binary array consiting of 0's and 1's only and is sorted, the task is to find the 
 * the number of 1's in the binary array.
 * 
 * EX; arr = [0,0,0,0,1,1,1] o/p 3
 */

/**Refer the file NumberOfOccurenceInSortedArray.js 
 * 
 * That is the same solution and that is the same problem. 
 * 
 * The only difference is here its a binary array consiting of 0's and 1's only and k=1 always.
 */

/**Approach 1: 0(n),0(n)
 * 
 * Use a map to store the number of occurence, iterate through and get the value for key =1.
 * If key was never 1 then return 0 indicating that 1 is nowhere peresent in arr.
*/
function numberOf1(arr) {
    let mp = new Map();
    let i = 0;
    while (i < arr.length) {
        mp.has(arr[i]) ? mp.set(arr[i], mp.get(arr[i]) + 1) : mp.set(arr[i], 1);
        i++;
    }
    for (let [key, value] of mp) {
        if (key === 1) {
            return value;
        }
    }
    return 0;
}

/**Approach2: 0(n),0(1)
 * 
 * Find the first occurence of 1 in linear time, ex: arr = [0,0,0,1,1,1]
 * so the first occurence of 1 is 3.
 * Once we found the first occurence of one, we know that arrray is sorted and array consist of only 0's and 1's , thus
 * the remaining elemnet in the array will be 1 only, thus the number of 1's will be
 * 
 * Total length of array - index of first occurence of 1.
 */
function numberOf1(arr) {
    let i = 0;
    while (i < arr.length) {
        if (arr[i] === 1) {
            return arr.length - i;
        }
        i++;
    }
    return 0;
}

/**Approach3: 0(log(n)),0(1)
 * 
 * In the above approach , where total number of 1's are Total length of array - first index of 1.
 * 
 * if we find the index of first occurence of 1 in O(log(n)) using binary search than we
 * can reduce the complexity to O(log(n)).
 */
function numberOf1(arr) {
    let first = firstOccurence(arr);
    return first === -1 ? 0 : arr.length - first;
}

function firstOccurence(arr) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === 1) {
            if (arr[mid - 1] !== 1 || mid === 0) {
                return mid;
            } else {
                high = mid - 1;
            }
        } else if (arr[mid] === 0) {
            low = mid + 1;
        }
    }
    return -1;
}