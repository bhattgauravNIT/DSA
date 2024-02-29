/*Hcf or Gcd is the highest common factor which divides both the numbers*/

let x = 3, y = 7;

/*Suppoose we have a rectange with dimensions x*y then if we were to find the largest tile which can fill this rectangle than this tile
should have dimensions of the gcd of the dimensions of the x*y rectangle.*/

/*approach 1: 0(Min(a,b))*/
function Gcd(x, y) {
    let min = Math.min(x, y);
    while (min >= 1) {
        if (x % min === 0 && y % min === 0) {
            return min;
        } else {
            min--;
        }
    }
}

console.log(Gcd(x, y));

/**approach 2: 0(log(min(a,b))) */

/** Eucledian algo-
 * So lets suppose we have two inputs a, b . Lets consider a matrix with rows
 *        a     b      r
 * 
 * here a is the max of the two numbers, b is the smaller and r is the remainder which we get a%b.
 * Till b is not zero keep dividing a and b, store remainder and in next step make a as b and b as remainder.
 * So ex: 12, 24
 * 
 *      a     b    r
 *      24    12   2
 *      12    2    6
 *      2     6    0
 *      6     0
 * 
 *  Output is a
 */
function Hcf(x, y) {
    let a = Math.max(x, y), b = Math.min(x, y);
    while (b !== 0) {
        let r = a % b;
        a = b;
        b = r;
    }
    return a;
}

console.log(Hcf(x, y));
