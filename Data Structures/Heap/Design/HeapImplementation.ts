/**The task is to design a min binary heap, add basic opeartions like getLeftChild, getRight child,
 * insert, getParent etc.
 */

class MinHeap {
    arr: number[];
    constructor() {
        this.arr = [];
    }

    /**Approach: 0(1),0(1)
     * 
     *                                       10
     *                            12                            15
     *                     20         50                   100      25
     *                45       40
     * 
     * Binary heap visual representation is complete binary tree but however its implemented as a array only,
     * so say our minHeap looks something like:
     * 
     * [10, 12, 15, 20, 50, 100, 25, 45, 40] ----------> level order traversal
     * 
     * Now say we want to getParent of any ith index in this minHeap array,
     * for i=0; its the root so parent is undefined so if (this.arr.length === 0 || index === 0) return;
     * 
     * for every rest index parent is simply Math.floor(i-1/2);
     * Thus we compute this operation and retunr the parentIndex to the caller. 
     */
    getParentIndex(index: number): number | undefined {
        if (this.arr.length === 0 || index === 0) return;
        const parentIndex = Math.floor((index - 1) / 2);
        return parentIndex;
    }

    /**Approach: 0(1),0(1)
     * 
     *                                         10
     *                            12                            15
     *                     20         50                   100      25
     *                45       40
     * 
     * Binary heap visual representation is complete binary tree but however its implemented as a array only,
     * so say our minHeap looks something like:
     * 
     * [10, 12, 15, 20, 50, 100, 25, 45, 40] ----------> level order traversal
     * 
     * Now we wish to get left child of any ith index
     * 
     * it can be seen as 2*i + 1.
     * 
     */
    getLeftChild(index: number): number | undefined {
        if (this.arr.length === 0) return;
        let leftChildIndex = 2 * index + 1;
        if (leftChildIndex < this.arr.length) {
            return leftChildIndex;
        }
    }


    /**Approach: 0(1),0(1)
     * 
     *                                         10
     *                            12                            15
     *                     20         50                   100      25
     *                45       40
     * 
     * Binary heap visual representation is complete binary tree but however its implemented as a array only,
     * so say our minHeap looks something like:
     * 
     * [10, 12, 15, 20, 50, 100, 25, 45, 40] ----------> level order traversal
     * 
     * Now we wish to get right child of any ith index
     * 
     * it can be seen as 2*i + 2.
     * 
     */
    getRightChild(index: number): number | undefined {
        if (this.arr.length === 0) return;
        let rightChildIndex = 2 * index + 2;
        if (rightChildIndex < this.arr.length) {
            return rightChildIndex;
        }
    }

    /**Approach: 0(log(n)),0(1)
     * 
     * A min heap follows the property that every root must be smaller than its desendent subTree.
     * Initailly when minBinaryHeap array is empty then simply means we are inserting root into the binary tree.
     * 
     * Now this means we insert at end of the array or push to end of array i,e  this.arr.push(val); and this inserted value
     * will have index this.arr[this.arr.length-1];
     * 
     * Now we check wether this iserted element is smaller than its parent if yes then if we keep it there at the initial inserted index
     * its gonna violate the minHeap property then every parent should be smaller than its children.
     * 
     * Thus we swap the parent and the children.
     * 
     * Now the index will start pointing to this swapped new parent.
     * Again we check if its smaller than its parent and we keep doing it till we reach the root or index 0.
     * 
     * If in the initial point only we see that this inserted value is greater than its root then its prefectly fine and we come out of the loop
     * immediately.
     * 
     * Since in worst case we may have to decent upto the root node i,e the inserted value is smaller even than the tree node than
     * we will be iterating till the height of the tree i,e edges between the root node and child leaf.
     * 
     * Thus height is nothing 0(log(n)) where n is the number of nodes in the tree.
     */
    insertInMinHeap(val: number): void {
        this.arr.push(val);
        let index = this.arr.length - 1;
        while (index > 0) {
            let parentindex = this.getParentIndex(index);
            if (parentindex !== undefined && this.arr[index] < this.arr[parentindex]) {
                let temp = this.arr[index];
                this.arr[index] = this.arr[parentindex];
                this.arr[parentindex] = temp;
                index = parentindex;
            } else {
                return;
            }
        }
    }
}

let minHeap = new MinHeap();
minHeap.insertInMinHeap(10);
minHeap.insertInMinHeap(20);
minHeap.insertInMinHeap(15);

minHeap.insertInMinHeap(40);
minHeap.insertInMinHeap(50);
minHeap.insertInMinHeap(100);
minHeap.insertInMinHeap(25);
minHeap.insertInMinHeap(45);
minHeap.insertInMinHeap(12);
console.log(minHeap.arr);
