Adjacency list and adjacency matrix representation both has its own advantages and disadvantages but still in overall context
adjacency list matrix is a better option to go forward with.

Lets understand why;


  0   1   2   3                                                                  
   __________________
0 | 0  1   0   0                                     
  |
1 | 0   0   0   0
  |
2 | 0   1   0   0
  |
3 | 0   1   0   0   


  0 | -> 1-> 2
    |
  1 | -> 0 ->2 -> 3
    |
  2 | -> 0 -> 1
    |
  3 | -> 1
    |


                                     Adjacency List                                     Adjacency Matrix
Memory   :                            0(v+2*E) or 0(v+E)                                   0(v*v)

Check if
there is an edge from u to v :         0(v)                                                0(1)

Find all adjacents of u vertex
(**Imp)                       :      0(degree of u)                                        0(v)

Add an edge                :           0(1)                                                0(1)

Remove an edge            :            0(v)                                                0(1)



The main advantage is with the memory issue as adjacency list is cache friendly and at most needs 0(v+ 2E) space in case
of undirected graph however in case of matrix it always needs 0(v*v) space morever matrix representation stores redundant data i,e
even data of the vertix with are not connected with u.