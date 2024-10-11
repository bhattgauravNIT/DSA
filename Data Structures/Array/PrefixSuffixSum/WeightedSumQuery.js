/**
 * Given an array say arr=[2,3,5,4,6,1], computed the weighted sum for given query with starting and an
 * ending index.
 * 
 * Ex: query is getWeightedSum(arr,0,2)
 * 
 * O/p is (2*1) + (3*2) + (5*3) = 2+6+15 = 23.
 */

/**Approach: 0(k),0(n) 
 * 
 * The idea is let's say we have k number of queries with everyTime a different starting and ending index being passed.
 * If we were able to compute the weighted sum in 0(1) time then for k queries. Then time complexity will be o(k) where k is the number of queries.
 * 
 * The idea is to maintain a preFixSum weighted array, say ex:
 * 
 * arr = [2,3,5,4,6,1]
 * so prefix weighted sum arr is (arr[i]*j) + pfWeightedSum[pfWeightedSum.length-1];
 * 
 * Thus pfSum is [2,8,23,39,69,75].
 * 
 * Now if we have to compute for starting index say 0 to some end index like start=0,end=2. 
 * The simply pfWeightedSum[end] will be the answer as we have already computed it.
 * 
 * If we need to take for some starting index i=1 till end 3.
 * This will be simply [pfWeightedSum till end from 0] - [pfWeightedSum from 0 till start).
 * 
 * So (PfSum till end from 0) is simply pfSum[end]
 * and (pfSum from 0 till start) is pfSum[start-1].
 * 
 * In this way the pre computation helps us in achieving this solution in 0(1) for every query being asked.
 * 
 */

function getWeightedSum(nums, start, end) {
    let pfWeighted = [nums[0] * 1];
    let i = 1, j = 2;
    while (i < nums.length) {
        pfWeighted.push((nums[i] * j) + (pfWeighted[pfWeighted.length - 1]));
        i++;
        j++;
    }
    if (start === 0) {
        return pfWeighted[end];
    } else {
        return pfWeighted[end] - pfSum[start-1];
    }
}
