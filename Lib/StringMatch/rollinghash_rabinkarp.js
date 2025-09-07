/**
08/17/23 evening completed
https://usaco.guide/gold/hashing (use)
https://cp-algorithms.com/string/string-hashing.html#applications-of-hashing
https://www.geeksforgeeks.org/string-hashing-using-polynomial-rolling-hash-function/
https://www.geeksforgeeks.org/introduction-to-rolling-hash-data-structures-and-algorithms/

Example problem:
1044 https://leetcode.com/problems/longest-duplicate-substring/
3031 https://leetcode.com/problems/minimum-time-to-revert-word-to-initial-state-ii/
3045 https://leetcode.com/problems/count-prefix-and-suffix-pairs-ii/
*/
function RollingHashPolynomial(s, base, mod) {
    base = ll(base), mod = ll(mod);
    let n = s.length, p = Array(n + 1).fill(1n), h = Array(n + 1).fill(0n);
    buildPower();
    buildPrefixHash();
    return { get }
    function buildPower() {
        for (let i = 1; i < p.length; i++) p[i] = (p[i - 1] * base) % mod;
    }
    function buildPrefixHash() {
        for (let i = 0; i + 1 < h.length; i++) h[i + 1] = ((h[i] * base) % mod + ll(s.charCodeAt(i))) % mod;
    }
    function get(l, r) { // any substring hash values
        let res = h[r + 1] - h[l] * p[r - l + 1];
        return (res % mod + mod) % mod;
    }
}


////////////////////////////////////////////////////////////////////////////////////////
/**
 * 07/31/23 morning created
 *
 * Example problem:
 * 1044 https://leetcode.com/problems/longest-duplicate-substring/
 */

const ll = BigInt;
const rabinkarp = (s, size, base, mod) => { // fixed window size
    base = ll(base), mod = ll(mod)
    let n = s.length, p = Array(n + 1).fill(1n), h = Array(n - size + 1), cur = 0n;
    for (let i = 1; i <= n; i++) p[i] = (p[i - 1] * base) % mod;
    for (let i = 0; i < size; i++) cur = (cur * base + ll(s.charCodeAt(i))) % mod;
    h[0] = cur;
    for (let i = 1; i <= n - size; i++) {
        if (size - 1 < 0) {
            cur = -1;
            continue;
        }
        cur = ((cur - p[size - 1] * ll(s.charCodeAt(i - 1))) % mod + mod) % mod;
        cur = (cur * base + ll(s.charCodeAt(i + size - 1))) % mod;
        h[i] = cur;
    }
    return h; // [i, i + size - 1] hashes
};

const pr = console.log;

const main = () => {
    let s = "abcabcabc", windowSize = 3, base = 26, mod = 1e9 + 7;
    pr(rabinkarp(s, windowSize, base, mod))
    // [68219, 68919, 69544, 68219, 68919, 69544, 68219]
    // abc     bca    cab     abc    bca    cab    abc

    let rh = new RollingHashPolynomial(s, base, mod);
    for (let i = 0; i + 3 <= s.length; i++) { // correct
        let sub = s.slice(i, i + 3);
        let hash = rh.get(i, i + 2);
        pr(sub, hash)
    }
};

main()