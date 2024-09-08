/**
 * Given a pair where every pair represents a job which can be picked and cant be picked.
 * The first element of the job resembles a deadline and every second element resemble  a profit associated with
 * the job. Assume every job takes 1 unit of time to finish and we start doing jobs from t=0 secs.
 *
 * The task is to maximize the profit.
 *
 * Lets understand the problem with help of an example.
 *
 * Ex:   {{4,70},{1,80},{1,30},{1,100}}
 *
 * So
 *
 *    Job0-> Has a deadline at t=4 and gives profit 70.
 *    Jobs1 -> Has a deadline at t=1 and gives profit 80.
 *    Jobs2 -> has a deadline at t=1 and gives profit 30.
 *    Jobs3 -> Has a deadline at t=1 and gives a profit 100.
 *
 * So max jobs that we can complete and earn max profit are
 *    Job0 and job3 i,e 70+100 = 170.
 *
 *
 *
 * Ex: {{2,50},{2,60},{3,20},{3,30}}
 *
 * So
 *
 *    Job0-> Has a deadline at t=2 and gives profit 50.
 *    Jobs1 -> Has a deadline at t=2 and gives profit 60.
 *    Jobs2 -> has a deadline at t=3 and gives profit 20.
 *    Jobs3 -> Has a deadline at t=3 and gives a profit 30.
 *
 * So max jobs that we can complete and earn max profit are
 *    Job0,job1,job3 i,e 50+60+30 = 140.
 *
 *
 * Ex: {{2,100},{1,50},{2,10},{1,20},{3,30}}
 *
 * So
 *
 *    Job0-> Has a deadline at t=2 and gives profit 100.
 *    Jobs1 -> Has a deadline at t=1 and gives profit 50.
 *    Jobs2 -> has a deadline at t=2 and gives profit 10.
 *    Jobs3 -> Has a deadline at t=1 and gives a profit 20.
 *    Jobs4 -> Has a deadline at t=3 and gives a profit 30.
 *
 * So max jobs that we can complete and earn max profit are
 *    job0,job1,job4 i,e 100+50+30 = 180
 *
 *
 */

/**Approach:
 *
 * 
 * For ex: [[2, 50], [2, 60], [3, 20], [3, 30]]
 * 
 * Choose the greedy way and sort the jobs based on their profits in descending order. Find the max deadline and formulate a slots table
 * of that size and try to fit jobs based on max profit onto that slot table. So above the max deadline is 3 hence formulate a slot table of 3 items or say
 * formulate a slotTable with starting time as t=0 and ending time as maxDeadline time.
 * 
 * After sorting the jobs based on profit the jobs look like:
 * 
 * [[2, 100], [1, 50], [3, 30], [1, 20],[2, 10]] and slotsTable = [undefined ,undefined , undefined]
 * 
 * for first job the deadline is 2 so it has to be completed before t=2 and the slot at t=1 is empty meaning we can place it there
 * 
 * slotsTable = [undefined ,[2,100] , undefined]
 * 
 * for second job deadline is 1 so it has to be completed before t=1 and the slot for t=0 is empty meaning we can place it there
 * 
 * slotsTable = [[1, 50] ,[2,100] , undefined]
 * 
 * for third job the deadline is 3 so it has to be completed before t=3 and t=2 slot is empty meaning we can place it there
 * 
 * slotsTable = [[1, 50] ,[2,100] , [3, 30]]
 * 
 * Now sortTable is full so simply the max Profit that we can generate is 50+100+30 = 180

 */
function jobSequencing(jobs: number[][]): number {
    jobs.sort((a, b) => b[1] - a[1]);
    let maxDeadline = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i][0] > maxDeadline) {
            maxDeadline = jobs[i][0];
        }
    }
    let maxProfit = 0;
    let slots: number[] = new Array(maxDeadline);
    for (let i = 0; i < jobs.length; i++) {
        let currentJobDeadline = jobs[i][0];
        if (currentJobDeadline > 0 && currentJobDeadline - 1 < slots.length) {
            let j = currentJobDeadline - 1;
            while (slots[j] !== undefined && j >= 0) {
                j--;
            }
            if (j >= 0) {
                slots[j] = jobs[i][1];
                maxProfit += jobs[i][1];
            }
        }
    }
    return maxProfit;
}

// console.log(jobSequencing([[2, 100], [1, 50], [2, 10], [1, 20], [3, 30]]));
// console.log(
//   jobSequencing([
//     [4, 70],
//     [1, 80],
//     [1, 30],
//     [1, 100],
//   ])
// );

console.log(
    jobSequencing(
        [[2, 50], [2, 60], [3, 20], [3, 30]]
    )
);
