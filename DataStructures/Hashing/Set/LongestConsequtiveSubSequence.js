/**Given an array arr, we need to return the length of the longest consequtive subSequence of the array.
 * 
 * Ex: arr= [1,9,3,4,2,20].
 * 
 * So the longest consequtive subSequence in arr is [1,3,4,2]. o/p is 4
 * 
 * Note that consequtive means x, x+1, x+2, x+3...... however the order of consequtiveness does not matter.
 * 
 * Ex: arr = [1,9,16,20] o/p is 1 beacuse every element is iteself a consequtive subSequence of length 1 and since
 * the largest consequtive subSequence in arr is of length 1 only thus o/p is 1.
 * 
 * Ex: arr = [8,20,7,30], o/p is 2 Subsequence of consequtive elements are [8,7];
 * 
 * Ex: arr= [1,3,4,3,3,2,9,10] o/p is 4 [1,2,3,4] we dont take repetitions into consideration.
 */

/**Approach: 0(nlogn),0(1)
 * 
 * Simple idea is to use sorting ex: 
 * 
 * arr = [1,9,3,4,2,20]
 * after sorting arr = [1,2,3,4,9,20].
 * 
 * Have a pointer at i=1. Check if arr[i-1]+1 === arr[i];
 * 
 * If satisfied increment cnt which resembles length of current subSequence. Once condition fails
 * take max of res,max and make cnt=1 again.
 * 
 * Note point here is lets say we have repeated elements in array for ex:
 * arr= [1,3,4,3,3,2,9,10] o/p is 4, [1,2,3,4] we dont take repetitions into consideration.
 * So if arr[i-1]+1=== arr[i] || arr[i-1]===arr[i], when we are still in the current subSequence so we 
 * dont take max of res and cnt at this point. We take max of res and cnt when we are out of current subSequence.
 * 
 */
function longestConsequtiveSubSequence(arr) {
    arr.sort((a, b) => a - b);
    let i = 1;
    let cnt = 1;
    let res = 0;
    while (i < arr.length) {
        if (arr[i - 1] + 1 === arr[i] || arr[i - 1] === arr[i]) {
            if (arr[i - 1] + 1 === arr[i]) {
                cnt++
            }
        } else {
            res = Math.max(cnt, res);
            cnt = 1;
        }
        i++;
    }
    return res;
}

/**Approach 2: 0(n),0(n)
 * 
 * The approach is based on hasing.
 * Lets take ex: arr = [1,3,4,3,3,2,9,10], since there is a chance of repeated elements in array, we will iterate over the array
 * and add all the elements to a set.
 * 
 * Now set contains { 1, 3, 4, 2, 9, 10 }.
 * 
 * Now we will iterate in set.
 * 
 * We came to 1, we will check if set contains 1-1=0 it does not contain , so it means the subsequence
 * can start from 1 so we will start a new subSequence from 1.
 * Now started our subSequence from 1, we will check if set contains 1+1=2, it does contain so we will increment cnt.
 * Similary we will check if set contains 2+1=3 its present so again we will increment cnt
 * and so on till we dont find a number which is should be a part of subSequnce but its not. This point means
 * that the current subSequnce should break so we take max(res,cnt).
 * 
 * Now we will start again a subSequnce from 3, we will see if 3-1 is present in set, and since its already means this means
 * that 3 cant be ,considered as starting of a subSequence as it must already be a part of some other subSequnce so we move to
 * next elemnent in set which is 4. Same applies to it as 4-1 is present in set thus we cant start a new subSequnce from 4.
 * 
 * Now we will move to 2, same scenario.
 * 
 * Now we move to 9 clearly 9-1=8 is not present in set we can start a new subSequnce from 9.
 * So we check if 10 is present which is there hence cnt++.
 * Now we check if 11 is present which is not hence we take max(res,cnt) and move to next element in set.
 * 
 * Now we move to 10, 10-1=9 is present so we can not start a new subSequnce from 10.
 */
function longestConsequtiveSubSequence(arr) {
    let s = new Set();
    for (let i = 0; i < arr.length; i++) {
        s.add(arr[i]);
    }
    let cnt = 1;
    let res = 0;
    for (let val of s) {
        if (!s.has(val - 1)) {
            let i = 1;
            while (s.has(val + i)) {
                cnt++;
                i++;
            }
            res = Math.max(res, cnt);
            cnt = 1;
        }
    }
    return res;

}

