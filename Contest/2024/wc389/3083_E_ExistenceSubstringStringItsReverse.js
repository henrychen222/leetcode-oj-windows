/**
 * 03/16/23 evening
 * https://leetcode.com/contest/weekly-contest-389/problems/existence-of-a-substring-in-a-string-and-its-reverse/
 */

const pr = console.log;

// Accepted
const isSubstringPresent = (s) => {
    let r = '', n = s.length;
    for (let i = n - 1; ~i; i--) r += s[i];
    for (let i = 1; i < n; i++) {
        let sub = s[i - 1] + s[i]
        // pr(sub, r, r.includes(sub))
        if (r.includes(sub)) return true;
    }
    return false;
};


const main = () => {
    let s = "leetcode"
    let s2 = "abcba"
    let s3 = "abcd"
    let s_debug1 = "goxo";
    pr(isSubstringPresent(s))
    pr(isSubstringPresent(s2))
    pr(isSubstringPresent(s3))
    pr(isSubstringPresent(s_debug1))
};

main()