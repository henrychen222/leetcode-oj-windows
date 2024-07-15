/**
 * 05/25/24 evening
 * https://leetcode.com/contest/weekly-contest-399/problems/string-compression-iii/
 */

const pr = console.log;

// const compressedString = (s) => {
//     let res = '', cur = '';
//     for (const c of s) {
//         if (cur.length > 0) {
//             if (cur.length < 9) {
//                 let last = cur[cur.length - 1];
//                 if (c == last) {
//                     cur += c;
//                 } else {
//                     res += '' + cur.length + cur;
//                     cur = '';
//                 }
//             } else {
//                 res += '9' + cur;
//                 cur = '';
//             }
//         } else {
//             cur += c;
//         }
//     }
//     return res;
// };

const cutMaxConsecutive = (a_or_s) => { let d = [], start = 0, n = a_or_s.length; for (let i = 0; i + 1 < n; i++) { if (a_or_s[i + 1] != a_or_s[i]) { d.push(a_or_s.slice(start, i + 1)); start = i + 1; } } d.push(a_or_s.slice(start)); return d; };

// Accepted
const compressedString = (s) => {
    let res = '', d = cutMaxConsecutive(s);
    for (const e of d) {
        let cnt = e.length / 9 >> 0, rem = e.length % 9;
        res += ('9' + e[0]).repeat(cnt);
        if (rem > 0) res += '' + rem + e[0];
    }
    return res;
};



const main = () => {
    let s = "abcde";
    let s2 = "aaaaaaaaaaaaaabb";
    let s_debug1 = "aaaaaaaaay";
    pr(compressedString(s))
    pr(compressedString(s2))
    pr(compressedString(s_debug1)) // "9a1y"
};

main()