/**Given an binary array consisting of only 0's and 1's
 * what is the min number of consecutive flips to make all array element same.
 * 
 * Ex: arr = [1,1,0,0,0,1]
 * 
 * 1. Either we can flip consequtive 1's to 0.
 * So 1st flip -> Index 0to1 arr = [0,0,0,0,0,1]
 * 2nd flip -> Index 5to5   arr = [0,0,0,0,0,0]
 * 
 * all array element are same now with 2 flips.
 * 
 * So in total 2 flips are required if we flip all 1's.
 * 
 * 2. We flips consequtive 0's to 1
 * 
 * so 1 st flip index 2to4 arr = [1,1,1,1,1,1]
 * 
 * all array elements are same now with only 1 flip.
 * 
 * So min(1,2) = 1. O/p is 1 and print : 2->4.
 */

/**Approach1: O(n), 0(n)
 * 
 * We iterate over the array maintaining zeroGrp array which stores the index of starting and ending of a zero group
 * being found and similairy for 1's group being found.
 * 
 * Ex:
 * arr = [1,1,0,0,0,1]
 * 
 * So zeroGroupCount = 1
 * oneGroupCount = 2
 * zeroGroupArr = [[2,5]]
 * oneGroupArr = [[0,1],[5,5]].
 * 
 * if zero group is less than one group : then zero group array should be considered for printing.
 * else if one group is lesser than zero group then one group array should be considered for printing.
 * if both are equal, it does not matter print any array.
 * 
 * One special case when [1,1,1,1] that is zeroGroup is 0 and one group is 1, i,e zero grp is less.
 * Then the zeroGroupArray is not having length thus need to be taken care(line : 77)
 * 
 * Similary for [0,0,0,0] case(line: 89)
 */
function minConsequtiveFlips(nums) {
    let oneGroup = 0;
    let zeroGroup = 0;
    let zeroGroupArr = [];
    let oneGroupArr = [];
    let i = 0;
    while (i < nums.length) {
        if (nums[i] === 1) {
            let j = i + 1;
            while (nums[j] === 1 && j < nums.length) {
                j++;
            }
            oneGroup++;
            oneGroupArr.push([i, j - 1]);
            i = j;
        }
        if (nums[i] === 0) {
            let k = i + 1;
            while (nums[k] === 0 && k < nums.length) {
                k++;
            }
            zeroGroup++;
            zeroGroupArr.push([i, k - 1]);
            i = k;
        }
    }
    if (zeroGroup <= oneGroup) {
        if (zeroGroupArr.length > 0) {
            let i = 0;
            while (i < zeroGroupArr.length) {
                console.log(`From ${zeroGroupArr[i][0]} to ${zeroGroupArr[i][1]}`);
                i++;
            }
        } else {
            console.log(`All elements are same and is 1, no need to flip`)
        }
    } else if (zeroGroup > oneGroup) {
        if (oneGroupArr.length > 0) {
            let i = 0;
            while (i < oneGroupArr.length) {
                console.log(`From ${oneGroupArr[i][0]} to ${oneGroupArr[i][1]}`);
                i++;
            }
        } else {
            console.log(`All elements are same and is 0, no need to flip`)
        }
    }
}

/**Approach 2: 0(n),0(1)
 * 
 * Instead of using additional space based upon the conditions we can again iterate over the array to find the desired
 * indexes.
 * 
 * This needs two traversal.
 */

function minConsequtiveFlips(nums) {
    let oneGroup = 0;
    let zeroGroup = 0;
    let i = 0;
    while (i < nums.length) {
        if (nums[i] === 1) {
            let j = i + 1;
            while (nums[j] === 1 && j < nums.length) {
                j++;
            }
            oneGroup++;
            i = j;
        }
        if (nums[i] === 0) {
            let k = i + 1;
            while (nums[k] === 0 && k < nums.length) {
                k++;
            }
            zeroGroup++;
            i = k;
        }
    }
    if (zeroGroup <= oneGroup) {
        if (zeroGroup > 0) {
            let i = 0
            while (i < nums.length) {
                if (nums[i] === 0) {
                    let k = i + 1;
                    while (nums[k] === 0 && k < nums.length) {
                        k++;
                    }
                    console.log(`From ${i} to ${k - 1}`);
                    i = k;
                } else {
                    i++;
                }
            }
        } else {
            console.log(`All elements are 1`)
        }
    } else {
        if (oneGroup > 0) {
            let i = 0;
            while (i < nums.length) {
                if (nums[i] === 1) {
                    let k = i + 1;
                    while (nums[k] === 1 && k < nums.length) {
                        k++;
                    }
                    console.log(`From ${i} to ${k - 1}`);
                    i = k;
                } else {
                    i++;
                }
            }
        } else {
            console.log(`All elements are 0`)
        }
    }
}

/**Approach 3: 0(n), 0(1); Single traversal
 * 
 * Its based on the fact that since its a binary array of zeroes and one's only therefore
 * if we flip the all the elemnets present in the array of second group that is being found
 * than it will always result in min consequtive flips. 
 */

function minConsequtiveFlips(nums) {
    let i = 0;
    let secondGrpEle = getSecondGroupElement(nums);
    while (i < nums.length) {
        if (nums[i] === secondGrpEle) {
            let k = i + 1;
            while (nums[k] === nums[i] && k < nums.length) {
                k++;
            }
            console.log(`From ${i} to ${k - 1}`);
            i = k;
        } else {
            i++;
        }
    }
}

function getSecondGroupElement(arr) {
    let i = 0;
    while (i < arr.length) {
        let k = i + 1;
        while (arr[i] === arr[k] && k < arr.length) {
            k++;
        }
        return arr[k];
    }
}
