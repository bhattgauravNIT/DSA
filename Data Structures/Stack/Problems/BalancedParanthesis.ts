/**Given 6 chars which can be in any order:
 * 
 * ()[] and {}
 * 
 * the problem is to find whether the given string which consists of only
 * these chars is a balanced paranthesis or not.
 * 
 * For ex: 1. ((())) o/p true;
 *         2. {}[()] o/p true;
 *         3. {[(])} o/p is false;
 *         4. ([)] o/p is false
 */

/**Approach: 0(n),0(n)
 * 
 * The idea is simple lets maintain two arrays one for opening brackets and one for closing
 * brackets.
 * let opening: string[] = ['(', '{', '['];
 * let closing: string[] = [')', '}', ']'];
 * 
 * Now while traversing through the string if we found a opening bracket simply
 * push it into stack .
 * 
 * Say for example:
 * 
 * ([]){}
 * 
 * So push in stack [           (             ]
 * 
 * Now again a opening bracket so push in stack    [           '(', '['          ]
 * 
 * Now we see a closing bracket we can identify if a bracket is a opening or a closing bracket via checking
 * if it exists in array of opening brackets or not.
 * If opening.indexOf(str[i]) !== -1 means its not present in opening bracket thus its a closing bracket.
 * 
 * So we found that ']' i=2 is a closing bracket.
 * 
 * Now if this string is balanced meaning there should be opening and closing of same bracket type
 * in case we are encountering a closing brac.
 * Thus at top of stack it should have a opening brac of same kind.
 * 
 * So now we pop from stack (we get opening brac)
 * and we find the index of this opening brac in opening arr and then cross check
 * that in the closing brac arr at that index is closing[index] = str[i].
 * 
 * Beacuse we keep opening and closing brac of same kind at same index in opening and closing array.
 * So closing[index] corresponds to opening kind of that in opening arr.
 * 
 * If these matches meaning ex: {} matches then we pop from stack.
 * If this doesnot matach ex: {]
 * 
 * Then we immediately return false.
 * 
 * If in case after overall travesal of string we found that the stack is not empty 
 * this means that the string is not balanced.
 * 
 * Ex: ((())

 */
function isBalanced(str: String): boolean {
    let stack: string[] = [];
    let opening: string[] = ['(', '{', '['];
    let closing: string[] = [')', '}', ']'];

    for (let i = 0; i < str.length; i++) {
        if (opening.indexOf(str[i]) !== -1) {
            stack.push(str[i]);
        } else {
            let current = stack[stack.length - 1];
            let index = opening.indexOf(current);
            if (closing[index] === str[i]) {
                stack.pop();
            } else {
                return false;
            }
        }
    }
    return stack.length === 0;
}
