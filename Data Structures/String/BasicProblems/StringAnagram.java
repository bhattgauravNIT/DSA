package String.BasicProblems;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * Given two strings s1 and s2, the task is to determine wether both strings are
 * anagram
 * of each other or not. Strings are said to be anagrams if other string
 * contains all the
 * characters of first string also in same number of frequencies, however the
 * order may differ.
 * 
 * For ex:
 * s1 = silent
 * s2 = listen o/p true
 */

public class StringAnagram {
    /** Approach1: 0(nlogn),0(n) */
    public static boolean isAnagram1(String s1, String s2) {
        if (s1.length() != s2.length())
            return false;
        char[] arr1 = s1.toCharArray();
        Arrays.sort(arr1);

        char[] arr2 = s2.toCharArray();
        Arrays.sort(arr2);

        int i = 0;
        while (i < arr1.length) {
            if (arr1[i] != arr2[i]) {
                return false;
            }
            i++;
        }
        return true;
    }

    /**
     * Approach2: 0(n), 0(n)
     * 
     * Approach is if both the strings should have same characters and same number
     * of characters then
     * put them all in a map in case of s1 keep storing everything , in case of s2
     * keeping deleting the occurence
     * from map, if in case there does not exists all elements with 0 frequency then
     * both strings are not
     * anagram.
     */
    public static boolean isAnagram2(String s1, String s2) {
        if (s1.length() != s2.length()) {
            return false;
        }
        Map<Character, Integer> mp = new HashMap<>();
        for (int i = 0; i < s1.length(); i++) {
            if (mp.get(s1.charAt(i)) == null) {
                mp.put(s1.charAt(i), 1);
            } else {
                mp.put(s1.charAt(i), mp.get(s1.charAt(i)) + 1);
            }
            if (mp.get(s2.charAt(i)) == null) {
                mp.put(s2.charAt(i), 1);
            } else {
                mp.put(s2.charAt(i), mp.get(s2.charAt(i)) - 1);
            }
        }

        for (char val : mp.keySet()) {
            if (mp.get(val) != 0) {
                return false;
            }
        }
        return true;

    }

    public static void main(String[] args) {
        String s1 = "abcd";
        String s2 = "dbcb";
        System.out.println(isAnagram1(s1, s2));
    }

}
