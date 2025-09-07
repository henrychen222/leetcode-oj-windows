/**
 * 06/22/24 evening
 * https://leetcode.com/contest/weekly-contest-403/problems/maximize-total-cost-of-alternating-subarrays/
 */

const pr = console.log;

// 转化一下题意：给 nums 的每个元素前面加上正负号，其中正号可以任意添加（因为可以视为一个子数组的开头, 负号元素只能紧接在正号元素后面。求最大和
// reference: https://leetcode.cn/circle/discuss/9NYliL/
const initialize2DArray = (n, m) => [...Array(n)].map(() => Array(m).fill(Number.MIN_SAFE_INTEGER));
const maximumTotalCost = (a) => {
    let n = a.length, f = initialize2DArray(n, 2);
    f[0][0] = a[0];
    for (let i = 1; i < n; i++) {
        f[i][0] = Math.max(f[i - 1][0], f[i - 1][1]) + a[i];
        f[i][1] = f[i - 1][0] - a[i];
    }
    return Math.max(f[n - 1][0], f[n - 1][1])
};


// const maximumTotalCost = (a) => {
//     let n = a.length, maxEndingHere = a[0], maxSoFar = a[0];
//     for (let i = 1; i < n; i++) {
//         if (i % 2 != 0) {
//             maxEndingHere = Math.max(maxEndingHere - a[i], a[i]);
//             pr("odd", maxEndingHere, a[i])
//         } else {
//             maxEndingHere = Math.max(maxEndingHere + a[i], a[i]);
//             pr("even", maxEndingHere, maxEndingHere + a[i], a[i])
//         }
//         maxSoFar = Math.max(maxSoFar, maxEndingHere);
//     }
//     return maxSoFar;
// };

// https://www.geeksforgeeks.org/maximum-sum-alternating-subarray/
// const maximumTotalCost = (a) => {
//     let res = 0, sumSoFar = 0;
//     a.map((x, i) => {
//         if (i % 2 != 0) {
//             sumSoFar -= x;
//         } else {
//             sumSoFar = Math.max(sumSoFar + x, x);
//         }
//         pr(sumSoFar)
//         res = Math.max(res, sumSoFar);
//     })
//     sumSoFar = 0;
//     a.map((x, i) => {
//         if (i % 2 == 0) {
//             sumSoFar -= x;
//         } else {
//             sumSoFar = Math.max(sumSoFar + x, x);
//         }
//         res = Math.max(res, sumSoFar);
//     })
//     return res;
// };


const main = () => {
    let a = [1, -2, 3, 4];
    let a2 = [1, -1, 1, -1];
    let a3 = [0];
    let a4 = [1, -1];
    let a5 = [-4, -10, 3, 5]
    pr(maximumTotalCost(a))
    pr(maximumTotalCost(a2))
    pr(maximumTotalCost(a3))
    pr(maximumTotalCost(a4))
    pr(maximumTotalCost(a5)) // 14
};

main()