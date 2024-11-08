/**
 * Given an array, the task is to find the longest increasing subsequence.
 * 
 * For ex: arr = {2,1}
 * 
 * So all subsequences are {2},{1},{2,1}
 * 
 * an subsequence is non contagious arrangement of elements which should be in same order as that of input being provided.
 * 
 * So o/p: 1 which can be any of the arrangement i,e {1} or {2}
 * 
 * 
 * Ex: arr = {3,4,2,8,10}
 * o/p: 4 i,e {3,4,8,10} is the length of longest increasing subSequence.
 * 
 * Ex: arr = {4,10,6,5,8,11,2,20}
 * o/p: 5 i,e {4,6,8,11,20} or {4,5,8,11,20}
 * 
 * Ex: {10,20,30}
 * o/p: 3 i,e {10,20,30} itself
 * 
 * Ex: {30,20,10}
 * O/p: 1 i,e {30} or {20} or {10}
 */



/**
 * Approach1: 0(n*2),0(n)
 * 
 * Lets understand this Dp approach.
 * so we will be making a dp array or say lis array.
 * We will initialize it to 1 i,e lis[0] = 1 because lets say if our arr = [3]
 * i,e of length 1 then the length of longest increasing subsequence will simply be 1 only, so for arr[0]th element the length of longest increasing subsequence is 1.
 * 
 * Now for every ith element starting from i=1 till end
 * we will check for all the element left of it, if this ith element can be a part of the longest increasing subsequence i,e if arr[j] < arr[i]
 * if yes then we take out max value of lis[j] from all the lis[j] which we will encounter.
 * 
 * If max === -1 this means that this ith element can't be a part of the LIS for any elements before it thus we will simply mark lis[i] for the ith element as 1
 * as ith element itself is one longest increasing subsequence.
 * else if max has some value so we place lis[i] as max+1.
 * +1 because we are placing ith element also now in the lis length.
 * 
 * So in short for every ith element check the max length of lis which can be obtained by including it.
 * If it can be included then mark lis[i] as max lis obtained +1
 * else mark lis[i] as 1.
 * 
 * So in this way we will be able to get LIS corresponding to every individual index.
 * 
 * Now in order to get the length of LIS we simply find max from the LIS array.
 * 
 * Lets understand this with help of an example.
 * 
 * say arr = [3,4,2,8,10]
 * so initially lis[] = [1]
 * i=1;
 * 
 * Now 
 * 1) i=1, j-> (i-1 -> 0)
 *    arr[i] > arr[j] as 4 > 3 so we can take lis[j] into consideration as arr[i] can be a part of the pervious longest increasing subsequence ending with j.
 *    max = Max(max,lis[j]) = Max(-1,1) = 1
 *    
 *   Now max is not -1 so we update lis[i] = max + 1 = 2
 * 
 *   lis = [1,2]
 * 
 *  2) i=2 , j->(1->0)
 * 
 *    arr[2] < arr[1] i,e 2 < 4 so the ith element can't be the part of LIS ending at j=1 th element
 *    arr[2] < arr[0] i,e 2 < 3 so the ith element can't be the part of LIS ending at j=0 th element
 * 
 *    max remained -1 so lis[i]  =1
 *    lis = [1,2,1]
 * 
 *  3) i=3, j->(2->0)
 *     
 *    arr[3] > arr[2] i,e 8 > 2, so ith element can be a part of LIS ending at j=2 th element max now is -1, so got updated to lis[j] = lis[2] = 1
 *    arr[3] > arr[1] i,e 8 > 4, so ith element can be a part of LIS ending at j=1 th element max now is 1, got updated to lis[j] = lis[1] = 2
 *    arr[3] > arr[0] i,e 8 > 3, so ith element can be a part of LIS ending at j=0 th element max now is 2, so we don't update max to to lis[j] = lis[0] = 1
 * 
 *    max is not -1 so lis[i] got updated to max + 1 = 2+1 = 3
 * 
 *    lis = [1,2,1,3]
 * 
 *   Similarly for i=4th iteration lis[4] will get updated to 4
 * 
 *   lis  = [1,2,1,3,4]
 *   So max longest increasing subsequence length will be the max of lis array which is 4 Thus o/p is 4.
 * 
 *   So for every ith element , we see if it can be a part of any jth LIS seen so far such that j= i-1 -> 0
 *   If yes, find the max length of LIS seen so far and update LIS[i] as max Length of LIS so far + 1. 
 *   
 *   If not for any jth LIS then update LIS[i] = 1.
 * 
 *      
 */

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
    let res = lis[0];
    for (let i = 1; i < lis.length; i++) {
        res = Math.max(res, lis[i]);
    }
    return res;
}


/**Approach2: 0(n logn),0(n)
 * 
 * This approach uses binary search.
 * 
 * Lets make a tail array: tail = [3] initialized with arr[0].
 * 
 * so arr = [3,4,2,8,10]
 * tail = [3]
 * 
 * now lets iterate over the arr using i=1;
 * 
 * Case1: arr[i] > tail's last element 
 *        Simply push arr[i] to tail
 * 
 * Case2: arr[i] <= tail's last element
 *        Find the ceilIndex element's value in tail for this arr[i]th element.
 *        Ceil value is the value which is just greater than the value whose ceil needs to be found.
 *        Push arr[i] to the ceil index. 
 * 
 * 
 * Lets understand this with help of an example:
 * arr = [3,4,2,8,10]
 * tail = [3]
 * 
 * at i=1: arr[1] = 4, 4 > tail[tail.length-1] , 4 > 3 so push 4 to tail i,e [3,4]
 * at i=2: arr[i] = 2, 2 < 4, so now we need to find the ceil index in tail for arr[i] i,e 2, so ceil index is 0 i,e 3 so we say tail[0] = 2 so
 * tail becomes [2,4]
 * 
 * Now i=3: arr[i] = 8, 8 > 4, so push 8 in tail arr, tail = [2,4,8]
 * Now i=4, arr[i] = 10, 10 > 8 ,so push 10 in tail arr, tail = [2,4,8,10] 
 * 
 * Now the length of tail array is the length of longest increasing subsequence and is 4.
 * 
 * In order to find the ceilIndex in arr we use binary search algo.
 * 
 * Lets say our tail is [3,4] and we need to find the ceil index for value 2.
 * 
 * First we find the middle which is Math.floor(start + (end - start) / 2);
 * We will have two pointers one at start i,e i=0 and one at end i,e tail.length-1
 * Now we found the middle so we check wether the mid is greater than equal to or lesser than the element whose ceil index is to be found.
 * 
 * if the middle is greater than on equal to the element this means that we need to find in the first portion of the tail else we need to find in the 
 * later portion of the tail.
 * 
 * So  say tail = [2,4,8,10,12] and x = 1
 * start = 0, end = 4 and mid = Math.floor(start + (end - start) / 2) = 2
 * 
 * 8 > 1 so everything on right of 8 will also be greater than 1 and thus we need to restrict the window in left portion i,e 0->2
 * so start remains same and end becomes mid , now again we find mid
 * 
 * mid = 1, start = 0, end = 2
 * 
 * mid is again greater so we repeat and now start = 0, end = 1 and mid = 0
 * mid is again greater so start =0, end = 0
 * now start and end matches and start !< end thus we come out of loop and the end pointer will always be pointing to index of ceil element.
 * 
 */

function longestIncreasingSubSequence1(arr: number[]) {
    let tail: number[] = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > tail[tail.length - 1]) {
            tail.push(arr[i]);
        } else {
            let index = findCeilIndex(tail, 0, tail.length - 1, arr[i]);
            tail[index] = arr[i];
        }
    }
    return tail.length;
}

function findCeilIndex(tail: number[], start: number, end: number, value: number) {
    while (start < end) {
        let mid = Math.floor(start + (end - start) / 2);
        if (tail[mid] >= value) {
            end = mid;
        } else {
            start = mid + 1;
        }
    }
    return end;
}



longestIncreasingSubSequence([3, 4, 2, 8, 10, 5, 1]);
longestIncreasingSubSequence1([3, 10, 20, 4, 6, 7]);