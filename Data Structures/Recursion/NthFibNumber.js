/**Given a value n >=0 , find the corresponding fib num in fib series */

/**Approach 1 0(n), 0(n)
 * recursion
*/
function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fib(n - 1) + fib(n - 2);
}

/** Approach 2: 0(n), 0(n) */
function fib(n) {
    let arr = [0, 1];
    if (n === 0) return arr[0];
    if (n === 1) return arr[1];
    let i = 2;
    while (i <= n) {
        arr[i] = arr[i - 1] + arr[i - 2];
        i++;
    }
    return arr[n];
}

/**Approach 3: O(n),O(1) */
function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    let i = 2, prev = 1, current = 1;
    while (i < n) {
        let next = prev + current;
        prev = current;
        current = next;
        i++;
    }
    return current;
}
