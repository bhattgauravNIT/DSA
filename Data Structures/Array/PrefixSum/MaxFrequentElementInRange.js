/**Given two array one indicating lower range and one indicating higher range the task is to find the
 * most frequent repeating element in the range.
 * 
 * Ex: FromRange = [1,2,5,15]
 *     toRange = [5,8,7,18]
 * 
 * so 1st range is 1->5
 * 2nd range is 2->8
 * 3rd range is 5->7
 * 4Th range is 15->18
 * 
 * The constratints are 0<= FromRange[i] <= 100 & 0<= toRange[i] <= 100
 * & fromRange[i] <= toRange[i].
 * 
 * 0/p is 5
 * 
 * from 1->5 there are 1,2,3,4,5
 * from 2->8 there are 2,3,4,5,6,7,8
 * from 5->7 there are 5,6,7
 * from 15->18 there are 15,16,17,18
 * 
 * Clearly 5 is repeated most.
 * 
 */

/**Approach1: 0(n*max) where max is 100, 0(max) =~ 0(1)
 * 
 * Since there is a constraint that 0<= fromRange[i],toRange[i] <= 100.
 * Therefore we cant have number greater than 100, thus use hasing to create a freq array of size 100.
 * 
 * Now from fromRange[i] till toRange[i] mark the occurence of elemnets in the freq array.
 * 
 * In the end the index having the max value in freq array will be the number getting most repeated in all the range
 * queries.
*/
function maxRepeatingEleInRange(fromRange, toRange) {
    let freq = [];
    for (let i = 0; i < 100; i++) {
        freq[i] = 0;
    }
    let i = 0;
    while (i < fromRange.length) {
        let start = fromRange[i];
        let end = toRange[i];
        while (start <= end) {
            freq[start]++;
            start++;
        }
        i++;
    }
    i = 0; let res = 0, index = -1;
    while (i < freq.length) {
        if (freq[i] > res) {
            res = freq[i];
            index = i;
        }
        i++;
    }
    return index
}

/**
 * 0(n+max),0(max) ~= 0(1)
 * The problem with the above approach is if max is very large say max is also n then the above approach will
 * have time complexity of 0(n*max)=~ 0(n*n) = 0(n^2). Thus we need to trim it down.
 * 
 * Idea is from the fromRange[i] till toRange[i] instead of updating the freq of every elemnet present in this range
 * in the freq array, lets just mark the beegining and ending of the range in the freq array.
 * 
 * So ex: 
 *     FromRange = [1,2,5,15]
 *     toRange = [5,8,7,18]
 * 
 * so 1st range is 1->5
 * 2nd range is 2->8
 * 3rd range is 5->7
 * 4Th range is 15->18
 * 
 * for 1st range : Mark index 1 as ++ in freq and index 5+1 as --
 * for 2nd range: Mark index 2 as ++ in freq and index 8+1 as --
 * for 3rd range:   Mark index 5 as ++ and 7+1 as --
 * for 4th range: Mark index 15 as ++ and index 18+1 as --.
 * 
 * Now create on preFix sumArr from the freq arr.
 * 
 * The index with most value in preFixSum arr is the number getting most repeated in the given ranges.
 * 
 * Note: here we take freq array length as 101 as in case of toRange[i] === 100 then we need to access freq[toRange[i] + 1] 
 * index.
 */

function maxRepeatingEleInRange1(fromRange, toRange) {
    let freq = [];
    for (let i = 0; i <= 100; i++) {
        freq[i] = 0;
    }
    let i = 0;
    while (i < fromRange.length) {
        freq[fromRange[i]]++;
        freq[toRange[i] + 1]--;
        i++;
    }
    i = 1;
    let prefixSum = [freq[0]];
    while (i < freq.length) {
        prefixSum.push(prefixSum[prefixSum.length - 1] + freq[i]);
        i++;
    }
    i = 0; let res = 0, index = -1;
    while (i < prefixSum.length) {
        if (prefixSum[i] > res) {
            res = prefixSum[i];
            index = i;
        }
        i++;
    }
    return index;
}

/**Approach2: Modified
 * In above we are creating a seperate prefix sum array instead we can simply modify the existing freq array.
 */

function maxRepeatingEleInRange2(fromRange, toRange) {
    let freq = [];
    for (let i = 0; i <= 100; i++) {
        freq[i] = 0;
    }
    let i = 0;
    while (i < fromRange.length) {
        freq[fromRange[i]]++;
        freq[toRange[i] + 1]--;
        i++;
    }
    i = 1;
    while (i < freq.length) {
        freq[i] = freq[i - 1] + freq[i];
        i++;
    }
    i = 0; let res = 0, index = -1;
    while (i < freq.length) {
        if (res < freq[i]) {
            res = freq[i];
            index = i;
        }
        i++;
    }
    return index;
}