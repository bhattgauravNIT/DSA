/**Given a matrix the task is to print the matrix in a snake pattern. 
 * 
 * For ex:
 *               1 2 3 4
 *               5 6 7 8
 *               9 10 11 12
 *               13 14 15 16
 * 
 * o/p 
 *        1 2 3 4 8 7 6 5 9 10 11 12 16 15 14 13
 */

/**Approach: 0(m*n), 0(n) 
 * 
 * The approach is simple we will simply be iterating over the 2d array and in case the row found is
 * odd we will push it to a stack and will print later else we will print directly.
 * 
 * Since we are iterating over an m*n array so time complexity is m*n and addition space required 
 * is for every odd row whose size can atmost be n thus 0(n). 
*/
function snakePattern(arr: number[][]) {
    let stack: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (i % 2 !== 0) {
                stack.push(arr[i][j]);
            } else {
                console.log(arr[i][j]);
            }
        }
        for (let k = stack.length - 1; k >= 0; k--) {
            console.log(stack[k]);
        }
        stack = [];
    }
}

/**Approach2: 0(m*n),0(1)
 * 
 * So simply if the row is odd then we travese the row from backwards
 * else we simply traverse the row from forward.
*/
function snakePattern1(arr: number[][]) {
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 !== 0) {
            for (let k = arr[i].length - 1; k >= 0; k--) {
                console.log(arr[i][k]);
            }
        } else {
            for (let j = 0; j < arr[i].length; j++) {
                console.log(arr[i][j]);
            }
        }
    }
}

snakePattern([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]);