/**Given an array arr consisting if elements such that all elements appears exactly once apart from
 * one element which can repeat any number of time.
 * 
 * Moreover 0 is always present in the array and the elements in the array will always be between 0 to max element
 * 
 * Ex: arr = [0,2,1,3,2,2]
 * 
 * Clearly the max element is 3 so elements in the array will be 0 1 2 3 only.
 * 
 * The max element in the array will always be 0<= max(arr)<= n-3
 * 
 * Given such constraints find that repeating element.
 * 
 * O/p is 2.
 */


/**Approach 1: 0(nlog(n)),0(1)
 * 
 * Ex: arr = [1,2,3,0,3,4,5].
 * 
 * Now one element is repeating any number of time and rest are repeating only once.
 * Moreover all elements must be in range 0 to Max of arr.
 * So we sort the array and check if next array element is same as previous array element.
 */
function repeatingElement(arr) {
    arr = arr.sort((a, b) => a - b);
    let i = 0;
    while (i < arr.length - 1) {
        if (arr[i] === arr[i + 1]) {
            return arr[i];
        }
        i++;
    }
}

/**Appraoch 2: 0(n),0(n)
 * Use hasing to store elements and if we found that element repeating thats the answer.
 */
function repeatingElement(arr) {
    let mp = new Map();
    let i = 0;
    while (i < arr.length) {
        if (mp.has(arr[i])) {
            return arr[i];
        } else {
            mp.set(arr[i], 1);
        }
        i++;
    }
}

/**0(n),0(1) 
 * 
 * The concept of fast and slow pointers.
 * 
 * Lets consider the example arr = [1,3,2,4,6,5,7,3];
 * Clearly 3 is the element getting repeated where as all the other elements are appearing only once.
 * Since we are sure that elements will only be in range from some 0 to n.
 * 
 * Lets consider that all elements will be from 1 till some max value.(later we will modify for 0 as well.)
 * 
 * Ex:  arr = [1,3,2,4,6,5,7,3]
 * Now if we write it in index wise form.
 * 
 * 0 1 2 3 4 5 6 7
 * 1 3 2 4 6 5 7 3
 * 
 * Lets try and form a linked list for a slow pointer and a fast pointer.
 * Slow pointer moves only one step at a time where as fast pointer moves two steps at a time.
 * 
 * 1->3->4->6->7->3  (Slow pointer will move to these places based on slow = arr[slow] where initially slow is arr[0]).
 * 
 * Similary a fast pointer moves two steps at a time .
 * 
 * 1->4->7->..... So on  (fast pointer will move to these places based on fast = arr[arr[fast]] where initually fast is arr[0]).
 * 
 * Now we need to cheeck the point where fast pointer value is equal to the slow pointer value so in the above case
 * 
 * slow path = 1->3->4->6->7->3
 * fast path = 1->4->7->....
 * 
 * Both meets at 7.
 * 
 * Now reinitiate slow from arr[0] and fast from where it meet slow previously i,e 7.
 * Now make both pointers move at same speed.
 * 
 * The point where both pointers meet is the cyclic loop where looping starts and thus is the repeating element.
 * 
 * Now taking into consideration the initial problem where zero can also be present as a value.
 * 
 * We make everything +1 and return answer-1 in last.
 * 
 * This yields original thing.
 * 
*/
//Ex: [1,3,2,4,6,5,7,3]
function repeatingElement(arr) {   // for non zero elements.
    let slow = arr[0], fast = arr[0], start = 0;
    while (slow !== fast || (start === 0)) {
        start++;
        slow = arr[slow];
        fast = arr[arr[fast]];
    }
    slow = arr[0];
    while (slow !== fast) {
        slow = arr[slow];
        fast = arr[fast];
    }
    return slow;

}

/**Ex: [0,2,1,3,2,2] */
function repeatingElement(arr) {   // for  zero elements.
    let slow = arr[0] + 1, fast = arr[0] + 1, start = 0;
    while (slow !== fast || (start === 0)) {
        start++;
        slow = arr[slow] + 1;
        fast = arr[arr[fast] + 1] + 1;
    }
    slow = arr[0] + 1;
    while (slow !== fast) {
        slow = arr[slow] + 1;
        fast = arr[fast] + 1;
    }
    return slow - 1;
}

