/**Given a number n print 1 to n recursively */

/**O(n), 0(n) */
function print1toN(n) {
    if (n === 0) return
    print1toN(n - 1);
    console.log(n)
}

print1toN(5);