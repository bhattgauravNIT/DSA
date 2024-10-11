/**Given an array arr, find out whether this arr has an equilibrium point or not.
 * 
 * An arr[i] is said to be an equilibrium point if the sum of the array to the left of it is equal to the sum of
 * the array to the right of it. If yes return true else return false.
 * 
 * Ex: [3,4,8,-9,20,6]
 * O/p is true
 * as 3+4+8+(-9) = 6
 * and last element is also 6 so 20 is the equilibrium point.
 */



/**Approach1: 0(n*n),0(n) 
 * 
 * For ex: arr = [3,4,8,-9,20,6]
 * Now we have a point 20 where the left sum of the array is equal to the right sum of the array.
 * 
 * Let's maintain one leftSumPrefix  arr
 * 
 * leftSumPrefix = [ 3, 7, 15, 6, 26, 32 ]
 * 
 * Similarly maintain a right sum array i,e suffix sum
 * 
 * rSumSuffixSum = [ 32, 29, 25, 17, 26, 6 ]
 * 
 * Now at the index at which the leftSumPrefix array element is equal to the right Sum suffix array element- at same index
 * is the index at which equilibrium point is present in nums array.
 * If there is no such element in leftSumPrefix which is equal to rightSumSuffix element at that same index there is no such
 * equilibrium point present in nums array.
 * 
 * So in above leftSumPrefix[4]===rightSumSuffix[4], so at nums[4] we have a equilibrium point.
 * 
 * The additional n*n time complexity has arise due to the unshift operation which is an 0(n) operation.
*/
function equilibriumPoint(nums) {
    let leftSum = [nums[0]];
    let rSum = [nums[nums.length - 1]];
    let i = 1;
    while (i < nums.length) {
        leftSum.push(nums[i] + leftSum[leftSum.length - 1]);
        i++;
    }
    i = nums.length - 2;
    while (i >= 0) {
        rSum.unshift(nums[i] + rSum[0]);
        i--;
    }
    i = 0; let j = 0, res = -1;
    while (i < leftSum.length && j < rSum.length) {
        if (leftSum[i] === rSum[j]) {
            res = i;
            break
        } else {
            i++;
            j++;
        }
    }
    return res === -1 ? `No equilibrium point` : nums[res];
}

/**Approach2: 0(n),0(1) 
 * 
 * In the above we were storing the preFix sum and suffixSum in two different array and then were checking for the index 
 * where both the index value of prefix sum and suffix sum are same, however if we look at example
 * 
 * arr = [3,4,8,-9,20,6]
 * 
 * preFixSumArr = [ 3, 7, 15, 6, 26, 32 ]
 * suffixSumArr = [ 32, 29, 25, 17, 26, 6 ]
 * 
 * Now the first value of suffix sum will the entire sum of the array and the next index value will be (suffix sum - [i-1])
 * And then for corresponding indexes it will be (suffixSum-= nums[i-1])
 * i,e 32-3 = 29
 * Next value will be 29-4 = 25
 * Next value will be 25-8 = 17
 * Next will be 17-(-9) = 26
 * and so on.
 * 
 * Moreover the preFix sum value at any point is leftSum+= nums[i];
 * 
 * So instead of maintaining two different array we can use two different variable which will do the job and even we are not using unshift operation which is
 * costly and result in n*n time complexity.
*/
function equilibriumPoint(nums) {
    let leftSum = nums[0], rightSum = 0, res = -1;
    let i = 0;
    while (i < nums.length) {
        rightSum += nums[i];
        i++;
    }
    i = 1;
    while (i < nums.length) {
        if (leftSum === rightSum) {
            res = i - 1;
            break;
        } else {
            leftSum += nums[i];
            rightSum -= nums[i - 1];
        }
        i++;
    }
    return res === -1 ? `No equilibrium point` : nums[res];
}