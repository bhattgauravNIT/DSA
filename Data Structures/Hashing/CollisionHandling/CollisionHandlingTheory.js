/**In ideal sceanrios collision happens as universe is very big and the hashTables we create are smaller subsets of universe
 * so there are possibilities of collision.
 * 
 * Howeever if we know about keys well in adavance there might be a possibility that collision does not happen
 * 
 * for example: Lets have a string= 'abcd' given string str contains only lower case english alphabets amd are distinct
 * so if we use direct address table with (ascii code of charatcter - 97 ) as the key here then the direct access table being formed
 * will never have collisions.
 * 
 * This is an example of ideal hashing.
 * 
 * However when sceanrios arise where collision is bound to happen than in those cases there are two process of collision handling
 * 
 * 1. Chaining
 * 2. Open addressing
 *                  -> Linear probing
 *                  -> Quadratic probing
 *                  -> double hasing
 * 
 * 
 * Chaining is generally done when the size of the data that we need to store is unknow to us and therefore we have to pick 
 * a suitable size of the hash table close to a prime number.
 * 
 * Howeever openAddressing is done when the hashTable size that we are taking is greater than the number of data that
 * we need to insert in the hashTable.
 * 
 * We will discuss about them in detail.
 */