/**A number is prime if it's divisible by 1 & itself.
 * A composite number is one which has divisors other than 1 and itself as well ex 4.
 * 1 is neither prime nor composite.
 * 2 is the only even prime number.
 */

/** approach 1: O(n) */
function isPrime1(n) {
    if (n === 1) return false;
    let i = 2;
    while (i < n) {
        if (n % i === 0) {
            return false;
        }
        i++;
    }
    return true;

}

/** approach 2: O(Sqrt(n)) 
 * 
 * A number is prime it don't has any factor apart from 1 till its sqrt.
*/
function isPrime2(n) {
    if (n === 1) return false;
    let i = 2;
    while (i < Math.sqrt(n)) {
        if (n % i === 0) {
            return false;
        }
        i++;
    }
    return true;
}

/** approach 2: O(Sqrt(n)) but faster than above 
 * 
 * In the previous case we were going from 2 to Sqrt(n), so
 * 
 * 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 . . . . . . . . .sqrt(n)
 * Now check if number is divisible by 2 at initial level, so all the numbers till sqrt(n) which
 * has 2 as factor can be removed as the number is itself not divisible by 2.
 * Thus remaning numbers are
 * 
 * 3 5 7 9 11 13 15 17 19 21 24 . . . . . . . . sqrt(n);
 * 
 * Now similary check if number is dividsible by 3 at initail level so all the numbers till sqrt(n) which
 * has 3 as factor can be removed as the number is itself not divisible by 3.
 * Thus remaning numbers are
 * 
 * 5 7 11 13 17 19 . . . . . . . . . sqrt(n);
 * 
 * Now see that first number is 5 after that if we add 6 to 5 it becomes 11 but we also need to check for 7 which is 5+2.
 * Again for 11 if we add 6 it becomes 17 but we also need to check for 13 which is 11+2.
 * So check only for the value of i if it divides n where i is : 5 7 11 13 17 19 . . . . . . . . . sqrt(n); 
*/
function isPrime3(n) {
    if (n === 1) return false;
    if (n === 2 || n === 3) return true;
    if (n % 2 == 0 && n % 3 === 0) return false;
    let i = 5;
    while (i < Math.sqrt(n)) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        } else {
            i += 6;
        }
    }
    return true;
}


console.log(isPrime2(37));

