/**
 * 06/08/24 evening
 * https://leetcode.com/contest/weekly-contest-401/problems/find-the-n-th-value-after-k-seconds/
 */

const pr = console.log;

const preSum = (a) => { let pre = [0]; for (let i = 0; i < a.length; i++) { pre.push((pre[i] + a[i]) % mod); } return pre; };
const subArraySum = (a, l, r) => minus_mod(a[r + 1], a[l], mod);
const mod = 1e9 + 7;
const minus_mod = (x, y, mod) => ((x - y) % mod + mod) % mod;

// Accepted
const valueAfterKSeconds = (n, k) => {
    let a = Array(n).fill(1);
    while (k--) {
        // pr(a);
        let pre = preSum(a);
        for (let i = 0; i < n; i++) a[i] = subArraySum(pre, 0, i);
    }
    // pr(a);
    return a[n - 1];
};

const main = () => {
    let n = 4, k = 5
    let n2 = 5, k2 = 3
    pr(valueAfterKSeconds(n, k))
    pr(valueAfterKSeconds(n2, k2))
};

main()