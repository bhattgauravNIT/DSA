Binary heap datastructure is based on complete binary tree.

A complete binary tree is a tree in which all nodes in case have child have proper 2 children and apart from last
level every node should have 2 children and in last level even if the nodes are not having 2 children then it must
be complete from left to right.

For ex:

              1
        2           3
   4       5     6      7

   Is a complete binary tree because every node has two children.


              1
        2           3
   4            6      7


   Is not a complete binary tree beacuse from the last level which is 4 null 6 7 we can see that its not having
   all 2 child from left to right. 2 is not having its right child.



            1
        2         3
   4       6    7

   Is a complete binary tree because all nodes are having 2 child, if we see 3 is only having one child which is 7 in last level but the last level is complete from left to right and last level can't have 2 chil which is fine but
   it should be dircted left to right complete on last level.


   Heaps are generally stored in arrays and since if we do level order traversal and the tree is complete then we will
   never have a null/undefined value introduced in between the array thus its imp that the tree is complete.


   Heaps are of two types:

   1. Min Heap
   2. Max heap

   **min heap**:
        A min heap is a complete binary tree in which the lowest value is having the highest priority i,e its present at the root of the tree and all rest values are always greater than this value or all roots should be min of the subtree rooted by it.

        Ex:     

                              20
                    25                     38
            240             230           40       100
              

        Is a min heap.


    **Max heap:**
        A max heap is a complete binary tree in which the highest value is having the highest priority i,e present at root of the tree and all lower decesendts of it must be having value smaller than it or every root should be greatest of all the subTree rooted by it

        Ex:                             100
                                80               90
                            60      70         75     55

        Is a max heap.

    **Properties:**

      Lets take an example of max heap

       Ex:                             100
                                80               90
                            60      70         75     55

        If we map it to an array to it look like

        100 80 90 60 70 75 55   -----------> Level order

        1. The left right of any ith index = 2i+1.   i,e left child of 100 is 80 which is at index 1. (2*0+1) = 1
        2. The right child of any ith index = 2i+2.  i,e the right child of 100 is 90 which is at index 2. (2*0+2) =2
        3. Parent of any ith node is Math.floor(i-1/2).
   
   **Note**

   In heap datastructure althrough the pictorial representation is that of a tree but we are manily focused on
   array side of the things while considering opeartions in heap.