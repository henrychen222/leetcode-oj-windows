/**
 * 01/18/25 evening
 * https://leetcode.com/contest/weekly-contest-433/problems/maximum-and-minimum-sums-of-at-most-size-k-subsequences/
 */

const pr = console.log;

const ll = BigInt;
function Combinatorics(N, mod) {
    let fact = Array(N), ifact = Array(N), inv = Array(N);
    comb_init();
    return { comb }
    function comb_init() {
        fact[0] = ifact[0] = inv[1] = 1n;
        for (let i = 2; i < N; i++) inv[i] = (mod - mod / ll(i)) * inv[mod % ll(i)] % mod;
        for (let i = 1; i < N; i++) {
            fact[i] = fact[i - 1] * ll(i) % mod;
            ifact[i] = ifact[i - 1] * inv[i] % mod;
        }
    }
    function comb(n, k) {
        if (n < k || k < 0) return 0n;
        return fact[n] * ifact[k] % mod * ifact[n - k] % mod;
    }
}

// Accepted
// chatGPT, uwi
const mod = 1e9 + 7, bmod = ll(1e9 + 7);
const minMaxSums = (a, k) => {
    let n = a.length, res = 0n, c = new Combinatorics(n + 5, bmod);
    a.sort((x, y) => x - y);
    for (let l = 1; l <= k; l++) {
        for (let i = 0; i < n; i++) {
            res = (res + ll(a[i]) * c.comb(n - i - 1, l - 1)) % bmod;
            res = (res + ll(a[i]) * c.comb(i, l - 1)) % bmod;
        }
    }
    return Number(res);
};


const main = () => {
    let a = [1, 2, 3], k = 2
    let a2 = [5, 0, 6], k2 = 1
    let a3 = [1, 1, 1], k3 = 2;
    let a_debug1 = [265, 732], k_debug1 = 1;
    pr(minMaxSums(a, k))
    pr(minMaxSums(a2, k2))
    pr(minMaxSums(a3, k3))
    pr(minMaxSums(a_debug1, k_debug1))
};

main()