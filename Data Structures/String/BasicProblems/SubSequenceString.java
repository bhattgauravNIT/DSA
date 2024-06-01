package String.BasicProblems;

/**
 * Given two strings str1 and str2 the task is to determine wether str2 is a
 * subSequence of str1 or not.
 * 
 * For ex: s1 = "ABD";
 * s2 = "AD" o/p is true
 * 
 * If we consider all the subSequences of s1 so it will be
 * "",A,B,D, "AB","AD", "BD", "ABD" i,e 2^3 in total.
 * 
 * A subsequence should contain chars in same order and need not to be
 * contigious unlinke a subString.
 */

public class SubSequenceString {
    /**
     * Approach1: 0(n*2^n),0(1).
     * 
     * The idea is to obtain all the subSequences of the given s1 string and to
     * check whether s2 is
     * a subSequence or not.
     * 
     * Lets understand how we can calculate all the subSequences of a string say s1
     * = ABC
     * Now we know that the total number of subSequences of s1 will be 8 that i,e
     * "", A, B, C, AB, AC, BC, ABC.
     * 
     * Lets try to obtain this via bitManipluation.
     * 
     * So
     * 0 1 2
     * A B C -> given s1.
     * 
     * 2 1 0
     * 
     * 0 -> 0 0 0 : ""
     * 1 -> 0 0 1 : A
     * 2 -> 0 1 0 : B
     * 3 -> 0 1 1 : AB
     * 4 -> 1 0 0 : c
     * 5 -> 1 0 1 : AC
     * 6 -> 1 1 0 : BC
     * 7 -> 1 1 1 : ABC
     * 
     * If we iterate from 0 to 2^3 i,e 0->7 so we are iterating over all 7 rows of
     * above,
     * considering an i from 0->7
     * Now every ith row can be represented via bit as 000 or 001 etc.....
     * 
     * The number of columns will always be equal to the length of s1 that is 3 is
     * our case
     * so lets have a j which moves from 0->3.
     * 
     * Now in the bit representation of every row if we somehow find out the index
     * of the column which is 1 or are set bit
     * then simply we can say s1[j] will contribute in providing us a char for the
     * subSequence corresponding to that row.
     * 
     * For ex: 001 (1index row) has one set bit at column index 0 and thus s1[0] is
     * A which is a subSequence.
     * 
     * Now how we will find out the setBits index in every row.
     * 
     * Now lets consider a bit representation values is written as .... 8 4 2 1
     * If we look at all powers of 2 i,e 1,2,4,8 its binary representation is
     * 
     * 001,010, 100, 101,110,111 etc....
     * Now if we need to check wether i i,e row index is having a setbit or not that
     * keep doing a and operation
     * with power of 2.
     * 
     * For ex: 2nd row i,e i=1 has binary 001
     * Now in order to check
     * 
     * if j=0 column i,e lsb is 0 or not do (001)&(001)
     * clearly its 1 thus j=0 has a set bit
     * 
     * if j=1 column, i,e do (001)&(010) clearly its zero thus j=1 does not has a
     * set bit
     * 
     * j=2 column, i,e (001)&(100) clearly its zero thus j=2 does not has a set bit.
     * 
     * Since there are only 3 columns thus it means we have iterated and checked all
     * bits for that row.
     * 
     * Since there are 2^n rows and n columns hence time complexity is (2^n)*n.
     */
    public static boolean subSequence(String s1, String s2) {
        int p = 1 << s1.length();
        int i = 0;
        int j = 0;
        String temp = "";
        while (i < p) {
            while (j < s1.length()) {
                int q = 1 << j;
                if ((i & q) != 0) {
                    temp += s1.charAt(j);
                }
                j++;
            }
            if (temp.equals(s2)) {
                return true;
            }
            temp = "";
            i++;
            j = 0;
        }
        return false;

    }

    /** Approach2: 0(m+n),0(1)
     * the idea is simple since a subSequence can't be contigious and have gaps thus use two pointer
     * to see if all chars of s2 are present in s1 are is in order.
     * 
     * Ex: 
     * 
     * s1 = GEEKSFORGEEKS
     * s2 = GRGES
     * 
     * one pointer at s1 and one at s2 in case both chars matches then we incremnet both else we only incremnet
     * ith pointer on main s1.
     * 
     * In case j pointer on s2 reaches end and becomes equal to length of string s2 we can say that
     * yes s2 is a subSequence of s1.
    */
    public static boolean subSequence1(String s1, String s2) {
        int i = 0;
        int j = 0;
        while (i < s1.length() && j < s2.length()) {
            if (s1.charAt(i) == s2.charAt(j)) {
                i++;
                j++;
            } else {
                i++;
            }
        }
        return j == s2.length();

    }

    public static void main(String[] args) {
        String s1 = "GEEKSFORGEEKS";
        String s2 = "GRGES";
        System.out.println(subSequence1(s1, s2));

    }

}
