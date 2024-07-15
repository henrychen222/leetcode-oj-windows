/*
* 09/23/22 night  06/03/24 night modify
* https://leetcode.com/problems/falling-squares/
*/

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

// Accepted --- 135ms
const fallingSquares = (a) => {
    let m = coorCompression(a), n = m.size;
    let st = new SegmentTreeRMQ(n + 3), res = [], top = 0;
    for (const [l, r] of a) {
        let L = m.get(l), R = m.get(l + r - 1), max = st.query(L, R);
        let v = r + Math.max(max, 0);
        top = Math.max(top, v);
        for (let i = L; i <= R; i++) st.update(i, v);
        res.push(top);
    }
    return res;
};

const coorCompression = (a) => {
    let se = new Set(), n = 0, m = new Map();
    for (const [l, r] of a) {
        se.add(l);
        se.add(l + r - 1);
    }
    se = new Set([...se].sort((x, y) => x - y));
    for (const x of se) m.set(x, n++);
    return m;
};

const main = () => {
    let a = [[1, 2], [2, 3], [6, 1]];
    let a2 = [[100, 100], [200, 100]];
    let debug1 = [[1, 5], [2, 2], [7, 5]];
    let debug2 = [[9, 7], [1, 9], [3, 1]];
    pr(fallingSquares(a))
    pr(fallingSquares(a2))
    pr(fallingSquares(debug1)) // [5,7,7]
    pr(fallingSquares(debug2)) // [7,16,17]
};

main()