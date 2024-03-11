/**A singly circular linked list is formed by two things
 * 1. Linked list
 * 2. The next of the last node is not null, however its the head node therefore making it circular.
 * 
 * Ex: 
 * 
 * Head-> [data1, node1]----> [data2, node2] -----> [data3, head]
 *            ^                                           |
 *            |                                           |
 *            -------------------------------------------      
 * 
 * This kind of arrangement forms  a singly circular linked list. 
 * 
 * The main advantage of a singly circular linked list is that if in case we have reference to any node then we can traverse
 * the entire list as the last node is referencing back to head node.
 * 
 * Now in case of linked list the insertion/deletion at head was 0(1) and at end was 0(n),0(n).
 * But however if we maintain a tail pointer also then insertion/Deletion at end also becomes 0(1),0(1).However its difficult
 * to maintain tail pointer in linked list in oderv to achieve 0(1),0(1) in insertion/deletion in end in linked list.
 * 
 * In contrary in case of doublyLinkedList if we only have one tailPointer than both the insertion/deletion in case of singly
 * circular linked list becomes 0(1),0(1) beacuse the end of SCLL is having reference of head and thus reaching head from tail is
 * a constant time operation.             
 */     