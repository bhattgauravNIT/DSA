/**So previously we talked about the problem with linear probing and quadratic probing in open addressing and therefore we need
 * something in which clustering issue does not arise and keys are more uniformly distributed.
 * 
 * Thus the correct solution is double hashing.
 * Lets consider an example 
 * 
 * say we have keys = {49, 63, 56, 52, 54, 48};
 * 
 * Now we know beause its open addressing that the number of keys are 6 as we let the user decide how many keys he wish to insert
 * so lets take the size of hashTable greater than or equal
 * to the number of keys to be inserted and close to a prime number so we consider 7 in case of a 6 size provided by user.
 * 
 * Now at first the hashTable is all null .
 * 
 * Now lets have a hashFunction which compute the hashIndex based on value % sizeOfHashTable.
 * 
 * for 49 -> hash1(49)= 49%7 = 0 now 0th index is empty thus lets place 49 there.
 * for 63 -> hash1(63) = 63&7 = 0 now 0th index is already occupied and its a case of collision.
 * 
 * Now in such cases we need a second hashingFunction or hash2(value).
 * 
 * the whole idea is in case of a collision on any index 
 * for the 1st time for one element search on 
 * 
 * :   (hash1(key)+ j*hash2(key)) % hashTableSize  (we will talk about detail of hash2(key))
 * 
 * Lets take about significance of j here: Considering example of 63
 * 
 * Now at index 0 we have a collision so lets check the index obtained by
 *   (hash1(key)+ j*hash2(key)) % hashTableSize where j=1
 * 
 * Suppose its 3. Now check for 3 in case 3 is also already occupied so we have to seach for 
 *  (hash1(key)+ j*hash2(key)) % hashTableSize where j=2 and so on.....
 * 
 * Thus j referes to the number of times collision has happened for a particular key before placing it in the hashTable.
 * 
 * Now lets talk about hash2(key) so its (hashTableSize-1)*(key % hashTableSize-1)
 * 
 * the significance of hashTableSize-1 is that as collision has already occured so we are sure that one index on which
 * the original hashIndex was computed would have been already filled up and thus lets focus on possible remaining
 * size of hashTable which is hasTableSize-1.
 * 
 * Now for for 63 -> hash1(63) = 63&7 = 0 now 0th index is already occupied and its a case of collision.
 * lets compute (hash1(key)+ j*hash2(key)) % hashTableSize  ~= ((key%7)+ 1*(6-(key%6))%7
 *  ~= ((63%7)+ 1*(6-(63%6)))%7 ~= (0+ 1*3)%7 = 3
 * 
 * thus lets check for index 3, clearly its null , hence 63 will occupy index 3.
 * 
 * for 56-> hash1(key) = 56%7 = 0 again collison as 0th index is already occupied and thus 
 * lets compute  hash1(key)+ j*hash2(key)) % hashTableSize  ~= ((56%7)+ 1*(6-(56%6)))%7
 *  ~= (0+ 4)%7 = 2
 * Now 4nd index is not already occupied and thus lets place 56 at index 4
 *  and so on.....
 * 
 * let suppose a collision happened then we computed index using double hashing and on that index as well collision happened then
 * next time we will compute doubleHahedIndex using j=2 and so on.....
 */


class doubleHashing {
    hash = [];
    constructor(size) {
        this.hashTableSize = size;
        for (let i = 0; i < this.hashTableSize; i++) {
            this.hash[i] = null;
        }
    }
    hashing(value) {
        return value % this.hashTableSize;
    }

    collisionHash(value) {
        let size = this.hashTableSize - 1;
        return size - (value % size);
    }

    collisionHashIndex(iteration, hashIndex, value) {
        return (
            (hashIndex + iteration * this.collisionHash(value)) % this.hashTableSize
        );
    }

    /**
     * Compute first hashIndex if the hash table is empty or Number.MAX_SAFE_INTEGER there simply insert element at that slot.
     * Else there is a collision. Compute doubleHahsed index via 
     * 
     *  (hash1(key)+ j*hash2(key)) % hashTableSize 
     * 
     * where hash1(key) = key%7
     * and hash2(key) = (hashSize-1)-(key%(hashSize-1))
     * 
     * j resembles the number of times collision has happened for a specif element. If at double hashedIndex again collision
     * happenend increase j to 2 and then again compute and so on..... till we find a place where either the slot is empty or
     *  Number.MAX_SAFE_INTEGER.
     * 
     * Note :  Number.MAX_SAFE_INTEGER signifies that this slot value is being deleted and thus is open for insertion.
     * We dont place null value there while deleting beacuse it can hamper the search logic for the element in the hashTable.
     */
    insert(value) {
        let hashIndex = this.hashing(value);
        if (this.hash[hashIndex] === null || this.hash[hashIndex] === Number.MAX_SAFE_INTEGER) {
            this.hash[hashIndex] = value;
        } else {
            let j = 1;
            let index = this.collisionHashIndex(j, hashIndex, value);
            while (this.hash[index] !== null && this.hash[hashIndex] !== Number.MAX_SAFE_INTEGER) {
                j++;
                index = this.collisionHashIndex(j, hashIndex, value);
            }
            this.hash[index] = value;
        }
    }

    /**Simply first try and find the value of the hash1(key) obtained index if its not present then it might be possible
     * that it present at doubleHahed index thus get doubleHashedIndex via 
     * 
     * 
     *  (hash1(key)+ j*hash2(key)) % hashTableSize 
     * 
     * where hash1(key) = key%7
     * and hash2(key) = (hashSize-1)-(key%(hashSize-1))
     * 
     * keep searching in doubleHashed index till you have traversed the entire hash size which can be computed by maintaining
     * a variable indexVisited and or you find dont find a null value or a  Number.MAX_SAFE_INTEGER.
     * 
     * In case you found a null value or a  Number.MAX_SAFE_INTEGER then this element is not present.
     * 
     */
    search(value) {
        let hashIndex = this.hashing(value);
        if (
            hashIndex < 0
            || hashIndex >= this.hash.length
            || this.hash[hashIndex] === null
            || this.hash[hashIndex] === Number.MAX_SAFE_INTEGER) {
            return false;
        }
        if (this.hash[hashIndex] === value) {
            return true;
        } else {
            let totalVisitedIndex = 1;
            let j = 1;
            let index = this.collisionHashIndex(j, hashIndex, value);
            while (
                totalVisitedIndex <= this.hash.length
                && this.hash[index] !== null
                && this.hash[index] !== Number.MAX_SAFE_INTEGER
            ) {
                if (this.hash[index] === value) {
                    return true;
                } else {
                    j++;
                    index = this.collisionHashIndex(j, hashIndex, value);
                    totalVisitedIndex++;
                }
            }
            return false;
        }
    }

    /**Deletion logic is also somewhat similar to the search logic however in case of deletion we mark the element as 
     * Number.MAX_SAFE_INTEGER and there fore we can observe that this slot has been deleted.
     * 
     * the reason behind marking it a Number.MAX_SAFE_INTEGER and not null is beacuse , it can hamper the search logic which
     * is based on the fact that if you find a null while searching for a element its sure that its not present but lets
     * say after insertion of the element which is to be searched some other element before the index of its occurence
     * is being deleted than search will fail saying that element is not present however its not the case because
     * some element has been deleted before the occurence of the searchable element and does not mean that element which is 
     * deleted should have been the ideal index of the element to be searched thus be maintain a bifercation by not marking
     * the deleted element as null.
     */
    delete(value) {
        let hashIndex = this.hashing(value);
        if (
            hashIndex < 0
            || hashIndex >= this.hash.length
            || this.hash[hashIndex] === null
            || this.hash[hashIndex] === Number.MAX_SAFE_INTEGER) {
            console.log('element not present');
        }
        if (this.hash[hashIndex] === value) {
            this.hash[hashIndex] = Number.MAX_SAFE_INTEGER;
        } else {
            let isPresent = false;
            let totalVisitedIndex = 1;
            let j = 1;
            let index = this.collisionHashIndex(j, hashIndex, value);
            while (totalVisitedIndex <= this.hash.length
                && this.hash[index] !== null
                && this.hash[hashIndex] !== Number.MAX_SAFE_INTEGER) {
                if (this.hash[index] === value) {
                    this.hash[index] = Number.MAX_SAFE_INTEGER;
                    isPresent = true;
                    break;
                } else {
                    j++;
                    totalVisitedIndex++;
                    index = this.collisionHashIndex(j, hashIndex, value);
                }
            }
            if (!isPresent) {
                console.log('element not present');
            }
        }
    }
}
// key = {49, 63, 56, 52, 54, 48};
let dh = new doubleHashing(7);
dh.insert(49);
dh.insert(63);
dh.insert(56);
dh.insert(52);
dh.insert(54);
dh.insert(48);
console.log(dh.hash);
console.log(dh.search(91));
console.log(dh.search(56));
dh.delete(49)
console.log(dh.hash);
console.log(dh.search(49));