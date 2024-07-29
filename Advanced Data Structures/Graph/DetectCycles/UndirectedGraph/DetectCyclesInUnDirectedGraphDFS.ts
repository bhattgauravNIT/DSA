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
    parentList: number[];

    constructor(numberOfVertex: number) {
        this.numberOfVertex = numberOfVertex;
        this.adjacencyList = [];
        this.visistedList = [];
        this.parentList = [];
        for (let i = 0; i < numberOfVertex; i++) {
            this.visistedList[i] = false;
            this.adjacencyList[i] = [];
            this.parentList[i] = -1;
        }
    }

    setAdjacencyList(vertex1: number, vertex2: number) {
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1);
    }

    /**
     * Approach: 0(v+e),0(v)
     * 
     * 0------------1-------------2
 *                  |             |
 *                  |             |
 *                  3--------------
 * 
 * In order to detect a cycle in an undirected graph the concept is simple that we need to check whether a vertex is being already
 * visisted or not while doing the dfs traversal of the graph but there is one corner case which is very imp.
 * 
 * Lets suppose we start with 0 vertex now we move to 1 so 1 is connected with 2, 3 as well as 0. 
 * 
 * So when we will be traversing through the adjacency list of 1, 0 will be present and since 0 is already visited thus this approach
 * will consider a loop between 0 & 1 which is not the case and thus is the main problem with loop detection
 * in undirected graph as v1->v2 means v2->v1 which is not considered a loop.
 * 
 * Thus in order to fix this we need to maintain a parent
 * from where we are traversing to the next vertex.
 * 
 * If this vertex which we are visisting comes out as already visited but however is equal to the parent
 * then its not a loop however else it is a loop.
 * 
 * So in case 0 we push it to stack, mark it as visited then
 * 
 * stack was not empty so we went inside and iterate over the adjacenecy list of 0, we found 1, 1 was not visited
 * so we mark it as visited and push it to stack and updated the parent of 1 as 0.
 * 
 * Now stack is having [1] and parent array looks like [-1,0,-1,-1] with 0 being parent of 1.
 * 
 * Now again stack is not empty so we pop from stack and print it, now we travserse over the adjacenecy list of 1
 * which is [0,2,3]
 * 
 * We found 0, which is visited so we checked whether its the parent of 1 or not clearly from the parentList we found that its the parent
 * so we dont inform this a loop. 
 * Now we went to 2 in adjacency list of 1 and 2 was not visited so we mark 2 as visited and push to stack and mark parent of 2 as 1,
 * similarly we do it for 3
 * 
 * So stack looks like: [2,3] and parentlist looks like : [-1,0,1,1]
 * 
 * Now again 2 is popped and went through adjacency list of 2 which is 
 * 
 * [1,3]
 * 
 * So for 1 in adjacency list of 2 we find it as visited and thus we check if 1 is the parent of 2 which is correct so no issues , a loop is not encountered
 * Now we went to 3 in adjacency list of 2 , we see that 3 is already visited so we check if the parent of 3 is 2 which is not the case
 * parent of 3 is 1 in the parentList and thus we conclude that there is a loop and we return true.
 * 
 * 
     */

    depthFirstSearch(vertex: number): boolean {
        let stack: number[] = [];
        stack.push(vertex);
        this.visistedList[vertex] = true;
        while (stack.length > 0) {
            const val = stack.pop();
            if (val !== undefined) {
                for (let i = 0; i < this.adjacencyList[val].length; i++) {
                    let neighbour = this.adjacencyList[val][i];
                    if (!this.visistedList[neighbour]) {
                        stack.push(neighbour);
                        this.visistedList[neighbour] = true;
                        this.parentList[neighbour] = val;
                    } else {
                        if (neighbour !== this.parentList[val]) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    detectCycleInUndirectedGraph() {
        for (let i = 0; i < this.numberOfVertex; i++) {
            if (!this.visistedList[i]) {
                if (this.depthFirstSearch(i)) {
                    return true;
                }
            }
        }
        return false;
    }
}

let g1 = new Graph(4);
g1.setAdjacencyList(0, 1);
g1.setAdjacencyList(1, 2);
g1.setAdjacencyList(1, 3);
g1.setAdjacencyList(2, 3);
console.log(g1.detectCycleInUndirectedGraph());