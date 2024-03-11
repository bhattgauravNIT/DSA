/**Given an array arr and a sum k, find the length of the longest subArray whose sum is equal to k.
 * 
 * If there doesnot exist a subArray whose sum is equal to k then return 0.
 * 
 * Ex: arr = [5,8,-4,-4,9,-2,2] k=0
 * 
 * O/p is 3, there are two subArray whose sum is 0 that is [8,-4,-4] & [-2,2] longer of them being of length 3.
 * 
 * Ex: arr = [3,1,0,1,8,2,3] k=5
 * 
 * o/p is 4, there are two subArray whose sum is 5 that is [3,1,0,1] & [2,3] longer of them being of length 4.
 */

/**Approach1: 0(n^2),0(1) 
 * Simple brute force approach to find all possible sums of the subArrays and see for if we get the sum as k,
 * Keep track of the length of subArray obtained till now and once sum===k , take the max of the length of subArray and res.
 * 
 * ex: arr = [10,20,30]
 * 
 * So all possible subArray i,e 
 * [10],[10,20],[10,20,30],[20],[20,30],[30] will have sums respective as
 * 
 * 10,30,60,20,50,60
 * 
 * * Its based on the fact that the sum for subArray [10,20] will be nothing but the sum of previous subArray [10] + some 
 * j element and so on...
 * 
 *  So if i have a pointer i= 0 till end of array and j starting from i till ending of j.
 *   sm+= nums[j] then we will be able to get all the possible sums of all the possible subArrays for the given array.
 * 
 *  Thus we simply consider sum of all the possible subArrays starting from index i.
*/
function longestSubArraySumk(arr, k) {
    let i = 0, sm = 0, res = 0;
    while (i < arr.length) {
        let j = i;
        let len = 0;
        while (j < arr.length) {
            sm += arr[j];
            len++;
            if (sm === k) {
                res = Math.max(len, res);
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
 * In order to understand this approach lets bifurcate in two parts: First finding if a subArray has sum k, secondly finding the length of that subArray.
 * 
 *  Lets consider a array
 * 
 * let arr = a1,a2,a3,a4,a5,a6,a7,ai,.....aj......an
 * 
 * Lets suppose from a1 till aj we have some prefixSum as PfSum, now from a1 till ai we have some prefix sum, lets call it pfSum1.
 * 
 * Now clearly we can see that 
 * 
 * pfSum(sum from a1->aj) = pfSum1(sum from a1->ai) + (Sum from ai->aj)
 * 
 * Consider sum from ai->aj as the subset whose sum is k.
 * 
 * So we can say 
 * pfSum (sum from a1->aj) = pfSum1(sum from a1->ai) + k
 * 
 * Now 
 * pfSum (sum from a1->ai) = (sum from a1->aj) - k
 * 
 * So by above mathematical statment we can conclude that if pfSum (sum from a1->ai) = pfSum1(sum from a1->aj) - k  
 * means if we find any ith index pfSum which is already equivalent to pfSum at that index - k then the above mathematical condition is satisfied 
 * and thus if the above mathematical conditionis satifsfied then we are sure that there exists a subArray (Sum from ai->ai) whose sum value is k.
 * 
 * arr = [5,8,6,13,3,-1] and k = 22 So pf sum at any index i will look like
 *        5,13,19,32,35,34
 * 
 * 
 * Now initially lets have a set which is empty so our task is to find a value in a set which is equal to pfSumi-k.
 * Initially set is 0, so insert pfSum which is 5 at index 0 to set.
 * 
 * Now for index 1: pfSumi-k = 13-22 = -9 which is not present in set, so put 13 in set
 * Now for index2: pfSumi-k = 19-22 = -3 which is not present in set, so put 19 in set.
 * Now for index3: pfSumi-k = 32-22 = 10 which is not present in set, so put 32 in set.
 * Now for index4: pfSumi-k = 35-22 = 13 which is present in set so return true.
 * 
 * Now a condition sm===k is for cases like [3,2,5,6], k = 10
 * 
 * For index 1: pf sumi-k = 3-10 = -7 not present in set, put 3 in set.
 * For index2: pfSumi-k = 5-10 = -5 not present in set, so put 5
 * For index3: pfSumi-k = 10-10 = 0 not present in set so put 10
 * For index5: 16-10 = 6 not present in set so put 16 in set.
 * 
 * We nevere found pfSumi-k in set but if we look at index 3 the pfSumi = 10 which we need indicating the index from 0->3 subArray has sum k and thus
 * pfSumi===k also is a condition for success.
 * 
 * So by above logic we can be sure that whether a subArray has sum k or not, now the problem is to find the length.
 * 
 * Ex: arr = [3,1,0,1,8,2,3,1,1,1,1,1] k=5.
 * 
 * Now lets do a dry run of what we are trying to achieve and formulate a algo later.
 * 
 * Lets have a map
 * Now for index 0: pfSum = 3, pfSum-k = 3-5 = -2 is not in map. Lets put pfSum = 3 in map found at index 0 mp-> {3,0}.
 * Now for index1: pfSum = 4, pfSum-k = -1 is not present in map, Lets insert mp-> {{3,0},{4,1}}
 * index 2: pfSum = 0, pfSum-k = -5 not in mao , lets insert mp-> {{3,0},{4,1}, {0,2}}
 * 
 * index3: pfSum = 5, pfSum-k = 0 not in map. here the pfSum ===k thus now this is a potential subArray of sum K and the length of this subArray is simply
 * currentIndex+1. Why we are saying that the length of such subArrays which are obtained from pfSum===k is currentIndex+1, beacuse these cases arise for those
 * subArrays whose starting index is 0 and sum is k, thus the length will simply be currentIndex+1.
 * i,e 4. So lets take a max(res,i+1), where res is initially 0.
 * 
 * Put it in map: {{3,0},{4,1}, {0,2},{5,3}}
 * 
 * index4: pfSum=13, pfSum-k = 8, not in map, so set in map-> {{3,0},{4,1}, {0,2},{5,3},{13,4}}
 * index5: pfSum = 15, pfSum-k = 10 not in map. so set pfSum in map-> {{3,0},{4,1}, {0,2},{5,3},{13,4},{15,5}}
 * 
 * index6: pfSum= 18, pfSum-k = 13. Now 13 is present in map initially found at index 4.
 * 
 * Lets see what it means 
 * 
 * pfSum till now looks like: 3,4,0,5,13,15,18
 * 
 * at index 6 , pfSum = 18 and we found pfSum-k = 18-5 = 13 already present in map ensuring there exists a subArray 
 * between index 4(index of sm-k in map) and the current index. Now lets look at the arr = [3,1,0,1,8,2,3,1,1,1,1,1]
 * index 4 is 8 and current index 6 is 3 clearly there exists a subArray between index 4+1, 6 or in other words there exist a subArray with sum k from index
 * 
 * mp.get(sm-k)+1 -> currentIndex and the length will simply be currentIndex - mp.get(sm-k);
 * 
 * So lets take max(res,lengthOfSubArray obtained) ~= max(res, currentIndex - mp.get(sm-k));
 * 
 * Set in map this pfSum, map->  {{3,0},{4,1}, {0,2},{5,3},{13,4},{15,5},{18,6}}
 * 
 * index 7 and so on.........
 * 
 * in this same way we can get the max length from all the subArrays whose sum is equal to k.
 * 
 * Now if mp is already containing prefix sum that we dont update the
 * already existing previous index value of pf with currentIndex as 
 * it may gives a greater length subArray as there might be a possibility of finding a zero sum subArray in between and
 *  a zero sum subArray it will contribute to the longer sumSubArray if found having sum k thus
 * simply dont override the index of the pfSum already found in map and let it be the first index found only.
 * 
 * Ex: [8,3,1,5,-6,6,2,2], k=4
 * 
 * Here 
 * 8->0 (pf-k = 4 NP)
   11->1 (pf-k = 7NP)
   12->2 (pf-k = 8P at index 0) 
   clearly if we see index obtainedIndex + 1->currentIndex ~= 0+1 -> 2 i,e 1->2 indexed subArray is giving sum k.

   Now 
   17->3 (pf-k = 13 NP)
   11->4 (pf-k = 7P) clearly 7 is present at index 1, so we compute the length of subArray however we dont update
   the index of previous existense of pf in map.
 */
function longestSubArraySumk1(arr, k) {
    let mp = new Map(), sm = 0, res = 0
    for (let i = 0; i < arr.length; i++) {
        sm += arr[i];
        if (sm === k) {
            res = Math.max(res, i + 1);
        }
        if (mp.has(sm - k)) {
            let start = mp.get(sm - k);
            res = Math.max(res, i - start);
        }
        if (!mp.has(sm)) {
            mp.set(sm, i);
        }
    }
    return res;
}
