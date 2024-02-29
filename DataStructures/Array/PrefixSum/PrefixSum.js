/**given multiple queries which provide the starting and ending index in an given array.
 * The task is to return the sum from [i,j] included for every query being given.
 * 
 * Ex: arr = [2,8,3,9,6,5,4]
 * getSum(0,2);
 * getSum(1,3)
 * getSum(2,6)
 * 
 * o/p is [13, 20, 27]
 */

/**Approach1 : O(n),O(1)
 * 
 * Idea is fairly stratight itearte from i= start till end and calculate sum.
 * The problem here is for every query we need a 0(n),0(1) complexity meaning if there are m queries , in total we
 * are gonna need 0(m*n),0(1) time to complete m queries for a n length arr.
*/
function preFixSum(nums, start, end) {
    let sm = 0;
    while (start <= end) {
        sm += nums[start];
        start++;
    }
    return sm;
}

console.log(preFixSum([2, 8, 3, 9, 6, 5, 4], 0, 2))
console.log(preFixSum([2, 8, 3, 9, 6, 5, 4], 1, 3))
console.log(preFixSum([2, 8, 3, 9, 6, 5, 4], 2, 6))

/**Approach2: 0(1),0(n) 
 * 
 * The idea is let's say we have k number of queries with everyTime a different starting and ending index being passed.
 * If we were able to compute the sum in 0(1) time then for k queries. Then time complexity will be o(k) where k is the number of queries.
 * 
 * The idea is to maintain a preFixSumj array, say ex:
 * 
 * arr = [2, 8, 3, 9, 6, 5, 4];
 * so prefix sum arr is arr[i]+pfSum[pfSum.length-1];
 * 
 * Thus pfSum is [2,10,13,22,28,33,37].
 * 
 * Now if we have to compute for starting index say 0 to some end index like i=0,j=2. 
 * The simply pfSum[j] will be the answer as we have already computed it.
 * 
 * If we need to take for some starting index i=1 till end 3.
 * This will be simply (PfSum till end from 0) - (pfSum from 0 till start).
 * 
 * So (PfSum till end from 0) is simply pfSum[end]
 * and (pfSum from 0 till start) is pfSum[start-1].
 * 
 * In this way the precomputation helps us in achieving this solution in 0(1) for every query being asked.
 * 
 * 
*/
function preFixSum1(nums, start, end) {
    let pfSum = [nums[0]];
    let i = 1;
    while (i < nums.length) {
        pfSum.push(pfSum[pfSum.length - 1] + nums[i]);
        i++;
    }
    if (start === 0) {
        return pfSum[end];
    } else {
        return pfSum[end] - pfSum[start - 1];
    }
}

