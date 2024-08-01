/**A priority queue is exactly similar to heap datastructure. It uses the concept of heaps only,
 * infact if we need to differenetiate that we can say that heap is a concept and priorty queue is a datastructre which
 * uses the conecpt of heap.
 * 
 * The task it to create a priority queue lest say a min priority queue and implemnt functions like
 * build this priority queue, top, pop, size, isEmpty().
 */

class PriorityQueue<T> {
    input: T[];
    constructor(input: T[]) {
        this.input = input;
    }

    buildMinHeap() {
    }
}

let pq = new PriorityQueue([10, 20, 30]);
