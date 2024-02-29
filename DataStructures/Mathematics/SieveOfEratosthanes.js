/**The problem is for a given number num find all the prime numbers smaller than equal to num */

/**Approach 1: 0(n*sqrt(n)), 0(1)
 * Loop from 2 till num and keep on checking if the number is prime or not,
 * if yes push in res array.
 */

function primes(num) {
    let res = [], i = 2;
    while (i <= num) {
        if (isPrime(i)) {
            res.push(i);
        }
        i++;
    }
    return res;
}

function isPrime(n) {
    if (n === 1) return false;
    if (n === 2 || n === 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    let i = 5;
    while (i <= Math.sqrt(n)) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false
        } else {
            i = i + 6;
        }
    }
    return true;
}

/**Approach 2: o(n*log(n)), 0(n) 
 * The alogorithm is sieve of erathosthanes
 * 
 * Suppose we need to find all the primes smaller than equal to 10.
 * Create a array with indices such as 
 * 0 1 2 3 4 5 6 7 8 9 10
 * Initailly mark all of them as true.
 * 
 * 0 1 2 3 4 5 6 7 8 9 10
 * T T T T T T T T T T T
 * 
 * Now since 0 & 1 are out of scope as 1 is neither prime so start from 2 and mark all the indices which has 2 as factor false
 * apart from 2 itself ex index 4, 6 , 8 ,10 ......
 * 
 * so now the arr become
 * 0 1 2 3 4 5 6 7 8 9 10
 * T T T T F T F T F T F
 * 
 * Similairy do this for all multiples for 3 apart from index 3 itself
 * so now the arr become
 * 0 1 2 3 4 5 6 7 8 9 10
 * T T T F F T F T F F F
 * 
 * Similarly do it fro all multiples of 5 apart from index 5 itself
 * so now the arr become
 * 0 1 2 3 4 5 6 7 8 9 10
 * T T T F F F F T F F F
 * 
 * from index 2 all the index that has a true false is the answer.
 * 
 * now making indexices of all multiples of 2 , 3 and 5 we need to do it till sqrt(num). As all divisors exists in 
 * pairs with the smaller number of pair always smaller than sqrt(n) thus if we go till sqrt(n) we ensure that all 
 * dividors on n is covered as we are finding multiples.
*/


function primes1(num) {
    let arr = [], i = 0, res = [];
    while (i <= num) {
        arr.push(true);
        i++;
    }
    i = 2;
    while (i <= Math.sqrt(num)) {
        let j = 2;
        while (i * j <= num) {
            if (arr[i * j]) {
                arr[i * j] = false;
            }
            j++;
        }
        i++;
    }
    i = 2;
    while (i <= arr.length) {
        if (arr[i]) {
            res.push(i);
        }
        i++;
    }
    return res;
}