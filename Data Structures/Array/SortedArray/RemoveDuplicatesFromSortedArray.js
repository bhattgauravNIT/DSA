/**Given a sorted array, remove duplicates from it such that all distinct elements are being moved to beginning
 * 
 * let arr = [1,2,3,3,4,4,5,5,5,6]
 * 
 * arr = [1,2,3,4,5,6,_,_,_,_]
 * 
 * The original size of array remains same as 10 only however all the singular elements are moved to front of array
 * and rest is being replaced with  _ however it can be replaced with anything.
 * 
 * You need to return the 6 as only 6 elements are there now, however the size of array is 10 only and array should be modified
 * as mentioned above.
 */


/**Approach: 0(n): O(n)
 * 
 * Use a temp additional array, and place only number once in it irrespective of its occurence.
 * for ex: arr = [10,20,20,30,30,30]
   Now consider a temp array with first element as arr[0], i,e 10.
   Now place one pointer i at arr starting index 1, and another pointer at temp starting index 0.
        
             i 
   arr = 10, 20, 20,30,30,30,30
       
          j
   temp = 10

   So at first arr[i] !== temp[j] i,e 20!== 10 thus we should incremnet j and make temp[j] as arr[i].
   if(arr[i] !== temp[j]){
    increment j;
    temp[j] = arr[i];
   }
 */

function removeDuplicatesInPlace(arr) {
    let temp = [arr[0]];
    let i = 1, j = 0;
    while (i < arr.length) {
        if (arr[i] !== temp[j]) {
            j++;
            temp[j] = arr[i];
        }
        i++;
    }
    i = 0;
    while (i < temp.length) {
        arr[i] = temp[i];
        i++;
    }
    console.log(arr);
    return i;
}


/**Approach2 : 0(n),0(1)
 * 
 * Considering the above approach only, if we dont use additional space , 
 * 
 * so imagine we have a j = 0 ,pointing at an empty temp array and i=1, pointing at 1st index of arr.
 * if the temp[j] !== arr[i] what we do, we increment j and place arr[j] with arr[i].
 * 
 * Similary we will do.
 *       
 *       j  i
 * arr = 10,20, 20,30,30,30,30
 * 
 * Now j means imagine a temp array pointer, so temp[j] !== arr[i].
 * increment j beacuse we need to place arr[i] on an empty space in imaginary temp array thus j++.
 * Now temp [j]= arr[i].
 * 
 * Now reality: We dont have temp so if(arr[j] !== arr[i]) then j++ and arr[j] = arr[i].
*/
function removeDuplicatesInPlace1(arr) {
    let i = 1;
    let j = 0;
    while (i < arr.length) {
        if (arr[j] !== arr[i]) {
            j++;
            arr[j] = arr[i];
        }
        i++;
    }
    console.log(arr);
    return j + 1;

}
