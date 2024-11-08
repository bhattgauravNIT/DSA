/**Given an array in which every cell value represents the max jump which you can take from the cell.
 * The task is to find the min number of jumps which is needed to reach from first cell till end.
 * 
 * For ex: arr = [3,4,2,1,2,1]
 * 
 * So from i=0 we can take a max jump of 3 cells i,e till index 3.
 * From i=1 we can take a max jump of 4 cells i,e till index 5.
 * 
 * So clearly in order to reach from start till end in min possible jumps we need to have one jump from
 * i=0->i=1 and then i=1 -> i=5 i,e 2 jumps.
 * 
 * 
 * arr = [4,1,5,3,1,3,2,1,8]
 * Min number of jumps to reach from i=0 till end is:
 * 
 * i=0->i=2
 * i=2->i=5
 * i=5->i=8
 * 
 * so o/p 3
 */



/**Approach: 0(2^n),0(1)
 * 
 * Recursion this approach takes care of all the cases and its a brute force way.
 * Lets understand this if arr size is 1 i,e say arr = [3] then we are already at the end of the array and thus we don't need to make any jump to reach end
 * and thus return 0.
 * 
 * Now we will iterate over all the index of the array at say the array is
 * arr = [3,4,2,1,2,1]
 * 
 * so at i=0 we can make at max jump of 3 so this means that we will reach 0+3=3 rd index or i+ arr[i] th index after making the jump.
 * So if i+ arr[i] >= size-1 i,e the last index then we know that we can make the jump from this index.
 * 
 * So at i=0: 0+3 >= 5 false we cant make a jump
 * at i=1: 1+ 4 >=5 yes we can make a jump.
 * 
 * So when we make a jump we recursively call for arr on i+1 index now.
 * 
 * We take the min of the res coming from the recursive calls.
*/

function minJumps(arr: number[], size: number) {
    if (size === 1) return 0;
    let res = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < size - 1; i++) {
        if (i + arr[i] >= size - 1) {
            let sub_result = minJumps(arr, i + 1);
            if (sub_result !== Number.MAX_SAFE_INTEGER) {
                res = Math.min(res, sub_result + 1);
            }
        }
    }
    return res;
}

/**Approach:
 * 
 * The above recursive solution has overlapping sub problems thus we can use dp to get jump for any ith size.
 * Since there is only one size parameter changing thus we need to make 1-d array.
 * 
 * Dp array will be of size length of array as we need to take care of base case that dp[0] will be 0, as if length of array is 0, then we
 * need not to make any jump and we initialize it with MAX_SAFE_INTEGER.
 * 
 * We start iteration from i=1 till end of array here every i represents problem that we need to solve for i size array.
 * For every ith size we start iteration from j=0 till i and check if
 * arr[j] + j >= i if yes this means that we can make a valid jump for this value of i.
 * 
 * If dp[j] !== Number.MAX_SAFE_INTEGER this means its not been computed earlier than we compute it.
 * dp[i] = min(dp[i], dp[j]+1) , we did +1 as we made one jump .
 * 
 * 
 * return dp[size-1];
 * 
 */

function minJumps1(arr: number[], size: number) {
    let dp = new Array(size).fill(Number.MAX_SAFE_INTEGER);
    dp[0] = 0;
    for (let i = 1; i < size; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] + j >= i) {
                if (dp[j] !== Number.MAX_SAFE_INTEGER) {
                    dp[i] = Math.min(dp[i], dp[j] + 1);
                }
            }
        }
    }
    return dp[size-1];
}