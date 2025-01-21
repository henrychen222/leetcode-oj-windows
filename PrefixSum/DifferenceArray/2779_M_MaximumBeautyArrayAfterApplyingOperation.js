/*
 * 07/15/23 evening  01/20/25 night update
 * https://leetcode.com/contest/weekly-contest-354/problems/maximum-beauty-of-an-array-after-applying-operation/
 *
 * reference:
 * https://leetcode.cn/circle/discuss/zRYtyk/
 */

const pr = console.log;

function DiffArray(n) {
    let imos = Array(n).fill(0);
    return { update, simulate, D }
    function update(l, r, v) {
        imos[l] += v;
        // imos[r] -= v;
        if (r + 1 < n) imos[r + 1] -= v;
    }
    function simulate() {
        for (let i = 1; i < n; i++) imos[i] += imos[i - 1];
    }
    function D() {
        return imos;
    }
}

const maximumBeauty = (a, k) => {
    let min = Math.min(...a), max = Math.max(...a), da = new DiffArray(max + 1);
    a.map(x => {
        let l = Math.max(min, x - k), r = Math.min(max, x + k);
        da.update(l, r, 1);
    })
    da.simulate();
    return Math.max(...da.D());
};

const main = () => {
    let a = [4, 6, 1, 2], k = 2;
    let a2 = [1, 1, 1, 1], k2 = 10
    let a3 = [4, 6, 5, 1, 2];
    let a_debug1 = [49, 26], k_debug1 = 12;
    let a_debug2 = [50, 28, 30, 51], k_debug2 = 2;
    let a_debug3 = [76, 0], k_debug3 = 16;
    pr(maximumBeauty(a, k))
    pr(maximumBeauty(a2, k2))
    pr(maximumBeauty(a3, k))
    pr(maximumBeauty(a_debug1, k_debug1)) // 2  
    pr(maximumBeauty(a_debug2, k_debug2)) // 2
    pr(maximumBeauty(a_debug3, k_debug3)) // 1
};

main()