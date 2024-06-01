/**Given an array resembling the prices of stock on any ith day, the problem is to find the span at every
 * ith day.
 * 
 * Stock span is defined as the number of consequtives values on the left of the ith day including the ith day
 * which has values lesser or equal to the ith day price.
 * 
 * For ex: stock = [13,15,12,14,16,8,6,4,10,3]
 * o/p :           [1,2,1,2,5,1,1,1,4,1]
 * 
 * 
 * so if we look at 
 * i=0: 13 there is nothing left to it so including it number of elements smaller or equal to 13 is 1 which is 13 itself.
 * i=1: 15 2 (there is 15 and 13 on its left including 15 which has value lesser that 15).
 * i=2: 1 (there is nothing left to it which is smaller however including 12 we get 1).
 * and so on
 * 
 * 
 * Ex:  stock = [30,20,25,28,27,29]
 *  o/p          [1,1,2,3,1,5]
 */


/**Approach1: 0(n^2),0(1)
 * 
 * This is a brute force solution where for every i starting from 1 we take a j=i-1 and itearte
 * till we find the closest greater element to that of arr[i].
 * We keep counting and start the count from 1 only as that index is also being included in the count and
 * push this count to res.
 */
function stockSpan(stockPrices: number[]): number[] {
    let span: number[] = [1];
    let i = 1;
    while (i < stockPrices.length) {
        let j = i - 1;
        let cnt = 1;
        while (stockPrices[j] <= stockPrices[i]) {
            cnt++;
            j--;
        }
        span[i] = cnt;
        i++;
    }
    return span;
}


/**Approach2: 0(n),0(n)
 * 
 * The approach is based on the fact that span at any index will be equal to
 * the currentIndex - indexOfTheclosestGreater number from the elemnet.
 * 
 * For ex: [30,20,25,28,27,29]
 * 
 * Lets start with i=1: 20
 * for 20 the closest greater element is 30 which is at index 1 so, span for i=1 will be (1-0) = 1.
 * for 25 the closest greater element is 30 which is at index 0 so span for i=2 will be (2-0) = 2.
 * for 28 the closet greater element is 30 which is at index 0 so span for i=3 will be (3-0) = 3.
 * and so on.
 * 
 * 
 * Now the point is how will be able to calculate the index of closest greater element.
 * Lets use a stack in the stack we store [element,index].
 * 
 * Now the idea is 
 * 1. If we found the top of the stack having greater value as compared to the current indexed element we will simply
 * push (currentIndex - index os top of element) in res and will push arr[i] to stack.
 * 
 * 2.If the top is smaller than we keep poping from the stack until we found a top will have greater value 
 * than the current indexed element.
 * Once we found that simply push (i-index of top of stack) in res and push arr[i] to top of the stack.
 * 
 * There might me a condition that no element is greater to the left of the current indexed element and thus
 * we keep popoing from the stack and stack becomes empty in such case it means this is the largest
 * element in the arr and thus is span is i+1 as there will be in total i elements to the left of it which are
 * smaller and including itself it will be i+1.
 */
function stockSpan1(stockPrices: number[]): number[] {
    let stack = [[stockPrices[0], 0]];
    let res: number[] = [1];
    for (let i = 1; i < stockPrices.length; i++) {
        if (stack[stack.length - 1][0] > stockPrices[i]) {
            let span = i - stack[stack.length - 1][1]
            res.push(span);
            stack.push([stockPrices[i], i]);
        } else {
            let cnt = 0;
            while (stack[stack.length - 1][0] < stockPrices[i] && stack.length != 0) {
                stack.pop();
                if (stack.length === 0) {
                    res.push(i + 1);
                    cnt++;
                    break;
                }
            }
            if (cnt === 0) {
                res.push(i - stack[stack.length - 1][1]);
            }
            stack.push([stockPrices[i], i]);
        }
    }
    return res;
}