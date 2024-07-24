/**Given a undirected & connected graph and a source node the task is to print all connection of the source and then connections of
 * the connections even if not already printed however the immediate connections of a given source should be printed first 
 * in any order and then the connections of connection .
 * 
 * 
 * For ex:    
 * 
 *                    0
 *                1        2
 *                       3    4
 * s = 0.
 * 
 * So o/p is 0 1 2 3 4 or 0 2 1 4 3 etc. 
 * 
 * We needed to print all immediate connections of 0 first which are 1,2 so we can print 1 and 2 in any order.
 * After that 3 and 4 are the connections of the connection 2 so then we can print 3 and 4 in any order.
 * 
 * 
 * For ex: 
 * 
 *   ----------      1-----------------
 *  0                |                     3
 *    ----------     2  -------------------
 * 
 * s = 0;
 * 
 * O/p is 0, 1,2 3 or 0, 2,1 3
 * 
 * Source was 0 so the immediate connection of 0 are 1 & 2 so we can print 1 & 2 in any order now 3 is the connection of
 * 1 as well as 2 so we print 3 say for connection 1 . Now 3 is already printed so we dont need to print connection 3 again against
 * 2.
 * 
 * 
 * Ex:    
 * 
 *  ______1 ________ 3____
 * 0  ____________________5
 *  ______ 2______    4 ___  
 * 
 *  s = 0.
 * 
 * O/p is 0 1 5 2 3 4
 * 
 * so the source is 0 now 0 has immediate connections with 1,5 and 2 so we can print them in any order. Now 3 and 4 are the connections
 * of these connections thus we can print them in any order.
  */

class Queue<T> {
    arr: T[] | undefined[];
    front: number;
    rear: number;
    size: number;

    constructor() {
        this.front = -1;
        this.rear = -1;
        this.arr = [];
        this.size = 0;
    }

    push(val: T): void {
        this.rear++;
        this.arr[this.rear] = val;
        if (this.front === -1) {
            this.front++;
        }
        this.size++;
    }

    pop(): T | undefined {
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


class Graph<T extends number> {
    arr: T[][];
    numberOfVertex: number;
    constructor(numberOfVertex: number) {
        this.arr = [];
        this.numberOfVertex = numberOfVertex;
        for (let i = 0; i < numberOfVertex; i++) {
            this.arr[i] = [];
        }
    }

    adjacencyList(node1: T, node2: T): void {
        this.arr[node1].push(node2);
        this.arr[node2].push(node1);
    }

    getadjacencyList(): T[][] | undefined {
        if (this.arr.length !== 0) {
            return this.arr;
        }
    }

    /**Approach: 0(v),0(v) 
     * 
     * The approach to solve the problem is somewhat similar to level order traversal of a tree.
     * SO what we do here 
     * 
     * we will be having a queue and a vistedArray of size equal to the numberOfVertex of the graph.
     * Initialize the visted array as false initially for all the vertex.Now to this queue insert the root node from where
     * we need to start the traversal of the graph.
     * 
     * check if the queue is not empty and simply for that val at top of the queue, log it and pop it and insert the
     * edges/directly connected vertex into the queue and mark them as visited in the vistited array.
     * 
     * Now in order to get the number of vertex which are directly connected we will first be maintaing a array of array which
     * will be nothing but adjacency list representation of the vertex of the graph.
     * 
     * So we will iterate over the vertex inner array to get the connected nodes for that vertex and if in case they are 
     * not already visisted we will mark them visited and this process will continue till all the
     * vertex are visited and the queue becomes empty. 
     * 
     * Analysis of time and space complexity.
     * 
     * Since we are iterating over the queue all the vertex for once will always be pushed into the queue thus
     * the time compelxitry of the breadth first search is simply 0(n).
     * 
     * The max number of vertex which can be present in queue at a specif time will be the max number of
     * edges corresponding to any vertex and in worst case it can be 0(v-1) !~ 0(v) where v is the total vertex of the
     * graph.
    */
    breadthFirstSearch(node1: T) {
        let q = new Queue<T>();
        let visitedArr: boolean[] = [];
        for (let i = 0; i <= this.numberOfVertex; i++) {
            visitedArr[i] = false;
        }
        q.push(node1);
        visitedArr[node1] = true;
        while (!q.isEmpty()) {
            const val = q.pop();
            console.log(val);
            if (val !== undefined) {
                for (let i = 0; i < this.arr[val].length; i++) {
                    if (!visitedArr[this.arr[val][i]]) {
                        q.push(this.arr[val][i]);
                        visitedArr[this.arr[val][i]] = true;
                    }
                }
            }
        }
    }
}

let g = new Graph(6);
g.adjacencyList(0, 1);
g.adjacencyList(0, 5);
g.adjacencyList(0, 2);
g.adjacencyList(1, 3);
g.adjacencyList(2, 4);
g.adjacencyList(3, 5);
g.adjacencyList(4, 5);

