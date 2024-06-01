/**Given a string containing english small case alphabets a-z as operands and some operators like
 * +,-,^,*,/ and bracket () may or may not as a InfIx expression.
 * 
 * The task is to convert this infix expression into a postFix expression.
 * 
 * Ex: inFix = "a+b*c" o/p "abc*+"
 * 
 * So in order to convert a InFix to a postFix we need to check the precendence and associativity.
 * Clearly above * has greater precedence than + so it can be written as 
 *  a+ (b*c)
 *  Now we need to convert in postFix so lets consider a as first operand then a operator + and (b*c) as second
 * operand thus we can write it as for postFix 
 * 
 * a + (bc*)  i,e converting second operand to postFix and overall now we can write it as
 * 
 * o/p -> abc*+
 * 
 * ex: str = "a^b^c"  o/p : "abc^^"
 * 
 * 1. Precedence is same so lets consider associativity Right tio left: "a^(b^c)"
 * 2. PostFix for inner operand: "a^(bc^)"
 * 3.PostFix for overall: "abc^^""
 * 
 * ex: "(a+b)*c"  o/p: "ab+c*"
 * Now a bracket is already given meaning we need to consider this on priority.
 * 
 * 1. Inner priorty to postFix: "(ab+)*c"
 * 2.Overall postFix:    "ab+c*"  (considering ab+ as first operand and c as second operand and * as infixed operator
 * between them)
 * 
 * ex: ((a+b)*(c+d)) o/p : "ab+cd+*"
 * Now brackets to take them as priorty over operator precedence or associativity: 
 * 
 * Make inner priorty brackets converted to postFix: ((ab+)*(cd+));
 * Convert overall exp to postFix: "ab+cd+*"
 * 
 * Ex: a+b*(c-d) ~= a+b*(cd-) ~= a + bcd-* ~= abcd-*+;
 * First bracket priority convert to postfix ~=  a+b*(cd-)
 * Second * has higher precendence so convert to postFix ~= a + bcd-*
 * Third convert overall exp: abcd-*+;
 * 
 * Ex: a+b*c/d+e
 * 
 * a+b*c/d+e ~= a + (b*c)/d + e ~= a + (bc*)/d + e ~= a + (bc*d/) + e ~= abc*d/+ + e ~= abc*d/+e+
 **/

/**Approach: 0(n),0(n)
 * 
 * So algo is as follows:
 * 
 * If we get anything apart from characters:
 *  If stack is empty then push into stack.
 *  If we get a opening brac push to stack.
 *      If we get a closing brac then keep poping from stack and insert to res till we find a opening brac.
 *  If we get a operator say +,- etc.
 *  Check prioprity of str[i] , 
 *      if str[i] priority is more than current stack top then push to stack. 
 *      if str[i] priority is less than stack top than keep poping from the stack till str[i] priority is less than stacktop 
 *              priority.
 *      push to stack in last.
 *     if str[i] priority is equal to that of stack top element 
 *        then check for associativity. 
 *        If associativity is LHR then its a case of less priority for str[i] thus above algo portion only.
 *        If associativity is RHL then simply push to stack.
 * 
 * Note:  If associativity is LHR then its a case of less priority for str[i] beacuse the operator which has come firt in last
 * is prior thus its prefrence should be considered more .
 * 
 * Recheck this code for a+b*c/d+e case.
 * 
 */

function infixToPostFix(str: string): string {

    const m = [
        { 'char': '^', 'p': 3, 'a': 'RTL' },
        { 'char': '*', 'p': 2, 'a': 'LTR' },
        { 'char': '/', 'p': 2, 'a': 'LTR' },
        { 'char': '+', 'p': 1, 'a': 'LTR' },
        { 'char': '-', 'p': 1, 'a': 'LTR' }
    ];


    const operators: string[] = ['^', '*', '/', '+', '-'];
    const braces: string[] = ['(', ')'];

    let stack: string[] = [];
    let postFix = ''

    for (let i = 0; i < str.length; i++) {
        if (operators.indexOf(str[i]) !== -1 || braces.indexOf(str[i]) !== -1) {
            let charPriority = m.find((val) => val.char === str[i])?.p ?? 0;
            if (stack.length === 0) {
                stack.push(str[i]);
            } else if (braces.indexOf(str[i]) !== -1) {
                if (str[i] === '(') {
                    stack.push(str[i]);
                } else {
                    while (stack[stack.length - 1] !== '(' && stack.length !== 0) {
                        postFix += stack[stack.length - 1];
                        stack.pop();
                    }
                    stack.pop();
                }
            } else if (operators.indexOf(str[i]) !== -1) {
                let stackTopPriority = m.find((val) => val.char === stack[stack.length - 1])?.p ?? 0;
                if (charPriority > stackTopPriority) {
                    stack.push(str[i]);
                } else if (charPriority < stackTopPriority) {
                    while (charPriority < stackTopPriority && stack.length !== 0) {
                        postFix += stack[stack.length - 1];
                        stack.pop();
                        stackTopPriority = m.find((val) => val.char === stack[stack.length - 1])?.p ?? 0;
                    }
                    stack.push(str[i]);
                } else {
                    //Recheck this portion when priority is same for stackTop and str[i].
                    let associativity = m.find((val) => val.char === str[i])?.a ?? '';
                    if (associativity === 'LTR') {
                        let stackTopPriority = m.find((val) => val.char === stack[stack.length - 1])?.p ?? 0;
                        while (stackTopPriority === charPriority && stack.length !== 0) {
                            postFix += stack[stack.length - 1];
                            stack.pop();
                        }
                    }
                    stack.push(str[i]);
                }
            }
        } else {
            postFix += str[i];
        }
    }
    while (stack.length !== 0) {
        postFix += stack[stack.length - 1];
        stack.pop();
    }
    return postFix;
}
