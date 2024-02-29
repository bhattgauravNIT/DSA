/**Given a number count the set bits in the binary representation of that number.
 * 
 * Set bits are the bits with value 1.
 */

/**Approach 1 : O(log(n)) or 0(digits bits in n), O(1)
 * 
 * Simply check if bit is 1 increment the counter.
*/
function setBits(n) {
    let cnt = 0;
    while (n > 0) {
        if (n % 2 !== 0) {
            cnt++;
        }
        n = Math.floor(n / 2);
    }
    return cnt;
}

console.log(setBits(13));

/**Approach 2 0(number of bits till set bit is 1 from least significant to most significant bit):
 * 
 *Here is similar to above however its a little bit fast as we are dealing with bits here
 * Suppose we want to take out number of set bits for 5.
 * that is 0000....101
 * Now if we do a and with 1 that is
 * 
 *    000000....101
 *   &000000....001
 * 
 * it will be one so if the least significant bit is 1 its (&) operation with 1 is gonna yield 1.
 * Now we increment the counter.
 * Now lets move the bits to check for second most least significant bit. so we do n = n/2, so numnber becomes 2.
 * 
 * 2 -> 00000....010
 *     &00000....001
 * 
 * its 0 so least significant bit is not zero.
 * 
 * This is the algo.
 */

function setBits1(n) {
    let cnt = 0
    while (n > 0) {
        if (n & 1 === 1) cnt++;
        n = Math.floor(n / 2)
    }
    return cnt;
}

/**Approach 3 : (0(number of set bits))
 * Brian Kremingham algo
    * Suppose we have 40 so the binary representation of 40 is 
    * 40 -> 101000
    * If somehow we make all the set bits as 0 one by one so the number of times we made a set bit as zero will be the total number
    * of set bits in a number.
    * 
    * Now for 40 , if we look at binary representation of 39 so its
    * 
    * 39 -> 100111
    * 
    * lets do & of 40 & 39
    * 
    * 40 -> 101000
    * 39 -> 100111
    * 
    * O/p-> 100000
    * 
    * Now if you will take a closuree look at the o/p after doing & operation of a number n with n-1, all the trailing bits of 
    * the number n has become 1 till the first set bit and the first set bit from lsb to msb of n has become zero.
    * 
    * So 
    * 
    *  40 -> 101000
    * &39 -> 100111
    * o/P is 32 -> 100000
    * 
    * again 32-> 100000
    * & 31 ->    011111
    * o/p is 0
    * 
    * Now all the set bits are zero and we perfomred this twice thus answer is 2.
 */

function setBits2(n) {
    let cnt = 0;
    while (n > 0) {
        cnt++;
        n = n & (n - 1);
    }
    return cnt;
}

