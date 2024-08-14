_Trees:_

_Tree Traversal_:

-     ***Depth first Search**:*

      As name suggest we need to search via depth of the binary tree, thus its depth first search algo.

  **1. Inorder:**
  **Intuition:** Use a recursion to go via left->root->right.
  Root needs to be printed or stored in arr.

           **Algo:**
               If root === null return (breaking condition for recursion)
               calls function itself recursively with root->left
               print root or push to array
               calls function itself recursively wit root->right



  **2. Preorder:**
  **Intuition:** Use a recursion to go via root->left->right
  Root needs to be printed or stored in arr.

           **Algo:**
               If root === null return (breaking condition for recursion)
               print root or push to array
               calls function itself recursively with root->left
               calls function itself recursively wit root->right



  **3. PostOrder:**
  **Intuition:** Use a recursion to go via left->right->root
  Root needs to be printed or stored in arr.

           **Algo:**
               If root === null return (breaking condition for recursion)
               calls function itself recursively with root->left
               calls function itself recursively wit root->right
               print root or push to array




-     ***Breadth First Search (BFS)/Level Order traversal**

      **1.Level Order Traversal**:
            **Intuition:**
                   Use a queue to maintain first in first out order and after the parent is pooped from queue
                   push its children.

            **Algo:**

                 Maintain a queue.
                 push root to queue.
                 while(!q.isEmpty()){
                  const val = pop from queue.
                  print val.
                  if(left of value exists){
                    push left
                  }
                  if(right of value exists){
                    push right
                  }
                 }



      **2. Level Order Traversal Level By Level**:
            **Intuition**
                 In the initial stage a queue will be having all nodes present at a specific level of the binary tree.
                 Iterate over the queue and for it initial/existing size push child of the already present elements in queue.

            **Algo:**

                Maintain a queue.
                Push root to queue.
                while(!q.isEmpty()){
                  let s = q.size();
                  iterate over the queue
                  const val = pop from queue
                  if(val.right){
                    push right node
                  }
                  if(val.left){
                    push left node.
                  }
                }

  -------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>---------------------------

  _Conceptual Problems_



  **1. Height of binary tree**:
  **Problem**: Given a binary tree find its height. Height of a binary tree can be defined as the total number of
  nodes from root to leaf node on the longest path in the tree.

                                10
                              |     |
                            20      30
                        |      |   |   |
                      40      50   60  70
                                                          Height = 3

            **Intuition**: Since we need to traverse from root to leaf thus depth first search has to be used.
                     Make the leaves node return 0.

            **Algo:**
                if(root === null) return 0;
                let leftHeight = recursivelyCall the function itself with root.left
                let rightHeight = recursivelyCall the function itself with root.right
                return Max(leftHeight,rightHeight)+1.

             **Note**
                We some times may need to store heights of every node for preComputation and thus we simply
                say using a map of treeNode and number so we can do this using above logic only.
                
                if(root === null) return 0;
                let leftHeight = recursivelyCall the function itself with root.left
                let rightHeight = recursivelyCall the function itself with root.right
                let height = Max(leftHeight,rightHeight)+1;
                mp.set(root,height);
                return height;



  **2. Size of binary tree:**
  **Problem**: Given a binary tree the give me the size of the binary tree i,e give me the count of the total number of nodes in the binary tree.

            **Intuition:**: Do a level order traversal and keep track of all the nodes which has been pushed into the queue. This variable which keeps track of this count is actually the size of the binary tree.

            **Algo:**
                 Maintain a queue.
                 Push root to queue.
                 let res = 0;
                 while(!q.isEmpty()){

                   let val = q.pop();
                   res++;
                   if(val.left){
                    push left to queue
                   }
                   if(val.right){
                    push right to queue
                   }

                 }
                 return res;




  **3. Max in a binary tree**
  **Problem:** We need to give the max value in the binary tree.

                                10
                              |     |
                            20      30
                        |      |   |   |
                      40      50   60  70
                                                          max = 70

-          **3.1 Level Order Traversal**

               **Intuition:** Do a level order traversal of the binary tree and keep track of nodes. Get the max value and return it.

               **Algo:**
                 Maintain a queue
                 push root to queue.
                 let max = -Infinity
                 while(!q.isEmpty()){

                 const val = q.pop();
                 max = Max(max,val.data);

                 if(val.left) push left child to queue.
                 if(val.right) push right child to queue

                 }

                 return res;

-           **3.2 Recursion**

                  **Intuition:** Do a preOrder Traversal and keep track of max coming from left and from right. On encountering a null return the max res obtained so far.

                  Algo:

                   make function take a res = -Infinity as param
                   if root === null  return res obtained so for
                   res = Max(root.data, res);
                   let leftMax = this.maxInABinaryTree1(root.left, res);
                   let rightMax = this.maxInABinaryTree1(root.right, res);
                   return Math.max(leftMax, rightMax);




  **4. Left view of Binary tree**

            **4.1 Using level order traversal**

                                10
                              |     |
                            20      30
                        |      |   |   |
                      40      50   60  70
                                                          leftView = [10,20,40]


            **Intuition**:
                    In level order traversal the first node of every level is the part of the left view for that specific level.

            Algo:
                 Maintain a queue.
                 push root to queue.
                 while(!q.isEmpty()){
                 let s = q.size();
                 iterate over the currentQueue size;
                 let cNode = q.pop();
                 if(i===0) {
                 this node is part of the left view for that level
                 }
                 if(cNode.left) push left child to queue
                 if(cNode.right) push right child to queue.
                 }



            **4.2 Using recursion.**

            **Intuition**:
                   Maintain a global variable maxLevel and a local variable level whenever localVariable is greater than globalVariable
                   then it resembles the first node of every new level. This node thus is the part of the left view for the given binary tree.

            **Algo:**

                  Maintain global variable say max_level = 0;
                  Maintain a local variable say level = 0;
                  if(root === null) return
                  if(level> maxLevel){
                    console.log(root.data);
                    maxLevel = level;
                  }
                  recursively call the function with (left child, localVariable + 1)
                  recursively call the function with (right child, localVariable + 1);




  **5. Children sum property:**
  **Problem:** Check if all left subTree value + all right SubTree value is equal to the root value of the tree.

                                10
                              |     |
                            20      30
                        |      |   |   |
                      40      50   60  70
                                                          False

            *5.1 Using level order traversal*

            **Intuition:** Do a level order traversal for every root or the pooped value check if its value is equal to sum of its left and right child.

            **Algo:**:

                 if(root === null) return true;
                 if(root.left === null && root.right === null) return true;
                 Maintain a queue.
                 push root to queue.
                 While(!q.isEmpty()){

                 let val = pop from queue.
                 if(val has left and val has right) check if root value is equal to sum of left and right child
                 if( val has left but not right) check if root value is equal to left child value
                 if(val does not have left but has right) check if root value is equal to right child value

                 if(has left) push left to queue.

                 if(has right) push right to queue.
                 }



             ***5.2 Using recursion***

             **Intuition:** If root is null return true. If left is throwing true and right is also throwing true but still check if root.data is sum
                            of the left and right child. Return and of these three conditions.

              **Algo:**

                 if(root === null) return true;
                 if(root.left === null && root.right === null) return true;
                 let sm = 0;
                 if(root.left) sm+= root.left.data;
                 if(root.right) sm+= root.right.data;
                 return (root.data === sm && recursivelyCall(root.left) && recursivelyCall(root.right));



  **6. Is height balanced:**
  **Problem:** For a binary tree check is every root is height balanced or not. Height balanced means Math.abs(heigh(left)-height(right))<=1

                                 10
                              |     |
                            20      30                 true
                        |      |   |   |
                      40      50   60  70

          **Intuition:** For every node check the height of its left subTree and right subTree, compare Math.abs(leftHeight - rightHeight)<=1 then its a height balanced binary tree.

          **Approach1**

          **Algo:**

                 function to getHeight()
                 null nodes returns 0
                 lh = recursively call getHeight(root.left)
                 rh = recursively call getHeight(root.right)
                 height is simply Max of left and right height + 1;


                 function isHeightBalanced

      	         return true for null nodes
      	         let lh = get left height with root.left
                 let rh = get left height with root.left
      	         return (Abs(lh-rh)<=1 && isHeightBalanced(left) && isHeightBalanced(right))



          **Approach2:**

           **Algo:**

                 Use a function which say returns {isBalanced, height} object.
                 if(root === null) return {isBalanced: true, height: 0} , this resembles that a null root is height balanced and has height 0.
                 const leftItem = callRecursively to same function with (root.left);
                 const rightItem = callRecursively to same function with (root.right);

                 const isBalanced = leftItem.isBalanced && rightItem.isBalanced &&
                 Math.abs(leftItem.height - rightItem.height) <= 1;

                 the above checks with if the node is balanced and also height balanced in accordance to the object value.

                 const height = Math.max(leftItem.height, rightItem.height) + 1, to get the height through every node.
                 return { isBalanced, height };



  **7. Max width of binary tree:**
  **Problem:** For a binary tree check give the max width of the binary tree.

                                 10
                              |     |
                            20      30                 o/p = 4
                        |      |   |   |
                      40      50   60  70

        **Intuition:** Do a level order traversal for the nodes level by level. The max size of the queue for any level is the max width of the binary tree.

        **Algo:**

               Maintain a queue.
               push root to queue.
               max = -infinity;
               while(! q.isEmpty()){

               s = current queue size.
               check if s is greater than max
               iterate over the queue
               let val = q.pop();
               if(left exists) push to queue.
               if(right exists) push to queue.
               }



  **8. Convert tree to doubly linked list:**
  **Intuition:** Do a inorder traversal of the given binary tree and where we print nodes, simply insert in doubly linked list however maintain a end pointer
  so that insertion is achieved in 0(1).

        **Algo**:

              Maintain a end node and a heap node.
              function inorder
              if root is null return
              call function inorder recursively with root.left

              create a new node for doubly linked list
              if head of doubly linked list is null then insert this node as head and make it as head, make end as this node only.
              if head is not null
              mark previous of this new node as current end.
              mark current end node next as this new node
              make this new node as new end.

              call function inorder recursively with root.right




  **9. Construct binary tree from preOrder and inOrder:**
  **Problem:** From given inorder and preOrder traversal find, create a binary tree.

         **Intuition**: Inorder is left->root->right and preOrder is root->left->right.  If we traverse through every element of preOrder traversal than it
                     resembles a root and find this root in inOrder traversal, so every from 0 to left of this in inOrder traversal belongs to left subTree for that
                     root and everything from right of it till end in inorder traversal belongs to right subTree of this root.

          **Algo**:

             Maintain a global variable index which is initially 0 and used as iterator over preOrder traversal array.
             if(startInorder index is less than endInOrderIndex) return null and mark as a leaf node.
             find the value of root in preOrder traversal using index global variable
             const data = preOrder[index];
             formulate a new Tree node using this data.
             let root = new TreeNode(data);
             increment global variable index ++;

             iterate over the inOrder array to find the index value at which this root is present lets call it location.
             call function recursively for left part i,e from start index of inOrder till left of root location
             function(inorder[], preOrder[], inOrderStart index, location -1);

             call function recursively for right part i,e from right of location or root in inOrder till inorder end index.
             function(inorder[], preOrder[], location+1, inorder end index);




  **10. Spiral traversal of a tree:**
  **Problem:** For a given binary tree print it in spiral order.
  
                                      
                                 10
                              |     |
                            20      30                 o/p = 10,30,20,40,50,60,70
                        |      |   |   |
                      40      50   60  70
          Approach1:

          **Intuition**: Do a level by level level order traversal with every 2nth level / even numbered level reversed. For reverse use stack.

          **Algo:**

                 Maintain a queue for level order traversal.
                 if root is null return
                 push root to queue.
                 maintain a variable isReverse as false initially as first level need not to be reversed where root is present
                 while(! q.isEmpty){
                 let s = current size of queue.
                 iterate over the queue
                 {
                 const val = pop from queue
                 if(isReversed is false print it)
                 if(val.left) push to queue
                 if(val.right) push to queue
                 if(isReversed is true) push val which is pooped from queue to stack.
                 }
                 if(stack has some length meaning a level which needs to be reversed is pushed into it)
                 iterate over stack and print the level in opposite order
                 make stack empty again

                 make isReversed as !isReversed for next level
                 }


          Approach2:

           **Intuition**: Spiral traversal can be achieved via two stacks. One stack maintaining levels which are not
                 to be reversed and one stack maintaining levels which needs reversing.

                 pushing in stack2 is first left then right :
                 as it maintains reversing so right->left traversal in tree thus left first pushed then right pushed to stack.

                 however pushing in stack1 is first right then left because stack1 is maintaining non reversed levels i,e left->right traversal in tree
                 thus right is first pushed and then left.

            Algo:
                  Maintain two stacks.
                  If root is null directly return
                  push root to stack1.

                  while(stack1.length !== 0 || stack2.length!==0){
                  if(stack1.length!==0){
                  iterate over the stack1
                  pop from stack
                  print
                  push left to stack2
                  push right to stack2

                  make length of stack1 empty

                  }else{
                  iterate over stack2
                  pop from stack
                  print
                  push right to stack1
                  push left to stack1

                  make stack2.length empty
                  }
                  }



**11. Diameter of a binary tree:**


**12. Find path of a node from root:**


**12. Lowest common ancestor:**
