/**Given a number n find the sum upto N considering natural numbers only. Natural numbers start with n = 1
 * 
 * For ex: N= 5: 
 * 1+2+3+4+5 = 15
 */

/**Approach 1: O(n),0(n): Recursion */
function nNaturalSum(n) {
    if (n === 0) return 0;
    return n + nNaturalSum(n - 1);
}

/**Approach 2: O(n), O(1) */

function nNaturalSum(n) {
    let i = 1, sm = 0;
    while (i <= n) {
        sm += i;
        i++;
    }
    return sm;

}

/**Approach 3: O(1),0(1) */

function nNaturalSum(n) {
    return (n * (n + 1)) / 2;
}
