**Max-min concepts:**


**Problems**

**1. Index of Largest Element: 0(n),0(1)**

  **Intuition:** This problem is same as finding the largest element in an array, without modifying the array and keeping the array
                 in place.

  **Algo:**
        Maintain a Number.MIN_SAFE_INTEGER as max variable and a res to get the index. 
        Iterate over the array
        Keep checking every value of the array if the array value is greater than the max value update max and mark 
        the res as the index.
        Returned the marked index.



**2. Index of second largest element: 0(n),0(1)**

   **Intuition:** Keep in mind of cases like arr = [10,10,10] O/p is -1 as there is no second largest element present in te array so o/p index is -1.

   **Algo:**
        Maintain a Number.MIN_SAFE_INTEGER as max1 variable and a res to get the index of second largest element.
        Iterate over the array
        Keep checking every value of the array if the array value is greater than the max value update max1.

        Now max1 contains the first max value present in the array.
        Again maintain a max2 and initialize it as Number.MIN_SAFE_INTEGER.

        Again iterate over the array and if the max2 is greater than the array value and is not equal to the max1
        update the max2 as array value and update res as the index value.

        Res will be containing the index of the second largest element in the array.



**3. Max difference between two elements such that j>i: 0(n),0(1)**

   **Intuition:** Brute force is simple but will take 0(n^2). But we need to do better so we need to find max of arr[j]-arr[i] such that j>i, Now if we need 
                  arr[j]-arr[i] to be max then arr[i] should be the smallest.
                  Ex: [7, 1, 5, 3, 6, 4]

   **Algo:**
        Maintain a res variable initially as Number.MIN_SAFE_INTEGER to store the max diff value.
        Maintain a min as initially arr[0] and we will try and minimize this and consider this as ith iteration.
        Start from j=1 as we need arr[j]-arr[i]

        Start a loop from, j=1 till end of array.
        Initially obtain the max Difference via checking arr[j]-min > res if yes update res as arr[j]-min
        Now max of arr[j]-arr[i] will be obtained such that arr[i] is min
        As since min variable we are considering as iteration to get arr[i] min value
        so if arr[j]< min
        update min as arr[j]

        After the array is traversed completely return res which is the answer.


**4. Second largest element in an array: 0(n),0(1)**

    **Intuition:** Keep in mind of cases like arr = [10,10,10] O/p is -1 as there is no second largest element present in te array so o/p index is -1, sorting the array in descending order and direct trying to find second largest element thus fails in such cases.


    **Algo:**
        Maintain a Number.MIN_SAFE_INTEGER as max1 variable
        Iterate over the array
        Keep checking every value of the array if the array value is greater than the max value update max1.

        Now max1 contains the first max value present in the array.
        Again maintain a max2 and initialize it as Number.MIN_SAFE_INTEGER.

        Again iterate over the array and if the max2 is greater than the array value and is not equal to the max1
        update the max2 as array value.

        Max2 will be containing the second largest element in the array.
