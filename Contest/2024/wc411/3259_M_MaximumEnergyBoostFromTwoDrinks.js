/**
 * 08/17/23 evening
 * https://leetcode.com/contest/weekly-contest-411/problems/maximum-energy-boost-from-two-drinks/
 */

const pr = console.log;

// const maxEnergyBoost = (a, b) => {
//     let res1 = go(a, b), res2 = go(b, a);
//     return Math.max(res1, res2);
// };

// const go = (a, b) => {
//     let n = a.length, dp = Array(n);
//     dp[0] = a[0];
//     for (let i = 1; i < n; i++) {
//         dp[i] = dp[i - 1] + a[i];
//         if (i - 2 >= 0) {
//             dp[i] = Math.max(dp[i], dp[i - 2] + b[i])
//         }
//     }
//     pr(dp);
//     return dp[n - 1];
// };

// Accepted
// chatGPT
const maxEnergyBoost = (energyDrinkA, energyDrinkB) => {
    const n = energyDrinkA.length;
    let dpA = new Array(n).fill(0);
    let dpB = new Array(n).fill(0);

    dpA[0] = energyDrinkA[0];
    dpB[0] = energyDrinkB[0];
    
    for (let i = 1; i < n; i++) {
        dpA[i] = Math.max(dpA[i - 1] + energyDrinkA[i], (i > 1 ? dpB[i - 2] : 0) + energyDrinkA[i]);
        dpB[i] = Math.max(dpB[i - 1] + energyDrinkB[i], (i > 1 ? dpA[i - 2] : 0) + energyDrinkB[i]);
    }
    
    return Math.max(dpA[n - 1], dpB[n - 1]);
};

const main = () => {
    let a = [1, 3, 1], b = [3, 1, 1]
    let a2 = [4, 1, 1], b2 = [1, 1, 3]
    let a_debug1 = [5, 5, 6, 3, 4, 3, 3, 4], b_debug1 = [5, 3, 3, 4, 4, 6, 6, 3]
    pr(maxEnergyBoost(a, b))
    pr(maxEnergyBoost(a2, b2))
    pr(maxEnergyBoost(a_debug1, b_debug1))
};

main()