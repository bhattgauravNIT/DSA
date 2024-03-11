/**Doubly linked list is somewhat a advanced version of linked list where in linked list we were only storing the data
 * and the pointer/address/node which is next to the current , however in case of doubly linked list we store data, address
 * to next node and address to previous node as well.
 * 
 * This info of next and previous node on the node in doubly linked list provides us advantage over linkedlist.
 * 
 * In linkList we can start traversal from head and can only go in forward direction, however in case of doubly linked
 * list we can go forward as well as backward because we have the address of the previous node as well.
 * 
 * In applications like where we need to go forward and backward multiple times example browsing internet if we want to
 * come back and back and back then doubly linked list are of great use.
 * 
 * Similary in editor we do undo and redo (Ctrl+z),(ctrl+y). This is also a kind of coming back and forth.
 * 
 * In linked list if we wish to delete the headf its 0(1), however lets suppose even if i have a tail reference which points to
 * end of link list then also if i wish to delete that node it will be 0(n) time as I need the previous node to it.
 * 
 * However lets suppose in doubly linked list I have refernce of any nth node in list and i wish to delete it, its simply a
 * 0(1) operation as I have refernce to the previous node as well.In linked list we can achieve this 0(1) opertaion of deletion of any nth node
 * apart from end node of list in 0(1) time via, 
 * 
 * ex: ll = 1->2->3->4
 * 
 * Suppose i somehow have address to 3 and i need to delete it in 0(1).
 * So 3 contains address of next node copy value of next node to 3.
 * 
 * ll = 1->2->4->4
 * 
 * Now make addressOf3.next = null
 * 
 * ll = 1->2->4
   clearly 3 is deleted however it doesnot work when we need to delete the last node and even getting address to a specific node is tough.
 *  
 * Thus dobly linked list has greater advantage as compared to linked list but it consumes more space as compared to linked list.
 * 
 */