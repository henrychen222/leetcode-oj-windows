/**
 * 07/27/24 aftenoon
 * https://leetcode.com/contest/weekly-contest-408/problems/check-if-the-rectangle-corner-is-reachable/
 */

const pr = console.log;

function DJSet(n) {
    let p = Array(n).fill(-1);
    return { find, union, count, equiv, par, grp }
    function find(x) {
        return p[x] < 0 ? x : p[x] = find(p[x]);
    }
    function union(x, y) {
        x = find(x);
        y = find(y);
        if (x == y) return false;
        if (p[x] < p[y]) [x, y] = [y, x];
        p[x] += p[y];
        p[y] = x;
        return true;
    }
    function count() { // total groups
        return p.filter(v => v < 0).length;
    }
    function equiv(x, y) { // isConnected
        return find(x) == find(y);
    }
    function par() {
        return p;
    }
    function grp() { // generate all groups (nlogn)
        let g = [];
        for (let i = 0; i < n; i++) g.push([]);
        for (let i = 0; i < n; i++) g[find(i)].push(i); // sorted and unique
        return g;
    }
}

// Accepted
// reference: uwi
const canReachCorner = (X, Y, circles) => {
    let n = circles.length, ds = new DJSet(n + 2);
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (circleIntersect(circles[i], circles[j])) ds.union(i, j);
        }
        // 4 conditions
        let [x, y, r] = circles[i];
        if (x - r <= 0) ds.union(i, n);
        if (x + r >= X) ds.union(i, n + 1);
        if (y - r <= 0) ds.union(i, n + 1);
        if (y + r >= Y) ds.union(i, n);
    }
    return !ds.equiv(n, n + 1);
};

const circleIntersect = (a, b) => {
    let [x1, y1, r1] = a, [x2, y2, r2] = b;
    return (x1 - x2) ** 2 + (y1 - y2) ** 2 <= (r1 + r2) ** 2;
};

const main = () => {
    let X = 3, Y = 4, circles = [[2, 1, 1]]
    let X2 = 3, Y2 = 3, circles2 = [[1, 1, 2]]
    let X3 = 3, Y3 = 3, circles3 = [[2, 1, 1], [1, 2, 1]]
    let X_debug1 = 5, Y_debug1 = 9, circles_debug1 = [[4,7,1],[2,1,1],[4,7,1],[3,7,1],[4,1,1],[4,7,1],[1,5,1]]
    pr(canReachCorner(X, Y, circles))
    pr(canReachCorner(X2, Y2, circles2))
    pr(canReachCorner(X3, Y3, circles3))
    pr(canReachCorner(X_debug1, Y_debug1, circles_debug1)) // true
};

main()