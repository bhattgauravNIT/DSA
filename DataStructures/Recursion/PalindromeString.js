/**Given a string , state wether its a plaindrome string or not
 * 
 * Ex: nitin : Yes
 */

/**Approach 1: O(n),O(n) */
function stringPalindrome(str) {
    let rev = str;
    rev = rev.split('').reverse().join('');
    return rev === str
}

/**Approach : 0(n),0(n): Recursion 
 * 
 * Ex: nitin
 * 
 * We are considering the fact that if for any string str[0] === str[str.length-1] then lets recursively check for sub strings 
 * from s[1] to s[n-2];
 * 
 * n i t i n
 * 
 * first & last index char is same so check for substring from index 1 to n-2 (considering 0 based indexing), 
 * if that is also fine then again check for smaller substring.
 * 
 * Now fun('nitin')
 *          - fun('iti')
 *                 - fun('t')
 * 
 * Base case is in case of odd length string the last substring will be of length 1 and any string of length 1 is a plaindrome.
 * 
 * In case of even length ex: cabbac
 * 
 * fun('cabbac)
 *          - fun(abba)
 *                 - fun(bb)
 *                       -fun('')
 * 
 * In last case we will get a empty string and a empty string is also palindromic.
 * 
 * This is the algo of recursion.
*/
function stringPalindrome(str) {
    if (str.length === 0 || str.length === 1) return true;
    if (str[0] === str[str.length - 1]) {
        return stringPalindrome(str.slice(1, str.length - 1))
    }
    return false;
}

/**Another way of writing this is recusion is */

function stringPalindrome(str, start, end) {
    if (start >= end) return true;
    return (str[start] === str[end] && stringPalindrome(str, start + 1, end - 1));
}

console.log(stringPalindrome('nitin', 0, 4))

/**Approach 2: 0(n),0(1)
 * 
 * 2 pointer approach
 */
function stringPalindrome(str) {
    let i = 0, j = str.length - 1;
    while (i < j) {
        if (str[i] !== str[j]) {
            return false
        }
        i++;
        j--;
    }
    return true;
}

/**Approach: O(n), O(1) */
function stringPalindrome(str) {
    let rev = '', i = str.length - 1;
    while (i >= 0) {
        rev += str[i];
        i--;
    }
    return rev === str;
}



