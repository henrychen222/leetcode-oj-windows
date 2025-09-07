/*
06/04/22 evening

reference:
https://codeforces.com/contest/1675/submission/155979745

example problem:
https://leetcode.com/problems/design-a-text-editor/

https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner/ (for bfs shift())
https://leetcode.com/problems/implement-router
*/

class fastQueue {
    constructor() {
        this.m = {};
        this.first = 0;
        this.last = -1;
    }
    push(...args) {
        let i = 0;
        if (this.size() == 0) {
            this.first = this.last = 0;
            this.m[this.first] = args[i++];
        }
        for (; i < args.length; i++) this.m[++this.last] = args[i];
    }
    unshift(...args) {
        let i = 0;
        if (this.size() == 0) {
            this.first = this.last = 0;
            this.m[this.first] = args[i++];
        }
        for (; i < args.length; i++) this.m[--this.first] = args[i];
    }
    pop() {
        let res = this.m[this.last];
        delete this.m[this.last];
        this.last--;
        return res;
    }
    shift() {
        let res = this.m[this.first];
        delete this.m[this.first];
        this.first++;
        return res;
    }
    front() {
        return this.m[this.first];
    }
    back() {
        return this.m[this.last];
    }
    size() {
        if (this.first > this.last) return 0;
        return this.last - this.first + 1;
    }
    show() {
        return this.m;
    }
}

// canot compile in LC 04/06/25
// function Deque() {
//     let m = {}, first = 0, last = -1;
//     return { unshift, shift, push, pop, front, back, size, show }
//     function push(...args) {
//         let i = 0;
//         if (size() == 0) {
//             first = last = 0;
//             m[first] = args[i++];
//         }
//         for (; i < args.length; i++) m[++last] = args[i];
//     }
//     function unshift(...args) {
//         let i = 0;
//         if (size() == 0) {
//             first = last = 0;
//             m[first] = args[i++];
//         }
//         for (; i < args.length; i++) m[--first] = args[i];
//     }
//     function pop() {
//         let res = m[last];
//         delete m[last];
//         last--;
//         return res;
//     }
//     function shift() {
//         let res = m[first];
//         delete m[first];
//         first++;
//         return res;
//     }
//     function front() {
//         return m[first];
//     }
//     function back() {
//         return m[last];
//     }
//     function size() {
//         if (first > last) return 0;
//         return last - first + 1;
//     }
//     function show() {
//         return m;
//     }
// }