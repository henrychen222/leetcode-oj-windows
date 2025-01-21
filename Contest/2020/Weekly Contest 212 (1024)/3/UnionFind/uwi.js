/*
 * 10/24/20 night
 * 01/09/25 noon update
 *
 * similar problem:
 * https://leetcode.cn/circle/discuss/oo2jkI/
 */
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

const pathRule = (x, y) => Math.abs(x - y);

const minimumEffortPath = (g) => {
    let n = g.length, m = g[0].length, nodes = [], ds = new DJSet(n * m);
    if (m + n == 2) return 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (i + 1 < n) {
                nodes.push([i * m + j, (i + 1) * m + j, pathRule(g[i][j], g[i + 1][j])]);
            }
            if (j + 1 < m) {
                nodes.push([i * m + j, i * m + j + 1, pathRule(g[i][j], g[i][j + 1])]);
            }
        }
    }
    nodes.sort((x, y) => x[2] - y[2]);
    for (const [x, y, v] of nodes) {
        ds.union(x, y);
        if (ds.equiv(0, (n - 1) * m + (m - 1))) { // [0, 0] [n-1, m-1] connected
            return v;
        }
    }
    return -1;
};

const main = () => {
    let heights = [[1, 2, 2], [3, 8, 2], [5, 3, 5]];
    let heights2 = [[1, 2, 3], [3, 8, 4], [5, 3, 5]];
    let heights3 = [[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]];
    let debug1 = [[3]];
    let debug2 = [[1, 10, 6, 7, 9, 10, 4, 9]];
    console.log(minimumEffortPath(heights));
    console.log(minimumEffortPath(heights2));
    console.log(minimumEffortPath(heights3));
    console.log(minimumEffortPath(debug1)); // 0
    console.log(minimumEffortPath(debug2)); // 9
};

main()