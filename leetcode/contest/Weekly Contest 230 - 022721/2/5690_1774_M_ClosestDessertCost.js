/**
 * 02/27/21 evening
 * https://leetcode.com/contest/weekly-contest-230/problems/closest-dessert-cost/
 */

const pr = console.log;

// let m, data;
// const closestCost = (bc, tc, target) => {
//     m = tc.length;
//     data = new Set();
//     for (const b of bc) {
//         for (let i = 0; i < m; i++) {
//             data.add(dfs(0, tc[i], i, 0) + b);
//             data.add(dfs(1, tc[i], i, 0) + b);
//             data.add(dfs(2, tc[i], i, 0) + b);
//         }
//     }
//     let minDiff = Number.MAX_SAFE_INTEGER;
//     for (const e of data) {
//         if (e >= target) {
//             minDiff = Math.min(minDiff, e - target);
//         } else {
//             minDiff = Math.min(minDiff, target - e);
//         }
//     }
//     pr(data, minDiff);
// };

// const dfs = (cnt, t, idx, sum) => {
//     pr(sum, t, idx);
//     if (idx == m - 1) return sum;
//     sum += cnt * t;
// };


// WA
let sum, m, data;
const closestCost = (bc, tc, target) => {
    m = tc.length;
    data = new Set();
    for (const b of bc) {
        sum = b;
        for (let i = 0; i < m; i++) {
            dfs(0, tc[i], i);
            // sum = b;
            dfs(1, tc[i], i);
            // sum = b;
            dfs(2, tc[i], i);
        }
    }
    let minDiff = Number.MAX_SAFE_INTEGER;
    for (const e of data) {
        if (e >= target) {
            minDiff = Math.min(minDiff, e - target);
        } else {
            minDiff = Math.min(minDiff, target - e);
        }
    }
    // pr(data, minDiff);
    let res = [];
    for (const e of data) {
        if (Math.abs(e - minDiff) == target) res.push(e);
    }
    return Math.min.apply(Math, res);
};

const dfs = (cnt, t, idx) => {
    if (idx == m - 1) data.add(sum);
    sum += cnt * t;
};

const main = () => {
    let baseCosts = [1, 7], toppingCosts = [3, 4], target = 10;
    let baseCosts2 = [2, 3], toppingCosts2 = [4, 5, 100], target2 = 18;
    let baseCosts3 = [3, 10], toppingCosts3 = [2, 5], target3 = 9;
    pr(closestCost(baseCosts, toppingCosts, target));
    pr(closestCost(baseCosts2, toppingCosts2, target2));
    pr(closestCost(baseCosts3, toppingCosts3, target3));
};

main()