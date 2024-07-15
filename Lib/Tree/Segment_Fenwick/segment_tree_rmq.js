/*
05/28/22 afternoon   08/13/23 evening reorganize
Example problem:

https://leetcode.com/problems/dinner-plate-stacks/  (need to set ini = 0)
https://leetcode.com/problems/booking-concert-tickets-in-groups/ (need to set ini = 0, keep query ini = MAX_SAFE_INTEGER)
https://leetcode.com/problems/maximum-distance-between-a-pair-of-values/
*/

// ------------------------------- range min query -----------------------------------------------------
function SegmentTreeRMQ(input) { // range min query
    let n, h, a;
    let ini = Number.MAX_SAFE_INTEGER; // may need to set to 0 for some problem
    if (Number.isInteger(input)) {
        n = input;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(ini);
        h = a.length / 2;
    } else {
        n = input.length;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(ini);
        initializeFromArray();
        h = a.length / 2;
    }
    return { update, query, tree }
    // return { update, query, firstle, lastle, tree }
    function initializeFromArray() {
        for (let i = 0; i < n; i++) a[h + i] = input[i];
        for (let i = h - 1; i >= 1; i--) pushup(i);
    }
    function update(pos, v) {
        a[h + pos] = v;
        for (let i = parent(h + pos); i >= 1; i = parent(i)) pushup(i);
    }
    function pushup(i) {
        a[i] = f(a[left(i)], a[right(i)]);
    }
    function query(l, r) {
        return Query(l, r + 1);
    }
    function Query(l, r) { // [L, R)
        let res = ini;
        if (l >= r) return res;
        l += h;
        r += h;
        for (; l < r; l = parent(l), r = parent(r)) {
            if (l & 1) res = f(res, a[l++]);
            if (r & 1) res = f(res, a[--r]);
        }
        return res;
    }
    function f(x, y) {
        return Math.min(x, y);
    }
    // function firstle(l, v) {
    //     if (l >= h) return -1;
    //     let cur = h + l;
    //     while (1) {
    //         if (a[cur] <= v) {
    //             if (cur >= h) return cur - h;
    //             cur = left(cur);
    //         } else {
    //             cur++;
    //             if ((cur & cur - 1) == 0) return -1;
    //             if (cur % 2 == 0) cur = parent(cur);
    //         }
    //     }
    // }
    // function lastle(l, v) {
    //     if (l < 0) return -1;
    //     let cur = h + l;
    //     while (1) {
    //         if (a[cur] <= v) {
    //             if (cur >= h) return cur - h;
    //             cur = right(cur);
    //         } else {
    //             if ((cur & cur - 1) == 0) return -1;
    //             cur--;
    //             if (cur % 2 != 0) cur = parent(cur);
    //         }
    //     }
    // }
    function parent(i) {
        return i >> 1;
    }
    function left(i) {
        return 2 * i;
    }
    function right(i) {
        return 2 * i + 1;
    }
    function tree() {
        return a;
    }
}

// ------------------------------- range max query -----------------------------------------------------
/*
https://leetcode.com/problems/jump-game-vi/
https://leetcode.com/problems/falling-squares/
https://leetcode.com/problems/longest-increasing-subsequence-ii/
https://leetcode.com/problems/maximum-balanced-subsequence-sum/
*/
function SegmentTreeRMQ(input) { // range max query
    let n, h, a;
    let ini = Number.MIN_SAFE_INTEGER;
    if (Number.isInteger(input)) {
        n = input;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(ini);
        h = a.length / 2;
    } else {
        n = input.length;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(ini);
        initializeFromArray();
        h = a.length / 2;
    }
    return {update, query, tree}
    function initializeFromArray() {
        for (let i = 0; i < n; i++) a[h + i] = input[i];
        for (let i = h - 1; i >= 1; i--) pushup(i);
    }
    function update(pos, v) {
        a[h + pos] = v;
        for (let i = parent(h + pos); i >= 1; i = parent(i)) pushup(i);
    }
    function pushup(i) {
        a[i] = f(a[left(i)], a[right(i)]);
    }
    function query(l, r) {
        return Query(l, r + 1);
    }
    function Query(l, r) { // [L, R)
        let res = ini;
        if (l >= r) return res;
        l += h;
        r += h;
        for (; l < r; l = parent(l), r = parent(r)) {
            if (l & 1) res = f(res, a[l++]);
            if (r & 1) res = f(res, a[--r]);
        }
        return res;
    }
    function f(x, y) {
        return Math.max(x, y);
    }
    function parent(i) {
        return i >> 1;
    }
    function left(i) {
        return 2 * i;
    }
    function right(i) {
        return 2 * i + 1;
    }
    function tree() {
        return a;
    }
}