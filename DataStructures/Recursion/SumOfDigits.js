/**Given a number n such that n>=0, find the sum of its digits */

/**Approach 1: O(digits(n)),O(digits(n)): Recursion 
 * 
 * So we know 
 * 
 * Sum of digits in 123 if we know the sum of digits in 12 as now it will simply be 123 % 10 i,e 3 + sumof digits of 12
 * 
 * Ex: 123
 * 
 * fun(123)
 *       -fun(12)
 *            -fun(1)
 *                -fun(0)
 * 
 * Now 0 should return 0, which is base case the control went back to fun(1) so ideally it should be 1 + (what the child has returned)
 * so its 1+0 => 1.
 * Control went back to fun(12)
 * 
 * It should be 2 + what the child has retuned that is 2+1 => 3
 * The control went back to fun(123).
 * 
 * It should be 3 + what the child has returned that is 3+3 = 6
 * 
*/
function digitsSum(n) {
    if (n === 0) return 0;
    return n % 10 + digitsSum(Math.floor(n / 10));
}

/**Approach 2: O(digits(n)),O(1) */
function digitsSum(n) {
    n = BigInt(n);
    let sm = 0n;
    while (n > 0n) {
        sm += n % 10n;
        n = n / 10n;
    }
    return sm;
}
