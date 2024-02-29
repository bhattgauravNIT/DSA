/**Given 3 towers say A, B and C with initially A having n number of stair on top of each other. Each subsequent stair which is
 * at top of another one is smaller than the previous one.
 *                                                              1
 * Like say one tower A we have 3 stairs with magintude         2
 *                                                              3
 * 
 * We need to move these stair from A tower to C tower, keeping these rules in mind
 * 1: Only one tile can be moved in one step
 * 2: No larger tile can be placed above a smaller tile.
 * 
 * Given n number of tile, print every step needed to acheive this shipment from tower A to tower C following the rules and print
 * the total steps needed to achieve this operation.
 */

/**Approach: 0(2^n-1) Recursion 
 * 
 * Suppoese n = 3, initially source is A, auxilary is B and destination is C.
 * Now Let's first consider all the steps needed to moves 3 tiles follwoing the rules to tower C.
 * A -> C
 * A -> B
 * C -> B
 * A -> C
 * B -> A
 * B -> C
 * A -> C
 * 
 * So these are the steps needed to fullfill this opearation and the total steps is 7.
 * Now lets understand 
 * 
 * Initially we had 3 tiles in A. If we somehow move (n-1) that is top two tiles to B in first step, now the largest tile in A can be easily
 * moved to C and now move this (n-1) tiles of B to A. This will result in achievement of the operation.
 * 
 * So Initially
 *        n = 3,     source = A, auxilary = B, destination = C
 *        1. n = 2 , source = A, auxilary = C, destination = B
 *        2. n = 1 , source = A, auxilary = B, destination = C
 *        3. n = 2,  source = B, auxilary = A, destination = C
*/
function towerOfHanoi(n, src = 'A', aux = 'B', des = 'C', res = 0) {
    if (n === 1) {
        console.log(`${src} -> ${des}`);
        return res + 1;
    }
    let temp1 = towerOfHanoi(n - 1, src, des, aux, res);
    let temp2 = towerOfHanoi(1, src, aux, des, res);
    let temp3 = towerOfHanoi(n - 1, aux, src, des, res);
    return temp1 + temp2 + temp3
}

console.log(towerOfHanoi(3));

/**If the problem is just to find the number of steps needed to complete the operation
 * without knowing about the exact steps, then
 * 
 * n = 1  res = 1
 * n = 2 res = 3
 * n = 3 res = 7
 * n = 4 res = 15
 * 
 * which is 2^n-1.
 */

function towerOfHanoiSteps(n) {
    return (1 << n) - 1;
}