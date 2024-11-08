/**Given a array of pair such that every pairs first element is smaller than the last element i,e a(i) < b(i) 
 * 
 * or we can say that a(i) is the start time and b(i) is the end time in any pair.
 * 
 * The task is to make a chain of pairs such that if we make a pair
 * 
 * (a,b)-> (c,d) in a chain then b < c
 * 
 * Find the length of longest such chain of pairs.
 * 
 * Or we can resay this problem as say there is a meeting room in which start and end time of any ith meeting is given,
 * what can be the max meetings which the meeting room can held.
 * 
 * Or we can resay that there is a machine which can perform a task and every ith pair represents the start and end time of the task.
 * What are the max number of task which the machine can perform.
 * 
 * The logic will remain same i,e for any task or any meeting (a,b) -> (c,d) the task or meeting which can be done should have b<c.
 * 
 * For ex: [(5,24),(39,60),(15,28),(27,40),(50,90)]
 *         o/p: 3 i,e {5,24},{27,40},{50,90}
 * 
 * For ex: [{6,8},{3,4}]
 *         o/p: 2 i,e {3,4} {6,8}
*/

/**Approach1: 0(n^2),0(n) 
 * 
 *Maintain an LIS array with lis[0] as 1 because arr[0] will have length of LIS as 1 including it.
  
  1. Sort all pairs based upon the first element or based on starting time of activity.

  Start iteration from i=1.
           
  2.  Find the longest Increasing subSequence for the pairs based on if(pair[j][1]< pair[i][0]) then it can be in lis else not
      i,e start a j from i-1 -> 0
      If end time of jth activity is lesser than the start time of current ith activity then ith activity can be a part of LIS for jth activity.
      Find max lis j for such activities else we simply mark lis[i] as 1.
  
 */

function nMeetingsInARoom(arr: number[][]) {
    arr.sort((a, b) => a[0] - b[0]);
    let lis: number[] = [1];
    for (let i = 1; i < arr.length; i++) {
        let max = -1;
        for (let j = i - 1; j >= 0; j--) {
            if (arr[j][1] < arr[i][0]) {
                max = Math.max(max, lis[j]);
            }
        }
        if (max === -1) {
            lis[i] = 1;
        } else {
            lis[i] = max + 1;
        }
    }
    let res = -1;
    for (let i = 0; i < lis.length; i++) {
        if (lis[i] > res) {
            res = lis[i];
        }
    }
    return res;
}


/**Approach2: 0(n*logn),0(1)
 * 
 * Choose a greedy way and first sort all the item in ascending order of end time. Pick the first activity and see if the next activity can be
   picked or not based on the starting time of activity to be selected or not and end time of current activity. If starting time of activity to be picked
   is smaller than end time of current selected activity discard it else pick it. Now make the recently picked activity as current selected activity and proceed
   further.
 */

function nMeetingsInARoom1(arr: number[][]): number {
    arr.sort((a, b) => a[1] - b[1]);
    let res = 1;
    let current = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[current][1] <= arr[i][0]) {
            res++;
            current = i;
        }
    }
    return res;
}

console.log(nMeetingsInARoom([[5,24],[39,60],[15,28],[27,40],[50,90]]))