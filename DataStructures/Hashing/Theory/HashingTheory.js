/**So there was a problem with direct address table , the problem was if we are having keys as very large how will it
 * be possible to convert them to a smaller value which will range from say [0-999] if the table size is 1000.
 * 
 * Or lets say we have keys as string ex: Emp id: Emp001 how will be able to convert this key value to a smaller value cuh that
 * it raange from [0-999], if table size is 1000.
 * 
 * All these problems are solved via hashing and we consider a hashing function.
 * 
 * The role of hashingFunction is to be able to convert any kind of laarge key to a smaller value such that it can be used
 * as an index in a table.
 * 
 * 1. A hashing function should be stable as everytime it should proudce the same key for the same input key being fed to it.
 * For exL Lets say we are maintaining emloyee record. Here employee id is the key and employee details is the value.
 * 
 * So we had a hashingFunction and it converted some empId say EMP12345 to some key say 25 as the index to be used in the hash table
 * now next time when we tried to search EMP12345 , in hash table so first it should be converted to a smaller key using hashFunction
 * now the hashFunction should produce the same key as it produced earlier i,e 25. Then only we will be able to search EMP12345.
 * 
 * 2. A hashing function should always convert keys/generate keys which are in range of the size of the table.
 * 
 * 3. A hashing function should be such that it uniformly distributes all the keys within the size of the hash table and 
 * should have min number of collisions as possible.
 * 
 * However in ideal scenario its not possible to create a hash function which does not result in collision as the universe
 * is very big and the hash tables we use are subsets of these universe. So collision happen.
 * 
 * Collision is when two different inputs being fed to a hashFunction gives same converted key.
 * 
 * Lets consider example of hashFunctions.
 * 
 * 1. Say we have phone numbers of size 10 ex: 9354377832 which needs to act as key for around 200 in total phone numbers
 * to be stored which resembles to the details for people.
 * 
 * Firstly we need to store 200 phone number in total so lets create a hasTable of around 300 phone numbers, the selection
 * of the size of the hashTable is also a imp topic. Its generally considered to to have a size of hash table proportional
 * to the number of total records to be stored and somwehere a prime number but not power of integers.
 * 
 * So in the above case a basic hashFunction will look like 
 * 
 * How ever this also not a godd hashFunction and can be lately improved a lot but it resembles a basic hash function.
 * Its non effective because there are possibilities of collision in this hashing function.
 * 
 */

function hashPhoneNumbers(key) {
    let arr = [];
    for (let i = 0; i < 300; i++) {
        arr[i] = 0;
    }
    let index = key % 300;
    return index;
}

/**
 * * Lets consider an example of string as keys ex: key = 'abcd'
 * 
 * the efficient hashFunction to convert these key string into a indexed based integer which can be used in hashTable is
 * via weighted sum.
 * 
 * lets consider any random number say 23
 * ex: key = 'abcd'
 * So index obtained via (23^0+ charCode of ('a') + 23^1+ charCode of ('b) + 23^2+ charCode of ('c)+ .....)%(size of hashTable)
 * 
 * We are using weighted sum beacuse we would have simple used only ascii code of the chars than abcd % 300  hashCode 
 * would have been same as well for bcda % 300 and valid for all the permutations of abcd, thus it wont be a good hash function.
 */
function hashString(key) {
    let arr = [];
    for (let i = 0; i < 300; i++) {
        arr[i] = 0;
    }
    let index = 0, i = 0, x = 23;
    while (i < key.length) {
        index += charCodeAt(key[i]) + Math.pow(x, i);
        i++;
    }
    return index % 300;
}