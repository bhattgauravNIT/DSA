*From context of min Heap:*


*Helpers:*
**1. Get parentIndex from any ith indexed element:**    Math.floor((i-1)/2);

**2. Get leftChildIndex from any ith indexed element:**    2*i + 1;

**3. Get rightChildIndex from any ith indexed element:**    2*i + 2;

------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>-------------------------------------------------

*Operations in heap*

**1. Insert Elements in min heap:**
            **Intuition**: Every element in minHeap arranges itself in such a manner that every root is smaller than
                       its subTree.
            
            **Algo**:    
            
            Maintain a arr.
            For every element inserted in arr in last index, check if it is smaller than its parent. 
            Since every root should be smaller than its subTree thus in this case child is smaller than parent thus
            do swapping.
            Make current index as parentIndex.
            Keep repeating this till we checked for main root i,e current root is equal to 0.

            Note : In this approach since we are checking parent and swapping with parent if necessary thus we are going
            up in the binary tree.


**2. MinHeapfiy for a given index:**
            **Intuition**: For a minHeap following all properties of a min Heap there exist a index for which
            this minHeap is violating the minHeap property fix this.
            Ex:                        4
                                 2           3              violated for index 0, i,e 4.

            **Algo:**

            In order to make it heap again for a given index.
            maintain a min variable equal to current argument index.
            Check for its leftChild . 
            If left child exists and leftChild is smaller than the currentValue index value
            make min as left child index.

            If right child exists and rightChild is smaller than the current min index value
            make mun as rightChild index.

            If (min !== index){
            swap the currentIndex value with minIndex value
            recursively call for min heapfiy on min index.
            }

            In this way all subTree root nodes will become smaller than it subTree.

            Note: Since we are checking the left & right child and swapping in case necessary thus we are going up to
            down in the binary tree.

        
**3. Extract Min in min heap:**
          **Intuition:** In min heap the min element is present at top of the heap i,e the root node.
          Ex:                                2
                                     3              4
            So inorder to extract min we need to return this min value of top of the heap and remove it from the heap.

         **Algo:**
               Maintain a arr.
               Ex: [2,3,4] is minHeap.
               Swap root node with last node.
               arr: [4,3,2]
               Remove the last element so that min is now removed from the arr.
               arr: [4,3]

               Now initially it was a minHeap we intentionally made it violate the minHeap property and the index
               now responsible for violation of this minHeap is index 0.
               Call minHeapfiy for index 0.

               MinHeapfiy(index = 0) called

               Say now the heap looks:
                                             4
                                    3

               In order to make it heap again for a given index.
               maintain a min variable equal to current argument index.
               Check for its leftChild . 
               If left child exists and leftChild is smaller than the currentValue index value
               make min as left child index.

               If right child exists and rightChild is smaller than the current min index value
               make mun as rightChild index.

               If (min !== index){
                swap the currentIndex value with minIndex value
                recursively call for min heapfiy on min index.
               }


**4. Delete a index value from a min Heap:**
            **Intuition:** From a min heap remove a given index value.
                  Ex:                
                                    5
                           10               11
                    12         13        14    19 

             Remove index 1, ie, 11 from min heap.
             If we somehow make this index value as the lowest value in the minHeap and place it at top as it should be in 
             binary tree.
             Then we can get a heap like:

                                -Infinity
                           10               5
                    12         13        14    19

            Now the problem is extracting the min out from the binary min heap.
            Thus we will be able to delete the given index value from the minHeap.

            **Algo:**

            Maintain an arr.
            Make the value for the given index to be removed as -Infinity
            Now we need to place this value at the top i,e move upwards in minHeap.
            check if it is smaller than its parent. 
            Since every root should be smaller than its subTree thus in this case child is smaller than parent thus
            do swapping.
            Make current index as parentIndex.
            Keep repeating this till we checked for main root i,e current root is equal to 0.

            Now we have successfully placed the to be Removed index value to top of the heap by making it smallest
            in the heap.

            Now the problem is simply extract the min.

            Swap root node with last node.
            Remove the last element so that min is now removed from the arr.

            Now initially it was a minHeap we intentionally made it violate the minHeap property and the index
            now responsible for violation of this minHeap is index 0.
            Call minHeapfiy for index 0.

               MinHeapfiy(index = 0) called

               Say now the heap looks:
                                             4
                                    3

               In order to make it heap again for a given index.
               maintain a min variable equal to current argument index.
               Check for its leftChild . 
               If left child exists and leftChild is smaller than the currentValue index value
               make min as left child index.

               If right child exists and rightChild is smaller than the current min index value
               make mun as rightChild index.

               If (min !== index){
                swap the currentIndex value with minIndex value
                recursively call for min heapfiy on min index.
               }

**5. Decrease Key in a min heap**:
            Intuition: For a given minHeap we need to decrease the key for a given input index.
            Ex:                   1
                            9          3
            Decrease index 1 to 0.

            its a binary min heap every root should be smaller than its subtree.
            So if we are decreasing the key value it means that for sure it will again be smaller only
            from its descendant subtree but we are not sure wether it will be lesser than its parents.
            So we have to place this key upwards or we need to move upwards now to maintain binary min heap property.

            Algo:
            decrease the value for the given index with the required value.
            Check for its parent.
            currentIndex = givenIndex.
            If parent exist and parent value is greater than the child value, swap 
            make currentIndex now as parentIndex
            keep repeating this till currentIndex becomes the root.


---------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>---------------------------------------------------  

*Conceptual Problems*

**1. Build min heap from a given random array.**
           **Intuition**: For ex; given a randomly arranges array the task is to convert this into a binary min heap.
           Find the last parent node and place it at correct place. Then move to second lastParentNode and again place it
           to correct position and so on...

                                    5
                            7                9
                     2         3           1       
                     
                     Last parent node is 2 , iterate over 0->2 and place every index at it correct
                     position via saying that this is the index which is being non placed correctly.

           **Algo**:

           Last parent node is parent of the last element of the array.
           Start a loop from lastNode -> 0
           Assume only this node is not being placed correctly to form a min Heap
           For every node call min Heapfiy on it.

           minHeapfiy(i);

           Min Heapfiy called

            maintain a min variable equal to current argument index.
            Check for its leftChild . 
            If left child exists and leftChild is smaller than the currentValue index value
            make min as left child index.

            If right child exists and rightChild is smaller than the current min index value
            make mun as rightChild index.

            If (min !== index){
            swap the currentIndex value with minIndex value
            recursively call for min heapfiy on min index.
            }

            In this way all subTree root nodes will become smaller than it subTree.


**2. Buy max number of items with the given sum:** 
          **Intuition**: Maintain a minHeap or a priorityQueue implementing a minHeap internally, Keeping pooping from
              the heap till the sum >=0 or till be exhaust all the sum.
              The number of times we pop from the heap is the number of items we can buy and the values which we pop from heap
              are the values which can be brought with the given sum.

          **Algo**:

             Maintain a priorityQueue which implements minHeap internally and create a minHeap from the given input
             prices array.

             while(sum>=0 && pricesArr.length>0){
               pop from heap
               if(sum-pooped value >= 0){
                     sum-= pooped value;
                     res++;
               }
             }

             res is the number of items which can be bought using the given sum.

**3. K largest elements**:
          **Intuition:**
             For a given array give me the k largest elements present in the array.
             Maintain a max heap and pop the k elements from the heap.

           **Algo:**

           Maintain a priority queue implementing a max heap internally.
           Create a maxHeap array from the given input array.
           let i=0;
           while(i<k){
              pop from heap;
              store in res;
              i++;
           }

           res array will be containing the k largest elements from the given input array.

**4. k closest numbers**:
           **Intuition**:
               For a given array, a value x and a k value find the k total closest items in array which are closest to value x.
               In a priority queue store the dist and index of the item in the array, this priority queue internally is implemented
               by max Heap based on dist.

           **Algo**:

             Maintain a priority queue having a maxHeap array as 
             arr: Array<{ minDist: number, index: number }>;

             First insert first k elements into a priority queue. So priority queue of k elements is formed.

             Now the heap is maxHeap so it contains the max dist element index pair at the top.
             Now iterate from k+1 -> last element of the array.
             If the top of the heap is greater than the current dist from arr[i]th element
             pop from the heap
             and push {arr[i]th element dist, index} pair into the heap.

             In last the heap will be having k which are having smallest dist from the value x as all the greater value dist pairs
             has  been removed from the priority queue.

**5. Merge k sorted array:**
         **Intuition**:
            Given a array having k sorted arrays inside, merge these all k individual sorted array into one sorted array.
            Create a pair of {value, rowIndex, columnIndex} and insert into a priority queue which internally implements a minHeap.

            **Algo:**

            First maintain a min heap priority queue of object having three properties: value, rowIndex, columnIndex
            based on value.
            res: Array<{ value: number, rowIndex: number, columnIndex: number }>;

            Insert 0th column value for all rows in the priority queue.
            while(!priorityQueue is empty)
            pop from the heap.
            store the heap value in res
            Insert the same row next column value in the heap.

            Keep doing this and in last res will be having merged k sorted array elements.

**6. Sort kSortedArray:**
         **Intuition**:
            A k sorted array is a array in which a element is at most k position away from its actual targeted value.
            Ex: arr = [9,8,7,18,19,17], k =2
            So the actual sorted array is [7,8,9,17,18,19]
            If we look at 7 then actually its at index 2 and its ideal position is 0, i,e its k position
            deviated away from its actual target position.

            Use a minHeap priority queue and first place k+1 elements in it.
            iterate over k+1 till end
            Keep pooping the min element and keep inserting in res.

         **Algo:**
           Maintain a minHeap priority queue.
           Insert first k+1 elements into it.
           Iterate over k+1 -> end of the array.
           Keep pooping from the array and insert in res.

           Finally clean up the heap while pooping and pushing to res till its empty.


          
                 




            






                