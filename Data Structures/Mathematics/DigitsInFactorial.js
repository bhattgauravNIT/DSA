/**Given a very high num find the digits in the factorial of num */

/** The floor value of the logarithm base 10 of a number, increased by 1, gives the count of digits present in that number.
 * 
 * So for digits in n! it means that
 * 
 *  floor(log(n!))+1 is the answer.
 * 
 * say 3!
 * 
 * so digits will be floor(log(3!))+1;
 * now 3! = 3*2*1, therefore we can write
 * 
 * digits will be floor(log(3*2*1)) + 1;
 * 
 * Now log(3*2*1) = log(3)+log(2)+log(1) so lets call it res.
 * 
 * res = log(3)+log(2)+log(1);
 * 
 * digits = floor(log(res))+1;
 */
digitsInFactorial(N)
{
    if (N === 1 || N === 0) return 1;
    let i = N, res = 0;
    while (i > 0) {
        res += Math.log10(i)
        i--;
    }
    return Math.floor(res) + 1;
}