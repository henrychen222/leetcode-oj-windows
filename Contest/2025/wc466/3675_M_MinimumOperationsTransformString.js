/**
 * 09/06/25 evening
 * https://leetcode.com/contest/weekly-contest-466/problems/minimum-operations-to-transform-string/
 */

const pr = console.log;

const ord = (c) => c.charCodeAt();

// Accepted
const minOperations = (s) => {
    let f = Array(26).fill(0), res = 0;
    for (const c of s) f[ord(c) - 97]++;
    for (let i = 1; i < 26; i++) {
        if (f[i] > 0) return 26 - i;
    }
    return 0;
};


const main = () => {
    let s = "yz"
    let s2 = "a";
    let s3 = "xxyyzzz"
    pr(minOperations(s))
    pr(minOperations(s2))
    pr(minOperations(s3)) // 3
};

main()


/*
 xxyyzzz
 yyyyzzz  2    1
 zzzzzzz  4    1
 aaaaaaa  7    1
          13   3

*/