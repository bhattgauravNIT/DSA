/**Given a number n, find the square root of n, if there exist no definite square root, return the floor of
 * square root.
 * 
 * Ex; n=4 0/p is 2.
 * n=7 0/p is 2.
 * 
 */

/**Approach1: 0(sqrt(num)),0(1)*/
function squareRoot(num) {
    if (num === 0) return 0;
    let i = 1;
    while (true) {
        if (i * i === num) {
            return i;
        } else if (i * i > num) {
            return i - 1;
        }
        i++;
    }
}

/**Approach: 0(log(num)),0(1)
 * 
 * The idea is simple say num=10
 * so we take into consideration 
 * 1,2,3,4,5,6,7,8,9,10
 * 
 * initailly low is 1 and high is 10, now lets find out mid which is 5.
 * Mid*mid = 25 which is >10 thus every number greater than mid if squared will also be greater than 10, thus
 * the searching window should be from 1 to 5. i,e high=mid-1.
 * 
 * If(mid*mid===num) then eventually mid is the answer.
 * 
 * Now coming to the part where mid*mid<num.
 * Ex: In out case 2,3 are all potential candidates as 2*2< 10 and 3*3 < 10.
 * So we store them as potential answer and still search for window greater than that element via  low=mid+1.
 * Its somewhat similar to finding the last occuernce of an element.
 */
function squareRoot1(num) {
    if (num === 0) return 0;
    let low = 1, high = num, res = 0;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let midsq = mid * mid;
        if (midsq === num) {
            return mid;
        } else if (midsq > num) {
            high = mid - 1;
        } else {
            res = mid;
            low = mid + 1;
        }
    }
    return res;
}
