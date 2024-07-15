/**
 * 05/25/24 evening
 * https://leetcode.com/contest/weekly-contest-399/problems/find-the-number-of-good-pairs-ii/
 */

const pr = console.log;

/*
a[i] % (b[j] * k) == 0
*/
// Accepted
const numberOfPairs = (a, b, k) => {
    let sa = new Set(a), ma = new Map(), mb = new Map(), res = 0;
    for (const x of a) ma.set(x, ma.get(x) + 1 || 1)
    for (const x of b) mb.set(x, mb.get(x) + 1 || 1)
    // pr(ma, mb)
    for (const x of sa) {
        let factors = findAllFactors(x), cnt = 0;
        for (const f of factors) {
            cnt += mb.get(f / k) || 0;
        }
        // pr(x, factors, cnt, ma.get(x))
        res += cnt * ma.get(x);
    }
    return res;
};

const findAllFactors = (n) => {
    let res = new Set();
    for (let i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            if (i == n / i) {
                res.add(i);
            } else {
                res.add(i);
                res.add(n / i);
            }
        }
    }
    return res;
};

const main = () => {
    let a = [1, 3, 4], b = [1, 3, 4], k = 1;
    let a2 = [1, 2, 4, 12], b2 = [2, 4], k2 = 3
    let a_debug1 = [70,70], b_debug1 = [6, 10], k_debug1 = 7;
    pr(numberOfPairs(a, b, k))
    pr(numberOfPairs(a2, b2, k2))
    pr(numberOfPairs(a_debug1, b_debug1, k_debug1)) // 2
};

main()