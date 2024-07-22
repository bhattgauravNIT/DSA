So in coading world we need a representation of a graph for ex:


Say our graph is an undirected graph like:

  0-------------------1-----------
                      |            |___2
                      |
                      3

So in order to represent this in a coading world we can use a adjacency matrix lets understand this.



Suppose we have v number of vertices , in above case we have 4 vertices so in order to represent this we will be needing
a v*v matrix which will a entry zero in case there is no edge/connection from this vertix to other vertix else it will
have 1.


So adjacency matrix for above graph will look like:

   0   1   2   3
   __________________
0 | 0   1   0   0
  |
1 | 1   0   1   1
  |
2 | 0   1   0   0
  |
3 | 0   1   0   0

So lets index every vertix as 0,1,2,3 so 

Every row and column index represents a individual vertix and [i][j] represents whether ith vertex has a connection with jth vertix or not.

So in above example 0 vertix is connecyted t0 only 1 so v[0][1] = 1 rest everything on 0th row will be 0.
1 vertix is connected to 0, 2 and 3 so v[1][0], v[1][2], v[1][3] will be 1 rest everything will be 0.
2nd vertix is connected only to 1 so v[2][1] will be 1 rest everything will be 0.
3rd verix is connected to only 1 so v[3][1] will be 1 rest everything will be 0.


This is the adjacency representaion of a matrix .


In case of a directed graph we can simply take which connection is going out from the particular vertix in creation of a adjacency matrix graph.

Ex:  V0------------------->V1<-----------
                                         |___v2
                           ^          
                           |            
                           |
                           v3


  0   1   2   3
   __________________
0 | 0  1   0   0
  |
1 | 0   0   0   0
  |
2 | 0   1   0   0
  |
3 | 0   1   0   0

Clearly v0 has only one edge going out twoards v1 so v[0][1] = 1, rest 0 for v0.
for v1 nothing is going out from the vertix so eveyrthing is 0.
for v2 only v1 is connected via out so v[2][1] = 1 rest zero.
for v3 again only one outbound connection v[3][1] = 1.

The point here is if we are considering an outbound connection for one vertix then only outbound connection should be taken into
consideration for rest other vertix even.
If inbound connection is taken into consideration for one matrix then all the other vertix should also be considered into
inbound only while creation of adjacency matrix.


Lets suppose in case the undirected graph that we have is having specif vertix name ex:

A-------------------B-----------
                      |            |___C
                      |
                      D

Then first we need to have a mapping of these names with indices

Say ex:     an array of strings                    [A,B,C,D].

Now using this array index we have to formulate the adjacency matrix which will look something like

  0   1   2   3
   __________________
0 | 0   1   0   0
  |
1 | 1   0   1   1
  |
2 | 0   1   0   0
  |
3 | 0   1   0   0


Now say i need to remove a connection/edge from B to C then i need to make v[1][2] as 0 and since its undirected so 
the edge also has to be removed from C to B i,e v[2][1] = 0 so the new adjacency matrix will look like

 0   1   2   3
   __________________
0 | 0   1   0   0
  |
1 | 1   0   0   1
  |
2 | 0   0   0   0
  |
3 | 0   1   0   0


Deletion operation in a adjacency matrrix is 0(1).
Similary insertion opration of a edge in case of a adjacency matrix is also 0(1).

Find number of corresponding vertex for a given vertex or degree: 0(v) as say we need to find all the corresponding vertex 
to a vertex say 0 so we have to iterate over the entire row 0 and check for all columns which are having value 1.

Number of edges : 0(v) as say we need to find all the edges
to a vertex say 0 so we have to iterate over the entire row 0 and check for all columns which are having value 1.

Additional space required for a adjacency matrix pattern for reprsentation of a graph will always be 0(v*v) where
v is the number of vertex in the graph.


-------------------------------########################################-------------------------------------


There are some problems associated with this adjacency matrix representation :
 
Ex:  V0------------------->V1<-----------
                                         |___v2
                           ^          
                           |            
                           |
                           v3


  0   1   2   3
   __________________
0 | 0  1   0   0
  |
1 | 0   0   0   0
  |
2 | 0   1   0   0
  |
3 | 0   1   0   0


Now this matrix is holding info about the edges or vertix which are connected to a individual vertix but however also 
is holding unnecessary info about which vertex it's not connected to i,e all the zero enteies which is cause always a space
compelxity of 0(v*v) where v is the number of vertex.

In order to make this more optimized and effecient we can use Adjacency list representation.



