*Dynamic Programming: Dp*

DP is optimization over plain recursion. In recursion we use solutions of the subProblems to get the main solution but lets suppose that we are having overlapping
sub problems which are being computed again and again then we can optimize it
lets say if we are able to store the solution of the subProblems somewhere and then reuse them while formulating solution of a problem
which has some same set of subProblems which we computed earlier in some other problem. This is called DP and this can be achieved in two ways:

1. Memoization: Its a top to bottom approach, in case subProblem solution is not present then go for recursion.
2. Tabulation: Its a bottom to top approach, we don't do recursion here but use iterative ways.


**1. Find nth fibonacci number:**

    **Problem:** Given a n, find the value of nth fibonacci number.

    **Intuition1** Fib(n) is simply fib(n-1)+fib(n-2), so use recursion to compute the subProblems.

    **Algo1:**Simple plain Recursion:** 0(2^n),0(n)**

           if(n===0) return 0 indicating n=0th fibonacci number is 0.
           if(n===1) return 1 indicating n=1th fibonacci number is 1.

           return fib(n-1)+ fib(n-2)



    **Intuition2** Since in above recursion there are overlapping subProblems which are being computed again and again, and thus
            leads to performance hamper. Thus we can use memoization to store the solutions of the subProblems and if in case
            these sub problems are needed again, then instead of computing them again, we could reuse the already existing computation
            solution.

            Uses a top to bottom approach.


    **Algo2:** Using memoization: 0(n),0(n)
     
            Maintain a memo array which is initially undefined for all index.

            if(memo[n] === undefined){
                if(n===0 || n===1) this resembles base case when n=0 or n=1 then simply place memo[n] = n 
                memo[n] = n;
            else
               memo[n] = fib(n-1)+fib(n-2); else we simply use plain recursion
            }
            
            return memo[n];



    **Intuition3** Since in above recursion there are overlapping subProblems which are being computed again and again, and thus
            leads to performance hamper. Thus we can use tabulation to store the solutions of the subProblems and if in case
            these sub problems are needed again, then instead of computing them again, we could reuse the already existing computation
            solution.

            Uses a bottom to top approach.
            The dimension of the dp table can we understood via the number of changing variables in recursion which is one only i,e n.


    **Algo3:**Tabulation: 0(n),0(n)**
            Maintain a dp array of size n and initialize dp[0] = 0 and dp[1]=1 which resembles the base cases.
            Now start traversal from i=2 till n

            dp[i] = dp[i-1] + dp[i-2];

            simply return dp[n]



**2. Longest common subSequence:**

    Problem: s1 = "abc" , s2 = "adc", length of longest common subsequence is 2 i,e "ac

    **Simple plain Recursion:**

    **Intuition:** Start checking from end by say placing two pointers from end in s1 and s2.We don't generally start from starting index 0
            as then we need to maintain two separate pointers apart from the length of two strings which could be used as pointers in
            by the ending approach.

            There are two possibilities
            1) Both the end chars match
            2) Both the end chars does not match
               
            In case 1: If both the end chars match simply add 1 and recursively call for remaining string by removing the end char from
                         both the strings. We add one because the matching end char is included in length of longest of longest
                         common subsequence.
                
            In case2: If both the end chars does not match, 
                         a) remove the last char of first string and keep second string as it is and recursively check again
                         b) do not remove the last char of second string and remove the last char of second string and recursively check again.
                         Take max of it as we need the longest common subsequence.


    **Algo:**0(2^n),0(n)

            If(n===0 || m===0) where m and n are lengths of s1 and s2 respectively return 0 as an empty string and a full string will have
            longest common subsequence as empty string only which is of length 0.

            if(s1[m-1]===s2[n-1]) here the last chars of both strings matches 
            {
                return 1 + recursivelyCallFor(str1,str2,m-1,n-1);
                Above we have included the matching last char in longest common subsequence length and the we are checking for remaining 
                substring now of length m-1 for s1 and n-1 for s2. Or we can say we have removed the last char of both strings for further
                processing.
            }else : This resembles a case when last char of both strings does not match
            {
                return Math.max(recursivelyCallFor(str1,str2,m-1,n),recursivelyCallFor(str1,str2,m,n-1))
                Above we have removed the last char of first string and keep second string as it is and recursively checked again
                and does not removed the last char of second string and remove the last char of second string and recursively checked again.
                We are Taking the max of it as we need the longest common subsequence. 
            }



    **Memoization:**

    **Intuition** The logic will remain the same as above however there were overlapping subProblems which we
            seen in recursive solution which were getting computed again and again thus we can use dynamic programming.
            We will be using memo table to store values and in case memo value is present we will directly use it, else we
            will compute it via simple recursion i,e top to bottom approach.
            Check is memo[m][n] is undefined if yes, compute memo[m][n] else simply use memo[m][n]. Since there are two changing 
            parameter i,e length of string1 i,e m and length of string2 i,e n thus we need a 2-d array for this computation.


    **Algo:**0(m*n),0(m*n)
          
            Initialize memo[][] = [];

            function to get longest common subsequence
            Lets say m is rows and n is column.
            if(memo[m] is undefined) insert an array as row in memo array.

            if(memo[m][n] is undefined this means that the subProblem hasn't been computed yet and thus compute it)
            {
            if(n===0 || m===0) memo[m][n] = 0; meaning we have encountered an empty string thus length of longest common subsequence will simply be 0.
            if(s1[m-1]===s2[n-1] meaning the last chars have matched)
            {
                memo[m][n] = 1 + recursivelyCallFor(str1,str2,m-1,n-1);
            }
            else
            {
                memo[m][n] = Math.max(recursivelyCallFor(str1,str2,m-1,n),recursivelyCallFor(str1,str2,m,n-1))
            }
            }else
            {
            memo[m][n] is defined and means this subProblem has been computed previously as well and thus we will simply return memo[m][n]
            }



    **Tabulation** Now this is bottom to top approach in DP, here we will be prefilling the dp 2-d array which we need because 
            of two changing parameters and then will  fill rest of the entries based on previous entries. 
            Dp array will have dimensions (m+1)*(n+1) to handle the base cases of n=0 || m =0

    **Intuition** 
            Create a 2-d array dp.
            dp = [ 0, 0, 0, 0
                   0       
                   0
                   0        
                ] 
                      
            initially based on logic that if m===0 or n===0 the length of longest common subsequence is 0 as we are dealing with empty strings.
  
            we start filling from i=1 and j=1.
            so if s1[i-1] === s2[j-1] where we are considering i pointer for str1 and j pointer for str2.
            if last char matches this means dp[i][j] will simply be 1 + dp[i-1][j-1] because previously in recursion we were doing 
            1 + recursivelyCallFor(str1,str2,m-1,n-1)
            i,e  1 + removing the last char from both the strings.
  
            Now else when last char does not matches in recursion we were doing 
            Math.max(longestCommonSubSequence1(s1, s2, m - 1, n), longestCommonSubSequence1(s1, s2, m, n - 1))
            this means 
  
            dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1]);
  
            Now thus using this logic our dp table will get filled.

            Since we need longest common subsequence of str1 of original length 3 and str2 of original length 3 i,e s1 = "abc" , s2 = "adc" 
            thus dp[3][3] will be storing the answer.


    **Algo:**
            Create a 2d dp array with dimension (m+1) * (n+1)
            for(let i=0;i<=m;i++){
                dp[i] = []; we have created m+1 rows in dp array
            }

            Prefill m===0 all values as 0
            for(let i=0;i<=n;i++){
                dp[0][i] = 0;
            }

            Prefill all n===0 all values as 0
            for(let i=0;i<=m;i++){
                dp[i][0] = 0;
            }

            Start from i=1 and j=1 in dp array.

            for(let i=1;i<=m;i++){
                for(let j=1;j<=n;j++){
                    if(s1[i-1] === s2[j-1] meaning the last chars have matched){
                        dp[i][j] will simply be 1 + dp[i-1][j-1]
                        we have included the matching last char in longest common subsequence and we after removing the last 
                        char from s1 we will have i pointer to i-1 and removing last char from s2 our j pointer will be at j-1. 
                        So dp[i-1][j-1] will be storing the value of longest common
                        subsequence after removing last char from both strings.
                    }
                    else
                    {
                        meaning last char does not match
                        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                        If last char does not match then 
                        a) remove the last char of first string and keep second string as it is , so i points to i-1 and j remains as it is.
                           dp[i-1][j] contains the length of longest common subsequence for this substring.

                        b) do not remove the last char of second string and remove the last char of second string, so i remains as it is and j points to j-1
                           dp[i][j-1] contains the length of longest common subsequence for this substring.
                           
                           Take max of it as we need the longest common subsequence.
                    }
                }
             }
            Since we need longest common subsequence of str1 of original length m and str2 of original length n thus
            return dp[m][n] as dp[m][n] contains the answer.



**3. Coin change infinite supply problem count ways to formulate sum:**
   
    **Problem:** Given an infinite supply of coin the task is to give the total number of ways in which this given sum 
           can be formulated out of the given infinite  supply of coin.
  
           For ex; coins = [1,2,3]
           sum = 4
  
           The number of ways in which we can make a sum 4 out of given infinite supply of coins are:
  
           1. (1,1,1,1) i,e 4 coins of 1
           2. (2,2) i,e 2 coins of 2
           3. (1,3) i,e one coin of 1 and one coin of 3
           4. (2,1,1) i,e 1 coin of two and 2 coins of 1
  
           o/p : 4


    **Simple plain Recursion:**

    **Intuition** Again here also we start considering coins from last coin as we need not to maintain a separate pointer in case of considering from last as the
           given length of the coins array can itself be used as a pointer.

           Total ways = Ways in which a coin is being included + ways in which a coin is not being included.
           So for every coin we have two choices either to include it or not to include it.


    **Algo:**0(2^n),0(n)

           if(sum === 0) return 1; This is a base case indicating that if sum becomes 0 we have found a way to make sum from coins.
           if(sum < 0) return 0 indicating if sum itself becomes 0, there exist no way of making sum.
           if(n===0) this means that length of the array is itself 0 now so no coins exists thus return 0 as there is no way.
            
           let includeLastCoinWays = recursivelyCallFor(coins, n, sum -arr[n-1]);
           here n does not change i,e even after including the last coin there is again of possibility of including it again in subsequent calls as its infinite
           in number. The sum will get changed now as we have included one instance of the last coin and thus sum becomes sum - arr[n-1].

           let excludeLastCoinWays =  recursivelyCallFor(coins, n-1, sum);
           here n has changed to n-1 and we have excluded the last coin and checking for remaining length array of coins, since we didn't included the last coin so
           the sum remain unchanged.

           return includeLastCoinWays + excludeLastCoinWays


    **Intuition2:** There are overlapping subProblems which are computed again and again and thus we can use dp. In the above recursion we saw that two
            parameters were changing i,e sum and n. So we need a 2-d dp array.
            Dp array will be of dimension (n+1) * (sum+1)
            i,e rows from 0->n and column from 0->sum
            we are using an addition 0th row and 0th column to handle the base cases.

            Base cases:
            if(n===0) meaning that there exits no coin thus dp[0][j] should be zero meaning there exists no way.
            if(sum === 0) meaning the sum itself is 0. If n===0 && sum ===0 , it should be 1 i,e dp[0][0] as there exist no coin and sum is also 0 so
            there exists 1 way i,e we don't choose any coin at all.
            in other cells if sum if 0 and n is non zero, i,e dp[i][j] where j=0 and i>0
            it indicate that we found a way and we have achieved by coins combination thus 1 way we found.

            so dp array will look like initially say for ex: coins = [1,2,3], sum = 4

            dp = [ 1, 0, 0, 0, 0
                   1
                   1
                   1
             ]

    
    **Algo2:**
            
            Create a 2d dp array with dimension (n+1) * (sum+1)
            for(let i=0;i<=n;i++){
                dp[i] = [];
            }

            For all n===0 mark values as 0 since coins are 0 and there exists no way
            for(let i=0;i<=sum;i++){
                dp[0][i] = 0;
            }

            For all sum === 0 mark as 1 as we found a way
            for(let i=0;i<=n;i++){
                dp[i][0] = 1;
            }

            we start from i=1 and j=1.
            for(let i=1;i<=n;i++){
                for(let j=1;j<=sum;j++){
                    First check for excluded case as sum is not getting changed there
                    dp[i][j] = dp[i-1][j]
                    as we excluded the coin so i pointer changes to i-1 and jth sum remains same

                    Now include it but before it check if the modified sum value which we will get after inclusion is positive even
                    if(j >= coins[i-1]) as j resembles the jth sum or current sum and coins[i-1] that particular coin which we are taking into consideration.
                    {
                        dp[i][j] += dp[i][j-coins[i-1]];
                    } 
                }
            }
            return dp[n][sum] as we need to count ways for n sized coins array with given sum.



**4. Edit distance string:**
   
    **Problem:**Given two strings s1 and s2, we are allowed to do only these three operations i,e Insertion, deletion or replace.
            The task is give the min number of operations required to convert s1 to s2, each operation either be insertion,deletion 
            or replace is considered as 1 operation individually.


    **Simple plain Recursion:**

    **Intuition*** Now we need to convert s1 to s2 and thus operations needs to performed on s1.
            There are three possible operations which can be done i,e

            1.Insert an element in s1 from s2
            2. Delete an element from s1
            3. Replace an element in s1 with the element in s2.
  
            We will start from comparing last elements of s1 and s2 as in this case we won't be needing separate additional 
            pointers to maintain and the length of s1 i,e m and length of s2 i,e n can itself be used as pointers.
 
            Case1: Last elements of both the strings matches and thus we need not to perform any of the three operation and can 
            simply check for rest strings.
            if(s1[m-1]===s2[n-1]) then recursivelyCheckFor(s1,s2,m-1,n-1)
               
            Now if the last string does not matches so we need can perform either of three operations i,e

            1) Insert an element in s1 from s2.
               In this case the length of s1 will be increased by one or we can say that the last pointer will be at m only.
               Since we are inserting an element from s2 to s1 so length of s2 will get reduced by 1 or last pointer will be at n-1.
               so recursivelyCheckFor(s1,s2,m,n-1)
  
            2) Delete an element from s1
               In this case since we are deleting the last element from s1 thus length of s1 will be reduced by 1 , or we can say the 
               last pointer will now be pointing to m-1, whereas the length of s2 will remain same
               so recursivelyCheckFor(s1,s2,m-1,n)
  
            3) Replacing an element in s1 with the element in s2.
               So once we replace an element in s1 with s2, both the last ending elements will be simply same only and thus we 
               recursively check for remaining string by removing this same char.
  
            recursivelyCheckFor(s1,s2,m-1,n-1)
  
            Since we have considered one operation thus we need to add 1 and since we need min operations to convert s1 to s2 so
            we take coming from the recursive calls of all these operations.
  
            return 1 + Math.min(
                recursivelyCheckFor(s1,s2,m,n-1),
                recursivelyCheckFor(s1,s2,m-1,n),
                recursivelyCheckFor(s1,s2,m-1,n-1)
            )
  
            Now about the base cases, there are two parameters which are changing i,e m and n so both can becomes zero
            if(m===0) i,e length of s1 becomes 0 so in order to convert s1 i,e empty string to s2, we need to insert all 
            chars of s2 to s1 and thus we need n operations.
                
            if(n===0) i,e s2 is now an empty string so inorder to convert s1 to s2 we need to delete all the elements of s1 i,e it needs m operations.

    
    
    **Algo:**0(2^(min(m,n))),0(min(m,n))

            length of s1 becomes 0 so in order to convert s1 i,e empty string to s2, we need to insert all 
            chars of s2 to s1 and thus we need n operations.
            if(m===0) return n 

            length of s2 is now an empty string so inorder to convert s1 to s2 we need to delete all the elements of s1 i,e 
            it needs m operations.
            if(n===0) return m

            if(s1[m-1]===s2[n-1]) then recursivelyCheckFor(s1,s2,m-1,n-1)
            Last elements of both the strings matches and thus we need not to perform any of the three operation and can 
            simply check for rest strings.

            else
            {
                return 1 + Math.min( we are doing +1 as 1 operation we have already considered now
                recursivelyCheckFor(s1,s2,m,n-1),  Insert an element in s1 from s2.
                recursivelyCheckFor(s1,s2,m-1,n),  Delete an element from s1
                recursivelyCheckFor(s1,s2,m-1,n-1) Replacing an element in s1 with the element in s2.
            ) 
            }
                

    **Dp**
    **Intuition2:** The above plain recursion is having overlapping sub problems and thus we can use a bottom to top approach of DP to optimize it.
            Since there are two parameters changing in above recursion i,e  m and n, so we need a 2-d dp array.
            Now since we need to handle the base case of n===0 or m===0 thus we need this dp array of dimension, 
            (m+1)*(n+1)
 
            now if m === 0 this means length of s1 becomes 0 so in order to convert s1 i,e empty string to s2, we need to insert all chars 
            of s2 to s1 and thus we need n operations. 
            so dp[0][j] = j
  
            now if n===0 i,e s2 is now an empty string so inorder to convert s1 to s2 we need to delete all the elements of s1 i,e it 
            needs m operations. 
            so dp[i][0] = i
  
            So initial arrangement of dp array will look like:
            For ex: s1 = "CAT", s2 = "CUT"
  
            dp = [ 0, 1, 2, 3
                   1
                   2
                   3
                ]
  
            Now we start from i=1,j=1
  
            Case1: Last elements of both the strings matches and thus we need not to perform any of the three operation and can simply check for rest
            strings.
  
            so if(s1[i-1]===s2[j-1]) then dp[i][j] = dp[i-1]dp[j-1]
  
            In case if the last string does not matches so we need can perform either of three operations i,e
            a)Insert an element in s1 from s2.
                In this case the length of s1 will be increased by one or we can say that the  pointer will be at i only.
                Since we are inserting an element from s2 to s1 so length of s2 will get reduced by 1 or last pointer will be at j-1.
                so dp[i][j-1]
  
            b) Delete an element from s1
                In this case since we are deleting the last element from s1 thus length of s1 will be reduced by 1 ,
                or we can say the  pointer
                will now be pointing to i-1, whereas the length of s2 will remain same
                so dp[i-1][j]
 
            c) Replacing an element in s1 with the element in s2.
                So once we replace an element in s1 with s2, both the last ending elements will be simply same only and thus we check for
                remaining string by removing this same char.
                dp[i-1][j-1]
  
                so dp[i][j] = 1 + Math.min(
                             dp[i][j-1]
                             dp[i-1][j]
                             dp[i-1][j-1]
                )
  
            Since we need answer for s1 of length m and s2 of length n, thus dp[m][n] will give the res. 


    **Algo2:**0(m*n),0(m*n)
            create a dp array of size (m+1)*(n+1)
            for(let i=0;i<=m;i++){
                dp[m] = [];
                }

            if n===0 mark operation as m needed to convert s1 to s2.
            if(n===0) return m;

            if m===0 mark operation as n needed to convert s1 to s2.
            if(m===0) return n;

            Check if the last chars are same
            if(s1[m-1]===s2[n-1])
            {
            dp[i][j] = dp[i-1][j-1]
            }
            else
            {
            dp[i][j] = 1 + Math.min(
                dp[i][j-1] Insert an element in s1 from s2.
                dp[i-1][j] Delete an element from s1
                dp[i-1][j-1] Replacing an element in s1 with the element in s2.
            )
            }

            return dp[m][n]



**5. Maximum cuts:**
   
    **Problem:**Given a rod of length n, and three cut sizes i,e a, b and c.
            Give the maximum number of cuts which can be done by cutting this rod of length n either by making cuts of a or b or c.
            So length of the rod after making the cuts should be either a or b or c.
  
            n=5, a = 1, b=2, c=3
  
            o/p: 5 i,e if we make 5 cuts of 1 each.
  
            Another possibility i,e make cut of 2 and 3 but it will make 2 pieces only so max number of cuts is 5.
  
            We need to make max number of cuts.


    **Simple plain Recursion:**

    **Intuition1** We go by the brute force way that is we recursively cut the rope by a length slice, then by b length slice and then by c length slice.
            We take max out of these cases.
            Base case: 
            1) If the rope length becomes 0 we simply return 0 indicating that there is no way to cut this rope further or it means 
            there's no rod left to cut, so no further cuts are possible.
            2) If n becomes negative, it means we've tried a cut that exceeds the remaining length of the rod. 
            For example, if the remaining length is 2 and we try to cut a piece of size 3, it leaves n as -1, which is invalid.
            In this case, we return -1 to indicate that the current path of cuts does not lead to a valid solution.


    **Algo1:**0(3^n),0(n)
            
            if(n===0) i,e the rod has no length left and thus we return 0 indicating there is no way to cut this rope further
            if(n< 0) i,e rod length is negative it means we've tried a cut that exceeds the remaining length of the rod we return -1 
            to indicate that the current path of cuts does not lead to a valid solution.

            let res = Math.max(
            recursivelyCallFor(n - a, a, b, c), by making a cut of length a in the rod
            recursivelyCallFor(n - b, a, b, c), by making a cut of length  b in the rod
            recursivelyCallFor(n - c, a, b, c), by making a cut of length c in the rod
            )
            if (res === -1) return -1; indicating that the current path of cuts does not lead to a valid solution.

            we return res + 1 because we have made one cut  
            return res + 1; 
            



    **Intuition2:**In the above approach there are overlapping su Problems and thus we can use DP , tabulation bottom to top approach.
            Since in the above recursion there is only one changing parameter which is n, this we use a 1-d array.
            We formulate a DP array of length n as we need to take care of base case when n===0
            For n=0, dp[0] = 0 as if rod length is 0, there is no way to cut it further.
  
            Now we start iteration from i=1, till n and we make cut of a if possible
            similarly we make cut of length b if possible.
            similarly we make cut of length c is possible.
 
            So initially dp[i] = -1;
            if(i-a) >= 0 this means yes we can make a cut of a length for current ith length of rod.
            dp[i] = Max(dp[i],dp[i-a]);
  
            if(i-b) >= 0 this means we can make a cut of b length for current ith length of rod 
            dp[i] = Max(dp[i],dp[i-b]);
  
            if(i-c) >=0 this means we can make a cut of length c for current ith length of rod
            dp[i] = Max(dp[i],dp[i-c]);
  
            So in this way dp[i] will be filled with max cuts that we can make by considering length of a,b or c.
  
            Now if dp[i] === -1 this means no possible cut can be made either of a or b or c.
            else if dp[i] !== -1 we add +1 to it indicating that we made a cut.
  
            Since we need to find max cuts for nth length rod thus dp[n] is the answer.


    **Algo2:**0(n),0(n)

            Create a DP array of length n initializing with -1 and 
            dp[0] = 0;
            Try and make cuts of length a,b and c respectively

            for(let i=1;i<=n;i++){
              dp[i] = -1;
              if(i-a>=0) dp[i] = Math.max(dp[i],dp[i-a]); made a cut of a length
              if(i-b>=0) dp[i] = Math.max(dp[i],dp[i-b]); made a cut of b length
              if(i-c>=0) dp[i] = Math.max(dp[i],dp[i-c]); made a cut of c length

              if(dp[i] !== -1) dp[i] = dp[i]+1; +1 as we have successfully made a cut 
            }

            return dp[n];



**6. Minimum coins to formulate a sum via infinite supply:**
   
    **Problem:** Given an infinite supply of coins where coins denomination value is given via a array coins, also given a
           sum value which we need to formulate.
  
           Find the min number of coins needed to formulate the sum.
  
           For ex: coins = [25,10,5] value = 30
  
           Possible ways are
           1) Choose 1 coin of 25 and one coin of 5
           2) Choose 3 coins of 10
           3) Choose 6 coins of 5
  
           Clearly min 2 coins i,e one of 25 and one of 5 are needed to make the sum thus
           o/p: 2


    **Intuition** 
           Base case of recursion: if sum becomes 0 this means we have successfully formulated a path and we simply return 0 
           as no more coins are needed further as sum itself is 0.
  
           We start our iteration and for every ith coin we see if coin value is lesser than sum, then we take that 
           coin by reducing the sum value with coin value and recursively search that how we can now formulate the remaining sum.
  
           if this recursion is giving us a valid answer then we check for min using res = Math.min(res, sub_res + 1);
           + 1 is added to account for the current coin we just used to form part of the target sum.


    **Algo:** 0(coins^sum)
           Mark the base case that if sum itself is 0 then there exits no coins are needed to formulate the sum.
           if (sum === 0) return 0;

           Maintain a res of Infinity value to get min coins possible to formulate the sum
           let res = Number.MAX_SAFE_INTEGER;

           Start iteration from i=0 -> end of coins array
           for (let i = 0; i < coins.length; i++) {

           Check if this coin can be used to formulate the coin
           if (coins[i] <= sum) {
           If it can be used then recursively check for sum -  coins[i] value
           
           let sub_res = minCoinsToFormulateSum(coins, sum - coins[i]);

           If value is not infinite then see if we can update res with a lower value as current value.
           if (sub_res && sub_res !== Number.MAX_SAFE_INTEGER) {
                res = Math.min(res, sub_res + 1);
           }
           }
           }
           return res;



    **Intuition2:**
           Since in the above approach there are overlapping sub problems thus we can use dp tabulation technique which is bottom up.
           In the above recursion there is only one parameter which is changing i,e sum so we create a 1-D dp array.
           We initialize a dp array of length sum because we need to take care of base case when sum = 0 then total 
           coins needed to formulate a sum zero is also 0.
  
           Rest all other values of this dp array is infinite.
  
           Now we start iteration from i=1 till -> sum
  
           For every ith sum value we check what number of coins are needed and we take min out of them.
  
           So if coins[j] value is less than or equal to ith sum value then we can say then 
           dp[i] = Math.min(dp[i],1+dp[i-coins[j]]) we did 1+ because we are including the jth coin .


    **Algo2:** 0(n*sum),0(sum)
           
           Create a dp array of length sum and initialize dp[0] as 0 stating if sum is 0, no coins are needed to formulate this sum.
           Start iteration from i=1 -> sum
           Check for every coin in coins array using j
           for(let i=1;i<=sum;i++){
            dp[i] = Infinite
            for(let j=0;j<coins.length;j++)
            {
                Check if this coin can be included to formulate the sum i
                if(arr[j]>= i)
                {
                    dp[i] = Math.min(dp[i], 1+ dp[i-coins[j]]);
                    If yes , include the coin using (1 +) and get the value of the remaining sum using dp array itself. 
                }
            }
           }

           if dp[sum] in last comes as infinite this means there exists no coin such that we can make the sum thus return -1.



**7. Minimum jumps to reach end from first cell:**
   
    **Problem:** Given an array in which every cell value represents the max jump which you can take from the cell. The task is to find 
          the min number of jumps which is needed to reach from first cell till end.
          For ex: arr = [3,4,2,1,2,1]
          So from i=0 we can take a max jump of 3 cells i,e till index 3.
          From i=1 we can take a max jump of 4 cells i,e till index 5.
          So clearly in order to reach from start till end in min possible jumps we need to have one jump from
          i=0->i=1 and then i=1 -> i=5 i,e 2 jumps.
  
  
          arr = [4,1,5,3,1,3,2,1,8]
          Min number of jumps to reach from i=0 till end is:
  
          i=0->i=2
          i=2->i=5
          i=5->i=8
  
          so o/p 3


    **Intuition1**
          If arr size is 1 i,e say arr = [3] then we are already at the end of the array and thus we don't need to make any jump to reach end and thus return 0.
          Now we will iterate over all the index of the array at say the array is
          arr = [3,4,2,1,2,1]
  
          so at i=0 we can make at max jump of 3 so this means that we will reach 0+3=3 rd index or i+ arr[i] th index after making the jump.
          So if i+ arr[i] >= size-1 i,e the last index then we know that we can make the jump from this index.
  
          So at i=0: 0+3 >= 5 false we cant make a jump
          at i=1: 1+ 4 >=5 yes we can make a jump.
  
          So when we make a jump we recursively call for arr on i+1 index now.
  
          We take the min of the res coming from the recursive calls.


    **Algo1:**
          If arr size is 1 than we at itself at end of the array thus we need 0 jumps thus return zero.
          if (size === 1) return 0;

          Initialize res to Number.MAX_SAFE_INTEGER;
          Iterate over all the elements of the array
          for (let i = 0; i < size - 1; i++) {

          if (i + arr[i] >= size - 1) {
            collect the result of the recursive calls
            let sub_result = minJumps(arr, i + 1);

            if we have a valid result then
            if (sub_result !== Number.MAX_SAFE_INTEGER) {
                find the min of res and the result +1 , we are doing +1 as we have made a jump from the index which also needs to be included.
                res = Math.min(res, sub_result + 1);
            }
          }
          }
          return res;



    **Intuition2:**The above recursive solution has overlapping sub problems thus we can use dp to get jump for any ith size.
          Since there is only one size parameter changing thus we need to make 1-d array.
  
          Dp array will be of size length of array as we need to take care of base case that dp[0] will be 0, as if length of array is 0, then we
          need not to make any jump and we initialize it with MAX_SAFE_INTEGER.
  
          We start iteration from i=1 till end of array here every i represents problem that we need to solve for i size array.
          For every ith size we start iteration from j=0 till i and check if
          arr[j] + j >= i if yes this means that we can make a valid jump for this value of i.
  
          If dp[j] !== Number.MAX_SAFE_INTEGER this means its not been computed earlier than we compute it.
          dp[i] = min(dp[i], dp[j]+1) , we did +1 as we made one jump .
  
  
          return dp[size-1];
  

    **Algo2:**
           Initialize a dp array of size length of array and fill with infinity value and mark dp[0] as 0.
           dp = new Array(size).fill(Number.MAX_SAFE_INTEGER);
           dp[0] = 0;

           Iterate from i=1 till size value and for every j check if we can make a valid jump for ith size
           for (let i = 1; i < size; i++) {
           for (let j = 0; j < i; j++) {
           if (arr[j] + j >= i) { this resembles that wether we can make a valid jump or not.
                if (dp[j] !== Number.MAX_SAFE_INTEGER) { if the value has not been computed yet then simply compute it
                    dp[i] = Math.min(dp[i], dp[j] + 1);
                }
            }
            }
            }
            return dp[size-1];
    


**8. 0-1 Knapsack problem:**
   
    **Problem:***Given an array of arrays or say array of object where each object has two properties one is weight and one is 
            the value of that.
  
            We are also given a knapsack or say a bag of certain capacity that this much weight it can hold.
            The task is to place the items in this knapsack/bag in such a way that we can get the max value.
            We are not allowed to place fractional weights in the bag.
  
            Fractional weights are allowed in a different problem which was fractional knapsack problem in greedy however 0-1 knapsack can't be solved
            via greedy approach.
  
            For ex:
 
            [{weight: 5, value: 10}, {weight: 4, value: 40}, {weight: 6, value: 30},{weight:3, value: 50}]
            knapsack capacity = 10.
  
            o/p: 90 i,e weight 3 of value 50 and weight 4 of value 40 we can choose to maximize the value within the given knapsack
            capacity limit.


    **Intuition1:** In Recursion there are two possible cases which can arise.

            We traverse the weight from last as then we don't need separate additional pointer to iterate and can directly use n i,e length of array.
  
            Case1: the weight is greater than the current remaining capacity so we don't choose it and move ahead.
            Case2: The weight is lesser or equal to the current remaining capacity so we have two options
            1. Choose it
            2. Don't choose it
         
            We have to get max of these two cases.

            Base case is when n===0 i,e the length of weight or value array is itself zero meaning there is no weight or value so return 0.


    **Algo1:**0(2^n),0(n)
            
            the length of weight or value array is itself zero meaning there is no weight or value so return 0.
            if (n === 0 || capacity === 0) return 0;

            Case1: if (weights[n - 1] > capacity)- i,e the weight is greater than the current remaining capacity we don't choose it
            {
            Since we are not choosing it thus ne make n as n-1 and the capacity remains same.
            return zeroOneKnapSackProblem(weights, values, n - 1, capacity);
            } 
            else {
            Case2: Weight is lesser than current remaining capacity and thus we can choose it or we don' choose it , we take out the max of these
            cases.

            return Math.max(
            We don't choose the item and thus n becomes n-1 and capacity remains unchanged. 
            zeroOneKnapSackProblem(weights, values, n - 1, capacity),

            Since we need to find the max value thus when we consider an item or choose it we also add the 
            value associated with that item
            values[n - 1] +

            we consider the item and thus now we make n as n-1 as we need to consider next item and capacity gets reduced to
            capacity - weights[n - 1]

            zeroOneKnapSackProblem(weights, values, n - 1, capacity - weights[n - 1])
        );
    }


    **Intuition3:**In the above recursion two parameters are changing i,e capacity and n which is the pointer for iteration over value or weight array.
            So we will be formulating a 2-d dp array of dimensions (n+1)*(capacity+1).
  
            now if n===0 this means that there is no value or weight so simply we mark that row as 0.
            now if knapsack capacity is 0 then also irr respective of value of n, we mark it as 0 since we can't get value associated with this case even.
  
            so till now out dp array looks like:
  
            Say for example: 
  
            weight = [5,4,6,3]
            value = [10,40,30,50]
            n = 4
            capacity = 10
  
            dp = [0,0,0,0,0,0,0,0,0,0,0
                  0
                  0
                  0
                  ]
  
            now we start iteration from i=1 resembling rows and j=1 resembling columns.
            dp[i][j] represents max value which we can collect with i items and a knapsack capacity of j.
  
            So there arise two cases 
            Case1: the weight is greater than the given capacity so we don't choose it and move ahead.
            Case2: The weight is lesser or equal to the given capacity so we have two options
            1. Choose it
            2. Don't choose it
         
            We have to get max of these two cases.
  
            So if weight[i-1] > j this means that the weight is greater than the given capacity so we don't choose it and move ahead
            dp[i][j] = dp[i-1][j]
  
            Case2: The weight is lesser or equal to the given capacity so we have two options
            1. Choose it
            2. Don't choose it
  
            if we choose it this means dp[i][j] = dp[i-1][j-weights[i-1]]
            if we don't choose this means dp[i][j] = dp[i-1][j]
            and if we choose then the value of the item also needs to be considered i,e values[i - 1]
  
            we need to take max of them
  
            dp[i][j]= Math.max(dp[i - 1][j],
                    values[i - 1] + dp[i - 1][j - weights[i - 1]])



    **Algo3:**
           Formulate a 2-d dp array with base case if n===0 then it will be 0 and if capacity is 0 then value should be 0.
           dp  = [];
           for (let i = 0; i <= n; i++) {
           dp[i] = [];
           dp[i][0] = 0;
           }
           for (let i = 0; i <= capacity; i++) {
           dp[0][i] = 0;
           }    

           Start iteration from n=1 and sum = 1
           for (let i = 1; i <= n; i++) {
           for (let j = 1; j <= capacity; j++) {
            Case1: current weight is greater than the current capacity then discard the entry
            if (weights[i - 1] > j) {
                dp[i][j] = dp[i - 1][j];
            } else {
                Case2: The weight is lesser or equal to the given capacity so we have two options
                1. Choose it
                2. Don't choose it
                and if we choose then the value of the item also needs to be considered i,e values[i - 1]
                dp[i][j] = Math.max(
                    dp[i - 1][j],
                    values[i - 1] + dp[i - 1][j - weights[i - 1]]
                )
            }
            }
            }
            return dp[n][capacity];



**9. Egg dropping puzzle:**

    **Problem:** Given two inputs number of eggs and total floors, any floor can be a threshold floor. 
            By threshold we means that dropping the egg from that floor will cause egg to break and therefore all floors 
            below it will fall under the category from where the egg if dropped won't break and all the floor above and including 
            this thresh hold floor falls under the category that if the egg is dropped from them it will break.
  
            We need to find total number of trails that we can do in worst case in order to find the threshold floor.
  
            For ex: eggs = 1, floor = 10
            o/p: 10 min trails in worst case to find the threshold floor is 10.
  
            Lets understand:
  
            floors range from 1->10
            So Lets say we start with 1st floor and drop the egg there are two possibilities i,e either it can break or it will not
            break. If it break its the threshold. If it wont break we go to floor 2 .
  
            Now at floor 2 we again have two possibilities i,e either it can break or it wont break.
            If it break its the threshold and we are sure that all floors above 2nd the egg will also break. If it wont break then
            we move to floor 3rd.
  
            In this way in the worst case we can reach up to floor 10 and thus minTrails needed to find the threshold floor 
            in worst case is 10.
  
  
            For ex: eggs = 2, floor = 10
            o/p: 4 is the min trails needed to find the threshold floor in worst case.
  
            Lets suppose:
  
            We start at floor = 4 So there are two possibilities here.
            1. Eggs breaks
            2. Eggs wont break.
  
            If egg breaks we are still unsure that is it the actual threshold because if in case the threshold lies from 1->4 then also
            egg can break at 4th floor so we need to check floor 1,2 and 3 in this case with remaining egg.
  
            So now problem reduces to one egg and 3 floors [1->3] and in worst case we can find max 3 trials. Thus total trail is 4.
  
            Lets suppose egg doesn't break
            So we move to 7th floor again there can be two possibilities
  
            1. Eggs breaks
            2. Eggs wont break.
  
            If egg breaks at 7th and previously egg didn't broke at 4th thats why we are at 7 now.
            So if it breaks at 7 we are sure that any floor between [5->6] can also the threshold so we are left with
            one egg so trails needed for 2 floors with one egg is 2. And we have already done trails on 4th floor 
            and 7th floor so 2 trails there also done so in total 4 trails again in this case.
 
  
            Now lets talk about the case if the egg doesn't break in 7th floor.
            So current situation one trail done on 4th floor its didn't break
            One trail done on 7th floor it didn't break
  
            Now we are at 9th floor we do one trial
            There are two possibilities that egg can break and egg won't break.
  
            If egg breaks than it means [8] can also be a threshold floor so we check on 8th so total trails becomes
  
            one on 4th, one on 7th, one on 9th and one on 8th i,e 4 min.
  
  
            If eggs doesn't break on 9th floor then current situation is
  
            one trail done on 4th floor its didn't break
            One trail done on 7th floor it didn't break
            one trail done on 9th floor it didn't break
  
            So we move to 10th floor which is again one trail
            If it breaks at 10th then we found the threshold floor and total trials are 4.
  
            If it doesn't even break at 10 this means there exists no threshold floor.
   
    

    **Intuition1**
            Lets first talk about the base cases:
            1. If the eggs = 0 and no matter how many floors we have we cant do any trails as we don't have 
            eggs to preform it thus return 0

            2. If the floors = 0 then no matter how many eggs we have we don't have any floor to perform trial on and thus we return 0
   
            3. If the eggs = 1 then whatever the floor value is we return that because in worse case we need to 
            check all the floors and thus min trails is the floors only.
           
            4. If floor = 1, then in worse case we need to check this floor only thus number of trial is 1 only.
  
            Now lets consider min drop as infinity.
            We start iteration from the first floor i,e i=1
            For every floor there are two possibilities either the egg will break or the egg will not break.
  
            Possibility 1: Egg break
            If egg breaks then the number of eggs left is eggs-1 and now since egg has broken on ith floor then it will surely break on 
            i+1 floor onwards but we need to check if it can break on i-1 floor now because all floors below it needs to be checked now.
  
            so we recursively call for eggs-1 eggs and i-1 floors
  
            Possibility2: The eggs does not break
  
            if the egg does not break at ith floor then number of eggs remains same and now we need to check on floors
            greater than i i,e floor-i floors
  
            so we recursively call for same number of eggs and floor-i floors
  
            Now the worst case drops will be max of (Possibility 1: Egg break, Possibility2: The eggs does not break)+1 (+1)as we have made 
            a trial at it floor
            
            We need to minimize this worst case so we take min of it.
            minDrops = Math.min(minDrops, worstCaseDrops);


    **Algo1:**
            
            If the eggs = 0 and no matter how many floors we have we cant do any trails as we don't have 
            eggs to preform it thus return 0 and if the floors = 0 then no matter how many eggs we have we don't have 
            any floor to perform trial on and thus we return 0
            if (eggs === 0 || floor === 0) return 0; 

            f we have One egg, then we must check all floors linearly
            if (eggs === 1) return floor; 

            if we have one floor, only one trial needed
            if (floor === 1) return 1; 

            consider minDrops = Infinity;

            Try dropping from each floor and calculate the number of drops in the worst case
            for (let i = 1; i <= floor; i++) {
            Case1: Egg breaks, thus check for eggs-1 and i-1 floors now
            const dropsIfBreaks = eggDroppingPuzzle(eggs - 1, i - 1); 

            Case2: Egg doesn't break, thus check for same number of eggs and floor-i floors
            const dropsIfNotBreaks = eggDroppingPuzzle(eggs, floor - i);

            worstCase drop is max of case1 and case2 + 1 as we have done completing one trial.
            const worstCaseDrops = 1 + Math.max(dropsIfBreaks, dropsIfNotBreaks);

            Take the minimum of all worst-case scenarios
            minDrops = Math.min(minDrops, worstCaseDrops);
            }

            return minDrops;



    **Intuition2:**
            Since in the above recursion there are two parameters changing i,e floor and egg and thus we need to maintain a 
            2-d array of dimensions (eggs+1)*(floor+1)
  
            now lets talk about the base cases, if eggs becomes 0 i,e for 0th row, we can not make any trial thus value should be 0.
            1. If the eggs = 0 and no matter how many floors we have we cant do any trails as we don't have eggs to preform it thus value should be 0.
            2. If the floors = 0 then no matter how many eggs we have we don't have any floor to perform trial on and thus value should be 0.
            3. If the eggs = 1 then whatever the floor value is is the value of the cell because in worse case we need to check all the floors 
            and thus min trails is the floors only.
            4. If floor = 1, then in worse case we need to check this floor only thus number of trial is 1 only.
  
            So our dp array will look like: eggs = 2, floor = 10
            dp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
                  0, 1
                 ]
  
           Now we will start from i=2 and j=2.
           We will initialize the cell value as infinity.
  
           Now we will try and dropping the egg from every kth floor where k=1 and k<=j as j is denoting the floor value.
           Now for every floor there are two possibilities
           1) Egg breaks
           2) Egg does not break
  
           Possibility 1: Egg break
           If egg breaks then the number of eggs left is egg-1 and now since egg has broken on ith floor then
           it will surely break on i+1 floor onwards but we need to check if it can break on i-1 floor now because all 
           floors below it needs to be checked now.
  
           eggBroke = dp[i-1][k-1]
  
           Possibility2: The eggs does not break
  
           if the egg does not break at ith floor then number of eggs remains same and now we need to check on floors
           greater than i i,e floor-i floors
  
           eggDoesNotBroke = dp[i][j-k]
  
           worst case is calculated as max of this above + 1 (+1) as we have performed one trial and.
  
           value = 1 + Math.max(dp[i-1][k-1], dp[i][j-k])
  
           Now we need to calculate the min of worst case
  
           so dp[i][j] = Min(value, dp[i][j])
  
           return dp[eggs][floor]


    **Algo2:**
           
          dp: number[][] = [];
          If floor is 0, then no matter how many eggs we have the number of trials will be 0 only.
          for (let i = 0; i <= eggs; i++) {
          dp[i] = [];
          dp[i][0] = 0;
          }

          If eggs are zero than no matter how many floors we have trails will be 0 only.
          for (let j = 0; j <= floor; j++) {
          dp[0][j] = 0;
          }

          If eggs are one then number of trials is equivalent to the floor value itself
          for (let j = 1; j <= floor; j++) {
          dp[1][j] = j;
          }

          If floor is one then no matter how many eggs we have we need one trial only
          for (let i = 1; i <= eggs; i++) {
          dp[i][1] = 1;
          }

          Start iteration to fill the remaining values in the dp array and initialize every cell with infinity.
          for (let i = 2; i <= eggs; i++) {
          for (let j = 2; j <= floor; j++) {
          dp[i][j] = Infinity;
          Iterate over every floor from k=1 till j for every jth floor
          for (let k = 1; k <= j; k++) {
                Possibility 1: Egg break
                If egg breaks then the number of eggs left is egg-1 and now since egg has broken on ith floor then
                it will surely break on i+1 floor onwards but we need to check if it can break on i-1 floor now because all 
                floors below it needs to be checked now. eggBroke = dp[i-1][k-1]


                Possibility2: The eggs does not break
  
                if the egg does not break at ith floor then number of eggs remains same and now we need to check on floors
                greater than i i,e floor-i floors eggDoesNotBroke = dp[i][j-k] worst case is calculated as max of 
                this above + 1 (+1) as we have performed one trial and value = 1 + Math.max(dp[i-1][k-1], dp[i][j-k])
                Now we need to calculate the min of worst case so dp[i][j] = Min(value, dp[i][j]) return dp[eggs][floor]
  

                let value = 1 + Math.max(dp[i - 1][k - 1], dp[i][j - k]); 
                dp[i][j] = Math.min(dp[i][j], value);
            }
          }
          }
          return dp[eggs][floor];



**10. Count BST with n keys:**
   
    **Problem:**
          Given a value n which resembles the input total count of nodes which are present in the bST.
          The task is to count the total number of unique BST 's arrangement which we can make using this n input node's.
  
          For ex: n=1
          we can make only one BST with one node i,e  1
  
          For ex: n=2
          we can make two unique BST with two nodes i,e
  
           1           or            2
             2                     1
   
          For ex: n=3
         
          o/p: 5
  
         1                 1             2              3           3
          2                   3       1     3         2           1
            3               2                        1               2


    **Intuition**
          n=1 we can make only one BST with one node i,e  1
          n=2 we can make two unique BST with two nodes i,e
  
           1           or            2
             2                     1
   
          So for 2 nodes we can see 
  
          starting from 1, if we fix one as root then nodes to right of it will be the node values which are greater than value 2 which
  
          are total nodes - current fixed root i,e 1 node.
          Nodes to left of it will be the nodes with value smaller than one which is 0.
  
          for value 2 if we fix as root then total nodes to right of it are nodes with value greater than 2 which is totalNodes - 2 = 0
          the nodes with value smaller than current root node 2 will lie left of it i,e 1 node which is simply 2-1 = 1
  
          Lets again try and generalize this with 3 nodes 
  
          For ex: n=3
         
          o/p: 5
  
         1                 1             2              3           3
          2                   3       1     3         2           1
            3               2                        1               2
   
           So for n=3.
  
          If we start fixing nodes as root starting from value 1.
  
          j=1 (fix as root)
  
          a) Total nodes left of it or nodes smaller than 1 are 1-1 = 0 nodes
          b) Total nodes right of it or nodes greater than 1 are 3-1 = 2 nodes 
  
          j=2 (fix as root)
  
          a) Total nodes left of it or nodes smaller than 2 are 2-1 = 1 node
          b) Total nodes right of it or nodes greater than 1 are 3-2 = 1 node 
  
          j=3
  
          a) Total nodes left of it or nodes smaller than 3 are 3-1 = 2 nodes
          b) Total nodes right of it or nodes greater than 1 are 3-3 = 0 node 
  
          So if we know the number of trees in which we can formulate using 1 as root 
          similarly if we know the number of tree which we can formulate using 2 as root
  
          Then we can calculate the number of tree that we can calculate using 3 nodes.
  
          Lets see how.
  
          for n=3 its clear from the diagram considering 
  
          1 as root:
          we can get two arrangements which is 
  
          2 as root we can get 1 arrangement
  
          3 as root we can get 2 arrangement
  
          so total arrangement which ae can get is 1 + 2+2 = 5
  
          So lets formulate a dp array
  
          dp[0] = 1 because if there is no root then we can formulate one tree which is of null root
          dp[1] = 1 because if there is 1 node then we can formulate only one arrangement
          dp[2] = 2 
              1           or            2
             2                     1
   
   
          Now lets calculate for dp[3]
  
          we start jth iteration from j=1 till i
  
          so total number of nodes with value greater than j is i-j
          so total number of nodes with value lesser than j is j-1
  
          Total arrangements which we can make with nodes with greater value than j is dp[i-j]
          Total arrangements which we can make with nodes with smaller value than j is dp[j-1]
  
          dp[i] += 
  
          Total arrangements which we can make with nodes with greater value than j is dp[i-j] * 
          Total arrangements which we can make with nodes with smaller value than j is dp[j-1]


    **Algo:**

           Formulate the dp array and mark result for some basic cases like 0,1 and even 2
           dp: number[] = [];
           dp[0] = 1;
           dp[1] = 1;
           dp[2] = 2;

           for (let i = 3; i <= n; i++) {
           dp[i] = 0;
           Start iterating for every jth node starting with j=1 and find the total nodes
           left or smaller than it and total nodes on right or larger than it

           for (let j = 1; j <= i; j++) {
           let rightGreaterValues = i - j;
           let rightGreaterArrangements = dp[rightGreaterValues];

           let leftSmallerValues = j - 1;
           let leftSmallerArrangements = dp[leftSmallerValues];

           the value of dp[i] will be the number of arrangements we got right of it * number of arrangement we got left of it and add it to
           dp[i][j]

           dp[i] += rightGreaterArrangements * leftSmallerArrangements;
           }
           }
           return dp[n];



**10. Max sum with no consecutive:**
   
    **Problem:**
           Given an array of number, we need to find what max sum we can obtain from the array such that the elements which we are 
           including in fetching the sum should not be consecutive.
  
           For ex: arr: [1,10,2]
           o/p: 10
  
           possible sums are 1 if we take {1}, {1,2 = 3}, {2} if we take 2 only and {10} 
           out of them max is 10.
  
           arr: [8,7,6,10]
           o/p: 18 i,e from {8,10}
  
           arr: [10,5,15,20,2,30]
           o/p: {10,20,30} i,e 60


    **Intuition1**
           Lets talk about base cases so 
  
           1.if n===1 this means that there exist only one element in the array and thus we simply will take that value only
           i,e arr[0]
  
           2. if array has only two elements than we take max out of them as we cant take both because they are consecutive.
  
           we wont use any additional pointer for array traversal rather we will only use n as a pointer itself and traverse from end of the array.
  
           Now we consider both the possibilities 
           a) we do not consider an element:
           In this we will simply move to next element which is n-1
  
           b) we consider element, in this case we will move to next to next element as consecutive element 
           selection is not allowed i,e n-2 and we will include the value of this element.
  
           We need to maximize the sum and thus we take max of these two cases.


    **Algo1:**
           if n===1 this means that there exist only one element in the array and thus we simply will take that value only i,e arr[0]
           if (n === 1) return arr[0];

           if array has only two elements than we take max out of them as we cant take both because they are consecutive.
           if (n === 2) return Math.max(arr[0], arr[1]);

           return Math.max(
           we do not consider an element:
           In this we will simply move to next element which is n-1

           maxSumNoConsecutive(arr, n - 1),

           we consider element, in this case we will move to next to next element as consecutive element 
           selection is not allowed i,e n-2 and we will include the value of this element.

           maxSumNoConsecutive(arr, n - 2) + arr[n - 1]
           )


    **Intuition2**
           Lets solve using dp so there was only parameter which was changing i,e n or the pointer through which we were traversing the 
           array so we will make a 1-d dp array.
           dp[0] = 0 as if there exists no element in the array or length is 0 then max consecutive sum is 0 also.
           dp[1] = arr[0] as there exists only one element in the array thus max consecutive sum is arr[0] 
           dp[2] = max(arr[0],arr[1]) as there exits only two elements in array and we cant select both of them as then 
           it will be consecutive thus we take max of them.
  
           now we iterate from i=3 and
           we have two choices.
           1) We do not consider ith element
           if we do not consider ith element then dp[i] = dp[i-1]
  
           2) If we consider ith item then
           dp[i] = dp[i-2]+ arr[i-1].
  
          We need max of these two cases so 
  
          dp[i] = Math.max(dp[i-1], dp[i-2]+ arr[i-1])
  
          return dp[n];


    **Algo2:** 0(n),0(n)

          Maintain a dp array and mark base cases as
          dp[0] = 0 as if there exists no element in the array or length is 0 then max consecutive sum is 0 also.
          dp[1] = arr[0] as there exists only one element in the array thus max consecutive sum is arr[0] 
          dp[2] = max(arr[0],arr[1]) as there exits only two elements in array and we cant select both of them as then 
          let dp: number[] = [];
          dp[0] = 0;
          dp[1] = arr[0];
          dp[2] = Math.max(arr[0], arr[1]);

          Start iteration from i=3 and consider two cases one in which we consider ith item and one in which
          we don't consider ith item.
          Take max of both these cases.

          for (let i = 3; i <= n; i++) {
          dp[i] = Math.max(dp[i - 1], arr[i - 1] + dp[i - 2]);
          }
          return dp[n];



**10. Subset sum:**
   
    **Problem:** Given an array, and a sum value the task is to tell the number of subsets whose sum is equal to the given sum.
          For ex: arr = [10,5,2,3,6], sum = 8
          o/p:2 there are two subsets with sum 8 i,e {5,3} and {2,6}
  
          arr = [1,2,3] , sum = 4
          o/p: 1 i,e {1,3}
  
          arr = [10,20,15]
          sum = 37
  
          o/p: 0, there exits no subset with sum 37


    **Intuition1**
          We will be using recursion to solve the problem.
          Lets understand base cases:
  
          We will be reducing the given sum value via inclusion and exclusion of every element of the array.
          If sum becomes 0 it resembles that yes we found a valid subset of the given sum and thus
          we return 1 , stating we found one subset.
  
          If n===0 this means that no elements are left and thus if we don't have any element than simply 
          there can be no subset and thus we return 0.
  
          We won't be using any separate pointer as will simply be using n i,e the length of array as pointer only.
   
          Now there are two cases for every element. 
          1. We include it
          2. We don't include it.
  
          If we include the element then we reduce the n by 1 stating we move to next element and also reduce the sum by sum - arr[n-1], 
          subsetSum(arr, n - 1, sum - arr[n - 1]);
  
          If we exclude the element then we reduce the n by 1 stating we move to next element and now don't reduce 
          the sum i,e subsetSum(arr, n - 1, sum);
  
          We return the sum of both these cases.
  

    **Algo1:**0(2^n),0(n)

          If sum becomes 0 it resembles that yes we found a valid subset of the given sum and thus
          we return 1 , stating we found one subset.
          if (sum === 0) return 1;

          If n===0 this means that no elements are left and thus if we don't have any element than simply 
          there can be no subset and thus we return 0.  
          if (n === 0) return 0;

          If we exclude the element then we reduce the n by 1 stating we move to next element and now don't reduce 
          the sum i,e subsetSum(arr, n - 1, sum);
          let excludeLast = subsetSum(arr, n - 1, sum);

          If we include the element then we reduce the n by 1 stating we move to next element and also reduce the sum by sum - arr[n-1], 
          subsetSum(arr, n - 1, sum - arr[n - 1]);
          let includeLast = 0;
          if (arr[n - 1] <= sum) {
          includeLast = subsetSum(arr, n - 1, sum - arr[n - 1]);
          }

          return includeLast + excludeLast;


    **Intuition2**
          Now there are two parameters which are changing in the above recursion i,e the sum and n. So we need to 
          formulate a 2-d dp array of size (n+1)*(sum+1).
          Lets understand the base case:
          if sum === 0, then no matter the value of n we return 1, as if sum becomes 0 it resembles that yes we 
          found a valid subset of the given sum and thus we return 1 , stating we found one subset.
          so dp[i][0] = 1
  
          if n===0 then matter what the value of sum is the entry should be 0, as if n===0 this means that 
          no elements are left and thus if we don't have any element than simply there can be no subset and thus we return 0.
          dp[0][j] = 0
  
          so for ex: arr = [1,2,3] , sum = 4
          dp array will look like:
          dp = [1,0,0,0,0
                1
                1
                1
               ]
  
          Now we start from i=1 and j=1 and will try and compute number of subsets with sum j for every ith size array.
  
          So there were two cases:
          1. We include it
          2. We don't include it.
  
          if we don't include the ith element than, then 
          dp[i][j] = dp[i-1][j]
  
          if we include the ith element
          dp[i][j] = dp[i-1][j-dp[i-1]]
  
          Overall dp[i][j] will be the sum of included and excluded case


    **Algo2:**

          Formulate a dp array of size (n+1)*(sum+1)
          let dp =  [];
          dp[0][j] = 0

          if sum === 0, then no matter the value of n we return 1, as if sum becomes 0 it resembles that yes we 
          found a valid subset of the given sum and thus we return 1 , stating we found one subset.
          so dp[i][0] = 1
          for (let i = 0; i <= n; i++) {
          dp[i] = []
          dp[i][0] = 1;
          }

          if n===0 then matter what the value of sum is the entry should be 0, as if n===0 this means that 
          no elements are left and thus if we don't have any element than simply there can be no subset and thus we return 0.
          for (let j = 1; j <= sum; j++) {
          dp[0][j] = 0;
          }
          for (let i = 1; i <= n; i++) {
          for (let j = 1; j <= sum; j++) {
          if (j < arr[i - 1]) {
                exclude directly in case the jth sum is smaller than arr[i-1] element
                dp[i][j] = dp[i - 1][j];
          } else {
                So there were two cases:
                1. We include it
                2. We don't include it.
  
                if we don't include the ith element than, then 
                dp[i][j] = dp[i-1][j]
  
                if we include the ith element
                dp[i][j] = dp[i-1][j-dp[i-1]]
  
                dp[i][j] = dp[i - 1][j] + dp[i - 1][j - arr[i - 1]];
            }
          }
          }
          return dp[n][sum];



**10. Palindrome Partitioning:**
   
    **Problem:**
          Given a string, the task is to find he min number of cuts needed in order to make all the string portions palindrome.
          For ex: str = "geek"
          o/p: 2.
          
          If we make a cut after g and one after last e , the string will be "g","ee","k" and thus all becomes palindrome.
          For ex: str = "abbac"
          o/p: 1
          
          If we make one cut after last a so we get strings as, "abba","c" which are all palindromes.

          For ex: str ="abcde"
          o/p: 4.
          We have to make cuts after each character apart from last character so all the strings will be 
          "a","b","c","d","e" which all are palindrome.
  
          For ex: str = "aaaa"
          o/p: 0 as the str itself is a palindrome and thus we need not to make any cut.
  
          For ex: str = "abbabbc"
          o/p: 2


    **Intuition:**
          Lets understand the base cases:
          We start with two pointers one at starting index of the string i,e i and one at ending index of the string i,e j.
          If this entire substring is already a palindrome, no cuts are needed, so the function returns 0 immediately.
  
          We maintain a res as infinity to calculate the min number of cuts.
  
          We split the string for every substring using a k pointer which loops from i to j
          We split the string into two substrings i,e from i->k and k+1 to j.
  
          we take min of Math.min(res, 1 + palindromePartitioning(str, i, k) + palindromePartitioning(str, k + 1, j));
          1 is added as we made a cut.

    
    **Algo1**
          if (isPalindrome(str, i, j)) {
          return 0;
          }

          res = Number.MAX_SAFE_INTEGER;
          for (let k = i; k < j; k++) {
          res = Math.min(res, 1 + palindromePartitioning(str, i, k) + palindromePartitioning(str, k + 1, j));
          }
          return res;
    