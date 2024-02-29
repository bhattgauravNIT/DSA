/**Given a number x return its prime factors.
 * Prime factor means that the number should be a factor of the given x and should be prime as well.
 * 1 is neither prime nor composite
 */


/**Approach 1: O(n*sqrt(n)*log(n))  =~ O(n*log(n))
 * 
 * For every number from 2 till n, check if i is prime or not if yes then see it it divides num or not
 * if yes, find till how many times it divides num
 * For ex: Prime factors of 12
 * 
 * We start with 2 , checked if 2 is prime, then saw if 2 divides 12 which is also true.
 * Now we need to find 2 comes how many times in prime factorization of 12. That means how many power of 2 actually divides 12
 * that many times 2 will come in prime factorization of 12. 
 * Thus we keep on checking till when num is divided by power of 2 via logic 
 * while (x % q === 0) {
                res.push(i);
                q = q * i;
    }
*/
function primeFactors(x) {
    if (n === 1) return [];
    let i = 2, res = [];
    while (i <= x) {
        if (isPrime(i)) {
            let q = i;
            while (x % q === 0) {
                res.push(i);
                q = q * i;
            }
        }
        i++;
    }
    return res;
}

function isPrime(n) {
    if (n === 2 || n === 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false
    let i = 5;
    while (i <= Math.sqrt(n)) {
        if (n % i === 0 || (n % (i + 2) === 0)) {
            return false;
        } else {
            i = i + 6;
        }
    }
    return true;
}


/**Approach 2: sqrt(n)*log(n)
 * The prime factor for any composite number n will always lie between 2 & sqrt(n) and can be written as power of prime factors .
 * for ex:
 * 12 can be written as (2^2 * 3).
 * Now if we look at prime factorziation table for 12 it can be reduced like
 * 
 * 12      -2
 *   6     -2
 *    3    -3
 *     1
 * so a simple approach to move from 2 till sqrt(n) while keep on dividing num/i if num%i===0 and keep pushing i in res.
 * Now in first statment we wrote that every composite number will have prime factor between 2 and sqrt(n), however its not true for a prime number 
 * ex:
 * 43 beacuse it has only one prime factor that is 43 
 * Now we also need to handle the cases where num !== 1 that means the last prime factor has power 1.
 * So such corner cases can be taken to consideration with 
 * if (num > 1) res.push(num);
*/

function primeFactors1(num) {
    if (num === 1) return [];
    let i = 2, res = [];
    while (i <= Math.floor(Math.sqrt(num))) {
        if (num % i === 0) {
            while (num % i === 0) {
                res.push(i);
                num = Math.floor(num / i);
            }
        }
        i++;
    }
    if (num > 1) res.push(num);
    return res;
}
