So previously we learned about adjacency matrix representation.

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



Now lets understand adjacency list representation for the same above graph.

Ex:  V0------------------->V1<-----------
                                         |___v2
                           ^          
                           |            
                           |
                           v3




0 | -> 1
  |
1 |   
  |
2 | ->1
  |
3 | ->1

Considering only outbound

Clearly 0 is only connected to 1.
1 is not connected to anything i,e no outbound.
2 is connected only to 1
3 is connnected only to 1

So the overall addition sapce needed to represent this graph in a adjacency list pattern is 0(v)+(E) where v is vertix and E are
the edges.


Lets take ex of an undirected graph

 0-------------------1-----------
                      |            |___2
                      |
                      3

So adjacnecy list representation of this graph will look like:



0 | -> 1
  |
1 | -> 0 -> 2 -> 3 
  |
2 | ->1
  |
3 | ->1

So 0 is connected to only 1
1 is connected to all 0, 2 and 3
2 is connected only t0 1
3 is connected only to 1

So in case of an adjacency list representation of a undirected graph it can take at max 0(v+ 2*E) space where v is vertix and
E is edges.

Now its 2*E because if 0 is connected to 1 then this automatically means 1 is also connected to zero and thus every E edges
has to be considered twice.


This representation can be achieved via linked list of array or every array of dynamic sized arrays.