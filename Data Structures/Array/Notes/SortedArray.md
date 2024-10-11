**Sorted Array**

**Problems**


**1. Check is array is sorted:**

   **Problem:** For a given array check if its sorted.

   **Intuition:** Simply use two pointers starting from i=0 and j=1 and check if jth element is greater than ith
                  element or not.

    **Algo:0(n),0(1)**

           Maintain two pointer i=0, j=1
           while(j< arr.length){
            if(arr[j] < arr[i] stating if jth element is smaller than ith element return false ){
                return false;
            }
            i++;
            j++;
           }
           return true;




**2. Frequencies in a sorted array:**

   **Problem:** For a given sorted array give the frequencies of all the elements in the array.

   **Intuition:** We need to count the frequencies of all the elements. So we can use hashMap

    **Algo1:0(n),0(n)**

           Maintain a hashMap , mp = new Map<number,number>();
           Iterate over the array and if that element is not present in hashMap then
           Place the element in hashMap and make its count as 1.
           If the element is already present in the hashMap increase the value of count of the element by 1.

           HashMap contains all the elements along with its frequencies.


    **Algo2: 0(n),0(1)** Since the array is already sorted and thus we can direct count the elements without even
            using a hashMap.

            Iterate over the array
            Maintain a cnt=1 and j=i+1 in the loop
            while(arr[j]===arr[i]){
                increment j
                increment cnt
            }
            print cnt corresponding to arr[i]
            make i=j
            making i=j is what takes care of worst case in which entire array has same repeating element in 0(n) still.




**3. Remove duplicates from sorted array:**

    **Problem:** For a given sorted array the task is to remove duplicates such that all distinct elements are being moved to beginning and 
                 it should be done on original array.
             Ex: arr = [1,2,3,3,4,4,5,5,5,6]
                 o/p [1,2,3,4,5,6,_,_,_,_] or [1,2,3,4,5,6,5,5,5,6]

    **Intuition:** Maintain a temp array to store all distinct elements in order of input array.
                   Use this temp array to replace elements in main input array.

    **Algo1:0(n),0(n)**

           Maintain a temp array as temp = [arr[0]]
           Maintain one pointer i=1 for input arr and j=0 for temp arr.
           Iterate over the original array
           If arr[i]!== arr[j]
           push arr[i] to temp array and increment j.

           simply keep increasing i.

           Now the temp array contains all distinct elements.

           Iterate from i=0 in temp array and keep making arr[i] = temp[i]
           Increment i.

           Now in arr all distinct elements are being moved to beginning.



    **Algo2: 0(n),0(1)** Instead of maintaining a temp array, lets consider it as imaginary and apply the same concept.

           Maintain one pointer i=1 for input arr and j=0 for imaginary temp arr.
           Iterate over the original array
           If arr[i] !== arr[j]
           {
           Increment j
           mark arr[j] = arr[i]
           }
           
           simply keep increasing i.

           Now in the original input array all distinct elements are being moved to beginning.

           Now in arr all distinct elements are being moved to beginning.

            
            


           