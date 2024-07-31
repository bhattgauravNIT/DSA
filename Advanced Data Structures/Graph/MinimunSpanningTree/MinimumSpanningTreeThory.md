Lets suppose we have computer netowrk which looks like
           
                       5
    -----  A--------------------------D
    |       |                         |
    |       |9                        |7
    |       |             8           |
    |       B-------------------------C                     
    |                                 |
    |--------------------------------- 
                   10

    So in this network we have 4 computers namely A,B,C,D.


    Now all the computers are connected to every other computer may be directly or may be via some intermediate path.
    Every connection has a wire length say A->B wire length is 9
    A->D wire length is 5
    D->C wire length is 7
    B->C wire length is 8

    So the task is to connect these computers in such a way that every computer is connected to all other computers
    either directly or via some intermeditae path or computer and the wire used to make this overall connection
    should be min as possible.


    This kind of problem is known to be on undirected connected and weighted graph.

    These problems are solved using Minimum spanning tree .

    Since we will be using minimum spanning tree so there is no cycle as a tree does not have cycle and we need to get a configuration in which this undirected weighted graph is rearranged in such a way that every vertex is connected to
    each each via direct or some intermediate path and the weights of the entire total is min as possible and there
    should not be any loop that we will create within this new configuration.


    So this problem is solved using minimun spanning tree and we algo prism's algo to solved this.
    In prism's algo we create two sets one say 

    for vertex which are in Min spanning tree and another which shows vertex which are not yet in Min spanning tree.

   Lets take an example to understand this:
         
          5                     15
   A---------------------B-----------------D
   |                     |                 |
   |                     |                 |
  8|                     | 10              | 20
   |                     |                 |
   |                     |                 |
   |                     |                 |
   |                     |                 |
   ----------------------c-------------------



   Say for example:

   In MST                                        Not in  MST
   A                                              B,C,D

   So initially A is in MST and B,C,D vertex are not in MST

   Now we need to connect A to rest of the graph so there are two edges which does this i,e

   A->B or A->C so lesser weight is A->B so we choose this , now in MST and not in MST vertex set changes are looks like

    In MST                                        Not in  MST
    A,B                                            C,D                       res = 5

    Now A,B has to connected to rest of the graph i,e to vertex C or D

    There are three edges which does that

    A->c, B->C or B->D

    Clearly A->C is the lesser weight 

     In MST                                        Not in  MST
     A,B,C                                        D                       res = 13

     Now to connect A,B,C graph to D there are two edges

     b->d or c->d

     b->d is the lesser weight so 

     In MST                                        Not in  MST
     A,B,C,D                                                             res = 13+15 = 28


     So our MST will look like


          5                    15
     A----------------B---------------D
     |
     |
    8|
     |
     |
     C

     and res will be 28.
  
