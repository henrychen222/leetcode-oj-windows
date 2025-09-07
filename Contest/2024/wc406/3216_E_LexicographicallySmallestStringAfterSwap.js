/*
 * 07/13/24 evening
 * https://leetcode.com/contest/weekly-contest-406/problems/lexicographically-smallest-string-after-a-swap/
 */

const pr = console.log;

// Accepted
const getSmallestString = (s) => {
    let n = s.length, res = s.split("");
    for (let i = 1; i < n; i++) {
        if ((s[i - 1] - '0') % 2 == (s[i] - '0') % 2 && (s[i] + s[i - 1] < s[i - 1] + s[i])) {
            [res[i - 1], res[i]] = [res[i], res[i - 1]];
            break;
        }
    }
    return res.join("");
};

const main = () => {
    let s = "45320"
    let s2 = "001";
    let s_debug1 = "13";
    pr(getSmallestString(s));
    pr(getSmallestString(s2));
    pr(getSmallestString(s_debug1)); // "13"
};

main()