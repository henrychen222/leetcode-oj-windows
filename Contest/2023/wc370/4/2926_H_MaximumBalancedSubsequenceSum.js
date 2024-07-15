/*
 * 11/05/23 noon  11/12/23 afternoon complete
 * https://leetcode.com/contest/weekly-contest-370/problems/maximum-balanced-subsequence-sum/
 */

const pr = console.log;

function Bisect() {
    return { insort_right, insort_left, bisect_left, bisect_right }
    function insort_right(a, x, lo = 0, hi = null) {
        lo = bisect_right(a, x, lo, hi);
        a.splice(lo, 0, x);
    }
    function bisect_right(a, x, lo = 0, hi = null) { // > upper_bound
        if (lo < 0) throw new Error('lo must be non-negative');
        if (hi == null) hi = a.length;
        while (lo < hi) {
            let mid = parseInt((lo + hi) / 2);
            a[mid] > x ? hi = mid : lo = mid + 1;
        }
        return lo;
    }
    function insort_left(a, x, lo = 0, hi = null) {
        lo = bisect_left(a, x, lo, hi);
        a.splice(lo, 0, x);
    }
    function bisect_left(a, x, lo = 0, hi = null) { // >= lower_bound
        if (lo < 0) throw new Error('lo must be non-negative');
        if (hi == null) hi = a.length;
        while (lo < hi) {
            let mid = parseInt((lo + hi) / 2);
            a[mid] < x ? lo = mid + 1 : hi = mid;
        }
        return lo;
    }
}

function SegmentTreeRMQ(input) { // range max query
    let n, a;
    if (Number.isInteger(input)) {
        n = input;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(Number.MIN_SAFE_INTEGER);
    } else {
        n = input.length;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(Number.MIN_SAFE_INTEGER);
        initializeFromArray();
    }
    return { update, query, tree }
    function initializeFromArray() {
        for (let i = 0; i < n; i++) a[n + i] = input[i];
        for (let i = n - 1; i >= 1; i--) pushup(i);
    }
    function update(pos, v) {
        a[n + pos] = v;
        for (let i = parent(n + pos); i >= 1; i = parent(i)) pushup(i);
    }
    function pushup(i) {
        a[i] = f(a[left(i)], a[right(i)]);
    }
    function query(l, r) {
        return Query(l, r + 1);
    }
    function Query(l, r) { // [L, R)
        let res = Number.MIN_SAFE_INTEGER;
        if (l >= r) return res;
        l += n;
        r += n;
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

// Accepted
// reference: uwi
// https://leetcode.cn/circle/discuss/WsstBS/
const maxBalancedSubsequenceSum = (a) => {
    let vals = a.map((x, i) => x - i).sort((x, y) => x - y);
    vals = [...new Set(vals)];
    let n = a.length, st = new SegmentTreeRMQ(Array(n + 1).fill(Number.MIN_SAFE_INTEGER)), bi = new Bisect();
    for (let i = 0; i < n; i++) {
        let v = a[i] - i, idx = bi.bisect_left(vals, v);
        let max = st.query(0, idx);
        if (max < 0) max = 0;
        st.update(idx, a[i] + max);
    }
    return st.query(0, n);
};

const main = () => {
    let a = [3, 3, 5, 6];
    let a2 = [5, -1, -3, 8];
    let a3 = [-2, -1];
    pr(maxBalancedSubsequenceSum(a))
    pr(maxBalancedSubsequenceSum(a2))
    pr(maxBalancedSubsequenceSum(a3))
};

main()