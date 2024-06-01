/**The task was to design a stack such that it supports push,pop and getMin in 0(1) time complexity.
 * 
 * For ex: if we perform queries on stack such as :
 * push(10),push(2),push(12), getMin();
 * 
 * O/p should be 2 
 * 
 * The idea is simply to use a auxStack which maintain the current min element of the stack.
 * 
 * So in push:
 * 
 * Initially for empty stack for first query we simply put the element in both the stack.
 * Now after this we simply push everything to the main stack but however we only push further elements in aux stack if 
 * the element to be pushed is smalleror equal than the top of the aux stack.
 * 
 * 
 * In pop:
 * 
 * If simply check that if the top of main stack which is to be poped is equal to the top of the aux stack or we can say
 * that top of the main stack is equal to the current min in the stack then we pop from both aux stack and mainStack.
 * If its not the case we simply pop from the mainStack.
 * 
 * In getMin:
 * 
 * We simply return the top of the aux stack.
 * 
 */

/**Approach1: 0(1),0(n) */
class Stack {
    mainStack: number[];
    auxStack: number[];
    constructor() {
        this.mainStack = [];
        this.auxStack = [];
    }
    /**Approach: 0(1) */
    push(val: number): void {
        if (this.mainStack.length === 0 && this.auxStack.length === 0) {
            this.mainStack.push(val);
            this.auxStack.push(val);
        } else {
            if (val <= this.auxStack[this.auxStack.length - 1]) {
                this.auxStack.push(val);
            }
            this.mainStack.push(val);
        }
    }
    /**Approach: 0(1) */
    pop(): number | undefined {
        if (this.mainStack.length > 0) {
            if (this.mainStack[this.mainStack.length - 1] === this.auxStack[this.auxStack.length - 1]) {
                this.auxStack.pop();
            }
            const val = this.mainStack[this.mainStack.length - 1];
            this.mainStack.pop();
            return val;
        }
        return undefined;
    }
    /**Approach: 0(1) */
    getMin(): number | undefined {
        if (this.auxStack.length > 0) {
            return this.auxStack[this.auxStack.length - 1];
        }
        return undefined;
    }
}

/**Approach2: 0(1),0(1): Assuming only positive numbers.
 * 
 * Previously we were using a additional stack to solve the probelm due to which it was 
 * getting 0(n) additional space so in order to achieve it in 0(1) aux space we can use a trick.
 * However it only works perfectly fine for positivbe numbers only.
 * The idea is to have a min varibale.
 * 
 * Initially when stack is empty and min is null , and we push first element in stack update
 * both stack and min varibale.
 * 
 * Now in other pushes if the current value is smaller than existing min varibale value
 * we simply insert (min-value) to top of the stack and update the min value varibale.
 * 
 * Now while poping if we find that the top element is negative than it means 
 * we can retrive the original top via simply the min value varibale and now the
 * prev smaller element can be updated to min varibale as this.min - this.stack[this.stack.length - 1];
 * 
 * GetMin() simply returns the varibale value of min.
 * 
 * Ex: stack.push(10),stack.push(12), stack.push(2), stack.pop();
 * 
 * So initially stack is empty push 10 and make min as 10.
 * 
 * 
 * 10               min = 10;
 * 
 * Now push 12, so 12 is not smaller than min so we simply push to stack
 * 
 * 12
 * 10              min = 10;
 * 
 * Now push 2, so 2 is smaller than min thus we push (2-min) to top of the stack and make min as 2.
 * 
 * -8
 * 12
 * 10             min = 2;
 * 
 * Now we have to pop and we encounter a negative element at top meaning its not the original value which
 * was pushed and thus we need to retrive the original value via min value and 
 * the previous smaller now has to be updated in min which is (min-currentTop) i,e (2-(-8)) = 10.
 * 
 * So stack becomes:
 * 
 * 12
 * 10              min = 10;
 * 
 * However if the top of the stack is positive only then we simply pop from the stack.
 * 
 */

class Stack1 {
    min: number | null = null;
    stack: number[];
    constructor() {
        this.stack = [];
    }
    push(val: number): void {
        if (this.min === null && this.stack.length === 0) {
            this.stack.push(val);
            this.min = val;
        } else {
            if (this.min !== null && val <= this.min) {
                this.stack.push(val - this.min);
                this.min = val;
            } else {
                this.stack.push(val);
            }
        }
    }
    pop(): number | undefined {
        if (this.stack.length > 0) {
            if (this.min !== null && this.stack[this.stack.length - 1] < 0) {
                const val = this.min;
                this.min = this.min - this.stack[this.stack.length - 1];
                this.stack.pop();
                return val;
            } else {
                this.stack.pop();
            }
        }
        return undefined;
    }

    getMin(): number | undefined {
        if (this.min === null) {
            return undefined;
        } else {
            return this.min;
        }
    }
}

let s = new Stack1();
s.push(5);
s.push(10);
s.push(20);
s.push(2);
s.push(6);
s.push(4);
console.log(s.getMin());
s.pop();
s.pop();
s.pop();
console.log(s.getMin());

/**Approach3: 0(1),0(1): Valid for negative numbers as well.
 * The problem with the above approach was that it was valid for only positive numbers
 * where we were checking if current val to be pushed is smaller or equal to current min then
 * we would have pushed val-min to stack.
 * Similarly while poping we were checking that if the top of the stack is negative meaning its corresponds
 * to a min value thus we would have returned min-top value. and poped.
 * 
 * The idea here will be somewhat similar however we will be using a different technique.
 * 
 * push;
 * 
 * Now initially when stack is empty then our min will be null so we put a case that will stack is
 * empty then push directly to stack and make min as val.
 * However if stack is not empty the check if the coming value is greater or smaller/equal to min.
 * If greater simply push to stack.
 * else push (2*val-min) to stack and make min as val.
 * 
 * Pop();
 * 
 * Now if the stack is empty simply return undefined however if its not.
 * If the top element is greater than smaller than simply pop an return the top
 * However if the element is smaller or equal to min then we need to retrive the original value as the
 * current value stored in stack is (2*val-min), however the actual value is stored in min so we simply
 * return the min but we need min to now point to prev smaller which means min = 2*min-top.
 * Simply pop().
 * 
 * GetMin()
 * return the min ;
 * 
 * Ex: push(5),10,20,2,6,4, pop(),pop(),push(2),pop(),push(1),pop()
 * 
 * 1. Initally stack is empty push 5 to stack and make min as 5.
 * 
 * stack = 5, min = 5
 * 
 * 2. Push 10.
 * 
 * 10 is greater than current min simply push to stack
 * 
 * 10
 * 5                     min =5
 * 
 * 
 * 3. Push 20: again val is greater than currentMin, simply push
 * 
 * 20
 * 10
 * 5                                  min =5
 * 
 * 4. push2:
 * 
 * Now 2 is smaller than current min so min should be min and we need to encode this 2 inside stack.
 * 
 * So stack.push(2*val-min) i,e -1 and min = val
 * 
 * -1                       min = 2
 * 20
 * 10
 * 5
 * 
 * 5. push 6 and 4 same case that val is greater so simply push to stack now the stack looks like
 * 
 * 4
 * 6
 * -1                       min = 2
 * 20
 * 10
 * 5
 * 
 * 
 * Now pop so stack top is greater than current min thus simply pop and return top
 * So stack loooks 
 * 
 * 
 * 6
 * -1                       min = 2
 * 20
 * 10
 * 5
 * 
 * Again pop so same stack top i,e 6 is greater than current min so simply pop
 * 
 * 
 * -1                       min = 2
 * 20
 * 10
 * 5
 * 
 * Now push(2)
 * 
 * So min is smaller or equal to val=2 thus we need to update min to 2 and encode this coming 2
 * which will be 2*min-val = 2 so push 2 to stack.
 * 
 * 2                          min = 2
 * -1                       
 * 20
 * 10
 * 5
 * 
 * Now pop()
 * 
 * so the top of the stack is smaller or equal to current min meaning its an encoded value thus the original
 * value is in min, thus we need to return min , Now before poping we need to update min to prev smaller
 * thus min =  2*min - val = 4-2 = 2. Now stack looks like
 * 
 *                           
 * -1                    min = 2   
 * 20
 * 10
 * 5
 * 
 * Now push 1
 * 
 * So 1 is smaller than current min thus we encode it before pushing to stack and now min should be 1.
 * So we push (2*val-min) = 2*1-2 = 0 to stack and update min to 1.
 * 
 * 0                     min = 1
 * -1                      
 * 20
 * 10
 * 5
 * 
 * Now pop so stack top is lesser than current min thus the value to be returned is present in min and
 * once pop is done we need to update min to prev min so min = 2*min -top;Now stack becomes
 * 
 * -1                min = 2                 
 * 20
 * 10
 * 5
 * 
 * Again pop so stack top is lesser than current min thus the value to be returned is present in min and
 * once pop is done we need to update min to prev min so min = 2*min -top;Now stack becomes
 * 
 * 20
 * 10
 * 5                         min = 5
 * 
 **/

class Stack2 {
    stack: number[];
    min: number | null;
    constructor() {
        this.stack = [];
        this.min = null;
    }
    push(val: number): void {
        if (this.stack.length === 0 && this.min === null) {
            this.stack.push(val);
            this.min = val;
        } else {
            if (this.min !== null && val <= this.min) {
                this.stack.push(2 * val - this.min);
                this.min = val;
            } else {
                this.stack.push(val);
            }
        }
    }
    pop(): number | undefined {
        if (this.stack.length === 0) {
            return undefined;
        } else {
            if (this.min !== null && this.stack[this.stack.length - 1] <= this.min) {
                const res = this.min;
                this.min = this.min * 2 - this.stack[this.stack.length - 1];
                this.stack.pop();
                return res;
            } else {
                const val = this.stack[this.stack.length - 1];
                this.stack.pop();
                return val;
            }
        }
    }
    getMin(): number | undefined {
        if (this.stack.length !== 0 && this.min !== null) {
            return this.min
        } else {
            return undefined;
        }
    }
}
