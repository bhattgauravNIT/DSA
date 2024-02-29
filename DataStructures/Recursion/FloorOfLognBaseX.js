/**
 * O/p is 4
 * 
 * This is a typical problem of finding the log base 2 of any number.
 * 
 * Ex: if n === 2 o/P is 1 which is log 2 base 2 = 1.
 * If n === 4 o/p is 2 which is log 4 base 2 = 2.
 * 
 * For non powers of 2 like say n = 9
 * its gonna give 3 which is also the value when n === 8
 * as log 8 base 2 = 3
 * 
 * So in general this function returns floor(log(n base 2))
 */

function fun(n) {
    return n === 1 ? 0 : 1 + fun(n / 2)
}

console.log(fun(16));

/** Note if i do
 * 
 * return n < 3 ? 0 : 1 + fun(n / 3)
 * Its nothing but floor(log(n base 3));
*/

/** So i can generalize this to find floor(LogN base x) as */

function fun(n, x) {
    return n < x ? 0 : 1 + fun(Math.floor(n / 2), x);
}

