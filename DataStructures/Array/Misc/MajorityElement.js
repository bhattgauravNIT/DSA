/**Given an array find the majority element's index.
 * An element is called an majority element if it appears more than arr.length/2 .
 * Ex: arr = [8,3,4,8,8]
 * o/p 0,3,4 i,e any index of the majority element which is 8.
 * 
 * Ex: arr = [3,7,4,7,7,5]
 * o/p -1, there is no majority elemnet, so index value is -1.
 */

/**Approach1: 0(n), O(n) */
function majorityElement(arr) {
    let i = 0, mp = new Map();
    while (i < arr.length) {
        mp.has(arr[i]) ? mp.set(arr[i], mp.get(arr[i]) + 1) : mp.set(arr[i], 1);
        i++;
    }
    for (let [key, value] of mp) {
        if (value > (Math.floor(arr.length / 2))) {
            return arr.indexOf(key);
        }
    }
    return -1;
}

/**Approach2: 0(n),O(1)
 * Moore's Voting algo 
 * 
 * This algo is basically the function majorityElement1.
 * 
 * So let's have a cnt = 1 initially and a majorityIndex = 0;
 * now iterate from i=1 till end.
 * If(arr[i]===arr[majority]) then incremnet cnt
 * else decremnet cnt if any point of time cnt becomes 0, reset the majorityIndex to current index and cnt to 1.
 * 
 * This majority index will have the potential candiate that can be the majority element.
 * 
 * Now we have written another method according to question requiremnets to check if this majority element occurence is 
 * greater than n/2 or not in the original array.
 * 
 * If yes, than its the answer, if no return -1.
 * */

function majorityElement1(arr) {
    let majorityIndex = 0;
    let cnt = 1;
    let i = 1;
    while (i < arr.length) {
        if (arr[i] === arr[majorityIndex]) {
            cnt++;
        } else {
            cnt--;
            if (cnt === 0) {
                majorityIndex = i;
                cnt = 1;
            }
        }
        i++;
    }
    return checkItsMajority(majorityIndex, arr);
}

function checkItsMajority(checkIndex, arr) {
    let i = 0, cnt = 0;
    while (i < arr.length) {
        if (arr[i] === arr[checkIndex]) {
            cnt++;
        }
        i++;
    }
    return cnt > Math.floor(arr.length / 2) ? arr[checkIndex] : -1;
}

console.log(majorityElement([8, 8, 6, 6, 6, 4, 6]))
