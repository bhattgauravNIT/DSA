/**Given an array if there exist no element to the right of arr[i] such that arr[j]>= arr[i]
 * 
 * then arr[i] is considered as an leader in array.
 * 
 * ex: arr = [7,10,4,3,6,5,2]
 * leaders are [ 10, 6, 5, 2 ]
 * 
 * Return all the leaders
 * 
 * ex: arr = [7,10,4,3,6,10,5,2]
 * 
 * leaders are [10,5,2]
 */

/**Approach 1: O(n*n),O(1)
 * 
 * For every arr[i] check till right extreme if the array has any element greater than or equal to arr[i], if yes it cant be 
 * leader if no then it will be a leader.
 */
function leadersInArray(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        let b = 0;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] >= arr[i]) {
                b++;
                break;
            }
        }
        if (b === 0) {
            res.push(arr[i]);
        }
    }
    return res;
}

/**Approach2 : 0(n),O(1) 
 * 
 * The last element will always be a leader as there is nothing right to it.
 * So initially make it as leader now keep iterating through last and if you find arr[i] > current leader than change the leader
 * to arr[i] and unshift it in result.
 * 
 * Its worst case time complexity may become 0(n^2) as 
 * Take an example of sorted array [6,5,4,3,2,1]
 * 
 * Here all the elements are leaders.
 * 
 * So for every n we have to do unshift operation which is 0(n) again thus 0(n^2)
 * The better way is that if we found a leader than rather unshifting it we push it to res and then reverse the res using two pointer.
 * 
*/
function leadersInArray1(arr) {
    let res = [];
    let cl = arr[arr.length - 1];
    res.push(cl);
    let i = arr.length - 2;
    while (i >= 0) {
        if (arr[i] > cl) {
            cl = arr[i];
            res.unshift(arr[i]);
        }
        i--;
    }
    return res

}

