**Arrays**

Array are contagious memory location for ex:

0     1      2      3      4    -> Index
x     x+y   x+2y    x+3y   x+4y   -> Address

So we can see the address have a relation with index: 

x + i*y is the address corresponding to any any index i. Thats why the array index start with 0 as the 0th index 
address is x which is i =0 , x+ 0*y = x

- Due to contagious memory allocation getting any index value is 0(1) time as we are simply accessing the value at address x + i*y.
- Caching. According to mem limit, the corresponding values are generally stored in cache memory which gives very quick access.

If we say subSets of arrays or subsets of string, it means the order of elements not need to be contagious
Ex: arr = [1,2,3]

Subsets are [1],[2],[3],[1,2],[2,3],[1,3],[1,2,3].

Power set of this will be or subSequence will be [1],[2],[3],[1,2],[2,3],[1,3],[1,2,3],[] (So power set or subsequence includes empty array).

Sub array however are contagious ex: [1],[2],[3],[1,2],[2,3],[1,2,3].