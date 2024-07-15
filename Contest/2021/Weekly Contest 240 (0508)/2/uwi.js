// 05/08/21 evening  06/03/24 night

const pr = console.log;

function SegmentTreeRMQ(input) { // range min query
    let n, a;
    if (Number.isInteger(input)) {
        n = input;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(Number.MAX_SAFE_INTEGER);
    } else {
        n = input.length;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(Number.MAX_SAFE_INTEGER);
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
        let res = Number.MAX_SAFE_INTEGER;
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
        return Math.min(x, y);
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

const maxDistance = (a, b) => {
    let n = a.length, m = b.length, st = new SegmentTreeRMQ(1e5 + 3), res = 0;
    for (let i = 0; i < m; i++) {
        let mi = st.query(a[i], a[i]);
        if (mi > i) {
            st.update(a[i], i);
        }
        let tmp = st.query(0, b[i]);
        if (tmp != Number.MAX_SAFE_INTEGER) {
            res = Math.max(res, i - tmp);
        }
    }
    return res;
};

const main = () => {
    let nums1 = [55, 30, 5, 4, 2], nums2 = [100, 20, 10, 10, 5];
    let nums1_2 = [2, 2, 2], nums2_2 = [10, 10, 1];
    let nums1_3 = [30, 29, 19, 5], nums2_3 = [25, 25, 25, 25, 25];
    let nums1_4 = [5, 4], nums2_4 = [3, 2];
    let nums1_debug1 = [55, 30, 5, 4, 2], nums2_debug1 = [100, 20, 10, 10, 5];
    let nums1_debug2 = [2], nums2_debug2 = [1];
    pr(maxDistance(nums1, nums2));
    pr(maxDistance(nums1_2, nums2_2));
    pr(maxDistance(nums1_3, nums2_3));
    pr(maxDistance(nums1_4, nums2_4));
    pr(maxDistance(nums1_debug1, nums2_debug1));
    pr(maxDistance(nums1_debug2, nums2_debug2));
};

main()