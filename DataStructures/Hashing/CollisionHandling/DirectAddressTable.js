/**The problem statement is we are given 1000 keys with values ranging from [0-999], how will we be
 * able to perform three opeartion insert, search and delete in 0(1).
 */

/**Approach: 0(1),0(1) 
 * Consider an arr of constant size 100 , indexed from 0 , here the index will act as the key and the value at that index
 * will act as value. The idea is to use index of array as keys and values as value.
 * 
 * If we wish to insert any key,value pair , the insert function simply place that value at that index, if already a value is
 * present at that key it will override it.
 * 
 * If we wish to search a value corresponding to a key, we simply return arr[key].
 * 
 * If we wish to delete a key from the table then simple either we make the value of it as false or say zero.
 * 
 * This technique is called hashing and the table that we are maintaining is called hash table.
 * 
 * The great thing about hasing is that insertion, search and delete opeartions take only 0(1) time.
 * 
 * Now this hashTable specifically is direct address table and the problem with direct address table is that 
 * 
 * 1. we cant store large values of keys,
 * example we need to store phoneNumbers as keys and details as value then direct address tabke wont work.
 * 2. storing string as keys
 * 3. storing floating point numbers as keys.
 * 
 * Direct address tables will work for small values of keys.
*/

let arr = [];
for (let i = 0; i < 1000; i++) {
    arr[i] = 0;
}

function insert(key, value) {
    if (key >= 0 && key <= 999) {
        arr[key] = value;
    } else {
        return 'Index out of bound exception.'
    }
}

function search(key) {
    if (key >= 0 && key <= 999) {
        return arr[key]
    } else {
        return 'Not present'
    }
}

function del(key) {
    if (key >= 0 && key <= 999) {
        arr[key] = 0;
    }
}

insert(1, 8);
console.log(search(1));
del(1);
console.log(arr)
