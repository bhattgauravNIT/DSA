All the other datastructures like stack,array,linkedlist,queue etc were linear datastructure.

Tree is a non liner datastructure and is a hierarchical datastructure.


Ex:                         10
                       |         |
                      20         30
                    |   |       |   |
                   40  50      60   70

Node: Everything in a tree is a node which are interconnected to each other. For ex: 10,20,30...etc all are nodes.

Root: The node from which the tree grows is termed as root. For ex: 10 in the above case.

Leaf: The nodes which has no children or where the tree terminates is termed as leaf nodes ex: 40,50,60,70.

Parent: All nodes which has a child or a new branch is termed as parent. Ex: 10 is parent of 20 & 30.

Child: The nodes which are originated from a other node is termed as child ex: 20 & 30 and child of 10.

Subtree: So the root node as two subTrees one on left which is 20,40 & 50 . One on the right which is 30,60,70.

Descendants: Descendants is termed as all the nodes which lie in the subtree with this node as the root.
                Ex: if we want to get Descendants of 20 , so it will be all the nodes in the subtree which has 20 as the root.
                So Descendants of 20 are 40 and 50.
                eX: Descendants of 10 is everything below it.

Ancestors: So 40 is the child of 20 and 20 is the child of 10 so ultimately 40 is the grandchild of 10. Such hierarchical format
           is termed as Ancestors.

Degee: The total number of child of any node is termed as the degree of that node. Ex: 10 has 2 child so its degree is 2.
          20 has 2 child so again its degree is 2. 40 does not have any child so its degree is 0 and thus all leaf nodes has
          degree as 0.

Some applications of tree datastructure are

1: HTML/XML reading
2: Folder structure

etc.


A binary tree is considered as a tree which has atmost 2 nodes i,e it can either has 0 node or 1 node or 2 node.

Ex:                                      10
                                     2        3
                                4          7    8