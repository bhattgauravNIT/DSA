/**Given a char array and the frequencies associated with it. The task is to encode the string or say compress the
 * string such that it can be decompressed.
 * 
 * Huffman algo deals with no loss compression i,e a compressed string once decompressed does not result in loss in value
 * in the string.
 * 
 * For ex: When we upload a picture in social media there happens compression however its not entirely
 * loss less compression as the quality of the picture is distorted to some extent. However huff man ensures that there
 * is no compression loss.
 * 
 * Lets understand this.
 * 
 * How we can encode/compress a string.
 * 
 * say string = "aaaabbbbbaaaaccccc..........."
 * 
 * i,e the string is having in total 100 occurrence of chars which are only a,b and c.
 * So if string length is 100, a say is present x times where x <= 100.
 * So b will be present y = x-100 times
 * and c will be present 100 -x -y times.
 * 
 * So say a is present 70 times or has a frequency of 70.
 * b is present 20 times or has frequency 20
 * c is present 10 times or has frequency 10.
 * 
 * Now this string str can be compressed say using ascii code as its unique of every char.
 * 
 * 1 ascii takes 8 bits and this string is of length 100 so in total if we wish convert this string to a compressed
 * form and send it over to a network it will take 8*100 = 800 bits.
 * 
 * 2. So we can do better if we consider fixed bits representation.
 * Since there are only 3 chars in this string so 3 bits can be used to represent this string.
 * 
 * So say 001 - a
 *        010 - b
 *        100 - c   
 * 
 * so in total there are 100 chars thus we need 100 * 3 = 300 bits to send it over a network.  
 * 
 * 3. Another optimized way of encoding or compressing it will be to use fixed 2 bits representation since there are
 * only 3 type of chars in this string
 * 
 *       00 - a
 *       01 - b
 *       10 - c 
 * 
 * so in total there are 100 chars thus we need 100 * 2 bits = 200 bits to send it over a network.
 * 
 * 4. Can we still do better so the idea is to use huffman coding algo.
 * 
 * It uses variable bits representation or variable length encoding and no representation of any char should have prefix of other chars representation.
 * 
 * So lets take the same example to understand this.
 * say the string which we are encoding is "abc"
 * 
 * Say we got variable length encoding for the input string as:
 * 
 * a - 1
 * b - 0
 * c - 11
 * 
 * now while retrieval of this compressed or during decompression we got as 1110
 * so it can be decompressed as acb or cab thus its not the correct encoding and because we have a encoding of 'a' which is 1 as prefixed
 * in c's encoding thus it has given rise to such situation.
 * 
 * Thus in huffman variable length encoding there should be no representation of any char with prefix of other chars representation.
 * 
 * So in huffman algo there are some key points:
 * 
 * 1) there should be no representation of any char with prefix of other chars representation.
 * 2) Highest frequency char is represented with smallest encoding and smallest frequency char is represented with highest length encoding.
 * 
 * 
 * Now lets understand how we can achieve huffman encoding.
 * 
 * For ex: chars = ['a','d','b','e','f']
 *         frequencies = [10,50,20,40,80]
 * 
 * 
 * 
 * So we will be building a huffman tree, this tree will be having certain characteristic.
 * 
 * 1) All input characters will come in leaf node.
 * 2) Every left child is encoded to 0 and every right child is encoded to 1.
 * 3) Every root to leaf path represents huffman code for that leaf input char.
 * 4) Highest frequency char is represented with smallest encoding and smallest frequency char is represented with highest length encoding. 
 * 5) Every root's frequency is sum of frequency of its left and right child.
 * 
 * 
 *                                               [$,200]
 *                                   0                             1
 *                                 [f,80]                       [$,120]
 *                                                      0                     1
 *                                                    [d,50]                [$,70]
 *                                                                     0               1 
 *                                                                   [$,30]         [e,40]
 *                                                                 0          1
 *                                                              [a,10]     [b,20]
 * 
 * So all root to leaf paths will give the huffman code for that lead char.
 * 
 * So the main idea is to implement this approach.
 * 
 */


/**Approach: 
 * 
 * The tree is having 4 properties i,e 
 * 
 * char: string;
   frequency: number;
   left: Tree | null;
   right: Tree | null;
 * 
    For dummy root nodes we mark char as $ and since all input chars are to be leaves.
 * */
class Tree {
    char: string;
    frequency: number;
    left: Tree | null;
    right: Tree | null;

    constructor(char: string, frequency: number, left: Tree | null = null, right: Tree | null = null) {
        this.char = char;
        this.frequency = frequency;
        this.left = left;
        this.right = right;
    }
}

/**
 * This priority queue of type Tree internally implements minHeap based on frequency nodes.
 */
class PriorityQueue {
    minHeap: Tree[];

    constructor() {
        this.minHeap = [];
    }

    insert(node: Tree) {
        this.minHeap.push(node);
        if (this.minHeap.length === 1) return;
        let currentIndex = this.minHeap.length - 1
        while (currentIndex >= 0) {
            let parentIndex = this.getParentIndex(currentIndex);
            if (parentIndex > -1) {
                if (this.minHeap[parentIndex].frequency > this.minHeap[currentIndex].frequency) {
                    this.swap(parentIndex, currentIndex);
                    currentIndex = parentIndex;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }

    extractMin() {
        if (this.minHeap.length === 0) return null;
        this.swap(0, this.minHeap.length - 1);
        const minNode = this.minHeap.pop();
        if (this.minHeap.length > 0) {
            this.minHeapfiy(0);
        }

        return minNode;
    }

    getSize() {
        return this.minHeap.length;
    }

    private minHeapfiy(index: number) {
        let min = index;
        let leftChild = this.leftChild(index);
        let rightChild = this.rightChild(index);
        if (leftChild && this.minHeap[leftChild].frequency < this.minHeap[min].frequency) {
            min = leftChild;
        }
        if (rightChild && this.minHeap[rightChild].frequency < this.minHeap[min].frequency) {
            min = rightChild;
        }
        if (min !== index) {
            this.swap(index, min);
            this.minHeapfiy(min);
        }
    }

    private leftChild(index: number) {
        let lc = 2 * index + 1;
        if (lc < this.minHeap.length) {
            return lc;
        }
    }

    private rightChild(index: number) {
        let rc = 2 * index + 2;
        if (rc < this.minHeap.length) {
            return rc;
        }
    }

    private getParentIndex(index: number): number {
        let parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex >= 0) {
            return parentIndex;
        }
        return -1;
    }

    private swap(index1: number, index2: number) {
        let temp = this.minHeap[index1];
        this.minHeap[index1] = this.minHeap[index2];
        this.minHeap[index2] = temp;
    }
}


/**
 * 
 *   We first need to implement the Huffman after that will be simply traversing all the root to leaf paths and if we go to left we say 0 and if go to
 *   right we say 1 and thus we will be able to get variable encoded string for all the input chars.
 * 
 *   Question is how can we formulate the tree.
 *   So we will be using a priority queue of tree Nodes which will internally be implementing minHeap based on the frequencies of the node's char and will be 
 *   making Huffman tree in bottom to top approach.
 *   
 *   So we make all the nodes via provided input array of char and corresponding freq and push it to pq.
 * 
 *   For ex: 
 *   ['a','d','b','e','f']
 *   [10, 50, 20, 40, 80]
 * 
 *   So at first step the priority queue looks like:
 * 
 *   1. Pq: [a,10],[b,20],[e,40],[d,50],[f,80]
 * 
 *   Now we do extractMin from the pq for two times to get the two min frequency leaves nodes first thus we take out [a,10] and [b,20]
 *   so our priority queue now looks like.
 * 
 * 
 *   2. Pq:        [$,30]            , [e,40],[d,50],[f,80]
 *      
 *           [a,10]     [b,20]
 * 
 *   We formulate root node using these two extracted item from pq as root = new Tree("$", leftChild.frequency + rightChild.frequency) as root's frequency is
 *   the sum of its child frequencies and all provided chars are the leaves of the tree thus root should have a dummy character like $.
 * 
 *   We mark root.left as first extracted node from pq and root.right as second extracted node from pq.
 * 
 *   now our pq looks like
 *   
 *                           
 *  3. pq:          [d,50],                      [$,70]                 ,  [f,80]
 *                                     [$,30]              [e,40]         
 * 
 *                               [a,10]     [b,20]  
 * 
 * 
 * 
 * 
 *  Again we repeat the same process so our pq will be
 *  4. pq:        [f,80],                          [$,120]                              
 *                                [d,50]                          [$,70]                 
 *                                                     [$,30]                  [e,40]         
 * 
 *                                                [a,10]     [b,20] 
 * 
 * 
 *  Again we repeat the same process so our pq will be
 *  5.  
 * 
 * 
 *                                     [$,200]
 *                     [f,80]                           [$,120]                              
 *                                             [d,50]               [$,70]                 
 *                                                         [$,30]            [e,40]         
 * 
 *                                                    [a,10]     [b,20] 
 * 
 * 
 *                   
 * So with this approach we will be able to create a huffman tree now the task is simply to traverse all root to leaf paths and if we find leaf simply
 * mark that currentEncoding that the encoding found for that character.
 * 
 */
function compressHuffman(chars: string[], freq: number[]) {
    let node: Tree;
    let pq = new PriorityQueue();
    for (let i = 0; i < chars.length; i++) {
        node = new Tree(chars[i], freq[i]);
        pq.insert(node);
    }
    let root: Tree | null = null;
    while (pq.getSize() > 1) {
        let leftChild = pq.extractMin();
        let rightChild = pq.extractMin();
        if (leftChild && rightChild) {
            root = new Tree("$", leftChild.frequency + rightChild.frequency);
            root.left = leftChild;
            root.right = rightChild;
            pq.insert(root);
        }
    }
    let obj: { char: string, codedValue: string }[] = [];
    obj = getEncoding(root, obj);
    for (let item of obj) {
        console.log(`${item.char}` + ' -> ' + `${item.codedValue}`);
    }
}


/**
 * Approach: 0(n),0(h)
 * 
 * Here we are using an obj which is nothing but a array of { char: string, codedValue: string }
 * 
 * Now
 * if(root === null) we simply return the obj;
     if(root.character !== '$' this means that we have reached a leaf node and thus whatever is the currentEncoding is till now we push that string value
     corresponding to the found character){

          obj.push(char: root.character, codedValue: currentEncoding);
     }

     when we move left we mark that as 0 thus to currentEncoding + '0'
     recursivelyCall for getEncoding for left root with obj and currentEncoding as + '0' i,e getEncoding(root.left, obj, currentEncoding + '0');
     
     when we move right we mark that as 0 thus to currentEncoding + '1'
     recursivelyCall for getEncoding for right root with obj and currentEncoding as + '1' i,e getEncoding(root.right, obj, currentEncoding + '
 * 
 * 
 */
function getEncoding(root: Tree | null, obj: { char: string, codedValue: string }[], currentCode = ''): { char: string, codedValue: string }[] {
    if (root === null) return obj;
    if (root.char !== '$') {
        let item = { char: root.char, codedValue: currentCode };
        obj.push(item);
    }
    getEncoding(root.left, obj, currentCode + '0');
    return getEncoding(root.right, obj, currentCode + '1');
}

compressHuffman(['a', 'd', 'b', 'e', 'f'], [10, 50, 20, 40, 80]);
