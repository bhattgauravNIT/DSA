Binary search tree is also a kind of a tree only however its some one property which differentiate it from 
normal tree.

** Every smaller value is on the left of the parent and every greater value is on the right.
** We generally consider smaller values in binary search tree.


Lets take an example to understand this.

1. In bst: Insert(10)

Initially the BST is empty and thus we insert 10 as the root node.
                             
                              10

In bst: Insert(5)

Now 5 is smaller than the root so it must lie left of it as we are forming a BST.

                              10
                        5

2. In bst: Insert(20)
   
now 20 is greater than 10 so it must lie right of it.
                                       10
                                5             20

3. In bst: Insert(17)

now 17 is greater than 10 so we moved right, now reached 20. 17 is smaller than 20 and thus must lie left of 20 
                                      10
                                5           20
                                         17

In this way we can say that in BST every smaller node is present at left of the root and every greater value is
present at right of the root and its applicable to every root.