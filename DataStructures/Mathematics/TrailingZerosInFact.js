let x = 100;

/*approach 1: O(n)*/
function trailingZeroFact1(x) {
    x = BigInt(x);
    let fact = 1n, cnt = 0;
    for (let i = x; i >= 2n; i--) {
        fact *= i;
    }
    while (fact % 10n === 0n) {
        cnt++;
        fact = fact / 10n;
    }
    return cnt;
}

/* approach 2: O(log base(5) n),0(1)
Now lets consider the trailing zeroes for 10! so 10! is nothing but 
1 * 2 * 3 * 4 * 5 * 6 * 7 * 8 * 9 * 10
So if we look at the prime factorization of 10! it can be written as

1 * 2 * 3 * (2*2) * 5 * (2*3) * 7 * (2*2*2) * (3*3) * (2*5)

Now a zero will appear as trailing zero in a factorial only by the pair of (2,5) as it will result in 10.
So eventually the number of trailing zeroes will be the count of pair of (2,5) in the prime factorization of the factorial of number.

However if we take a closer look the number of 2's will always be greater than than the 5's so in order to form a pair of (2,5), since 
we are sure that 2's are greater than 5 thus lets only count the number of 5's in the prime factorization of the factrorial of the no.

lets say for 5! its prime factoriaztion looks like

1* 2 * 3 * (2*2) *5 so there is only one 5 so if we divide n/5 we get count of 5 as one and thus number of trailing zeroes in 5! is 1.
However lets take a case of 25! here we will come across a number is 25 whose prime factrorization include 2 5's i,e 5*5.

Thus we have to take these numbers into consideration and therefore the generalized formula will be

[n/5]+[n/25]+[n/125]...........  (floor of n/5 )+ (floor of n/25) .....

This is the algorithm.
*/
function trailingZeroFact2(x) {
    let i = 5, cnt = 0;
    while (i <= x) {
        cnt += Math.floor(x / i);
        i = i * 5;
    }
    return cnt;
}

console.log(trailingFactZeroes(x));
