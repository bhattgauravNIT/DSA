package String.PatternSearching;

import java.util.ArrayList;

/**
 * Given a text and a pattern, the task is to find all the index of occurences
 * of the pattern in the text.
 * The text and the pattern may or may noy have repeated characters.
 * For ex:
 * text = "ABCABCD"
 * pattern = "ABCD"
 * o/p : 3 beacuse the pattern ABCD is occuring at the index 3 in the text.
 * 
 */

public class NaiveSearchingPattern {
    /**
     * Approach: 0(n-m)*m,0(1) where n is length of text, m is length of pattern
     * 
     * The idea is to search for all the indexes in the text wether that specific
     * pattern is getting matched or not.
     * 
     * For ex: ABCABCD, pattern = "ABCD"
     * 
     * we first check at index 0 if we are getting this pattern
     * then we check at index 1 of text
     * then we check at index 2 of text
     * then we check at index 3 of text
     * and so on........
     * 
     * Clearly for every (n) length txt we are searching at every index of a m
     * length
     * pattern thus however since we are sure that this window where we are
     * seraching in txt is of
     * window m so we can simply traverse only till (n-m) index.
     */
    public static ArrayList<Integer> naiveSearchingPattern(String txt, String pattern) {
        ArrayList<Integer> ls = new ArrayList<>();
        int i = 0;
        while (i < (txt.length() - pattern.length()) + 1) {
            int j = 0;
            int index = i;
            while (j < pattern.length()) {
                if (txt.charAt(index) == pattern.charAt(j)) {
                    j++;
                    index++;
                } else {
                    index = -1;
                    break;
                }
            }
            if (index != -1) {
                ls.add(i);
            }
            i++;
        }
        return ls;
    }

    public static void main(String[] args) {
        System.out.println(naiveSearchingPattern("AAAAA", "AAA"));
    }

}
