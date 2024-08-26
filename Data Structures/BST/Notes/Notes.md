*Binary Search Trees:*


*Operations in BST:*

**1. Insert in BST:**
      **Intuition:** BST maintains a property that every value smaller than root value is present on left of it and every value greater than root is present on right of it. Use a current to reach to a correct position where the value to be inserted should be placed.
      Keep track of parent of current and depending whether value to be inserted is smaller or greater than parent value, insert at left or right respectively.

      **Algo:** Using recursion

      if(root===null) return a new BST node of value to be inserted.
      if(insertValue < root.val){
            make root.left linkage as recursivelyCall(root.left, value to be inserted);
      }
      if(insertValue > root.val){
            make root.right linkage as recursivelyCall(root.right, value to be inserted);
      }
      return root.



      **Algo:** Iterative

      if(root===null) return a new BST node of value to be inserted.
      Use a current initially equal to root to find the correct position where this new BSTNode is to be inserted.
      Maintain a current to place the node there.

      while(current !== null){
            parent = current
            if(x < current.val){
                  current = current.left
            }
            if(x > current.val){
                  current = current.right;
            }
            if(x === current.val){
                  return root stating that we are not allowing duplicates to be inserted into the BST.
            }
      }

      check if value to be inserted is lesser than parent.val then insert a new BST node at parent left.
      check if value to be inserted is greater than parent.val then insert a new BST node at parent right.
      return root.



**2. Search in BST:**
     **Intuition:** BST maintains a property that every value smaller than root value is present on left of it and every value greater than root is present on right of it. So check whether root value is lesser or smaller than the node value to be searched.

     **Algo:** Using recursion:

     if(root === null) simply return false as the BST is itself empty or even after traversal the target value is not found.
     if(root.val === target value) simply return true as we found the value
     else if(targetValue < root.val) return the recursive  function call for left subTree
     else(targetValue > root.val) return the recursive function call for right subTree 



     **Algo:**  Iterative

     if root is null return false as the BST is itself empty.
     Use a current which initially is equal to root to iterate over the BST.
     while(current !== null){
      if(root.val === targetValue) return true;
      if(targetValue < root.val) move left as current = current.left;
      if(targetValue > root.val) move right as current = current.right;
     }

     if we come out of the loop return false stating that the value is not present in BST.



**3. Delete a key in BST**
      **Intuition:** There can be generalized three types of nodes which could be deleted from a BST.
                     1. A node which is having either left child or a right child.
                     2. A node which is not having any child or a leaf node
                     3. A node which is having both left as well as right child.

      **Algo**

      function closestGreaterValueNode(root)
      mark a current as right of the root i,e current = root.right;
      Find the left extreme leaf node
      This node will be the closestGreater value node.

      Delete function:
      If root is null return null stating either we are deleting from a null BST or we reached null node.
      if(x < root.val){
            make linkage of root.left = recursivelyCalling function on left subTree (root.left,x);
      }
      else if(x > root.val){
            make linkage of root.right = recursivelyCalling function on right subTree (root.right,x);
      }
      else (stating that the root.val ===x) so we found the node which is to be deleted
      {

      ****case 1:** this root has only one child**

      if(root.left && !root.right){
            return root.left, so we cut the link and return right subTree of root to its parent call.
      }
      if(!root.left && root.right){
            return root.right, so we cut the link and return left subTree of root to its parent call.
      }

      ****case2:** this root is a leaf node**
       if(root.left === null && root.right === null){
           return null;
       }

       **case3: this root is having both left anf right child**
       find the closestGreaterValueNode from the current or even the closestSmallerValueNode
       let suppose we called for closestGreaterValueNode
       so this will return a node which is has value next Greater than current node.
       we make the current node value as this value.
       Now we will delete this node which had value next Greater previously than current node by recursively calling
       function delete on right subTree as its present at right only and with value closestGreaterValueNode.val;

       so 
       let temp = closestGreaterValueNode(root);
       root.val = temp.val;
       delete(root.right, temp.val)
      }

      Note: This logic used for finding the closestGreaterValueNode for a given node works only in case when node has both left
            and right children and thus cant be used for any other case as it will fail.



---------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>-------------------------------------------------------

*Problems:*

**1. Smallest Closest value node/ floor of node value in BST:**
     **Intuition:**

     **Algo:**



**2. Greater Closest value node/ ceil of a node value in BST:**
     **Intuition:**

     **Algo:**



**3. GreaterClosest value on left in an array:**
      **Intuition**

      **Algo**



**4. Rotate a BST in right/clockwise from root:**
     **Intuition:**

     **Algo**



**5. Rotate a BST in left/anti-clockwise from root:**
     **Intuition:**

     **Algo**



**6. Kth smallest element in BST** 
     **Intuition**

     **Algo1:**



**7. Is a BST:**
     **Intuition**

     **Algo**


**8. Fix BST with two nodes swapped**
      **Intuition**
      
      **Algo**

     

