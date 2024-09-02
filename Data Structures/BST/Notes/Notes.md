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
                     2. A node which is not having any child or is a leaf node
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

       **case3: this root is having both left and right child**
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
            and right children and thus cant be used for any other generalized case as it will fail.



---------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>-------------------------------------------------------------


*Problems:*


**1. Smallest Closest value node/ floor of node value in BST:**
     **Intuition:** Inorder traversal always give sorted array in case of BST so get the sorted array and find the closest smallest 
                    number compared to the given x value. 

     **Algo1:** 
            function getInOrder(root, inorder[])

            if root is null return inorder[];
            recursivelyCall for left root (root.left, inOrder);
            push root to inOrder[];
            recursivelyCall for right root (root.right, inOrder);
            return inOrder;

            function closest smaller

            if root === null return null stating there exists no node whose value is closest smaller to given input value.
            let inOrder[] = call function getInOrder(root);

            if lastIndex value of inOrder is smaller than input value then this value itself is the closest smallest.
            if firstIndex value of inOrder is itself greater than input value than the input value has no closest smaller value.

            Iterate over the inOrder array and find the first element after which the next element in array is greater than the input
            value or the element which is equal to the input value.

            This element is the result.


      **Intuition:** 
      
                                 10
                        5                15
                                  12           30
   
                  x = 14
            If we are moving right in a BST this means that value which we are trying to search is greater than the existing root val. Since the root val is 
            lesser than the input value and thus this root val is a potential candidate for being the floor/ smallest closest number in comparison to x.


     **Algo2:**

           if root is null return null, stating there exists no value which is floor of given input value.
           Maintain a current equal to root initially to traverse through the BST.
           while(current !== null){

            if(x > root.val){
                  current = current.right;
                  res = current.val;
            }else if(x < root.val){
                  current = current.left;
            }else{
                  return x;
            }

           }
           return res;
            


**2. Greater Closest value node/ ceil of a node value in BST:**
     **Intuition:** Inorder traversal always give sorted array in case of BST so get the sorted array and find the closest greater 
                    number compared to the given x value. 

     **Algo1:** 
            function getInOrder(root, inorder[])

            if root is null return inorder[];
            recursivelyCall for left root (root.left, inOrder);
            push root to inOrder[];
            recursivelyCall for right root (root.right, inOrder);
            return inOrder;

            function closest greater

            if root === null return null stating there exists no node whose value is closest greater to given input value.
            let inOrder[] = call function getInOrder(root);

            if lastIndex value of inOrder is smaller than input value then the given input value is having no closest greater element.
            if firstIndex value of inOrder is itself greater than input value than this value itself is the closest greater.

            Iterate over the inOrder array and find the first element in array is greater than the input
            value or the element which is equal to the input value.

            This element is the result.



      **Intuition:** 
      
                                 10
                        5                15
                                  12           30
   
                  x = 14
            If we are moving left in a BST this means that value which we are trying to search is lesser than the existing root val. Since the root val is 
            greater than the input value and thus this root val is a potential candidate for being the ceil/ greater closest number in comparison to x.

     **Algo2:**

           if root is null return null, stating there exists no value which is floor of given input value.
           Maintain a current equal to root initially to traverse through the BST.
           while(current !== null){

            if(x > root.val){
                  current = current.right;
            }else if(x < root.val){
                  current = current.left;
                  res = current.val;
            }else{
                  return x;
            }
           }
           return res;
            



**3. GreaterClosest value on left in an array:**
      **Intuition:** Keep formulating a BST such that for any ith index in array the bST contains all element from 0-> i-1 i,e left side
                  element and for the ith index element find the closest greater element/ceil in BST.

      **Algo**
           push -1 to res, indicating that for index = 0, there exits no element greater to left of it.
           create a new BST node with i=0, index element and mark it as root.

           iterate over the given input array.
           mark root as current and ceil as -1.
           iterate over the bST using current

           if(current.val < arr[i]) move right
           else if(current.val > arr[i]) move left and update ceil as its a potential candidate.

           once iteration over BST is done push ceil to res.
           Push arr[i] to BST as a new node. 




**4. Rotate a BST in right/clockwise from root:**
     **Intuition:**    
             7                                  
            6                 ->>>>>      
          5

                                                      6
                                                 5        7

     **Algo:**
           let newRoot = currentRoot.left;
           currentRoot.left = newRoot.right;
           newRoot.right = root




**5. Rotate a BST in left/anti-clockwise from root:**
     **Intuition:**    
             7                                  
               8                 ->>>>>      
                 9

                                                      8
                                                 7        9

     **Algo:**
           let newRoot = currentRoot.right;
           currentRoot.right = newRoot.left;
           newRoot.left = root





**6. Kth smallest element in BST** 
     **Intuition:1** The inorder traversal of a BST gives a sorted array, so get the inOrder traversal and find kth smallest
     element in sorted array.

     **Algo1:**

            function getInOrder(root, inorder[])

            if root is null return inorder[];
            recursivelyCall for left root (root.left, inOrder);
            push root to inOrder[];
            recursivelyCall for right root (root.right, inOrder);
            return inOrder;

            function kth smallest

            if root is null return undefined stating there exits no kth smallest element
            inOrder = call getInorder();
            return inOrder[k-1];



      **Intuition:2** Instead of completely doing inOrder and thus storing and then finding the kth smallest can we find it 
        during inOrder traversal only.

      **Algo2:**

           function kth smallest

           let obj = { cnt: 0, value: -1 }; -1 signifies initially no kth smallest element exits.
           obj = callInorder(root,obj);
           obj.value === -1  return undefined else return obj.value


           function Inorder

           if root === null return obj;
           obj = recursively call inOrder function on left subTree (root.left,obj);
           increment obj.cnt;

           check if obj.cnt === k
               update obj.value as root.val indicating this is the kth smallest element;

            obj = recursively call inOrder function on right subTree (root.right, obj);
            return obj




**7. Is a BST:**
     **Intuition1:** Inorder traversal of a BST always give a sorted array, in case array is not sorted then its not a BST.

     **Algo:**
           function getInOrder(root, inorder[])

            if root is null return inorder[];
            recursivelyCall for left root (root.left, inOrder);
            push root to inOrder[];
            recursivelyCall for right root (root.right, inOrder);
            return inOrder;


            function isBST
            if root is null return true indicating that its a BST.
            let inOrder = call function getInOrder with root
            iterate over the inOrder array from index = 1
            if(inOrder[index-1] !== inOrder[index]) simply return false;
            
            else return false;



      **Intuition2:**
      
                                                        20               ->>>>>   (-Infinity to +Infinity)
                      (-infinity to 20)           8          30           ------------------------>       (20 to +infinity)
                       (20 to 30)                        18       35        ----------> (20 to 30)

            In order for a tree to be a BST every node should fall in a specific range i,e say if root is between -Infinity to +Infinity , then its left child
            should be between -Infinity to root.val and its right child should be between root.val to +Infinity. If the range is violated for any node then its
            not a BST.

      **Algo2:** 

           function isBst(root, lowerLimit = -Infinity, upperLimit = +infinity);
           check if root.val > lowerLimit && root.val < upperLimit is getting violated then return false;
           let isLeftBst = recursivelyCall for leftBst with root.left and modified upper range while lowerRange remains same
           let isRight = recursively call for rightBst with root.right and modified lowerLimit with upperRange remains same
           return isLeft && isRight




**8. Find BST with two nodes swapped**
      **Intuition1** The inOrder traversal of a BST should be a sorted array, since the tree is corrupted by 2 nodes therefore there are 
           two values in inOrder traversal which which are misplaced.
           Case1: Two values misplaced are present adjacent to each other
           Case2: Two values misplaced are not adjacent to each other.
      
      **Algo1**
          
           function getInOrder(root, inorder[])

           if root is null return inorder[];
           recursivelyCall for left root (root.left, inOrder);
           push root to inOrder[];
           recursivelyCall for right root (root.right, inOrder);
           return inOrder;


           function fixBst

           if root === null return {val1: undefined, val2: undefined};
           let inOrder = getInOrder call with root;
           maintain val1 with initial value as Infinity;
           maintain val2 with initial value as Infinity;
           iterate over inOrder traversal from i=1
           if(inOrder[i]< inOrder[i-1]){
             if(val1 === infinity){
                  val1 = inOrder[i-1];
                  val2 = inOrder[i];
             }
             if(val1 !== infinity){
                  val2 = inOrder[i];
             }
           }
           return {val1, val2};

      

      **Intuition2:** Instead of first calling inOrder and then storing in an array, and then checking for nodes which are culprits, if we can somehow
           do this while doing inOrder traversal only then it will be a better solution.
           

      **Algo2:** 

          function fixBst

          mainTain an obj having three properties root1 which has value of first culprit node, root2 which has value of second culprit node and a prev.
          All three should be null initially.
          if root is null return obj
          call function ModifiedInOrder with root and obj as argument.


          function ModifiedInOrder(root, obj)

          if root is null return obj;
          let obj = recursivelyCall for ModifiedInOrder with root.left;
          if(root.val <  obj.prev) stating that the property of BST inorder is being violated then
          {
            if(obj.roo1 === null){
                  obj.root1 = prev;
                  obj.root2 = root.val
            }
            if(obj.root1 !== null){
                  obj.root2 = root.val
            }
          } 
          These above case is same as the above approach where 
          Case1: Two values misplaced are present adjacent to each other
          Case2: Two values misplaced are not adjacent to each other.

          prev = root.val , sets the previous value for upcoming recursive call.

          let obj = recursivelyCall for ModifiedInOrder with root.right;
          return obj;


**9. Pair sum with given BST:**
          **Intuition:** Maintain a map and for every node check if mp contains a key of (sm-node.val), if yes there exits a pair with sum sm
           else simply insert the node's val in map. Its similar to two sum.


          **Algo:**

          function traversal(root, obj: {isPairSum})

           if root is null return obj indicating we have reached a null node.
           recursivelyCall for left root (root.left, obj);
           if(!mp.has(sm - root.val)){

            indicating that map don't contain sm - root.val for this root and thus we can't form a pair with this node's value.
            mp.set(root.val,1) thus we set the map with this node's val.

           }else{

            indicating that map contains a pair with sum k for this root node.
            obj.isPairSum = true
            return obj
           }

           recursivelyCall for right root (root.right, obj);
           return obj;


           function hasPairSum

           if root is null return false indicating there exists no pair with sum k as root itself is null and tree is empty.
           maintain an obj = {isPairSum: false};
           obj = call function traversal(root,obj);
           return obj.isPairSum;
            


-------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>--------------------------------------------------------

*View of trees*


**1. Vertical sum in Binary tree:**
          **Intuition:**   For ex: 
                                 10
                            20        30
                        5        15
   
                                                    So o/p is 5,20,25,30
            
            All nodes with same horizontal distance lies on same vertical line or are on same vertical level. We need to find sum of all nodes with same horizontal
            distance.Thus use hashing to store horizontalDist -> sum of nodes in the same horizontal dist.
            
            Horizontal distance is
            horizontalDist of leftChild = horizontalDist of parent - 1.
            horizontalDist of rightChild = horizontalDist of parent + 1.

            Maintain a map which <horizontalDist, sum>.
            If we encounter a node whose horizontal dist is already present in map, then update the value of the map for that horizontalDist
            by adding the nodes value.

            If we are encountering the horizontal dist for the first time, set in map and mark the value as node.value.
   

          **Algo:**

          function getVerticalSum(root, hd = 0)

          if root is null return
          if map doesn't contains hd then set hd in map with value root.val
          else if map contains hd update the hd key in map with (currentValue of map)+ root.val
          recursivelyCall the function getVerticalSum with (root.left, hd-1)
          recursively call the function getVerticalSum with (root.right, hd+1)


          function verticalSum(root)

          if root is null return null indicating there doesn't exist any vertical sum in this empty tree.
          Maintain a map which is global variable

          call function  getVerticalSum(root)

          Now the map contains all the sum of every horizontal distance
          sort the map as we need to give sum of all vertical levels from left of the tree.
          let arr = Arrays.form(mp);
          arr.sort((a,b)=> a[0]-b[0]) indicating we are sorting by keys
          convert this array into map
          mp = new Map(arr);
          traverse through the map and print all values of the map.




**2. Vertical traversal of a Binary tree:**   
          **Intuition:**   For ex: 
                                 10
                            20        30
                        5        15
   
                                                    So o/p is 5,20,10,15,30
            
            All nodes with same horizontal distance lies on same vertical line or are on same vertical level. We need to find all the nodes with same horizontal
            distance and thus use hashing to store horizontalDist -> [nodes.value]
            
            Horizontal distance is
            horizontalDist of leftChild = horizontalDist of parent - 1.
            horizontalDist of rightChild = horizontalDist of parent + 1.

            Maintain a map which <horizontalDist, []>.
            If we encounter a node whose horizontal dist is already present in map, then update the value of the map for that horizontalDist
            by pushing node.value to found key in map.

            If we are encountering the horizontal dist for the first time, set in map and mark the [value of node.value]

            Fill the map via level order traversal, to successfully handle the cases of two node with same horizontal distance overlapping and not being
            on top or bottom of each other.

            For level order traversal maintain a queue of pair {node: TreeNode, horizontalDistance: number}
   

          **Algo:**

          function getVerticalRoots(root)

          push root to queue
          while(!q.isEmpty())
          {

            let item = pop from queue;
            check if item.horizontalDist is present in map
            if present modify the key of horizontal dist via pushing (root.val) in array of values of the key.
            if not present insert the horizontal dist as key against [root.val] in values of the key.

            if(left child of item exists) push left child in queue with horizontal distance as item.horizontalDist + 1.
            if(right child of item exists) push right child in queue with horizontal distance as item.horizontalDist - 1.

          }

          The map will get set with all possible horizontal distance against array of nodes against it.
          


          function verticalTraversal(root)

          if root is null return null indicating there doesn't exist any vertical traversal in this empty tree.
          Maintain a map which is global variable
          call function  getVerticalRoots(root)

          Now the map contains all the possible horizontal distance against array of nodes against it.
          sort the map in ascending order because we need to give vertical traversal from left most
          let arr = Arrays.form(mp);
          arr.sort((a,b)=> a[0]-b[0]) indicating we are sorting by keys
          convert this array into map
          mp = new Map(arr);
          traverse through the map anf print all values of the map.



**3. Top view of a binary tree:**
          **Intuition:**   For ex: 
                                 10
                            20        30
                        5        15
   
                                                    So o/p is 5,20,10,30

            Top 
            
            All nodes with same horizontal distance lies on same vertical line or are on same vertical level. We need to find the very first node for every new horizontal distance being encountered and thus use hashing to store horizontalDist -> [nodes.value]
            
            Horizontal distance is
            horizontalDist of leftChild = horizontalDist of parent - 1.
            horizontalDist of rightChild = horizontalDist of parent + 1.

            Maintain a map which <horizontalDist, []>.
            If we encounter a node whose horizontal dist is already present in map we don't do anything.

            If we are encountering the horizontal dist for the first time, set in map and mark the [value of node.value] as this node is the first node
            with that horizontal dist or contribute to the top view of the tree for that vertical level.

            Fill the map via level order traversal, to successfully handle the cases of two node with same horizontal distance overlapping and not being
            on top or bottom of each other.

            For level order traversal maintain a queue of pair {node: TreeNode, horizontalDistance: number}
   

          **Algo:**

          function getVerticalRoots(root)

          push root to queue
          while(!q.isEmpty())
          {

            let item = pop from queue;
            check if item.horizontalDist is present in map
            if not present insert the horizontal dist as key against [root.val] in values of the key.

            if(left child of item exists) push left child in queue with horizontal distance as item.horizontalDist + 1.
            if(right child of item exists) push right child in queue with horizontal distance as item.horizontalDist - 1.

          }

          The map will get set with all possible horizontal distance against array of node of the top view against it.
          


          function verticalTraversal(root)

          if root is null return null indicating there doesn't exist any vertical traversal in this empty tree.
          Maintain a map which is global variable
          call function  getVerticalRoots(root)
          Now the map contains all the possible horizontal distance against array of node against it.
          sort the map in ascending order because we need to give vertical traversal from left most
          let arr = Arrays.form(mp);
          arr.sort((a,b)=> a[0]-b[0]) indicating we are sorting by keys
          convert this array into map
          mp = new Map(arr);
          traverse through the map anf print all values of the map.




**3. Bottom view of a binary tree:**
          **Intuition:**   For ex: 
                                 10
                            20        30
                        5        15
   
                                                    So o/p is 5,20,15,30
            
            All nodes with same horizontal distance lies on same vertical line or are on same vertical level. We need to find the last node for every new horizontal distance being encountered and thus use hashing to store horizontalDist -> [nodes.value]

            Horizontal distance is
            horizontalDist of leftChild = horizontalDist of parent - 1.
            horizontalDist of rightChild = horizontalDist of parent + 1.

            Maintain a map which <horizontalDist, []>.
            If we encounter a node whose horizontal dist is already present in map we override the existing value with new node value.

            If we are encountering the horizontal dist for the first time, set in map and mark the [value of node.value] as this node is the last node
            with that horizontal dist or contribute to the bottom view of the tree for that vertical level.

            Fill the map via level order traversal, to successfully handle the cases of two node with same horizontal distance overlapping and not being
            on top or bottom of each other.

            For level order traversal maintain a queue of pair {node: TreeNode, horizontalDistance: number}
   

          **Algo:**

          function getVerticalRoots(root)

          push root to queue
          while(!q.isEmpty())
          {

            let item = pop from queue;
            set map with horizontal dist against value of node
            this automatically override the value in case the key is already present and set the key with value in case its being getting inserted for the first time.

            if(left child of item exists) push left child in queue with horizontal distance as item.horizontalDist + 1.
            if(right child of item exists) push right child in queue with horizontal distance as item.horizontalDist - 1.

          }

          The map will get set with all possible horizontal distance against array of node of the bottom view against it.
          


          function verticalTraversal(root)

          if root is null return null indicating there doesn't exist any vertical traversal in this empty tree.
          Maintain a map which is global variable
          call function  getVerticalRoots(root)
          Now the map contains all the possible horizontal distance against array of node against it.
          sort the map in ascending order because we need to give vertical traversal from left most
          let arr = Arrays.form(mp);
          arr.sort((a,b)=> a[0]-b[0]) indicating we are sorting by keys
          convert this array into map
          mp = new Map(arr);
          traverse through the map anf print all values of the map.
          
