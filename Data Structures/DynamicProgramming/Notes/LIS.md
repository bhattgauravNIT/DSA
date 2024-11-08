**LIS Concept**

Length of longest increasing sequence can be found via two methods:
1. Use of dynamic programming - 0(n*n),0(n) : This gives the length of LIS for every ith element ending with it, so we need to find max from formed array.
2. Use of binary search - 0(n(logn)),0(n) : This just gives the length of LIS for the array, we simply need to get the length of formulated array.


**Problems**


**1. Longest Increasing subSequence:**
   
    **Problem:** Given an array, the task is to find the length of the longest increasing subsequence.
             Ex: arr = {3,4,2,8,10}
             o/p: 4 i,e {3,4,8,10} is the length of longest increasing subSequence.

   
    **Dynamic programming**

    **Intuition1** Mark lis[0] = 1 
            Start iteration from i=1 and for every j i,e from i-1 -> 0 see if arr[i] is greater than arr[j] , 
            if yes this means that the arr[i] can be a part of arr[j]th LIS now.

            So we find the max length LIS out of all LIS[j] such that arr[i] > arr[j].
  
            If max is -1 only , this means that there exists no arr[j] such that j moves from i-1 -> 0 , 
            in which arr[i] can be a part of LIS so we update Lis[i] as 1 only because ith element itself can form an LIS of length 1.
  
            If max is not -1, this means arr[i] can be a part of LIS so we update lis[i] as max + 1.
  
            Now the LIS array contains all length of LIS so we take out the max from it and that will be the answer.


    **Algo1:**0(n*n),0(n)

            Maintain an lis array
            Mark lis[0] = 1 as lets say if our arr = [3]
            i,e of length 1 then the length of longest increasing subsequence will simply be 1 only, so for arr[0]th element the length of longest increasing subsequence is 1.

            Start iteration from i=1 till end of array
            for(let i=1;i<=n;i++)
            {
            Mark max = -1
            Start iteration for all LIS seen so far via j=i-1 -> j>=0
            for(let j=i-1;j>=0;j--)
            { 
                Check if ith element can be a part of the longest increasing subsequence for LIS ending with jth element
                if(arr[i] > arr[j])
                {
                    max = Max(max, lis[j])
                    If yes, find the max length of LIS seen so far

                }
            }
            if(max === -1)
            {
                meaning we didn't found any LIS ending with jth element such that ith element can be a part of it
                lis[i] = 1
                we update LIS[i] = 1 as ith element itself is one longest increasing subsequence. 
            }
            else{
                lis[i] = max + 1
                we did +1 because we are updating this ith element also in length of longest increasing subsequence.
            }
            }

            Now we simply need to find the max from the LIS array that we have formed and return it.


    **Note:** DP approach for LIS give length of longest increasing subsequence for every ith element ending at it.



    **Binary search**   

    **Intuition2:** Make a tail array and initialized with arr[0]. Now lets iterate over the arr using i=1;
            Case1: arr[i] > tail's last element 
            Simply push arr[i] to tail
  
            Case2: arr[i] <= tail's last element
            Find the ceilIndex element's value in tail for this arr[i]th element.
            Ceil value is the value which is just greater than the value whose ceil needs to be found.
            Push arr[i] to the ceil index in tail array.

            In order to find the ceilIndex in arr we use binary search algo.
            Lets say our tail is [3,4] and we need to find the ceil index for value 2.
  
            First we find the middle which is Math.floor(start + (end - start) / 2);
            We will have two pointers one at start i,e i=0 and one at end i,e tail.length-1
            Now we found the middle so we check wether the mid is greater than equal to or lesser than the element whose ceil index is to be found.
  
            if the middle is greater than on equal to the element this means that we need to find in the first portion of the tail else we need to find in the 
            later portion of the tail.


    **Algo2:** 0(n*logn),0(n)

            Maintain a tail array with arr[0];
            Start iterating on arr[0] with i=1;
            for (let i = 1; i < arr.length; i++) {
            Case1:  arr[i] > tail's last element if (arr[i] > tail[tail.length - 1])
            {
            tail.push(arr[i]);
            } 
            else
            {
            Case2: arr[i] <= tail's last element
            Find the ceilIndex element's value in tail for this arr[i]th element.

            let index = findCeilIndex(tail, 0, tail.length - 1, arr[i]);
            tail[index] = arr[i];
            }
            }
            return tail.length;


            function findCeilIndex(tail array, startIndex, endIndex, x whose ceil index is to be found)
            while (start < end) {
            let mid = Math.floor(start + (end - start) / 2);
            if (tail[mid] >= value)
            {
            end = mid;
            } else 
            {
            start = mid + 1;
            }
            }
            return end;

            Note: Binary search based LIS solution does not given length of longest increasing subsequence ending at any ith index like the DP based solution.




**2. Min elements deletion to make array sorted:**

    **Problem:** 
            Given an array, give me the min number of elements which should be removed so that the
            array becomes sorted.
            Ex: [5,10,3,6,7,8] o/p: 2 i,e remove {10,3} or {5,10}


    **Intuition:** Simply find the LIS for the given array, so in the above case the LIS length will be 4 i,e {5,6,7,8} 
            or {3,6,7,8}, reduce this length from the
            total length of the array. The o/p will give us the min number of elements required to make array sorted.
            LIS can be found via Dynamic programming or via binary search approach.
            Binary search approach is preferred because of time complexity of 0(n(logn)),0(n)

    **Algo1:** Refer section 1 to find Longest Increasing subSequence.




**3. Max sum increasing subSequence:**

    **Problem:** Find the maximum sum increasing subSequence, i,e out of all the increasing subSequence 
               find the max sum of these increasing subsequence.
  
               Ex: 1. [3,20,4,6,7,30] o/p: 53 i,e of {3,20,30}
                   1. [5,10,20] o/p: 35 i,e {5,10,20}
                   2. [20,10,5] o/p: 20 i,e {20}

    **Intuition:** Start iteration from i=1 and for every j i,e from i-1 -> 0 see if arr[i] is greater than arr[j] , 
            if yes this means that the arr[i] can be a part of arr[j]th LIS sum now.
            So we find the max sum out of all LIS[j] such that arr[i] > arr[j].
  
            If max is -1 only , this means that there exists no arr[j] such that j moves from i-1 -> 0 , 
            in which arr[j] can be a part of max sum LIS so we update
            Lis[i] as arr[i]
  
            If max is not -1, this means arr[i] can be a part of max sum of LIS so we update lis[i] as max + lis[i].
  
            Now the LIS sum array contains all max possible sum of LIS so we take out the max from it and that will be the answer.


    **Algo:**0(n*n),0(n)

            Maintain an lis sum array
            Mark lisSum[0] = arr[0] as lets say if our arr = [3]
            i,e of length 1 then the max sum of longest increasing subsequence will simply be 3 only, so for arr[0]th element the length of longest increasing subsequence is arr[0].

            Start iteration from i=1 till end of array
            for(let i=1;i<=n;i++)
            {
            Mark maxSum = -1
            Start iteration for all sum LIS seen so far via j=i-1 -> j>=0
            for(let j=i-1;j>=0;j--)
            { 
                Check if ith element can be a part of the longest increasing subsequence for LIS ending with jth element
                if(arr[i] > arr[j])
                {
                    maxSum = Max(maxSum, lis[j])
                    If yes, find the max sum of LIS seen so far

                }
            }
            if(maxSum === -1)
            {
                meaning we didn't found any LIS ending with jth element such that ith element can be a part of it
                lis[i] = arr[i]
                we update LIS[i] = arr[i] as ith element itself is one longest increasing subsequence and its sum is arr[i] only
            }
            else{
                lis[i] = max + arr[i]
                we did +arr[i] because we are updating this ith element also in max sum of longest increasing subsequence will include arr[i] now
            }
            }

            Now we simply need to find the max sum from the LIS array that we have formed and return it.




**4. Longest decreasing subSequence:**

    **Problem:** Find the length of the longest decreasing subSequence.
             I,e {1,11,2,10,4,5,2,1}
             o/p: 5 i,e {11,10,4,2,1} or {11,10,5,2,1}


    **Intuition:** The concept is little same as LIS however we will formulate the solution in a little different way.
            Make a LDS array of same length as of arr and mark last element of LDS array as 1, because if we have arr = [3], then
            length of longest decreasing subsequence will be simply 1 only as this element will also be included in lds.

            Start iteration from i=arr.length-2 i,e second last element and for every j i,e from i+1 -> end of array see if 
            arr[j] is lesser than arr[i] , 
            if yes this means that the arr[i] can be a part of arr[j]th LDS now.

            So we find the max length LDS out of all LDS[j] such that arr[j] < arr[j].
  
            If max is -1 only , this means that there exists no arr[j] such that j moves from i+1 -> end of array , 
            in which arr[i] can be a part of LDS so we update LDS[i] as 1 only because ith element itself can form an LDS of length 1.
  
            If max is not -1, this means arr[i] can be a part of LDS so we update LDS[i] as max + 1.
  
            Now the LDS array contains all length of LDS so we take out the max from it and that will be the answer.

    **Algo:**0(n*n),0(n)
            
            Formulate LDS array of length arr and fill with 0 apart from last element which should be 1.

            let lds = new Array(arr.length).fill(0);
            lds[lds.length - 1] = 1;

            Iterate over the array starting from the second last element

            for (let i = arr.length - 2; i >= 0; i--) {
            let max = -1;

            Check for all j such that j= i+1 -> end of array
            for (let j = i + 1; j < arr.length; j++) {
            If arr[j] < arr[i] this means this is forming a LDS
            if (arr[j] < arr[i]) {
                find the max value of LDS for this arr[j]
                max = Math.max(max, lds[j]);
            }
            }
            if (max === -1) {
            if max is -1 this means we don't find any LDS starting with ith element thus mark lds[i] as 1 only , because ith element also
            forms an LDS itself.
            lds[i] = 1;
            } 
            else {
            else mark LDS as 1 + max value
            lds[i] = 1 + max;
            }
            }

            Now LDS array length of all longest decreasing subsequence so simply find the max length out of it and return it.
            let res = -1;
            for (let i = 0; i < lds.length; i++) {
            if (res < lds[i]) {
            res = lds[i];
            }
            }
            return res;




**5. Max Length bio tonic subsequence:**

    **Problem:** Find the length of max bio tonic subsequence. A subsequence is called bio tonic subsequence if its first increasing and then 
            decreasing where increasing part can be empty or decreasing part can also be empty.
  
            For ex: {1,11,2,10,4,5,2,1}
            o/p: 6 i,e {1,2,10,4,2,1} i,e its increasing till 10 and deceasing after that
  
            ex: {12,11,40,5,3,1}
            o/p: 5 i,e {12,40,5,3,1} increasing from 12 -> 40 and then decreasing


    **Intuition:** Find lis for any ith element i,e lis at ith item ending at ith index
            Find lds for any ith element i,e lds at ith item starting at ith index
  
            Max length of bio tonic sub sequence is lis[i]+lds[i]-1 because ith item is considered twice once
            in lis calculation and once in lds calculation.


    **Algo:** 0(n*n),0(n)

            **function LDS**

            Formulate LDS array of length arr and fill with 0 apart from last element which should be 1.

            let lds = new Array(arr.length).fill(0);
            lds[lds.length - 1] = 1;

            Iterate over the array starting from the second last element

            for (let i = arr.length - 2; i >= 0; i--) {
            let max = -1;

            Check for all j such that j= i+1 -> end of array
            for (let j = i + 1; j < arr.length; j++) {
            If arr[j] < arr[i] this means this is forming a LDS
            if (arr[j] < arr[i]) {
                find the max value of LDS for this arr[j]
                max = Math.max(max, lds[j]);
            }
            }
            if (max === -1) {
            if max is -1 this means we don't find any LDS starting with ith element thus mark lds[i] as 1 only , because ith element also
            forms an LDS itself.
            lds[i] = 1;
            } 
            else {
            else mark LDS as 1 + max value
            lds[i] = 1 + max;
            }
            }

            Now LDS array length of all longest decreasing subsequence so simply find the max length out of it and return it.
            let res = -1;
            for (let i = 0; i < lds.length; i++) {
            if (res < lds[i]) {
            res = lds[i];
            }
            }
            return res;


            **function LIS**

            Maintain an lis array
            Mark lis[0] = 1 as lets say if our arr = [3]
            i,e of length 1 then the length of longest increasing subsequence will simply be 1 only, so for arr[0]th element the length of longest increasing subsequence is 1.

            Start iteration from i=1 till end of array
            for(let i=1;i<=n;i++)
            {
            Mark max = -1
            Start iteration for all LIS seen so far via j=i-1 -> j>=0
            for(let j=i-1;j>=0;j--)
            { 
                Check if ith element can be a part of the longest increasing subsequence for LIS ending with jth element
                if(arr[i] > arr[j])
                {
                    max = Max(max, lis[j])
                    If yes, find the max length of LIS seen so far

                }
            }
            if(max === -1)
            {
                meaning we didn't found any LIS ending with jth element such that ith element can be a part of it
                lis[i] = 1
                we update LIS[i] = 1 as ith element itself is one longest increasing subsequence. 
            }
            else{
                lis[i] = max + 1
                we did +1 because we are updating this ith element also in length of longest increasing subsequence.
            }
            }

            Now we simply need to find the max from the LIS array that we have formed and return it.


            **function bioTonic length**

            let lis = find array which gives the length longest increasing sequence for every ith element ending at it.
            let lds  = find array which gives the length longest decreasing sequence for every ith element starting from it.

            for every ith element of the array find the max value of
            lis[i]+lds[i]-1 

            return this max value.




**6. Building bridges:** 

    **Problem:** An array of pairs such that index 0 of every pair or first element of any pair represents a city
            with some number and the second element of the pair represents a city with some number. The task is the make bridges 
            between city 1 and city2 i,e city represented by first element of pair and city represented by second element of pair in such a 
            way that we should maximize the total number of bridges which we are making however no two bridges can intersect each other.
 
            For ex: [(6,2),(4,3),(2,6),(1,5)]
  
            1     2     3     4    5    6
                  
            1     2     3     4    5    6
   
            o/p: 2 we can make at most two bridges such that no two bridges intersect i,e
            2,6 and 1,5.


    **Intuition:** 
           1. Sort all pairs based on first element of pair, if two pairs have same first element sort them on basis of second element of pair.
  
           2. Find the LIS based on second element in pair.
  
            [(6,2),(4,3),(2,6),(1,5)]
  
            After step1:
  
            [(1,5),(2,6),(4,3),(6,2)]
  
            Step2:
  
            Max length LIS based on second element in pair is: {5,6} of length 2 


    **Algo:**
          **function maxBridges**

          We are sorting pairs based on first element of pair, if two pairs have same first element then we sort then on based on second element of pair.
          arr.sort((a, b) => {
          if (a[0] != b[0]) {
            return a[0] - b[0]
          } else {
            return a[1] - b[1]
        }
        })

         Create a nums array and push second element of each pair in it.
         num: number[] = [];
         for (let i = 0; i < arr.length; i++) {
         num.push(arr[i][1]);
         }
         Then find longest increasing subsequence for num array using binary search technique.
         For this refer section1: approach2

         return longestIncreasingSubSequence(num);




**7. Pairs chain/N meetings in one room:**

    **Problem:** Given a array of pair such that every pairs first element is smaller than the last element i,e a(i) < b(i) 
            or we can say that a(i) is the start time and b(i) is the end time in any pair.
            The task is to make a chain of pairs such that if we make a pair
            (a,b)-> (c,d) in a chain then b < c
 
            Find the length of longest such chain of pairs.
  
            Or we can resay this problem as say there is a meeting room in which start and end time of any ith meeting is given,
            what can be the max meetings which the meeting room can held.
  
            Or we can resay that there is a machine which can perform a task and every ith pair represents the start and end time of the task.
            What are the max number of task which the machine can perform.
  
            The logic will remain same i,e for any task or any meeting (a,b) -> (c,d) the task or meeting which can be done should have b<c.
  
            For ex: [(5,24),(39,60),(15,28),(27,40),(50,90)]
            o/p: 3 i,e {5,24},{27,40},{50,90}
   
            For ex: [{6,8},{3,4}]
            o/p: 2 i,e {3,4} {6,8}


    **Intuition:** Dp based
           Maintain an LIS array with lis[0] as 1 because arr[0] will have length of LIS as 1 including it.
  
           1. Sort all pairs based upon the first element or based on starting time of activity.

           Start iteration from i=1.
           
           2. Find the longest Increasing subSequence for the pairs based on if(pair[j][1]< pair[i][0]) then it can be in lis else not
             i,e start a j from i-1 -> 0
             If end time of jth activity is lesser than the start time of current ith activity then ith activity can be a part of LIS for jth activity.
            Find max lis j for such activities else we simply mark lis[i] as 1.
  

    **Algo:**
            
            First sort arr based on start time of activities.
            arr.sort((a, b) => a[0] - b[0]);

            Maintain an LIS array with lis[0] as 1.
            lis = [1];

            Start iteration from i=1 till end of array
            for (let i = 1; i < arr.length; i++) {
            max = -1;

            Check for all the activities from j = i-1 -> 0
            for (let j = i - 1; j >= 0; j--) {
            If end time of jth activity is lesser than the start time of current activity then ith activity can be a part of LIS for jth activity.
            Find max lis j for such activities

            if (arr[j][1] < arr[i][0]) {
                max = Math.max(max, lis[j]);
            }
            }
            if (max === -1) {
            If max is -1 this means that there exists no jth activity such that the end time of jth activity is lesser than the start 
            time of current activity then ith activity cannot be a part of LIS for any jth activity, thus mark lis[i] as 1.
            lis[i] = 1;
            } else {
            If max is not -1 this means that there exists jth activity such that the end time of jth activity is lesser than the start 
            time of current activity then ith activity can be a part of LIS for that max jth activity, thus mark lis[i] as max + 1
            lis[i] = max + 1;
            }
            }
            
            Now lis array is formulated simply find the max lis value from lis array.


    **Intuition2:** 
            Choose a greedy way and first sort all the item in ascending order of end time. Pick the first activity and see if 
            the next activity can be picked or not based on the starting time of activity to be selected or not and end time of current 
            activity. If starting time of activity to be picked is smaller than end time of current selected activity discard it else pick it.
            Now make the recently picked activity as current selected activity and proceed further.


    **Algo2:** 0(n log(n)),0(1)
        
           function maxActivity(activity: number[][])

            sort activities based on end time or sort activities based on 1st index of every individual activity.
            arr.sort((a, b) => a[1] - b[1]);
            currentSelectedActivity = activity[0];
            res = 1;
            iterate over the activities list from index i=1;
            if(startTime of activities[i] >= endTime of current selected activity){
            res+1
            currentSelectedActivity = activity[1];
            }
            return res that is the number of activities the machine can pick such that it can pick up max number of activities.

