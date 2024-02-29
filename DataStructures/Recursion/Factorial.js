/** Given a number n >= 0 find factorial of number using recursion */

/**Approach 1: 0(n), 0(n)
 * Non tail recursive.
 */
function fact(n) {
    if (n === 1) return 1
    return n * fact(n - 1);
}

/**Approach 2: 0(n), 0(n) 
 * 
 * Tail recursive, faster than above approach
*/

function fact(n, k) {
    if (n === 1) return k
    return fact(n - 1, n * k);
}

console.log(fact(3, 1));