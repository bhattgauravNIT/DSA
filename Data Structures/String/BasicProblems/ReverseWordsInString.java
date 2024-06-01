package String.BasicProblems;

import java.util.Stack;

/**
 * Given a string the task is to reverse the words in a string.
 * For ex:
 * 
 * I/p = "I love geeksforgeeks"
 * O/p = "geeksforgeeks love I";
 * 
 * I/p = "welcome to gfg"
 * O/p = "gfg to welcome"
 */

public class ReverseWordsInString {
    /**
     * Approach1: 0(n),0(number of words)
     * The approach is simple keep formulating a string until you find a empty char
     * once found means the temp string formed will be a word , now place this word
     * in a stack
     * and continue
     * Now iterate over the stack and place its values in a string.
     * It will get reversed.
     */
    public static String reverseWords(String str) {
        Stack<String> stack = new Stack<>();
        StringBuilder temp = new StringBuilder();
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) != ' ') {
                temp.append(str.charAt(i));
            } else {
                stack.push(temp.toString());
                temp.setLength(0);
            }
        }
        stack.push(temp.toString());
        String res = "";
        while (!stack.isEmpty()) {
            res += stack.pop() + " ";
        }
        return res.trim();
    }

    /**
     * Approach2: 0(n),0(1)
     * The idea is simple. Say we have a sentence
     * 
     * "I love coading"
     * 
     * So if we first reverse every word this str will become
     * 
     * I evol gnidaoc"
     * 
     * Now lets reverse this entire string so we will get
     * 
     * "coading love I" clearlt this was the output that we needed .
     * 
     * Thus first reverse every word found and then in end reverse the entire
     * string.
     * 
     */
    public static String revreseWords1(String str) {
        int start = 0;
        StringBuilder res = new StringBuilder();
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) == ' ') {
                res.append(reverse(str, start, i - 1) + " ");
                start = i + 1;
            }
        }
        res.append(reverse(str, start, str.length() - 1));
        res = reverse(res.toString(), 0, str.length() - 1);
        return res.toString().trim();
    }

    public static StringBuilder reverse(String str, int start, int end) {
        StringBuilder rev = new StringBuilder();
        for (int i = end; i >= start; i--) {
            rev.append(str.charAt(i));
        }
        return rev;

    }

    public static void main(String[] args) {
        System.out.println(revreseWords1("I love geeksforgeeks"));
    }

}
