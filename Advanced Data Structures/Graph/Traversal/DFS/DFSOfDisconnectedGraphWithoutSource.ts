/**Given a undirected graph which may be connected or disconnected , the task is to print the vertex in DFS fashion for this graph
 * and we are not given with a source.
 * 
 * For ex:      0 _________________ 1___________________
 *             |                    |
 *             |                    |                  4
 *             2_________________ __3__________________
 * 
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

    depthFirstSearch(vertex: number) {
        let stack: number[] = [];
        stack.push(vertex);
        this.visitedList[vertex] = true;

        while (stack.length > 0) {
            let val = stack.pop();
            if (val !== undefined) {
                console.log(val);
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

    /**Approach: 0(v+E), 0(v) 
     * 
     * In this problem we are not given a source from where we have to start the connection for dfs traversal and its quite
     * common in case of an undirected graph ex:
     * 
     *                           0                             4
 *                                                      |             |
 *                           |      |                   5 ___________ 6
 *                           1      2
 *                               |  
 *                               3
     * 
     * 
     * so both components are a part of one graph only but however are disconnected from each other.
     * In order to do traversal in such kind of graphs we will consider every vertex as source and 
     * then will do some simple dfs traversal of this source node and all its adjacency nodes if present and not
     * visited still.
     * 
     * for we will be iterating over all the vertex of the graph and will be passing it as source node in 
     * helper depthFirstSearch function.
     * 
     * If this node is not visisted yet, it will push it to stack and will loop over all its adjacency nodes.
     * 
     * The timeconplexity will simply be 0(v+E) because we are looping over all the vertex of the graph and for each 
     * vertex in worst case we can iterate over all of its edges present in adjacency list.
     * 
     * The size of the stack in worst case can be equal to v where v is the number of vertex of the graph.
    */
    dfsMain() {
        for (let i = 0; i < this.vertex; i++) {
            if (!this.visitedList[i]) {
                this.depthFirstSearch(i);
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
g.dfsMain();
