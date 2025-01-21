/**
 * 12/07/24 evening
 * https://leetcode.com/contest/weekly-contest-427/problems/maximum-subarray-sum-with-length-divisible-by-k/
 */

const pr = console.log;

const preSum = (a) => { let pre = [0]; for (let i = 0; i < a.length; i++) { pre.push(pre[i] + a[i]); } return pre; };
const subArraySum = (a, l, r) => a[r + 1] - a[l];

// WA
// function maxSubarraySum(a, k) {
//     let prefixSum = 0, maxSum = -Infinity, remainderMap = { 0: -1 }, pre = preSum(a), minPreSum = {};
//     for (let i = 0; i < a.length; i++) {
//         prefixSum += a[i];
//         let remainder = (i + 1) % k;
//         if (remainder < 0) remainder += k;
//         if (remainder in remainderMap) {
//             let subarrayLength = i - remainderMap[remainder];
//             if (subarrayLength % k === 0) {
//                 let sub = prefixSum - (remainderMap[remainder] === -1 ? 0 : subArraySum(pre, 0, remainderMap[remainder]));
//                 pr("subarrayLength", subarrayLength, remainderMap[remainder], i, "sub", sub)
//                 maxSum = Math.max(maxSum, sub);
//             }
//         } else {
//             remainderMap[remainder] = i;
//         }
//     }
//     return maxSum === -Infinity ? -1 : maxSum;
// }

// Accepted --- https://leetcode.cn/circle/discuss/rbmRgF/
function maxSubarraySum(a, k) {
    let sum = 0, res = -Infinity, mod = Array(k).fill(Infinity);
    mod[k - 1] = 0;
    for (let i = 0; i < a.length; i++) {
        sum += a[i]; // subarray[0, i] sum
        let rem = i % k, pre = mod[rem] // pre: min presum
        res = Math.max(res, sum - pre);
        mod[rem] = Math.min(pre, sum);
    }
    return res;
};

const main = () => {
    let a = [1, 2], k = 1;
    let a2 = [-1, -2, -3, -4, -5], k2 = 4;
    let a3 = [-5, 1, 2, -3, 4], k3 = 2
    let a_debug1 = [-10, -1], k_debug1 = 1;
    let a_debug2 = [1, 2], k_debug2 = 1;
    pr(maxSubarraySum(a, k))
    pr(maxSubarraySum(a2, k2))
    pr(maxSubarraySum(a3, k3))
    pr(maxSubarraySum(a_debug1, k_debug1)) // -1
    pr(maxSubarraySum(a_debug2, k_debug2)) // 3
};

main()