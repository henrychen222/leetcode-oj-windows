/**
 * 06/15/24 evening
 * https://leetcode.com/contest/weekly-contest-402/problems/maximum-total-damage-with-spell-casting/
 */

const pr = console.log;

const counter = (a_or_s) => { let m = new Map(); for (const x of a_or_s) m.set(x, m.get(x) + 1 || 1); return m; };
const stmkey_in = (m) => new Map([...m].sort((x, y) => x[0] - y[0]));

// Accepted
// reference: uwi https://leetcode.cn/circle/discuss/ZOlvS4/ TsReaper
const maximumTotalDamage = (a) => {
    let m = counter(a), n = m.size, dp = Array(n).fill(0), l = 0, max = 0;
    m = stmkey_in(m);
    let u = [...m.keys()];
    // pr(m, u)
    for (let i = 0; i < n; i++) { // sliding window dp
        while (l < i && u[i] - u[l] > 2) {
            max = Math.max(max, dp[l++]);
        }
        dp[i] = max + u[i] * m.get(u[i]);
    }
    // pr(dp)
    return Math.max(...dp);
};

const main = () => {
    let a = [1, 1, 3, 4]
    let a2 = [7, 1, 6, 6]
    let debug1 = [7, 1, 6, 3];
    let debug2 = [5, 9, 2, 10, 2, 7, 10, 9, 3, 8];
    pr(maximumTotalDamage(a));
    pr(maximumTotalDamage(a2))
    pr(maximumTotalDamage(debug1)) // 10
    pr(maximumTotalDamage(debug2)) // 31
};

main()