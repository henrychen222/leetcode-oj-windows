/**
 * 04/23/26 night
 * https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/
 */

const pr = console.log;

function DiffArray(n) {
    let diff = Array(n).fill(0);
    return { update, simulate, D }
    function update(l, r, v) {
        diff[l] += v;
        if (r + 1 < n) diff[r + 1] -= v;
    }
    function simulate() {
        for (let i = 1; i < n; i++) diff[i] += diff[i - 1];
    }
    function D() {
        return diff;
    }
}

// Accepted
const minGroups = (a) => {
    let max = 0, res = 0;
    for (const [l, r] of a) max = Math.max(max, l, r);
    let da = new DiffArray(max);
    for (const [l, r] of a) {
        da.update(l - 1, r - 1, 1);
    }
    da.simulate();
    // pr(da.D())
    da.D().map(x => res = Math.max(res, x));
    return res;
};

const main = () => {
    let intervals = [[5, 10], [6, 8], [1, 5], [2, 3], [1, 10]];
    let intervals2 = [[1, 3], [5, 6], [8, 10], [11, 13]];
    let debug1 = [[441459, 446342], [801308, 840640], [871890, 963447], [228525, 336985], [807945, 946787], [479815, 507766], [693292, 944029], [751962, 821744]]
    let debug0 = [[1, 1]]
    pr(minGroups(intervals))
    pr(minGroups(intervals2))
    pr(minGroups(debug1)) // 4
    pr(minGroups(debug0)) // 1
};

main()