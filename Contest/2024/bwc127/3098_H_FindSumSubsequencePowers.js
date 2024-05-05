/**
 * 03/30/24 morning
 * https://leetcode.com/contest/biweekly-contest-127/problems/find-the-sum-of-subsequence-powers/
 */

const pr = console.log;

const mod = 1e9 + 7, ll = BigInt, bmod = ll(mod)

// function Combinatorics(N, mod) {
//     let fact = Array(N), ifact = Array(N), inv = Array(N);
//     comb_init();
//     return { comb }
//     function comb_init() {
//         fact[0] = ifact[0] = inv[1] = 1n;
//         for (let i = 2; i < N; i++) inv[i] = (mod - mod / ll(i)) * inv[mod % ll(i)] % mod;
//         for (let i = 1; i < N; i++) {
//             fact[i] = fact[i - 1] * ll(i) % mod;
//             ifact[i] = ifact[i - 1] * inv[i] % mod;
//         }
//     }
//     function comb(n, k) {
//         if (n < k || k < 0) return 0n;
//         return fact[n] * ifact[k] % mod * ifact[n - k] % mod;
//     }
// }

// const sumOfPowers1 = (a, k) => {
//     a.sort((x, y) => x - y);
//     let n = a.length, res = 0n, cb = new Combinatorics(100, bmod)
//     for (let i = 0; i <= n - k; i++) {
//         res += ll(a[i + k - 1] - a[i]) * cb.comb(k - 1, 1) % bmod;
//         res %= bmod;
//     }
//     return res;
// };

/////////////////////////////////////////////////////////////////
// Accepted
// reference: https://leetcode.cn/circle/discuss/Hu41n3/
let n, res, a, memo;
const sumOfPowers = (A, k) => {
    a = A;
    a.sort((x, y) => x - y);
    n = a.length;
    memo = new Map();
    res = dfs(-1, k, -Infinity, Infinity)
    return res;
};

const dfs = (i, k, pre, mi) => {
    if (k == 0) return mi;
    if ((n - i - 1) < k) return 0;
    let ke = i + " " + k + " " + pre + " " + mi;
    if (memo.has(ke)) return memo.get(ke);
    res = dfs(i + 1, k - 1, a[i + 1], Math.min(mi, a[i + 1] - pre)) // pick
    res += dfs(i + 1, k, pre, mi); // not pick
    memo.set(ke, res);
    return res % mod;
};

const main = () => {
    let a = [1, 2, 3, 4], k = 3
    let a2 = [2, 2], k2 = 2
    let a3 = [4, 3, -1], k3 = 2
    let a_debug1 = [-100000000, 100000000], k_debug1 = 2
    pr(sumOfPowers(a, k))
    pr(sumOfPowers(a2, k2))
    pr(sumOfPowers(a3, k3))
    pr(sumOfPowers(a_debug1, k_debug1)) // 200000000
};

main()




// shift + alt + F format