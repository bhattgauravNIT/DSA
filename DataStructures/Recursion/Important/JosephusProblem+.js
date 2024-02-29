/**Given n people are standing in a circle wth index based 0. Given a kill count k, tell which position person will be left after
 * all the other people are killed.
 * 
 * Ex: n = 5, k = 3
 * 
 * So index based is 0 i,e 
 * There are 5 people say 0,1,2,3,4, now kill count is 3, at first the gun is with 0th person, so he considers himself first and counts 3, 
 * kills the person on 3 count.
 * 0/p is 3. 
 * Person indexed at 3 will be left in last.
 */


/**Approach: 0(n),0(n): Recursion
 * 
 * Say n = 5 and k = 3.
 * 
 * Consider 
 *  0 1 2 3 4     
 * Now its 0 based index so everytime the k-1 index person will be killed
 * 
 * 0 1 2 3 4
 * 3 4 0 1
 * 
 * In first step gun is with index 0 , so he killed person at index 2 as the kill count is 3. Now beacuse ideally everyone
 * is standing in circular so now the gun is handed over to person 3 and again cycle starts.
 * 
 * 0 1 2 3 4
 * 3 4 0 1
 * 1 3 4
 * 
 * Now the gun was with person 3 so he killed the 3rd person , who is person 0, the gun is now handed over to person 1 which starts 
 * cycle again
 * 
 * 0 1 2 3 4
 * 3 4 0 1
 * 1 3 4
 * 1 3
 * 
 * Now the person 1 kills person 4, cycle again starts from 1
 * 
 * 0 1 2 3 4
 * 3 4 0 1
 * 1 3 4
 * 1 3
 * 3
 * 
 * Now 1 has the gun he counts 3 , so he kills himself. 3 number person is left.
 * 
 * The intitution to solve this problem. Is to know that for jos(5,3), what will be the answer for jos(4,3) then for jos(3,3).....
 * till jos(1,3).
 * 
 * When there will be only one person and the kill count remains same, what will be the index that will survive.
 * 
 * So if there is only one person, the index will be 0. Which is the base case.
 * Now we look carefully 
 * 
 * 0 1 2 3 4
 * 3 4 0 1
 * 1 3 4
 * 1 3
 * 3
 * 
 * 3 person is surviving in last at index 0. So if there would have been 2 people then for 3 to survive he must be at index 1.
 * Means if base case returns 0, then in second last step his position should be 1, now in thirst last stage position of 3 should be
 * again 1, in 4th last stage in order for 3 to survive his position should be at 0 and in 5th last stage his position should be 3.
 * 
 * So this is happening as these guys are standing in a circular arch. So
 * 
 * 0 1 2 3 4        -> 3   (convert child call which is 0 to 3)
 * 3 4 0 1          -> 0   (convert child call which is 0 to 0)
 * 1 3 4            -> 0   (convert child call which is 1 to 0)
 * 1 3              -> 1   (convert child call which is 0 to 1)
 * 3                -> 0
 * 
 * So this convesrion is nothing but, (the child call + k) % n where n varies with every step.
 */
function josephus(n, k) {
    if (n === 0) return 0
    return (josephus(n - 1, k) + k) % n;
}

console.log(josephus(5, 3));

/**Modification  
 * 
 * If we need to find out the index of person who will survive after all if k kill count but based on 1 based indexing.
 * Then compute for jos probelm on 0 based indexing and to this add 1 to the result.
*/

function josephus(n, k) {
    if (n === 0) return 0
    return (josephus(n - 1, k) + k) % n;
}

function jos1based(n, k) {
    return josephus(n, k) + 1;
}

jos1based(5, 3);