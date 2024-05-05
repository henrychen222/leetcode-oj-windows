/**
 * 03/16/23 evening
 * https://leetcode.com/contest/weekly-contest-389/problems/count-substrings-starting-and-ending-with-given-character/
 */

const pr = console.log;

// Accepted
const countSubstrings = (s, C) => {
    let cnt = 0;
    for (const c of s) {
        if (c == C) cnt++;
    }
    return (1 + cnt) * cnt / 2;
};


const main = () => {
    let s = "abada", c = "a";
    let s2 = "zzz", c2 = "z";
    pr(countSubstrings(s, c))
    pr(countSubstrings(s2, c2))
};

main()