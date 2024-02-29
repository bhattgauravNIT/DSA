/**Right shift operator are of two types, signed and unsigned
 * 
 * Signed right shift operator: (>>)
 * 
 * It takes care of the sign if we are shifting a postive number even after shifting the number
 * will remain positive and if we are shifting a negative number the sign of the number will not be affected.
 * 
 * So in conclusion a signed right shift operator will retain the sign .
 * 
 * Negative number shifting with signed right shift:
    *  ex -x >> 1 or x >> 1;
    * 
    * say we want to right shift -1 by 1 i,e -1 >> 1.
    * 
    * So -1 in 32 bit env is represented as 
    * 
    * -1 -> 11111....1111
    * 
    * Now right shifting by 1 i,e -1 >> 1 means everthing will be right shifted by 1 and beacuse the number is negative therefore the
    * most significant bit will be replaced with 1 only.
    * 
    * so resultant will be again 1111....111111.
    * 
    * Lets take another example say we want to right shift -2 by 1 i,e -2 >> 1
    * 
    * -2 -> 11111.......110
    * 
    * lets right shift with 1
    * 
    * 111111.....11111 that is 2^32 -1 so o/p is -1.
 * 
 * Positive number shiting with signed right shift:

    * It shifts the bits towards right while making the shift bits as 0 inserted towards most significant bits there fore retaining
    * the sign of positive numbers.
    * 
    * Ex: 3 >> 1
    * 3 -> 000000...011
    * 
    * right shifting by 1
    * 
    * 000000...01 that is 1
 */

function rightShiftSigned() {
    console.log(-2 >> 1)
    console.log(3 >> 1)
}

/**Unsigned right shift operator (>>>) 
 * 
 * Irrespective of whether the number is positive or negative its gonna shift the bits towards rights while inserting
 * 0's towards the most significant bits side.
 * 
 * ex: -2 >>> 1
 * -2 -> 111111....10
 * right shifting the bits by 1
 * 
 * 011111....11 -> 2^31-1.
 * 
 * Lets understand how this is 2^31 -1 .
 * if 1111...1111 in 32 bits system its 2^32 -1 
 * Now the most significant bit is 0 that means its 2^31-1.
 * 
 * Lets right shift by 4, that is -2 >>> 4
 * 
 * -2 -> 1111....0010
 * right shift by 4 is 
 * 0000.....1111    -> 2^28-1
 * its 2^28 -1 by same logic as above.
*/

function unsignedRightShift() {
    console.log(-2 >>> 1);
    console.log(-2 >>> 4);
    console.log(2 >>> 4);

}

