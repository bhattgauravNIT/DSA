/**Given a array arr whose every arr[i] resembles height of a rectangle.
 * Find the height of the largest rectangular area which is possible.
 * Assume every bar have same width as 1 unit.
 * 
 * ex: arr = [6,2,5,4,1,5,6];
 * 
 * So if we see it visually we get 
 *                     
 *                    |           |
 *                    |   |     | |
 *                    |   | |   | |
 *                    |   | |   | |
 *                    | | | |   | |
 *                    |_|_|_|_|_|_|
 *                    6 2 5 4 1 5 6
 * 
 * Max area is : 5*2 = 10 units.
 * 
 * So if we start from index i=0 lets see areas every ith index can make.
 * 
 * So i=0: 6 (all areas are 6*1 = 6 only)
 * i=1: 2 (all areas are 2*2 = 4 on left, 2*3 = 8 on right till 4)
 * i=2: 5 (all areas are 5*1 = 5 only)
 * i=3: 4 (all areas )
 * 
 */

/**Approcah1: 0(n^2),0(1) 
 * 
 * Lets take an ex: heights = [6,2,5,4,1,5,6]
 * 
 * Now for everyIndex the height[i] which are larger than the currentIndex value on the left in continuation
 * will contribute to the area building for that index , 
 * 
 * similarly for everyIndex the height[i] which are larger than the currentIndex value on the right in continuation
 * will contribute to area building for that index.
 * 
 * Every height[i] will itself contibute to the area building .
 * 
 * For everyIndex traverse to left and find the number of continuious values which are larger than the current index
 * value, the lefthaight will be sum of the currentIndex value that number of times.
 * 
 * For everyIndex travesre to right and find the number of continuious values which are larger than the current index
 * value, the rightArea will be sum of the currentIndex value that number of times.
 * 
 * In last that element value will also contribute in area building for that index value.
 * So res = leftArea + righTArea + heights[i];
 * 
 * In end find the max value of this for every index, that will be the answer.
 * 
 * 
 */
function maxLargestAreaHistogram(heights: number[]): number {
    let max = 0;
    for (let i = 0; i < heights.length; i++) {
        let res = 0;
        let leftArea = 0;
        let rightArea = 0;
        //go to left of everyIndex
        let j = i - 1;
        while (heights[j] >= heights[i] && j >= 0) {
            leftArea += heights[i];
            j--;
        }
        //go to right of everyIndex
        let k = i + 1;
        while (heights[k] >= heights[i] && k < heights.length) {
            rightArea += heights[i];
            k++;
        }
        res = leftArea + rightArea + heights[i];
        max = Math.max(res, max);
    }
    return max;
}

/**Approach2: 0(n),0(n) 
 * 
 * So in the previous approach we were traversing to the left of any ith index till we were finding the
 * contigious larger elements than arr[i], meaning we were traversing to find the first smaller element 
 * to the left of ith index or we can say we were trying to find the previous smaller element of ith index.
 * 
 * Similarly in previous approach we were travesring to right of any index i till we were finding
 * the contigious larger elements than arr[i], meaning meaning we were traversing to find the first smaller element 
 * to the right of ith index or we can say we were trying to find the next smaller element of ith index.
 * 
 * So if we can preprocess the previousSmaller element for every index and nextSmaller index for every index.
 * Then we can simply find the number of histograms which needs to be included in area calcuation on the left using
 * the previousSmaller info and we Then we can simply find the number of histograms which needs to be included in area 
 * calcuation on the rightg using the nextSmaller info for any ith index.
 * 
 * Now lets try and find the previousSmaller Elemets index to any ith index.
 * 
 * Say ex:  [6,2,5,4,1,5,6]
 * 
 * So for index 0: 6 - Previoussmaller element is at index -1 as it don't exists.
 * index1: 2 - Previoussmaller element is at index -1 as it dont exist.
 * index2: 5 - Previoussmaller element is at index 1 i,e 2.
 * index3: 4- Previous smaller element is at index 1 i,e 2.
 * index4: 1- PreviousSmaller element is at index -1 as it dont exist.
 * index5- 5- Previous smaller element is at index 4 i,e 1.
 * index6- 6 - Previous smaller element is at index 5 i,e 5.
 * 
 * So previousSmaller = [-1,-1,1,1,-1,4,5]
 * 
 * Now we can compute previousSmaller index via stack using 
 * 
 * initially for prevSmaller insert -1 for index 0 as index 0 of heights will always have no previous smaller
 * and insert height[0] to stack , start iteration from i=1.
 * 
 * 1. If top of stack is smaller or equal to the current indexed element then push the index of the top of the 
 * stack element into previousSmaller and push current element of heights array in stack.
 * 
 * 2. If top of the stack is larger than the current indexed element keep poping from the stack till
 * we find a smaller or equal element with height array element .
 *    If in between stack gets empty this means there is no prevSmaller indexed element in heightArray and thus
 *    push -1 index to previousSmaller array and push heights[i] to stack.
 * 
 * In stack way we can obtain all the previous smaller index values corresponding to every i of heights array
 * in 0(n).
 * 
 * Now we need to find the indexes for elements on the right of ith index which is nextsmaller to ith indexed element.
 * So we do the same as above just we start our itearation from second last element of the heights array as lastelement 
 * willnever have anything smaller on its right thus push heights.length to nextSmaller array and push last index value
 * of heights array in stack.
 * 
 * Now we follow the same algo as above 
 * 
 * 1. If top of stack is smaller or equal to the current indexed element then unshift the index of the top of the 
 * stack element into nextSmaller and push current element of heights array in stack.
 * 
 * 2. If top of the stack is larger than the current indexed element keep poping from the stack till
 * we find a smaller or equal element with height array element .
 *    If in between stack gets empty this means there is no nextSmaller indexed element in heightArray and thus
 *    push heights.length index to nextSmaller array and push heights[i] to stack.
 * 
 * Now we have both the previousNext smaller indexed array and nextSmaller indexed array 
 * 
 * for: heights = [6,2,5,4,1,5,6]
 *      prevSmaller = [-1,-1,1,1,-1,4,5]
 *      nextSmaller = [1,4,3,4,7,7,7]
 * 
 * Now we need to calcualte max possible area.
 * In order to understand it lets take an example of height[4] = 1, its prevSmaller is -1 and nextSmaller is 7
 * this means that it can make areas will all histograms from left starting from index 0 till i as prevSmaller is -1.
 * And also it can make areas will all histograms starting from i till end of array as nextSmaller is 7 which is index out of bound.
 * 
 * So total histograms on left with which it can make area is 4 which is
 *      totalLeftHistograms = i-(prevSmaller[i]+1);
 * 
 * Total histograms on right with which it can make area is 2 which is
 *    totalRightHistograms = nextSmaller-1-i;
 * 
 * Now it can also inculde itself while making hostogram so total number of histograms with which it can make area is
 * 
 * totalLeftHistograms + totalRightHistograms + 1(itself).
 * 
 * Now total area = (totalLeftHistograms + totalRightHistograms + 1(itself))*heights[i];
 * 
 * Compute the max of the areas.
 * 
 * 
*/
function maxLargestAreaHistogram1(heights: number[]): number {
    let prevSmaller: number[] = [-1];
    let stack: number[][] = [[heights[0], 0]];
    for (let i = 1; i < heights.length; i++) {
        if (stack[stack.length - 1][0] <= heights[i]) {
            prevSmaller.push(stack[stack.length - 1][1]);
            stack.push([heights[i], i]);
        } else {
            let cnt = 0;
            while (stack[stack.length - 1][0] > heights[i]) {
                stack.pop();
                if (stack.length == 0) {
                    stack.push([heights[i], i]);
                    cnt++;
                    prevSmaller.push(-1);
                    break;
                }
            }
            if (cnt === 0) {
                prevSmaller.push(stack[stack.length - 1][1]);
                stack.push([heights[i], i]);
            }
        }
    }
    let nextSmaller: number[] = [heights.length];
    stack = [[heights[heights.length - 1], heights.length - 1]];
    for (let i = heights.length - 2; i >= 0; i--) {
        if (stack[stack.length - 1][0] <= heights[i]) {
            nextSmaller.unshift(stack[stack.length - 1][1]);
            stack.push([heights[i], i]);
        } else {
            let cnt = 0;
            while (stack[stack.length - 1][0] > heights[i]) {
                stack.pop();
                if (stack.length == 0) {
                    stack.push([heights[i], i]);
                    cnt++;
                    nextSmaller.unshift(heights.length);
                    break;
                }
            }
            if (cnt === 0) {
                nextSmaller.unshift(stack[stack.length - 1][1]);
                stack.push([heights[i], i]);
            }
        }
    }
    let max = 0;
    for (let i = 0; i < heights.length; i++) {
        let leftArea = i - (prevSmaller[i] + 1);
        let rightArea = nextSmaller[i] - 1 - i;
        let res = (leftArea + rightArea + 1) * heights[i];
        max = Math.max(res, max);
    }
    return max;
}
