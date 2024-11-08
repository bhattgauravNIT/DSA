/**Given a value n which resembles the input total count of nodes which are present in the bST.
 * The task is to count the total number of unique BST 's arrangement which we can make using this n input node's.
 * 
 * For ex: n=1
 *     we can make only one BST with one node i,e  1
 * 
 * For ex: n=2
 *    we can make two unique BST with two nodes i,e
 * 
 *         1           or            2
 *           2                     1
 * 
 * For ex: n=3
 *        
 *         o/p: 5
 * 
 *       1                 1             2              3           3
 *        2                   3       1     3         2           1
 *          3               2                        1               2
 */

/**Approach: 0(n*n),0(n)
 * 
 * Lets understand this,
 * n=1 we can make only one BST with one node i,e  1
 * 
 * n=2 we can make two unique BST with two nodes i,e
 * 
 *         1           or            2
 *           2                     1
 * 
 * So for 2 nodes we can see 
 * 
 * starting from 1, if we fix one as root then nodes to right of it will be the node values which are greater than value 2 which
 * 
 * are total nodes - current fixed root i,e 1 node.
 * Nodes to left of it will be the nodes with value smaller than one which is 0.
 * 
 * for value 2 if we fix as root then total nodes to right of it are nodes with value greater than 2 which is totalNodes - 2 = 0
 * the nodes with value smaller than current root node 2 will lie left of it i,e 1 node which is simply 2-1 = 1
 * 
 * Lets again try and generalize this with 3 nodes 
 * 
 * For ex: n=3
 *        
 *         o/p: 5
 * 
 *       1                 1             2              3           3
 *        2                   3       1     3         2           1
 *          3               2                        1               2
 * 
 * So for n=3.
 * 
 * If we start fixing nodes as root starting from value 1.
 * 
 * j=1 (fix as root)
 * 
 * a) Total nodes left of it or nodes smaller than 1 are 1-1 = 0 nodes
 * b) Total nodes right of it or nodes greater than 1 are 3-1 = 2 nodes 
 * 
 * j=2 (fix as root)
 * 
 * a) Total nodes left of it or nodes smaller than 2 are 2-1 = 1 node
 * b) Total nodes right of it or nodes greater than 1 are 3-2 = 1 node 
 * 
 * j=3
 * 
 * a) Total nodes left of it or nodes smaller than 3 are 3-1 = 2 nodes
 * b) Total nodes right of it or nodes greater than 1 are 3-3 = 0 node 
 * 
 * So if we know the number of trees in which we can formulate using 1 as root 
 * similarly if we know the number of tree which we can formulate using 2 as root
 * 
 * Then we can calculate the number of tree that we can calculate using 3 nodes.
 * 
 * Lets see how.
 * 
 * for n=3 its clear from the diagram considering 
 * 
 * 1 as root:
 * we can get two arrangements which is 
 * 
 * 2 as root we can get 1 arrangement
 * 
 * 3 as root we can get 2 arrangement
 * 
 * so total arrangement which ae can get is 1 + 2+2 = 5
 * 
 * So lets formulate a dp array
 * 
 * dp[0] = 1 because if there is no root then we can formulate one tree which is of null root
 * dp[1] = 1 because if there is 1 node then we can formulate only one arrangement
 * dp[2] = 2 
 *            1           or            2
 *           2                     1
 * 
 * 
 * Now lets calculate for dp[3]
 * 
 * we start jth iteration from j=1 till i
 * 
 * so total number of nodes with value greater than j is i-j
 * so total number of nodes with value lesser than j is j-1
 * 
 * Total arrangements which we can make with nodes with greater value than j is dp[i-j]
 * Total arrangements which we can make with nodes with smaller value than j is dp[j-1]
 * 
 * dp[i] += 
 * 
 * Total arrangements which we can make with nodes with greater value than j is dp[i-j] * 
 * Total arrangements which we can make with nodes with smaller value than j is dp[j-1]
 * 
 */

function countBst(n: number) {
    let dp: number[] = [];
    dp[0] = 1;
    dp[1] = 1;
    dp[2] = 2;

    for (let i = 3; i <= n; i++) {
        dp[i] = 0;
        for (let j = 1; j <= i; j++) {
            let rightGreaterValues = i - j;
            let rightGreaterArrangements = dp[rightGreaterValues];

            let leftSmallerValues = j - 1;
            let leftSmallerArrangements = dp[leftSmallerValues];

            dp[i] += rightGreaterArrangements * leftSmallerArrangements;
        }
    }
    return dp[n];
}