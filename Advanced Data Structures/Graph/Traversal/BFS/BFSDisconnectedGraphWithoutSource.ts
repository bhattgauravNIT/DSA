/**Given an undirected and possibly disconnected graph and no source node, the task is to print all connection from a node and then connections of
 * the connections even if not already printed or we need to traverse all the vertex of the graph
 * however the immediate connections of a given source should be printed first 
 * in any order and then the connections of connection and so on.
 * 
 * Ex:                          0                             4
 *                                                      |             |
 *                           |      |                   5 ___________ 6
 *                           1      2
 *                               |  
 *                               3
 * 
 * So the breadth first search for this undirected and disconnected graph will look like 
 * 
 * 0 1 2 3 4 5 6 or 0 2 1 3 4 5 6
 * 
 * So let consider that we start traversal from 0 so directly connected nodes from 0 are 1 & 2 so we can print them in any order, now 3 is the connection from
 * 1 & 2 so lets consider connection of 1 and visit 3 so 3 gets printed , since its already visisted so we dont print it for 3.
 * 
 * Now 4 is printed and the two direct connections from 4 is 5 & 6 which can be printed in any order.
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
        if (this.size !== 0) {
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
    adjacencyList: number[][];
    numberOfVertex: number;
    visistedList: boolean[];

    constructor(numberOfVertex) {
        this.visistedList = [];
        this.numberOfVertex = numberOfVertex;
        this.adjacencyList = [];
        for (let i = 0; i < numberOfVertex; i++) {
            this.adjacencyList[i] = [];
        }
        for (let i = 0; i <= this.numberOfVertex; i++) {
            this.visistedList[i] = false;
        }
    }

    setAdjacencyList(val1: number, val2: number) {
        this.adjacencyList[val1].push(val2);
        this.adjacencyList[val2].push(val1);
    }

    breadthFirstSearch(source: number) {
        let q = new Queue();
        q.push(source);
        while (!q.isEmpty()) {
            const val = q.pop();
            if (val !== undefined) {
                console.log(val);
                for (let i = 0; i < this.adjacencyList[val].length; i++) {
                    if (!this.visistedList[this.adjacencyList[val][i]]) {
                        q.push(this.adjacencyList[val][i]);
                        this.visistedList[this.adjacencyList[val][i]] = true;
                    }
                }
            }
        }
    }

    /**Approach: 0(v+E), 0(v) 
     * 
     * In this problem we are not given a source from where we have to start the connection for bfs traversal and its quite
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
     * then will do some simple bfs traversal of this source node and all its adjacency nodes if present and not
     * visited still.
     * 
     * for we will be iterating over all the vertex of the graph and will be passing it as source node in 
     * helper breadthFirstSearch function.
     * 
     * If this node is not visisted yet, it will push it to queue and will loop over all its adjacency nodes.
     * 
     * The timeconplexity will simply be 0(v+E) because we are looping over all the vertex of the graph and for each 
     * vertex in worst case we can iterate over all of its edges present in adjacency list.
     * 
     * The size of the queue in worst case can be equal to  v where v is the number of vertex of the graph.
    */
    breadthFirstSearchDisconnected() {
        for (let i = 0; i < this.adjacencyList.length; i++) {
            if (!this.visistedList[i]) {
                this.visistedList[i] = true;
                this.breadthFirstSearch(i);
            }
        }
    }
}

let g = new Graph(7);
g.setAdjacencyList(0, 1);
g.setAdjacencyList(0, 2);
g.setAdjacencyList(1, 3);
g.setAdjacencyList(2, 3);
g.setAdjacencyList(4, 5);
g.setAdjacencyList(4, 6);
g.setAdjacencyList(5, 6);
g.breadthFirstSearchDisconnected();  