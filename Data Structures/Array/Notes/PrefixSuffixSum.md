**Prefix-Suffix Sum concepts:**


If we start from starting of the array and maintain a sum for every ith index its termed as prefix sum whereas if we start from the
end of the array and maintain sum for every ith element its called as suffix sum.
Ex: arr = [3,4,8,-9,20,6]
    prefixSum = [3,7,15,6,26,32]
    suffixSum = [32,29,25,17,26,6]

    PreFixSum at any index i is: PreFixSum[PreFixSum.length-1] + arr[i]; if preFixSum = [arr[0]] initially and start iteration from i=1.
    SuffixSum at any index i is: suffixSum[suffixSum.length-1] - arr[i-1]; if suffixSum = [sumOfAllElements of array] and start iteration from i=1.


--------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>--------------------------------------------------

**Problems:**


**1. Equilibrium point in an array:**

    **Approach1:0(n*n),0(n):** This uses additional space to store the prefix and the suffix sum in individual arrays.

    **Intuition:** Equilibrium point in an array is a point such that sum of array up to left of it is equal to the sum of the array to right of it.
                   maintain a prefix sum and a suffix sum array, a point which is equal in both the array is the index at which the the equilibrium point
                   exists in the original array.


    **Algo:**
        Maintain a prefix sum array which initially as arr[0].

        Formulation of the prefix sum array
        Start traversal of the array from i=1.
        Keep pushing arr[i]+arr[i-1] into the prefix sum array.

        Maintain a suffix sum array which is initially as arr[arr.length-1]

        Formulation of suffix sum array
        Start traversal from second last element.
        Un shift arr[i]+suffix[0] value into suffix array

        Now we got both prefix and suffix array, simply use a two pointer approach and keep checking in both prefix and suffix array do we find a value
        which is equal in both of them

        If yes mark that index and return arr[index]
        If not there exists no equilibrium point in the array.



    **Approach2:0(n),0(1)** This modifies the above approach via not using additional space and even not using un shift operation which is costly.

    **Intuition:** For arr = [3,4,8,-9,20,6]
                   Equilibrium point in an array is a point such that sum of array up to left of it is equal to the sum of the array to right of it.

                   Prefix sum = [3,7,15,6,26,32]
                   Prefix sum of arr = [3,4,8,-9,20,6] at any index i is simply preFixCurrentSum + arr[i], if initially preFixCurrentSum is say 0 and we start i from
                   0 to length of array.

                   SuffixSum = [ 32, 29, 25, 17, 26, 6 ]
                   Now suffix sum of arr = [3,4,8,-9,20,6] at any index i  is simply currentSuffixSum - arr[i-1] where initially currentSuffixSum = sum of all elements in array.

                   Check if for any ith index does the prefix sum is equal to the suffix sum.


    **Algo:**
        Iterate over the array to get the sum of entire array and store it in suffixSum variable.
        Maintain a preFix sum variable as equal to arr[0].
        Maintain a res variable to get the index value where suffix sum and prefix sum is equal.
        Mark res as -1.

        Traverse over the array starting from i=1.
        if(suffixSum === preFix sum) mark res = i+1.
        else{
          make preFixSum as preFixSum += arr[i];
          make suffixSum as suffixSum -= arr[i-1];
        }

        If res is -1 means there exits no Equilibrium point in the array.
        Else simply return res.




**2. Max frequent element in range:**

    **Problem:** Given two array one which resembles lower bound range inclusive and one which resembles upper bound range inclusive.
                The task is to find the max frequent element in the range.
                lowerBound = [1,2,5,15]
                upperBound = [5,8,7,18]
                o/p: 5 is the most frequent character.


    **Approach1:0(n*maxRange),0(maxRange):** The idea is to use a hash table and mark all occurrence of elements in provided ranges.

    **Intuition:** Iterate over all the ranges from [lowerBound, upperBound] and mark occurrence of all elements in the range into the hashTable.
                   Use hashTable to get the most frequent element.


    **Algo:**
        Maintain a hashTable of length maxRange+1 as max range can be known from the inputs of the question.
        Start traversal over the length of any of the lowerBound or the upperBound array as both are of same length.

        for(let i=0;i<lowerBound.length;i++)
        {
         Mark a starting index as lowerBound[i] and an ending index as upperBound[i]
         while(startingIndex <= endingIndex)
         {
          From all elements from startingIndex till endingIndex both inclusive mark hashTable[startingIndex]++
          hashTable[startingIndex]++;
          startingIndex++;
         }
        }

        Now we have formulated our hashTable , the rest task is simply to iterate over the hashTable and find the index of max value.

        maintain res = 0 and index = -1;
        for(let i=0;i<hashTable.length;i++){
           if(hashTable[i]>res){
            res = hashTable[i];
            index = i;
           }
        }

        return index;
        
        

    **Approach2:0(n+max),0(maxRange)** This modifies the above approach via not traversing through all the elements present 
                in some lowerBound[i]-> upperBound[i] range 

    **Intuition:** Iterate over all the ranges from [lowerBound, upperBound] and mark occurrence of lowerBound[i] as 
    hashTable[lowerBound[i]]++ in hashTable whereas for upperBound[i] mark hashTable[upperBound[i]+1]--, create a preFix sum of the hashTable and most valued index in hashTable is the most frequent element amongst all the provided ranges.


    **Algo:** 
       Maintain a hashTable of size maxRange+1 where we can get maxRange from provided input values.
       Start traversal over the length of any of the lowerBound or the upperBound array as both are of same length.
       mark hashTable[lowerBound[i]]++;
       mark hashTable[upperBound[i]+1]--;

       Now we have formulated our hashTable so generate a prefix sum array from the hashTable
       maintain preFixSm = [hashTable[0]];
       traverse over the hashTable from i=1;
       preFixSm.push(hashTable[i]+ preFixSm[preFixSm.length-1]);

       Prefix sum array gets formulated out from the hashTable
       Now iterate over the hashTable and find the max index for which we have max value in the prefixSum array.
        



**3. Sum queries:**

    **Problem:** Given an array and m number of queries which include a starting and ending index which lies within the length of array.
                 The task is to give sum from that starting index till ending index both inclusive for every query.
                 arr = [2,8,3,9,6,5,4]
                 getSum(0,2) -> 2+8+3 = 13
                 getSum(1,3) -> 8+3+9 = 20
                 getSum(2,6) -> 3+9+6+5+4 = 27
  
                 o/p is [13, 20, 27]


    **Approach1:0(n*m),0(1):** Here n is the length of the array and m is the total number of queries.

    **Intuition:** For each query iterate over the array from the starting index provided in query till the ending index provided in query and compute
                the sum. Repeat this process for all m number of queries.


    **Algo:**
        Maintain a sm = 0;
        while(startIndex<= endIndex){
            sm+= arr[startIndex];
            startIndex++;
        }

        return sm;
        


    **Approach2:0(m),0(n)** Where m is the number of queries being asked.

    **Intuition:** If we somehow pre compute all the possible sums and then simply be able to answer any query in 0(1) then we can achieve 0(m) time complexity
                   as every query is getting answered in 0(1) and there are in total m queries.
                   Use preFix sum to pre compute all the sum at any index i.

                   Case1: Queries starting index is 0 and ending index is some k.
                          The answer will simply be preFixSum[k].

                   Case2: Queries starting index is say 1 and ending index is some say 5.
                          The answer will be PrefixSum[0->5]-PreFixSum[0->1) where starting index or 1 will be non inclusive as we have already included it in 0->5

                          or we can say 
                          PrefixSum[0->5] ~= PreFixSum[5]
                          PreFixSum[0->1) ~= PreFixSum[1-1]

                          so o/p will be PreFixSum[5] - PreFixSum[1-1].


    **Algo:** 
       Maintain a preFix sum array as initially preFixSm = [arr[0]];
       iterate from i=1.
       mark preFixSm[i] = preFixSm[preFixSm.length-1] + arr[i];

       if startIndex === 0 return preFixSm[endIndex];
       else
       {
        return preFixSm[endIndex] - preFixSm[startIndex-1];
       }




**4. Weighted Sum queries:**

    **Problem:** Given an array and m number of queries which include a starting and ending index  which lies within the length of array.
                 The task is to give weighted sum from that starting index till ending index both inclusive for every query.
                 arr = [2,8,3,9,6,5,4]
                 getSum(0,2) -> 2*1 + 8*2 + 3*3 = 27
                 getSum(1,3) -> 8*2 + 3*3+ 9*4 = 61
  
                 o/p is [27,61]
    

    **Approach:0(m),0(n)** Where m is the number of queries being asked.

    **Intuition:** If we somehow pre compute all the possible weighted sums and then simply be able to answer any query in 0(1) then we can achieve 0(m) time complexity
                   as every query is getting answered in 0(1) and there are in total m queries.
                   Use preFix weighted sum to pre compute all the weighted sum at any index i.

                   Case1: Queries starting index is 0 and ending index is some k.
                          The answer will simply be preFixSumWeighted[k].

                   Case2: Queries starting index is say 1 and ending index is some say 5.
                          The answer will be preFixSumWeighted[0->5]-preFixSumWeighted[0->1) where starting index or 1 will be non inclusive as we have already included it in 0->5

                          or we can say 
                          preFixSumWeighted[0->5] ~= preFixSumWeighted[5]
                          preFixSumWeighted[0->1) ~= preFixSumWeighted[1-1]

                          so o/p will be preFixSumWeighted[5] - preFixSumWeighted[1-1].


    **Algo:** 
       Maintain a preFixSumWeighted array as initially preFixSm = [1* arr[0]];
       iterate from i=1, j=2;
       mark preFixSumWeighted[i] = preFixSumWeighted[preFixSumWeighted.length-1] + (j*arr[i]);
       j++

       if startIndex === 0 return preFixSumWeighted[endIndex];
       else
       {
        return preFixSumWeighted[endIndex] - preFixSumWeighted[startIndex-1];
       }

