/**
 * 06/08/24 evening
 * https://leetcode.com/contest/weekly-contest-401/problems/maximum-total-reward-using-operations-i/
 */

const pr = console.log;

function memoize(fn) {
    let memo = {};
    return (...args) => {
        const argsStr = JSON.stringify(args);
        if (memo[argsStr] != undefined) return memo[argsStr];
        const res = fn(...args);
        memo[argsStr] = res;
        return res;
    };
};

// Accepted
// reference: https://leetcode.cn/circle/discuss/X7DKuT/ heng_xin
const maxTotalReward2 = (a) => {
    const dfs = memoize((sum) => {
        let res = 0;
        for (const x of a) {
            if (x > sum) {
                res = Math.max(res, dfs(sum + x) + x);
            }
        }
        return res;
    });
    return dfs(0);
};

// TLE
// const maxTotalReward = (a) => {
//     let n = a.length, used = Array(n).fill(false), max = Math.max(...a), res = 0, path = new Set();
//     // a.sort((x, y) => y - x);
//     const dfs = memoize((sum, path) => {
//         if (sum > 2 * max) return;
//         res = Math.max(res, sum);
//         // pr(sum, path)
//         for (let i = 0; i < n; i++) {
//             if (!used[i] && a[i] > sum) {
//                 used[i] = true;
//                 path.add(i);
//                 dfs(sum + a[i], path);
//                 used[i] = false;
//                 path.delete(i);
//             }
//         }
//     });
//     dfs(0, path)
//     return res;
// };

// Accepted Yawn_Sean
const maxTotalReward = (a) => {
    a.sort((x, y) => x - y);
    // pr(a)
    let n = a.length, max = a[n - 1], dp = Array(2 * max + 1).fill(0);
    for (const x of a) {
        for (let i = 0; i < x; i++) {
            if (dp[i] + x > dp[i + x]) {
                dp[i + x] = dp[i] + x;
            }
        }
    }
    // pr(dp)
    return Math.max(...dp);
};


// WA
// const maxTotalReward = (a) => {
//     a.sort((x, y) => x - y);
//     // pr(a)
//     let n = a.length, dp = Array(n + 1).fill(0);
//     for (let i = 0; i < n; i++) {
//         for (let j = i; j >= 0; j--) {
//             // pr(a[i], dp[j], a[i] > dp[j])
//             if (a[i] > dp[j]) {
//                 dp[j + 1] = Math.max(dp[j + 1], dp[j] + a[i]);
//             } else {
//                 dp[j + 1] = Math.max(dp[j + 1], dp[j], a[i]);
//             }
//         }
//     }
//     pr(dp)
//     return Math.max(...dp);
// };

const main = () => {
    let a = [1, 1, 3, 3]
    let a2 = [1, 6, 4, 3, 2];
    let a3 = [];
    for (let i = 1; i <= 2000; i++) a3.push(i);
    let a_debug1 = [2, 15, 14, 18];
    pr(maxTotalReward(a))
    pr(maxTotalReward(a2))
    pr(maxTotalReward(a3))
    pr(maxTotalReward(a_debug1)) // 35
};

main()