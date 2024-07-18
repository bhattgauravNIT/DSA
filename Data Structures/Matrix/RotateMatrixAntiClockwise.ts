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

function anticlockwiseRotate(arr: number[][]) {
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

}