/**
 * 05/04/24 evening
 * https://leetcode.com/contest/weekly-contest-396/problems/minimum-number-of-operations-to-make-word-k-periodic/
 */

const pr = console.log;

const counter = (a_or_s) => { let m = new Map(); for (const x of a_or_s) m.set(x, m.get(x) + 1 || 1); return m; };
const stmvalue_de = (m) => new Map([...m].sort((x, y) => y[1] - x[1]));

// Accepted
const minimumOperationsToMakeKPeriodic = (s, k) => {
    let d = [], cur = "";
    for (const c of s) {
        cur += c;
        if (cur.length == k) {
            d.push(cur);
            cur = "";
        }
    }
    let m = counter(d);
    m = stmvalue_de(m);
    let max = m.values().next().value || 0;
    // pr(d, m, max)
    return d.length - max;
};


const main = () => {
    let s = "leetcodeleet", k = 4;
    let s2 = "leetcoleet", k2 = 2;
    pr(minimumOperationsToMakeKPeriodic(s, k))
    pr(minimumOperationsToMakeKPeriodic(s2, k2))
};

main()