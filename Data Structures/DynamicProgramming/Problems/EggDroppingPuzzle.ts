/**
 * Given two inputs number of eggs and total floors, any floor can be a threshold floor. By threshHold we means that dropping
 * the egg from that floor will cause egg to break and therefore all floors below it will fall under the category
 * from where the egg if dropped won't break and all the floor above and including this thresh hold floor falls
 * under the category that if the egg is dropped from them it will break.
 * 
 * We need to find total number of trails that we can do in worst case in order to find the threshold floor.
 * 
 * For ex: eggs = 1, floor = 10
 * o/p: 10 min trails in worst case to find the threshold floor is 10.
 * 
 * Lets understand:
 * 
 * floors range from 1->10
 * So Lets say we start with 1st floor and drop the egg there are two possibilities i,e either it can break or it will not
 * break. If it break its the threshold. If it wont break we go to floor 2 .
 * 
 * Now at floor 2 we again have two possibilities i,e either it can break or it wont break.
 * If it break its the threshold and we are sure that all floors above 2nd the egg will also break. If it wont break then
 * we move to floor 3rd.
 * 
 * In this way in the worst case we can reach upto floor 10 and thus minTrails needed to find the threshold floor in worst case
 * is 10.
 * 
 * 
 * For ex: eggs = 2, floor = 10
 * o/p: 4 is the min trails needed to find the threshold floor in worst case.
 * 
 * Lets suppose:
 * 
 * We start at floor = 4 So there are two possibilities here.
 *                1. Eggs breaks
 *                2. Eggs wont break.
 * 
 * If egg breaks we are still unsure that is it the actual threshold because if in case the threshold lies from 1->4 then also
 * egg can break at 4th floor so we need to check floor 1,2 and 3 in this case with remaining egg.
 * 
 * So now problem reduces to one egg and 3 floors [1->3] and in worst case we can find max 3 trials. Thus total trail is 4.
 * 
 * Lets suppose egg doesn't break
 * So we move to 7th floor again there can be two possibilities
 * 
 * 1. Eggs breaks
 * 2. Eggs wont break.
 * 
 * If egg breaks at 7th and previously egg didn't broke at 4th thats why we are at 7 now.
 * So if it breaks at 7 we are sure that any floor between [5->6] can also the threshold so we are left with
 * one egg so trails needed for 2 floors with one egg is 2. And we have already done trails on 4th floor and 7th floor so 2 trails there also
 * done so in total 4 trails again in this case.
 * 
 * 
 * Now lets talk about the case if the egg doesn't break in 7th floor.
 * So current situation one trail done on 4th floor its didn't break
 * One trail done on 7th floor it didn't break
 * 
 * Now we are at 9th floor we do one trial
 * There are two possibilities that egg can break and egg won't break.
 * 
 * If egg breaks than it means [8] can also be a threshold floor so we check on 8th so total trails becomes
 * 
 * one on 4th, one on 7th, one on 9th and one on 8th i,e 4 min.
 * 
 * 
 * If eggs doesn't break on 9th floor then current situation is
 * 
 * ne trail done on 4th floor its didn't break
 * One trail done on 7th floor it didn't break
 * one trail done on 9th floor it didn't break
 * 
 * So we move to 10th floor which is again one trail
 * If it breaks at 10th then we found the threshold floor and total trials are 4.
 * 
 * If it doesn't even break at 10 this means there exists no threshold floor.
 * 
 * 
 * 
 */

/**Approach1: 0(2^n),0(n)
 * 
 * Lets first talk about the base cases:
 * 1. If the eggs = 0 and no matter how many floors we have we cant do any trails as we don't have eggs to preform it thus return 0
 * 2. If the floors = 0 then no matter how many eggs we have we don't have any floor to perform trial on and thus we return 0
 * 3. If the eggs = 1 then whatever the floor value is we return that because in worse case we need to check all the floors and thus min trails is the floors only.
 * 4. If floor = 1, then in worse case we need to check this floor only thus number of trial is 1 only.
 * 
 * Now lets consider min drop as infinity.
 * We start iteration from the first floor i,e i=1
 * For every floor there are two possibilities either the egg will break or the egg will not break.
 * 
 * Possibility 1: Egg break
 * If egg breaks then the number of eggs left is egg-1 and now since egg has broken on ith floor then it will surely break on i+1 floor onwards
 * but we need to check if it can break on i-1 floor now because all floors below it needs to be checked now.
 * 
 * so we recursively call for eggs-1 eggs and i-1 floors
 * 
 * Possibility2: The eggs does not break
 * 
 * if the egg does not break at ith floor then number of eggs remains same and now we need to check on floors
 * greater than i i,e floor-i floors
 * 
 * so we recursively call for same number of eggs and floor-i floors
 * 
 * Now the worst case drops will be max of (Possibility 1: Egg break, Possibility2: The eggs does not break)+1 (+1)as we have made a trial at it floor
 * 
 * We need to minimize this worst case so we take min of it.
 * 
 * minDrops = Math.min(minDrops, worstCaseDrops);
*/

function eggDroppingPuzzle(eggs: number, floor: number) {
    if (eggs === 0 || floor === 0) return 0;
    if (eggs === 1) return floor; 
    if (floor === 1) return 1;
    let minDrops = Infinity;

    for (let i = 1; i <= floor; i++) {
        const dropsIfBreaks = eggDroppingPuzzle(eggs - 1, i - 1);
        const dropsIfNotBreaks = eggDroppingPuzzle(eggs, floor - i);
        const worstCaseDrops = 1 + Math.max(dropsIfBreaks, dropsIfNotBreaks);

        minDrops = Math.min(minDrops, worstCaseDrops);
    }

    return minDrops;
}

/**Approach2:
 * 
 * Since in the above recursion there are two parameters changing i,e floor and egg and thus we need to maintain a 2-d array of dimensions
 * (eggs+1)*(floor+1)
 * 
 * now lets talk about the base cases, if eggs becomes 0 i,e for 0th row, we can not make any trial thus value should be 0.
 * 1. If the eggs = 0 and no matter how many floors we have we cant do any trails as we don't have eggs to preform it thus value should be 0.
 * 2. If the floors = 0 then no matter how many eggs we have we don't have any floor to perform trial on and thus value should be 0.
 * 3. If the eggs = 1 then whatever the floor value is is the value of the cell because in worse case we need to check all the floors 
 * and thus min trails is the floors only.
 * 4. If floor = 1, then in worse case we need to check this floor only thus number of trial is 1 only.
 * 
 * So our dp array will look like: eggs = 2, floor = 10
 * dp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
 *       0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
 *       0, 1
 *      ]
 * 
 * Now we will start from i=2 and j=2.
 * We will initialize the cell value as infinity.
 * 
 * Now we will try and dropping the egg from every kth floor where k=1 and k<=j as j is denoting the floor value.
 * Now for every floor there are two possibilities
 * 1) Egg breaks
 * 2) Egg does not break
 * 
 * Possibility 1: Egg break
 * If egg breaks then the number of eggs left is egg-1 and now since egg has broken on ith floor then it will surely break on i+1 floor onwards
 * but we need to check if it can break on i-1 floor now because all floors below it needs to be checked now.
 * 
 * eggBroke = dp[i-1][k-1]
 * 
 * Possibility2: The eggs does not break
 * 
 * if the egg does not break at ith floor then number of eggs remains same and now we need to check on floors
 * greater than i i,e floor-i floors
 * 
 * eggDoesNotBroke = dp[i][j-k]
 * 
 * worst case is calculated as max of this above + 1 (+1) as we have performed one trial and.
 * 
 * value = 1 + Math.max(dp[i-1][k-1], dp[i][j-k])
 * 
 * Now we need to calculate the min of worst case
 * 
 * so dp[i][j] = Min(value, dp[i][j])
 * 
 * return dp[eggs][floor]
 * 
 * 
 */

function eggDroppingPuzzle1(eggs: number, floor: number) {
    let dp: number[][] = [];
    for (let i = 0; i <= eggs; i++) {
        dp[i] = [];
        dp[i][0] = 0;
    }
    for (let j = 0; j <= floor; j++) {
        dp[0][j] = 0;
    }
    for (let j = 1; j <= floor; j++) {
        dp[1][j] = j;
    }
    for (let i = 1; i <= eggs; i++) {
        dp[i][1] = 1;
    }
    for (let i = 2; i <= eggs; i++) {
        for (let j = 2; j <= floor; j++) {
            dp[i][j] = Infinity;
            for (let k = 1; k <= j; k++) {
                let value = 1 + Math.max(dp[i - 1][k - 1], dp[i][j - k]); 
                dp[i][j] = Math.min(dp[i][j], value);
            }
        }
    }
    return dp[eggs][floor];

}

console.log(eggDroppingPuzzle(1, 10));