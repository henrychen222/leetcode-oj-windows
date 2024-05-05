/**
 * 05/04/24 evening
 * https://leetcode.com/contest/weekly-contest-396/problems/minimum-length-of-anagram-concatenation/
 */

const pr = console.log;

const sortstr = (s) => s.split("").sort().join("");

// Accepted
const minAnagramLength = (s) => {
    let n = s.length, factors = findAllFactors(n), res = Number.MAX_SAFE_INTEGER;
    for (const k of factors) {
        let d = [], cur = "";
        for (const c of s) {
            cur += c;
            if (cur.length == k) {
                d.push(cur);
                cur = "";
            }
        }
        let ReArrange = new Set();
        for(const t of d) ReArrange.add(sortstr(t))
        // pr(k, d, ReArrange)
        if (ReArrange.size == 1) {
            res = Math.min(res, k);
        }
    }
    return res;
}

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
    let s = "abba";
    let s2 = "cdef";
    let s_debug1 = "xxe";
    pr(minAnagramLength(s))
    pr(minAnagramLength(s2))
    pr(minAnagramLength(s_debug1)) // 3
};

main()