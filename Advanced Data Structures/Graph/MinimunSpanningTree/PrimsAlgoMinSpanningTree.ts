/**Given a undirected connected weighted graph the task is to find the min weight to obtain
 * a  min spanning tree from it where all vertex are connected to each other either direct or through
 * an intermediate vertex and does not form a cycle.
 * 
 * So for example:
 * 
 *        
          5                     15
   0---------------------1-----------------3
   |                     |                 |
   |                     |                 |
 10|                     | 8               | 20
   |                     |                 |
   |                     |                 |
   |                     |                 |
   |                     |                 |
   ----------------------2-------------------

   O/p is 28

   Explanation: 

   In MST             Not in mst
   0                   1,2,3             res=  0;

   The min edge we can choose to connect 0 to all rest graph vertex is either o->1 or 0>2 min of which is 0->1 i,e 5 
   so res = 5.

   In MST             Not in mst
   0,1                   2,3             res=  5;

   Now min edge we can choose to connect 0,1 to rest of the graph is either o->1,1->2 or 1->3
   min of which is 1->2 ie, 8 so res = 5+8 = 13

    In MST             Not in mst
   0,1,2                   3             res=  8;

   Now min edge we can choose to connect 0,1,2 to 3 is 2->3 or 1->3 so min is 15 i,e 1->3
   so res = 8+15 = 28.

   This is the answer.
 */

class Graph {
    graphWeightMatrix: number[][];
    numberOfVertex: number;

    constructor(numberOfVertex: number) {
        this.numberOfVertex = numberOfVertex;
        this.graphWeightMatrix = [];
        for (let i = 0; i < this.numberOfVertex; i++) {
            this.graphWeightMatrix[i] = []
            for (let j = 0; j < this.numberOfVertex; j++) {
                this.graphWeightMatrix[i][j] = 0;
            }
        }
    }

    setGraphWeightMatrix(vertex1: number, vertex2: number, weight: number) {
        this.graphWeightMatrix[vertex1][vertex2] = weight;
        this.graphWeightMatrix[vertex2][vertex1] = weight;
    }

    /**Approach: 0(v*v)
     * 
     * Lets understand this approach
     * 
     * with the help of an example 
     * 
     *        5                     15
   0---------------------1-----------------3
   |                     |                 |
   |                     |                 |
 10|                     | 8               | 20
   |                     |                 |
   |                     |                 |
   |                     |                 |
   |                     |                 |
   ----------------------2-------------------

   So the graph weight matrix representation for the above graph will look like:
             graphWeightMatrix = [
                  [0, 5, 10, 0],
                  [5, 0, 8, 15], 
                  [10, 8, 0, 20], 
                  [0, 15, 20, 0]
            ]  
     * 
            0 is connected with 1 at weight 5 and with 2 at weight 10 i,e 1st row. Every row represents every individual vertex
            and every column also represents every vertex. The non zero enteries resembles no connection of ith row vertex with
            jth column.

            matrix[i][j] resembles weight of ith vertex with the jth vertex.

            Now the idea is to maintain a inMst boolean array which will at any point of time resembles wether an ith vertex is
            being considered into a inMst or not.

            We will be needing a keys array will initially will be storing Number.MAX_SAFE_INTEGER value.
            the keys[0] = 0;

            Now for every vertex say from 0->v we will ieterate for the keys array.
            In the keys array we will try and find the vertex which is having current min edge weight and is not in MST.

            So initially for 1st iteration 

            the initial setUp looks like:

            keys[] = [0,infinity,infinity,infinity];
            inMst[] = [f,f,f,f]

            Now we itearte over keys array and find the vertex which is not in mST and is has minValue in keys array.
            So we found vertex 0.
            So we mark it inMst as true and upadted res+= 0. where 0 is min value which we got.

            Now for this vertex we will iterate over its adjacencts in graphWeightMatrix.
            If the adjacent value in graphWeightMatrix is not zero means there is a connection to that vertex and 
            the value of keys[adjacent] > the value in graphWeightMatrix
            so we update the keys[adjacent] value = value in graphWeightMatrix.

            So now the setup looks like
            keys[] = [0,5,10,infinity];
            inMst[] = [t,f,f,f]

            Now next iteration
            we gain itearte over keys array and try to find vertex which is not in mst and has min keys value so we found
            vertex 1.
            we mark it inMst as true and updates res+= minValuefrom keys ~= 0+5 = 5.
            Now we iterate over the adjacents of 1 in graphWeightMatrix and again
            If the adjacent value in graphWeightMatrix is not zero means there is a connection to that vertex and 
            the value of keys[adjacent] > the value in graphWeightMatrix
            so we update the keys[adjacent] value = value in graphWeightMatrix.

            So setup looks like
            keys[] = [0,5,10,15];
            inMst[] = [t,t,f,f]

            This keeps on and res will be having the minSpanning tree weight.
     * 
     */
    minSpanningTreeWeight(): number {
        let keys: number[] = [];
        let inMst: boolean[] = [];
        let res: number = 0;
        for (let i = 0; i < this.numberOfVertex; i++) {
            keys[i] = Number.MAX_SAFE_INTEGER;
            inMst[i] = false;
        }
        keys[0] = 0;
        for (let i = 0; i < this.numberOfVertex; i++) {
            let index = -1;
            let minVal = Number.MAX_SAFE_INTEGER;
            for (let j = 0; j < keys.length; j++) {
                if (!inMst[j] && (keys[j] < minVal)) {
                    minVal = keys[j];
                    index = j;
                }
            }
            inMst[index] = true;
            res += minVal;

            for (let j = 0; j < this.numberOfVertex; j++) {
                if (this.graphWeightMatrix[index][j] !== 0) {
                    if (keys[j] > this.graphWeightMatrix[index][j]) {
                        keys[j] = this.graphWeightMatrix[index][j]
                    }
                }
            }
        }
        return res;
    }
}

let g = new Graph(4);
g.setGraphWeightMatrix(0, 1, 5);
g.setGraphWeightMatrix(0, 2, 10);
g.setGraphWeightMatrix(1, 2, 8);
g.setGraphWeightMatrix(1, 3, 15);
g.setGraphWeightMatrix(2, 3, 20);
console.log(g.minSpanningTreeWeight());


