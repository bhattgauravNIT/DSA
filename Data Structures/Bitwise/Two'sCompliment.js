/**In order to store a negative number we can use 1's compliment or 2's compliment or signed bit represenation .
 * 
 * However 2's compliment is most popularly used as 
 * Two's complement allows negative and positive numbers to be added together without any special logic in cpu.
 * 
 * if we are saying about say -2.
 * 
 * So in signed bit representation -2 is written as:
    * 
    * -2 -> 111111....10
    * 
 * However if we wish to find the 2's compliment of -2 than first write for 2: (considering say some 4 bit env and not 32 bit)
    * 
    * 2 ->   0010
    * Now invert all the bits 
    * 
    *  1101
    * 
    * Now add 1
    *   1 1 0 1
    * + 0 0 0 1
    * 
    *   1 1 1 0     
    * 
    * Right most 1, 1 is 0 and we give carry 1 to next which is 0,0 is 0 but with carry of 1 it becomes 1. 1,0 is 1 and again 1,0 
    * is 1.
    * 
    * so 1110 which represents 14.
    * 
    * There is also a direct formula to find 2's compliment which is (2^n - x) where n is the bit in env and x is the value whose 2's
    * compilment need to be taken out.
 *   
 */

function twoCompliment(num, env) {
    num = Math.abs(num);
    num = BigInt(num);
    env = BigInt(env)
    return (1n << env) - num
    // 1n << env => 1* 2^env => 2^env
}

console.log(twoCompliment(-2, 4));