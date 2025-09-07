/**
 * 03/22/25 evening
 * https://leetcode.com/contest/weekly-contest-442/problems/properties-graph/
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
const numberOfComponents = (p, k) => {
    let n = p.length, m = p[0].length, ds = new DJSet(n);
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let cnt = intersect(p[i], p[j]);
            // pr(cnt, k, [i, j], cnt >= k)
            if (cnt >= k) ds.union(i, j);
        }
    }
    // pr(ds.grp())
    return ds.count();
};

const intersect = (a, b) => {
    let res = 0;
    a = new Set(a), b = new Set(b);
    for (const x of a) {
        if (b.has(x)) res++;
    }
    return res;
};


const main = () => {
    let properties = [[1, 2], [1, 1], [3, 4], [4, 5], [5, 6], [7, 7]], k = 1;
    let properties2 = [[1, 2, 3], [2, 3, 4], [4, 3, 5]], k2 = 2;
    let properties3 = [[1, 1], [1, 1]], k3 = 2
    pr(numberOfComponents(properties, k))
    pr(numberOfComponents(properties2, k2))
    pr(numberOfComponents(properties3, k3))
};

main()