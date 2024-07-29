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

    depthFirstSearch(vertex: number) {
        let stack: number[] = [];
        stack.push(vertex);
        this.visitedList[vertex] = true;

        while (stack.length > 0) {
            let val = stack.pop();
            if (val !== undefined) {
                for (let i = 0; i < this.adjacencyList[val].length; i++) {
                    let neighbour = this.adjacencyList[val][i];
                    if (!this.visitedList[neighbour]) {
                        stack.push(neighbour);
                        this.visitedList[neighbour] = true;
                    }
                }
            }
        }
    }

    /**
     * Approach: 0(v+e), 0(v)
     * 
     * So simply while iterating over all the vertex, since if a vertex is not visited
     * then we call depthFirstSearch onto that vertex which inturns visits all nodes connected
     * to it , so when we come back from depthFirstSearch function and for those vertex which didn't got
     * visited from the previous call will conribute in identification of a new component.
     * Thus we can get the total non connectecd components of the graph.
     */
    dfsMain(): number {
        let cnt = 0;
        for (let i = 0; i < this.vertex; i++) {
            if (!this.visitedList[i]) {
                cnt++;
                this.depthFirstSearch(i);
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