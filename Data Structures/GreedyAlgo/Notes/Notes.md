*Greedy algo:*

**Concept**

This algo is used for optimization problems where max possible or min possible kinds of things are required.

The idea to get that where we need to apply greedy algo is that that question will be asking something like what will be the max profit or min profit that we
can get, over what will be the max amount which can be obtained etc.

So these kind of maximization and minimization problems.

The general structure of greedy algo is :

getOptimal(Item arr[], n){

     Initialize res = 0;
     while(all items are not considered){
          i = selectAnItem();
          if(feasible){
               res+= i;
          }
     }
     return res.
}

Greedy does not work in all the cases for ex : min coin problem where given infinite supply of coins and we need to give min number of coins to compute a amount.

In greedy we sort the array in descending and initialize res = 0. After that we iterate over all coins and see if amount >= coin value
if yes we take val =  Math.floor(amount/coin[i]) and add this count to res and reduce the amount by amount - (val* coin[i]).
If at any time amount becomes 0 we come out of loop.

This approach follows greedy as we first take into account the first value and then process further hence called greedy. 
However if we consider case of say [18,1,10] coin values, so according to greedy we first sort and start with first value which is greedy way of solving it. So coins = [18,10,1] now say we need to make 20 rupees, so greedy will start with 18 and see that 1 coin of 18 is needed.
Added 1 to res and amount remaining is 2.
Clearly 2 is lesser than 18 we move to next iteration , now saw 10 again the amount remaining is lesser than 10 so move to next iteration, now
saw 1 which is lesser than currentAmount and thus calculated that 2 coins of 1 are needed to make the remaining amount as 0.
Thus give res as 1+2 =3 

However its not correct because 2, 10 rupees coin can make 20 rupees in more optimized way and thus greedy doesn't work in every case.


---------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>---------------------------------------------------------------------



*Problems:*


**1. Activity selection problem:**
       **Problem:** Given a machine which can only perform one task at a time and a array of pair where first element of pair is startTime for the activity and
       second element of the pair is the end time of the activity. The task is to find which activities should the machine pick such that it can do maximum activities.

       Ex:  [[2,3],[1,4],[5,8],[6,10]];


       **Intuition:** Choose a greedy way and first sort all the item in ascending order of end time. Pick the first activity and see if the next activity can be
       picked or not based on the starting time of activity to be selected or not and end time of current activity. If starting time of activity to be picked
       is smaller than end time of current selected activity discard it else pick it. Now make the recently picked activity as current selected activity and proceed
       further.


       **Algo:**

       function maxActivity(activity: number[][])

       sort activities based on end time or sort activities based on 1st index of every individual activity.
       currentSelectedActivity = activity[0];
       res =1;
       iterate over the activities list from index i=1;
       if(startTime of activities[i] >= endTime of current selected activity){
          res+1
          currentSelectedActivity = activity[1];
       },
       return res that is the number of activities the machine can pick such that it can pick up max number of activities.



**2. Fractional knapsack problem:**
       **Problem:** Given an array of array or say array pf items where first element indicates weight and second element indicates value
       of that weight. Given a bag or knapsack of a limited quantity, the task is to get max value by putting items weight in the bag.
       Its allowed to put fractional weights even in the bag.

       For ex: [{weight: 50, value: 600}, {weight: 20, value: 500}, {weight: 30, value: 400}]
               knapsack capacity = 70. 


       **Intuition:** Since the value given resembles value corresponding to that weight, so we need to find the value per unit weight or say
       the fractional weight , so sort the array in descending order of value/weight. This way we get the max profit yielding item per unit
       weight at first and so on. Now use the greedy way of first putting the max value item and keep continuing.


       **Algo:**

       function fractionalKnapsack(items: number[][], capacity)

       sort items based on value/weight ratio in descending order.
       maintain maxProfit = 0;
       iterate over the items
       if(item.weight <= capacity indicating the bag can accommodate the entire item weight even){

           maxProfit += value of the item;
           since that bag is now added with the weight of that item so 
           change the capacity of the bag as capacity = capacity - weight of item 

       }else{

           This indicates that the bag does not have enough capacity to accommodate the entire weight of the item however
           it may still be able to accommodate the fractional weight and if we have reached this condition than after this fractional
           accommodation its for sure that the bag will be fully filled.

           so we need to accommodate the fractional weight now into the bag and mark the profit even accordingly.
           Profit will simply be the remaining capacity of the bag times the value for that specif capacity of that item.
           Say {weight: 50, value: 600} and capacity is 30.
           So we need to compute the value that we will get for 30 weight if we know that value of weight 50 is 600.

           It will be simply 30*(600/50);

           maxProfit += capacity * (value of that item/weight of that item);
           break;
       }

       return res;



**3. Job sequencing problem**
       **Problem:** Given an array of items where every first element of the item resembles a deadline by which the job has to be completed
       and every second item resembles the profit associated with the job. The task is to pick jobs such that profit can be maximized assuming
       that the person who needs to complete the jobs starts his day at t=0 and take one unit of time to complete the job and can work on
       only one work at one time.

       For ex: [[2, 100], [1, 50], [2, 10], [1, 20], [3, 30]]


       **Intuition:** Choose the greedy way and sort the jobs based on their profits in descending order. Find the max deadline and formulate a slots table
       of that size and try to fit jobs based on max profit onto that slot table. So above the max deadline is 3 hence formulate a slot table of 3 items or say
       formulate a slotTable with starting time as t=0 and ending time as maxDeadline time.

       After sorting the jobs based on profit the jobs look like:

       [[2, 100], [1, 50], [3, 30], [1, 20],[2, 10]] and slotsTable = [undefined ,undefined , undefined]
       for first job the deadline is 2 so it has to be completed before t=2 and the slot at t=1 is empty meaning we can place it there
       slotsTable = [undefined ,[2,100] , undefined]

       for second job deadline is 1 so it has to be completed before t=1 and the slot for t=0 is empty meaning we can place it there
       slotsTable = [[1, 50] ,[2,100] , undefined]

       for third job the deadline is 3 so it has to be completed before t=3 and t=2 slot is empty meaning we can place it there
       slotsTable = [[1, 50] ,[2,100] , [3, 30]]

       Now sortTable is full so simply the max Profit that we can generate is 50+100+30 = 180


       **Algo:**

       Sort the jobs based on profit in descending order.
       find the maxDeadline and make a slotTable of that size.
       maxProfit = 0
       Iterate over the jobs array
       maintain a j pointer to find the slot in slotTable for this currentItem deadline
       j = jobs[i][0]-1 since the slot which we need to find should be lesser than the deadline as the deadline needs to be matched.
       while(slotTable[j]!== undefined && j>=0){
          decrement j to find an empty slot in slotTable 
       }
       
       if(j>=0 indicating that we have found an empty slot well withing the slotTable){
          we place this item into the slotTable
          mark maxProfit += item.value
       }

       return maxProfit


**4. Huffman coding:**
     **Problem:** A string which is composed of some chars having certain frequencies needs encoding/compression. 
     Given an array of chars and a array of frequencies associated with the chars, the task it to compress or encode the string
     send it over to a network in min possible bits of data and this should be a lossless compression such that the decompression or decoding
     should fetch the exact same string of chars.

     Ex:  chars = ['a','d','b','e','f']  freq =  [10, 50, 20, 40, 80]


     **Intuition:** 
     
     Huffman algo gives lossless compression. The idea is to use variable length encoding such that the 
     1. there should be no representation of any char with prefix of other chars representation.
     2. Highest frequency char is represented with smallest encoding and smallest frequency char is represented with highest length encoding.
   
     So in order to achieve this we will be making a HuffMan tree where all the input chars will be present as leaves and all root to leaf path will be providing
     the encoded value for that particular char. 
   

     **Idea:** 

                                              [$,200]
                                     0                             1
                                   [f,80]                       [$,120]
                                                        0                     1
                                                      [d,50]                [$,70]
                                                                       0               1 
                                                                     [$,30]         [e,40]
                                                                   0          1
                                                                [a,10]     [b,20]
   
     
     
     Formulate a huffman binary tree with properties:
     1. All input characters will come in leaf node.
     2. Every left child is encoded to 0 while traversing and every right child is encoded to 1 traversing.
     3. Every root to leaf path represents huffman code for that leaf input char.
     4. Highest frequency char is represented with smallest encoding and smallest frequency char is represented with highest length encoding. 
     5. Every root's frequency is sum of frequency of its left and right child.
   
     We first need to implement the Huffman tree after that will be simply traversing all the root to leaf paths and if we go to left we say 0 and if go to
     right we say 1 and thus we will be able to get variable encoded string for all the input chars.
   
     Question is how can we formulate the tree.
     So we will be using a priority queue of tree Nodes which will internally be implementing minHeap based on the frequencies of the node's char and will be 
     making Huffman tree in bottom to top approach.
     
     So we make all the nodes via provided input array of char and corresponding freq and push it to pq.
   
     For ex: 
     ['a','d','b','e','f']
     [10, 50, 20, 40, 80]
   
     So at first step the priority queue looks like:
   
     1. Pq: [a,10],[b,20],[e,40],[d,50],[f,80]
  
     Now we do extractMin from the pq for two times to get the two min frequency leaves nodes first thus we take out [a,10] and [b,20]
     so our priority queue now looks like.
   
   
     2. Pq:        [$,30]            , [e,40],[d,50],[f,80]
        
             [a,10]     [b,20]
   
     We formulate root node using these two extracted item from pq as root = new Tree("$", leftChild.frequency + rightChild.frequency) as root's frequency is
     the sum of its child frequencies and all provided chars are the leaves of the tree thus root should have a dummy character like $.
   
     We mark root.left as first extracted node from pq and root.right as second extracted node from pq and insert root in pq.
   
     so now our pq looks like
     
                             
    1. Pq:          [d,50],                      [$,70]                 ,  [f,80]
                                       [$,30]              [e,40]         
   
                                 [a,10]     [b,20]  
   
  
  
    Again we repeat the same process so our pq will be
  
    4. Pq:        [f,80],                          [$,120]                              
                                  [d,50]                          [$,70]                 
                                                       [$,30]                  [e,40]         
   
                                                  [a,10]     [b,20] 
   
   
   Again we repeat the same process so our pq will be
    5. Pq: ****
   
   
                                       [$,200]
                       [f,80]                           [$,120]                              
                                               [d,50]               [$,70]                 
                                                           [$,30]            [e,40]         
   
                                                      [a,10]     [b,20] 
     
   
     **Algo:**

     We will be formulating the HuffMan tree in bottom to top fashion.
     Maintain a tree node with 4 properties, character, frequency, leftNode, rightNode.

     Maintain a priority queue of minHeap of Tree type and initially formulate nodes from given char and their frequency. Since the priority queue is a min
     Heap so this min Heap should be able to maintain a mainHeap properties while insertion based on the frequency of the character.

     Implement extractMin in minHeap which should give the min value from minHeap based on frequency and pop that from heap and internally be able to again formulate
     itself as a minHeap.


     function HuffManCompression(chars: string[], freq: number[])

     iterate over the chars
     Formulate new tree nodes based on provided input of char and frequency and insert these node in pq which implements minHeap.
     let root: Tree, create a variable for root of the HuffMan tree.

     while(pq.size >1){
      
      mark left  = pq.extractMin();
      mark right = pq.extractMin();

      Since all provided input chars should be leaves node and thus we need to mark root with some dummy char like $ and the frequency of this root should
      be the sum of the left child and right child.
      Make root = new Tree('$', left.frequency + right.frequency);

      root.left = left;
      root.right = right;

      After we have extracted two min treeNodes from the priority queue based on the frequency now we insert this root into the pq and this pq gets internally
      formulated/adjusted again to mainTain minHeap properties.
      pq.insert(root);

     }
     now we have root which is the root of the huffman tree which we wanted to formulate.
     so we simply now need to traverse this huffMan tree and get the encoding.

     let obj: { char: string, codedValue: string }[] = []; so we create a array of object where we will be storing the char with its encoded string.

     obj = callFunction getEncoding(root,obj, currentEncoding = '')
     iterate over obj and print the encoded string corresponding to every char.




     Function getEncoding(root,obj, currentEncoding = '')
     if(root === null) we simply return the obj;
     if(root.character !== '$' this means that we have reached a leaf node and thus whatever is the currentEncoding is till now we push that string value
     corresponding to the found character){

          obj.push(char: root.character, codedValue: currentEncoding);
     }

     recursivelyCall for getEncoding for left root with obj and currentEncoding as + '0' i,e getEncoding(root.left, obj, currentEncoding + '0');
     recursivelyCall for getEncoding for right root with obj and currentEncoding as + '1' i,e getEncoding(root.right, obj, currentEncoding + '1');

