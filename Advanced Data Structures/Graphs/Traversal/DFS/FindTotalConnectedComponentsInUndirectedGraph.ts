/**Given an undirected graph the task is to find the total number of
 * connected components in the graph . The graph may be connected or a disconnected graph.
 * 
 * For ex: 
 * 
 *              0               2___________3           5
 *              |               |
 *              |               4
 *              1
 * 
 * So the o/p is 3 as there are 3 connected components in this graph which are:
 * 
 * 0,1
 * 2,3,4
 * 5
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

    dfsRecurision(eachNode: number) {
        this.visitedList[eachNode] = true;
        for (let i = 0; i < this.adjacencyList[eachNode].length; i++) {
            const neighbour = this.adjacencyList[eachNode][i];
            if (!this.visitedList[neighbour]) {
                this.dfsRecurision(neighbour);
            }
        }
    }

    /**So simply while iterating over all the vertex, since if a vertex is not visited
     * then we call dfsRecurision onto that vertex which inturns visits all nodes connected
     * to it , so when we come back from dfsRecurision function and for those vertex which didn't got
     * visited from the previous call will conribute in identification of a new component.
     * Thus we can get the total non connectec components of the graph.
     */
    dfsMain(): number {
        let cnt = 0;
        for (let i = 0; i < this.vertex; i++) { 
            if (!this.visitedList[i]) {
                cnt++;
                this.dfsRecurision(i);
            }
        }
        return cnt;
    }
}

let g = new Graph(6);
g.setAdjacencyList(0, 1);
g.setAdjacencyList(2, 3);
g.setAdjacencyList(2, 4);
console.log(g.dfsMain());