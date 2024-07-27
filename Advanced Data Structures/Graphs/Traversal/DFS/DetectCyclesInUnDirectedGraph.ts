/**Given an undirected graph the task is to detect cycle in it if yes return true else false.
 * 
 * For ex: 
 * 
 *           0------------1-------------2
 *                        |             |
 *                        |             |
 *                        3--------------
 * 
 * O/p true
 * 
 * Clearly there is a cycle because vertex 3 is rechable by 1 as well as 2 and 1 & 2 are connected to each other.
 * 
 * Ex:       0--------1--------------2
 *                    |              |
 *                    |              |
 *                    3              4
 * 
 * O/p false
 * 
 * Clearly there is no cycle in this graph.
 * 
 * 
 */

class Graph {
    adjacencyList: number[][];
    visistedList: boolean[];
    numberOfVertex: number;

    constructor(numberOfVertex: number) {
        this.numberOfVertex = numberOfVertex;
        this.adjacencyList = [];
        this.visistedList = [];
        for (let i = 0; i < numberOfVertex; i++) {
            this.visistedList[i] = false;
            this.adjacencyList[i] = [];
        }
    }

    /**
     * 
     * 0------------1-------------2
 *                  |             |
 *                  |             |
 *                  3--------------
 * 
 * In order to detect a cyccle in an undirected graph the conecpt is simple that we need to check whetehr a vertex is being already
 * visisted or not while doing the dfs traversal of the graph but there is one corner case which is very imp.
 * 
 * Lets suppose we start with 0 vertex now we move to 1 so 1 is connected with 2, 3 as well as 0. So in case zero is traversed
 * it will consider a loop between 0 & 1 which is not the case thus in order to fix this we need to maintain a parent
 * from where we are travesring to the next vertex.
 * If this vertex which we are visisting is equal to the parent then surely its not a loop however esle it is a loop.
 * 
 * So we start with DFS traversal for every vretex say staring with 0.
 * Now the parent in this case is -1.
 * 
 * Now we mark it as visited and will iterate over the adjacency list of this vertex 0.
 * If the neighbour or the iteration of the adjacency list for the vertex is not visisted we simply need to
 * call dfsRecur on this vertex and the parent that we will call will be the source in thie case.
 * If dfs recur sends true we will return true stating there is a loop in the graph,
 * If the neighbour or the current iteraion of the adjacency list of the source is visisted and is not equal
 * to the parent then also we immediatley return true stating there is a loop.
 * 
 * In other things we return false.
 * 
     */

    dfsRecur(source: number, parent: number) {
        this.visistedList[source] = true;
        for (let i = 0; i < this.adjacencyList[source].length; i++) {
            let neighbour = this.adjacencyList[source][i];
            if (!this.visistedList[neighbour]) {
                this.visistedList[neighbour] = true;
                const res = this.dfsRecur(neighbour, source);
                if (res) {
                    return true;
                }
            } else if (neighbour !== parent) {
                return true;
            }
        }
        return false;
    }

    dfsMain() {
        for (let i = 0; i < this.numberOfVertex; i++) {
            if (!this.visistedList[i]) {
                const res = this.dfsRecur(i, -1);
                if (res) {
                    return true;
                }
            }
        }
        return false;
    }
}