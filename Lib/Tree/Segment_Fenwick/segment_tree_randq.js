/*
06/01/24 night
Example problem:
(question changed from and -> or)
https://leetcode.com/problems/find-subarray-with-bitwise-and-closest-to-k/ (3171)
https://leetcode.com/problems/find-subarray-with-bitwise-or-closest-to-k/
https://leetcode.com/problems/find-a-value-of-a-mysterious-function-closest-to-target/ (same question)

https://leetcode.com/contest/weekly-contest-393/ranking/ Q4 uwi
https://leetcode.com/problems/minimum-sum-of-values-by-dividing-array
*/
function SegmentTreeRANDQ(input) {
    let n, h, a;
    let ini = 0;
    if (Number.isInteger(input)) {
        n = input;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(ini);
        h = a.length / 2;
    } else {
        n = input.length;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(ini);
        h = a.length / 2;
        initializeFromArray();
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
        let res = -1;
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
        return x & y;
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

