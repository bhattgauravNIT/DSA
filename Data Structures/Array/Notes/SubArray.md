**SubArray**

**Problems:**

**1. All SubArray**
     
     **Problem:** Given an array, find all the subArray of the given input array.
                  A subArray is a contagious elements sub array of an array.
                  arr = [1,2,3]
                  o/p:  [1],[1,2],[1,2,3],[2],[2,3],[3]

     **Intuition:** All possible subArrays with indices are represented as

                    [1], [1,2], [1,2,3]
                    0-0  0-1    0-2

                    [2], [2,3]
                    1-1  1-2
   
                    [3]
                    2-2

     **Approach: 0(n^3),0(1)** for all i from 0 to arr.length, lets have a j that starts from i goes till arr.length and use k to print everything from i to j.

            Maintain i=0
            Start iteration over the array

            while(i < arr.length)
            {
                mark an j=i;
                while(j < arr.length){
                    mark k=i; this helps us in printing everything from i to j
                    mark temp = [];

                    while(k <= j)
                    {
                      temp.push(arr[k])
                      k++;
                    }
                    print temp which is an subArray
                    j++;
                }
                i++
            }


--------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>-----------------------------------------


**Kadane's algorithm**


**Problems**


**1. Max subArray sum:**

     **Problem:** Given an array, find the max sum subArray of the given input array.
                  A subArray is a contagious elements sub array of an array.
                  arr = [1,2,3]
                  o/p:  [1],[1,2],[1,2,3],[2],[2,3],[3]

                  so max sub array sum is [1,2,3] i,e 6

     **Intuition1:** Find all possible subArrays of the given input array and compute its sum. Take out the max sum.

                    [1], [1,2], [1,2,3]
                    0-0  0-1    0-2

                    [2], [2,3]
                    1-1  1-2
   
                    [3]
                    2-2

     **Approach1: 0(n^3),0(1)** Find all possible sub array using concept , for all i from 0 to arr.length, lets have a j that starts from i goes till arr.length and use k to print everything from i to j.

            Maintain i=0
            Maintain res = Number.MIN_SAFE_INTEGER
            Start iteration over the array

            while(i < arr.length)
            {
                mark an j=i;
                while(j < arr.length){
                    mark k=i; this helps us in printing everything from i to j
                    mark cSum = 0;

                    while(k <= j)
                    {
                      cSum+= arr[k]
                      k++;
                    }
                    if(cSum is greater than res) then update res
                    j++;
                }
                i++
            }
    



    **Intuition2:** For arr =[1,2,3], all possible subArray sum is 1, 1+2 , 1+2+3 ,2, 2+3, 3 and we can take out max based on the fact that we know sum of sub array [1,2] then simply if we add 3 to that sum it will be sum of sub array [1,2,3]. Or for every ith element grasp all subArray which will start from it and go till
    end of array and keep finding sum and keep checking with maxSum or res.


    Approach2: 0(n^2),0(1): For every i starting i=0 mark a j as i and keep updating cSum and keep checking with maxSum.
           Maintain i=0
           Maintain a res as Number.MIN_SAFE_INTEGER
           Iterate over array with i=0
           {
            maintain a j=i;
            maintain cSum = 0;
            Iterate over array with j=i;
            {
              mark cSum += arr[j];
              if(cSum is greater than res) update res;
              j++;
            }
            i++;
           }

           res will contain the max sum of subArray.

        


    **Intuition3:** This is kadane's based algo.
                     arr = [-5,1,-2,3,-1,2,-2];
                     At every index take out the max possible sum at that index for sub array ending at that index.
                     So at -5, if a sub array is ending at -5, it can have max sum as -5 only because there is nothing left to it.
                     at index of 1, there can be two sums 1 and ((-5)+1) that is -4. Out of (1,-4), 1 is greater so that will be max sum
                     at index of -2, there can be three possibilities, -2 itself or (1+(-2)) or (-5+1+(-2)) greater of all is -1.

                     So maintain a maxSum array and every jth element in maxSums will be pointing to the previous obtained maxSum.
                     For every index ith in input arr if arr[i]+arr[j] > arr[i] then push arr[i]+arr[j] to max sum array, else push arr[i] to max sum array.


    **Approach3: 0(n),0(n):**

            Maintain a i=1 and a maxSum array
            push arr[0] to maxSum array
            Maintain a j=0;
            Keep one pointer at i=1 on input arr and j=0 on maxSum array
            Iterate over the array using i=1 pointer
            if(arr[i]+arr[j]> arr[i]) push arr[i] + arr[j] into maxSum array and increment j
            else push arr[i] to maxSum array and increment j
            Increment i.

            Take out max value from maxSum array
            That will be the answer.



    **Intuition4:** Its the modification of the above approach only, in the above approach we were iterating twice i,e once over input arr and then over
                  the formulated maxSum array. Now instead of iterating over the max sum array again, if we can maintain a variable which stores max so far in maxSum array then we wont be needing to iterate over the maxSum array.


    **Approach4: 0(n),0(n):**

            Maintain a i=1 and a maxSum array and max so far variable in maxSum array initialized to arr[0].
            push arr[0] to maxSum array
            Maintain a j=0;
            Keep one pointer at i=1 on input arr and j=0 on maxSum array
            Iterate over the array using i=1 pointer
            if(arr[i]+arr[j]> arr[i]) push arr[i] + arr[j] into maxSum array and increment j
            else push arr[i] to maxSum array and increment j

            if last pushed element in maxSum array is greater than max so far then update max so far

            Increment i.

            Max so far is the answer.


        
    **Intuition5:** Previously we were using additional space in form of maxSum and from that we were only using the last pushed element as it was only
           used for comparison and thus instead of pushing into max sum array, we can simply update this variable and lets call it prevSum.


    **Approach5: 0(n),0(1):**

            Maintain a i=1 and a prevSum variable initialized to arr[0] and max so far variable initialized to arr[0].
            Keep one pointer at i=1 on input arr
            Iterate over the array using i=1 pointer

            if(arr[i]+arr[j]> arr[i]) make prevSum = arr[i]+arr[j] 
            else make prevSum = arr[i]

            if prevSum is greater than max so far then update max so far

            Increment i.

            Max so far is the answer.
          



**2. Max product subArray:**

    **Problem:** Given an array, find the max product of subArray of the given input array.
                  A subArray is a contagious elements sub array of an array.
                  arr = [1,2,3]
                  o/p:  [1],[1,2],[1,2,3],[2],[2,3],[3]

                  so max product sub array is [1,2,3] and product is 1*2*3 = 6

    **Intuition1:** Find all possible subArrays of the given input array and compute its product. Take out the max product.

                    [1], [1,2], [1,2,3]
                    0-0  0-1    0-2

                    [2], [2,3]
                    1-1  1-2
   
                    [3]
                    2-2

    **Approach1: 0(n^3),0(1)** Find all possible sub array using concept , for all i from 0 to arr.length, lets have a j that starts from i goes till arr.length and use k to print everything from i to j.

            Maintain i=0
            Maintain res = Number.MIN_SAFE_INTEGER
            Start iteration over the array

            while(i < arr.length)
            {
                mark an j=i;
                while(j < arr.length){
                    mark k=i; this helps us in printing everything from i to j
                    mark cProduct = 0;

                    while(k <= j)
                    {
                      cProduct *= arr[k]
                      k++;
                    }
                    if(cProduct is greater than res) then update res
                    j++;
                }
                i++
            }



    **Intuition2:** For arr =[1,2,3], all possible subArray product is 1, 1*2 , 1*2*3 ,2, 2*3, 3 and we can take out max based on the fact that we know product of sub array [1,2] then simply if we multiply 3 to that product it will be product of sub array [1,2,3]. Or for every ith element grasp all subArray which will start from it and go till end of array and keep finding product and keep checking with maxProduct or res.


      Approach2: 0(n^2),0(1): For every i starting i=0 mark a j as i and keep updating cProduct and keep checking with maxProduct.
           Maintain i=0
           Maintain a res as Number.MIN_SAFE_INTEGER
           Iterate over array with i=0
           {
            maintain a j=i;
            maintain cProduct = 1;
            Iterate over array with j=i;
            {
              mark cProduct *= arr[j];
              if(cProduct is greater than res) update res;
              j++;
            }
            i++;
           }

           res will contain the max product of subArray.




**3. Longest positive subArray:**

    **Problem:** Given an array, find the length of the longest positive subArray of the given input array.
                  A subArray is a contagious elements sub array of an array.
                  arr = [1,2,3]
                  o/p:  [1],[1,2],[1,2,3],[2],[2,3],[3]

                  so longest positive sub array is [1,2,3] and the length is 3.


    **Intuition1:** for every ith element where i starts from 0, see if we can start a sub array from it if yes keep iterating ahead to find
    length of longest possible positive subArray from it, else move to next iteration.


    Approach1: 0(n^2),0(1): For every i starting i=0 mark a j as i and keep checking 
           Maintain i=0
           Maintain a resLength as 0
           Iterate over array with i=0
           {
            maintain a j=i;
            maintain cLength = 0;
            Iterate over array with j=i;
            {
              if(arr[j] > 0)
              {
                cLength++;
                j++;
              }else break and move out
            }
            if(cLength> resLength) update resLength
            i++;
           }

           resLength will contain max length of positive subArray




    **Intuition2:** This is based on kadane's algo. For every ith element where i starts from 0, see if we this can be a part of subArray which is ongoing, if yes increment cnt , if no then reset cnt and update the maxLength if needed.


    Approach2: 0(n),0(1):
           Maintain i=0
           Maintain a resLength as 0
           Maintain a cnt as 0
           Iterate over the arr with i=0
           {
            if(arr[i]>0){
              cnt++;
              if(cnt > resLength) then update resLength
            }else{
              reset cnt to 0.
            }
            increment i
           }

           resLength will contain the length of longest positive subArray.





**4. Longest even odd length subArray:**

    **Problem:** Given an array, find the length of the longest even odd alternate subArray of the given input array.
                 A subArray is a contagious elements sub array of an array.
                 arr = [1,2,3]
                 o/p:  [1],[1,2],[1,2,3],[2],[2,3],[3]

                 so longest even odd alternate subArray of the given input array is [1,2,3] thus o/p : 3


    **Intuition1:** for every ith element where i starts from 0 mark a j as i+1 and keep checking if 
                j-1 is even and j is odd 
                or
                j-1 is odd and j is even

                if condition meet keep increasing j starting we are moving ahead in finding subArray

                if condition are not met simply mark end of loop and after coming out check if the currentLength is greater
                than maxLength obtained so far.


    Approach1: 0(n^2),0(1): For every i starting i=0 mark a j as i+1 and keep checking 

           Maintain i=0
           Maintain a resLength as 1 because [1,1,1] the o/p is 1 as we still have one length subArray i,e [1] which is odd or even.
           Iterate over array with i=0
           {
            maintain a j=i;
            maintain cLength = 1;
            Iterate over array with j=i+1;
            {
              if((arr[j-1] is odd && arr[j] is even) || (arr[j-1] is even && arr[j] is odd))
              {
                cLength++;
                j++;
              }else break and move out
            }
            if(cLength> resLength) update resLength
            i++;
           }

           resLength will contain max length of positive subArray



    **Intuition2:** This is based on kadane's algo. Start from i=1 and For every ith index we will see if its an alternating element if its an alternating element, make it the part of sub array by increasing the cnt and see if cnt is greater than res update res else start the sub array fresh by making cnt as 1.


    Approach2: 0(n),0(1):
           Maintain i=1
           Maintain a resLength as 1
           Maintain a cnt as 0
           Iterate over the arr with i=1
           {
            if((arr[i-1] is odd && arr[i] is even) || (arr[i-1] is even && arr[i] is odd)){
              cnt++;
              if(cnt > resLength) then update resLength
            }else{
              reset cnt to 1.
            }
            increment i
           }

           resLength will contain the length of longest even odd length subArray.




**5. Max sum circular sub array:**

    **Problem:** Given an array, find the max sum of all the circular sub array of it.
                 arr = [1,2,3]

                 all possible circular sub array are
                 [1],[1,2],[1,2,3],[2],[2,3],[3]

                 [2,3,1],[3,1],[3,1,2]

                 So max sum is [1,2,3] i,e 6

    **Intuition1:** When we are at index 0, all possible circular subArray are from 0->arr.length-1,
                    However when we are at index 1 all possible circular subArray are from 1-> arr.length-1 and again index 0 as well.
                    Similarly when we are at index 2, we need to consider all index from 2-> N and again 0 and 1.

                    So for index 2, we need to consider indexes from 2->N and 0->1
                    If we have a j which is equal to 0 initially 
                    so all possible index which we need to consider is (i+j)%n

                    i,e (2+2)%3 i,e 1.

                    so from 2->1.



    Approach1: 0(n^2),0(1):
           Maintain a i=0 and maxSum = 0;
           Iterate over the array starting from i=0
           {
            let j=0;
            let cSm = 0;
            while(j< arr.length)
            {
              compute index = (i+j)% arr.length
              cSum += arr[index];
              if( cSum > maxSum) update maxSum
              j++;
            }
            i++;
           }

           maxSum contains the max circular subArray sum.




    **Intuition2:** arr = [1,-2,3,4]
                 all possible circular sub array are:

                 [1],[1,-2],[1,-2,3],[1,-2,3,4]
                 [-2],[-2,3],[-2,3,4]                  -> Normal SubArray
                 [3],[3,4]
                 [4] 

                 [-2,3,4,1]
                 [3,4,1],[3,4,1,-2]                   -> circular sub array
                 [4,1],[4,1,-2],[4,1,-2,3]  

                 So all possible subArray is normal subArray + circularSubArray

                 So max sum in all possible sub array is Max(maxSum in normal sub array, maxSum in circular sub array).

                 Max sum in normal subArray can be taken out via kadane's algo in 0(n),0(1).
                 Now maxSum in circular subArray is 

                 sum of array - minSumSubArray.

                 Consider any circular subset ex: 
                 [-2,3,4,1] here the max sum is 3+4+1, obtained by from all right elements (Case1: all contagious elements, it can be all on
                 left side or all on right side)
   
                 [4,1,-2,3] here the max sum is 3+1+4 , obtained from some left elements, some right elements 
                 and discarding some middle elements (Case2: leave some middle elements).

                 So the maxSum in circular subArray will be nothing but the sum of the entire array subtracted by the minSumSubArray.

                 There is a corner case if the maxSumSubArray is coming as negative this means that all the elements in the
                 array is negative and thus the minSumSubArray and sum of all elements will be same and thus let res = arraySm - minSubSetSum
                 will be 0 and then Math.max(normalSubSetsMax, res) will yield 0.
   
                 Ex: [-5,-2]
                 All possible normal Sub array is [-5],[-2],[-5,-2] so the maxSumSubArray is -2.
                 Now sum of all elements is -7 and minSubSetSum is -7.
                 So let res = arraySm - minSubSetSum  = 0

                 So Math.max(-2, 0) is 0 which is wrong ideally answer should be -2.



    **Approach2: 0(n),0(1):**


          ** function maxSumSubArray(which takes a arr input parameter)**

           Maintain a i=1 and a prevSum variable initialized to arr[0] and max so far variable initialized to arr[0].
           Keep one pointer at i=1 on input arr
           Iterate over the array using i=1 pointer

           if(arr[i]+arr[j]> arr[i]) make prevSum = arr[i]+arr[j] 
           else make prevSum = arr[i]

           if prevSum is greater than max so far then update max so far

           Increment i.

           return max so far.





           **function minSumSubArray(which takes a arr input parameter)**

           Maintain a i=1 and a prevMin variable initialized to arr[0] and min so far variable initialized to arr[0].
           Keep one pointer at i=1 on input arr
           Iterate over the array using i=1 pointer

           if(arr[i]+arr[j]< arr[i]) make prevMin = arr[i]+arr[j] 
           else make prevMin = arr[i]

           if prevMin is smaller than max so far then update min so far

           Increment i.

           return min so far.




           **function maxSumCircularSubArray(which takes a arr input parameter) **

           find normal subArray lets call it normalSubSetsMax = maxSumSubArray(arr);
           if (normalSubSetsMax < 0) return normalSubSetsMax , this is the handling of the corner case in which all elements are negative in array
           let i = 0, arraySm = 0;
           now we are finding the sum of the array by iterating over all the elements of the array and storing in a sum variable.
           while (i < arr.length) {
           arraySm += arr[i];
           i++;
           }
           Now we need to compute the minSumSubArray whose logic will be opposite to that of maxSumSubArray function
           let minSubSetSum = minSumSubArray(arr);

           The maxSum in circular subArray will be total array Sum - minSumSubArray

           let res = arraySm - minSubSetSum;

           Now we take out the max of normalSubSetMax and circularSumSubsetMax
           return Math.max(normalSubSetsMax, res);

          
           
        


-------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>--------------------------


**Sliding window Technique**


**Problems**


**1. Max sum of k length subArray:**

    **Problem:** Given an array and a k, find the max sum of k length sub array in the given input array.
                 arr = [1,8,30,-5,20,7]
                 k=3
                 o/p: 45 i,e [30,-5,20]


    **Intuition1:** Find all k length sub array starting from i=0 till i= arr.length-k.
                  start a j from j=i till k elements from it and keep track of max sum obtained so far.


    Approach1: 0(n^2),0(1):

           Maintain i=0
           Maintain maxSm = Number.MIN_SAFE_INTEGER
           Start iteration in input array from i=0;
           {
            let sm = arr[i], include arr[i] to sm.
            let cnt = 1 as already 1 element is included initially in sum calculation 
            maintain j = i+1;
            while(cnt<k && j<arr.length)
            {
              cnt++
              sm += arr[j]; i,e keep updating sm
            }
            once we come out of loop we check sm with maxSm
            if sm> maxSm we update maxSm as sm
            i++;
           }

           maxSm contains max sum of k length subArray



    **Intuition2:** This approach is based on sliding window technique lets say
           arr = [1,8,30,-5,20,7], k=3
           1st: [1,8,30] , sm=  39
           2nd: [8,30,-5], sm = prevSm+(-5)-(1stSubArray[0]) = 39+(-5)-1= 33
           3rd: [30,-5,20], sm = prevSm + 20 - (2ndSubArray[0]) = 33+20-8 = 45
           4th: [-5,20,7], sm = prevSum + 7 - (3rdSybArray[0]) = 45+7-30 = 22

           The idea is simple initially if we have sum of first k length subArray, then the sum of next window can be calculated
           via adding next element to the sum and subtracting the first element of the last subArray from the sum.

           Maintain two pointers i and j which will resemble a window of length k.


    Approach2: 0(n),0(1):
           Maintain a cSum as -infinity and a maxSum as -Infinity.
           Iterate over given input array from i=0 till arr.length - k.
           {
            if(cSum is -Infinity this means we now want to get sum of the first k length subArray)
            {
              let cnt=1;
              cSum = nums[i];
              while(cnt<k and j<arr.length)
             {
              sm += nums[j]
              move j++;
              move cnt++;
             }
              since maxSum in this case will simply be -Infinity thus make maxSum as cSum
              increment i for next iteration of main loop
            }
            else when cSum is not -Infinity this means we have already calculated the sum of first k length sub Array
            now we will use sliding window.

            so cSum = cSum + arr[j] - arr[i-1]; i,e j is at index of starting of new subArray and i-1 is at index of starting of previous subArray.
            if(cSum > maxSum){
              update maxSum
            }
            j++;
            i++;
           }

           maxSum contains the maxSum of a k length subArray.




**2. Sub array with given sum:**

    **Problem:** Given an array, the task is to tell wether a subArray exists in it such that it's sum ie equal to
                 given input sum.
                 arr = [1,4,20,3,10,1], sum = 33

    **Intuition1:**Brute force. Simply start from i=0 and have a j from j=i till end of array. Check if cSum is equal to the
                 given input sum. 


    Approach1: 0(n^2),0(1):
           Maintain a i=0;
           Iterate over the array starting from i=0
           {
            let j=i;
            let cSm = 0;
            while(j< arr.length)
            {
              cSum += arr[j];
              if( cSum === input sum provided) return true
              j++;
            }
            i++;
           }



    **Intuition2:** This approach is based on adjusting sliding window technique.
                Now let's say the window starts at i=0 initially and end at j=0 initially so i symbolize start of window and j 
                symbolize end of the window lets have a sum initially as the arr[0]. 

                1.If (current sm < sum) then the size of the window should increase as we need to accommodate more elements. 
                2.If current sm > sum , then we should shrink the size of the window as the current subArray cant accommodate any 
                new element and by shrinking we mean to reduce the size by increasing the starting index of the window.
                3.If current sm === sum then its true.


    Approach2: 0(n),0(1):
           Maintain let i = 0,j = 0 and cSum = nums[0];
           while(j < arr.length as j is the mark of end of the array)
           {
            if (cSum < input sum) then simply add element to the window
            j++;
            cSum += arr[j]

            else if (cSum > input sum) then simply we need to remove elements from the window i,e
            cSum -= arr[i];
            i++;

            else (cSum === input sum) simply return true

           }

           if true is not returned then return false.
