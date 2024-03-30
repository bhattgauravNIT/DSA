/**Now previously we saw liner probing such that we were maintaining a hashTableSize eqaul to the number of inputs keys
 * which we need to store and in case of collision we start from hashIndex+1 till hashIndex in a circular linear fashion and place the
 * collided key in the slot which is having the furst null value.
 * 
 * Now this gives rise to clusters and thus impact the performace of search and delete.
 * 
 * Lets suppose we have a key collision happened at index 1 , so we place it at 2. now key key collision happen at index 2 so we place
 * index 3 .
 * Now if any other collision happen at either index 1,2,or 3 next empty/null slot should be taken into conisderation
 * Again say we place at 4.
 * So cluster length increase from 3(i,e 3 indices 1,2and 3 ) to 4 i,e (1,2,3 & 4) index.
 * 
 * So searching in worst case can take 0(n) where n is the size of the hashTable and even deletion can go upto O(n) as in order to
 * delete a slot we need to reach that slot and in order to reach it, it can take 0(n) time.
 * 
 * One solution to solve this problem is quadratic probing.
 * 
 * In quadratic probing instead of searching for the next index which is empty/null we search like
 * 
 * lets say collison happened at index 1, so we search for 1^2 index is it empty.
 * Now again if collison happened at 1 index (1^2 ) we move to 2^2 = 4th index.
 * Again we see 4th index is non null, so we try and place the key at 3^2 = 9th index.
 * 
 * So instead going linear in hashTable after collsion on an index in order to search for an empty slot we go quadratic.
 * 
 * How ever there are still problems with quadratic probing.
 * 
 * Say collision happened at index 1. so we search 2^2=4 th index wether its empty or not. Say it was not empty so we
 * searched 3^2 index i,e 9. Now let's say it aslo was'nt empty.The hashTableSize was 10 only we have exhausted the last index as
 * well but however we found nothing empty but it might be possible that the left over indicies are empty.
 * 
 * Ex: index 3 or 5 or 6 or 7 or 8 which we didn't take into consideration.
 * 
 * So quadratic probing does not always ensures that we found a null/empty indices and all null.empty indices are taken into conisderation
 * in case of collision.
 * 
 * Moreover quadratic probing also gives rise to clustering but in case of linear probing it was more dominant however in
 * case of quadratic probing this clustering is there but its less dominant as compared to linear probing.
 * 
 * We can ensure that quadratic probing will work in case the hashTable size is actually double the size of the input
 * keys need to be stored in hashTable.
 */