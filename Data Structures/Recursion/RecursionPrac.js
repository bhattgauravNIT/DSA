/**Prac 1: 
 * 
 * O/p is 3
 *        2
 *        1
 *        1
 *        2
 *        3
*/

function fun1(n) {
    if (n === 0) return
    console.log(n)
    fun1(n - 1);
    console.log(n)
}

function fun() {
    fun1(3);
}

fun();

/**Prac 2 
 * 
 * O/p is 1 
 *        2
 *        1
 *        3
 *        1
 *        2
 *        1
*/

function fun1(n) {
    if (n === 0) return
    fun1(n - 1);
    console.log(n)
    fun1(n - 1)
}

function fun() {
    fun1(3);
}

fun();



