/**
 * 05/18/24 evening
 * https://leetcode.com/contest/weekly-contest-398/problems/sum-of-digit-differences-of-all-pairs/
 */

const pr = console.log;

const counter = (a_or_s) => { let m = new Map(); for (const x of a_or_s) m.set(x, m.get(x) + 1 || 1); return m; };

// Accepted
const sumDigitDifferences1 = (a) => {
    let g = a.map(x => (x + "").split("").map(Number)), n = g.length, m = g[0].length, res = 0;
    // pr(g, n, m)
    for (let j = 0; j < m; j++) {
        let cols = [];
        for (let i = 0; i < n; i++) cols.push(g[i][j])
        pr(cols, cal(cols))
        res += cal(cols);
    }
    return res;
};

const totPairs = (n) => n * (n - 1) / 2;

const cal = (a) => {
    let tot = totPairs(a.length), dup = 0, m = counter(a);
    for (const [, occ] of m) dup += totPairs(occ);
    return tot - dup;
};

// const cal = (a) => {
//     let m = counter(a), sum = 0, res = 0;
//     for (const x of a) sum += x;
//     for (const [x, cnt] of m) {
//         let restSum = sum - x * cnt, restCnt = a.length - cnt;
//         let diff = restCnt * Math.abs(x - restSum)
//         pr("restCnt", restCnt, x, restSum)
//         res += diff;
//     }
//     return res;
// };

////////////////////////////////////////////////////////////////////////////////
// Accepted chatGPT fjzzq2002

const initialize2DArray = (n, m) => [...Array(n)].map(() => Array(m).fill(0));

function sumDigitDifferences(a) {
    let m = (a[0] + '').length, res = 0, f = initialize2DArray(m, 10);
    for (const x of a) {
        let s = x + '';
        for (let i = 0; i < m; i++) {
            f[i][s[i] - '0']++; // Count the occurrences of each digit at each position
        }
    }
    // pr(f)
    for (let i = 0; i < m; i++) { // each position
        for (let x = 0; x <= 9; x++) { // pair x
            for (let y = 0; y <= 9; y++) { // pair y
                if (x !== y) {
                    res += f[i][x] * f[i][y];
                }
            }
        }
    }
    return res / 2;  // each pair is counted twice (x, y) and (y, x)
}

const main = () => {
    let a = [13, 23, 12];
    let a2 = [10, 10, 10, 10]
    let a_debug1 = [50, 28, 48];
    pr(sumDigitDifferences(a))
    pr(sumDigitDifferences(a2))
    pr(sumDigitDifferences(a_debug1)) // 5
};

main()


/*
50 28  2
50 48  2
28 48  1

5
*/