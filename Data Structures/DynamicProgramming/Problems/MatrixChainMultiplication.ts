/**
 * Given an array of size n, which represents n-1 matrix.
 * Find the min out of matrix chain multiplications.
 * 
 * For ex: arr = [2,1,3,4]
 * 
 * n=4 , so there are 3 matrix here
 * 1st : 2 *1 size -> M1
 * 2nd : 1 *3 size -> M2
 * 3rd:  3*4 size -> M3
 * 
 * Now any two matrix can be multiplied only if columns are same.
 * Say we want to multiply a matrix a*b to c*d then b === c in order for us to be able to multiply these matrix.
 * 
 * So based on above we got three matrix M1,M2 and M3
 * 
 * These can be multiplied in two ways:
 * 
 * 1. M1 * (M2*M3) as M1 is of 2*1, M2 is of 1*3 and M3 id of 3*4 so M2 can be multiplied with M3 as columns of M2
 * equals rows of M3.
 * 
 *    M1 * (M2*M3)
 *    (2*1) * ((1*3)*(3*4))
 *    so result of ((1*3)*(3*4)) will yield a matrix of 1*4
 *    (2*1) * (1*4) now again
 *    will yield 2*4 matrix.
 * 
 *    So M1 * (M2*M3)
 *    The ways in which we can multiply this is
 *    0 + 1*3*4 + 2*1*4 = 20, note 1*3*4 is values in array and not dimensions, similarly 2*1*4
 * 
 *   Lets understand 
 *   initially M1 is separated so we are not using this thus 0 +
 *   now we computing (M2*M3) which is  ((1*3)*(3*4)) dimensions and thus number of multiplications is 1*3*4
 *   Now after (M2*M3) is computed it will yield a matrix of 1*4 which we need to multiply with M1 of size 2*1
 *   so total multiplications are 1*2*4
 * 
 *   Thus sum is 0+ 1*3*4 + 2*1*4 = 20
 * 
 * 
 * 2. (M1*M2)*M3
 *    ((2*1)*(1*3)) * (3*4) 
 * 
 *    Now initially we are multiplying a matrix of 2*1 and 1*3 so total multiplications are 2*1*3
 *    M3 we are not multiplying in initial so 0
 *    Now (M1*M2) i,e 2*1 and 1*3 will yield 2*3 matrix which needs to be multiplied to M3 which is (3*4) 
 *    so total multiplications are 2*3*4
 * 
 *    The sum is 2*1*3 + 0 + 2*3*4 = 30
 * 
 *    Min is 20 so o/p is 20.
 * 
 * 
 * For ex: arr = [2,1,3]
 * n=3 so we can make 2 matrix i,e M1-> (2*1) dimension and M2 -> (1*3) dimension
 * The only one way to multiply them is M1*M2
 * 
 * So we are multiplying 2*1 and 1*3
 * Total multiplications will be 1*2*3 = 6 which is output
 * 
 * Ex: arr = [2,3]
 * n=2 so we can only make 1 matrix of 2*3 and we are not multiplying it with any other matrix so total
 * multiplications are 0.
 */

function matrixChainMultiplications(arr: number[], i: number, j: number) {
    if (i + 1 === j) return 0;
    let res = Number.MAX_VALUE;
    for (let k = i + 1; k < j; k++) {
        res = Math.min(res,
            matrixChainMultiplications(arr, i, k) +
            matrixChainMultiplications(arr, k, j) +
            arr[i] * arr[k] * arr[j]
        )
    }
    return res;
}