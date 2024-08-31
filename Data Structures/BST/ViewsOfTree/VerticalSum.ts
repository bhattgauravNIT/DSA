/**Given the root of a tree, the task is to print all vertical sum
 * 
 * For ex: 
 *                               10
 *                          20        30
 *                      5        15
 * 
 * So o/p is 5,20,25,30
 * 
 * 5  is only node on left most vertical line so sum for this vertical line is 5
 * 20 is only next to its previous vertical line so sum for this vertical line is 20
 * 10 and 15 are the nodes at next vertical line so sum for this vertical line is 25
 * 30 is only next to its previous vertical line so sum for this vertical line is 30
 * 
 * 
 * For ex:
 *                                   10
 *                            15               25
 *                      35            20
 *             40                              75
 *                                                        80
 * 
 * So o/p is 40,35,15,30,100,80
 * 
 * 40  is only node on left most vertical line so sum for this vertical line is 40
 * 35 is only next to its previous vertical line so sum for this vertical line is 35
 * 15 is only next to its previous vertical line so sum for this vertical line is 15
 * 10 and 20 are the nodes at next vertical line so sum for this vertical line is 30
 * 25 and 75 are the nodes at next vertical line so sum for this vertical line is 100
 * 80 is only next to its previous vertical line so sum for this vertical line is 80
 * 
 */

class Tree<T> {
    value: T;
    left: Tree<T> | null;
    right: Tree<T> | null;
    mp: Map<number, number>;

    constructor(value: T, left: Tree<T> | null = null, right: Tree<T> | null = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    /**Approach: 0(n + hd*log(hd)), 0(hd) 
     * 
     * In this problem we have to give sum of all the nodes which lies in the same vertical aspect.
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
     * Now since we have to give vertical sum and thus we first need to identify that which nodes are there lying on the same vertical line and thus 
     * we will be using a map.
     * 
     * So map will be having key as horizontal distance and sum of that vertical line found so far.
     * If we encounter a horizontal distance for the first map in the map for a node we simply push that horizontal distance as key in map
     * and value of that root.val as value for the key.
     * 
     * However if in case we have already an entry present for horizontal distance in map we will update its value as 
     * mp.get(horizontalDist)+ root.val.
     * 
     * So our map will be looking something like
     * 
     * {
     * {-2: 5},
     * {-1: 20},
     * {0: 25},
     * {1: 30}
     * }
     * 
     * However it will not be necessarily sorted via keys and since we need to give order in that way thus after our map formulation
     * we will simply be sorting the map based on the keys.
     * 
     * And then printing the values for all keys in the map.
     * 
     * Lets understand the time complexity.
     * 
     * We are iterating over n nodes in the tree but not placing all n nodes in map, we are placing all the possible horizontal distances in
     * the map and thus space complexity is 0(hd).
     * 
     * Now we are sorting this map which has space 0(hd) and thus sorting it will be hd*log(hd).
     * 
     * n + hd*log(hd) is time complexity and space complexity is 0(hd)
     * 
    */
    verticalSum(root: Tree<number> | null) {
        if (root === null) return null;
        this.mp = new Map()
        this.getVerticalSum(root);
        let arr = Array.from(this.mp);
        arr.sort((a, b) => a[0] - b[0]);
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i][1]);
        }
    }

    private getVerticalSum(root: Tree<number> | null, horizontalDist: number = 0) {
        if (root === null) return
        if (!this.mp.has(Number(horizontalDist))) {
            this.mp.set(horizontalDist, root.value);
        } else {
            let sm = this.mp.get(horizontalDist);
            if (sm) { this.mp.set(horizontalDist, sm + root.value) }
        }
        this.getVerticalSum(root.left, horizontalDist - 1);
        this.getVerticalSum(root.right, horizontalDist + 1);
    }
}

let root = new Tree(10);
root.left = new Tree(20);
root.right = new Tree(30);

root.left.left = new Tree(5);
root.left.right = new Tree(15);
root.verticalSum(root);