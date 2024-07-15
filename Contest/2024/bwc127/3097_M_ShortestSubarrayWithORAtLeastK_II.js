/**
 * 03/30/24 morning
 * https://leetcode.com/contest/biweekly-contest-127/problems/shortest-subarray-with-or-at-least-k-ii/
 */

const pr = console.log;

// const N = 30;
// const checkIthBit = (x, i) => x & (1 << i);

const minimumSubarrayLength = (a, k) => {
    let n = a.length, res = Number.MAX_SAFE_INTEGER, l = 0, cur = 0;
    for (let i = 0; i < n; i++) {
        cur = addOR(cur, a[i], f);
        while (l < i && cur >= k) {
            pr("222", a.slice(l, i + 1), l, i, "test", cur, test(a, l, i))
            res = Math.min(res, i - l + 1);
            cur &= ~a[l++];
        }
        if (cur >= k) res = Math.min(res, i - l + 1);
    }
    return res == Number.MAX_SAFE_INTEGER ? -1 : res;
};

const addOR = (cur, x, f) => {
   for(let i = 0; i < N;i++) {
      if (checkIthBit(x, i)) f[i]++;
   }
   return cur | x;
};

const removeOR = (cur, x, f) => {
    for(let i = 0; i < N;i++) {
       if (checkIthBit(x, i)) f[i]++;
    }
    return cur | x;
 };
 


const test = (a, i, j) => {
    let res = 0;
    for (let k = i; k <= j; k++) res |= a[k]
    return res;
}

// TLE
class SegmentTree {
    constructor(nums) {
        this.n = nums.length;
        this.tree = Array(this.n * 4).fill(0);
        this.build(nums, 0, 0, this.n - 1);
        // pr("build222", this.tree)
    }

    build(nums, treeIndex, lo, hi) {
        if (lo === hi) {
            this.tree[treeIndex] = nums[lo];
            return;
        }
        const mid = lo + Math.floor((hi - lo) / 2);
        const leftChild = 2 * treeIndex + 1;
        const rightChild = 2 * treeIndex + 2;
        this.build(nums, leftChild, lo, mid);
        this.build(nums, rightChild, mid + 1, hi);
        this.tree[treeIndex] = this.tree[leftChild] | this.tree[rightChild];
    }

    query(left, right, treeIndex, lo, hi) {
        if (left > hi || right < lo) return 0;
        if (left <= lo && right >= hi) return this.tree[treeIndex];
        const mid = lo + Math.floor((hi - lo) / 2);
        return this.query(left, right, 2 * treeIndex + 1, lo, mid) |
            this.query(left, right, 2 * treeIndex + 2, mid + 1, hi);
    }
}

// Accepted
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
        a[i] = f(a[left(i)], a[right(i)]);
    }
    function query(l, r) {
        return Query(l, r + 1);
    }
    function Query(l, r) { // [L, R)
        let res = 0;
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
        return x | y;
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

function minimumSubarrayLength(a, k) {
    let n = a.length, st = new SegmentTreeRORQ(a), res = Number.MAX_SAFE_INTEGER;
    // const segmentTree = new SegmentTree(a);
    for (let i = 0; i < n; i++) {
        let L = i - 1, R = n, len = Number.MAX_SAFE_INTEGER;
        while (R - L > 1) {
            const mid = L + Math.floor((R - L) / 2);
            let v = st.query(i, mid);
            // pr(v, segmentTree.query(i, mid, 0, 0, n - 1))
            if (v >= k) {
                len = mid - i + 1;
                R = mid;
            } else {
                L = mid;
            }
        }
        res = Math.min(res, len);
    }
    return res === Number.MAX_SAFE_INTEGER ? -1 : res;
}

const main = () => {
    let a = [1, 2, 3], k = 2
    let a2 = [2, 1, 8], k2 = 10
    let a3 = [1, 2], k3 = 0;
    let a_debug1 = [1, 2, 32, 21], k_debug1 = 55;
    pr(minimumSubarrayLength(a, k))
    pr(minimumSubarrayLength(a2, k2))
    pr(minimumSubarrayLength(a3, k3))
    pr(minimumSubarrayLength(a_debug1, k_debug1)) // 3
};

main()




// shift + alt + F format