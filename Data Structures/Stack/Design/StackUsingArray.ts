/**Stack can be easily implemented using array:
 * 
 * 1. Push - push elemnets to array
 * 2. Pop - remove the last element from the array and return it.
 * 3. Peek -  return the last element from the array
 * 4. Size - Gives the occupied size of the array/stack that we are using
 * 5. IsEmpty - Checks wether the stack is empty or not.
 */
class MyStack<T> {
    private arr: T[];

    constructor() {
        this.arr = [];
    }

    /**Approach: O(1) */
    push(value: T): void {
        this.arr.push(value);
    }

    /**Approach: O(1) */
    peek(): T | undefined {
        if (this.arr.length >= 1) {
            return this.arr[this.arr.length - 1];
        } else {
            return undefined;
        }
    }

    /**Approach: O(1) */
    pop(): T | undefined {
        if (this.arr.length >= 1) {
            let val = this.arr[this.arr.length - 1];
            this.arr.pop();
            return val;
        } else {
            return undefined;
        }
    }

    /**Approach: O(1) */
    size(): number {
        return this.arr.length;
    }

    /**Approach: O(1) */
    isEmpty(): boolean {
        return this.arr.length === 0;
    }
}

// Example usage
let stack = new MyStack<number>();
console.log(stack.pop());
stack.push(5);
stack.push(15);
stack.push(25);
console.log(stack.peek());
console.log(stack.pop());
stack.push(35);
console.log(stack.isEmpty());
console.log(stack.size());

// Stack of strings
let stringStack = new MyStack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(stringStack.peek());
console.log(stringStack.pop());
console.log(stringStack.isEmpty());
console.log(stringStack.size());
