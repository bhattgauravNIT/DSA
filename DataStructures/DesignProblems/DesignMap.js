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
    arr = [50, 21, 58, 17, 15, 49, 56, 22, 23, 25];

    constructor() { }

    insert() {
        for (let i = 0; i < hashTableSize; i++) {
            hash[i] = null;
        }
        for (let i = 0; i < arr.length; i++) {
            let hashIndex = arr[i] % hashTableSize;
            if (hash[hashIndex] === null) {
                let ll = new LinkedList();
                hash[hashIndex] = ll.add(arr[i]);
            } else {
                let current = hash[hashIndex];
                while (current.next) {
                    current = current.next;
                }
                current.next = new Node(arr[i]);
            }
        }
    }
    /**
     * 
     ***Now our insert function has created a array of link list which looks something like
     * 
    * [{data: x: next: {data:y, next: null}}, {data: x: next: {data:y, next: null}},{data: x: next: {data:y, next: null}}]
    * Now task is to search any element is present in the array of list or not.
    * 
    * Idea is simple for every index of array either there will be a link list inserted or that hasingIndex can be null, for all non null value
    * we iterate over the list and check if we get the required data.
    * If yes return true else false.
    */

    search(data) {
        for (let i = 0; i < hash.length; i++) {
            if (hash[i] !== null) {
                let current = hash[i];
                while (current.next !== null) {
                    if (current.data === data) {
                        return true;
                    }
                    current = current.next;
                }
                if (current.data === data) return true;
            }
        }
        return false;
    }

    /**
     * 
     *The function is to remove the first occurence any given data in the list if its present.
     * 
    * The idea is to itearte over the array, at any index either it will be link list or null, if its non null then
    * we traverese through the list.
    * 
    * Maintaining two pointers, prev and current.
    * If prev is null and we found that current.data === data this means the head is containing that data for that particular index
    * thus we say head[i] = current.next, ie we update the head.
    * 
    * Else if prev is not null and we found the data i,e current.data === data this means simple
    * we need to remove the linkage between current.next and current and make linkage for prev.next thus
    * prev.next =current.next
    * current.next = null;
    */

    remove(data) {
        let cnt = 0;
        for (let i = 0; i < hash.length; i++) {
            if (hash[i] !== null) {
                let current = hash[i];
                let prev = null;
                while (current !== null) {
                    if (current.data === data) {
                        if (prev === null) {
                            hash[i] = current.next;
                        } else {
                            prev.next = current.next;
                            current.next = null;
                            cnt++;
                            break;
                        }
                    }
                    prev = current;
                    current = current.next;
                }
            }
            if (cnt === 1) break;
        }
        if (cnt === 0) console.log('Data not found');
    }
}