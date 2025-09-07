/**
 * 07/20/24 morning
 * https://leetcode.com/contest/biweekly-contest-135/problems/minimum-array-changes-to-make-differences-equal/
 */

const pr = console.log;

const ok = (v, k) => v >= 0 && v <= k;
const counter = (a_or_s) => { let m = new Map(); for (const x of a_or_s) m.set(x, m.get(x) + 1 || 1); return m; };
const stmvalue_de = (m) => new Map([...m].sort((x, y) => y[1] - x[1]));

// Accepted
const minChanges = (a, k) => {
    let n = a.length, d = [], h = n >> 1, res = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < h; i++) d.push(Math.abs(a[i] - a[n - i - 1]));
    d.sort((x, y) => x - y);
    let m = counter(d);
    m = stmvalue_de(m);
    let maxFreq = m.keys().next().value;
    let vals = [maxFreq, d[h >> 1]]; // this idea from chatGPT
    if (d[(h >> 1) - 1] != undefined) vals.push(d[(h >> 1) - 1])
    // let vals = Array.from(m.keys())
    // pr(d, m, vals)
    vals.map(v => {
        let change = go(a, v, k);
        // pr("X", v, change)
        res = Math.min(res, change);
    })
    return res;
};


const go = (a, X, k) => {
    let res = 0, n = a.length;
    for (let i = 0; i < n >> 1; i++) {
        let l = a[i], r = a[n - i - 1];
        let curD = Math.abs(l - r);
        if (curD != X) {
            // pr([l, r], curD, X)
            if (ok(l - X, k) || ok(l + X, k) || ok(r - X, k) || ok(r + X, k)) {
                res++;
            } else {
                res += 2;
            }
        }
    }
    return res;
};


const main = () => {
    let a = [1, 0, 1, 2, 4, 3], k = 4
    let a2 = [0, 1, 2, 3, 3, 6, 5, 4], k2 = 6
    let a_debug1 = [18, 10, 14, 18, 17, 2, 11, 5], k_debug1 = 19
    let a_debug2 = [1, 1, 1, 1, 0, 0, 0, 5, 4, 3, 19, 17, 16, 15, 15, 15, 19, 19, 19, 19], k_debug2 = 20
    pr(minChanges(a, k))
    pr(minChanges(a2, k2))
    pr(minChanges(a_debug1, k_debug1)) // 2
    pr(minChanges(a_debug2, k_debug2)) // 7
};

main()