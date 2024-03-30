let x = 383;

/*approach 1: O(n) where n is number of digits in x*/
function func(x) {
    let origNum = x;
    let reverse = 0;
    while (x > 0) {
        reverse = reverse * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    return origNum === reverse;
}

console.log(func(121));



