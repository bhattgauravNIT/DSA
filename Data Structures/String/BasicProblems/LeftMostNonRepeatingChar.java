package String.BasicProblems;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * Given a string the task is to find the index of left most/the first
 * non repeating character.
 * 
 * Ex: geeksforgeeks
 * o/p 5 since f is the first non repeating char.
 * 
 * ex: abbcca
 * o/p is -1 since there is no non reoeating char.
 */

public class LeftMostNonRepeatingChar {
    /**
     * Approach1: 0(n),0(n)
     * The idea is to formulate a map of char and Integer array where first index
     * of integer array corresponds to the index at which the element is being found
     * first
     * and the second index value corresponds to the number of occurence.
     * Now travese through the map if in case the value of occurence is 1 only then
     * find the min index at which the elemnet is found.That index will be the
     * answer.
     * 
     * If there is no such index of if every element is repeated that it should
     * retun -1.
     */
    public static int firstNonRepeatingChar(String str) {
        Map<Character, Integer[]> mp = new HashMap<>();
        for (int i = 0; i < str.length(); i++) {
            if (mp.get(str.charAt(i)) == null) {
                Integer[] arr = { i, 1 };
                mp.put(str.charAt(i), arr);
            } else {
                Integer[] values = mp.get(str.charAt(i));
                values[1]++;
                mp.put(str.charAt(i), values);
            }
        }
        Integer max = Integer.MAX_VALUE;
        for (char val : mp.keySet()) {
            if (mp.get(val)[1] == 1) {
                if (max > mp.get(val)[0]) {
                    max = mp.get(val)[0];
                }
            }
        }
        return max == Integer.MAX_VALUE ? -1 : max;
    }

    /**
     * Approach 2: 0(n)+0(n)~= 0(n),0(1)
     * The idea is to make a lookup table for ex for
     * 
     * gaurav
     * 
     * the look up table will store the number of occurence in index corresponding
     * to ascii value of every char.
     * 
     * Now Iterate through the string again and see if the string char has occurence
     * only once than
     * this index is the answer .
     * If there no exist only 1 character in the string than o/p will be -1.
     */
    public static int firstNonRepeatingChar1(String str) {
        int[] hash = new int[256];
        for (int i = 0; i < str.length(); i++) {
            hash[str.charAt(i)]++;
        }
        for (int i = 0; i < str.length(); i++) {
            if (hash[str.charAt(i)] == 1) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Approach3: 0(n+c),0(1)
     * The ablove was having two travesal of the string making time complexity as
     * 0(n)+0(n) ~= 0(n), 0(1) auxilary space.
     * 
     * How ever lets try and achieve it in one travesal.
     * The idea is to create a 256 sized int array or a look up table now, for every
     * char if found for
     * the first time , then store the index of this first occurence in the index
     * corresponding to the char at
     * the look up table , now if the char is not found for the first time meaning
     * the value is not
     * -1 then simply mark it as -2 value meaning this element is repeated .
     * 
     * Now again check in the lookup table and find the char with value not -1 and
     * not -2 and is contaning min index value.
     * 
     * Now since its having one travesal for string and one constant traversal of
     * 256 sized array
     * then its time complexity can be considered as 0(n+c) where c is 256 and thus
     * ideally its just one travesal of string.
     * 
     */
    public static int firstNonRepeatingChar2(String str) {
        int[] hash = new int[256];
        Arrays.fill(hash, -1);
        for (int i = 0; i < str.length(); i++) {
            if (hash[str.charAt(i)] == -1) {
                hash[str.charAt(i)] = i;
            } else {
                hash[str.charAt(i)] = -2;
            }
        }
        Integer max = Integer.MAX_VALUE;
        for (int val : hash) {
            if (val != -1 && val != -2) {
                if (max > val) {
                    max = val;
                }
            }
        }
        return max == Integer.MAX_VALUE ? -1 : max;
    }

    public static void main(String[] args) {
        System.out.println(firstNonRepeatingChar2("gaurav"));
    }

}
