/**Given a array arr and a value k, return true if there exists a subArray of sum k else false.
 * 
 * Ex: arr = [5,8,6,13,3,-1]
 * k = 22
 * o/p is true the subArray is [6,13,3].
 */

/**Approach1: 0(n^2),0(1) 
 * 
 * This approach is simple brute force, 
 * 
 * ex: arr = [10,20,30]
 * 
 * So all possible subArray i,e 
 * [10],[10,20],[10,20,30],[20],[20,30],[30] will have sums respective as
 * 
 * 10,30,60,20,50,60
 * 
 * Its based on the fact that the sum fro subArray [10,20] will be nothing but the sum of previous subArray [10] + some 
 * j element and so on...
 * 
 *  So if i have a pointer i= 0 till end of array and j starting from i till ending of j.
 *   sm+= nums[j] then we will be able to get all the possible sums of all the possible subArrays for the given array.
 * 
 *  Thus we simply consider sum of all the possible subArrays starting from index i.
*/
function kSumSubArray(arr, k) {
    let i = 0;
    let j = 0;
    let sm = 0;
    while (i < arr.length) {
        j = i;
        sm = arr[j];
        while (j < arr.length) {
            if (sm === k) {
                return true
            } else {
                j++;
            }
            sm += arr[j];
        }
        i++;
    }
    return false;
}

/**Approach2: 0(n),0(n)
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
 * Note pfSum === k gerenrally arise for the case when we are getting a subArray of sum k that has a starting index 0.
 * 
 */
function kSumSubArray1(arr, k) {
    let s = new Set();
    let sm = 0;
    for (let i = 0; i < arr.length; i++) {
        sm += arr[i];
        if (s.has(sm - k) || sm === k) {
            return true;
        } else {
            s.add(sm);
        }
    }
    return false;
}

/**Approach3: 0(n),0(1)
 * 
 * Sliding window technique:
 * Now let's say the window starts at i=0 intially and end at j=0 initially so i symbolises start of window and j symbolises
 * end of the window.
 *  lets have a sum initially as the arr[0].
 * If (current sm < sum) then the size of the window should increase as we need to accomodate more elements.
 * If current sm > sum , then we should shrink the size of the window as the current subArray cant accomodate any new 
 * element and by shirinking we mean to reduce the size by increasing the starting index of the window.
 * 
 * If current sm === sum then its true.
 */
function zeroSumSubArray3(nums) {
    let i = 0;
    let j = 0;
    let sm = nums[0];
    while (j < nums.length) {
        if (sm < 0) {
            j++;
            sm += nums[j];
        } else if (sm > 0) {
            sm -= nums[i];
            i++;
        } else {
            return true;
        }
    }
    return false;
}
