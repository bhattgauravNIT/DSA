/**Bitwise Operators which works on binary representation of numbers and also provide a number.
 * 
 * Negation operator (~)
 * 
 * Say x = 5 , so bitwise of 5 is 00....101    ~ Considering 32 bits in total if its a 32 bit representation.
 * if we do (~5) then it will invert all the bits of x that is 11...010
 * 
 * x = 5 ->   00....101
 * ~x = -6 -> 11....010
 * 
 * Now key point:
 * 1. If the most significant bit is 1 (that is left most extreme considering 32bits than the 0th index bit), then it will be a
 * negative number.
 * now you can say 5 binary representation is 101 but its not negative. 
 * So if we are represeting it in a 32 bit env then 101 is actually 000000000.....101 and thus the most significant bit is not 1.
 * 
 * 2. How we got to know that ~5 was eqaul to -6.
 * 
 * So 
 * 
 * 5 -> 00....101
 * 
 * Now lets suppose we have a number with bits representation as all 1 in 32 bit env.
 * 
 * 111111.......1111 -> Then this number is 2^32 - 1.
 * Now if we invert one 1 from this number subtract the position value from where one is inverted ex:
 * 
 * 11111........1100 -> This is number 2^32 - 1 -3 i,e 2^32 - 4. So it represents -4.
 * 
 * 0 at left most cooresponds to value 1 , then next to that will correspond to 2, next to that will correspond to 4, then 8 ....
 * 
 * So for ~5 binary representation is 11....010
 * Value is 2^32 - 1 - 5 = 2^32 - 6 = -6 in 32 bits env.
 * 
 * 
*/

function func(x) {
    console.log(~x);
}

/**Left shift operator
 * 
 * Say we have a number -1 so its binary represenation is 
 * 
 * 1111.....1111    (32 bits).
 * Now if you left shift by 1 ie -1 << 1
 * This means we are left shift the bits by 1 place and thus the most significant bit will be removed and everthing will be shifted
 * by 1 and the least significant bit will now be 0 so
 * 
 * 1111......1110 (this is left shifted by 1). Now if we calculate the value its 2^32 - 1 -1 i,e 2^32 - 2 =~ -2
 * 
 * So we can generalize it as 
 * 
 * if any number x is left shifted by y its value will be equivalent to 
 * 
 *   (x * 2^y)
 * 
 *  Ex: when -1 is left shifted by 1 i,e -1 << 1 its 
 *   -1 * 2^1 = -1 * 2 = -2.
 */

function func(x, y) {
    console.log(x << y);
    // O/p is x* 2^y
}
