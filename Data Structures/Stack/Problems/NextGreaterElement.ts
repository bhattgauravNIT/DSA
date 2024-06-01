/**Given a number array the task is to find the closest greater element to that particular 
 * indexed element on right of it.
 * 
 * Ex: arr = [5,15,10,8,6,12,9,18];
 * o/p is  [15,18,12,12,12,18,18,-1].
 */

/**Approach1: 0(n^2),0(1) */
function nextGreaterElement(arr: number[]): number[] {
    let res: number[] = [];
    let i = 0;
    while (i < arr.length - 1) {
        let j = i + 1;
        while (arr[j] <= arr[i]) {
            j++;
        }
        res.push(arr[j]);
        i++;
    }
    res.push(-1);
    return res;
}

/**Approach2: 0(n),0(n)
 * 
 * The idea is similar to previous greater element in that problem we used to find the first greater element
 * at the top of the stack.
 * 
 * In this case we will do the same however we will start from second last element of the array.
 * The last element will never have anything greater than it on the right thus for the last indexed element the res value
 * should be -1.
 * 
 * Lets take ex: [5,15,10,8,6,12,9,18];
 * 
 * For i=7: -1 (as there is nothing on right to it which is greater).
 * for i=6: 9  (18 is the closest greater element to it.)
 * 
 * So lets put 18 in a stack and corresponding to it lets mark the res as -1.
 * Now:
 * 1. If top of the stack is greater than the currentIndex which is 6 in our case, then we simply
 * unshift top of the stack to the res and push arr[i] to stack.
 * 
 * 2. If top of the stack is smaller than the current element that simply keep poping from
 * the stack till be find a top which is greater than the current arr[i].
 * Again simply unshift this top of stack to res and push arr[i] to top of the stack.
 * 
 * In between if the stack becomes empty this means that there is no prev greater element to arr[i]
 * on right and thus -1 should be unshifted in the res and this arr[i] should be pushed to stack.
 */

function nextGreaterElement1(arr: number[]): number[] {
    let res: number[] = [];
    let stack: number[] = [arr[arr.length - 1]];
    for (let i = arr.length - 2; i >= 0; i--) {
        if (stack[stack.length - 1] >= arr[i]) {
            res.unshift(stack[stack.length - 1]);
            stack.push(arr[i]);
        } else {
            let cnt = 0;
            while (stack[stack.length - 1] < arr[i]) {
                stack.pop();
                if (stack.length === 0) {
                    cnt++;
                    res.unshift(-1);
                    break;
                }
            }
            if (cnt === 0) {
                res.unshift(stack[stack.length - 1]);
            }
            stack.push(arr[i]);
        }
    }
    res.push(-1);
    return res;
}