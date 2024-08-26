













R->R                    
8                             
  9
    10


       
       L-L          ->           right rotate                         6
        7                                                          5      7
      6
    5


    const newRoot = node.left;    // new root = 6

                    
              7
            6
         5



    node.left = newRoot.right;

            7


    newRoot.right = node

        6
    5      7


 
    R->L
    10 
          12
       11



