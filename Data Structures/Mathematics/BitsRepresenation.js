/**Given a number num compute its binary representation */

/**Approach: 0(log(n)),O(1)
 * 
 * So lets take example of 10 its binary representation is 1010 i,e 
 *  10 = 0 * 2^0 + 1 * 2^1 + 0 * 2^2 + 1 * 2^3, i,e traversing bits from left to right or from lowest set bit to max set bit.
 *  so keep making n=n/2 and keep checking if n%2 ===0 bit is 0 else bit is 1.
 * 
 * or 
 * 
 * say for 5 then if we look at values at corresponding bits than it is
 * 
 *                  ...... 16 8 4 2 1
 * 
 * So if we want to formulate 5 than 
 * 
 * ...... 16 8 4 2 1
 * ...... 0  0 1 0 1
 * 
 * that means if n is divided by 2 then 0 else 1;
 * 
*/

function bits(num) {
    let bits = [];
    while (num > 0) {
        if (num % 2 === 0) {
            bits.unshift(0)
        } else {
            bits.unshift(1);
        }
        num = Math.floor(num / 2);
    }
    return bits
}