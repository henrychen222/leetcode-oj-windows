/**
 * 08/10/24 evening
 * https://leetcode.com/contest/weekly-contest-410/problems/find-the-count-of-monotonic-pairs-i/
 * https://leetcode.com/contest/weekly-contest-410/problems/find-the-count-of-monotonic-pairs-ii/
 */

const pr = console.log;

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

const ll = BigInt, mod = 1e9 + 7, bmod = ll(1e9 + 7)

// Accepted
// https://leetcode.com/problems/find-the-count-of-monotonic-pairs-ii/solutions/5619537/super-simple-solution-using-combinatorics/
// https://leetcode.cn/circle/discuss/cpcrPz/
// https://leetcode.cn/circle/discuss/oaJmLC/
function countOfPairs(a) {
    let C = new Combinatorics(3005, bmod), n = a.length;
    let x = 0, y = a[0], A = [x], B = [y];
    for (let i = 1; i < n; i++) {
        x = Math.max(x, a[i] - y)
        y = a[i] - x;
        A.push(x);
        B.push(y);
    }
    let minB = Math.min(...B);
    // pr(A, B, minB)
    return C.comb(minB + B.length, B.length);
};


const main = () => {
    let a = [2, 3, 2];
    let a2 = [5, 5, 5, 5]
    pr(countOfPairs(a))
    pr(countOfPairs(a2))
};

main()