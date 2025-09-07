/**
 * 07/06/24 evening
 * https://leetcode.com/contest/weekly-contest-405/problems/generate-binary-strings-without-adjacent-zeros/
 */

const pr = console.log;

// Accepted
let res, n;
const validStrings = (N) => {
    res = [], n = N;
    dfs([]);
    return res;
};

const dfs = (cur) => {
    // pr(cur.join(""))
    if (cur.length > n) return;
    for (let i = 0; i <= 1; i++) {
        cur.push(i);
        if (ok(cur)) {
            if (cur.length == n) res.push(cur.join(""));
            dfs(cur);
        }
        cur.pop();
    }
};

const ok = (a) => {
    for (let i = 1; i < a.length; i++) {
        if (a[i - 1] == 0 && a[i] == 0) return false;
    }
    return true;
};

const main = () => {
    let n = 3;
    let n2 = 1;
    let n3 = 18;
    pr(validStrings(n))
    pr(validStrings(n2))
    // pr(validStrings(n3))
};

main()
