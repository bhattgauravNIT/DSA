/**Given a number num return an array of all of its divisors. */

/**Approach 1: O(n)
 * 
 * From 1 to n keep checking all i's for which num % i === 0.
 */
function allDivisors(num) {
    let i = 2, res = [1];
    while (i <= num) {
        if (num % i === 0) {
            res.push(i);
        }
        i++;
    }
    return res;
}

/**Approcah 2: 0(sqrt(n))
 * 
 *  As all divisors exists in pairs with the smaller number in the pair always smaller than sqrt(n) 
 *  thus if we go till sqrt(n).
 * 
 * Say Ex: all divisors of 20 are [1, 2, 4, 5, 10, 20]
 * Now see that 1 & 20 comes in pair as if (20 % 1 === 0) signifes 1 is a divisor that 20/1 = 20 is also a divisor.
 * Similarly 20 % 2 === 10 signifies 2 is a dividor so 20/2 = 10 will also be a divisor.
 * So from 1 to sqrt(n) if i is a divisor than num/i will also be a divisor.
 * one corner case of 25 or any perfect square number [1,25,5]
 * so i!== num/i then only push i else we can get two time 5. Like [1,25,5,5] in cases like 25.
 * 
 */
function allDivisors1(num) {
    let i = 1, res = [];
    while (i <= Math.sqrt(num)) {
        if (num % i === 0) {
            res.push(i);
            if (i !== num / i) {
                res.push(num / i);
            }
        }
        i++;
    }
    return res;
}

/**Note this above gives all divisors but not in sorted order so for that we can just twickle the the above a little 
 * so first we push the divisors till sqrt(n) and then from there we found the counter pair via n/i;
 * Complexity 0(sqrt(n)), 0(1)
*/
function allDivisors2(num) {
    let i = 1, res = [];
    while (i < Math.sqrt(num)) {
        if (num % i === 0) {
            res.push(i);
        }
        i++;
    }
    while (i >= 1) {
        if (num % i === 0) {
            res.push(num / i);
        }
        i--;
    }
    return res;
}