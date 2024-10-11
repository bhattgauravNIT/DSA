/**Given a value n, the task is to find the nth fibonacci number
 * 
 * For ex: n=0, o/p = 0
 * 
 * For ex: n=1 , o/p = 1
 * 
 * For ex: n=2, o/p = 1
 * 
 * For ex: n = 3, o/p = 2
*/


/**Approach1: 0(2^n),0(n) 
 * 
 * Recursive approach
*/
function nthFibonacci(n: number) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    return nthFibonacci(n - 1) + nthFibonacci(n - 2);
}


/**Approach2: 0(n),0(n) 
 * 
 * Recursive approach with memoization
*/
let memoize: number[] | undefined[] = [];
function nthFibonacci1(n: number) {
    if (memoize[n] === undefined) {
        let res: number;
        if (n === 0 || n === 1) {
            res = n;
        } else {
            res = nthFibonacci1(n - 1) + nthFibonacci1(n - 2);
        }

        memoize[n] = res;
    }
    return memoize[n];
}

/**Approach3: 0(n),0(n)
 * 
 * Tabulation approach
 */
let tabulation: number[] = [0, 1];
function nthFibonacci2(n: number) {
    if (tabulation[n] !== undefined) return tabulation[n];
    let lastIndex = tabulation.length - 1;
    for (let i = lastIndex + 1; i <= n; i++) {
        tabulation[i] = tabulation[i - 1] + tabulation[i - 2];
    }
    return tabulation[n];
}
