/**The task is to create a adjacency list representation of a undirected graph
 * 
 * For ex:  
 * 
 *     0________   1_____________3
 *     |           |
 *     |           |
 *      ______ ____2
 * 
 * So the adjacency list representation of this undirected graph will look like
 * 
 * 0 | -> 1-> 2
 *   |
 * 1 | -> 0 ->2 -> 3
 *   |
 * 2 | -> 0 -> 1
 *   |
 * 3 | -> 1
 *   |
 */

/**Approach:
 * 
 * So below we have a class Graph which we have tried to make a generic one.
 * Now we have a array of array and initilaly in the contructor based upon the number of vertex being
 * present in the graph we are initializing it as 
 * 
 * as vertex number is 4 so the arr will look like:
 * 
 * [
 * [],
 * [],
 * [],
 * []
 * ]
 * 
 * Now the user will pass the vertex which needs to be connected to another vertex so say node1 needs to be connected to
 * node 2, thus simply we make the connection via 
 * 
 * this.arr[node1].push(node2).
 * 
 * Since we are dealing with a undirected graph therefore a connection from node1 to node2 will also signify a connection
 * from node2 to node1.
 * 
 * This operation is done in 0(1) time as we know the index at which the other vertex connection needs to be pushed.
 * 
 * We could have considered an array of linked list even to achieve the same and this would have given the same time complexity
 * of 0(1) as in that case we would be inserting at the head of the linked list but however this approach has its own disadvantages
 * 
 * 1. Array of linked list is not cache friendy however array of array is cache friendly.
 * 2. The linked list would have taken addition space as array of array is taken in total 0(v+ 2*E) space as the length 
 * of the array is 0(v) since a connection from v1->v2 also implies a connection from v2->v1 so that is 0(2*E) sized
 * array inside the main array however linked list
 * would have taken more space as we also need to store the address to the next node.
 * 
 * So it would have been some 0(v+2*E + alpha);
 * 
 *  */
class Graph<T extends number> {
    arr: T[][];
    numberOfVertex: number;

    constructor(numberOfVertex: number) {
        this.arr = [];
        this.numberOfVertex = numberOfVertex;
        for (let i = 0; i < this.numberOfVertex; i++) {
            this.arr[i] = [];
        }
    }

    adjacencyList(node1: T, node2: T) {
        this.arr[node1].push(node2);
        this.arr[node2].push(node1);
    }

    getadjacencyList(): T[][] | undefined {
        if (this.arr.length !== 0) {
            return this.arr;
        }
    }

}

let g = new Graph(4);
g.adjacencyList(0, 1);
g.adjacencyList(0, 2);
g.adjacencyList(1, 2);
g.adjacencyList(1, 3);
console.log(g.getadjacencyList());