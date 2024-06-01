package String.BasicProblems;

public class StringPalindrome {

    /**
     * Approach1: 0(n),(n)
     * 
     * Its 0(n),0(n) beacuse we are iterating over the entire string and also
     * creating a copy
     * of it.
     * 
     * Using normal string
     * Now idea is simple we create a empty string and keep updating res +=
     * str.charAt(i);
     * The peroblem here with java is since string are immutable and once we said
     * String res = "";
     * 
     * It created a string object in string pool and now everytime we are doing res
     * += str.charAt(i);
     * Its creating a new string object in string pool as no prev such string is
     * already in string pool and
     * thus reference of res is also keep getting updating.
     * 
     * Now after complete travesral res refernce varibale is not pointing to entire
     * looped over and thus now we can
     * compare using res.equals(str) as then only values gets compared.
     */
    public static boolean isPalindrome1(String str) {
        String res = "";
        for (int i = str.length() - 1; i >= 0; i--) {
            res += str.charAt(i);
        }
        return res.equals(str);
    }

    /**
     * Approach1: 0(n),0(n)
     * Since we need a mutable string as we are continously changing the value of
     * res and thus we used
     * string builder since we are working with single thread
     * it better to use string builder.
     * If we would have been working with string buffer than it would be thread safe
     * but it would have
     * created a little overhead thus since its a single threaded only we are using
     * stringBuilder.
     */
    public static boolean isPalindrome2(String str) {
        StringBuilder res1 = new StringBuilder();
        for (int i = str.length() - 1; i >= 0; i--) {
            res1.append(str.charAt(i));
        }
        return res1.toString().equals(str);

    }

    /**
     * Approach2: 0(n),0(1)
     * Using two pointers keep one pointer at 0th index and another at last index
     * and
     * keep checking the chars at these indexes.
     */
    public static boolean isPalindrome3(String str) {
        int i = 0;
        int j = str.length() - 1;
        while (i < j) {
            if (str.charAt(i) == str.charAt(j)) {
                i++;
                j--;
            } else {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        String str = "nitin";
        System.out.println(isPalindrome3(str));
    }

}
