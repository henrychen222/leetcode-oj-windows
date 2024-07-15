/*
05/26/24 night

reference: https://leetcode.cn/circle/discuss/62U280/
Example problem: https://leetcode.com/problems/maximum-sum-of-subsequence-with-non-adjacent-elements/
*/
function SegmentTreeNode(nodeArray) {
    let newNode = [0, 0, 0, 0], n = nodeArray.length, h = Math.ceil(Math.log2(n)), len = 2 * 2 ** h, a = Array(len).fill(newNode);
    initializeFromArray();
    return { update, query, tree }
    function initializeFromArray() {
        for (let i = 0; i < n; i++) a[n + i] = nodeArray[i];
        for (let i = n - 1; i >= 1; i--) pushup(i);
    }
    function update(pos, v) {
        a[n + pos] = v;
        for (let i = parent(n + pos); i >= 1; i = parent(i)) pushup(i);
    }
    function pushup(i) {
        a[i] = f(a[left(i)], a[right(i)]);
    }
    function query(l, r) { // [L, R)
        let resL = resR = newNode;
        if (l >= r) return 0;
        l += n;
        r += n;
        for (; l < r; l = parent(l), r = parent(r)) {
            if (l & 1) resL = f(resL, a[l++]);
            if (r & 1) resR = f(a[--r], resR); // fix
            // if (r & 1) resR = f(resR, a[--r]);
        }
        return f(resL, resR);
    }
    function f(x, y) {
        /*
        a: cover first number
        b: cover last number
        c: not cover first and last number
        d: cover both first and last number
        */
        let [a1, b1, c1, d1] = x, [a2, b2, c2, d2] = y;
        return [Math.max(a1 + Math.max(a2, c2), d1 + c2), Math.max(b1 + b2, c1 + Math.max(b2, d2)),
            Math.max(b1 + c2, c1 + Math.max(a2, c2)), Math.max(a1 + Math.max(d2, b2), d1 + b2)];
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