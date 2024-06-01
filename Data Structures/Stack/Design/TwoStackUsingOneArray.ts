/**The idea was to implement two different stacks using a same array in a class say TwoStack.
 * 
 * Say we have a 10 sized array. In js we can create a fixed size array via Array.apply(null, Array(10))
            .map(() => undefined);
           
    
   The naive idea was to partition this single array into two sub segmnets of say equal size 5 & 5.
   Then consider the first partition as stack1 and second partition as stack2.
   The problem with this approach was that say we didn't had anything in second partition and say
   firts partition gets full then it will be a overflow but however the array is still having space 
   for 5 elements .

   Thus we came up with a different approach.
   Consider two pointer top1 and top2 initially being at -1 and 10 respectively.

   Now as we invoke push1() meaning we wish to push in first stack we simply increment top1 and place the
   element at this.arr[this.top1] = val;

   Now for the firstStack in this way elements keeps get pushing towards the end and the top1 varibale
   is also getting pushed towards the end.
   So when we need to pop1(). We just have to remove the last element or the elemnet at which top1 is pointing
   to.

   In the similar way we create a top2 pointer which is initially at 10, i,e above the defined indexes of the
   array.
   Now as we push2() we keep on pushing them towards the front and the top2 pointer also gets pushed 
   towards front, now we need to pop2() we will take from the front as stack is first in last out
   so we simply make the element at which top2 is pointing as undefined.
   
   Ex:
   Say we push1(10)
   push1(20)
   push1(30)
   push1(40)
   push1(50)
                                    top1
                                     |
   so arr looks like    [10,20,30,40,50]

   Now say

   push2("Gaurav1");
   push2("Gaurav2");
   push2("Gaurav3");
   push2("Gaurav4");

   So it goes like 
                                   top1   top2
                                      |   |
   so arr looks like    [10,20,30,40,50,"Gaurav4","Gaurav3","Gaurav2","Gaurav1"]

   When top1<top2-1 || top2>top1+1 till then only we can fill this arr.
   We are saying above and not saying When top1<top2 || top2>top1 beacuse in above arr situation
   we have this only top1<top2 however there is no space to fill any element either in 
   stack 1 or in stack2.

   Now if we wish to pop1
   we will remove element of top1 and shift top1 backwards
   
   If we wish to pop2
   we will remove element from top2 and shift top2 forward.


 */

class TwoStack<T, U>{
    arr: T[] | U[] | null[];
    top1: number;
    top2: number;

    constructor() {
        this.arr = Array.apply(null, Array(10))
            .map(() => null);
        this.top1 = -1;
        this.top2 = 10;
    }

    push1(val: T | U): boolean {
        if (this.top1 < this.top2 - 1 && this.top1 <= this.arr.length) {
            this.top1++;
            this.arr[this.top1] = val;
            return true;
        }
        return false;
    }

    push2(val: T | U): boolean {
        if (this.top2 > this.top1 + 1 && this.top2 >= -1) {
            this.top2--;
            this.arr[this.top2] = val;
            return true;
        }
        return false;
    }

    peek1(): T | U | null {
        return this.arr[this.top1];
    }

    peek2(): T | U | null {
        return this.arr[this.top2];
    }

    pop1(): boolean {
        if (this.top1 > -1) {
            this.arr[this.top1] = null;
            this.top1--;
            return true;
        }
        return false;

    }

    pop2(): boolean {
        if (this.top2 < 10) {
            this.arr[this.top2] = null;
            this.top2++;
            return true;
        }
        return false;
    }

    size1(): number {
        return this.top1;
    }

    size2(): number {
        return this.top2;
    }
}

let twoStack = new TwoStack<number, String>();
twoStack.push1(10);
twoStack.push1(20);
twoStack.push1(30);
twoStack.push1(40);
twoStack.push1(50);
twoStack.push1(60);
twoStack.push2("Gaurav1");
twoStack.push2("Gaurav2");
twoStack.push2("Gaurav3");
twoStack.push2("Gaurav4");
twoStack.pop2();
twoStack.pop1();
console.log(twoStack.arr);
console.log(twoStack.peek1());
console.log(twoStack.peek2());