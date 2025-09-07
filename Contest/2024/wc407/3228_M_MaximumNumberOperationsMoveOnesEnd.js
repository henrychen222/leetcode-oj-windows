/**
 * 07/20/24 evening
 * https://leetcode.com/contest/weekly-contest-407/problems/maximum-number-of-operations-to-move-ones-to-the-end/
 */

const pr = console.log;

const cutMaxConsecutive = (as) => { let d = [], l = 0, n = as.length; for (let i = 0; i + 1 < n; i++) { if (as[i + 1] != as[i]) { d.push(as.slice(l, i + 1)); l = i + 1; } } d.push(as.slice(l)); return d; };

const maxOperations = (s) => {
    let d = cutMaxConsecutive(s), zero = 0, res = 0;
    for (let i = d.length - 1; i >= 0; i--) {
        if (d[i][0] == '0') {
            zero++;
        } else {
            res += d[i].length * zero;
        }
    }
    return res;
};

const main = () => {
    let s = "1001101"
    let s2 = "00111";
    let s_test = "10010011001"
    pr(maxOperations(s))
    pr(maxOperations(s2))
    pr(maxOperations(s_test))
};

main()