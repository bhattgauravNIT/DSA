/**Given an array of numbers where arr[i] denotes the number of pages of a book.
 * Given a k value which denotes the number of students who needs to go through all the pages of books.
 * 
 * Allocate the pages in such a way that we can minimize the max number of pages read by a student.
 * Constraint is a single students can read contagious books only.
 * 
 * For ex:
 * arr = [10,20,30,40]
 * k=2
 * 
 * So there are two students
 * 
 * One possible way is student1 reads all the books i,e 10+20+30+40 and student2 reads nothing
 * so we get (100,0) Max value is 100.
 * 
 * Another possible way of assignment is [10,20] by student 1 and [30,40] by student 2
 * so (30,70), Max is 70.
 * 
 * Another possible way is [10,20,30],[40]
 * so (60,40), Max is 60
 * 
 * we need to minimize the max so Min of (100,70,60) is 60 so o/p : 60
 * 
 * 
 * For ex: arr [ 10,20,30]
 * k=1
 * 
 * Since there is only one student so he has to read all the books and thus o/p: 60
 * 
 * For ex: arr = [10,5,30,1,2,5,10,10]
 * k=3 so there are 3 students
 * 
 * most optimal way in which we can minimize the max book pages read by a student is: 30 i,e
 * [10,5],[30],[1,2,5,10,10]
 */

/**Approach1: 0(2^n),0(n) */
function minPageAllocation(arr: number[], n: number, k: number) {
    if (n === 0) return 0;
    if (k === 1) return getSum(arr, 0, n - 1);
    if (n === 1) return arr[0];
    let res = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < n; i++) {
        res = Math.min(res, Math.max(minPageAllocation(arr, i, k - 1), getSum(arr, i, n - 1)))
    }
    return res;
}

function getSum(arr: number[], start: number, end: number) {
    let sum = 0;
    for (let i = start; i <= end; i++) {
        sum += arr[i];
    }
    return sum;
}