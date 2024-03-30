/**Given an array arr and a k value, find the max sum of the k length sub array.
 * 
 * Ex: arr = [1,8,30,-5,20,7];
 * k=3.
 * The max kth length subArray sum is 45 i,e if we take a subarray 30,-5,20.
 * 
 */

/**Approach1: 0(n*k),O(1)
 * 
 * Ex: arr = [1,8,30,-5,20,7]
 * k=3
 * 
 * So start from i=0 and take next elements till cnt becomes k.
 * Find the sm and check if this sm is max.
 * 
 * So start with i=0 and take next k-1 elements as i=0 is already 1 element that can be part of the subArray.
 * Check for the max sum if its max update the max.
 * Again i=1 and take next k-1 elemnets and repeat the process.
 */
function kLengthSubArrayMaxSum(nums, k) {
    let i = 0, max = Number.MIN_SAFE_INTEGER;
    while (i < nums.length) {
        let sm = nums[i];
        let cnt = 1;
        let j = i + 1;
        while (cnt < k && j < nums.length) {
            sm += nums[j];
            j++;
            cnt++;
        }
        if (sm > max) {
            max = sm;
        }
        i++;
    }
    return max;

}

/**Approach2: 0(n),0(1)
 * 
 * Sliding window technique:
 * Let's take an example
 * arr = [1,8,30,-5,20,7]
 * k=3
 * 
 * In the previous example we were computing from all j such that j=i+1 till cnt is reached to k.
 * However now
 * 
 * Lets say initially we have a 3 number subSet that is 1,8,30 with i=0 as start
 * Now we stored its sum which is 39.
 * Now for the next elemnet that is -5 if we would take a subArray which starts with 1, i,e 8,30,-5.
 * Its sum will be nothing but (39+(-5)-1).
 * That is from the already obtained sum of prtevious subArray if we reduce the first element of the previous
 * subArray and add the next elemnet which is -5 to that sum. the sum of the next subArray can be obtained.
 * 
 * Similarly for index value 20. 
 * The previous subArray sum obtrained is (33) so to this if we add the value 20 and reduce the fisrt index value
 * of previous subArray we get 33+20-8 = 45.
 * 
 * Again repeat , note that if we take an i=0, than the value of i will go only upto (nums.length - k) to obtain of the k
 * length suBArray which starts with i.
 * 
 * So:
 * 
 * arr = [1,8,30,-5,20,7], k=3
 * 
 * 1st: [1,8,30] , sm=  39
 * 2nd: [8,30,-5], sm = prevSm+(-5)-(1stSubArray[0]) = 39+(-5)-1= 33
 * 3rd: [30,-5,20], sm = prevSm + 20 - (2ndSubArray[0]) = 33+20-8 = 45
 * 4th: [-5,20,7], sm = prevSum + 7 - (3rdSybArray[0]) = 45+7-30 = 22
 * 
 * Clearly max sum is 45.
 */
function kLengthSubArrayMaxSum(nums, k) {
    let i = 0, max = Number.MIN_SAFE_INTEGER, sm = Number.MIN_SAFE_INTEGER, j = i + 1;
    while (i <= (nums.length - k)) {
        if (sm === Number.MIN_SAFE_INTEGER) {
            sm = nums[i]
            let cnt = 1;
            while (cnt < k && j < nums.length) {
                sm += nums[j];
                cnt++;
                j++;
            }
            max = sm;
            i++;
        } else {
            sm = sm + nums[j] - nums[i - 1];
            if (sm > max) {
                max = sm;
            }
            j++;
            i++;
        }
    }
    return max;
}