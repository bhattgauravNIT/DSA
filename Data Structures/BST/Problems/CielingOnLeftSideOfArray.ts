/**Given an array the task is to find ceiling on left side for every index i.
 * 
 * For ex: arr = [2, 8, 30,15,25,12]
 *         o/p:  [-1,-1,-1,30,30,15]
 * 
 * Explanation:
 * 
 *   i=0: 2, there is nothing which is greater than or equal to 2 on left of it so push -1
 *   i=1: 8, there is nothing which is greater than of equal to 8 on left of it so push -1
 *   i=2: 30, there is nothing which is greater than or equal to 30 on left so push -1.
 *   i=3: 15, 30 is greater than 15 and lies left of it so push 30
 *   i=4: 25, 30 is greater than 25 and lies left of it so push 30
 *   i=5: 12, 30,15,25 are all greater than 12 and lies left of it, out of them closest greater is 15 so push 15.
 */


/**Approach1: 0(n^2),0(1)
 * 
 * This is a brute force approach in which we check every possible left element to any ith index element in the array and compute the
 * distance of that element with ith element in case the element is greater than the ith index element.
 * 
 * If this distance found is lesser than current distance computed we update the distance and mark closest element as this element.
 * In case we don't find any closest element we simply push -1 to res array for that ith indexed element. 
 * 
 * */
function ceilingOnLeftSide(arr: number[]): number[] {
    let res: number[] = [];
    res.push(-1);
    let closest = -1;
    let closestDist = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] === arr[i]) {
                res.push(arr[j]);
            } else if (arr[j] > arr[i]) {
                let dist = arr[j] - arr[i];
                if (dist < closestDist) {
                    closest = arr[j];
                    closestDist = dist;
                }
            }
        }
        if (closest === -1) {
            res.push(-1);
        } else {
            res.push(closest);
        }
        closest = -1;
        closestDist = Number.MAX_SAFE_INTEGER
    }
    return res;
}

console.log(ceilingOnLeftSide([2, 8, 30, 15, 25, 12]));

/**Approach2:  */
class BST<T> {
    val: T;
    left: BST<T> | null;
    right: BST<T> | null;

    constructor(val: T, left: BST<T> | null = null, right: BST<T> | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    insert(root: BST<T> | null, val: T): BST<T> {
        if (root === null) return new BST<T>(val);
        if (val < root.val) {
            root.left = this.insert(root.left, val);
        } else if (val > root.val) {
            root.right = this.insert(root.right, val);
        }
        return root;
    }
}

/**
 * Approach: 0(n logn),0(1)
 * 
 * Lets understand this approach with help of an example so the input array is [2, 8,30,15,25,12]
 * 
 * Now for index = 1, there is nothing on left side of this and thus every time i=0th index value will be having nothing
 * greater to the left of it and thus we push -1 for it.
 * 
 * Now we will formulate a new BST node for this index i,e i=0.
 * So our BST looks like      
 *                                   2
 * 
 * with 2 as root.
 * 
 * Now we start the iteration from i=1 and will mark root as current and initially the value of ceil is -1.
 * We apply the same concept of finding closest greater number or ceil of a number i,e if we are moving left than the current node's
 * value is a potential candidate to be the closest greater number.
 * 
 * So  let x = arr[i] 
 * 
 * we will try and find closest Greater value to x in BST.
 * i=1 : 8
 * 
 * so root.val is 2 which is smaller than 8.
 * 8 > root.val, we should move right and since 2 is smaller than 8 its not a potential candidate of being the closest greater value.
 * We move left reached null.
 * 
 * Came out of BST iteration and since no closest greater element is found thus push -1 to res.
 * and insert arr[i] to bST.
 * 
 * Now res looks like : [-1,-1] and BST looks like
 * 
 *                                         2
 *                                              8
 * 
 * So for every ith index BST is only containing the element left of it and thus we simply is finding the closest greater element for it in BST.
 * 
 */
function ceilingOnLeftSide1(arr: number[]) {
    if (arr.length === 0) return;
    let res: number[] = [];
    res.push(-1);
    let root = new BST<number>(arr[0]);
    for (let i = 1; i < arr.length; i++) {
        let x = arr[i];
        let current: BST<number> | null = root;
        let ceil = -1;
        while (current !== null) {
            if (x < current.val) {
                ceil = current.val;
                current = current.left;
            } else if (x > current.val) {
                current = current.right;
            } else {
                ceil = current.val;
                break;
            }
        }
        res.push(ceil);
        root.insert(root, arr[i]);
    }
    return res;
}

console.log(ceilingOnLeftSide1([2, 8, 30,15,25,12]));
