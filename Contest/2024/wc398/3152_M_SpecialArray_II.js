/**
 * 05/18/24 evening
 * https://leetcode.com/contest/weekly-contest-398/problems/special-array-ii/
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

// Accepted
const isArraySpecial = (a, queries) => {
    let n = a.length, L = [], R = [], res = [], bi = new Bisect();
    for (let i = 1; i < n; i++) {
        if (a[i - 1] % 2 == a[i] % 2) {
            L.push(i - 1);
            R.push(i);
        }
    }
    // pr(L, R)
    for (const [l, r] of queries) { // [L[idxl], R[idxr]] is subset of [l, r], not special
        let idx = bi.bisect_left(L, l);
        // pr(idx, "compare", [L[idx], R[idx]], [l, r], l <= L[idx], r >= L[idx] + 1)
        if (l < r && l <= L[idx] && r >= L[idx] + 1) {
            res.push(false);
        } else {
            res.push(true);
        }
    }
    return res;
};

const main = () => {
    let a = [3, 4, 1, 2, 6], queries = [[0, 4]]
    let a2 = [4, 3, 1, 6], queries2 = [[0, 2], [2, 3]];
    let a_debug1 = [2, 2], queries_debug1 = [[0, 0]];
    let a_debug2 = [4,1,2,9,9,8,8], queries_debug2 = [[1,5]]
    pr(isArraySpecial(a, queries))
    pr(isArraySpecial(a2, queries2))
    pr(isArraySpecial(a_debug1, queries_debug1)) // [true]
    pr(isArraySpecial(a_debug2, queries_debug2)) // [false]
};

main()