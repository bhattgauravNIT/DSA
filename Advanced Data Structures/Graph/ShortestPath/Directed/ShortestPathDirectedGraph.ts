/**Given a directed acyclic weighted graph the task is to find the shortest distance of all the vertex 
 * from a given source.
 * 
 * For ex:
 *                 2        3           6
 *            0--------->1------->2------------>3
 *            |                  ^              ^
 *            |     1            |2              |     1
 *             ----------------->4--------------->5
 *                                         4
 * 
 * So the adjacencyList looks like:
 * 
 * 0: [1,4]
 * 1: [2]
 * 2: [3]
 * 3: []
 * 4: [2,5]
 * 5: [3]
 * 
 * The weights of edges are as follows:
 * w(0,1) = 2
 * w(0,4) = 1
 * w(1,2) = 3
 * w(2,3) = 6
 * w(4,2) = 2
 * w(4,5) = 4
 * w(5,3) = 1
 * 
 * i/p source = 0.
 * 
 * O/p 0,2,3,6,1,5
 * 
 * 0->0 will always be 0
 * So we can go from 0->1 in only one way i,e 0->1 so shortest distance is 2
 * So we can go from 0->2 in two ways 
 *           1)  0>1->2 distance = 2+3 = 5
 *           2)  0->4->2 distance = 1+2 = 3
 *             Shortest is 3
 * 
 * We can go from 0->3 in two ways
 *          1) 0->1->2->3 total = 11
 *          2) 0->4->5->3 = 6 
 *           shortest is 6.
 * 
 * We can go from 0->4 in one way 0->4 = 1
 * We can go from 0-> 5 in one way 0->4->5 = 5
 * 
 * So thats how the total shortes distances are calculated.
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
    adjacencyList: number[][];
    inboundVertex: number[];
    weightMap: Map<String, number>;

    constructor(numberOfVertex: number) {
        this.numberOfVertex = numberOfVertex;
        this.inboundVertex = [];
        this.adjacencyList = [];
        this.weightMap = new Map();
        for (let i = 0; i < numberOfVertex; i++) {
            this.adjacencyList[i] = [];
            this.inboundVertex[i] = 0;
        }
    }

    setAdjacencyList(vertex1, vertex2, weight): void {
        this.adjacencyList[vertex1].push(vertex2);
        this.inboundVertex[vertex2]++;
        this.weightMap.set(`${vertex1},${vertex2}`, weight);
    }

    topologicalSorting(): number[] {
        let q = new Queue();
        for (let i = 0; i < this.inboundVertex.length; i++) {
            if (this.inboundVertex[i] === 0) {
                q.push(i);
            }
        }
        let res: number[] = [];
        while (!q.isEmpty()) {
            const val = q.pop();
            if (val !== undefined) {
                res.push(val);
                for (let adjacents of this.adjacencyList[val]) {
                    if (this.inboundVertex[adjacents] > 0) {
                        this.inboundVertex[adjacents]--;
                    }
                    if (this.inboundVertex[adjacents] === 0) {
                        q.push(adjacents);
                    }
                }
            }
        }
        return res;

    }

    /**Approach: 0(v+e),0(v)
     * 
     * So the idea is to do a toplogical sorting of the given directed acyclic graph, 
     * 
     * This order is useful because when we process each vertex in this order,
     * by the time we process a vertex, we have already processed all vertices that have edges pointing to it. 
     * Thus, we have the shortest paths to all the predecessors of the current vertex.
     * 
     * This toplogical sorting can be done using BFS or DFS.
     * In BFS we use a queue and concept of inBound array
     * In dfs we use stack and recursion.
     * 
     * So first our method shortestPathDirectedAcyclic will call the method which will give the topological sorted
     * order of vertices of the graph.
     * 
     * Now we will be needing a shortesPath array which initially will be infinte for all vertices however
     * for source it will be 0 as say source is 0 so to reach 0->0 is 0 distance.
     * 
     * Now we will iterate over every vertex of this toplogical sorted array and for every vertex we will 
     * iterate over its adjacency list.
     * 
     * If 
     * 
     * the shortestPath[neighbour] or shortesPath[adjacent] > shortestPath[current vertex of topologicalSortedArray] + weight[currentVertex,neighbour]
     * 
     * Then we update the shortestPath[neighbour] or shortesPath[adjacent] = shortestPath[current vertex of topologicalSortedArray] + weight[currentVertex,neighbour]

     */
    shortestPathDirectedAcyclic(source: number) {
        let toplogicalSort = this.topologicalSorting();
        const shortestPath: number[] = [];
        for (let i = 0; i < this.numberOfVertex; i++) {
            shortestPath[i] = Number.MAX_SAFE_INTEGER;
        }
        shortestPath[source] = 0;
        for (let i = 0; i < toplogicalSort.length; i++) {
            const currentVertex = toplogicalSort[i];
            const adjacents = this.adjacencyList[currentVertex];
            for (let adjacent of adjacents) {
                let weight = this.weightMap.get(`${currentVertex},${adjacent}`);
                if (weight !== undefined) {
                    if (shortestPath[adjacent] > shortestPath[currentVertex] + weight) {
                        shortestPath[adjacent] = shortestPath[currentVertex] + weight;
                    }
                }
            }
        }
        return shortestPath;
    }
}

let g = new Graph(6);
g.setAdjacencyList(0, 1, 2);
g.setAdjacencyList(0, 4, 1);
g.setAdjacencyList(1, 2, 3);
g.setAdjacencyList(2, 3, 6);
g.setAdjacencyList(4, 2, 2);
g.setAdjacencyList(4, 5, 4);
g.setAdjacencyList(5, 3, 1);
console.log(g.shortestPathDirectedAcyclic(0));
