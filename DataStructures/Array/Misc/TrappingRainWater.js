/**Given an array, find the max rain water that can be trapped
 * 
 * For ex: arr = [3,0,1,2,5]
 * 
             |
             |
   |         |
   |      |  |
   |   |  |  |

   So if we see we cannot store any water at starting index and ending index as there is no pillar to support the water stored there.
   Now from index 1 to index 3 we can store water.

   So at index 1, whose value is 0, we can store 3 units of water.
   Similarly at index 2 value is 1, we can store 2 units of water.
   Similarly at index 3 valus is 2, we can store 1 units of water.

   So overall water that we can store is 3+2+1 = 6 units.

 */

/**Approach1: 0(n^2),0(1)
 * 
 * Ex: arr = [3,0,1,2,5]
 * 
 * W ecan not store any water at first and last index.
 * Now at every index apart from them the amount of water that we can store is the Min(leftMax,rightMax)-arr[i].
 * 
 * Ex: At index 1 value is 0, so value max at left of it is 3 and value max at right of it is 5. Hence the value of water that
 * could be stored is Min(3,5)-arr[1].
 * That is 3-0 = 3 units.
 * 
 * ex: arr = [3,5,2,3]
 * 
 *   |
 *   |
 * | |   |
 * | | | |
 * | | | |
 * 
 * Max water that can be stored is 1 unit
 * That is left most and right most cant have any water stored.
 * At index 1 , We can't store any water.
 * At index 2, we can store 1 unit.
 * At index 3, we cant store anything.
 * 
 * Thats why we are considering lmax and rmax initially as arr[i].
 */
function trappingRainWater(arr) {
    let water = 0;
    for (let i = 1; i < arr.length - 1; i++) {
        let lmax = arr[i], rmax = arr[i];
        for (let j = 0; j < i; j++) {
            if (arr[j] > lmax) {
                lmax = arr[j];
            }
        }
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] > rmax) {
                rmax = arr[j];
            }
        }
        water += (Math.min(lmax, rmax) - arr[i]);
    }
    return water;
}

/**Approach2: 0(n),0(n) 
 * 
 * Previously for every arr[i], we were computing the left max element corresponding to i and the right max element corresponding
 * to i, so if we store first for every i, the left max element and the we store the right max element than ,
 * simply for every iTH Element we can say 
 * 
 * The water that will be stored is (min(lmax,rmax)-arr[i]) at any index i.
 * 
 * Ex: arr = [5,0,6,2,3]
 * 
 * Left max array for every ith elemnet will be leftMax = [5,5,6,6,6];
 * Right max array for every ith element will be rmax = [6,6,6,3,3];
 * 
*/
function trappingRainWater1(arr) {
    let lmax = [arr[0]], water = 0;
    for (let i = 1; i < arr.length; i++) {
        lmax.push(Math.max(arr[i], lmax[lmax.length - 1]));
    }
    let rmax = [arr[arr.length - 1]];
    for (let i = arr.length - 2; i >= 0; i--) {
        rmax.unshift(Math.max(arr[i], rmax[0]));
    }

    for (let i = 1; i < arr.length - 1; i++) {
        water += Math.min(lmax[i], rmax[i]) - arr[i];
    }
    return water;
}