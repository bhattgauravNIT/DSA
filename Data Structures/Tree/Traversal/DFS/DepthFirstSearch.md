Suppose we have a tree say 

Ex:                       10
                       |         |
                      20         30
                    |   |       |   |
                   40  50      60   70

Now while traversing a tree three basic operations are needed i,e 

root value, left value, right value 

Now these three are madatory in order to correctly traverse through the tree however these three can be done in 3! ways

like say left -> root -> right 
or     right-> left->root
or left->right->root 

So in total we can have 3! i,e 6 ways of traversing through a tree in depth first fashion.
however 3 of them are very popular and in them left is always first and then right 

and they are:


InOrder:    Left -> Root -> right   (root comes in middle hence inOrder and left should always be before rigth)
Preorder:   Root -> left -> right   (root comes in front hence preorder and left should always be before rigth)
PostOrder:  Left -> right -> root   (root comes in last hence post order and left should always be before rigth)

So for above example i,e 

Ex:                        10
                       |          |
                      20          30
                    |   |       |   |
                   40   50      60   70

InOrder :  40 20 50 10 60 30 70
Preorder:  10 20 40 50 30 60 70
PostOrder: 40 50 20 60 70 30 10


Ex:                        10
                       |           |
                      20           30
                    |    |       |  
                   40    50      60   
                       |    |
                      70   80

InOrder: 40 20 70 50 80 10 60 30
Preorder: 10 20 40 50 70 80 30 60
PostOrder: 40 70 80 50 20 60 30 10
