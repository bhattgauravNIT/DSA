let x = 2, y = 3;

/**approach1: 
 * 
 * Use a temp third varibale.
*/
function swap(a, b) {
    let temp;
    temp = a;
    a = b;
    b = temp
}

/**approach2: 
 * 
 * Use mathematical add and subtract operator.
*/
function swap1(a, b) {
    a = a + b;
    b = a - b;
    a = a - b;
}

/**Approach3: 
 * 
 * Use xor operation.
 */
function swap2(a, b) {
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
}
