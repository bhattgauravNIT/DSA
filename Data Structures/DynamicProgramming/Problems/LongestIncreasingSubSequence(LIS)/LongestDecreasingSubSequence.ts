/**Given an array, find the length of the longest decreasing subSequence.
 * 
 * I,e {1,11,2,10,4,5,2,1}
 * o/p: 5 i,e {11,10,4,2,1} or {11,10,5,2,1}
 */

/**Approach: 0(n*n),0(n)
 * 
 * The concept is little same as LIS however we will formulate the solution in a little different way.
   Make a LDS array of same length as of arr and mark last element of LDS array as 1, because if we have arr = [3], then
   length of longest decreasing subsequence will be simply 1 only as this element will also be included in lds.

   Start iteration from i=arr.length-2 i,e second last element and for every j i,e from i+1 -> end of array see if 
   arr[j] is lesser than arr[i] , 
   if yes this means that the arr[i] can be a part of arr[j]th LDS now.

   So we find the max length LDS out of all LDS[j] such that arr[j] < arr[j].
  
   If max is -1 only , this means that there exists no arr[j] such that j moves from i+1 -> end of array , 
   in which arr[i] can be a part of LDS so we update LDS[i] as 1 only because ith element itself can form an LDS of length 1.
  
   If max is not -1, this means arr[i] can be a part of LDS so we update LDS[i] as max + 1.
  
   Now the LDS array contains all length of LDS so we take out the max from it and that will be the answer.

 */
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
    let res = -1;
    for (let i = 0; i < lds.length; i++) {
        if (res < lds[i]) {
            res = lds[i];
        }
    }
    return res;
}

/**Approach2: 
 * 
 * Binary search check
 */