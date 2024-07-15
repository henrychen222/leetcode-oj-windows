/**
 * 06/01/24 evening
 * https://leetcode.com/contest/weekly-contest-400/problems/find-subarray-with-bitwise-and-closest-to-k/
 */

const pr = console.log;

// reference: https://leetcode.com/contest/weekly-contest-393/ranking Q4 uwi
// https://leetcode.cn/circle/discuss/hc5Ti1/
// https://leetcode.cn/circle/discuss/50YKkt/
// https://leetcode.cn/problems/smallest-subarrays-with-maximum-bitwise-or/solutions/1830911/by-endlesscheng-zai1/
function SegmentTreeRANDQ(A) {
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
        a[i] = f(a[left(i)], a[right(i)]);
    }
    function query(l, r) {
        return Query(l, r + 1);
    }
    function Query(l, r) { // [L, R)
        let res = -1;
        if (l >= r) return 0;
        l += n;
        r += n;
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

// reference: https://www.geeksforgeeks.org/bitwise-and-of-sub-array-closest-to-k/
const minAbsoluteDifference_RangeAndWithK = (a, k) => { // min |k - subarray[l, r] bitwise and value |
    let n = a.length, st = new SegmentTreeRANDQ(a), res = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < n; i++) {
        let l = i - 1, r = n - 1;
        while (r - l > 1) {
            let m = l + parseInt((r - l) / 2), v = st.query(i, m);
            // pr(m, v)
            if (v >= k) {
                l = m;
            } else {
                r = m;
            }
        }
        let L = st.query(i, l), R = st.query(i, r);
        if (i <= l) res = Math.min(res, Math.abs(k - L)); // valid range [i, l]
        res = Math.min(res, Math.abs(k - R));
    }
    return res;
};

// Accepted
const minimumDifference = (a, k) => minAbsoluteDifference_RangeAndWithK(a, k)

const main = () => {
    let a = [1, 2, 4, 5], k = 3;
    let a2 = [1, 2, 1, 2], k2 = 2;
    let a3 = [1], k3 = 10;
    let a_debug1 = [6], k_debug1 = 2
    pr(minimumDifference(a, k))
    pr(minimumDifference(a2, k2))
    pr(minimumDifference(a3, k3))
    pr(minimumDifference(a_debug1, k_debug1)) // 4
};

main()