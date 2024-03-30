let x = 20;

/**approach 1: O(n), O(n) as once the call stack is reached it fills it up with n so extra space is taken here it dont work for higher
 * numbers due to exhaustion of stack.*/
function fact1(val) {
    if (val === 0 || val === 1) return 1;
    return val * fact1(val - 1);
}

/* T(n) = O(1)*T(n-1)
   T(n) = T(n-1) =~ O(n-1) =~ O(n)
*/
console.log(fact(x));

/**approach 2: O(n) 0(1)*/
function fact2(x) {
    x = BigInt(x);
    let res = 1n;
    for (let i = x; i >= 2n; i--) {
        res *= i;
    }
    return res;
}

console.log((fact2(x)));



