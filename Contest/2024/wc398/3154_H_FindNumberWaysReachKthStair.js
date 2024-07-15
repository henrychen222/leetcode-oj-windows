/**
 * 05/18/24 night
 * https://leetcode.com/contest/weekly-contest-398/problems/find-number-of-ways-to-reach-the-k-th-stair/
 */

const pr = console.log;

// https://leetcode.com/problems/memoize/
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
// const waysToReachStair = (k) => dfs(1, 0, false, k);

// const dfs = memoize((pos, jump, isOption1Did, k) => {
//     if (pos > k + 1) return 0;
//     let res = pos == k;
//     if (!isOption1Did) res += dfs(pos - 1, jump, true, k);
//     res += dfs(pos + 2 ** jump, jump + 1, false, k)
//     return res;
// });

// Accepted
const waysToReachStair = (k) => {
    const dfs = memoize((pos, jump, isOption1Did) => {
        if (pos > k + 1) return 0;
        let res = pos == k;
        if (!isOption1Did) res += dfs(pos - 1, jump, true);
        res += dfs(pos + 2 ** jump, jump + 1, false)
        return res;
    });
    return dfs(1, 0, false)
};


///////////////////////////////////////////////////////////////////////////////////////
// const dfs = (pos, jump, isOption1Did) => {
//     if (pos > k + 1) return 0;
//     let res = pos == k;
//     if (!isOption1Did) res += dfs(pos - 1, jump, true);
//     res += dfs(pos + 2 ** jump, jump + 1, false)
//     return res;
// };

// Accepted
// reference: nguyenquocthao00  https://leetcode.cn/circle/discuss/GKQ9WA/
// let memo, k;
// const waysToReachStair = (K) => {
//     memo = new Map(), k = K;
//     return dfs(1, 0, false);
// };

// const dfs = (pos, jump, isOption1Did) => {
//     if (pos > k + 1) return 0;
//     let ke = pos + " " + jump + " " + isOption1Did;
//     if (memo.has(ke)) return memo.get(ke);
//     let res = pos == k;
//     if (!isOption1Did) res += dfs(pos - 1, jump, true);
//     res += dfs(pos + 2 ** jump, jump + 1, false)
//     memo.set(ke, res);
//     return res;
// };

//////////////////////////////////////////////////////////////

const initialize3DArray = (n, m, p) => Array.from({ length: n }, () => Array.from({ length: m }, () => Array(p).fill(0)));

// WA
// const waysToReachStair = (k) => {
//     if (k == 0) return 2;
//     if (k == 1) return 4;
//     let maxJump = Math.ceil(Math.log2(k)) + 1;
//     let dp = initialize3DArray(k + 1, maxJump, 2);
//     dp[1][0][0] = 1;
//     // pr(dp, k + 1, maxJump)
//     for (let pos = 1; pos <= k; pos++) {
//         for (let jump = 0; jump < maxJump; jump++) {
//             for (let isOption1Did = 0; isOption1Did <= 1; isOption1Did++) {
//                 if (pos == k) dp[pos][jump][0] = 1;
//                 if (dp[pos][jump][isOption1Did] > 0) {
//                     if (!isOption1Did) {
//                         if (pos > 1) {  // Option 1: Go down to stair pos - 1
//                             // pr("111", pos)
//                             dp[pos - 1][jump][isOption1Did ^ 1] += dp[pos][jump][isOption1Did];
//                         }
//                     }
//                     let up = pos + 2 ** jump;
//                     if (up <= k) { // Option 2: Go up to stair pos + 2^jump
//                         // pr("222", pos)
//                         dp[up][jump + 1][isOption1Did] += dp[pos][jump][isOption1Did];
//                     }
//                 }
//             }
//         }
//     }
//     // pr(dp, k + 1, maxJump)
//     let res = 0;
//     for (let j = 0; j < maxJump; j++) {
//         res += dp[k][j][0] + dp[k][j][1];
//     }
//     return res;
// };

const main = () => {
    let k = 0;
    let k2 = 1;
    let k3 = 5;
    let k_debug1 = 524273;
    pr(waysToReachStair(k))
    pr(waysToReachStair(k2))
    pr(waysToReachStair(k3)) // 4
    pr(waysToReachStair(k_debug1)) // 15504
};

main()