/** 
 * The problem statment is lets suppose we have keys,
 * Let keys = {50,21,58,17,15,49,56,22,23,25}
 * Now we using a hash function which takes modulo of the keys by the size of the hashTable which we have choosen as 7(randomly).
 * Now our hashFunction inserts at the index of the arr (arr[i]%7)th index.
 * 
 * Now lets see for 
 * 50, 50%7 = 1 so we inert at index 1.
 * 21%7 = 0 so we insert at index 0.
 * 58%7 = 2 so we insert at index 2
 * 17%7 = 3 so we insert at index 3.
 * 15%7= 1, but we see that at index 1 its already occupied with value 50.
 * 
 * Now this is a typical example of collision happening at an index and thus to solve this problem we maintain a array of linked list.
 * 
 * [ linkList1, linkList2,linkList3......].
 * 
 * Now lets have a node class and a linked list class.
 * 
 * Lets' make all the enteries of the array initially null.
 * 
 * Now we iteratite over the keys which needs to be inserted in the hashTable, if the hashIndex that we calculated via
 * arr[i] % hashTableSize is already not occupied or hash[arr[i] % hashTableSize] === null then simply we insert a node at the position
 * and this node fpr sure will be the head of the linkList.
 * there fore we have modified our add function of linkedList to just add a node and mark it as head.
 * 
 * If in case this index is already occupied or hash[arr[i] % hashTableSize] !== null clearly its a case of collision.
 * And now we need to get the head node present at that hashingIndex which is simply the index value of the array.
 * let current = hash[arr[i] % hashTableSize];
 * Now we iterate over the list till its end and insert a new node with the data of this key at the end of the list.
 * 
 * This way we have avoided collision via chaining and its the implementation of hashingInsert.
*/

/**Now lets have a node class and a linked list class.*/
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    add(data) {
        let node = new Node(data);
        this.head = node;
        return this.head;
    }
}

class Chaining {
    hash = [];
    hashTableSize = 7;
    /**consider only positive numbers for now
     * This case of negatives are handled in starProbelm of designing a map.
    */

    arr = [50, 21, 58, 17, 15, 49, 56, 22, 23, 25];

    constructor() {
        for (let i = 0; i < this.hashTableSize; i++) {
            this.hash[i] = null;
        }
    }

    hashing(value) {
        return value % this.hashTableSize;
    }

    /** 0(1+ alpha) where alpha is the length of link list
     * 
     * iteratite over the keys which needs to be inserted in the hashTable, if the hashIndex that we calculated via
     * arr[i] % hashTableSize is already not occupied or hash[arr[i] % hashTableSize] === null then simply we insert a node at the position
     * and this node for sure will be the head of the linkList.
     * there fore we have modified our add function of linkedList to just add a node and mark it as head.
     * 
     * else we formulate a linked list where hash[hashIndex] is already the head and thus we simply insert a node at the end of the linked list.
     */
    insert() {
        for (let i = 0; i < arr.length; i++) {
            let hashIndex = this.hashing(arr[i]);
            if (this.hash[hashIndex] === null) {
                let ll = new LinkedList();
                this.hash[hashIndex] = ll.add(arr[i]);
            } else {
                let current = this.hash[hashIndex];
                while (current.next) {
                    current = current.next;
                }
                current.next = new Node(arr[i]);
            }
        }
    }
    /**
     * 0(1+alpha), where alpha is the length of link list
     * 
     **Now our insert function has created a array of link list which looks something like
     * 
    * [{data: x: next: {data:y, next: null}}, {data: x: next: {data:y, next: null}},{data: x: next: {data:y, next: null}}]
    * Now task is to search any element is present in the array of list or not.
    * 
    * Idea is simple for the hasingIndex index corresponding to the data that needs to be searched there will be a link list inserted 
    * or that hasingIndex can be null or out of bound of the hash table .
    * 
    * In case of out of bound of hash table or hasIndex value being null the data is not present in the hashTable.
    * In rest case we iterate over the list and check if we get the required data.
    * If yes return true else false.
    */
    search(data) {
        let hashIndex = this.hashing(data);
        if (hashIndex < 0 || hashIndex >= this.hashTableSize || this.hash[hashIndex] === null) {
            return false;
        }
        let current = hash[hashIndex];
        while (current.next !== null) {
            if (current.data === data) {
                return true;
            }
            current = current.next;
        }
        if (current.data === data) return true;

    }

    /**
     * 
     * O(1+alpha) where alpha is the length of link list
     * 
     *The function is to remove the first occurence any given data in the list if its present.
     The idea is to first compute the hashing index of the data which is to be removed from the hash, if the hashing index is
     out of bound of hash table size or the the hash[hasingIndex] === null then that element is not present in the hash table.

    * Else we search for this data at the hashing index 
    * 
    * Maintaining two pointers, prev and current.
    * If prev is null and we found that current.data === data this means the head is containing that data 
    * thus we say head[i] = current.next, ie we update the head.
    * 
    * Else if prev is not null and we found the data i,e current.data === data this means simple
    * we need to remove the linkage between current.next and current and make linkage for prev.next thus
    * prev.next =current.next
    * current.next = null;
    */
    remove(data) {
        let hashIndex = this.hashing(data);
        if (hashIndex < 0 || hashIndex >= this.hashTableSize || this.hash[hashIndex] === null) {
            console.log('Data not found');
        }
        let current = hash[hashIndex];
        let prev = null;
        while (current !== null) {
            if (current.data === data) {
                if (prev === null) {
                    hash[i] = current.next;
                } else {
                    prev.next = current.next;
                    current.next = null;
                }
                break;
            }
            prev = current;
            current = current.next;
        }
    }
}
