/**Given an array arr such that 0 <= a[i] <= 2^31 and a value sum.
 * 
 * Return a boolean value true or false indicating wether there exists a subArray such that the sum of the elements
 * of the sub Array is equal to the given sum.
 * 
 * Ex: arr = [1,4,20,3,10,1]
 * Sum = 33
 * O/p is true
 * The subArray 20+3+10 is equal to 33.
 */

/**Approach1: O(n^2),O(1) 
 * 
 * Ex: arr = [1,4,20,3,10,1], sum = 33
 * For every i(starting from 0) check for every j=i+1 till N.
 * If(the sm till now is greater than sum), then break the existing subArray and start from next starting index.
 * If(sm till now is less than keep incrementing j as we can still find a subArray with given sum).
 * If(sm === Sum) return true.
 * 
 * Now for case like [1] sum = 3
 * if the current sm is equal to the sum then its fine else its a false.
*/
function hasSubArrayOfGivenSum(nums, k) {
    let i = 0, j = 1, sm = Number.MIN_SAFE_INTEGER;
    while (i < nums.length) {
        sm = nums[i];
        while (j < nums.length) {
            if (sm < k) {
                sm += nums[j];
                j++;
            } else if (sm > k) {
                break;
            } else {
                return true;
            }
        }
        i++;
        j = i + 1;
    }
    return sm === k;
}

/**Approach2: 0(n),0(1)
 * 
 * Sliding window technique:
 * In the previous file where we were taking out maxSum of a kth length subArray, we knew what would be the size of the window
 * however in this case we dont know the size of the window and there for we will be using the concept in which the size of
 * the window will readjust accordingly.
 * 
 * Now let's say the window starts at i=0 intially and end at j=0 initially
 * If (current sm < sum) then the size of the window should increase as we need to accomodate more elements.
 * If current sm > sum , then we should shrink the size of the window as the current subArray cant accomodate any new 
 * element.
 * If current sm === sum then its true.
 */

function hasSubArrayOfGivenSum(nums, k) {
    let i = 0;
    let j = 0;
    let sm = nums[0];
    while (j < nums.length) {
        if (sm < k) {
            j++;
            sm += nums[j];
        } else if (sm > k) {
            sm -= nums[i];
            i++;
        } else {
            return true;
        }
    }
    return false;
}