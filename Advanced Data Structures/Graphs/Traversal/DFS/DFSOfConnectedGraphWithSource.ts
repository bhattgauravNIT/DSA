/**Given a undirected graph which is connected , the task is to print the vertex in DFS fashion for this graph
 * and we are given with a source.
 * 
 * For ex:      0 _________________ 1___________________
 *             |                    |
 *             |                    |                  4
 *             2_________________ __3__________________
 * 
 * I/p source = 0;
 * 
 * O/p
 * 0 1 3 4 2 
 * or
 *  0 1 4 3 2 
 * or
 * 0 1 3 2 4
 * but the vertex with lower value is preferred to be first go from the source.
 * Thats why from 0 we first went to 1 and not 2.
 */


class Graph {
    visitedList: boolean[];
    adjacencyList: number[][];
    vertex: number;

    constructor(numberOfVertex: number) {
        this.visitedList = [];
        this.adjacencyList = [];
        this.vertex = numberOfVertex;
        for (let i = 0; i < this.vertex; i++) {
            this.visitedList[i] = false;
            this.adjacencyList[i] = [];
        }
    }

    setAdjacencyList(node1: number, node2: number) {
        this.adjacencyList[node1].push(node2);
        this.adjacencyList[node2].push(node1);
    }

    dfsRecurision(source: number) {
        this.visitedList[source] = true;
        console.log(source);
        for (let i = 0; i < this.adjacencyList[source].length; i++) {
            const neighbour = this.adjacencyList[source][i];
            if (!this.visitedList[neighbour]) {
                this.dfsRecurision(neighbour);
            }
        }
    }

    /**Lets understand DFS.
     * 
     * BFS and dfs can be a little confusion but if we go back to basic statment than we can we understand bfs and dfs.
     * 
     * BFS for a source is simply first get me all the immediate connected neighbours of the source
     *  then give me all immediate connected neighbour of neighbour and so on or in BFS we we vist all adjacents first
     * then visit their adjacents and then their adjacents and so on using queue datastructure.
     * 
     * However DFS is first give me a connected neighbour of the source then neighbour of this connected neighbour and so
     * on.
     * 
     * So in above example 
     * 
     * For ex:      0 _________________ 1___________________
 *             |                    |
 *             |                    |                  4
 *             2_________________ __3__________________
 * 
 *      The bfs of this is simply first get me all the immediate connected neighbours of the source
     *  then give me all immediate connected neighbour of neighbour and so on with source zero.
     * 
     * 
     * i,e 0 then its immediate connected neighbour are 1 or 2 so we say 0 1 2
     * Now connected neighbours of neigbour for 1 is 0 which is already visisted, 3 and 4 so 
     * bfs becomes 0 1 2 3 4
     * 
     * Now immediate connected neighbours of 2 is 0 and 3 which are already visited so
     * 
     * BFS for the above graph:  0 1 2 3 4
     * 
     * Now lets talk about DFS of this graph so DFs is first give me a connected neighbour of the source then
     * neighbour of this connected neighbour and so on or in dfs we go to next adjacent and then recursively call
     * for all connected vertex of this adjacent once that is done then we go to the next adjacent.
     * 
     * So for source 0 its immediate connected neigbours are 1 & 2, since generally we take lesser value as priority
     * so 0 1 
     * Now all the connected vertex of 1 shall be visisted first so connected vertex of 1 are 3 & 4
     * 
     * so we take 0 1 3
     * 
     * Now connected vertex of 3 are 2 & 4 and both are not visisted
     * 
     * so we take 0 1 3 2 
     * and in last 4
     * 
     * so O/p is 0 1 3 2 4 
     * 
     * So we iterate over all the vertex of the graph and if the vertex is not visisted which we are maintaining via
     * visisted list which is a boolean array initialized with false.
     * 
     * If the vertex is not visisted we will be calling a recursionFunction dfsRecurision with the source parameter, now 
     * dfsRecursion will simply first mark the vertex as visisted and then will print this vertex now it will iterate over
     * the adjacency list of the source.
     * 
     * so say for ex: source is 0 and initially its marked as unvisited so now we call dfsRecursion on it.
     * The dfsRecursion will mark this as a visited vertex and will print it.
     * Now it will iterate overt the adjacencyList of vertex 0 and it finds 1, since 1 is already not visited so it so 
     * it again calls recursively dfsRecursion to check for its adjacencyList.
     * So initially it prints it marks 1 as visited and went to see adjacencyList of 1.
     * 
     * This process continues.
     * 
     * The recursion Tree for this will somehow look like
     * 
     * DfsRecur(0)-(visted marked)
     *           __________ DfsRecur(1)-(visted marked)
     *                                 -------------DfsRecur(3)-(visted marked)
     *                                                       ________________DfsRecur(2)-(visted marked)
     *                                                       ________________DfsRecur(4)-(visted marked)
     * 
     */
    dfsMain(souce: number) {
        for (let i = 0; i < this.vertex; i++) {
            if (!this.visitedList[i]) {
                this.dfsRecurision(souce);
            }
        }
    }
}

let g = new Graph(5);
g.setAdjacencyList(0, 1);
g.setAdjacencyList(0, 2);
g.setAdjacencyList(1, 3);
g.setAdjacencyList(1, 4);
g.setAdjacencyList(2, 3);
g.setAdjacencyList(3, 4);
g.dfsMain(0);