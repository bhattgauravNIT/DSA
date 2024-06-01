package String.BasicProblems;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * Given a string containing may be repeating/non-repeating charaters. Return
 * the index of the left most
 * repeating character.
 * 
 * Ex: geeksforgeeks
 * 
 * Clearly g is the char which is repeating and is present at 0th index which is
 * left most.
 */

public class LeftMostRepeatingCharIndex {
    /**
     * Approach: 0(n),0(n)
     * The approach is to use a map which will store char corresponding to an array
     * , the first index of
     * array will store the index at which its being found first and the second
     * index will store the number of occurence
     * For ex: In case of geekforgeeks the map will look like
     * 
     * {
     * g -> [0,2]
     * e -> [1,4]
     * k -> [2,2]
     * s -> [3,2]
     * f -> [4,1]
     * o -> [5,1]
     * r -> [6,1]
     * }
     * 
     * Since map's key are key set thus it will override the already existing
     * occurence and we will update
     * the occurence and not the starting index of the element found.
     * 
     * Simply traverse through the map and find the element which has occurence
     * greater than 1 and return the
     * min index value
     * 
     */
    public static int leftMostRepeatingIndexChar1(String str) {
        Map<Character, Integer[]> mp = new HashMap<>();
        for (int i = 0; i < str.length(); i++) {
            if (mp.get(str.charAt(i)) == null) {
                Integer[] arr = { i, 1 };
                mp.put(str.charAt(i), arr);
            } else {
                Integer[] val = mp.get(str.charAt(i));
                val[1]++;
                mp.put(str.charAt(i), val);
            }
        }
        int max = Integer.MAX_VALUE;
        for (Character val : mp.keySet()) {
            if (mp.get(val)[1] > 1) {
                if (mp.get(val)[0] < max) {
                    max = mp.get(val)[0];
                }
            }
        }
        return max == Integer.MAX_VALUE ? -1 : max;
    }

    /**
     * Approach2: 0(n),0(1)
     * The approach is to use a look up table of size 256 as there are in total 256
     * ascii chars.
     * 
     * No we traverse through the string and store the count of each char in the
     * look up table
     * now again we traverse through the string and chekc if that indexed value has
     * count greater than 1
     * in the look up table if yes, we return that index of string char.
     */
    public static int leftMostRepeatingIndexChar2(String str) {
        int count[] = new int[256];
        for (int i = 0; i < str.length(); i++) {
            count[str.charAt(i)]++;
        }
        for (int i = 0; i < str.length(); i++) {
            if (count[str.charAt(i)] > 1) {
                return i;
            }
        }
        return -1;

    }

    /**
     * Approach 3: 0(n),0(1)
     * The above solution was taking 2 loops iteration we can reduce those two loops
     * to one loop.
     * 
     * So we create a 256 sized array/look up table as we can have 256 ascii chars
     * now,
     * we store the first index of char seen in the look up table.
     * 
     * Now in case the value at the index of a look up table is not -1 or its being
     * seen previously so we
     * update the res as min of res, value at that index.
     * 
     * In this way we get to know the repeating char which has min first index.
     * 
     */
    public static int leftMostRepeatingIndexChar3(String str) {
        int[] count = new int[256];
        Arrays.fill(count, -1);
        int res = Integer.MAX_VALUE;
        for (int i = 0; i < str.length(); i++) {
            if (count[str.charAt(i)] == -1) {
                count[str.charAt(i)] = i;
            } else {
                res = Math.min(res, count[str.charAt(i)]);
            }
        }
        return res == Integer.MAX_VALUE ? -1 : res;
    }

    public static void main(String[] args) {
        // System.out.println(leftMostRepeatingIndexChar2("geeksforgeeks"));
        System.out.println(leftMostRepeatingIndexChar3("geeksforgeeks"));

    }

}
