/** This shows how we can find bits representation of any number n */

function bits(n) {
    if (n === 0) return
    bits(Math.floor(n / 2));
    console.log(n % 2);
}