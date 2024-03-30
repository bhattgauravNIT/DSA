/**Given two independent sorted array which may or may not contain duplicates, find the union of both the array.
 * 
 * Union means get all the elements of the arrays , irrespective of the number of occurence of elements consider it as one.
 * 
 * Ex: arr1=[3,5,8]
 * arr2 = [2,8,9,10,15]
 * O/p [2,3,5,8,9,10,15]
 * 
 * Ex: arr1 = [2,3,3,4,4,4,4]
 * arr2 = [4,4]
 * o/p [2,3,4]
 */

/**Approach: 0(n+m),0(1) 
 * 
 * Approach is simple based on two pinter approach,
 * set one pointer on arr1 (i) and another pointer on arr2 say (j).
 * If arr1[i]<=arr[j] check if its already existant in res, if not push.
 * else check if its akreday existant , its basically a case of arr2[j]>arr1[i] , 
 * hence if already not existant push arr2[j] in res.
 * 
 * It might be possible that both the array are not of same length and therefore the smaller length array pointe will
 * get exhausted first and thus simply iterate over remaining and check if its not existant then puch to res.
 * 
*/
function sortedArrayUnion(arr1, arr2) {
    let res = [];
    let i = 0, j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            res = checkIsExist(res, arr1[i])
            i++;
        } else {
            res = checkIsExist(res, arr2[j])
            j++;
        }
    }
    while (i < arr1.length) {
        res = checkIsExist(res, arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        res = checkIsExist(res, arr2[j]);
        j++;
    }
    return res;
}

function checkIsExist(res, value) {
    if (res[res.length - 1] !== value) {
        res.push(value);
    }
    return res;
}