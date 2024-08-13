/**So a binary tree datastructure is a kind of tree data structure however as the name suggest binary every node
 * of the tree can have atmost 2 children.
 * Meaning a node can have 0,1 or 2 child. or in other words we can say that the degree of every node in a binary
 * tree is either 0 ,1 or 2.
 * 
 *Ex:                       10
                       |         |
                      20         30
                    |   |       |   |
                   40  50      60   70

    Is a binary tree becomes every node has atmost 2 child.
*/

class TreeNode<T> {
    data: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    constructor(data: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

let root = new TreeNode<number>(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);
root.left.left = new TreeNode(40);
root.left.right = new TreeNode(50);
root.right.left = new TreeNode(60);
root.right.right = new TreeNode(70);
