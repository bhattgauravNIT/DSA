/**Given an array of arrays or say array of object where each object has two properties one is weight and one is 
 * the value of that.
 * 
 * We are also given a knapsack or say a bag of certain capacity that this much weight it can hold.
 * The task is to place the items in this knapsack/bag in such a way that we can get the max value.
 * We are even allowed to place fractional weights in the bag.
 * 
 * For ex:
 * 
 * [{weight: 50, value: 600}, {weight: 20, value: 500}, {weight: 30, value: 400}]
 * knapsack capacity = 70.
 * 
 * o/p: 1140
 * 
 * Lets say we take i=1 i,e weight 20, its less than capacity of bag so its entire value can be added thus
 * 500.
 * 
 * we take i=2 i,e weight = 30, 30 is weight of current item and remaining weight now is 50.
 * 30 is less than remaining weight so we can take entire 30 thus value becomes
 * 500 + 400 = 900.
 * 
 * Now remaining weight of bag is 20
 * So we can take 20 kgs from 50 kg i=0 item and thus item value that we get is
 * 
 * 600/50 * 20 = 240.
 * 
 * Thus value is 900+240 = 1140 which is the max that we can get.
 * 
 * 
 * For ex: 
 * [{weight: 10, value: 200}, {weight: 5, value: 50}, {weight: 20, value: 100}]
 *  knapsack capacity = 15
 * 
 *  o/p: 250.
 * 
 * Lets say we choose i=1, weight is 5, which is less than 15, so we can place it inside the bag
 * remaining weight of bag = 10 and value now is 50.
 * 
 * Lets say we choose 10, remaining weight is 10, so we can place it inside bag.
 * now value we got is 200+50 = 250
 * 
 * This is the max value that we can get.
 */


/**Approach: 0(n logn),0(1)
 * 
 * Since the value given resembles value corresponding to that weight, i,e  
 * [{weight: 50, value: 600}, {weight: 20, value: 500}, {weight: 30, value: 400}] so for item 1, value 600 resembles 600 is value for weight of 50.
 * 
 * so we need to find the value per unit weight or say the fractional weight , so sort the array in descending order of value/weight.
 * This way we get the max profit yielding item per unit weight at first and so on. Now use the greedy way of first putting the max value item and keep continuing.
 * 
 * If the weight of the item is less than or equal to the capacity this means that the item entirely can be inserted into the bag and thus the capacity after the
 * item is being inserted into the bag will be capacity  - weight of the current iteration index element and profit will be simply the addition of value of that
 * current iteration element.
 * 
 * If in case the weight of item is not less than or equal to the capacity of the bag then we need to insert the item's weight in fractions and we will be sure
 * that after these fractions whatever the bag can accommodate after this there will be no space left in the bag so we break.
 * 
 * In order to compute the profit than we can obtain from that fractional weight we can simply say
 * 
 * capacity * (value/weight).
 * 
 * 
  */
function fractionalKnapsack(arr: number[][], capacity: number): number {
    arr.sort((a, b) => (b[1] / b[0]) - (a[1] / a[0]));
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] <= capacity) {
            res += arr[i][1];
            capacity = capacity - arr[i][0];
        } else {
            res += (arr[i][1] / arr[i][0]) * capacity;
            break;
        }
    }
    return res;
}

console.log(fractionalKnapsack([[50, 600], [ 20, 500], [30,400]], 70));
console.log(fractionalKnapsack([[10, 200], [ 5, 50], [20,100]], 15));
console.log(fractionalKnapsack([[10, 60], [20, 100], [30, 120]], 5));