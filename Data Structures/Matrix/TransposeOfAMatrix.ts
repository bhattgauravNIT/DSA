/**Given a matrix the task is to find the transpose of the matrix.
 * Need to change the original matrix.
 * 
 * For ex: 1  2  3  4
 *         5  6  7  8
 *         9  10 11 12
 *         13 14 15 16
 * 
 * The transpose of this matrix will be 
 * 
 *         1 5 9  13
 *         2 6 10 14
 *         3 7 11 15
 *         4 8 12 16
 * 
 * Fo ex: 1 1
 *        2 2
 * 
 * O/p 1 2
 *     1 2
 */

/**Approach1: 0(m*n), 0(m,n)
 * 
 * So lets take an example to understand this.
 * For ex: 1  2  3  4
 *         5  6  7  8
 *         9  10 11 12
 *         13 14 15 16
 * 
 * The transpose of this matrix will be 
 * 
 *         1 5 9  13
 *         2 6 10 14
 *         3 7 11 15
 *         4 8 12 16
 * 
 * If we look carefully than the rows of the original matrix has now become column of the transposed matrix.
 * I,e the first row which is 1 2 3 4 is now the first column of the transposed matrix.
 * 
 * So we simply create a empty 2d matrix but the catch here is that the number of coluns in the original matrix will now be the number of rows
 * in the resultant matrix.
 * 
 * After that we simply do  res[j][i] = arr[i][j];
 * 
 * Thus using this now we have obtained an res array which is nothing but the transpose of the original array, since we need to return the original array
 * therefore we will now iterate over the res array and will assign it to the original array.
*/
function transposeOfAMatrix(arr: number[][]): number[][] | null {
    if (arr.length === 0) return null;
    let res: number[][] = [];
    for (let i = 0; i < arr[0].length; i++) {
        res[i] = [];
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            res[j][i] = arr[i][j];
        }
    }
    for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res[i].length; j++) {
            arr[i][j] = res[i][j];
        }
    }
    return arr;
}

/**Approach2:  
 * 
 * Th problem with the above approach is that we need additional auxilary space same as that of original matrix and there are
 * in total two loops of m*n.
 * 
 * So the better idea will be to somehow change the original array in place.
 * 
 *  For ex: 1  2  3  4
 *          5  6  7  8
 *          9  10 11 12
 *          13 14 15 16
 * 
 * The idea of this approach is simple , we can see a pattern happening in order to create a transpose.
 * Lets say we are at row 1st ,1 st element which is 1.
 * If we swap 2 with 5, and 3 with 9 and 4 with 13 we will be able to convert the first row into first column.
 * 
 * Similarly if we swap 7 with 10, 8 with 14 second row will be changed to column.
 * 
 * Similarly 12 with 15.
 * 
 * 
 * So all diagonal elements remains same and we swap elements from row indexed ahead of it and column index below it.
*/

function transposeOfAMatrix1(arr: number[][]): number[][] | null {
    if (arr.length === 0) return null;
    for (let i = 0; i < arr.length; i++) {
        let r = i + 1;
        let c = i + 1;
        while (c < arr[i].length && r < arr.length) {
            let temp = arr[i][c];
            arr[i][c] = arr[r][i];
            arr[r][i] = temp;
            r++;
            c++;
        }
    }
    return arr;
}


console.log(transposeOfAMatrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 13, 14, 16]]));
