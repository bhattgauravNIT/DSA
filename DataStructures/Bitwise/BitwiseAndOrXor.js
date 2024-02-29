/**Bitwise Operators which works on binary representation of numbers and also provide a number.
 * 
 * 1. Bitwise and (&)
 * (gives one when both of the bit operated upon is 1)
 * 0 0 -> 0
 * 0 1 -> 0
 * 1 0 -> 0
 * 1 1 -> 1
 
 * 2. Bitwise or (|)
  (gives one when any of the bit operated upon is 1)
 * 0 0 -> 0
 * 0 1 -> 1
 * 1 0 -> 1
 * 1 1 -> 1
 
 * 3. Bitwise XOR (^)
  (gives 1 if bits are different)
 * 0 0 -> 0
 * 0 1 -> 1
 * 1 0 -> 1
 * 1 1 -> 0
 * 
*/

/** O/p is 1 7 6  */
function operator(a, b) {
    console.log(a & b);
    console.log(a | b);
    console.log(a ^ b);
}

operator(3, 5);