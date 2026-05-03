/*
 * 01/17/23 night
 * https://leetcode.com/problems/time-to-cross-a-bridge/
 */

const pr = console.log;

class AVLNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.height = 1;
        this.cnt = 1;
        this.SubTreeNodes = 1;
    }
}

class AVLTree {
    constructor(comparator = null) {
        this.root = null;
        this.nodeCount = 0;
        this.tot = 0;
        this.comparator = comparator ? comparator : (x, y) => x - y;
    }
    cmp(x, y) { // compare nodes: x is inserted item
        if (x == null || y == null) return 0;
        if (this.valid(x)) x = new AVLNode(x);
        if (this.valid(y)) y = new AVLNode(y);
        if (Array.isArray(x.val) || Array.isArray(y.val)) {
            if (Array.isArray(x.val) && Array.isArray(y.val)) {
                return this.comparator(x.val, y.val);
            } else {
                return 0;
            }
        } else if (Number.isInteger(x.val) || Number.isInteger(y.val)) {
            if (Number.isInteger(x.val) && Number.isInteger(y.val)) {
                return this.comparator(x.val, y.val);
            } else {
                return 0;
            }
        } else if (this.isObject(x.val) || this.isObject(y.val)) {
            if (this.isObject(x.val) && this.isObject(y.val)) {
                return this.comparator(x.val, y.val);
            } else {
                return 0;
            }
        }
        return 0;
    }
    valid(x) {
        return Array.isArray(x) || Number.isInteger(x) || this.isObject(x);
    }
    isObject(x) {
        return typeof x === 'object' && !Array.isArray(x) && x !== null && !x.hasOwnProperty('SubTreeNodes'); // distinguish object with AVLNode object
    }
    getHeight(node) {
        return node != null ? node.height : 0;
    }
    getBalance(node) {
        return node != null ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }
    update(node) {
        let leftHeight = this.getHeight(node.left), rightHeight = this.getHeight(node.right);
        node.height = 1 + Math.max(leftHeight, rightHeight);
        node.SubTreeNodes = 1 + (node.left != null ? node.left.SubTreeNodes : 0) + (node.right != null ? node.right.SubTreeNodes : 0);
    }
    LR(z) {
        let y = z.right;
        let T2 = y.left;
        y.left = z;
        z.right = T2;
        this.update(z);
        this.update(y);
        return y;
    }
    RR(z) {
        let y = z.left;
        let T3 = y.right;
        y.right = z
        z.left = T3
        this.update(z);
        this.update(y);
        return y;
    }
    insert(item) {
        this.root = this.insertUtil(this.root, item);
        this.tot++;
    }
    insertUtil(node, item) {
        if (node == null) { // find place to insert
            this.nodeCount++;
            return new AVLNode(item);
        } else if (this.cmp(item, node) < 0) {
            node.left = this.insertUtil(node.left, item);
        } else if (this.cmp(item, node) > 0) {
            node.right = this.insertUtil(node.right, item);
        } else {
            node.cnt++;
            return node;
        }
        this.update(node);
        return this.rebalanceAfterInsert(node, item);
    }
    remove(item) {
        let node = this.find(item);
        if (node == null) return false;
        this.root = this.removeUtil(this.root, item);
        this.tot--;
        return true;
    }
    removeUtil(node, item) {
        if (node == null) {
            return node;
        } else if (this.cmp(item, node) < 0) {
            node.left = this.removeUtil(node.left, item);
        } else if (this.cmp(item, node) > 0) {
            node.right = this.removeUtil(node.right, item);
        } else { // find node
            if (node.cnt > 1) {
                node.cnt--;
                return node;
            } else {
                this.nodeCount--;
            }
            // delete process
            if (node.left == null) {
                let tmp = node.right;
                node = null;
                return tmp;
            } else if (node.right == null) {
                let tmp = node.left;
                node = null;
                return tmp;
            }
            let tmp = this.findFirst(node.right);
            node.val = tmp.val;
            node.right = this.removeUtil(node.right, tmp.val);
        }
        if (node == null) return node;
        this.update(node);
        return this.rebalanceAfterDeletion(node, item);
    }
    rebalanceAfterInsert(node, item) {
        let bal = this.getBalance(node);
        if (bal > 1 && this.cmp(item, node.left) < 0) return this.RR(node);
        if (bal < -1 && this.cmp(item, node.right) > 0) return this.LR(node);
        if (bal > 1 && this.cmp(item, node.left) > 0) {
            node.left = this.LR(node.left);
            return this.RR(node);
        }
        if (bal < -1 && this.cmp(item, node.right) < 0) {
            node.right = this.RR(node.right);
            return this.LR(node);
        }
        return node;
    }
    rebalanceAfterDeletion(node) {
        let bal = this.getBalance(node);
        if (bal > 1 && this.getBalance(node.left) >= 0) return this.RR(node);
        if (bal < -1 && this.getBalance(node.right) <= 0) return this.LR(node);
        if (bal > 1 && this.getBalance(node.left) < 0) {
            node.left = this.LR(node.left);
            return this.RR(node);
        }
        if (bal < -1 && this.getBalance(node.right) > 0) {
            node.right = this.RR(node.right);
            return this.LR(node);
        }
        return node;
    }
    find(item) {
        return this.findFirstOf(item);
    }
    findFirstOf(item) {
        let node = this.root, res = null;
        while (node != null) {
            if (this.cmp(item, node) < 0) {
                node = node.left;
            } else if (this.cmp(item, node) > 0) {
                node = node.right;
            } else {
                res = node;
                node = node.left;
            }
        }
        return res;
    }
    higher(item) {// > upper_bound
        let node = this.findSuccessorOf(item);
        return node == null ? null : (node.val);
    }
    findSuccessorOf(item) {
        let node = this.root, res = null;
        while (node != null) {
            if (this.cmp(item, node) < 0) {
                res = node;
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return res;
    }
    lower(item) { // < 
        let node = this.findPrecursorOf(item);
        return node == null ? null : (node.val);
    }
    findPrecursorOf(item) {
        let node = this.root, res = null;
        while (node != null) {
            if (this.cmp(item, node) > 0) {
                res = node;
                node = node.right;
            } else {
                node = node.left;
            }
        }
        return res;
    }
    findKth(k) { // (1-indexed)  unique
        let res = this.findKthNode(k);
        return res == null ? null : res.val;
    }
    findKthNode(k) {
        return this.size() < k ? null : this.KthUtil(this.root, k);
    }
    findKthMap(k) {
        let res = this.findKthNodeMap(k);
        return res == null ? null : res.val;
    }
    findKthNodeMap(k) {
        return this.total() < k ? null : this.KthUtil(this.root, k);
    }
    KthUtil(node, k) {
        let leftCount = node.left ? node.left.SubTreeNodes : 0;
        if (leftCount + 1 === k) return node;
        if (leftCount + 1 < k) return this.KthUtil(node.right, k - leftCount - 1);
        return this.KthUtil(node.left, k);
    }
    rankOf(item) { // unique value treeset    total elements in tree with val < item
        let x = this.findPrecursorOf(item);
        return x == null ? 0 : this.findRankOf(x, this.root) + 1;
    }
    findRankOf(item, node) {
        let rank = 0;
        while (node != null) {
            let leftSubtreeNodes = node.left != null ? node.left.SubTreeNodes : 0;
            if (this.cmp(item, node) < 0) {
                node = node.left;
            } else if (this.cmp(item, node) > 0) {
                rank += leftSubtreeNodes + 1;
                node = node.right;
            } else {
                return rank + leftSubtreeNodes;
            }
        }
        return 0;
    }
    has(item) {
        return this.count(item) > 0;
    }
    count(item) {
        let node = this.find(item);
        return node == null ? 0 : node.cnt;
    }
    first() {
        let node = this.findFirst(this.root);
        return node == null ? null : node.val;
    }
    last() {
        let node = this.findLast(this.root);
        return node == null ? null : node.val;
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
    findFirst(node) {
        return node == null || node.left == null ? node : this.findFirst(node.left);
    }
    findLast(node) {
        return node == null || node.right == null ? node : this.findLast(node.right);
    }
    size() {
        return this.nodeCount;
    }
    total() {
        return this.tot;
    }
    isEmpty() {
        return this.root == null;
    }
    show() { // inorder
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
    showAll() {
        let d = this.show(), res = new Map();
        for (const x of d) res.set(x, this.count(x))
        return res;
    }
}


// const findCrossingTime = (n, k, time) => {
//     let collect = new AVLTree((x, y) => x[0] - y[0]);
//     let waiting = new AVLTree((x, y) => {
//         if (x[1] != y[1]) return y[1] - x[1];
//         if (x[3] + x[5] != y[3] + y[5]) return (y[3] + y[5]) - (x[3] + x[5]);
//         if (x[2] != y[2]) return y[2] - x[2];
//     });
//     for (let i = 0; i < time.length; i++) {
//         let item = [0, 0, i, ...time[i]];
//         collect.insert(item);
//     }
//     pr("000", waiting.total(), waiting.showAll(), collect.total(), collect.showAll())
//     let clock = 0, np = n;
//     while (1) {
//         if (waiting.isEmpty() && collect.first()[0] > clock) clock = collect.first()[0];
//         pr("111", waiting.total(), collect.total(),collect.first()[0] <= clock)
//         while (!collect.isEmpty() && collect.first()[0] <= clock) {
//             pr("222", waiting.total(), collect.total())
//             waiting.insert(collect.poll());
//         }
//         pr("333", waiting.total(), collect.total())
//         let cur = waiting.poll();
//         pr("cur", "endTime", cur[1], "np", np)
//         if (cur[1] != 0 || np != 0) {
//             let nextClock = 0;
//             if (cur[1] == 0) {
//                 np--;
//                 cur[1] = 1;
//                 nextClock = clock + cur[3];
//                 cur[0] = clock + cur[3] + cur[4];
//             } else {
//                 if (--n == 0) return clock + cur[5];
//                 cur[1] = 0;
//                 nextClock = clock + cur[5];
//                 cur[0] = clock + cur[5] + cur[6];
//             }
//             clock = nextClock;
//             collect.insert(cur);
//         }
//     }
//     return res;
// };

const findCrossingTime = (n, k, time) => {
    let collect = new AVLTree((x, y) => x.startTime - y.startTime);
    let waiting = new AVLTree((x, y) => {
        if (x.endTime != y.endTime) return y.endTime - x.endTime;
        if (x.LR + x.RL != y.LR + y.RL) return (y.LR + y.RL) - (x.LR + x.RL);
        if (x.idx != y.idx) return y.idx - x.idx;
    });
    for (let i = 0; i < time.length; i++) {
        let item = { startTime: 0, endTime: 0, idx: i, LR: time[i][0], pickOld: time[i][1], RL: time[i][2], putNew: time[i][3] };
        collect.insert(item);
    }
    // pr("000", waiting.size(), waiting.showAll(), collect.size(), collect.showAll())
    let clock = 0, np = n;
    while (1) {
        if (waiting.isEmpty() && collect.first().startTime > clock) clock = collect.first().startTime;
        pr("111", waiting.total(), collect.total(),collect.first().startTime <= clock)
        while (!collect.isEmpty() && collect.first().startTime <= clock) {
            pr("222", waiting.total(), collect.total())
            waiting.insert(collect.poll());
        }
        pr("333", waiting.total(), collect.total())
        let cur = waiting.poll();
        pr("cur", "endTime", cur.endTime, "np", np)
        if (cur.endTime != 0 || np != 0) {
            let nextClock = 0;
            if (cur.endTime == 0) {
                np--;
                cur.endTime = 1;
                nextClock = clock + cur.LR;
                cur.startTime = clock + cur.LR + cur.pickOld;
            } else {
                if (--n == 0) return clock + cur.RL;
                cur.endTime = 0;
                nextClock = clock + cur.RL;
                cur.startTime = clock + cur.RL + cur.putNew;
            }
            clock = nextClock;
            collect.insert(cur);
        }
    }
    return res;
};

const main = () => {
    let n = 1, k = 3, time = [[1, 1, 2, 1], [1, 1, 3, 1], [1, 1, 4, 1]];
    let n2 = 3, k2 = 2, time2 = [[1, 9, 1, 8], [10, 10, 10, 10]];
    pr(findCrossingTime(n, k, time))
    // pr(findCrossingTime(n2, k2, time2))
};

main()