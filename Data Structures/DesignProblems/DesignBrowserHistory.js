/**The problem is to design a browser history.
 * 
 * BrowserHistory browserHistory = new BrowserHistory("leetcode.com");
 * browserHistory.visit("google.com");       // You are in "leetcode.com". Visit "google.com"
 * browserHistory.visit("facebook.com");     // You are in "google.com". Visit "facebook.com"
 * browserHistory.visit("youtube.com");      // You are in "facebook.com". Visit "youtube.com"
 * browserHistory.back(1);                   // You are in "youtube.com", move back to "facebook.com" return "facebook.com"
 * browserHistory.back(1);                   // You are in "facebook.com", move back to "google.com" return "google.com"
 * browserHistory.forward(1);                // You are in "google.com", move forward to "facebook.com" return "facebook.com"
 * browserHistory.visit("linkedin.com");     // You are in "facebook.com". Visit "linkedin.com"
 * browserHistory.forward(2);                // You are in "linkedin.com", you cannot move forward any steps.
 * browserHistory.back(2);                   // You are in "linkedin.com", move back two steps to "facebook.com" then to "google.com". return "google.com"
 * browserHistory.back(7);                   // You are in "google.com", you can move back only one step to "leetcode.com". return "leetcode.com"
 * 
 */

class DListNode {
    constructor(data, prev = null, next = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

class BrowserHistory {
    constructor(homepage) {
        let n = new DListNode(homepage);
        this.head = n;
        this.size = 1;
        this.current = this.head;
        this.currentIndex = 1;
    }

    visit(url) {
        let node = new DListNode(url);
        if (this.current.next !== null) {
            let val = this.size - this.currentIndex;
            this.size = this.size - val;
        }
        node.prev = this.current;
        this.current.next = node;
        this.current = this.current.next;
        this.size++;
        this.currentIndex++;
    }

    back(steps) {
        let diff = this.currentIndex - steps;
        while (this.currentIndex > diff && this.currentIndex > 1) {
            this.currentIndex--;
            if (this.current !== null) {
                this.current = this.current.prev;
            }

        }
        return this.current.data;
    }

    forward(steps) {
        let diff = this.currentIndex + steps;
        while (this.currentIndex < diff && this.currentIndex < this.size) {
            this.currentIndex++;
            this.current = this.current.next;
        }
        return this.current.data;
    }
}