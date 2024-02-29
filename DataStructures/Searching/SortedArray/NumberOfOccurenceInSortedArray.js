/**Given an array arr and an element k, k might be duplicated as many times as possible, find the number of occurence of k in 
 * arr.
 * 
 * Ex: arr = [10,20,20,20,30,30], k =30 O/p is 2
 *     arr = [10,20,20,20,30,30], k= 90 o/p is 0.
 */

/**Approach: 0(n),0(n)
 * 
 * Simple appraoch is to use hasing to keep store of the occurence of element in the arr.
 * Then to iterate over the array and get the count of k.
 * If there is no key in map which is equal to k , then element is not present in arr thus return -1.
*/
function numberOfOccurence(arr, k) {
    let mp = new Map();
    let i = 0;
    while (i < arr.length) {
        mp.has(arr[i]) ? mp.set(arr[i], mp.get(arr[i]) + 1) : mp.set(arr[i], 1);
        i++;
    }
    for (let [key, value] of mp) {
        if (key === k) {
            return value;
        }
    }
    return 0;
}

/**Approach: 0(n),0(1) 
 * After finding the first occurence of k in arr, start a new pointer which keeps iterating till it does not found a different element.
*/
function numberOfOccurence(arr, k) {
    let i = 0, cnt = 0;
    while (i < arr.length) {
        if (arr[i] === k) {
            cnt++;
            let j = i + 1;
            while (arr[j] === k && j < arr.length) {
                j++;
                cnt++;
            }
            break;
        }
        i++;
    }
    return cnt === 0 ? cnt : cnt;
}

/**Approach: 0(log(n)),0(1)
 * 
 * The idea is say for an arr = [10,20,20,20,30,30],k =30, we find the first occurence of k in arr through binary search 
 * so it will be 4, in O(log(n)) time, now we find the last occurence of 30 in arr, so that will be 5 in O(log(n)) time again.
 * 
 * The number of occuernce will be the lastIndex-firstIndex+1;
 * 
 * Note if the firstIndex comes as -1, means the element is not present in the array and thus the function should return count
 * for element as 0.
 */
function numberOfOccurence(arr, k) {
    let firstIndex = firstOccurence(arr, k);
    if (firstIndex === -1) {
        return 0;
    } else {
        let lastIndex = lastOccurence(arr, k);
        return lastIndex - firstIndex + 1;
    }
}

function firstOccurence(arr, k) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === k) {
            if (arr[mid - 1] !== k || mid === 0) {
                return mid;
            } else {
                high = mid - 1;
            }
        } else if (k > arr[mid]) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}

function lastOccurence(arr, k) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === k) {
            if (arr[mid + 1] !== k || mid === arr.length - 1) {
                return mid;
            } else {
                low = mid + 1;
            }
        } else if (k > arr[mid]) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}

