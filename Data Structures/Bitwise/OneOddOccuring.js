/**Given an array with all numbers appearing even number of times however there is only one elemnet that appears
 * odd number of times.
 * Find that element.
 * 
 * Ex: [4, 3, 4, 4, 4, 5, 5]
 * Given: There will always be only one number which will appear odd number of times, rest will appear even number of times.
 */


/**Approach 1: O(n), 0(n) 
 * 
 * Use map to store the key,value of pair element,occurence.
 * 
 * If occurence is odd that is the result.
 * 
 * Note:  value & 1 !== 0 ~= value %2 !== 0
*/
function oneOddOccuring(arr) {
    let mp = new Map();
    let i = 0;
    while (i < arr.length) {
        !mp.has(arr[i]) ? mp.set(arr[i], 1) : mp.set(arr[i], mp.get(arr[i]) + 1);
        i++;
    }
    for (let [key, value] of mp) {
        if (value & 1 !== 0) {
            return key;
        }
    }
}

/**Approach 2: 0(n), 0(1)
 * 
 * XOR opeartor yields 1 if there are different bits and it yields 0 if there are same bits.
 * 
 * [2,8,2,8,8],
 *  here 8 is occuring odd times and 2 is occuring even times.
 * 
 * Now x ^ 0 = x;
 *     x ^ x = 0
 * 
 * So if two numbers are same all its bits is same and thus xor will yield 0, and if we do a xor of 0 with x, it will give x.
 * 
 * Lets dry run on the above array.
 * 
 *  2^8^2, stop see we have two two's thus x ^ x will be 0 =>
 *  0^8 , => 8, continue
 *  8^8   => stop see we have two two thus x ^ x will be 0 , continue
 *  0^8   => o/p is 8
 * 
 * So in generalized we can say than if we do xor of even occuring elemnets, its results in 0, else if we do xor of odd occuring elements in results in element itself.
 */

function oneOddOccuring1(arr) {
    let xor = 0;
    for (let i of arr) {
        xor = xor ^ i;
    }
    return xor;
}
