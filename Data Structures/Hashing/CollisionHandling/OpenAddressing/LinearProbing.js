/**Linear probing
 * 
 * Lets take an example say we have some keys = {50,21,58,17,15,49,56,22,71,25}
 * So in total we have 10 keys and we let the user decide
 * how many keys he wish to insert in the hashTable thus we are using open addressing.
 * Now we maintain a hashTable of size 10 and have a hasing function.
 * Lets say this hashing function do key % hashTableSize ~= key % 10.
 * 
 * Now 
 * 
 * for 50-> 50%10 is 0 so 50 gets 0th index in hash Table
 * for 21-> 21%10 is 1 so 21 gets 1st index in hashTable
 * for 58-> 58%10 is 8 so 58 gets 8th index in hashTable
 * for 17-> 17%10 is 7 so 17 gets 7th index in hashTable
 * for 15-> 15%10 is 5 so 15 gets 5th index in hashTable
 * for 49-> 49%10 is 9 so 49 gets 9th index in hashTable
 * for 56-> 56%10 is 6 so 56 gets 6th position in hashTable
 * for 22-> 22%10 is 2 so 22 gets 2nd position in hashTable
 * for 71-> 71%10 is 1 so 71 had to be inserted at 1st index but 1st index is already occupied and thus there is a collision.
 * 
 * Now if we look at the hashTable so for till 71, we have
 * 
 * [
 *   50,
 *   21,
 *   22,
 *   _,
 *   _,
 *   15,
 *   56,
 *   57,
 *   58,
 *   49,
 *  ]
 * 
 * Now hashIndex calculated for 71 is 1, so we linearly traverse from 1 till 1 in a cicrular form i,e index
 * 1,2,3,4,5,6,7,8,9,1 and try to find out the fisrt empty index. there we place the value 71.
 * So after this traversal we got 3 hence 71 is placed at index 3 and the hashTable looks like 
 * [
 *   50,
 *   21,
 *   22,
 *   71,
 *   _,
 *   15,
 *   56,
 *   17,
 *   58,
 *   49,
 *  ]
 * 
 * Now for the last key i,e 25 the hashIndex is 25%10 -> 5 and again 5 index is already occupied so a collision has occured and thus
 * we will linearly probe from this index in a cicular manner till this hashing index and will place 25 at the first
 * empty index. Thus we got 4.
 * 
 * Now above was the insertion logic, similary we will search for any data that needs to be searched using hashIndex or if not
 * found then linear probing in a circular manner.
 * 
 * Now similar for deletion.
 */

class LinerProbing {
    hashTable = [];
    /**hashSize is initiated to the input keys size as its open addressing.*/
    constructor(size) {
        this.hashSize = size
        for (let i = 0; i < this.hashSize; i++) {
            this.hashTable[i] = null;
        }
    }

    /**Hashing function*/
    hash(value) {
        return value % this.hashSize;
    }

    /**
     * 0(n)
     * 
     * Initially we marked all the values as null in hashTable, while deletion we are makrking deleted value as Max integer
     * thus once a value is deleted or marked as Max Integer a new value can be inserted at that position.
     * 
     * Checks if the value at hashIndex being calculated is null or max int or not.
     * If null/maxInt  simply inserts the key at the hashingIndex .
     * if not null does a traversal in circular fashion starting from hashingIndex+1 till hashingIndex and looks
     * for the first null value/maxInt  index and place the key at that index.
     */
    insert(value) {
        let hashIndex = this.hash(value);
        if (this.hashTable[hashIndex] === null || this.hashTable[hashIndex] === Number.MAX_SAFE_INTEGER) {
            this.hashTable[hashIndex] = value;
        } else {
            let index = hashIndex + 1;
            while (index % this.hashSize !== hashIndex) {
                if (this.hashTable[index % this.hashSize] === null || this.hashTable[hashIndex] === Number.MAX_SAFE_INTEGER) {
                    this.hashTable[index % this.hashSize] = value;
                    break;
                }
                index++;
            }
        }
    }

    /**
     * 0(n)
     * 
    * Checks if the value at hashIndex being calculated is equal to the data to be searched or not.
    * If its the data simply returns true.
    * if not equal to the data then does a traversal in circular fashion starting from hashingIndex+1 till hashingIndex and looks
    * for the data value to be searched.
    * 
    * If during this circular travesral search we find that we encounter a null value we are sure that this data to be found will
    * not be present in the hashTable beacuse the insertion hashing is done in such a way that in case of collsion the element
    * will be placed at the first null value and while seraching if we see a null value that than element must have been there thus return
    * false. 
     */
    search(data) {
        let hashIndex = this.hash(data);
        if (this.hashTable[hashIndex] !== data) {
            let index = hashIndex + 1;
            while (index % this.hashSize !== hashIndex) {
                if (this.hashTable[index % this.hashSize] === data) {
                    return true;
                } else if (this.hashTable[index % this.hashSize] === null) {
                    return false;
                }
                index++;
            }
        } else {
            return true;
        }
        return false;
    }

    /**
     * 0(n)
     * 
    * Checks if the value at hashIndex being calculated is equal to the data to be deleted or not.
    * If its the data simply make the value at hashingIndex as Max Integer Value.
    * 
    * We have not made it null and made it max integer beacuse in our serach we are checking if slot is null then stop the search
    * and if on deletion we make slot null then it might be possible that the element is originally present after a slot which is now
    * being made null , thus we mark it as Max integer.
    * 
    * Now if hashingIndex is not equal to the data then does a traversal in circular fashion starting from hashingIndex+1 
    * till hashingIndex and looks or the data value to be deleted.
    * 
    * Once that index is found it makes that index value as Max integer. 
    * 
    * If during this circular travesral search we find that we encounter a null value we are sure that this data to be found will
    * not be present in the hashTable beacuse the insertion hashing is done in such a way that in case of collsion the element
    * will be placed at the first null value and while seraching index where
    * it can be if we see a null value that than element must have been there thus say element is not present.    
    *  
     */
    delete(data) {
        let hashIndex = this.hash(data);
        let cnt = 0;
        if (this.hashTable[hashIndex] !== data) {
            let index = hashIndex + 1;
            while (index % this.hashSize !== hashIndex) {
                if (this.hashTable[index % this.hashSize] === data) {
                    this.hashTable[index % this.hashSize] = Number.MAX_SAFE_INTEGER;
                    cnt++;
                    break
                } else if (this.hashTable[index % this.hashSize] === null) {
                    break;
                }
                index++;
            }
        } else {
            this.hashTable[hashIndex] = Number.MAX_SAFE_INTEGER;
            cnt++;
        }
        if (cnt === 0) console.log('Element not present in hashTable');
    }
}
// keys = {50, 21, 58, 17, 15, 49, 56, 22, 71, 25};
let ll = new LinerProbing(10);
ll.insert(50);
ll.insert(21);
ll.insert(58);
ll.insert(17);
ll.insert(15);
ll.insert(49);
ll.insert(56);
ll.insert(22);
ll.insert(71);
ll.insert(25);
console.log(ll.hashTable);
console.log(ll.search(71));
console.log(ll.search(91));
ll.delete(71);
console.log(ll.hashTable);
ll.delete(71);

