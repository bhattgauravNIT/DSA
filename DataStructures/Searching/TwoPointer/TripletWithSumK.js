/**Given an array arr which is sorted, and a sum k . Return true if there exist a triplet in the array such that 
 * x1+x2+x3 =k.
 * 
 * If there does not exist such triplet, return false.
 */

/**Approach1: 0(n^3),0(1)
 * 
 * Check for each and every pair, if there exists a pair whose sum is equal to given sum, 
 * return true, else return false.
 */
function tripletsWithSumK(arr, sum) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            for (let k = j + 1; k < arr.length; k++) {
                if (arr[i] + arr[j] + arr[k] === sum) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**Approach2: 0(n^2),0(1) 
 * 
 * For every i till i=0-> i=arr.length-3,
 * find a pair in arr from i+1->arr.length-1 such that its sum is equal to sum-arr[i].
 * 
 * If there exists a pair clearly it forms a triplet.If not there is no triplet.
*/
function tripletsWithSumK1(arr, sum) {
    let i = 0;
    while (i < arr.length - 2) {
        let j = i + 1;
        let sm = sum - arr[i];
        if (hasPairWithSumK(arr, j, sm)) {
            return true;
        }
        i++;
    }
    return false;
}

function hasPairWithSumK(arr, startingIndex, k) {
    let endingIndex = arr.length - 1;
    while (startingIndex < endingIndex) {
        if (arr[startingIndex] + arr[endingIndex] === k) {
            return true;
        } else if (arr[startingIndex] + arr[endingIndex] > k) {
            endingIndex--;
        } else {
            startingIndex++;
        }
    }
    return false;
}

/**Approach3: 0(n),0(n) 
 * 
 * The approach is simple. lets consider two pointers i at 0 and j at arr.length-1.
 * We are trying to find out if sum-(arr[i]+arr[j]) is present in a map that we are using to keep track of.
 * If its present then we must ensure that sum-(arr[i]+arr[j]) !== arr[j] && sum-(arr[i]+arr[j]) !== arr[i] beacuse lets consider an example
 * arr = [1,2,5,6] , sum = 14
 * Initially i=0,j=3 so mp is empty initilally thus 1+6 = 7< 14 and 7 is also not present in map, so we did i++ and inserted 1 & 6 in map.
 * now i=1,j=3 and so 2+6 = 8 and 14-8 = 6 is present in map but however this 6 is the six at which currently j is pointing to and thus 2,6,6 is no such pair in arr
 * hence we need this condition.
 * 
 * If in case arr[i]+arr[j]<sum and the third ele is not prsent in map , i++ 
 * If in case arr[i]+arr[j]>sum and third ele is not present in map , j--
 * In both conditions arr[i],arr[j] has to be inserted in mp.
*/
function tripletsWithSumK2(arr, sum) {
    let mp = new Map();
    let i = 0, j = arr.length - 1;
    while (i < j) {
        if (mp.has(sum - (arr[i] + arr[j]))) {
            if ((sum - (arr[i] + arr[j]) !== arr[j]) && (sum - (arr[i] + arr[j]) !== arr[i])) {
                return true;
            } else {
                i++;
                j--;
            }
        } else {
            if (!mp.has(arr[i])) {
                mp.set(arr[i], 1);
            }
            if (!mp.has(arr[j])) {
                mp.set(arr[j], 1);
            }
            if (arr[i] + arr[j] > sum) {
                j--;
            } else if (arr[i] + arr[j] < sum) {
                i++;
            }
        }
    }
    return false;
}
