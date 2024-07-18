/**Given a matrix the task is to rotate the matrix in anti clock wise direction
 * 
 * Ex:      1  2  3
 *          4  5  6
 *          7  8  9
 * 
 * O/p      3 6 9
 *          2 5 8
 *          1 4 7
 * 
 * 
 * Ex:      1  2  3   4
 *          5  6  7   8
 *          9  10 11  12
 *         13  14 15  16
 * 
 * o/p     4 8 12 16
 *         3 7 11 15
 *         2 6 10 14
 *         1 5 9  13
 */

/**Approach: 0(m*n),0(m*n)
 * 
 * Lets take an example to understand this 
 * 
 * Ex:      1  2  3
 *          4  5  6
 *          7  8  9
 * 
 * The anti clock wise rotation of this matrix will be output 
 * 
 * O/p      3 6 9
 *          2 5 8
 *          1 4 7
 * 
 * So the last column of the input has become the first row, then the second last column has become the second row and again 
 * the first column has become the last row.
 * 
 * So we simply create a res matrix and perform this conversion.
 */
function anticlockwiseRotate(arr: number[][]): number[][] | undefined {
    if (arr.length === 0) return undefined;
    let res: number[][] = [];
    for (let i = 0; i < arr.length; i++) {
        res[i] = [];
    }
    let rs = 0;
    let row = arr.length;
    let column = arr[0].length;
    for (let col = column - 1; col >= 0; col--) {
        let c = 0;
        for (let r = 0; r < row; r++) {
            res[rs][c] = arr[r][col];
            c++;
        }
        rs++;
    }
    return res;
}

/**Approach2: 0(m*n),0(1)
 * 
 * The problem with the above solution is that it was using an additional aux array which was 
 * increasing the space complexity to 0(m*n), we can somehow do it in 0(m*n) & 0(1) i,e with array in place then it will be a better approach.
 * 
 * Lets understand this with the help of an example.
 * 
 * Ex:      1  2  3
 *          4  5  6
 *          7  8  9
 * 
 * Lets take a transpose of the matrix:
 * 
 * So transpose is:        1  4  7
 *                         2  5  8
 *                         3  6  9
 * 
 * Now if we reverse every column individually we get
 * 
 *      3 6 9
 *      2 5 8
 *      1 4 7
 * 
 * which is the desired answer.
 * 
 * So algi is simply to find the inplace transpose of the matrix and then reversing every column individually.
 */