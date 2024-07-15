// 09/10/22 night  06/03/24 night

const pr = console.log;

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

// Accepted --- 143ms
const lengthOfLIS = (a, k) => {
    let max = Math.max(...a), st = new SegmentTreeRMQ(max + 3), res = 0;
    for (const x of a) {
        let l =  Math.max(x-k, 0), r = x;
        let max = st.query(l, r - 1);
        if (max == Number.MIN_SAFE_INTEGER) max = 0;
        max++;
        res = Math.max(res, max);
        st.update(x, max);
    }
    return res;
};

const main = () => {
    let a = [4, 2, 1, 4, 3, 4, 5, 8, 15], k = 3;
    let a2 = [7, 4, 5, 1, 8, 12, 4, 7], k2 = 5;
    let a3 = [1, 5], k3 = 1;
    let a_debug1 = [100000], k_debug1 = 1
    let a_debug2 = [4, 5], k_debug2 = 3
    let a_debug3 = [1, 3, 3, 4], k_debug3 = 1
    pr(lengthOfLIS(a, k))
    pr(lengthOfLIS(a2, k2))
    pr(lengthOfLIS(a3, k3))
    pr(lengthOfLIS(a_debug1, k_debug1)) // 1
    pr(lengthOfLIS(a_debug2, k_debug2)) // 2
    pr(lengthOfLIS(a_debug3, k_debug3)) // 2
};

main()