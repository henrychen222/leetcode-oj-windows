/*
03/30/24 noon
Example problem:
https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii
*/
function SegmentTreeRORQ(A) {
    let n = A.length, h = Math.ceil(Math.log2(n)), len = 2 * 2 ** h, a = Array(len).fill(0);
    initializeFromArray();
    return { update, query, tree }
    function initializeFromArray() {
        for (let i = 0; i < n; i++) a[n + i] = A[i];
        for (let i = n - 1; i >= 1; i--) pushup(i);
    }
    function update(pos, v) {
        a[n + pos] = v;
        for (let i = parent(n + pos); i >= 1; i = parent(i)) pushup(i);
    }
    function pushup(i) {
        a[i] = a[left(i)] | a[right(i)];
    }
    function query(l, r) { // [L, R)
        let or = 0;
        if (l >= r) return 0;
        l += n;
        r += n;
        for (; l < r; l = parent(l), r = parent(r)) {
            if (l & 1) or |= a[l++];
            if (r & 1) or |= a[--r];
        }
        return or;
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

