/**Given a rope of length n, you need to find the maximum number of pieces you can make such that the length of every piece is in set (a,b,c)
 *  for the given three values of a,b,c.
 *  If no such possibility occur return -1.
 * 
 * Ex: Say we have a rope of length 23 and the possible cuts value are 11, 9 ,12.
 * 
    * So we can cut the rope in 2 pieces such that one piece is of length 11 and the other is 12.
    * Apart from this there is no possibility to cut the ropes into pieces of length a or b or c.
    * 
 * Ex: Say length of rope is 5 and the possible cut values are 2, 5, 1.
 * 
    * 1. We can cut the rope in 2 pieces of 2 and 1 piece of 1. Here the smaller ropes made are 3. -> 3
    * 2. We can have a single smaller rope of length 5 as we can cut in length 5.  -> 1
    * 3. We can cut the rope in 5 piece each of length 1. -> 5
    * 
    * So the max possible smaller rope is 5.
 */


/**Approach1
 * 
 * The possible max smaller rope pieces for rope of length 23 with possible cuts as 11,9 and 12 , will be length 2 , one piece of 
 * 11 and other of 12.
 * 
 * Say we have a rope of length 23 which can be cut into piece of length 11, 9 or 12.
 * Lets cut recursively
 *                                                     23
 *                                             12      14     11
 * 
 * So we can cut this 23 length rod by a length 11 or 9 or 12.This yields us a smaller rod of length 12,14 and 11 respectively.
 * Now to these new length and again try and make it smaller by the lengths of 11, 9 and 12.
 * 
 *                                                      23
 *                                           12         14           11
 *                                       1  3   0      3  5  2     0  2 -1
 * 
 * Again
 *                                                      23
 *                                           12         14            11
 *                                       1  3   0      3  5  2      0  2 -1
 *                                     allNegatives    allNegatives   allNegatives
 * 
 * So the max length till leaf where we are getting 0 is the answer.
 * Therefore o/p will be 2.
 * 
 * 
 * if n becomes 0 return 0, if n becomes negative return -1. If n is zero that means its a successful cut and result in piece + 1 where
 * initially pieces is 0 else wise its an unsuccessful cut.
 * 
 * For more info see ../HelperImg/RopeCutting.jpg
 * 
 * 
 */
function ropeCutting(n, a, b, c) {
    if (n === 0) return 0;
    if (n < 0) return -1;
    let res = Math.max
        (
            ropeCutting(n - a, a, b, c),
            ropeCutting(n - b, a, b, c),
            ropeCutting(n - c, a, b, c)
        );
    if (res === -1) return -1;
    return res + 1;
}

console.log(ropeCutting(23, 11, 9, 12))