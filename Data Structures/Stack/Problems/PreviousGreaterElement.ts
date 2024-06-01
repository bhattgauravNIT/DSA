/**
 * Given an array of numbers the problem statment is to find the first greater element/closest
 * element on the left of every ith indexed element in an array.
 * 
 * Ex: [15,10,18,12,5,6,2,8]
 * o/p -1,15,-1,18,12,12,6,12
 * 
 * So for 
 * i=0: 15 -> There is no greater element on the left thus -1.
 * i=1: 10 -> The closes greater element on the left is 15
 * i=2: 18 -> There is no closest greater element on the left and thus -1
 * i=3: 12 -> 18 is the greater closest left element to it.
 * i=4: 5  -> 12 is the greater closest left element to it.
 * i=5: 6 ->  12 is the greater closest left element to it.
 * i=6: 2 ->  6 is the greater closest left element to it
 * i=7: 8 ->  12 is the greater closest element to it.
 *  
 * */

/**Approach1: 0(n^2),0(1) */
function previousGreaterElement(arr: number[]): number[] {
    let res: number[] = [-1];
    let i = 1;
    while (i < arr.length) {
        let j = i - 1;
        let cnt = 0;
        while (j >= 0) {
            if (arr[j] > arr[i]) {
                res.push(arr[j]);
                cnt++;
                break;
            }
            j--;
        }
        if (cnt === 0) {
            res.push(-1);
        }
        i++;
    }
    return res;
}

console.log(previousGreaterElement([12, 10, 8]));

/**
 * Approach: 0(n),0(n).
 * 
 * The idea is to use a stack. Lets take an example
 * 
 * Ex: 15,10,18,12,5,6,2,8
 * 
 * Initially lets have a res[] and a stack[], res[] will be -1 for the first indexed element of arr
 * 
 * res= [-1];
 * 
 * Stack[] initially will be storing the fisrt indexed element of arr i,e arr[0].
 * 
 * stack = [15].
 * 
 * Now we start the iteration from i=1.
 * 
 * 1) If top of the stack element is greater than the arr[i], then we insert top of the stack in the res and
 *    push arr[i] to the stack.                                  
 * 
 * 2) If top of the stack element is smaller than the arr[i] then we keep poping from the stack till
 * we found a top element which is greater than arr[i]. Once we found the element we do the same
 * ie, insert top of the stack in the res and push arr[i] to the stack.
 * 
 * There may be a case while poping we dont find any top of stack element greater than the stack and the 
 * stack becomes empty in this case we will push -1 to the res and will push arr[i] to the stack.
 * 
 * The resultatnt res will be the answer.
 * 
 */

function previousGreaterElement1(arr: number[]): number[] {
    let res: number[] = [-1];
    let stack: number[] = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        if (stack[stack.length - 1] > arr[i]) {
            res.push(stack[stack.length - 1]);
            stack.push(arr[i]);
        } else {
            while (stack[stack.length - 1] < arr[i]) {
                stack.pop();
                if (stack.length === 0) {
                    res.push(-1);
                    stack.push(arr[i]);
                    break;
                }
                if (stack[stack.length - 1] > arr[i]) {
                    res.push(stack[stack.length - 1]);
                    stack.push(arr[i]);
                    break;
                }
            }
        }
    }
    return res;
}