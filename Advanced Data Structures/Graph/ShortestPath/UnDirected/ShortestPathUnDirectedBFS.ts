/**Given a unweighted and undirected graph and a source node the task is to find the shortest path from the source
 * to all the other vertex.
 *                           _____________________________
 * For ex:                   |
 *                           0_________________1__________2____________________3
 *                                             |
 *                                             |
 *                                             |_________________________________
 * 
 * I/p source = 0;
 * 
 * O/p  0,1,1,2
 * 
 * So source is 0,
 * In order to reach 0 from 0 we dont need any edge 
 * In order to reach 1 from 0 we need only 1 edge
 * In order to reach 2 from 0 we need 1 edge
 * In order to reach 3 from 0 we need atleast two edge i,e (0->1->3)
 * 
 *                           ________________________
 * Ex:                       |
 *                           0---------2----------4
 *                           |         |          |
 *                           |         |          |
 *                           1_______  3----------5
 * 
 * Source: 0
 * 
 * O/p 0,1,1,2,1,2
 * 
 * So source is 0
 * In order to reach 0 from 0 its 0.
 * In order to reach 1 from 0 its 1 edge required.
 * In order to reach 2 from 0 its 1 edge required
 * In order to reach 3 from 0 2 edges are required
 * In order to reach 4 from 0 1 edge is required
 * In order to reach 5 from 0 2 edges are required.
 * 
  */

class Queue {
    arr: number[] | undefined[];
    front: number;
    rear: number;
    size: number;

    constructor() {
        this.arr = [];
        this.front = -1;
        this.rear = -1;
        this.size = 0;
    }

    push(val: number): void {
        this.rear++;
        this.arr[this.rear] = val;
        if (this.front === -1) {
            this.front++;
        }
        this.size++;
    }

    pop(): number | undefined {
        if (!this.isEmpty()) {
            const val = this.arr[this.front];
            this.arr[this.front] = undefined;
            this.front++;
            this.size--;
            return val;
        }

    }

    isEmpty(): boolean {
        return this.size === 0;
    }
}

class Graph {
    numberOfVertex: number;
    visistedVertex: boolean[];
    adjacencyList: number[][];
    dist: number[];

    constructor(numberOfVertex: number) {
        this.numberOfVertex = numberOfVertex;
        this.visistedVertex = [];
        this.adjacencyList = [];
        this.dist = [];
        for (let i = 0; i < numberOfVertex; i++) {
            this.visistedVertex[i] = false;
            this.adjacencyList[i] = [];
            this.dist[i] = Number.MAX_SAFE_INTEGER;
        }
    }

    setAdjacencyList(vertex1, vertex2): void {
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1);
    }

    /**Approach: 0(v+e), 0(v)
     * 
     * Lets take an example
     * 
     *                           _____________________________
 *                           |
 *                           0_________________1__________2____________________3
 *                                             |
 *                                             |
 *                                             |_________________________________
 * 
 * Source node is 0.
 * 
 * We will be using BFS traversal and will be maintaining a dist array,
 * Initially the dist array will be set with Value Number_MAX_INTEGER apart from the source which will be set as 0 value only
 * beacuse say source is 0, so to reach 0 from 0 we dont need any edge.
 * 
 * Now as in simple BFS
 * 
 * once function is called we will be pushing the source in a queue and will mark it as visisted .
 * Now while the q is not empty we will traverse through the adjacencyList of the val which is being pooped out from the 
 * queue.
 * If this val is not visisted then simply we will push this to queue mark it as visited and will update the dist array
 * for that iteration of adjacency list element with value of the vertex whose adjacency list we are itearting + 1.
 * 
 * In this way we will get to know the shortest dist of all the vertex.
 *  
     */
    shortestPathFromSource(source: number): number[] {
        this.dist[source] = 0;
        this.visistedVertex[source] = true;
        let q = new Queue();
        q.push(source);
        while (!q.isEmpty()) {
            let val = q.pop();
            if (val !== undefined) {
                for (let i = 0; i < this.adjacencyList[val].length; i++) {
                    let neighbour = this.adjacencyList[val][i];
                    if (!this.visistedVertex[neighbour]) {
                        this.visistedVertex[neighbour] = true;
                        q.push(neighbour);
                        this.dist[neighbour] = this.dist[val] + 1;
                    }
                }
            }
        }
        return this.dist;
    }
}

let g = new Graph(4);
g.setAdjacencyList(0, 1);
g.setAdjacencyList(0, 2);
g.setAdjacencyList(1, 2);
g.setAdjacencyList(1, 3);
g.setAdjacencyList(2, 3);
console.log(g.shortestPathFromSource(0));