/**Given an array of pairs where every first element of pair represents a starting time for a activity and every second element of the pair represents the
 * ending time of the activity.
 * 
 * So array is an collection of activities.
 * We have a machine which can process only one activity at one time so if two activities are overlapping both of them can't be completed.
 * The task is to find the max number of activities which can be done by the machine.
 * 
 * For ex: activities = [{2,3},{1,4},{5,8},{6,10}]
 * o/p: 2
 * 
 * i=0:{2,3} starts at t=2 and ends at t=3
 * i=1:{1,4} starts at t=1 and ends at t=4 thus i=0 and i=1 are overlapping and only one can be done and should be picked
 * i=2:{5,8} starts at t=5 and ends at t=8 thus  does not overlap with i=0 or i=1 thus can be picked
 * i=3:{6,10} starts at t=6 and ends at t=10 thus overlaps with i=2 and thus from i=2 and i=3 only one can be picked
 * 
 * Thus in total we can at most pick any 2 activities that is either i=0 || i=1 and either i=2 || i=3
 * Hence o/p is 2.
 * 
 * 
 * For ex: activities = [{1,3},{2,4},{3,8},{10,11}];
 * o/p: 3
 * 
 * i=0: {1,3} starts at t=1 and ends at t=3
 * i=1: {2,4} starts at t=2 and ends at t=4 and thus overlaps with i=0 and thus either i=0 can be picker or i=1 can be picked.
 * i=2: {3,8} starts at t=3 and ends at t=8 overlaps with i=1 thus either this or i=1 can be picked.
 * i=3: {10,11} starts at t=10 and ends at t=11 and thus does not overlap with anyone and can be picked.
 * 
 * Now i=3 can surely pe picked, however if we pick i=1 then i=0 and i=2 cant be picked and result will be 2 i,e {2,4} and {10,11}
 * bit however in case we don't pick {2,4} then i=0 and i=2 can be picked along with i=3 and thus result will be {1,3},{3,8},{10,11} i,e 3 and thus its max
 * activities and thus its the answer. 
 * 
 *  */

/**Approach: 0(n logn),0(n)
 * 
 * Choose a greedy way and first sort all the item in ascending order of end time. Pick the first activity and see if the next activity can be 
 * picked or not based on the starting time of activity to be selected or not and end time of current activity. If starting time of activity to be picked
 * is smaller than end time of current selected activity discard it else pick it. Now make the recently picked activity as current selected activity and proceed
 * further.
 */

function maxActivities(activities: number[][]): number {
    activities.sort((a, b) => a[1] - b[1]);
    let included: number[][] = [];
    included.push(activities[0]);
    for (let i = 1; i < activities.length; i++) {
        if (included[included.length - 1][1] <= activities[i][0]) {
            included.push(activities[i]);
        }
    }
    return included.length;
}

/**Approach2: 0(n logn),0(1)
 * 
 * The only difference between the above approach and this is that previously we were maintain an included array which was also storing the activities which
 * we have picked, however the requirement of the question was only to give the max number of the activities which we can select and thus we can simply reduce
 * the space complexity by maintaining the current selected activity and use that to check wether we need to include the current iteration element into
 * the res or not.
 */
function maxActivities1(activities: number[][]): number {
    activities.sort((a, b) => a[1] - b[1]);
    let res = 1;
    let current = 0;
    for (let i = 1; i < activities.length; i++) {
        if (activities[current][1] <= activities[i][0]) {
            res++;
            current = i;
        }
    }
    return res;
}


// console.log(maxActivities([[2, 3], [1, 4], [5, 8], [6, 10]]));
console.log(maxActivities([[3, 8], [2, 4], [1, 3], [10, 11]]));