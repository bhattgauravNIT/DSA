/**Lcm is least common multiple that is the lowest possible number whose multiples are both the given numbers.*/
let x = 4, y = 6;

/**approach 1: > 0(Max(x,y)) */
function lcm(a, b) {
    let max = Math.max(a, b);
    while (true) {
        if (max % a === 0 && max % b === 0) {
            return max
        } else {
            max++;
        }
    }
}

console.log(lcm(x, y));

/**approach 2: O(log(Min(a,b))):
 * 
 * Lcm(x,y) * HCF(x,y) = x*y;
 *  
*/
function Lcm(a, b) {
    return (a * b) / Hcf(a, b);
}

function Hcf(x, y) {
    let a = Math.max(x, y), b = Math.min(x, y);
    while (b !== 0) {
        let r = a % b;
        a = b;
        b = r;
    }
    return a;
}

console.log(Lcm(x, y));

