/**Given a 2d matrix the task is to print the boundary traversal of the matrix.
 * 
 * For ex: 
 *                  1  2  3  4
 *                  5  6  7  8
 *                  9  10 11 12
 *                  13 14 15 16
 * 
 * O/p : 1 2 3 4 8 12 16 15 14 13 9 5
 * 
 * For ex:  1 2 3 4
 * 
 * o/p 1 2 3 4
 * 
 * For ex:     1 2 3 4
 *             5 6 7 8
 * 
 * o/p 1 2 3 4 8 7 6 5
 */


/**Approach: 0(m+n)
 * The approach is simple.
 * First write a loop which traverse the first row of the given matrix.
 * After that another loop which traverses only the last indexed columns starting from 2nd row as the first row is already being printed.
 * After this itearte in the last row but starting from the second last column till first column.
 * After this start from second last row till 2nd row .
 * 
 * For the corner cases like a single rowed matrix or a single columned matrix.
 * Simply apply a condition that rows> 1 and columns > 1 for traversal in considtions of -
 *  After this itearte in the last row but starting from the second last column till first column.
 *  After this start from second last row till 2nd row .
*/
function boundaryTraversal(arr: number[][]): void {
    let rows = 1;
    let columns = 0;
    for (let i = 0; i < arr[0].length; i++) {
        console.log(arr[0][i]);
        columns++;
    }
    for (let i = 1; i < arr.length; i++) {
        console.log(arr[i][columns - 1]);
        rows++;
    }
    if (rows > 1 && columns > 1) {
        for (let i = columns - 2; i >= 0; i--) {
            console.log(arr[rows - 1][i]);
        }
    }
    if (rows > 1 && columns > 1) {
        for (let i = rows - 2; i > 0; i--) {
            console.log(arr[i][0]);
        }
    }
}