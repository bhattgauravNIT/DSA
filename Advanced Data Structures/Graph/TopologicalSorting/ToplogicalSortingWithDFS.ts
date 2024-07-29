/**Given a directed acyclic graph the task is to print the topological sorting of this graph.
 * Topological sorting can be understood by the fact that all independent vertex which doesn't have any
 * inbound is printed first then since its processed than we process the dependents vertex which having
 * having dependency from the vertex which got processed earlier, if they also became independent now
 * so we print them.
 *                         
 * 
 * For ex:                                      0           2-------------  
 *                                              |           |            |
 *                                              |           |            |
 *                                              1----------->3----------->4
 * 
 * 
 * 
 * 
 *                
 * So we look at adjacency list
 * 
 * 0:[1]
 * 1: [3]
 * 2: [3,4]
 * 3: [4]
 * 4: []
 * 
 * Now 0 and 2 are the independent nodes beacuse nothing is inbound to them
 * so we print them
 * 
 * 0,2 now 0 is processed and 2 is processed so 1 became independent now we can print 1
 * 3 became independt as it has dependency on 1 and 2 which are already processed so we can print 3
 * Now 4 became independent as it has dependency over 3 which is processed
 * 
 * So one possible o/p is 0 2 1 3 4.
 *                                                                        
 *                         
 */

/**Approach: 0(v+e),0(v)
 * 
 * 
 * For ex:                                      0           2-------------  
 *                                              |           |            |
 *                                              |           |            |
 *                                              1----------->3----------->4
 * 
 */

class Graph {
    visitedList: boolean[];
    numberOfVertex: number;
    stack: number[];
    adjacencyList: number[][];

    constructor(numberOfVertex: number) {
        this.numberOfVertex = numberOfVertex;
        this.visitedList = [];
        for (let i = 0; i < this.numberOfVertex; i++) {
            this.visitedList[i] = false;
            this.adjacencyList[i] = []
        }
    }

    setAdjacencyList(vertex1: number, vertex2: number) {
        this.adjacencyList[vertex1].push(vertex2);
    }

    dfsRecur(vertex: number) {
        this.visitedList[vertex] = true;
        for (let i = 0; i < this.adjacencyList[vertex].length; i++) {
            let adjacentsVertex = this.adjacencyList[vertex][i];
            if (!this.visitedList[adjacentsVertex]) {
                this.dfsRecur(adjacentsVertex);
            }
        }
        this.stack.push(vertex);
    }

    /**
     * Approach: 0(v+e),0(v)
     * 
     * Lets understand this with help of an example:
     * 
     * 
 * For ex:                                      0           2-------------  
 *                                              |           |            |
 *                                              |           |            |
 *                                              1----------->3----------->4
 * 
 *    The idea behind DFS toplogical sorting is that we will process a node or push the node into a stack only
 * when all its dependencies are pushed.
 * Then we pop from stack so all dependecies are pushed first and then the main vertex , so after poping all
 *  the vertex will be printed first and then the dependices as stack is Last in first out.
 * 
 *    So lets start a traversal from 0 to all vertex and maintain a visited array , if in case the vertex is not visited 
 * then we call dfs dfsRecur on that vertex.
 *     Now we simply mark it as visited.
 * 
 *    So initially we started with 0, it was not visited so we called dfs recur on it with vertex 0.
 * Now we mark vertex 0 as visited.
 *    Now we iterate over all the ajdcents of this vertex 0 which is simply 0: [1].
 *     Vertex 1 was not visited so
 *     Now again dfs recur is called with vertex 1.
 *     Vertex 1 is marked as visited and again we iterate over all its adjacents so 1: [3]
 *     
 *  Again 3 is not visited so we call dfsRecur on 3 .
 * We mark it as visited and again we itearte over all the adjacents of 3 i,e 3: [4]
 *    
 *    Again 4 is not visited so we call dfsRecur on 4 
 *     We mark it as visited and itearte over all its adjacents and since there are no adjacents of 4
 *     So we come out of the loop.
 * 
 *     The recursion call stack till now looks like:
 * 
 *     Dfs(0)
 *          Dfs(1)
 *            Dfs(2)
 *             DFS(3)
 *              dFS(4)
 * 
 *   Now for dfs(4) we came out of the loop so we push it to stack.
 *   Since this call has completed so the controller goes back to DFs(3)
 *    Dfs(3) which was in loop and has already processed its first element in adjacency list now 
 * move iteartion to i=1 but its adjacency list length was one only so it came out of loop and push 3 to stack
 * 
 *    Since dfs(3) is complete so the control goes back to the parent which is dfs(2)
 * Dfs(2) again was in loop so and move to iteration i=1 and adjacency list is 2: [3,4]
 * 
 * Now its time to process 4 in its adjacency list but 4 is already visited so we dont call for dfsRecur on 4 again.
 *    This loop has now finished and we push 2 to stack.
 * 
 *    Stack till now is [4,3,2]
 *    
 * Now the control goes back to parent i,e dfs(1)
 *   again iterator for its loop move to i=1 so iteartion gets complete and move out of loop and push
 *     1 to stack so stack looks like
 * 
 *     [4,3,2,1]
 *  Now recursion is complete and again move back to parent which is dfsRecur(0).
 *   Again the for loop iterator for it reaches i=1, thus itearyion gets complete, came out of loop and pushes
 * 0 to stack.
 *      
 *    [4,3,2,1,0]
 * 
 *    Now all dfsRecur has completed so main loop iteartion in toplogicalSortingDfs now moves to i=1.
 * 1 is already marked as visited so no call made to dfsRecur with 1.
 *    
 *  Iteration moves to i=2.
 *   i=2 is not visited so call dfsRecur with i=2.
 * 
 *    Same process continues and we in last have everything in the stack.
 * 
 *     Now simple print everything from the stack.
     * 
     * 
     */
    toplogicalSortingDfs() {
        for (let i = 0; i < this.numberOfVertex; i++) {
            if (!this.visitedList[i]) {
                this.dfsRecur(i);
            }
        }
        while (this.stack.length > 0) {
            const val = this.stack.pop();
            console.log(val);
        }
    }
}

let graph = new Graph(5);
graph.setAdjacencyList(0, 1);
graph.setAdjacencyList(1, 3);
graph.setAdjacencyList(2, 3);
graph.setAdjacencyList(2, 4);
graph.setAdjacencyList(3, 4);
graph.toplogicalSortingDfs();
