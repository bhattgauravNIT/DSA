/**Given a graph directed the task is to detect cycles in this graph in case it exist.
 * 
 * For ex:        
 * 
 *                                         --------------------------
 *                                         |
 *                                         <
 *                        0--------------->1----------->2----------->3
 *                                         ^
 *                                         |
 *                                         4
 * 
 * So this is a cyclic graph 
 * 
 * As 0->1, 1->2, 2,3, 3->1, 4->1  clearly there is a cycle at 1.
 * i,e 1->2, 2->3, 3->1
 *  
 */

class Queue<T> {
    arr: number[] | undefined[];
    front: number;
    rear: number;
    size: number;

    constructor() {
        this.front = -1;
        this.rear = -1;
        this.arr = [];
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
        return undefined;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }
}

class Graph {
    adjacencyList: number[][];
    inBoundVertex: number[];
    numberOfVertex: number;

    constructor(numberOfVertex: number) {
        this.numberOfVertex = numberOfVertex;
        this.adjacencyList = [];
        this.inBoundVertex = [];
        for (let i = 0; i < this.numberOfVertex; i++) {
            this.adjacencyList[i] = [];
            this.inBoundVertex[i] = 0;
        }
    }

    setAdjacencyList(vertex1: number, vertex2: number) {
        this.adjacencyList[vertex1].push(vertex2);
        this.inBoundVertex[vertex2]++;
    }

    /**
     * Approach: 0(v+e),0(v)
     * 
     * This algo to detect cycles in a directed graph using BFS is somewhat similar to toplogical sorting
     * algo used to toplologically sort an directed graph.
     * 
     * In topological sorting we consider all the inbound vertex to a particular vertex.
     * A vertex with zero inbound edges are considered independent and can be proccesed first, after the process
     * of such vertex we try to reduce the inbound edge count for those verftex which were dependent over this
     * proceed vertex.
     * 
     * If the inbound edge becomes 0 then that vertex is ready for processing.
     * 
     * This technique can be used to detect cycle in an directed graph beacuse if a graph is cyclic then
     * we will never be able to make the inbound edge count as 0 and thus the number of nodes that will be
     * processed via this technique will always be lesser than the total number of vertex of the graph and thats how
     * we will detect a cycle.
     * 
     * Lets understand how can we detect cycle in an undirected graph using topological sorting
     * technique.
     * 
     * Lets take an example of an cyclic directed graph.
     * 
     *  
 *                                         --------------------------
 *                                         |
 *                                         <
 *                        0--------------->1----------->2----------->3
 *                                         ^
 *                                         |
 *                                         4
 * 
 * So this is a cyclic graph 
 * 
 *  The adjacency list of vertex looks like:
 * 
 *   0: [1]
 *   1: [2]
 *   2: [3]
 *   3: [1]
 *   4: [1]
 * 
 * Lets make an inbound vertex array depecting the number of inbound edges to each vertex
 * and initialize it to 0 for all vertex then we will formulate it and inBoundVertexArray will look like 
 *  [0,3,1,1,0]
 * 
 * i=0 beacuse nothing is inbound to 0, 
 * i=1 , 1 has 3 inbounds
 * 2 has 1 inbound
 * 3 has 1 inbound
 * 4 has 0 inbound
 * 
 * 
 * Now since initially 0,4 are having zero inbound and thus they are independent so we insert them
 * into queue q: [0,4]
 * 
 * Now while(!q.isEmpty()) we pop 0
 * 
 * Now we travesre through the adjacencyList of 0 which is [1] and 
 * to inbound[1] we do --
 * 
 * so now the inbound matrix look like [0,2,1,1,0]
 * 
 * Now since inbound[1] !== 0 till we dont push to q.
 * 
 * Again we pop from q so we pop 4 and traverse through adjacency of 4 which is [1]
 * Again we do inbound[1]-- so inbound matrix looks like
 * 
 * [0,1,1,1,0]
 * 
 * Again inbound[1] !==0 so we dont push in queue.
 * 
 * Q has become empty and we comeout of the loop.
 * 
 * Clearly we have printed only 2 vertex i,e 1 and 4 and the total vertex was 5 so
 * we can say there is an cycle in the graph.
 *  
     */

    detectCycleTopologicalSorting(): boolean {
        let q = new Queue();
        for (let i = 0; i < this.inBoundVertex.length; i++) {
            if (this.inBoundVertex[i] === 0) {
                q.push(i);
            }
        }
        let cnt = 0;
        while (!q.isEmpty()) {
            const val = q.pop();
            cnt++;
            if (val !== undefined) {
                for (let i = 0; i < this.adjacencyList[val].length; i++) {
                    const neighbour = this.adjacencyList[val][i];
                    if (this.inBoundVertex[neighbour] > 0) {
                        this.inBoundVertex[neighbour]--;
                    }
                    if (this.inBoundVertex[neighbour] === 0) {
                        q.push(neighbour);
                    }
                }
            }
        }
        return cnt !== this.numberOfVertex;
    }
}

let g = new Graph(5);
g.setAdjacencyList(0, 1);
g.setAdjacencyList(1, 2);
g.setAdjacencyList(2, 3);
g.setAdjacencyList(3, 1);
g.setAdjacencyList(4, 1);
console.log(g.detectCycleTopologicalSorting());
