/**A function calling itself in a typical scenario is called recusion 
 * 
 * A base case is mandotary in case of recursion.
*/

/**Prac 1: O/p is Yippe
 *                Yippe
*/

function fun1(n) {
    if (n === 0) return
    console.log('Yipee')
    fun1(n - 1);
}

function fun() {
    fun1(2);
}

fun();