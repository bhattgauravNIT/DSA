/**Given the root of a tree, the task is to print bottom view of tree
 * 
 * For ex: 
 *                               10
 *                          20        30
 *                      5        15
 * 
 * So o/p is 
 *           5
 *           20
 *           15
 *           30
 * 
 * 5  is only node on left most vertical so 5
 * 20 is only next to its previous vertical line so 20
 * 10 and 15 are the nodes at next vertical line vertical line but 15 comes first from bottom so 15
 * 30 is only next to its previous vertical line so 30
 * 
 * 
 * For ex:
 *                                   10
 *                            15               25
 *                      35           20
 *             40                              75
 *                                                        80
 * 
 * So o/p is 
 *          40
 *          35
 *          15
 *          20
 *          75
 *          80
 * 
 * 40  is only node on left most vertical line so 40
 * 35 is only next to its previous vertical line so 35
 * 15 is only next to its previous vertical line so 15
 * 10 and 20 are the nodes at next vertical line but 20 comes first from bottom so we print 20
 * 25 and 75 are the nodes at next vertical line but 75 comes first or is at bottom so 75
 * 80 is only next to its previous vertical line so this vertical line is 80
 * 
 * For ex: 
 *                               10
 *                          20         30
 *                      5        18,15 
 *                                
 * 
 * o/p: 5,20,15,30
 * 
 * 5  is only node on left most vertical line so 5
 * 20 is only next to its previous vertical line so 20
 * 
 * 10 ,18,15 where 18 is left child of 30 and 15 is right child of 20 are the nodes at next vertical but 18 and 15 comes at same level, but we give
 * preference to left child
 * 
 * 30 is only next to its previous vertical line this vertical line is 30
 * 
 */

class Queue {
    private arr: { node: Tree, horizontalDist: number }[] | undefined[];
    private size: number;
    private front: number;
    private rear: number;

    constructor() {
        this.arr = [];
        this.size = 0;
        this.front = 0;
        this.rear = -1;
    }

    push(data: { node: Tree, horizontalDist: number }): void {
        this.rear = (this.rear + 1);
        this.arr[this.rear] = data;
        this.size++;
    }

    pop(): { node: Tree, horizontalDist: number } | undefined {
        if (this.isEmpty()) return undefined;
        const data = this.arr[this.front];
        this.arr[this.front] = undefined;
        this.front = (this.front + 1);
        this.size--;
        return data;
    }

    top(): { node: Tree, horizontalDist: number } | undefined {
        if (this.isEmpty()) return undefined;
        return this.arr[this.front];
    }

    isEmpty(): boolean {
        return this.size === 0;
    }
}


class Tree {
    value: number;
    left: Tree | null;
    right: Tree | null;
    mp: Map<number, number[]>;

    constructor(value: number, left: Tree | null = null, right: Tree | null = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    /**Approach:  0(n)+ 0(hd*log(hd)) + 0(hd), 0(hd)
     * 
     * In this problem we have to find the bottom view of a given binary tree.
     * Now firstly lets understand how can we identify that nodes are in same vertical aspect or line because the bottom view will simply be the
     * every last node on each vertical level. 
     * 
     * For this we use concept of horizontal distance.
     * So lets say for root horizontal distance is 0.
     * If we go left of root we decrease the horizontal distance -1 and if we go right of the root we increase the horizontal distance + 1.
     * 
     * So lets understand this with help of an example.
     * 
     * For ex: 
 *                               10
 *                          20        30
 *                      5        15
 * 
     *
     * So for root 10, Horizontal distance :hd = 0 
     * for root 20, Horizontal distance :hd = 0-1 = -1 , (0 is of parent 10 and we moved left of it)
     * for root 30, Horizontal distance :hd = 0+1 = 1 , (0 is of parent 10 and we moved right of it)
     * for root 5, Horizontal distance :hd = -1-1 = -2, (-1 is of parent 20 and we moved left of it)
     * for root 15, Horizontal distance :hd = 0 , (-1 is of parent 20 and we moved right of it so -1+1 = 0)
     * 
     * Now all the nodes which has the same horizontal distance lies on the same vertical line and thus we can say that the vertical traversal
     * of this tree will be
     * 
     * 5
     * 20
     * 10,15
     * 30
     * 
     * So every last node or every last node for every level is:
     * 
     * 5
     * 20
     * 15
     * 30
     * 
     * and thus its the bottom view of the tree.
     * 
     *
     * There arise a special case lets suppose we are getting two nodes at same horizontal distance which overlaps each other
     * For ex: 
 *                               10
 *                          20         30
 *                      5        18,15 
 * 
 *                                
     * Here 18 is left child of 30 and 15 is right child of 20, if we look at the horizontal distance of both the nodes we see
     * 
     * Hd: 18: 0
     * Hd: 15: 0
     * 
     * Now both have same horizontal distance and overlaps each other i,e no one is at top or bottom to each other in such cases preference is being given to left
     * nodes.
     * 
     * So level order traversal needs a queue.
     * 
     * So in level order traversal once we pop an item from an queue.
     * We push its leftChild, rightChild and thus we need to insert a TreeNode in queue but we also in this case needs the horizontal distance of the node which
     * is being popped because when we will be inserting the leftChild than this left child's horizontal distance has to be 
     * 
     * horizontalDistance of parent + 1 .
     * 
     * When we are inserting the right child of a node which is being pooped then 
     * right child's horizontal distance has to be 
     * 
     * horizontalDistance of parent - 1 .
     * 
     * 
     * Thus we formulate a queue of pair i,e {node: TreeNode, horizontalDist: number}
     * 
     * Now while doing level order traversal we initially push root to queue with horizontal dist 0.
     * Then while !q.isEmpty
     * 
     * we pop from queue and see wether the horizontal distance which we are getting is already present in the map.
     * 
     * Now our map will be having key of number i,e horizontal dist and value as [] of node's value.
     * 
     * So if the horizontal distance which we are getting is already present in the map we override the existing value corresponding to that key and thus we only
     * have last node corresponding to every vertical level in last.
     * 
     * else we simply insert in the map.
     * 
     * Now we got a map but our requirement is to give the bottom view starting from left side. Thus we need to sort the map based on keys in ascending order.
     * 
     * than we can do using concept that an object can be converted to array using 
     * 
     * Arrays.from(mp).
     * 
     * So if mp say looks like
     * 
     *   {
     *     {0: [4]},            ------------------->        [ [0:[4]], [-1: [1]] ]
     *      {-1: [1]}
     *    }  
     *  
     * Now we can sort this array using
     * 
     * arr.sort((a,b)=> a[0]-b[0]);
     * 
     * So our map will get sorted based on keys and will look like:
     * 
     *  [ [-1: [1]], [0:[4]]  ]
     * 
     * Now we simply convert this arr back to map using
     * mp = new Map(arr);
     * 
     * Now we just need to traverse through the map and print all the values of every key.
     * 
     * Lets understand time and space complexity
     * 
     * 1. We are doing level order traversal of the entire tree which is 0(n)
     * 2. We are storing all possible horizontal dist in a map i,e 0(hd) in space.
     * 3. We are sorting 0(hd) space map i,e hd*log(hd)
     * 4. We are traversing map of hd size.
     * 
     * Time complexity:   0(n)+ 0(hd*log(hd)) + 0(hd)
     * Space complexity: 0(hd)
     *  
    */
    bottomView(root: Tree | null) {
        if (root === null) return null;
        this.mp = new Map();
        this.getVerticalRoots(root);
        let arr = Array.from(this.mp);
        arr.sort((a, b) => a[0] - b[0]);
        this.mp = new Map(arr);
        let str = "";
        for (let [, value] of this.mp) {
            str += value[0];
            console.log(str);
            str = "";
        }

    }

    private getVerticalRoots(root: Tree | null) {
        if (root === null) return;
        let q = new Queue();
        let obj = { node: root, horizontalDist: 0 };
        q.push(obj);
        while (!q.isEmpty()) {
            const item = q.pop();
            if (item) {
                this.mp.set(item.horizontalDist, [item.node.value]);
                if (item.node.left) {
                    q.push({ node: item.node.left, horizontalDist: item.horizontalDist - 1 })
                }
                if (item.node.right) {
                    q.push({ node: item.node.right, horizontalDist: item.horizontalDist + 1 })
                }
            }
        }
    }
}

let root = new Tree(10);
root.left = new Tree(20);
root.right = new Tree(30);

root.left.left = new Tree(40);
root.left.right = new Tree(50);
// root.bottomView(root);


let root1 = new Tree(10);
root1.left = new Tree(20);
root1.right = new Tree(30);

root1.left.left = new Tree(40);
root1.left.right = new Tree(50);

root1.right.left = new Tree(60);
root1.right.right = new Tree(70);
// root1.bottomView(root1);


let root2 = new Tree(10);
// root2.bottomView(root2);


let root3 = new Tree(10);
root3.left = new Tree(20);
root3.right = new Tree(30);

root3.left.right = new Tree(50);
root3.left.right.right = new Tree(60);
// root3.bottomView(root3);

