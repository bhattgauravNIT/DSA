/**Given an array say arr=[2,3,5,4,6,1], computed the weighted sum for given query with starting and an
 * ending index.
 * 
 * Ex: query is getWeightedSum(arr,0,2)
 * 
 * O/p is (2*1) + (3*2) + (5*3) = 2+6+15 = 23.
 */

/**Approach: 0(k),0(n) where k is the number of query and compution will be in 0(1)
 * so every query will take 0(1) time thus overall it will take 0(k) time and we need to mainTain a 
 * preFixWeight arr of size arr.
 */

function getWeightedSum(nums, start, end) {
    let pfWeighted = [nums[0] * 1];
    let pfSum = [nums[0]];
    let i = 1, j = 2;
    while (i < nums.length) {
        pfWeighted.push((nums[i] * j) + (pfWeighted[pfWeighted.length - 1]));
        pfSum.push(nums[i] + pfSum[pfSum.length - 1]);
        i++;
        j++;
    }
    if (start === 0) {
        return pfWeighted[end];
    } else {
        return pfWeighted[end] - pfSum[end];
    }
}