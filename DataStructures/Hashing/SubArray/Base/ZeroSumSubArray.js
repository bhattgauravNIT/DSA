/**Given an array arr, return true if there exists a subArray whose sum is 0 else return false. 
 * 
 * Ex: arr = [5,6,0,8] 0/p is true
 * 
*/

/**Approach1: 0(n^3),0(1)
 * 
 * The approach is brute force and is based on calculating all the subArray arrangements possible,
 * the computing the sum of each and every subArray if sum is zero retun true else false.
 * 
 * Ex: arr = [5,6,0,8];
 * 
 * All possible subArray are 
 * 
 * 0-0
 * [5]
 * 
 * 0-1
 * [5,6]
 * 
 * 0-2
 * [5,6,0]
 * 
 * 0-3
 * [5,6,0,8]
 * 
 * 1-1
 * [6]
 * 
 * 1-2
 * [6,0]
 * 
 * 1-3
 * [6,0,8]
 * 
 * 2-2
 * [0]
 * 
 * 2-3
 * [0,8]
 * 
 * 3-3
 * [8]
 * 
 * Now we look at the patter of index which is getting formed for compution of all subArray we see that firts its 0-0, then 0-1
 * then 0-2 and then 0-3, 
 * 
 * After 1-1, 1-2 , 1-3
 * after 2-2, 2-3
 * after 3-3
 * 
 * So if we have a index i such that i<arr.length and a index j=i such that j<arr.length then its simply printing
 * all the values from i to j.
 */
function zeroSumSubArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            let k = i, temp = [];
            while (k <= j) {
                temp.push(arr[k]);
                k++
            }
            let l = 0, sm = 0;
            while (l < temp.length) {
                sm += temp[l];
                l++;
            }
            if (sm === 0) return true;
        }
    }
    return false;
}

/**Approach2: 0(n^2),0(1) 
 * 
 * This approach is also simple brute force, 
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
function zeroSumSubArray1(nums) {
    let i = 0;
    while (i < nums.length) {
        let sm = 0, j = i;
        while (j < nums.length) {
            sm += nums[j];
            if (sm === 0) {
                return true
            } else {
                j++;
            }
        }
        i++;
    }
    return false;
}

/**Approach3: 0(n),0(n) 
 * 
 * Lets consider a array
 * 
 * let arr = a1,a2,a3,a4,a5,a6,a7,ai,.....aj......an
 * 
 * Lets suppose from a1 till aj we have some prefixSum as PfSum, now from a1 till ai we have some prefix sum, lets call it pfSum1.
 * 
 * Now clearly we can see that 
 * 
 * pfSum(sum from a1->aj) = pfSum1(sum from a1->ai) + (Sum from ai->aj)
 * 
 * Consider sum from ai->aj as the subset whose sum is 0.
 * 
 * So we can say 
 * pfSum (sum from a1->aj) = pfSum1(sum from a1->ai) + 0
 * 
 * Now 
 * pfSum (sum from a1->aj) = pfSum1(sum from a1->ai)
 * 
 * So by above mathematical statment we can conclude that if pfSum (sum from a1->aj) = pfSum1(sum from a1->ai) 
 * means if we find any ith index pfSum which is repeated then the above mathematical condition is satisfied and thus if the above mathematical condition
 * is satifsfied then we are sure that there exists a subArray (Sum from ai->aj) whose value is 0.
 * 
 * arr = [-3,4,-3,-1,1] So pf sum at any index i will look like
 *       -3,1,-2,-3,-2 
 * 
 * Thus we can see that -3 is the pf sum value at index 3 which was also present at index 0 this implies
 * there must exist a subArray with sum 0 between index 1 to 3 and thats why the prefix sum at index 0 & index 3 is same.
 * 
 * If at any point of time the pf sum is getting repeated in the hashing table then we are sure that there must
 * exist a subArray with sum 0.
 * 
 * Maintain a hash say a set, if pfSum for any index is not already present in hashTable then insert it, else if it
 * exists then simply return true.
 * 
 * the condition sum=== 0 is for cases like [-3,2,1].
 * 
 * Clearly its a subSet with sum 0, however if we look at preFixSum for this
 * 
 *         -3,2,1
 * pfSum = -3,-1,0
 * 
 * Clearly no pfSum at any index is getting repeated however the sum itself is getting zero.
 * 
 */
function zeroSumSubArray2(nums) {
    let s = new Set();
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (s.has(sum) || sum === 0) {
            return true;
        } else {
            s.add(sum);
        }
    }
    return false;
}

/**Approach4: 0(n),0(1)
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
