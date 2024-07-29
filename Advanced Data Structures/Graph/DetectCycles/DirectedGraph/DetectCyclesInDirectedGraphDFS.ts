/**Given an directed graph the task is to find wether the graph contains cycle or not.
 *
 * Ex:  0-------------->1<------------2-------->3----------->4
 *                                             ^             |
 *                                             |             |
 *                                             ------------5 <
 *
 * O/p Yes.
 *
 * Clearly there is a loop at 3->4->5->3.
 *
 */

class Graph {
    adjacencyList: number[][];
    recursionStack: boolean[];
    numberOfVertex: number;
    vistiedList: boolean[];

    constructor(numberOfVertex: number) {
        this.numberOfVertex = numberOfVertex;
        this.adjacencyList = [];
        this.recursionStack = [];
        this.vistiedList = [];
        for (let i = 0; i < this.numberOfVertex; i++) {
            this.adjacencyList[i] = [];
            this.recursionStack[i] = false;
            this.vistiedList[i] = false;
        }
    }

    setAdjacencyList(vertex1: number, vertex2: number) {
        this.adjacencyList[vertex1].push(vertex2);
    }

    dfsRecur(source: number): boolean {
        this.vistiedList[source] = true;
        this.recursionStack[source] = true;
        for (let i = 0; i < this.adjacencyList[source].length; i++) {
            let neighobour = this.adjacencyList[source][i];
            if (!this.vistiedList[neighobour]) {
                const res = this.dfsRecur(neighobour);
                if (res) {
                    return true;
                }
            } else if (this.recursionStack[neighobour]) {
                return true;
            }
        }
        this.recursionStack[source] = false;
        return false;
    }

    /**Lets understand this with the help of an example.
       * 
       * Ex:  0-------------->1<------------2-------->3----------->4     
   *                                                  ^             |
   *                                                  |             |
   *                                                   ------------5 <
   * 
   * A cycle detection in case of an undirected graph is not same as that of a undirected graph.
   * 
   * Lets understand above example.
   * In case of an undirected graph lets understand with above ex.
   * 
   *    The adjacecnyList for the above graph looks like:
   *     
   *    0: [1]
   *    1: [],
   *    2: [1,2]
   *    3: [4]
   *    4: [5]
   *    5: [3]
   * 
   *    The above example will have two recursion tree will dfs traversal this we will explain so these looks like
   *     
   *    Dfs(0)
   *         Dfs(1)
   * 
   * and 
   *    Dfs(2)
   *        Dfs(3)-------------------       |
   *             Dfs(4)                     |
   *                 Dfs(5)                 |
   *                    Dfs(3) --------------
   * 
   * Clearly in the second recursion we can see that there is a back edge , this back edge signfies the presence of
   * a cycle in this directed graph.
   * 
   * SO in case of a directed graph we need to detect a back edge in cvase of cycle presence.
   * 
   * In order to detect a back edge we can se if a vertex which is already in call stack is being called again.
   * 
   * So we will maintain a recursionStack lets call it recurStack: boolean[].
   * 
   *  Lets understand this now.
   * 
   * first we itearte over every vertex with for (let i = 0; i < this.numberOfVertex; i++) 
   * in case the vertex is not visisted i,e !this.vistiedList[i] then we call dfsRecur on this vertex.
   * 
   * In dfs recur we first mark this node as visited ie, this.vistiedList[source] = true and will mark it as true in
   * recurStack i,e this.recursionStack[source] = true;
   * 
   * Now we will iterate over the adjacencyList of this source i,e for (let i = 0; i < this.adjacencyList[source].length; i++)
   * 
   * So for 0 we will itearte over the adjacency list of 0: [1]
   * Now this at adjacanecyList[0]: 1 is not visisted so with simple dfs we will again call for recursion onto this as source now.
   * 
   *  (!this.vistiedList[neighobour]) {
                  const res = this.dfsRecur(neighobour);
      }
  
      If the dfsRecur is giving a true value say for now this means there is a cycle so we simply return true.
      if (!this.vistiedList[neighobour]) {
                  const res = this.dfsRecur(neighobour);
                  if (res) {
                      return true;
                  }
              } 
      
      Now we will check if this neghibour which is trying to reach if not visisted then wether its
       already present in a call stack if yes clearly there is a loop so we return.
  
       
        else if (this.recursionStack[neighobour]) {
                  return true;
              }
  
      If no such thing is happening we will mark the recursionStack of source as true marking that no connected
      vertex of that source has tried reaching back to the source and thus the recursion stack for that source has ended
      and thus is being moved out of the stack and thus mark it as false.
  
      We return false.
  
   * 
   * 
       * 
       */
    dfsDirectedCycleMain() {
        for (let i = 0; i < this.numberOfVertex; i++) {
            if (!this.vistiedList[i]) {
                const res = this.dfsRecur(i);
                if (res) {
                    return true;
                }
            }
        }
        return false;
    }
}

let g = new Graph(6);
g.setAdjacencyList(0, 1);
g.setAdjacencyList(2, 1);
g.setAdjacencyList(2, 3);
g.setAdjacencyList(3, 4);
g.setAdjacencyList(4, 5);
g.setAdjacencyList(5, 3);
console.log(g.dfsDirectedCycleMain());
