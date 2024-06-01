package String.PatternSearching;

import java.util.ArrayList;

/**
 * 
 * Given a text and a pattern, the task is to find all the index of occurences
 * of the pattern in the text.
 * The text may or may not have repeated chars however the pattern will not have
 * repeated characters.
 * For ex:
 * text = "ABCABCD"
 * pattern = "ABCD"
 * o/p : 3 beacuse the pattern ABCD is occuring at the index 3 in the text.
 * 
 */

public class NaiveSearchingPatternImprovisedDistinct {
    /**
     * Approach: The idea behind this is lets take an example
     * 
     * txt = "ABCABCD"
     * pattern = "ABCD"
     * 
     * Now first we match i=0 of txt with j=0 of pattern it matches so
     * now we matches i=1 of text with j=1 of pattern again it matches
     * now we match i=2 of text with j=2 of pattern it matches
     * we again move forward
     * 
     * now at index 3 it does not match , now instead of again starting from index =
     * 2 of i in
     * text and j=0 for pattern we can simply start i from this index where this
     * mismatch is found the reason behind this observation is since at index 3
     * there is a mismatch and previously there is a match and since we only have'
     * distinct characters in the string thus we will surely not have a match and
     * a match can only be found from this index where mismatch has happen if we
     * again start from j=0 or again start searching the pattern from this position.
     * 
     */
    public static ArrayList<Integer> distinctPatternSearching(String txt, String pattern) {
        ArrayList<Integer> ls = new ArrayList<>();
        int i = 0;
        while (i <= (txt.length() - pattern.length())) {
            int j = 0;
            int cnt = 0;
            int index = i;
            while (j < pattern.length()) {
                if (txt.charAt(i) == pattern.charAt(j)) {
                    i++;
                    j++;
                } else {
                    i++;
                    cnt = -1;
                    break;
                }
            }
            if (cnt == 0) {
                ls.add(index);
            }
        }
        return ls;
    }

    public static void main(String[] args) {
        System.out.println(distinctPatternSearching("ABCABC", "ABC"));
    }

}
