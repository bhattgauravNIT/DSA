/**This are some problems associated with array which are contignious memory locations following some pattern for memory allocation.
 * 
 * Lets talk about the problems with array:
 * 1. Lets suppose we need to insert an element at the beginning of the array, when the array
 * already have some elements then We need to shift all the elements to the right by one position. 
 * This will take O(n) time.
 * 
 * 2. If we need to insert an element at some random position which is already occupied then all the elements to the right of the index
 * should be moved 1 step to right which again is costly.
 * 
 * 3. If we need to delete an element from the array then all the elements to the right of the index should be moved 1 step 
 *  to left which again is costly.
 * 
 * 4. Arrays are successful in case of searching an element as it takes O(1) time to access an element at a given index, bit however in case
 * of fregmented memory allocation scenario we cant store a array of very large length as our memory itself is distributed and thus
 * linked list are better in such scenarios.
 * 
 * In case of insertion at beginning and end of the list, linked list are better than arrays and even at some random index as we only
 * need to update the node to next pointer or cut the node to next pointer and whatever in such scenarios.
 * 
 * However in case of searching an element in a linked list, we need to traverse the list from the beginning to the end to find the element,
 * and even to access element of a given index we need to traverse the list from the beginning to the end which is costly.
 * 
 * So both linked list and array has its own merits & demerits and we need to choose the data structure based on the requirement.
 * Moreover in case of linked list we dont need preallocation of memory and we can insert more & more nodes based on will.
 * 
 * So linked list unlike array does not provide random access however it has some very good application.
 * 
 * Ex: 1. In case of round robin scheduling algo where a process is given some k time to execute , now if the time needed by the process is more than k than
 * its being send to the end . If such algo's are using array then it will be costly to shift the process to end of the array as every other element has to be shifted
 * one left. Ex: [10,5,2,9,8] k=5
 * 
 *     1st step: [5,2,9,8,5] as first process needed 10 and we have given it 5 now its shifted to end.
 *     2nd step: [2,9,8,5] now the index 0 is executed and its completed as k=5 time can be allocated to it thus we remove it from array.
 *     Now as we remove it all elemnets needed be shifted to left by 1.
 * 
 * So such scenarios are better handled by linked list as we only need to update the next pointer of the node.
 * 
 * Moreover it provides simpler implementation of queue / circular queue.
 * 
 * Note point here is: the garbage collection is done by browser itself for varibales, nodes which are no longer required.
 * 
 * Ex: If we delete a connection to the node then this node will be in memory however it will be taken care by garbage collector.
 * 
 */
