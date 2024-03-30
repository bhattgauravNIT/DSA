/**Given two independent sorted array's which may or may not contain repeated elements,
 * find the common elements between them or lets say find the points of intersection between them.
 * 
 * Intersection means find the elemnet which is common in both the arrays irrespective of the number of occureence
 * consider it as one.
 * 
 * Ex: arr1= [3,5,10,10,10,15,15,20]
 * arr2 = [5,10,10,15,30]
 * 
 * o/p [5,10,15]
 */

/**Approach: 0(m+n),0(1)
 * 
 * Ex: 
 * arr1=[3,5,10,10,10,15,15,20]
 * arr2 = [5,10,10,15,30]
 * 
 * Consider two pointers i and j on arr1 and arr2 respectively.
 * If arr1[i]<arr2[j] increment i
 * if arr1[i]>arr2[j] increment j
 * if both are equal we need to check whether the resul is already containing this indexed element or not, if not push it in res
 * else dont push.
 * Increment both i & j in such case.
 */
function sortedArrayIntersection(arr1, arr2) {
    let res = [];
    let i = 0, j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            i++;
        } else if (arr1[i] > arr2[j]) {
            j++;
        } else {
            if (res[res.length - 1] !== arr1[i]) {
                res.push(arr1[i]);
            }
            i++;
            j++;
        }
    }
    return res;
}