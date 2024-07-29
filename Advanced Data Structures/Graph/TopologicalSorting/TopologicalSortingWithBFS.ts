/**Given an directed graph the task is to do topological sorting of this graph.
 *
 * Lets understand topological sorting first with the help of an example say:
 *
 *                 0                         1 --------------->4
 *               |      |                   |
 *               |      |                   |
 *               |      |                   |
 *               !^     !^                  |
 *               2----> 3  <----------------
 *
 * So we have a directed edge from 0->2, 0->3, 2->3, 1->3, 1->4
 *
 * So lets consider all those which does have a incoming edge . The vertex is having dependecny over
 * the vertex from which this edge is coming from.
 *
 * So 0 has no incoming edge therefore its independent.
 *  1 has no incoming edge so again its independent.
 *  2 has 1 incoming edge from 0 and thus its dependent on 0. First 0 has to finish then only it can finish.
 *  3 has 1 incoming edge from 0 , 1 incoming edge from 2 and one incoming edge from 1 so it has dependency
 *  on 0,2 and 1 in order for it to complete.
 *  4 has incoming edge from 1 so it has dependency for 1 inoder for it to finish.
 *  
 * so gthe o/p can be 0 1 2 4 3
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

    /**Approach: 0(v+e)
     * 
     * Lets understand this with the help of an example
     * 
 *                 0                         1 --------------->4
 *               |      |                   |
 *               |      |                   |
 *               |      |                   |
 *               !^     !^                  |
 *               2----> 3  <----------------
 * 
 *  So above we have a directed graph the topological sorting for this can be 0 1 2 4 3
 * 
 * Lets understand how 
 * 
 * - 0 has no incoming edge therefore its independent.
 *  1 has no incoming edge so again its independent.
 *  2 has 1 incoming edge from 0 and thus its dependent on 0. First 0 has to finish then only it can finish.
 *  3 has 1 incoming edge from 0 , 1 incoming edge from 2 and one incoming edge from 1 so it has dependency
 *  on 0,2 and 1 in order for it to complete.
 *  4 has incoming edge from 1 so it has dependency for 1 inoder for it to finish.
 * 
 *  0 and 1 initially has no incoming edges or its inboundVertex are 0 thus 0 & 1 can be printed in any order so lets say we
 *  print 0,1
 *  Now 2 has one inbound vertex, 3 has 3 inbound vertex and 4 has one inbound vertex.
 * 
 *  So 3 can only be printed once all its dependecies are printed as it has dependency from 0,1 and 2.
 * 
 *  Now we can say that lets take example of 2 since it has only one dependency with 0 so 2 can only be printed after 0 is printed.
 * Thats how toplological order takes place.
 * 
 * So in oder to achieve this we maintain a array say inBoundArray which stores the number of inbound vertex of every vertex 
 * 
 * So the inbound vertex array for this graph will look like:
 *    [0,0,1,3,1]
 * 
 * where every index of this inbound vertex array represents a vertex, so 0 index or 0 vertex has 0 inbound, 
 * 1 index of 1 vertex has 0 inbound.
 * 2 index of 2 vertex has 1 inbound.
 * 
 * Now the adjacency list of this graph need also to be maintained and will look like:
 * 
 * 0: [2,3]
 * 1: [3,4]
 * 2: [3]
 * 3: []
 * 4: []
 * 
 * Now initailly since all the values which has initially 0 value of inbound vertex are independent and thus simply can be pushed 
 * to a queue (pushed to queue because we are using BFS).
 * 
 * So lets push 0 to queue and push 1 to queue.
 * 
 * q : [0,1]
 * 
 * Now while the q is not empty we will pop from q, and will print it so 0 gets printed.
 * Now we will iterate over the adjacency list of 0 and will remove one number from the inbound vertex corresponsing to
 * that adjacency list item.
 * 
 * Ex: 0 is poped and printed from q so we itearte over adjacencyList[0] i,e [2,3]
 * 
 * Now 2 and 3 has one less dependent as it ie being taken care of so we do inboundVertex[2]-- and inboundVertex[3]--.
 * 
 * In case now they also become zero after decrement this means now they dont have any dependency and they also can be queued into
 * the queue to be processed.
 * */
    topologicalSorting() {
        let q = new Queue();
        for (let i = 0; i < this.inBoundVertex.length; i++) {
            if (this.inBoundVertex[i] === 0) {
                q.push(i);
            }
        }
        while (!q.isEmpty()) {
            const val = q.pop();
            console.log(val);
            if (val !== undefined) {
                for (let i = 0; i < this.adjacencyList[val].length; i++) {
                    let neighbour = this.adjacencyList[val][i];
                    if (this.inBoundVertex[neighbour] > 0) {
                        this.inBoundVertex[neighbour]--;
                    }
                    if (this.inBoundVertex[neighbour] === 0) {
                        q.push(neighbour);
                    }
                }
            }
        }
    }
}

let g = new Graph(5);
g.setAdjacencyList(0, 2);
g.setAdjacencyList(0, 3);
g.setAdjacencyList(1, 3);
g.setAdjacencyList(1, 4);
g.setAdjacencyList(2, 3);
g.topologicalSorting();

/**Note
 * 
 * Topological sorting is possible only for a acyclix graph beacuse lets understand this with an example
 * 
 * 
 *                 0                         1 --------------->4
 *               |      |                   |
 *               |      |                   |
 *               |      |                   |
 *               !^     !^                  |
 *               2----> 3  <----------------
 * 
 * This is a acyclic directed graph so 
 * 
 * 0 has no dependency
 * 1 has no dependency
 * 2 has 1 dependency
 * 3 has 3 dependencies
 * 4 has 1 dependency
 * 
 * Since this graph is acyclic thus every dependcy can be solved and can be made 0 i,e all
 * the vertex inbound index value can be made 0 and we can succesfully print all the vertex
 * 
 * but in case of a cyclic graph there will be one condition after which no further 
 * dependency can be resolved or vertex inbound index value can never become 0 and thus ultimately
 * we will never be able to print all the vertex.
 * 
 */
