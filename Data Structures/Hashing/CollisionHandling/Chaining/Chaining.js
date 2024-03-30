/** 
 * The problem statment is lets suppose we have keys coming in to get inserted like,
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
 * Lets' make all the enteries of the hashTable initially null.
 * 
 * Now lets consider the keys which needs to be inserted in the hashTable, if the hashIndex that we calculated via
 * key % hashTableSize is already not occupied or hash[value % hashTableSize] === null then simply we insert a node at the position
 * and this node for sure will be the head of the linkList.
 * there fore we have modified our add function of linkedList to just add a node and mark it as head.
 * 
 * If in case this index is already occupied or hash[key % hashTableSize] !== null clearly its a case of collision.
 * And now we need to get the head node present at that hashingIndex which is simply the hashing index value.
 * let current = hash[value % hashTableSize];
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
    /**consider only positive numbers for now
     * This case of negatives are handled in starProbelm of designing a map.
    */
    hash = [];
    hashTableSize = 7;
    /**User dont specify the hashTableSize as its chaining and we consider some value prime. */
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
     * find the hashing index of the key which needs to be inserted in the hashTable, if the hashIndex that we calculated via
     * key % hashTableSize is already not occupied or hash[key % hashTableSize] === null then simply we insert a node at the position
     * and this node for sure will be the head of the linkList.
     * there fore we have modified our add function of linkedList to just add a node and mark it as head.
     * 
     * else we formulate a linked list where hash[hashIndex] is already the head and thus we simply insert a node at the end of the linked list.
     */
    insert(value) {
        let hashIndex = this.hashing(value);
        if (this.hash[hashIndex] === null) {
            let ll = new LinkedList();
            this.hash[hashIndex] = ll.add(value);
        } else {
            let current = this.hash[hashIndex];
            while (current.next) {
                current = current.next;
            }
            current.next = new Node(value);
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
        let current = this.hash[hashIndex];
        while (current.next !== null) {
            if (current.data === data) {
                return true;
            }
            current = current.next;
        }
        if (current.data === data) return true;
        return false;
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
    * thus we say head = current.next, ie we update the head. head is imply this.hash[hashIndex].
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
        let current = this.hash[hashIndex];
        let prev = null;
        while (current !== null) {
            if (current.data === data) {
                if (prev === null) {
                    this.hash[hashIndex] = current.next;
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

// keys = {50, 21, 58, 17, 15, 49, 56, 22, 23, 25};
let ch = new Chaining();
ch.insert(50);
ch.insert(21);
ch.insert(58);
ch.insert(17);
ch.insert(15);
ch.insert(49);
ch.insert(56);
ch.insert(22);
ch.insert(23);
ch.insert(25);
console.log(ch.hash);
console.log(ch.search(50));
console.log(ch.search(99));
console.log(ch.search(49));
ch.remove(21);
console.log(ch.hash);
ch.remove(56);
console.log(ch.hash);