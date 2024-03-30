/**
 * The hashTable size which we are considering is generally smaller that the size of the data or the number of data elements
 * which we are trying to deal with. 
 * 
 * Generally this data elements which we are dealing with are unknows and thus we consider a hashTable size close to a prime number.
 * In such scenarios collisions are bound to happen.
 * 
 * So chaining is a way of handling collision, In order to understand chaining let's take an example
 * 
 * Let keys = {50,21,58,17,15,49,56,22,23,25}
 * Lets suppose we have a hash table with hash sections of 7, considering a random prime number as suppose we dont know
 * the exact number of keys to be included in hashing.
 * 
 *  Say our hash function looks like : hash(key){return key % 7};
 * 
 * Now let's try and place enteries into our hashTable for the above keys.
 * 
 * Clearly for 50-> 50%7= 1 so place 50 at index 1 and so on.........
 * 
 *      0 -> 21 -> 49 -> 56
 * 
 *      1 -> 50 -> 15 -> 22
 * 
 *      2 -> 58 -> 23
 * 
 *      3 -> 17
 * 
 *      4 -> 25
 * 
 *      5 ->
 * 
 *      6 ->
 *           
 * 
 * Consedering the above hash table we can clearly see that there has been a colision for values 21,49 and 56 at index 0
 * and values 50,15,22 at index 1 and values 58,23 at index 2.
 * 
 * But we handled the collision via chaining.
 * Lets consider an example of linked list, once a node is inserted at index 0 of the hash table i,e node of value 29, now
 * collision happend and a node of value 21 is already present so we Inserted another node of value 49 at the same index 0 of the 
 * hashTable however the previous node's next address being updated to this new node address.
 * 
 * This mechanism is called chaining.
 * 
 * Lets suppose we have n number of keys and we have m length of hash table
 * 
 * So the collison factor/Load factor (alpha) = n/m;
 * 
 * the length of linked list which can be formed is (alpha).
 * 
 * Eventually we can see that lesser the value of hashTable(m) from the number of keys to be inserted greater the number
 * of collision. Ideally if n===m collision factor is 1.
 * 
 * Now lets consider timeComplexity for searching, inserting,deleting
 * 
 * Searching : 0(1+ length of linkedList) ~= 0(1+ alpha);
 * Inserting: 0(1+ length of linked list) ~= 0(1+alpha);
 * Deleting: 0(1+ length of linked list) ~= 0(1+alpha);
 * 
 * Now insted of linked list we could have used dynamic sized array or avl (slef balancing tress);
 * 
 * Using dynamic sized vectors/arrays: 
 * 
 * Searching : 0(length of array);
 * Inserting: 0(length of array);
 * Deleting : 0(length of array);
 * 
 * Although the time complexity looks same in both linked list and array/vectors but still be save some space as
 * a node takes additional spaces to store address of next and previous node.
 * 
 * In case of bst/avl these searching,inserting,deleting complexities would have been log(n);
 * 
 */