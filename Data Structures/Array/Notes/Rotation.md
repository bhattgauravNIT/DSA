**Rotation**



**Problems**

**1.Left rotate by one:**

    **Problem:** Given an array the task is to left rotate this by one.
                 Left rotation means moving it counter clockwise.
                Ex: arr = [1,2,3,4,5]
                    after left rotation the array becomes: [2,3,4,5,1]


    **Approach1:0(n),0(1):** The idea is to use swapping and move the first index element towards end.

    **Intuition:** Mark two pointers one at i=0 and one at j=1. Keep swapping i and j till j lies in length of the array.


    **Algo:**
        Maintain i=0 and j=1;
        while(j<arr.length){
            swap(arr[i],arr[j]);
            i++;
            j++;
        }
        return arr;



    **Approach2:0(n),0(1):** The idea is to use swapping and move the first index element towards end but we do in a different way.

    **Intuition:** Mark arr[i-1] as arr[i], while storing initial arr[0] to a temp and then replace the last element of array with temp.


    **Algo:**
        Maintain temp = arr[0];
        Traverse through the array starting from i=1;
        make arr[i-1] = arr[i];

        Mark arr[arr.length-1]=temp;
        return arr;



**2.Left rotate by k:**

    **Problem:** Given an array the task is to left rotate the array by k where k is input.
                 Left rotation means moving it counter clockwise.
                Ex: arr = [1,2,3,4,5], k=2
                    after left rotation the array by 3 it becomes: [3,4,5,1,2]


    **Approach1:0(n*k),0(1):** The idea is to left rotation by 1 for k number of times.

    **Intuition:** Call a function which left rotate a array by one, in total k number of times. Note that if k > length of array then
                  this is equivalent to rotation of k % (length of array).


    **Algo:**

       function leftRotateByK(arr,k)
       {
        check if k > length of array 
        if yes mark k = k % length of array
        maintain i=1;
        while(i<=k)
        {
            arr = call function leftRotateBy1(arr);
        }
        return arr;
       }


        function leftRotateBy1(arr)
        {
        Maintain i=0 and j=1;
        while(j < arr.length){
            swap(arr[i],arr[j]);
            i++;
            j++;
        }
        return arr;
        }



    **Approach2:0(n),0(k):**

    **Intuition:** The idea is based upon the pattern observed.
                 arr = [1,2,3,4,5], k=2
                 o/p:  [3,4,5,1,2]
                 all the elements which will have i-k as negative are the ones which needs movement and should be rotated
                 all elements which will have i-k >=0 are the ones which will be placed at i-k th index.

                 for 1: i=0,k=2 so i-k<0 thus store in some temp arr.
                 for 2: i=1,k=2 so i-k<0 thus tore in some temp arr.
                 for 3: i=2,k=2 so i-k>=0, thus it has to be shifted to i-kth index in arr.

                 Check for all, in last start from position arr.length-k as arr.length-k elements have now been shifted to their
                 correct position i,e 
                 arr = [3,4,5,4,5]
                 temp = [1,2]

                 and start placing temp elements in arr.

    **Algo:**
       
        check if k > length of array 
        if yes mark k = k % length of array
        Maintain temp = [];
        Traverse through the array starting from i=0;
        check if(i-k < 0) push arr[i] to temp
        else
        {
            i-k is greater than or equal to 0 thus now shift the ith element to its correct index which is i-k
            arr[i-k] = arr[i];
        }

        let index = arr.length-k;
        let x = 0;
        Start traversal from the computed index in arr and place all elements of the temp array in arr. 
        for(let i=index;i<arr.length;i++){
            temp[x] = arr[index];
            x++;
            index++;
        }



    
    **Approach3:0(n),0(1):**

    **Intuition:** The idea is based upon reversal
                 arr = [1,2,3,4,5], k=3
                 o/p:  [4,5,1,2,3]
                 
                 First rotate from 0->k-1 ~= [3,2,1,4,5]
                 Second rotate from k->length of arr ~= [3,2,1,5,4]
                 Now rotate the entire array ~= [4,5,1,2,3]


    **Algo:**
       
        check if k > length of array 
        if yes mark k = k % length of array
        arr = call function rotate(arr,0,k-1);
        arr = call function rotate(arr,k,arr.length-1);
        arr = call function rotate(arr,0,arr.length-1);


        function reverse(arr, start,end)
        {
            Use two pointers to reverse an array 
            maintain i=0 and j = arr.length-1;
            while(i<j)
            {
                maintain temp = arr[start];
                arr[start] = arr[end];
                arr[end] = temp;
                i++;
                j--;
            }
            return arr;
        }




**3.Right rotate by one:**

    **Problem:** Given an array the task is to right rotate this by one.
                Right rotation means moving it clockwise.
                Ex: arr = [1,2,3,4,5]
                    after right rotation the array becomes: [5,1,2,3,4]


    **Approach:0(n),0(1):** The idea is to put the last element of the array to the first place and then to
                pop this last element.


    **Algo:**
        arr.unshift(arr[arr.length-1]) we are simply putting the last element of the array in first place.
        arr.pop(), now we are removing the last element from the array.
        return arr;





**4. Right rotate by k:**

    **Problem:** Given an array the task is to right rotate this by k.
                Right rotation means moving it clockwise.
                Ex: arr = [1,2,3,4,5]
                    after right rotation the array becomes: [5,1,2,3,4]
                    again after right rotation the array becomes [5,4,1,2]


    **Approach:0(n*k),0(1):** The idea is to put the last element of the array to the first place and then to
                pop this last element which will mark it as right rotated 1 time, repeat this process k times.
                Note that if k > length of array then this is equivalent to rotation of k % (length of array).


    **Algo:**
        maintain cnt = 1;
        while(cnt<=k){
        arr.unshift(arr[arr.length-1]) we are simply putting the last element of the array in first place.
        arr.pop(), now we are removing the last element from the array.
        return arr;
        }
        
