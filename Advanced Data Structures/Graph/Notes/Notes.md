**Topic**

1. **Traversal:**
       **Directed or undirected:**

           **BFS:**: (Resembels level order traversal)
                1.1------With source:
                          **Prob:**
                                  First give me all the immediate connected vertex of the source after that give me the next level immediate connected vertex from the first neighboours and so on.

                          **Algo:**
                                  Use queue, maintain a visited boolean array.
                                   Push source to queue.
                                   mark it visisted.
                                   while(!q.isEmpty())
                                   pop and print
                                   travese through adjacency of that source
                                   if not visisted neighbour push to q.
                                   mark as visited.

                            **Note:**
                                 If source is given than probably if graph is disconnected in between we will not be able to reach the disconnected portion
                                 and thus we need to do BFS on every possible vertex.


                
                1.2-----Without source:
                            **Prob:**
                                  First give me all the immediate connected vertex from a starting vertex after that give me the next level immediate connected vertex from the first neighboours and so on.
                        
                          **Algo:**
                                Iterate over every vertex say for 0->V
                                if vertex is not visisted then call BFS on it.


                                BFS Called on ith vertex: 

                                  Use queue, maintain a visited boolean array.
                                   Push ith vertex to queue.
                                   mark it visisted.
                                   
                                   while(!q.isEmpty())
                                   pop and print
                                   travese through adjacency of that source
                                   if not visisted neighbour push to q.
                                   mark as visited.





            **2. DFS:** (Resembels something like inorder/preorder/postOrder)
                2.1------With source:
                        **Prob:**
                                  First give me one connected vertex from source and then all connected of this connected vertex
                            
                        **Algo:**
                              Use stack, maintain a visited boolean array.
                                   Push source to stack.
                                   mark it visisted.
                                   while(stack.length>0)
                                   pop and print
                                   travese through adjacency of that source
                                   if not visisted neighbour push to stack.
                                   mark as visited.


                        **Note:**
                                 If source is given than probably if graph is disconnected in between we will not be able to reach the disconnected portion
                                 and thus we need to do DFS on every possible vertex.



                2.2--------Without source:
                        **Prob:**
                                  First give me one connected vertex from a starting point and then all connected of this connected vertex
                            
                        **Algo:**
                              Iterate over all the vertex of the graph say 0->V
                              if vertex is not visisted then call DFS on it with that vertex.
                              
                              DFS Called on ith vertex with ith vertex as param:

                                   Use stack, maintain a visited boolean array.
                                   Push source to stack.
                                   mark it visisted.
                                   while(stack.length>0)
                                   pop and print
                                   travese through adjacency of that source
                                   if not visisted neighbour push to stack.
                                   mark as visited.



2. **Total connected Components: Island problem:**
      **Directed or undirected**

        **Prob:**
                Given a graph which is disconnected, give me all the number of components which are connected
        
        **Use case:**

                0               2___________3           5
                |               |
                |               4
                1

              
              **2.1 BFS:**      

                    ** Algo:**
                        
                        **Initution**: If the graph is connected as one there will be only 1 possible source but if there are n components there will be n source
                        thus we need to check how many sources we encounter or how many times we need to call BFS on ith node considering every ith vertex as source.

                        Iterate over every vertex say 0->V
                        if ith vertex is not visited
                        Increment res++
                        call BFS on ith vertex.

                        BFS on ith vertex called:
                         
                         Maintain visited boolean array and a queue
                         Mark vertex as visisted
                         while(!q.isEmpty())
                         pop from q
                         Itearte over the adjacency list of the ith vertex
                         If neighbour not visisted 
                         push it to queue
                         mark it as visisted

                         Res is the answer.

                    **Note**: Same solution as that of BFS without source just for every source if BFS on ith vertex is called increment cnt.




               **2.1 DFS:**      

                    ** Algo:**
                        
                        **Initution**: If the graph is connected as one there will be only 1 possible source but if there are n components there will be n source
                        thus we need to check how many sources we encounter or how many times we need to call DFS on ith node considering every ith vertex 
                        as source.

                        Iterate over every vertex say 0->V
                        if ith vertex is not visited
                        Increment res++
                        call DFS on ith vertex.
                         
                        DFS Called on ith vertex with ith vertex as param:

                        Use stack, maintain a visited boolean array.
                        Push source to stack.
                        mark it visisted.
                        while(stack.length>0)
                        pop and print
                        travese through adjacency of that source
                        if not visisted neighbour push to stack.
                        mark as visited.

                        Res is the answer.

                **Note**: Same solution as that of DFS without source just for every source if DFS on ith vertex is called increment cnt.


3. **Detect cycles:**

       **Undirected Graph:**
        **Initution:**
                  A cycle in an undirected graph resembles visiting a point or a vertex which is already visited but
                  Since graph is undirected this means if there exists a connection between 0>1 then a connection also
                  exists from 1->0 but this is not a cycle and this case should be handled.

                  So we maintain a parentList which resembles the parent for any vertex.
                  If we are coming on a vertex which is visited and is the parent of the currentVertex say 
                  we are traversing the adjacency list of 1 so currentVertex is 1 and we are visiting 0 , 0 is already visited but 0 is
                  the parent of 1 so there exists no loop.

       **Prob:**
                Given a graph which is undirected, tell me if there exists cycle in the graph.

        **Use case**
               
                 0------------1-------------2
                              |             |
                              |             |
                              3--------------

        **3.1 DFS**
               
               **Algo**:
                  Iterate over every vertex say 0->V
                  if the ith vertex is not visited start DFS
                  call DFS On this ith vertex with param ith vertex.

                  DFS on ith vertex called;

                  Maintain a visited boolean array,parentArray and a stack
                  Mark the ith vertex as visited
                  Push into stack
                  while(!stackisEmpty())
                  current node = pop from stack 
                  iterate over the adjacency list of the current node
                  if(adjacencyList[currentNode][i] is not visited){
                        mark as visted
                        push to stack
                        updateParent of adjacencyList[currentNode][i] as currentNode i,e update parent of 1 as 0.
                  }else{
                        check if adjacencyList[currentNode][i] is the parent of the currentNode
                        if not then its a loop.
                  }

        **3.2 BFS**

               **Algo**:
                  Iterate over every vertex say 0->V
                  if the ith vertex is not visited start BFS
                  call BFS On this ith vertex with param ith vertex.

                  BFS on ith vertex called;

                  Maintain a visited boolean array,parentArray and a queue
                  Mark the ith vertex as visited
                  Push into queue
                  while(!q.isEmpyty())
                  current node = pop from queue 
                  iterate over the adjacency list of the current node
                  if(adjacencyList[currentNode][i] is not visited){
                        mark as visted
                        push to queue
                        updateParent of adjacencyList[currentNode][i] as currentNode i,e update parent of 1 as 0.
                  }else{
                        check if adjacencyList[currentNode][i] is the parent of the currentNode
                        if not then its a loop.
                  }


      **Directed Graph:**

      
       **Prob:** Given a graph which is directed, tell me if there exists cycle in the graph.

       **UseCase:**

       
                                          --------------------------
                                          |
                                          <
                         0--------------->1----------->2----------->3
                                          ^
                                          |
                                          4
  

      **BFS:**
      **Initution:**
                  Detecting cycles in a directed graph using BFS is based on approach of topological sorting,
                  topological sorting can be understood via two types of vertex one which is independent/ having no inbound
                  vertex to it, one which is dependent and having inbound vertex to it.

                  We will be able to do a succesfull topological sort of a directed acyclic graph as its acyclic so the
                  dependecies can be resolved but however in directed acyclic graph since the dependecny is circular and
                  thus it can be topologically successfully sort and thus the number of vertex for which we have resolved the dependencied will never be equal to the total number of vertex in case of a directed cyclic graph.

            **Algo:**
                  
                  Maintian an inboundVertex number array, queue
                  Push to queue all the vertex which has no dependencies or inbound vertex array index is having 0 value.
                  while(!q.isEmpty())
                  val = pop fron queue
                  increment cnt
                  iterate over the adjacency list of the val
                  for every neighbour found from adjacency list
                  decrement its inbound vertex value in inbound array by 1
                  if(inbound array value for neighbour becomes 0 )
                  push to queue.

                  If cnt !== totalNumberOfVertex than it has a loop.

      **DFS:**
      **Initution:**
                  Detecting cycle in DFS is based on the fact that if there exits a back edge in the graph then we are confirmed that there exists
                  a cycle. So we use recursion and maintain a recurStack boolean array.
                  So if a vertex is getting visited again and is present in the recur stack as the vertex which needs to be visited if we are visiting the current vertex than its a loop.

            **Algo:**
                 
                 Maintain a visisted boolean array, recurStack boolean array
                 For every vertex say 0->v if not visited call dfsRecur

                 DfsRecur called with every non visited ith vertex

                 Mark the vertex and visited and mark the recurStack as true for the vertex.
                 Iterate over the adjacencyList of the vertex.
                 If the neighbour is not visited recursively call for dfs recur on it

                 If the neighbour is visited check whether its true in recurStack if yes then we have already
                 gone through this neighbour while reaching the current vertex and thus its a loop.

            **Note:** Prefer BFS with topological sorting technique to get loop in a directed graph.


4. **TopologicalSorting:**

     **Prob:** Given a directed graph the task is to do toplogical sorting on the graph.

     **Intution:**
           Topological sorting can be considered as a way of resolving dependencies and then 
           being able to print the vertex whose dependencies has been resolved.

      **UseCase:**   
      
                   0                         1 --------------->4
                |      |                   |
                |      |                   |
                |      |                   |
                !^     !^                  |
                2----> 3  <---------------- 

      **BFS:**             

      **Algo:**

            The vertex having no dependencies are processed first once they are processed, the vertex which are dependent
            over these vertex gets their dependency or inbound vertex count reduced by 1, if their dependency or inbound vertex count is 0, this means its dependency gets resolved and now its a candidate to be processed or printed.

            Maintain a inbound vertex count array, which can be done in the setAdjacenecy list method.
            Initially for all vertex having inbound vertex count as 0 push them to queue.
            while (!q.isEmpty())
            Pop and print from queue.
            Iterate over the adjacency list of the poped val or the current vertex.
            If the inbound vertex count is > 0, reduce by 0
            if its zero then push to queue

      **DFS**

            **Algo:**

            Once all the dependices or dependents vertex are pushed to stack then only push the independent vertex.
            Use recursion to achieve this, since stack is last in first out so all the independent vertex will be 
            printed first and then the dependents. 

            Maintain a stack, visited boolean array
            Iterate over every vertex say 0->v
            if vertex is not visited call DFS recur with ith vertex

            DfsRecur with ith vertex called
            mark the vertex as visited, 
            Traverse over the adjacency list of the vertex
            If the neighbor or adjacent node obtained is not visited
            call dfsRecur on that node.

            Once the call stack finishes for any jth call, push vertex to stack

            Once all the main iteration from 0->v is finished
            print the stack.


5. **Shortest path:**
      **Undirected Graph:**

      **Prob:**
           Given an undirected graph and a source the task is to find the shortest distance for all the vertex from this
           source.

      **Intution:**
           say we have 0->1->2
           If source is 0 , so from 0, 1 is at dist 1 
           AdjacencyList of 0: [1]
           So dist[1] = dist[0] from 0 + 1 = 0 + 1 = 1.
           Now 
           adjacencyList of 1: [2]
           So dist[2] from 0 = dist[1] from 0 + 1 = 1 + 1 = 2

           Maintain a dist array and mark it as 0 for the source as reaching source to source is 0 distance, rest everything as Integer_max_value. While iterating over the graph keep updating the dist array for the neighbours.

      **Algo:**
          Maintain a dist array and mark it as 0 for the source as reaching source to source is 0 distance, rest everything as Integer_max_value.
          Push source to queue and mark it a visited
          while(!q.isEmpty())
          const currentVertex = q.pop();
          iterate over the adjacency list of the current vertex
          If not visisted 
          mark it as visited
          push to queue
          Mark the dist array of the neighbour as +1 to that of the current vertex whose adjacency list we are iterating.



      **Directed Graph:**

      **Prob:**
           Given an directed graph with weights and a source the task is to find the shortest distance for all the vertex from this
           source.

      **Intution:**
           We will do a toplogical sorting of the directed graph this will help us in attaing a toplogical sorted array
            or sequence of vertex in which all dependicies will be sorted so anything which has dependecny will pe present
            after the main vertex is processed or we will be getting a pattern in which a node 1 if present before
            node2 will resemble that node 2 is reaching from node1.

            Now to this topological sorted list we will iterate over every index and for that vertex we will traverse over the
            adjacency list.

            We will have a dist[] which will be Infinite for all and 0 for source.

            If 

            dist[neighbour] > dist[currentVertex]+ weight(currentVertex,neighbour) we will update

            dist[neighbour] = dist[currentVertex]+ weight(currentVertex,neighbour) 

      **Algo:**
          The main method will fisrt call a method whcih will provide the topologocal sortred pattern of
          the graph.
          Topological sorting can be attained via BFS or DFS.

          Now we traverse through the toplogical sorted array and 
          currentvertex = topological[i] ;

          Now we will traverse over adjacencyList of currentVertex.
          adjacents  = adjacencyList[currentVertex]
          for(adjacent of adjacents)
          if(dist[neighbour] > dist[currentVertex]+ weight(currentVertex,neighbour) we will update
           dist[neighbour] = dist[currentVertex]+ weight(currentVertex,neighbour) 

           dist is the answer.
)

      
          