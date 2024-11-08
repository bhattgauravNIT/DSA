/**
 * Given an array, the task is to find the length of max bio tonic subsequence.
 * A subsequence is called bio tonic subsequence if its first increasing and then decreasing where increasing 
 * part can be empty or decreasing part can also be empty.
 * 
 * For ex: {1,11,2,10,4,5,2,1}
 * o/p: 6 i,e {1,2,10,4,2,1} i,e its increasing till 10 and deceasing after that
 * 
 * ex: {12,11,40,5,3,1}
 * o/p: 5 i,e {12,40,5,3,1} increasing from 12 -> 40 and then decreasing
 * 
 * ex: {30,20,10}
 * o/p: 3 {30,20,10} i,e increasing is empty and decreasing is 30->20->10
 */

/**Approach1:0(n*n),0(n)
 * 
 * Find lis for any ith element i,e lis at ith item ending at ith index
 * Find lds for any ith element i,e lds at ith item starting at ith index
 * 
 * Max length of bio tonic sub sequence is lis[i]+lds[i]-1 because ith item is considered twice once
 * in lis calculation and once in lds calculation.
 */

function maxLengthBioTonicSubsequence(arr: number[]) {
    let lisEndingAtIthIndex: number[] = longestIncreasingSubSequence(arr);
    let ldsStartingAtIthIndex: number[] = longestDecreasingSubSequence(arr);
    let res = -1;
    for (let i = 0; i < arr.length; i++) {
        if (res < (lisEndingAtIthIndex[i] + ldsStartingAtIthIndex[i] - 1)) {
            res = lisEndingAtIthIndex[i] + ldsStartingAtIthIndex[i] - 1;
        }
    }
    return res;
}

function longestIncreasingSubSequence(arr: number[]) {
    let lis: number[] = [1];
    for (let i = 1; i < arr.length; i++) {
        let max = -1;
        for (let j = i - 1; j >= 0; j--) {
            if (arr[j] < arr[i]) {
                max = Math.max(lis[j], max);
            }
        }
        if (max !== -1) {
            lis[i] = max + 1;
        } else {
            lis[i] = 1;
        }
    }
    return lis;
}

function longestDecreasingSubSequence(arr: number[]) {
    let lds = new Array(arr.length).fill(0);
    lds[lds.length - 1] = 1;
    for (let i = arr.length - 2; i >= 0; i--) {
        let max = -1;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[i]) {
                max = Math.max(max, lds[j]);
            }
        }
        if (max === -1) {
            lds[i] = 1;
        } else {
            lds[i] = 1 + max;
        }
    }
    return lds;
}


/**Explore approach2 using binary search to find LIS and LDS if possible 
 * 
 * POV: binary search gives length of LIS but does not give the length of LIS at any ith index ending
 * at ith index.
 */
