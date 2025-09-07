/**
 * 01/18/25 evening
 * https://leetcode.com/contest/weekly-contest-433/problems/maximum-and-minimum-sums-of-at-most-size-k-subarrays/
 */

const pr = console.log;

function SegmentTreeRMinQ(input) { // range min query
    let n, h, a;
    let ini = Number.MAX_SAFE_INTEGER; // may need to set to 0 for some problem
    if (Number.isInteger(input)) {
        n = input;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(ini);
        h = a.length / 2;
    } else {
        n = input.length;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(ini);
        initializeFromArray();
        h = a.length / 2;
    }
    return { update, query, tree }
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
        let res = ini;
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

function SegmentTreeRMaxQ(input) { // range max query
    let n, h, a;
    let ini = Number.MIN_SAFE_INTEGER;
    if (Number.isInteger(input)) {
        n = input;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(ini);
        h = a.length / 2;
    } else {
        n = input.length;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(ini);
        initializeFromArray();
        h = a.length / 2;
    }
    return { update, query, tree }
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
        let res = ini;
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

// TLE
const minMaxSubarraySum1 = (a, k) => {
    let n = a.length, res = 0;
    let stmin = new SegmentTreeRMinQ(n + 5), stmax = new SegmentTreeRMaxQ(n + 5);
    for (let i = 0; i < n; i++) {
        stmin.update(i, a[i]);
        stmax.update(i, a[i]);
    }
    // pr(stmin.tree(), stmax.tree())
    for (let size = 1; size <= k; size++) {
        for (let l = 0; l + size - 1 < n; l++) {
            let r = l + size - 1;
            let min = stmin.query(l, r);
            let max = stmax.query(l, r);
            res += min;
            res += max;
            // pr(size, l, r, a.slice(l, r+1), "min", min, "max", max)
        }
    }
    return res;
};

/////////////////////////////////////////////////////////////////////////////////////

class SplayNode {
    constructor(value) {
        this.parent = null;
        this.left = null;
        this.right = null;
        this.val = value;
        this.sum = value;
        this.sz = 1;
    }
    update() {
        this.sz = (this.left != null ? this.left.sz : 0) + (this.right != null ? this.right.sz : 0) + 1;
        this.sum = (this.left != null ? this.left.sum : 0) + (this.right != null ? this.right.sum : 0) + this.val;
    }
    isLeft() {
        return this.parent != null && this.parent.left == this;
    }
    isRight() {
        return this.parent != null && this.parent.right == this;
    }
    isRoot(guard = null) {
        return this.parent == guard;
    }
}

// MultiSet
class SplayTree {
    constructor() {
        this.root = null;
        this.cmp = (x, y) => x >= y ? 0 : 1;
    }
    zig(x) { // right rotation
        let y = x.parent;
        if (x.right != null) x.right.parent = y;
        y.left = x.right;
        x.right = y;
        if (y.isLeft()) {
            y.parent.left = x;
        } else if (y.isRight()) {
            y.parent.right = x;
        }
        x.parent = y.parent;
        y.parent = x;
        y.update();
        x.update();
    }
    zag(x) { // left rotation
        let y = x.parent;
        if (x.left != null) x.left.parent = y;
        y.right = x.left;
        x.left = y;
        if (y.isLeft()) {
            y.parent.left = x;
        } else if (y.isRight()) {
            y.parent.right = x;
        }
        x.parent = y.parent;
        y.parent = x;
        y.update();
        x.update();
    }
    zigzig(x) { // RR
        this.zig(x.parent);
        this.zig(x);
    }
    zigzag(x) { // RL
        this.zig(x);
        this.zag(x);
    }
    zagzag(x) { // LL
        this.zag(x.parent);
        this.zag(x);
    }
    zagzig(x) { // LR
        this.zag(x);
        this.zig(x);
    }
    splay(node, guard = null) { // splay node under guard, default splay to root
        while (!node.isRoot(guard)) {
            if (node.parent.isRoot(guard)) {
                if (node.isLeft()) {
                    this.zig(node);
                } else {
                    this.zag(node);
                }
            } else {
                if (node.parent.isLeft()) {
                    if (node.isLeft()) {
                        this.zigzig(node);
                    } else {
                        this.zagzig(node);
                    }
                } else {
                    if (node.isRight()) {
                        this.zagzag(node);
                    } else {
                        this.zigzag(node);
                    }
                }
            }
        }
        if (guard == null) this.root = node;
    }
    LastNode(x) {
        this.splay(x);
        let node = x.left;
        if (node == null) return null;
        while (node.right != null) node = node.right;
        this.splay(node);
        return node;
    }
    NextNode(x) {
        this.splay(x);
        let node = x.right;
        if (node == null) return null;
        while (node.left != null) node = node.left;
        this.splay(node);
        return node;
    }
    find(value) {
        return this.findFirstOf(value);
    }
    findFirstOf(value) {
        let node = this.root, res = null, last_visited = null;
        while (node != null) {
            last_visited = node;
            if (this.cmp(value, node.val)) {
                node = node.left;
            } else if (this.cmp(node.val, value)) {
                node = node.right;
            } else {
                res = node;
                node = node.left;
            }
        }
        if (last_visited != null) this.splay(last_visited);
        return res;
    }
    findLastOf(value) {
        let node = this.root, res = null, last_visited = null;
        while (node != null) {
            last_visited = node;
            if (this.cmp(value, node.val)) {
                node = node.left;
            } else if (this.cmp(node.val, value)) {
                node = node.right;
            } else {
                res = node;
                node = node.right;
            }
        }
        if (last_visited != null) this.splay(last_visited);
        return res;
    }
    findRankOf(node) {
        this.splay(node);
        return node.left == null ? 0 : node.left.sz;
    }
    findSuccessorOf(value) {
        let node = this.root, res = null, last_visited = null;
        while (node != null) {
            last_visited = node;
            if (this.cmp(value, node.val)) {
                res = node;
                node = node.left;
            } else {
                node = node.right;
            }
        }
        if (last_visited != null) this.splay(last_visited);
        return res;
    }
    findPrecursorOf(value) {
        let node = this.root, res = null, last_visited = null;
        while (node != null) {
            last_visited = node;
            if (this.cmp(node.val, value)) {
                res = node;
                node = node.right;
            } else {
                node = node.left;
            }
        }
        if (last_visited != null) this.splay(last_visited);
        return res;
    }
    findKthNode(rank) {
        if (rank < 0 || rank >= this.size()) return null;
        let node = this.root;
        while (node != null) {
            let leftsize = node.left == null ? 0 : node.left.sz;
            if (leftsize == rank) break;
            if (leftsize > rank) {
                node = node.left;
            } else {
                rank -= leftsize + 1;
                node = node.right;
            }
        }
        this.splay(node);
        return node;
    }
    make(value) {
        return new SplayNode(value);
    }
    removeNode(node) {
        node = null;
    }

    // -------------------------------- Public Usage --------------------------------------
    insert(value) { // allow duplicates  LST.set()
        if (this.root == null) {
            this.root = this.make(value);
            return this.root;
        }
        let node = this.root;
        while (node != null) {
            if (this.cmp(value, node.val)) {
                if (node.left == null) {
                    node.left = this.make(value);
                    node.left.parent = node;
                    node = node.left;
                    break;
                }
                node = node.left;
            } else {
                if (node.right == null) {
                    node.right = this.make(value);
                    node.right.parent = node;
                    node = node.right;
                    break;
                }
                node = node.right;
            }
        }
        this.splay(node);
        return node;
    }
    remove(value) { // remove one node, not all   LST.unset()
        let node = this.find(value);
        if (node == null) return false;
        this.splay(node);
        if (node.left == null) {
            this.root = node.right;
            if (node.right != null) node.right.parent = null;
            this.removeNode(node);
            return true;
        }
        if (node.right == null) {
            this.root = node.left;
            if (node.left != null) node.left.parent = null;
            this.removeNode(node);
            return true;
        }
        let last_node = this.LastNode(node);
        let next_node = this.NextNode(node);
        this.splay(last_node);
        this.splay(next_node, last_node);
        this.removeNode(next_node.left);
        next_node.left = null;
        next_node.update();
        last_node.update();
        return true;
    }
    has(value) { // LST.get()
        return this.count(value) > 0;
    }
    count(value) {
        let x = this.findFirstOf(value);
        if (x == null) return 0;
        let rank_x = this.findRankOf(x);
        let y = this.findLastOf(value);
        let rank_y = this.findRankOf(y);
        return rank_y - rank_x + 1;
    }
    rankOf(value) { // The number of elements strictly less than value
        let x = this.findPrecursorOf(value);
        return x == null ? 0 : this.findRankOf(x) + 1;
    }
    findKth(rank) { // (0-indexed)
        let x = this.findKthNode(rank);
        return x == null ? null : (x.val);
    }
    higher(value) { // > upper_bound()
        let node = this.findSuccessorOf(value);
        return node == null ? null : (node.val);
    }
    lower(value) { // <
        let node = this.findPrecursorOf(value);
        return node == null ? null : (node.val);
    }
    ceiling(value) { // >= lower_bound()  LST.next(value)
        return this.has(value) ? value : this.higher(value);
    }
    floor(value) { // <=                  LST.prev(value)
        return this.has(value) ? value : this.lower(value);
    }
    first() {
        return this.findKth(0);
    }
    last() {
        return this.findKth(this.size() - 1);
    }
    poll() {
        let res = this.first();
        this.remove(res);
        return res;
    }
    pollLast() {
        let res = this.last();
        this.remove(res);
        return res;
    }
    size() {
        return this.root == null ? 0 : this.root.sz;
    }
    isEmpty() {
        return this.root == null;
    }
    show() {
        let res = [];
        const dfs = (x) => {
            if (x == null) return;
            dfs(x.left);
            res.push(x.val);
            dfs(x.right);
        };
        dfs(this.root);
        return res;
    }
}

// uwi TLE java Accepted
// https://leetcode.cn/circle/discuss/DW1adK/
const minMaxSubarraySum = (a, k) => {
    let n = a.length, res = 0;
    a = a.map((x, i) => [x, i]).sort((x, y) => x[0] - y[0] || x[1] - y[1]);
    (() => {
        let tree = new SplayTree();
        tree.insert(0);
        tree.insert(n + 1);
        for (let i = 0; i < n; i++) {
            let pos = a[i][1] + 1;
            let pre = tree.floor(pos);
            let next = tree.ceiling(pos);
            tree.insert(pos);
            let l = pos - pre, r = next - pos, cnt = cal(l, r, k);
            // pr(l, r, cnt)
            res += cnt * a[i][0];
        }
    })();
    (() => {
        let tree = new SplayTree();
        tree.insert(0);
        tree.insert(n + 1);
        for (let i = n - 1; i >= 0; i--) {
            let pos = a[i][1] + 1;
            let pre = tree.floor(pos);
            let next = tree.ceiling(pos);
            tree.insert(pos);
            let l = pos - pre, r = next - pos, cnt = cal(l, r, k);
            res += cnt * a[i][0];
        }
    })();
    return res;
};

const totSub = (n) => n * (n + 1) / 2;
const cal = (l, r, k) => {
    let res = totSub(k);
    let t = Math.max(0, k - l);
    res -= totSub(t);
    t = Math.max(0, k - r);
    res -= totSub(t);
    t = Math.max(0, k - l - r);
    res += totSub(t);
    return res;
};

const main = () => {
    let a = [1, 2, 3], k = 2
    let a2 = [1, -3, 1], k2 = 2
    let a3 = [2, 5, -1, 7, -3, -1, -2], k3 = 4;
    pr(minMaxSubarraySum(a, k))
    pr(minMaxSubarraySum(a2, k2))
    pr(minMaxSubarraySum(a3, k3)) // 60
};

main()