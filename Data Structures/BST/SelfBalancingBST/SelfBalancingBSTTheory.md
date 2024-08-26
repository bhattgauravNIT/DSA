In a normal BST, operations like insertion, deletion, searching are generally o(h) operations in terms of
time complexity however it occurs in cases of balanced trees. 

Balanced in the sense that the tree has almost equal nodes on the left subTree and right subTrees.
By balance we mean that the Math.abs(HeightOfLeftSubTree - HeightOfRightSubTree) <= 1 for every possible node.

This 0(h) ~= 0(logn) so these operations in case of BST being balanced are logarithmic operations.


However if the balance of the tree is not maintained then it can even become skewed like

 7
   8
     9
       10
          11

In such kind of BST's the operations like insertion, deletion, searching are 0(h) only but however this time the
heigh ~= n , so all these operations becomes costlier i,e 0(n).


In order to solve such scenarios that we our ensure that the BST's height is balanced or the BST is balanced we use the concept
of selfBalancing trees.

The way we insert or delete into a BST determines wether it will be able to maintain its balance or not.
For ex: previously when we were inserting 7,8,9,10,11 into BST if we inert normally it result in a skewed tree which is not balanced i,e

7
   8
     9
       10
          11

However the same insertion if done somehow in a different manner may result in BST which is balanced.

Ex:                           9
                          8      10
                    7                 11

    Now this tree is also a BST having all the same nodes as the above skewed tree however its balanced, so the cost of operations for
    insertion, deletion , searching will be 0(h) where h~= log(n) and thus logarithmic time complexity is maintained. 

    So in this section we will be seeing how to restructure a BST such that its balance is always maintained.

Such trees which are able to maintain their balance are called self balancing binary search trees:

Ex: 

1. AVL tree

2. Red Black tree

                          

