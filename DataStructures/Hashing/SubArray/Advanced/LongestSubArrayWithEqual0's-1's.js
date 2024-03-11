/**Given a binary array arr, i,e containing only 0's & 1's. The task is to find the length of the longest
 * subArray of arr which contains equal number of 0's and 1's.
 * 
 * For ex: arr = [1,0,1,1,1,0,0]
 * 
 * So subArray from index 1 till 6, of length 6 is the o/p.
 * 
 * ex: arr = [1,1,1,1] o/p is 0.
 * ex: arr = [0,0,1,1,1,1,1,0] o/p is 4.
 * ex: arr = [0,0,1,0,1,1] o/p is 6.
 */

/**Approach1: 0(n^2),0(1)
 * 
 * The approach is simple, we need to consider all sum of the subArrays.
 * ex: arr = [10,20,30]
 * 
 * So all subArrays are [10],[10,20],[10,20,30],[20],[20,30],[30]
 * 
 * So if we look at sum of subArrays then first will be index 0->0, 0->1, 0->3 then 1->1, 1->2,1->3 and 3->3
 * 
 * Lets have a sm varibale.
 * 
 * So we will have two loops i & j starting from i=0 and j=i respectively.
 * Now if arr[j] === 1 then do a sm++, if arr[j]===0 do a sm--. 
 * 
 * The subArray will contain equal number of 0's & 1's if this sm beacomes zero. At this point of time take 
 * res = Max(res, lengthOfSubArray where sm is found to be 0).
 * 
 * Now length of subArray where sm is found to be 0 will simply be j-i+1.
 * 
 * Ex: [1,0,1,1,1,0,0]
 * 
 * i=0,j=0, sm++ = 1
 * i=0,j=1, sm-- = 0
 * 
 * Now sm becomes zero thus this is a subArray with zero sum and thus length is j-i+1 = 2, res=2.
 * ..... and so on....
 */
function longestSubArrayEqualOAnd1(arr) {
    let i = 0;
    let sm = 0, res = 0;
    while (i < arr.length) {
        let j = i;
        while (j < arr.length) {
            if (arr[j] === 1) {
                sm++;
            } else {
                sm--;
            }
            if (sm === 0) {
                res = Math.max(res, j - i + 1);
            }
            j++;
        }
        i++;
        sm = 0;
    }
    return res;
}

/**Approach2: 0(n),0(n) 
 * 
 * In order to undertand this algo lets take an example
 * arr = [1,0,1,1,1,0,0] , the longest subArray with equal number of zeroes and 1 if from index i=1 till i=6.
 * 
 * Now if we make all 0 elements to -1 then the arr will becomes arr = [1,-1,1,1,1,-1,-1]
 * 
 * now this problem is simply a problem of finding the length of the longest subArray whose sum is 0, because 0's are replaced
 * with -1 so equal number of zeros and 1 in original subArray will now have sum 0 as 0's are -1 now.
 * 
 * Now in order to find subArray with zero sum.
 * 
 * lets say we have arr = a1,a2,a3,a4.........ai,a6,a7,aj.......an
 * 
 * Say we have pfSum(a1->aj) as pfSum
 * we have pfSum(a1->ai) as pfSum1
 * So 
 * 
 * pfSum(a1->aj) = pfSum(a1->ai) +  pfSum(ai->aj);
 * pfSum(a1->aj) = pfSum(a1->ai) +  a6+a7+aj
 * 
 * Lets say this subArray a6+a6+aj is our required subArray of zero sum.
 * pfSum(a1->aj) = pfSum(a1->ai) +  0
 * 
 * So for this mathematical statement to be true there must exist a pfSum at index i which is getting repeated.
 * 
 * So lets keep a track of the index of pfSum and pfSum in a map.
 * Ex: arr = [1,0,1,1,1,0,0]
 * Modified arr = [1,-1,1,1,1,-1,-1]
 * 
 * at index 0-> pfSum=1 (pf not in mp)-> (1,0).
 * at index 1 -> pfSum = 0 (pf not in mp) -> {(1,0),(0,1)}
 * 
 * Now pfSum is 0 this means there must exists a subArray with zero sum/there must exist a subArray with equal 0's and 1
 * starting index 0 generally when pf sum = 0, so res=Max(res, i+1).)(this is a special case when pfSum ===0)
 * 
 * Now at index 2-> pfSum = 1 , 1 is seen at index 0 , pfSum gets repeated and thus 
 * length of subArray is (currentIndex-previousIndex found from map).
 * 
 * res= Max(res, length) ~= Max(res, (currentIndex-previousIndex found from map));
 * 
 * and so onnnn........
 * 
*/
function longestSubArrayEqualOAnd1(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) {
            arr[i] = -1;
        }
    }
    let mp = new Map();
    let res = 0;
    let i = 0;
    let pfSm = 0
    while (i < arr.length) {
        pfSm += arr[i];
        if (pfSm === 0) {
            res = Math.max(res, i + 1);
        }
        if (!mp.has(pfSm)) {
            mp.set(pfSm, i)
        } else {
            res = Math.max(res, i - mp.get(pfSm));
        }
        i++;
    }
    return res;
}