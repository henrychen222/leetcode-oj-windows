/**
 * 02/03/24 evening
 * https://leetcode.com/contest/weekly-contest-383/problems/minimum-time-to-revert-word-to-initial-state-ii/
 */
const ll = BigInt;
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

// Accepted
const minimumTimeToInitialState = (s, k) => {
    let rs = new RollingHashPolynomial(s, 62, 998244353), rs2 = new RollingHashPolynomial(s, 62, 1e9 + 7), n = s.length;
    for (let i = k; i < n; i += k) {
        if (rs.get(0, n - i - 1) == rs.get(i, n - 1) && rs2.get(0, n - i - 1) == rs2.get(i, n - 1)) return i / k >> 0;
    }
    return (n + k - 1) / k >> 0;
};