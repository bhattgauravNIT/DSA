/**Given a binary tree the task is to serialize and deserialize it.
 * 
 * By serialization we means that to be able to convert a tree into a array or string representation.
 * By deserialization we means to be able to convert this serialized tree back to its original tree representation.
 * 
 * The practical example of this is lest suppose we need to store a send a tree into a file to some other network
 * so we serialize it and store it in a file and send it.
 * 
 * Now the receiver receives the file deserialize its content and get the tree back.
 * 
 * Another example of it is suppose i am coding for a coding platform like leet code and I have created a question,
 * in which input is a tree. So i will send this input to the user in form of an array which is called serialization.
 * 
 * Now i will also ask the user to return me an array say, so while checking his solution i will convert or deserialize 
 * this into a tree and check with help of test cases.
 * 
 * 
 * Ex:              10
 *               20    30
 *             40  50     60    
 */

/**Approach1: Serialization: 0(n),0(h), Deserialization: 0(n^2)
 * 
 * One possible way is to store the tree in inorder and preOrder arrays, because using these two arrays we can create our
 * binary tree back.
 * 
 * Ex:              10
 *               20    30
 *             40  50     60 
 *           
 * Inorder = [40,20,50,10,30,60]
 * PreOrder = [10,20,40,50,30,60]
 * 
 * So once we serialize this binary tree and obtained the preOrder and inOrder traversals, now we can deserialize it
 * using the concept that preOrder stores root and if we find the root in inOrder than everything to left of this root
 * is the left subTree of it and everything to the right of it is the right subTree i,e
 *                            
 *  For preorder[0] = 10
 *  If we find 10 in inorder than everything from start which is initially 0 till (foundIndex of 10 in preOrder)-1
 *  lies in the left subTree of for 10.
 * 
 *  Everything from (foundIndex of 10 in preOrder)+1 till end which is initially 5 (i,e length of array-1) lies in right
 *  subTree of it.
 * 
 *                                          10
 *                               [40,20,50]   [30,60]
 * 
 * 
 * 
 * Now for 20 i,e preorder[1] = 20
 * If we find it in InOrder array so we can say than everything from start which is initially 0 till (foundIndex of 20 in preOrder)-1
 * lies in the left subTree of for 20.
 * 
 * Everything from (foundIndex of 20 in preOrder)+1 till end which is now (foundIndex of 10)-1 lies in right
 *  subTree of it.
 * 
 *                                          10
 *                                     20          [30,60]
 *                                40       50
 *  and so on..............
 * 
 * In this way we can serialize and deserialize a given binary tree.
 *                                           
 */

class Tree<T> {
    data: T;
    left: Tree<T> | null;
    right: Tree<T> | null;
    preOrder: number = 0;

    constructor(data: T, left: Tree<T> | null = null, right: Tree<T> | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    /**Approach: 0(n), 0(h) */
    serialize(root: Tree<T> | null): { inOrder: Tree<T>[], preOrder: Tree<T>[] } {
        let inOrder: Tree<T>[] = this.getInOrder(root, []);
        let preOrder: Tree<T>[] = this.getPreOrder(root, []);
        return { inOrder: inOrder, preOrder: preOrder };
    }

    getInOrder(root: Tree<T> | null, inorder: Tree<T>[]): Tree<T>[] {
        if (root === null) return inorder;
        inorder = this.getInOrder(root.left, inorder);
        inorder.push(root);
        inorder = this.getInOrder(root.right, inorder);
        return inorder;
    }

    getPreOrder(root: Tree<T> | null, preOrder: Tree<T>[]): Tree<T>[] {
        if (root === null) return preOrder;
        preOrder.push(root);
        preOrder = this.getInOrder(root.left, preOrder);
        preOrder = this.getInOrder(root.right, preOrder);
        return preOrder;
    }

    /**Approach: 0(n^2) */
    deserialize(serializedObj: { inOrder: Tree<T>[], preOrder: Tree<T>[] }, start: number, end: number): Tree<T> | null {
        if (serializedObj.inOrder.length === 0 || serializedObj.preOrder.length === 0) return null;
        if (start < end) return null;
        let root = serializedObj.inOrder[this.preOrder];
        this.preOrder++;
        let index: number = -1;
        for (let i = 0; i < serializedObj.inOrder.length; i++) {
            if (serializedObj.inOrder[i].data === root.data) {
                index = i;
                break;
            }
        }
        this.deserialize({ inOrder: serializedObj.inOrder, preOrder: serializedObj.preOrder }, start, index - 1);
        this.deserialize({ inOrder: serializedObj.inOrder, preOrder: serializedObj.preOrder }, index + 1, end);
        return root;
    }
}


/**Approach2: Serialization: 0(n),0(n), Deserialization: 0(n),0(n)
 * 
 * Clearly the Serialization: 0(n),0(h), Deserialization: 0(n^2) in the first approach and we can modify it to be simpler and more efficient.
 * 
 * the idea for serialization is to store any depth first search approach of the given binary tree and mark the null nodes as -1.
 * 
 * For ex:          10
 *               20    30
 *             
 * 
 * Lets say we serialize it using preOrder traversal with null nodes marked as -1, assuming there is no -1 value present in the tree.
 * So preOrder for the above tree will look like: [10,20,-1,-1,30,-1,-1]
 * Clearly in order to achiever serialization we have to traverse through all the nodes of the binary tree and the recursion call
 * stack at max will have 0(h) nodes present in it. Thus overall time complexity is 0(n),0(h).
 * 
 * Now we deserialize this preOrder traversal in preOrder traversal fashion only.
 * [10,20,-1,-1,30,-1,-1]
 * 
 * Lets understand this, we maintain a preIndex variable to iterate over the entire preOrder array obtained after serialization.
 * So 
 * 
 * initially preIndex = 0, and value of preOrder[preIndex] !== -1.
 * Now we make a node of tree with preOrder[preIndex] and recursively call root.left = deserialize(preOrder).
 * This root.left is done to link every parentCall with its left subTree formed and same for right subTree.
 * Lets understand this with the help of an example.
 * 
 * Say tree is 
 *                               1
 *                         2         3
 * 
 * So after serialization the preOrder arr = [1,2,-1,-1,3,-1,-1]
 * Now 
 * 
 * initially preIndex = 0, index!== 7 and value of preOrder[preIndex] !== -1.
 * root = 1
 *       root.left = deserialize()
 * 
 * preIndex = 1, index !== 7 and value of preOrder[preIndex] !== -1.
 * root = 2
 *        root.left = deserialize()
 * 
 * preIndex = 2, index !== 7 and value of preOrder[preIndex] === -1.
 *       return null.
 *       
 *      root.right
 *      preIndex = 3, index !== 7 and value of preOrder[preIndex] === -1.
 *      return null.
 * 
 * Left and right calls complete for 2. Tree formed till now             2
 *                                                                null        null 
 * 
 *  Call goes back to parent i,e 1 and root.left gets attached to this above formulated tree.
 * 
 * Now left call is complete for 1 so now right call has to happen.
 * 
 * preIndex = 4  ,index !== 7 and value of preOrder[preIndex] !== -1.   
 *  root = 3
 *        root.left =  deserialize()
 * 
 * preIndex = 5, index !== 7 and value of preOrder[preIndex] === -1.  
 *       returns null
 *     calls right of 3 and again null is returned . Tree formed till now            3
 *                                                                              null   null
 * 
 * This gets connected as right subTree for 1.
 * 
 * Thus entire tree gets formed:
 * 
 *                                               1
 *                                         2                3
 *                                 null        null     null   null
  */

class Tree1 {
    data: number;
    left: Tree1 | null;
    right: Tree1 | null;
    preIndex: number = 0;

    constructor(data: number, left: Tree1 | null = null, right: Tree1 | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    serialize(root: Tree1 | null, preOrder: number[]) {
        if (root === null) preOrder.push(-1);
        if (root && root.data) {
            preOrder.push(root?.data);
            this.serialize(root?.left, preOrder);
            this.serialize(root.right, preOrder);
        }
        return preOrder;
    }


    deserialize(preOrder: number[]): Tree1 | null {
        if (this.preIndex === preOrder.length) return null;
        const val = preOrder[this.preIndex];
        this.preIndex++;
        if (val === -1) return null;
        let root = new Tree1(val);
        root.left = this.deserialize(preOrder);
        root.right = this.deserialize(preOrder);
        return root;
    }
}

let root = new Tree1(10);
root.left = new Tree1(20);
root.right = new Tree1(30);
console.log(root.deserialize(root.serialize(root, [])));