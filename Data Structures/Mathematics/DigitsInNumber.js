/*The problem is to find the number of digits for a given input*/
let x = 789;

/*approach1*/
function func1(x) {
    let str = x.toString();
    return str.length;
}

/** Math.floor round to down integer
 *  whereas math.round round to up integer , 
 * math.ceil rounds to nearest integer */

/*approach2 - O(digits(x))*/
function func3(x) {
    x = BigInt(x);
    let cnt = 0
    while (x > 0n) {
        cnt++
        x = x / 10n;
    }
    return cnt;
}

console.log(func3(987654323456789))

/** BigInt datatype is used for more precision & accuracy in js */

/**Approach 3 0(1), 0(1)
 * 
 *  The floor value of the logarithm base 10 of a number, increased by 1, gives the count of digits present in that number.
 */

function countDigits(num) {
    let x = Math.log10(num);
    return Math.floor(x) + 1
}
