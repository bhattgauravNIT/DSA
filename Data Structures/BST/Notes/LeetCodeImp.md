*Problems*

**1. Minimum difference between the values of any two different nodes in the tree:**
        **Problem**: Given the root of a Binary Search Tree (BST), return the minimum difference between the values of any two different nodes in the tree.
                                 4
                            2          6
                        1      3

        https://leetcode.com/problems/minimum-distance-between-bst-nodes/description/

        **Intuition:** Maintain a prev and a minDiff global variable. Use inorder traversal recursively and find minDiff between current value
        of minDiff and (root.value - prev).

        Algo:



