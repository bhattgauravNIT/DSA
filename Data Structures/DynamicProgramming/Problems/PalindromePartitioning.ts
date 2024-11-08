/**Given a string, the task is to find he min number of cuts needed in order to make all the string portions palindrome.
 * 
 * For ex: str = "geek"
 * o/p: 2.
 * 
 * If we make a cut after g and one after last e , the string will be "g","ee","k" and thus all becomes palindrome.
 * 
 * For ex: str = "abbac"
 * o/p: 1
 * 
 * If we make one cut after last a so we get strings as, "abba","c" which are all palindromes.
 * 
 * For ex: str ="abcde"
 * o/p: 4.
 * We have to make cuts after each character apart from last character so all the strings will be 
 * "a","b","c","d","e" which all are palindrome.
 * 
 * For ex: str = "aaaa"
 * o/p: 0 as the str itself is a palindrome and thus we need not to make any cut.
 * 
 * For ex: str = "abbabbc"
 * o/p: 2
 * 
 * one after first a and one after last c so strings will be
 * "a","bbabb","c" and thus all are palindrome.
 */


/**Approach1: 0(2^n),0(n)
 * str = "geek"
 * 
 * Lets understand the base cases:
 * We start with two pointers one at starting index of the string i,e i and one at ending index of the string i,e j.
 * If this entire substring is already a palindrome, no cuts are needed, so the function returns 0 immediately.
 * 
 * We maintain a res as infinity to calculate the min number of cuts.
 * 
 * We split the string for every substring using a k pointer which loops from i to j
 * We split the string into two substrings i,e from i->k and k+1 to j.
 * 
 * we take min of Math.min(res, 1 + palindromePartitioning(str, i, k) + palindromePartitioning(str, k + 1, j));
 * 1 is added as we made a cut.
 */
function palindromePartitioning(str: string, i: number, j: number) {
    if (isPalindrome(str, i, j)) {
        return 0;
    }
    let res = Number.MAX_SAFE_INTEGER;
    for (let k = i; k < j; k++) {
        res = Math.min(res, 1 + palindromePartitioning(str, i, k) + palindromePartitioning(str, k + 1, j));
    }
    return res;
}

function isPalindrome(str: string, i: number, j: number) {
    while (i < j) {
        if (str[i] === str[j]) {
            i++;
            j--;
        } else {
            return false;
        }
    }
    return true;
}