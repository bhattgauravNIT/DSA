/**The major difference between a linked list and an array is that an array is a contagious memory allocation data structure, 
 * however its not the case with a linked list. 
 * 
 * A linked list is comprised of nodes where every node can have a data and address/pointer to the next node .
 * 
 *        node1                             node2                      node3                            node 4
 *    |data|address|    --------->     |data|address|   ---------> |data|address|  ---------------> |data|address| 
 * 
 *   <-----------------------------------  Linked list ---------------------------------------------------------->
 * 
 * Now in javascript the address is nothing but the entire second node itself. Meaning if i say for a node n1. n1.next then it will be containing the object or the node
 * which n1 is pointing to.
 * 
 * Ex: n1= {data: 10}, n2 = {data: 20}.
 * 
 * Now if its a linked list then it will look something like . 
 * 
 * n1.next = n2.
 * n2.next = null;
 * 
 * i,e  
 *  
 * n1={data: 10, next: {data:20,next:null}}; We can visualize it in same way as we visualize a normal linked list have data and next pointing to the next node.
 */


/**
 * Node class:
 * 
 * A node will be having
 * 1. data 
 * 2. address to the next node(the next node itself).
 * 
 * Next is initially by default null resembling by the end of linked list as if next of a node is null , it means its not pointing to any next node.
 * 
 * here (this) keyword is resembling for the objects which will be the objects of Node class.
 * 
 */
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

/**A linked list class:
 * 
 * 1.This class will be having a head which resembles the very first node of the linked list and it also serves as the starting point from where we start
 * traversal of the linked list.
 * 
 * 2.Size property is used to determine the size of the linked list.
 * 
 * here (this) keyword is resembling for the objects which will be the objects of LinkedList class.
 * 
*/
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    /* Add element to linked list in last by default.
    
    Create a node object with the data which needs to be inserted into the linked list.
    If the link list is of size zero, it means that this node has to be the first node or head node of this link list thus this.head = node.
    If the link list if not of zero size then we iterate till the end of the link list and then insert the node at the end.

    By insertion the node at the end , it means that the current existing last node address/next should be updated as this node.
    current.next = node

    Why? current existing last node next should be updated as this new node. Because in js we see linked list as 
    n1={data: 10, next: {data:20,next:null}};
    So let's say current we are at data:20 so its next should be node .

    We can also see it as Head-> [10,Node1] -> [20,Node2] -> [30,Null]

    So if we are at current 30, so current.next = Node3 and by default Node3 next is null so the link list gets modified as
    Head-> [10,Node1] -> [20,Node2] -> [30,Node3] -> [40,Null]

    And this new node will by default has next as null resembling it as the new end of the link list.
    */
    add(data) {
        let node = new Node(data);
        if (this.size === 0) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    /** Insert data at an index in linked list
     * 
     * Here we are trying to insert a node at an index provided by user.
     * If the index < 0 or index> linkedList size then its not a valid index. Ex: linked list size is 3 it means its having index from 0,1,2, now if we try
     * and insert a node at index 4 which is greater than the size of link list then obviously its not a valid index.
     * 
     * We create a new node with the data provided by user.Now
     * If the index is 0, it means that we have to insert at the head. 
     * Thus the node.next should point to previous head (node.next = this.head) 
     * and this new node should be the new head.  (this.head=node);
     * 
     * If we are not inserting at index 0, this means that we need to keep track of the previous and the current node
     * 
     * Say ex: [10,Node1] -> [20,Node2] -> [30,Node3] -> [40,Null]
     * 
     * We need to insert at index 2 a new node of data 50.
     * 
     * So wile iterating we have a previous node [20,Node2] and current node as [30,Node3].
     * 
     * Now a new node has to be inserted between them and thus node should point to previous's next which is current only and then previous next should point to node.
     * 
     * node.next = previous.next; or node.next = current;
     * previous.next = node;
     */
    insertAt(data, index) {
        if (index < 0 || index > this.size) {
            console.log('Provide a valid index');
        } else {
            let node = new Node(data);
            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let current = this.head;
                let prev = null;
                let i = 0;
                while (i !== index) {
                    prev = current;
                    current = current.next;
                    i++;
                }
                node.next = current;
                prev.next = node;
            }
        }
        this.size++;
    }

    /**print linked list
     * 
     * Print all the data of the list.
     * Mark current as this.head and keep printing till current!== null
     * 
     * If list is empty current will be null and thus it wont print anything.
     * 
    */
    printList() {
        let current = this.head;
        while (current !== null) {
            console.log(current.data);
            current = current.next;
        }
    }

    /**remove element from an index in the list
     * 
     * Provided an index by the user, remove that node from that index. the indexing starts from 0 only.
     * If the index is less than 0 or index is equal to the size of list then its an invalid index. for ex: size of list is 1 and index is 1.Its invalid because
     * the elements are only at index 0.
     * 
     * Now Lets maintain a previous and current till we reach to the index from where we need to delete the node.once reached delete the node.
     * 
     * For ex: [10,Node1] -> [20,Node2] -> [30,Node3] -> [40,Null]
     * 
     * Lets say we need to delete the node at index 1.
     * 
     * So our previous is [10,Node1] and current is [20,Node2].
     * 
     * Since we need to delete current thus, previous.next = current.next and current.next = null;
     * Thus we break the link of the current node and formulated that link of the current.next with the previous node.
    */
    removeFrom(index) {
        if (index < 0 || index >= this.size) {
            console.log('Invalid index');
        } else {
            if (index === 0) {
                this.head = this.head.next;
            } else {
                let i = 0;
                let prev = null
                let current = this.head;
                while (i !== index) {
                    i++;
                    prev = current;
                    current = current.next;
                }
                prev.next = current.next;
                current.next = null;
            }
            this.size--;
        }
    }

    /**remove first occurrence of element from list
     * 
     * Here we are removing the node based on the data being provided by the user.
     * 
     * If the size of list is 0, it means its already empty.
     * 
     * Maintain a current and previous pointer, current pointing to the node whose data is equal to the data required to be removed and previous pointing
     * to just previous node of it.
     * 'Simply remove the link between previous and current node via
     * previous.next = current.next;
     * current.next = null;
    */
    remove(data) {
        if (this.size === 0) {
            console.log('List already empty')
        } else {
            if (this.head.data === data) {
                this.head = this.head.next;
            } else {
                let current = this.head;
                let prev = null;
                while (current.data !== data) {
                    prev = current;
                    current = current.next;
                }
                prev.next = current.next;
                current.next = null;
            }
            this.size--;
        }
    }

    /**find the index of element
     * 
     * If the list is empty return -1.
     * Iterate over the list and maintain an index variable as soon as current.data===data to be found.
     * return i
     * Else keep checking ahead.
    */
    indexOf(data) {
        if (this.head === null) return -1;
        let current = this.head;
        let index = 0;
        while (current.next) {
            if (current.data === data) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }

    /**check if list is empty*/
    isEmpty() {
        return this.size === 0;
    }

    /**returns size of linked list*/
    size_of_list() {
        return this.size;
    }
}

let ll = new LinkedList();
ll.add(1);
ll.add(2);
ll.add(3);
ll.add(4);
ll.add(5);
ll.insertAt(6, 5)
ll.removeFrom(5);
ll.remove(5);
ll.printList();
console.log(`index of 1 is ${ll.indexOf(1)}`);
console.log(ll.isEmpty());
console.log(ll.size_of_list());

