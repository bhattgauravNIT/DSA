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

    
    /**Approach: 0(v+E),0(v) where v is vertex and e is edge.
     * 
     * Now in order to get the number of vertex which are directly connected we will first be maintaing a array of array which
     * will be nothing but adjacency list representation of the vertex of the graph.
     * 
     * we will be having a stack and a vistedArray which is boolean of false initially of size equal to the numberOfVertex of the graph.
     * Initialize the visted array as false initially for all the vertex. 
     * 
     * Now to this stack insert the root node from where we need to start the traversal of the graph and mark it as visited
     * 
     * check if the stack is not empty and simply for that val at top of the stack, log it and pop it
     * Iterate over the adjacency list of this val and if they are not visited keep pushing them into stack and keep
     * marking them as visited.
     * 
     * this process will continue till all the
     * vertex are visited and the stack becomes empty. 
     * 
     * Analysis of time and space complexity.
     * 
     * Since we are iterating over all the adjacency list for every vertex thus there are v vertex and the length of the
     * adjacency list for any ith vertex can be E where E is the number of edges of that vertex thus
     * the time complexity is 0(V+E).
     * 
     * The stack will be containing v vertex which is equal to the space complecity of DFS.
    */
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
}

let g = new Graph(5);
g.setAdjacencyList(0, 1);
g.setAdjacencyList(0, 2);
g.setAdjacencyList(1, 3);
g.setAdjacencyList(1, 4);
g.setAdjacencyList(2, 3);
g.setAdjacencyList(3, 4);
g.depthFirstSearch(0);
