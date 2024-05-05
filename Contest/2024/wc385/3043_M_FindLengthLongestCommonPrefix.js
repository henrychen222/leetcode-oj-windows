/**
 * 02/17/24 evening
 * https://leetcode.com/contest/weekly-contest-385/problems/find-the-length-of-the-longest-common-prefix/
 */

const pr = console.log;

// Accepted
const longestCommonPrefix = (a, b) => {
    a = new Set(a), b = new Set(b), res1 = go(a, b), res2 = go(b, a);
    return Math.max(res1, res2);
};

const go = (a, b) => {
    let res = 0, B = new Set();
    for (const x of b) {
        let s = x  + '', cur = '';
        for(const c of s) {
            cur += c;
            B.add(cur - '0');
        }
    }
    // pr(a, B)
    for (const x of a) {
        let s = x + '', cur = '';
        for (const c of s) {
            cur += c;
            // pr(cur - '0', B.has(cur - '0'))
            if (B.has(cur - '0')) res = Math.max(res, cur.length);
        }
    }
    return res;
};

const main = () => {
    let a = [1, 10, 100], b = [1000]
    let a2 = [1, 2, 3], b2 = [4, 4, 4];
    let a_debug1 = [17], b_debug1 = [16]
    pr(longestCommonPrefix(a, b))
    pr(longestCommonPrefix(a2, b2))
    pr(longestCommonPrefix(a_debug1, b_debug1)) // 1
};

main()
