package String.BasicProblems;

import java.util.SortedMap;
import java.util.TreeMap;

/**
 * Given a string the task is to print the string chars along with the number of
 * frequencies.
 * However the char should be in sorted order.
 * 
 * Ex: str= "geeksforgeeks"
 * o/p:
 * e 4
 * f 1
 * g 2
 * k 2
 * o 1
 * r 1
 * s 2
 */
class FrequencyOfChars {
    /**
     * Approach1: 0(n),0(n)
     * This approach is based on map.
     * Since we have to print the chars in sorted order thus we use a map which
     * stores key in sorted order and its
     * a SortedMap, SortedMap<Character, Integer> mp = new TreeMap<>();
     * 
     * Idea is simple to store the freq of char in a map and then to iterate over
     * the map and print it.
     * 
     * Clearly 0(n) time is taken to travese through the string and 0(n) space is
     * taken to store in map.
     */
    public static void freqChar1(String str) {
        SortedMap<Character, Integer> mp = new TreeMap<>();
        for (int i = 0; i < str.length(); i++) {
            if (mp.get(str.charAt(i)) == null) {
                mp.put(str.charAt(i), 1);
            } else {
                mp.put(str.charAt(i), mp.get(str.charAt(i)) + 1);
            }
        }
        for (Character c : mp.keySet()) {
            System.out.println(c + " " + mp.get(c));
        }
    }

    /**
     * Approach2: O(n),0(1)
     * 
     * This solution is based on hashing.
     * We maintain a 26 sized array index from 0-25.
     * Every char is small and therefore the ascii value will be from 97->.......
     * 
     * So we correponding to every ascii value we can calculate index via assiiValue
     * - 97 and thus update
     * the value of that index which is 0 initially.
     * 
     * Then iterate over the array and print in case value at that index is greater
     * than 0.
     * 
     * Notepoint here is when we create a array of size 26 in java all the values
     * are by default
     * set to 0, so we dont need to expilictly make values of all 26 index as 0.
     */
    public static void freqChar2(String str) {
        int[] arr = new int[26];
        for (int i = 0; i < str.length(); i++) {
            int index = (int) (str.charAt(i) - 97);
            arr[index]++;
        }
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] > 0) {
                System.out.println((char) (i + 97) + " " + arr[i]);
            }
        }

    }

    public static void main(String[] args) {
        String str = "geeksforgeeks";
        freqChar1(str);
        freqChar2(str);
    }

}