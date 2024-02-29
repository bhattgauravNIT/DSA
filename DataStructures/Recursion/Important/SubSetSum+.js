/**Given a array of numbers and a sum value, find all the subsets of the array whose sum is equal to sm.
 * Ex: [1,2,3] sm = 3
 * So there are two possible subsets such that its sum is 3.
 * [3],[1,2].
 * So o/p is 2
 */

/**Approach 1: 0(2^n), 0(2^n) 
 * 
 * Say i have an arr = [10,20,15,5], sm = 25;
 * So clearly there are 2 subsets whose sum is 25, that is [10,15],[20,5].
 * 
 * Now In order to understand this problem recursively, we know that in total there are 2^n subsets where n is length of array
 * thus on every index in array there are 2 choises either to select the element or to not select the element.
 * 
 * 1.In case you select the element , reduce the sm by arr[i].
 * 2. In case you non selected the elemnet, sm will remain same
 * 3. In both the cases either you selected or not selected the element (after both), that index selection is over and next index to be taken
 * to consideration.
 * 
 * Base case:
 * 
 * If sm is getting 0, this means both values in pair is val1 + val2 = sm, so return 1( cause thats 1 pair).
 * If index is getting out of bound and sm is 0 that means its a pair so return 0
 * If index is getting out of bound and sm is not zero it means its not a pair return 0
 * If sm is getting negative it means its not a pair return 0.
 * 
*/
function subSetSum(arr, sm, i = 0) {
    if (i === arr.length) {
        return sm === 0 ? 1 : 0;
    }

    if (sm < 0) return 0;

    return subSetSum(arr, sm - arr[i], i + 1) + subSetSum(arr, sm, i + 1);
}

console.log(subSetSum([1, 2, 3], 3));


/**Approach2: 0((2^(arrayLength) * (arrayLength)) =~ 0(n * 2^n), 0(1)
 * 
 * The approach is to find all the sub sets of the the given array and then to check if its sum is equal to sm or not.
 * Use bit magic to find the subSet.
 * 
 * Ex: [1,2,3] sm = 3
 * 
 * [],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]
 * 
 * 2^3 = 8
 * 0  -> 000     []
 * 1  -> 001     [1]
 * 2  -> 010     [2]
 * 3  -> 011     [1,2]
 * 4  -> 100     [3]
 * 5  -> 101     [1,3]
 * 6  -> 110     [2,3]
 * 7  -> 111     [1,2,3]
 * 
 * So there are 2 subsets [3],[1,2] whose sum is 3.So use bit magic to find the subset and a varibale(res) to get addition of the
 * elements which are present in the subset.
 * Check if the sm === res, increase the cnt.
 * 
 * There are 2^n subsets and we need to iterate over n bits to get the subset so n*2^n, 
 * Thus overall time complexity is 0(n * 2^n), 0(1).
 */
function subSetSum(arr, sm) {
    let pow = 1 << arr.length;
    let i = 0, j = 0, res = 0, cnt = 0;
    while (i < pow) {
        while (j < arr.length) {
            let q = 1 << j;
            if ((i & q) !== 0) {
                res += arr[j];
            }
            j++;
        }
        if (res === sm) {
            cnt++;
        }
        j = 0;
        res = 0;
        i++;
    }
    return cnt;
}
