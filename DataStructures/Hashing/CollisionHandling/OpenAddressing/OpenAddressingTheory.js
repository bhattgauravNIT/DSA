/**We do chaining when gerenrally we are not aware of the number of inputs that we need to insert into the hash table
 * and therefore we estimate a size of the hash table near to a prime number.Now this estimated size of hashtable
 * can be small as compared to input thus when collision happen we do chaining.
 * 
 * Now in case of open addressing, we must know the input size and thus the size of the hash table is always greater than
 * or equal to the number of inputs and its cache friendly.
 * 
 * HashTableSize >= number of input keys.
 * 
 * Open Addressing can be done in three ways:
 * 
 * 1. Linear probing
 * 2. Quadratic probing
 * 3. Double hashing.
 */