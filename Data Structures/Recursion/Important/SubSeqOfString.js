/**Given a string str , generate all of its subsequences/subsets.
 * 
 * Ex: str = "abc"
 * All subsequence of str are:    "", "a","b","c","ab","bc","ac","abc".
 * So all subsequence are 2^(length of string) in number.
 * 
 * Power set does not include " "(empty string) and thus its equivalent to 2^(length of string)-1;
 */

/**Approach 1: Recursion
 * 
 * The subsequence is 2^3 beacuse there were 3 chars in string _ _ _ now each position has 2 choises either to select them or to reject them,
 * thus its 2^3.
 * 
 * lets take example of str = 'abc' we need to find all the sub sequences of this str.
 * Now, consider an empty string and a index in initial
 * 
 * |
 * abc
 * Initially pointer is at 0 i,e 'a'
 * Now to this empty string there can be two choises either to select the char or to not select the char
 * 
 *                                               " "
 *                                           " "      a
 * 
 * So once we not selected a and then we selected a, in both the cases both scenario is meet thus now my index should be incresed to 1.
 * 
 *  Now again for index=1, i,e 'b' there are two choises either to select it or to not select it
 *                                            
 *                                             " "
 *                                       ""          a
 *                                    ""   b         a  b
 * 
 * Again once we have selected b and once we have not selected b , in both sceanrio the condition for position 1 is completed so we increased
 * the index to 2. again we can select c or we can un select c , after both conditions are meet, increase the index so index becomes 3.
 * 3 === length of string and since the number of subsequence can only be 2^3, and on every position we are meeting 2 condition thus this is
 * the base case.
 * 
 * Once index === length , print the current string which was initially empty.
 */

/**Approach: O(2^n),O(2^n): Recursive */
function subSequence(str, current = '', index = 0) {
    if (index === str.length) {
        console.log(current);
        return
    }
    // condition to not consider a char at index
    subSequence(str, current, index + 1);
    // condition to consider a char at index
    subSequence(str, current + str[index], index + 1);
}

subSequence('abc');

/**Approach 2: 0(2^n * n), O(1)
 *  
 * Bitmagic:
 * All the power set of a given string str is 2^(length of string);
 * 
 * 
 * abc -> a,b,c,ab,bc,ac,abc "".
 * 
 * Now since power set is 2^3 = 8
 * 
 * 0   -> 000    
 * 1   -> 001 
 * 2   -> 010
 * 3   -> 011
 * 4   -> 100
 * 5   -> 101
 * 6   -> 110
 * 7   -> 111
 * 
 * Now lets traverse the bits from left to right considering the least significant bit as indexed 0 and so on .
 * j = 0 -> str.length  (this many bits will be present)
 * Check if every jth bit is set or not. If it is set this means that str[j] is a part of of the subsequence else not.
 * 
 * 0 1 2                  
 * a b c
 *          
 *        210
 * 0   -> 000    : ""         
 * 1   -> 001    : a
 * 2   -> 010    : b
 * 3   -> 011    : ab
 * 4   -> 100    : c
 * 5   -> 101    : ac
 * 6   -> 110    : bc
 * 7   -> 111    : abc
 * 
 * 
 * 011
 * 010
 * 
 * 
*/

function subSequence(str) {
    let p = 1 << str.length;
    let i = 0, j = 0, temp = '';
    while (i < p) {
        while (j < str.length) {
            let q = 1 << j;
            if ((i & q) !== 0) {
                temp += str[j];
            }
            j++;
        }
        console.log(temp);
        temp = '';
        j = 0;
        i++;
    }
}

subSequence('abc');

