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
function hasSubArrayOfGivenSum(nums, k) {
    let i = 0;
    while (i < nums.length) {
        let sm = 0, j = i;
        while (j < nums.length) {
            sm += nums[j];
            if (sm === k) {
                return true
            } else {
                j++;
            }
        }
        i++;
    }
    return false;
}

/**Approach2: 0(n),0(1)
 * 
 * Sliding window technique:
 * In the previous file where we were taking out maxSum of a kth length subArray, we knew what would be the size of the window
 * however in this case we dont know the size of the window and there for we will be using the concept in which the size of
 * the window will readjust accordingly.
 * 
 * Now let's say the window starts at i=0 intially and end at j=0 initially so i symbolises start of window and j symbolises
 * end of the window.
 *  lets have a sum initially as the arr[0].
 * If (current sm < sum) then the size of the window should increase as we need to accomodate more elements.
 * If current sm > sum , then we should shrink the size of the window as the current subArray cant accomodate any new 
 * element and by shirinking we mean to readuce the size by increasing the starting index of the window.
 * 
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