/**Given an undeirected and possibly disconnected graph, the task is to find all the total connected components
 * in the graph.
 * 
 * Ex:                          0                             4                               7------8
 *                                                      |             |            
 *                           |      |                   5 ___________ 6
 *                           1      2
 *                               |  
 *                               3
 * O/p 3
 * 
 * Since in this disconnected graph there are three components which are connected that is
 * component1: 0 1 2 3
 * component2: 4 5 6
 * component3: 8 9
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
    visitedNodes: boolean[];

    constructor(numberOfVertex: number) {
        this.numberOfVertex = numberOfVertex;
        this.adjacencyList = [];
        this.visitedNodes = [];
        for (let i = 0; i < numberOfVertex; i++) {
            this.adjacencyList[i] = [];
        }
        for (let i = 0; i <= numberOfVertex; i++) {
            this.visitedNodes[i] = false
        }
    }

    setAdjacencyList(node1: number, node2: number) {
        this.adjacencyList[node1].push(node2);
        this.adjacencyList[node2].push(node1);
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
g.setAdjacencyList(7, 8);
console.log(g.adjacencyList);