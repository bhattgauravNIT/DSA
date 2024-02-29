/**Given a number check whether its a power of two or not
 * Ex: 4 : O/p is true
 * 6 : Output is false
 */

/**Approach 1 0(log(n)), 0(1)
 * 
 * If a given number is a power of two this means that at some point of time
 * if we keep on dividing n with n/2 it should yield 1 and if at any point its n%2 !== 0 , its not a power of 2.
*/

function powerOfTwo() {
    if (n === 0) return false;
    if (n === 1) return true;
    while (true) {
        if (n % 2 !== 0) {
            return false;
        } else {
            n = n / 2;
            if (n === 1) {
                return true;
            }
        }
    }
}

/**Approach 2 
 * 
 * If we are given any number which is a power of 2 then it will only have 1 set bit
 * 
 * Ex: 4 -> 0000...100
 *     2  -> 0000...10
 * 
 * So just keep a track of the set bit while computing binary representation if, the set bit count is greater than 1 return false.
 * 
 * It works faster than above beacuse as soon as it encounters a set it checks.
 * 
 */

function powerOfTwo1(n) {
    let cnt = 0;
    if (n <= 0) return false;
    while (n >= 1) {
        if (n % 2 !== 0) {
            cnt++;
            if (cnt > 1) {
                return false;
            }
        }
        n = n / 2;
    }
    return true;
}

/**Approach 3: Use Brian Kremingham algo to find the total set bits.
 * 
 * Its based on simple fact that any power of 2 will only have one set bit and lets count set bits using brians Kremingham
 * algo, if at any time we see that set bits counts is excedding 1 return false.
 */

function powerOfTwo(n) {
    let cnt = 0;
    while (n > 0) {
        cnt++;
        if (cnt > 1) {
            return false;
        }
        n = n & (n - 1);
    }
    return true;
}

/** A more efficient solution is simple 
 * 
 * say we have any number which is power of 2 ex : 4
 * 
 * 4 -> 00000.....100
 * 
 * So it will always have only one set bit.
 * 
 * Now if you do a & with n-1 which we were doing in brain Kremingham algo,
 * 
 * 4 ->   00000...100
 * 3->    00000...011
 * res->  00000...000
 * 
 * res will be zero however in case of a non power of 2 its wont be zero           
 */

function powerOfTwo(n) {
    if (n === 0) return false;
    return (n & (n - 1)) === 0
}