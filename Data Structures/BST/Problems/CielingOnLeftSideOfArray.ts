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


/**Approach1: 0(n^2),0(1) */
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
 *
 *        
 * 
 *  [2, 8, 30,15,25,12]   
 * 
 * 
 *            2
 * 
 *                          
 * 
 *                               2
 *                                   8
 *                                          30
 *                                       15     
 *                                    12      25
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
