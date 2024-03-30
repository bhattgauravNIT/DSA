/**Given n books in form of an array such that each element arr[i] resembels the number of pages in a book.
 * Given a k as the number fo students who can read the book.
 * 
 * A student can only read contigious books, distribute the  books in such a way that we can minimize the max number of
 * pages being allocated to a student to read.
 * 
 * Ex: arr = [10,20,30,40]
 * k=2  
 * 
 * So two students have to read all the books.
 * The alocationn can be like 
 * 1. 10 (book 1 to student 1) & 20,30,40 (for second student) so pages read are 10 & 90 , max is 90
 * 2. 10,20 (to student 1) & 30,40 (student 2)  so pages read are 30,70, max is 70
 * 3. 10,20,30 (to student 1) & 40 (student 2)  so pages read are 60,40 max is 60
 * 
 * Clearly in the 3rd distribution we have minimized the max pages read so o/p is 60.
 */