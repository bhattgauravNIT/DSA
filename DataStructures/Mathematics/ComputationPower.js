/**The problem is to find the power p for any given number num */

/**Approach 1: 0(p),0(1) */
function power(num, p) {
    if (num === 0) return 0
    let i = 0, pow = 1;
    while (i <= p) {
        pow *= num;
        i++
    }
    return pow;

}

/**
 * Approach 2 modified : 0(log(n)), 0(log(n))
 * 
 * 
 *              x%2 === 0 -> pow(num,p/2)*pow(num,p/2)
 * pow(num,p) = {
 *               x%2 !== 0 -> pow(num,p-1)*num => pow(num,p/2)*pow(num,p/2) * num
 *
 *  So if p is even example
 * 
 *  2^4 can be written as 2^2 * 2^2
 * 
 *  Similary if p is odd say 2^3 we can write it as 2^2 * 2
 *  
 *  now if p is odd it means pow(num,p-1)*num, 
 *  p-1 will always be even as p was odd so it means we are computing for even power in case of pow(num,p-1)
 * 
 *  which can be written as pow(num,p/2)*pow(num,p/2)*num
 * 
 *  thus the overall sceanario make one recursive call to pow(num,p/2) and store it in temp. 
 *  If p is odd return temp*temp*num
 *  else return temp
 * 
 *  Base case
 *  If num === 0 return 0 beacuse any power of 0 is zero
 *  if(p === 1) return num beacuse 1 power of any number is num itself
 *  if(p===0) return 1 as power 0 of any number is 1. 
 *  
 */

function power1(num, p) {
    if (p === 1) return num;
    if (p === 0) return 1;
    if (num === 0) return 0;

    let temp = power(num, Math.floor(p / 2));
    temp *= temp;
    if (p % 2 === 0) {
        return temp
    } else {
        return temp * num;
    }
}

/**Approach 3 0(log(n)),0(1)
 * 
 * This alogo works on the basis suppose we are computing num^p
 * Example
 * 
 * 3^5 Let's take binary represntation of power 5 so it will be
 * 
 * 1 0 1 
 * 
 * consider this reprsents something like
 * 
 * 4     2       1             Corresponding value of power of 2 from left bit to right bit ex: left most is 2^0 -> 1 . then 2^1 and so on.
 * 1     0       1             -> Binary of 5
 * 
 * 
 * Now by looking at above we can say that 3^5 = 3^4 + 3^1
 * 
 * This means all the bits where 0 is happening is useless to us as for breaking the power into smaller parts
 * like 3^5 = 3^4 + 3^1 we are considering only values corresponding over bit === 1.
 * 
 * So while computing the bit of power in case where bit is one, calculate the corresponding power of num- like for left most bit which is one, the value should be 
 * 3^1 or 3, similarly at the next bit which is 0 it will not contribute as justified via 3^5 = 3^4 + 3^1, now at right most bit which is 1 again the value should be 
 * 3^4 or 3*3*3*3.
*/

function power3(num, p) {
    let res = 1;
    while (p > 0) {
        if (p % 2 !== 0) {
            res *= num
        }
        num = num * num;
        p = Math.floor(p / 2);
    }
    return res;
}
