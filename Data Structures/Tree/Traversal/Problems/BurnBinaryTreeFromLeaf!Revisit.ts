/**Given a binary tree, the task is to burn the binary tree from the given input leaf node, give the time in which
 * the entire tree can be burnt.
 * 
 * For ex:
 *                              10
 *                         |          |
 *                        20          30
 *                  |          |         |
 *                 40          50        60
 * 
 * I/p = leaf =  50
 * o/p 4
 * 
 * At t=0, we burn leaf node 50
 * At t=1 we burn adjacent of 50 which is 20
 * At t=2 we burn adjacent of 20 which is 40 and 10
 * At t=3 we burn adjacent of 40 and 10 , 40 don't have any adjacent , 10 has adjacent 30
 * At t=4 we burn adjacent of 30 which is 60 and thus entire tree gets burned at t=4. 
 * 
 */