/**Given a number and a position of a bit, determine whether that kth bit is a set bit or not
 * 
 * Ex: 5 -> 101 , 1st and 3rd bit are set bit.
 */

/**Approach 1- 0(log(n)), 0(numberOfBits in env)~= O(Constant)
 * 
 * The approach is simple have the binary representation of n, then check the kth bit if it is 0 return false else return true.
 */
function ksetBit(n, k) {
    let res = ''
    while (n > 0) {
        if (n % 2 === 0) {
            res += '0'
        } else {
            res += '1'
        }
        n = Math.floor(n / 2)
    }
    res = res.split('').reverse().join('');
    return res[k - 1] === '1';
}

console.log(ksetBit(5, 1));

/**Approach 2
 * 
 * Lets try and find a number whose kth bit is a set bit and rest is unset that means whose kth bit is 1.
 * So for example if we are given k = 1, that is try and find a number whose first bit is set rest is unset.
 * 
 * So 
 * 
    *     16 8 4 2 1     -> these are the value representation at various bits 
    * 
    * if we are saying that k = 1 that means that number value whose 1st bit is set and rest is 0 will be 
    * 
    *    16 8 4 2 1
    *     0 0 0 0 1     the number is 1.
    * 
    * Similary if we wish to get a number whose k = 3 that is 3rd bit is 1 rest is 0, it will be 4.
    * 
    * So we want to take out the power of 2 such that 2^ k-1
    * 
    * if k = 1 its 2^0 = 1
    * if k = 2 its 2^1 = 2
    * if k = 3 its 2^2 = 4
    * 
    * So power of 2 raised to power k-1 can be driven via 1 << k-1.
    * 
    * Now we found the number. Lets consider the given number that is 5 so 5 can be written as 
    * 
    * 1 0 1
    * 
    * Its (&) with the obtained number that is 1 will be
    * 
    *    1 0 1
    * &  0 0 1
    * 
    * eventually its gonna give some value which is not zero.
    * 
    * Now consider an example of (5,2), that is 2nd set bit , this number we will obtain number 2 lets do a (&)
    * 
    * 5 -> 1 0 1
    * 2 -> 0 1 0
    * 
    * Eventually if the set bit of the given number is not 1, it will be a 0 after (&) opeartion.
    * 
    * Thats what we gonna use in this algo.
    * 
 */
function ksetBit(n, k) {
    let a = 1 << k - 1;
    if ((a & n) === 0) return false;
    return true;
}

/**Using right shift
 * 
    * 5 -> 000000....101
    * k= 3
    * 
    * so right shift 5 by k-1 bits 
    * 
    * 0000000.....001
    * 
    * after this operation the kth bit will become the least significant bit.
    * 
    * Now just do a and with 1 if ans if 1 its true else false.
    * 
    * 
 */

function ksetBits(n, k) {
    n = n >> k - 1;
    if ((n & 1) !== 1) return false;
    return true
}

/**Note:
 * 
 *   Now remember one fact , if we are doing right shift by 1, this is equivalent to doing n/2 in terms of bits.
 * 
 *   Lets understand this, say i have a number 5 so its binary is 000000.....101
 *   now if a do 5 >> 1  the binary of the result is 0000000.......010  this is equivalent to 2.
 *  
 *  Now Math.floor(5/2) is also 2. so in the above function instead of right shift by k-1 if a do something like
 *  this is also same as above.
 * 
 * But we prefer bits shifting as its less expensive.
 * 
 *  so n >> 1 ~= Math.floor(n/2)
 *  
 */

function ksetBits(n, k) {
    let i = 1;
    while (i <= k - 1) {
        n = Math.floor(n / 2);
        i++;
    }
    if ((n & i) !== 1) return false;
    return true;
}


