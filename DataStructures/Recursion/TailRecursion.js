/**If once the child call is complete & the pointer is now passed to the parent , the parent call has nothing to do but again to pass the
 * pointer to it's parent call.
 * 
 * Such recursive calls or functions are tail recursive.
 * 
 * Lets consider example
 */

/**Here we have two functions one is to print 1 to N wehere as second is to print N to 1
 * 
 * now in the example that is N to 1 its tail recursive.
 * Lets understand why, lets do a dry run for n =3
 * 
 * printNto1(3)  -> 3
 *            printNto1(2)   -> 2
 *                      printNto1(1)   -> 1
 *                                 printNto1(0)
 * 
 * Now base case is reached so it returns the pointer to its parent which is printNto1(1), now this parent has nothing else to do 
 * as its responsibility was to print 1 which it has already done, so it again gives control back to printNto1(2), which does the same and gives
 * control back t0 printNto1(3).
 * 
 * Thus is a example for tail recusrion.
 **/
function printNto1(n) {
    if (n === 0) return;
    console.log(n);
    printNto1(n - 1);
}


/** 
 * 
 * Lets consider print1toN(3)
 *                          -print1toN(2)
 *                                     -print1toN(1)
 *                                                -print1toN(0)
 * 
 * Now once base case is reached the pointer is passed to parent which is print1toN(1) now it has to do console.log(1) & then it will complete
 * after that it will give pointer back to its parent which is print1toN(2) , which now has to print console.log(2) & then it will be completed
 * similary than it will give pointer back to print1toN(3) which will then print 3.
 *            
 */

function print1toN(n) {
    if (n === 0) return
    print1toN(n - 1);
    console.log(n)
}

/**The reason why tail recusion is faster than the non tail recursion is beacuse in case of tail recursion modern compilers somehow converts
 * the last recusion call to iterative way and thus the state of the function need not to be saved and thus its faster.
 */

function fact(n) {
    if (n === 0 || n === 1) return 0
    return n * fact(n - 1);
}

/**This is not a tail recusion although it may seem that a recursion call is happening at the end, because once the child call is complete
 * the parent call has to do n* (value from the child call) and thus can not immediately return the pointer back to its parent call
 * thus its not a tail recursion.
 */

/**Lets try to find a way to convert this fib function into a tail recusion.
 * 
 * This has become tail recursion now, lets understand it with 3.
 * 
 * fact(2, 3*1)
 *             - fact(1, 2*(3*1))
 * 
 * Once a base case is reached the child retuns 6 to parent , parent has nothing to do, returns back 
 * 
 * retsult is 6 which is 3!. 
 */

function fact(n, k) {
    if (n === 0 || n === 1) return k;
    return fact(n - 1, n * k);
}

fib(3, 1);

