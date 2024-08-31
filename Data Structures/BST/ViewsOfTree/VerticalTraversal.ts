/**Given the root of a tree, the task is to print vertical traversal
 * 
 * For ex: 
 *                               10
 *                          20        30
 *                      5        15
 * 
 * So o/p is 
 *           5
 *           20
 *           10,15
 *           30
 * 
 * 5  is only node on left most vertical line so vertical line is 5
 * 20 is only next to its previous vertical line so this vertical line is 20
 * 10 and 15 are the nodes at next vertical line vertical line is 10,15
 * 30 is only next to its previous vertical line this vertical line is 30
 * 
 * 
 * For ex:
 *                                   10
 *                            15               25
 *                      35            20
 *             40                              75
 *                                                        80
 * 
 * So o/p is 
 *          40
 *          35
 *          15
 *          10,20
 *          25,75
 *          80
 * 
 * 40  is only node on left most vertical line so this vertical line is 40
 * 35 is only next to its previous vertical line so this vertical line is 35
 * 15 is only next to its previous vertical line so this vertical line is 15
 * 10 and 20 are the nodes at next vertical line so this vertical line is 10,20
 * 25 and 75 are the nodes at next vertical line so vertical line is 25,75
 * 80 is only next to its previous vertical line so this vertical line is 80
 * 
 * For ex: 
 *                               10
 *                          20         30
 *                      5        18,15 
 *                                
 * 
 * o/p: 5,20,10,18,15,30
 * 
 * 5  is only node on left most vertical line so vertical line is 5
 * 20 is only next to its previous vertical line so this vertical line is 20
 * 10 ,18,15 where 18 is left child of 30 and 15 is right child of 20 are the nodes at next vertical line vertical line is 10,18,15 as 18 comes before 15.
 * 30 is only next to its previous vertical line this vertical line is 30
 * 
 * {10,0}
 *       {20,-1},{30,1}
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
     * In this problem we have to do vertical traversal of all the nodes which lies in the same vertical aspect.
     * Now firstly lets understand how can we identify that nodes are in same vertical aspect or line.
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
     * Now both have same horizontal distance and overlaps each other i,e no one is at top or bottom to each other and lies in same level horizontally,
     * so we use levelOrder traversal for computation of the nodes lies at some horizontal distance and store them in map.
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
     * So if the horizontal distance which we are getting is already present in the map, then we push the node's val in the key of the map.
     * if we are seeing the horizontal for the first time then we push the horizontal dist as key in map with [node.val].
     * 
     * Now we got a map but our requirement is to give the vertical traversal from left side. Thus we need to sort the map based on keys in ascending order.
     * 
     * than we can do using concept that an object can be converted to array using 
     * 
     * Arrays.from(mp).
     * 
     * So if mp say looks like
     * 
     *   {
     *     {0: [4,5,6]},            ------------------->        [ [0:[4,5,6]], [-1: [1,2,3]] ]
     *      {-1: [1,2,3]}
     *    }  
     *  
     * Now we can sort this array using
     * 
     * arr.sort((a,b)=> a[0]-b[0]);
     * 
     * So our map will get sorted based on keys and will look like:
     * 
     *  [ [-1: [1,2,3]], [0:[4,5,6]]  ]
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
    verticalTraversal(root: Tree | null) {
        if (root === null) return null;
        this.mp = new Map();
        this.getVerticalRoots(root);
        let arr = Array.from(this.mp);
        arr.sort((a, b) => a[0] - b[0]);
        this.mp = new Map(arr);
        let str = "";
        for (let [, value] of this.mp) {
            for (let i = 0; i < value.length; i++) {
                str += value[i];
                str += " "
            }
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
                if (!this.mp.has(item.horizontalDist)) {
                    this.mp.set(item.horizontalDist, [item.node.value]);
                } else {
                    let allNodes = this.mp.get(item.horizontalDist);
                    if (allNodes) {
                        allNodes.push(item.node.value);
                        this.mp.set(item.horizontalDist, allNodes);
                    }
                }
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

root.left.left = new Tree(5);
root.left.right = new Tree(15);
root.verticalTraversal(root);
