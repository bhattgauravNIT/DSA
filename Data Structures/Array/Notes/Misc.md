**Miscellaneous**

**Problems**


**1. Insert element at index:**

     **Problem:** Given an array and an element which needs to be inserted at some index i.
               arr = [1,2,3,4,5]
               index = 3 , element = 8
               o/p: arr =  [1,2,3,8,4,5]


     **Intuition:** We try to create the space into the array by first kind of adding new element which is the last element itself
                present in the array and then swapping elements till we reach the index value.
                Then we simply insert the element at the index.

                So the array look like now arr = [1,2,3,4,5]
                Now start from j = arr.length till the input index and do arr[j] = arr[j-1]
                So the input arr now will look like [1,2,3,3,4,5]

                Now mark arr[index] = input element.

                    
     **Approach: 0(n),0(1)** 
               
               Maintain and initialize  j equal to length of array.
               while(j < input index where element needs to be inserted)
               swap arr[j] = arr[j-1]
               j--;

               now the  arr looks like [1,2,3,3,4,5]
               j is at index where element needs to be inserted
               so arr[index] = element;
               return arr;




**2. Leaders in an array:**

     **Problem:** Given an array return list of leaders, an element is said to be a leader if there exits no element to the right
                of arr[i] such that arr[j] >= arr[i].
                arr = [7,10,4,3,6,5,2]
                o/p: [ 10, 6, 5, 2 ]


     **Intuition1:** For every ith index start from j=i+1 and check if there exists any element arr[j] such that arr[j] >= arr[i]
                if yes, arr[i] can't be the leader else push it to res.

                    
     **Approach1: 0(n^2),0(1)** 
               
               Maintain a res[]
               Maintain and initialize i=0.
               Iterate over the array using i=0 till arr.length-1
               mark j=i+1;
               maintain cnt =0 to identify that the inner j loop has been broken or not
               iterate over arr again this time using j
               {
                 if(arr[j]>=arr[i])
                {
                cnt++;
                break and come out stating arr[i] can't be a leader.
                }
               }
               if cnt === 0 this means that arr[i] is a leader as no element is found greater or equal to it on right of it
               push it to res array.

               return res array.


    
     **Intuition2:** The last element will always be the leader as there is nothing present to right of it. Make it as 
                 currentLeader and also push it to res array. Now traverse from end and if any value if found which is greater than currentLeader update the
                 currentLeader and push the element in res array.

                 In last reverse the res array.

                    
     **Approach2: 0(n),0(1)** 
               
               Maintain a res[]
               push last element of arr in res , i,e res = arr[arr.length-1]
               maintain and initialize i= arr.length-2
               maintain and initialize current leader as arr[arr.length-1]
               start iterating over the arr using i pointer
               if(arr[i] > currentLeader) then update currentLeader as arr[i]
               push arr[i] to res array

               Reverse the res using two pointer once the iteration is complete.



**3. Majority elements index in an array:**

     **Problem:** Given an array give the index of majority element. An element is called a majority elements if it appears
              more than arr.length/2 times.
              arr = [8,3,4,8,8]
              0,3,4 i,e any index of the majority element which is 8.

     **Intuition1:** Use hashing to store the element corresponding to the number of count of that element in the array.
                 Traverse through the map and if the value is greater than n/2 return the index of key in the input array.

                    
     **Approach1: 0(n),0(n)** 
               
               Maintain a map<number,number>() in which key is element and value is number of occurrence.
               Iterate over the input array
               if map already has the key then update the value of that key by 1.
               If map doesn't have the key then insert the key with value 1.

               mp.has(arr[i]) ? mp.set(arr[i], mp.get(arr[i]) + 1) : mp.set(arr[i], 1);


               Iterate over the map and if value of any key is greater than
               find the index of that key in input array using
               arr.indexOf(key);

               return this index.


    
     **Intuition2:** This is based on Moore's voting algorithm, Its done in two phases, in first phase we will try and found a potential
                 majority element and then in second phase we will verify if this potential majority element is actually a majority element
                 or not.

                 So in first phase we maintain a cnt = 1 and iterate through array using i=1 and majorityIndex as 0.
                 If at any time arr[i] === arr[majorityIndex] we increment cnt
                 else we decrement cnt and if cnt becomes 0 we make majorityIndex as i and again make cnt as 1.

                 Now the majorityIndex is potential candidate and now in second phase we check if this majorityIndex element is actually
                 the majority element.


     **Approach2: 0(n),0(1)** 
                
                Maintain cnt = 1;
                Maintain majorityIndex = 0;
                Maintain i=1;

                Iterate over the array using i=1.
                If arr[i] === arr[majorityIndex] then increment cnt.
                else
                {
                    reduce cnt
                    if(cnt becomes 0)
                    {
                        mark majorityIndex as i
                        cnt = 1;
                    }
                }

                Now majorityIndex is having index of potential candidate which is can be a majority element.
                Now lets check that if its actually the majority element by calling a function which counts the majorityIndex element in
                arr.

                checkItsMajority(arr, majorityIndex);



                function checkItsMajority(takes arr as param, takes majorityIndex as param)

                Maintain a cnt =0 and i=0;
                Iterate over the input arr
                
                if(arr[i] === arr[majorityIndex]) increment cnt

                if cnt is greater than arr.length/2 then majority index element is surely the majority element else 
                there exits no majority element in the array and thus return -1.



**4. Max consecutive one's in an array:**

     **Problem:** Given an binary array give count of the max consecutive one's.
               arr = [0,1,1,0,0,1,1,1,1,0]
               o/p: 4
             

     **Intuition:** Simply fro every ith index if we found 1, then start a j from i+1 till we keep finding 1 and update cnt.
                 If the cnt is greater than maxCount then update maxCount.

                    
     **Approach: 0(n),0(1)** 
               
               Maintain i=0 and res = 0;
               Iterate over the array using i=0;

               if(arr[i] === 1){
                mark cnt as 1 and j= i+1;
                Start iteration till arr[j] ===1
                j++;
                cnt++

                i=j;
                if cnt is greater than the res than update res
               }

               return res as its the count of max consecutive one's in the array.



**5. Min consecutive flips:**

     **Problem:** Given a binary array consisting of only 0's and 1's what is the min number of consecutive flips to make all array element same.
                  arr = [1,1,0,0,0,1]
                  
                  1. Either we can flip consecutive 1's to 0.
                  So 1st flip -> Index 0 to 1 arr = [0,0,0,0,0,1]
                  2nd flip -> Index 5 to 5   arr = [0,0,0,0,0,0]
                  all array element are same now with 2 flips.

                  So in total 2 flips are required if we flip all 1's.
                  
                  2. We flips consecutive 0's to 1
                  so 1 st flip index 2 to 4 arr = [1,1,1,1,1,1]
  
                  all array elements are same now with only 1 flip.
  
                  So min(1,2) = 1. O/p is 1 and print : 2 -> 4.
             

     **Intuition1:** The idea is to use the store the count as well the starting index & ending index of all group of zeroes as well as for 1's.
                     arr = [1,1,0,0,0,1]

                     zeroGrpCount = 1
                     oneGrpCount = 2

                     zeroGroupArr = [[2,4]]
                     oneGroupArr = [[0,1],[5,5]]

                     Now if zeroGrp count is less than we can flip all zero's, however if oneGroup count is less we can flip all 1's.
                     There will arise a corner case

                     [1,1,1,1]

                     here the 

                     zeroGrpCount = 0
                     oneGrpCount = 1

                     clearly the zeroGrp cnt is smaller than oneGrp count but it doesn't need any flipping as all elements are 1 only i,e same.
                     Thus even though if a grpCount is less we check if that lesser grpCountArr is having a length greater than 0 or not.
                     If not it means that that particular group item is itself not present in array and thus no need of flipping.


                    
     **Approach1: 0(n),0(n)** 

                    Maintain oneGroup = 0, zeroGroup = 0, zeroGroupArr = [], oneGroupArr = [];

                    Find Max consecutive 1's and increment oneGrp and store the start and end index in oneGroup array.

                    while (Iterate over array using i=0) {
                    if (nums[i] === 1) {
                    maintain j = i + 1;
                    while (we keep finding 1's i,e arr[j]===1 and j < arr.length) {
                    j++;
                    }
                    oneGroup++;
                    oneGroupArr.push([i, j - 1]); here we push the starting and ending index of the group of 1's found in oneGrp arr.
                    i = j;
                    }

                    Similarly Find Max consecutive 0's and increment zeroGrp and store the start and end index in zeroGroup array.
                    if (nums[i] === 0) {
                    let k = i + 1;
                    while (nums[k] === 0 && k < nums.length) {
                    k++;
                    }
                    zeroGroup++;
                    zeroGroupArr.push([i, k - 1]);
                    i = k;
                    }
                    }

                    Now we have formulated our zeroGrpCount ,oneGrpCount, zeroGroupArr, oneGroupArr

                    So check if oneGrp cnt is lesser than zeroGrpCnt
                    if(oneGrpCount < zeroGrpCount){
                        if(oneGroupArr.length > 0){
                            print all the oneGroupArr items.
                        }else{
                            there exits no 1's in array and thus all are 0's and need no flipping.
                        }
                    }

                    So check if zeroGrpCnt is lesser than oneGrpCount
                    if(zeroGrpCnt < oneGrpCount){
                        if(zeroGroupArr.length > 0){
                            print all the zeroGroupArr items.
                        }else{
                            there exits no 0's in array and thus all are 1's and need no flipping.
                        }
                    }


     **Intuition2:** Its based on the fact that since its a binary array of zeroes and one's only therefore if we flip all the 
                     elements present in the array of second group that is being found than it will always result in min consecutive flips.

                     So simply found the second group elements and then find all group start and end index for that item of second group.

                    
     **Approach2: 0(n),0(1)** 

                   function getSecondGroupElement(takes param as arr)
                   Maintain an i=0;
                   iterate over arr using i
                   maintain j=i+1
                   iterate while(arr[i] === arr[j])
                   {
                    j++;
                   }

                   once we come out of loop we are done with the first group of elements and thus j is at second group element.
                   return arr[j];

                    

                   function mainFlip

                   secondGrp element = call a function which can find the second group element wether its 0 or 1.
                   Now simply iterate over the array
                   and print all the starting and ending index where this secondGrp element is being found in groups.



**6. Move 0's to last in array:**

     **Problem:**  Given an array that may or may not contains 0. The task is to move all the zeroes to the end of the array.
                [8,5,0,10,0,20]
                o/p: [8,5,10,20,0,0]
             

     **Intuition1:** Use an additional temp array to store all elements of the input array apart from 0's.
                  temp = [8,5,10,20]

                  Now starting from i=0, make arr[i] = temp[i] and once temp length is reached mark remaining arr[i] as 0.
                    
     **Approach1: 0(n),0(n)** 
               
               Maintain i=0 and temp = [];
               Start iterating over the input arr using i
               if(arr[i]!==0) push to temp
               i++;

               now Traverse through temp arr using say i=0;
               arr[i] = temp[i];

               now for rest index values remaining for arr;
               mark all of them as 0.



    **Intuition2:** Idea is simple, 
                Consider two pointers one non zero and other zero say nz and z.
                non zero pointer should always be at non zero value so if you find a non zero value , hold it there. 
                Perform swap with zero pointer then increment both. 
                If you see non zero pointer at zero value, then non zero pointer is unhappy and thus increment non zero pointer.

                [8,5,0,10,0,20]
                nz = 0,z=0 initially
                nz is at non zero value so swap with z pointer and increment both [8,5,0,10,0,20]

                nz =1,z = 1
                nz is at non zero value so swap with z pointer and increment both [8,5,0,10,0,20]

                nz = 2, z=2
                nz is at zero value so unhappy and thus increment nz

                nz = 3,z = 2
                nz is at non zero value so swap with z pointer and increment both [8,5,10,0,0,20]

                nz = 4,z=3
                nz is at zero value so unhappy and thus increment nz

                nz = 5, z = 3
                nz is at non zero value so swap with z pointer and increment both [8,5,10,20,0,0]

                nz=6,z=4

                nz crossed length of array thus terminate.


     **Approach2: 0(n),0(1)** 
               
               Maintain two pointers one nz=0 and z = 0;
               Iterate over input arr using nz pointer

               if(arr[nz] === 0) increment nz++;
               else{
                swap arr[nz] and arr[z]
                nz++;
                z++;
               }


**7. Reverse an array in place:**

     **Problem:** Given an array the task is to reverse the array.
                [8,5,0,10,0,20]
                o/p: [20,0,10,0,5,8]
             

     **Intuition:** Use two pointers one at i=0 and one at j = arr.length-1
                    Keep swapping till i<j.


     **Approach: 0(n),0(1)** 
               
               Maintain two pointers one at i=0 and one at j= arr.length-1;
               while(i<j){
                swap(arr[i],arr[j]);
                i++;
                j--;
               }


**8. Stock by and sell:**

     **Problem:** Given an array resembling prices of stocks on ith day, find the max profit
              arr = [1,5,3,8,12]

              If we buy on day 1 at INR1 and sell at day 2 at INR 5 we get profit of 4 INR
              Again we buy at day 3 at INR 3 and sell at day 5 at INR 12 we get profit of 9 INR

              Total profit is 13 which is max profit that we can achieve.

              We can buy or sell at other days as well but this is the max profit which we can get.
             

     **Intuition:** We can have a max profit if and only if arr[i]> arr[i-1]. Because then only we should sell to get a profit.
                In above example if we buy at day 1 with value 1 and sell at day 2 at value 5 our profit is getting 4. 
                Then if we buy at day 3 at price 3 and sell at day 5 at price 12 our profit is 12-3 = 9
  
                So overall profit is 4+9 = 13.
  
                Another way of thinking this is:
  
                so we can have a max profit if and only if arr[i]> arr[i-1]. Because then only we should sell to get a profit.
                In above example if we buy at day 1 with value 1 and sell at day 2 at value 5 our profit is getting 4. 
                Then if we buy at day 3 at price 3 and sell at day 4 at price 8 our profit is 5.
                Again we buy at day 4 at price 8 and sell at day 5 at price 12 we get profit 4.
  
                Overall profit is 4+5+4 = 13.
  
                So irrespective of having an additional buy and sell in the below scenario our profit remains same and thus 
  
                if(arr[i]>arr[i-1]) we can have a profit.


     **Approach: 0(n),0(1)** 
               
               Maintain profit = 0;
               Maintain i = 1;
               while (i < arr.length) {
               if (arr[i] > arr[i - 1]) {
               profit += arr[i] - arr[i - 1];
               }
               i++;
               }
               return profit



**9. Trapping rain water:**

     **Problem:** Given an array, find the max rain water that can be trapped
              arr = [3,0,1,2,5]
  
                          |
                          |
                |         |
                |      |  |
                |   |  |  |

                If its raining from above what is the max amount of water that we can store.

             

     **Intuition1:** So if we see we cannot store any water at starting index and ending index as there is no pillar to support the water stored there.
                Now from index 1 to index 3 we can store water.

                So at index 1, whose value is 0, we can store 3 units of water.
                Similarly at index 2 value is 1, we can store 2 units of water.
                Similarly at index 3 value is 2, we can store 1 units of water.

                So overall water that we can store is 3+2+1 = 6 units.

                Now at every index apart from first and last index the amount of water that we can store is the Min(leftMax,rightMax)-arr[i].


     **Approach1: 0(n^2),0(1)** 
               
               For every index apart from i=0 and i=arr.length-1
               find the find max and right max values.
               maintain a res initially as 0.

               Start traversal of arr from i=1 till i=arr.length-2
               for(let i=1;i < arr.length-1;i++)
               {
                mark a j=0;
                mark initially leftMax as arr[i] and rightMax = arr[i];
                now since we need leftMax so start from 0->i i,e j should move from 0->i
                if(arr[j]>leftMax) update leftMax as arr[j]

                now since we need rightMax so start from i+1->end of array i,e j should move from i+1->end of array
                if(arr[j]>rightMax) update rightMax as arr[j]

                Now simply make res+= Min(leftMax,rightMax) - arr[i]; 
               }

               return res




    **Intuition2:** Previously we were computing leftMax and rightMax for every ith index and thus resulting in time complexity 0(n^2), if we
                 can preCompute leftMax and rightMax for every i, then simply we can reduce the time complexity to 0(n).
                 We can do this pre computation using some additional space i,e 0(n).

                 arr = [5,0,6,2,3]

                 Left max array for every ith element will be leftMax = [5,5,6,6,6];
                 Right max array for every ith element will be rightMax = [6,6,6,3,3];

                 This we have achieved using say initially leftMax arr = [arr[0]] and rightMax arr = [arr[arr.length-1]]

                 leftMax = [5]
                 rightMax = [6]

                 LeftMax computation
                 now at i=1,
                 arr[i] = 0 and leftMax[leftMax.length-1] = 5
                 So max of these two is 5 thus we push 5 to leftMax array

                 leftMax = [5,5]
                 at i=2
                 arr[i] = 6 and leftMax[leftMax.length-1] = 5
                 So max of these two is 6 thus we push 6 to leftMax array

                 leftMax = [5,5,6] and we do same to compute leftMax.


                 RightMax computation
                 we start with i=arr.length-2

                 at i=3
                 so arr[3]=2 and rightMax[leftMax.length-1] = 6
                 So max of these two is 6 thus we push 6 to rightMax array

                 at i=2
                 arr[2]=6 and rightMax[leftMax.length-1] = 6
                 So max of these two is 6 thus we push 6 to rightMax array

                 rightMax = [6,6] and we do same to compute rightMax

                 In last reverse the right max array



    **Approach2: 0(n),0(n)** 
               
               Maintain res=0 initially
               Maintain a leftMax = [arr[0]]

               Pre compute leftMax arr; 

               for(let i=1;i<arr.length-1;i++)
               {
                leftMax.push(Max(leftMax[left.length-1],arr[i]));
               }

               Maintain rightMax  = [arr[arr.length-1]]
               Pre compute rightMax arr

               for(let i=arr.length-2;i>=0;i--)
               {
                rightMax.push(Max(rightMax[rightMax.length-1],arr[i]))
               }

               reverse rightMax array using two pointer technique.

               Now for every ith index we know the value of leftMax and rightMax so simply do
               res += Min(leftMax[i],rightMax[i])-arr[i]



               





                    
               



               
