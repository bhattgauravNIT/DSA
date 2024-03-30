/**
 * 
 * The normal doubly link list look like this.
 * 
 * Head -> [null,10,next]->[prev,20,next]->[prev,30,null].
 * 
 * This means that the prev of head is always null and the next of the last node is also null.
 * 
 * However in case of circular doubly linked list it will look like:
 * 
 * Head -> [tail,10,next]->[prev,20,next]->[prev,30,next]->[prev,40,head].
 * 
 * So the prev of the head node will point to the tail of the list and the next of the last node i,e the tail will point to the
 * head of the list.
 */