The major difference between a tree and a graph is that a tree represents hierarchy whereas a graph does not
represents a hierarcy.

For example: In i need to show a organization data then its a hierarchy and can be represnted using a tree whereas
if a talk about freinds on social media then its unhierarchical.


Definition:

Graph is represented as pair of sets. In which first set is a vertex and second set are edges.

i,e   Graph = (V,E)

where V= {v1,v2,v3,v4,v5...... }
      E = {(v1,v2),(v2,v3)......}

So V is called vertex and E is called edges for ex: 


                  V1-------------------V2-----------
                                       |            |___v3
                                       |
                                        v4

In the above graph v1,v2,v3,v4 are the vertices of the graph.

If we talk about edges so they will be (v1,v2),(v2,v3),(v2,v4)

So the garph can be written as Graph = ({v1,v2,v3,v4},{(v1,v2),(v2,v3),(v2,v4)})

----------------------------------########################################----------------------------------------------

**Types of graphs:

Graphs are generally of two type:

1. Undirected
2. Directed


If in the edges lets say we have edges in a graph as (v1,v2),(v2,v3),(v2,v4) so this is non directional and say (v1,v2) ~= (v2,v1)
i,e we can move in any direction even from v1->v2 or from v2->v2 then its termed as unidercted graph.
Ex:  V1-------------------V2-----------
                          |            |___v3
                          |
                          v4


However in the case if (v1,v2) != (v2,v1), i,e we have a set direction that the edge can go from v1->v2 but not from v2->v1 
then (v1,v2) != (v2,v1) holds true and such kind of graphs are termed as directed. 
Ex:  V1------------------->V2<-----------
                                         |___v3
                          ^          
                          |            
                          |
                          v4

-------------------------------------#####################################-----------------------------------------------
Terminologies:

1. Degree of a vertex:    Degree of a vertex is defined as the number of edges passing through the vertex or the number
of the vertex which are connected to it.

For ex: In case of unidirected graph:

Ex:  V1-------------------V2-----------
                          |            |___v3
                          |
                          v4

The degree of V2 = 3 as three edges are passing through it i,e (v1,v2),(v2,v3),(v2,v4).


For ex: In case of directed graph there are two types of degree i,e indegree and outDegree

Ex:  V1------------------->V2<-----------
                                         |___v3
                          ^          
                          |            
                          |
                          v4


InDegree- as name suggest refers to the number of inbound edges to that vertex ie, for ex: V2(indegree) = 3
OutDegree- as name suggest refers to the number of outbound edges to that vertex ie, for ex: V2(outdegree) = 0

Sum of all the indegree in a directed graph = Number of edges in graph = |E|
Sum of all the outdegree in a directed graph  = Number of edges in graph = |E|

For ex: all the indegree of all the vertex are 3 and all the edges in the graph is also 3.
all the outdegree of all the vertex are 3 and all the edges in the graph is also 3.


Now in case of an unidirected graph sum of degree is simply 2*|E| i,e twice the edges in the graph.

Lets take example to understand.

Ex:  V1-------------------V2-----------
                          |            |___v3
                          |
                          v4

Sum of all degree = degree of v1 + degree of v2 + degree of v3 + degree of v4
                  =    1+ 3+ 1+ 1
                  =    6

ALl the edges of the graph = 3 so 
sum of degree = 2* |E|.


----------------------###############################################----------------------------------

Perfect directed graph:

A perfect directed graph is one in which every vertex has one inbound and one outbound.

Ex:                   
V1------------------->V2----------->v3
   <----------------- ^  <----------      
                      | |           
                      | |
                      v4 

Max number of edges in this case is =  |V| * (|V-1|); 

Ex:                                     v1
                                   ||      ||
                                   v2   _   v3
                                        _


As there are v vertices and every vertix can make edges with v-1 vertex . (-1) because we are not considering self loops.


undirected graph:

In an undirected graph we can have max number of edges  =  (|V| * (|V-1|))/2 as 

Ex:                                    v1
                                   |        |
                                   v2   _   v3

here we have divided by half because  say we have an edge (v1,v2) and (v2,v1) so since both are equivalent in case of 
unidirected graph thus it will be divided by half.


----------------------------------------################################----------------------------------------

1. Walk: If we are going from one vertex to another with one or more vertex getting visited more than once is considered
as a path.


2. path: If we are going from one vertex to another without any vertex getting visited more than once is considered as
a simple path


Ex: V1------------------->V2----------->v3
   <----------------- ^  <----------      
                      | |           
                      | |
                      v4 

    v1,v2,v4,v2 is a walk whereas   v1,v2,v2 is a simple path.

Cyclic refers when we can have a walk which begins are end on the same vertex i,e in above above v1,v2,v4,v2 is a cyclic directed graph.
                          
Acyclic refers when we cannot have a walk such that we can begin and end at the same vertix.

ex:                         v1       >         v2
                                               ^
                            ^
                           v4          >        v3

In the above graph  we cant start and end at the same vertix thus its an example of acyclic directed graph or directed acyclic graph
(DAG).


-------------------------------------------####################################----------------------------------------

Weighted and unweigthed graph

If there is some weight/value assigned to edges in a graph than its termed as weighted graph whereas in case there is no
weights assigned to edges of a graph than its termed as unweighted graphs.

