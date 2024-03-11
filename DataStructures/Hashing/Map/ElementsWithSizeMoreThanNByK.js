/**Given an array arr and a value k, the task is to find all the numbers in the array whose occurence is greater than n/k
 * 
 * Ex: arr = [30,10,20,30,30,40,30,40,30], k = 2
 * 
 * o/p is 30
 */

/**Approach1: 0(n),0(n) 
 * 
 * The simple idea is to have a hash map which stores the elements corresponding to its number occurence,
 * if the occurence is more than arr.length/k , print that key.
*/
function moreThanNByKOccurence(arr, k) {
    let mp = new Map();
    for (const element of arr) {
        mp.has(element) ? mp.set(element, mp.get(element) + 1) : mp.set(element, 1);
    }
    for (let [key, value] of mp) {
        if (value > (arr.length) / k) {
            console.log(key);
        }
    }
}

/**Approach2: 0(n*k), 0(k)
 * 
 * The problem with above approach was that lets say we had very large value of n. so we have to create a 0(n)
 * auxilary space which is very large.
 * 
 * Lets try a soultion which is ideal for small values of k as our time complexity is 0(n*k) so for small values
 * of k its equivalent to n & a auxilary space of 0(k).
 * 
 * The idea is the advanced extension of Moore's voting algo.
 * 
 * Moores voting algo as we have seen in majority element problem is based on two process.
 * 
 * First process is to get the potential candidate for majority element which could satisfy the condition that its
 * occurence is more than n/k times.
 * 
 * Second process is to exactly check if this potential candidate has occurence more than n/k times or not.
 * 
 * Now for the first case in this probelm we will be working with 3 cases.
 * 
 * Case 1: If arr[i] is already present in map than increment its count.
 * Case2: Else if size of the map is less than k-1, insert element in the map.
 * Case2: else the element is not in map and even the map size is greater than n-k.
 *        We make occurence of all the keys in map reduced by 1 and if any occurence becomes 0 we remove it from
 *        map. 
 * 
 * In this way by the end of the iteration our map will only contains those elements which are a potential candidate
 * for majority element of occurence more then n/k times.
 * 
 * For every potential element we need to check if really its occurence is greater than n/k thus we write a
 *  countFunction and invoke it for every element of map. 
 * 
 */
function moreThanNByKOccurence1(arr, k) {
    let mp = new Map();
    for (let i = 0; i < arr.length; i++) {
        if (mp.has(arr[i])) {
            mp.set(arr[i], mp.get(arr[i]) + 1);
        } else if (mp.size < k - 1) {
            mp.set(arr[i], 1);
        } else {
            for (let [key, value] of mp) {
                mp.set(key, value - 1);
                if (mp.get(key) === 0) {
                    mp.delete(key);
                }
            }
        }
    }
    for (let [key, value] of mp) {
        getCount(key, arr, k);
    }
}

function getCount(value, arr, k) {
    let cnt = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            cnt++;
        }
    }
    if (cnt > arr.length / k) {
        console.log(value)
    }
}
