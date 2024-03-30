/**Given a value N return all the power of 2 from 0 to N */

/**Approach 1 
 * 
 * This can overflow for very large values of N
*/

function powerTwo(N) {
    if (N === 0) return [0]
    let i = 0, res = [];
    while (i <= N) {
        res.push(Math.pow(2, i));
        i++;
    }
    return res;
}

/**Approach 2
 * 
 * Now this is based on the fact of left shit operator that if we left shift any value x by y, its nothing but x* 2^y
 * 
 * so if x = 1 its 1 * 2^y which can give power of two for any y.
 */

function powerTwo1(N) {
    if (N === 0) return [0];
    let i = 0n, res = [];
    N = BigInt(N);
    while (i <= N) {
        res.push(1n << i);
        i++;
    }
    return res;
}