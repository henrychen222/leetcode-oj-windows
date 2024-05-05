/**
 * 03/23/24 evening
 * https://leetcode.com/contest/weekly-contest-390/problems/apply-operations-to-make-sum-of-array-greater-than-or-equal-to-k/
 */

const pr = console.log;

// Accepted
// reference: https://leetcode.cn/circle/discuss/NA3dOo/
const minOperations = (k) => {
    let res = Number.MAX_SAFE_INTEGER;
    for(let i = 1; i <= k; i++) {
        res = Math.min(res, (i-1) + parseInt((k + i - 1) / i) - 1)
    }
    return res;
};


const main = () => {
    let k = 11;
    let k2 = 1;
    let k_debug1 = 3;
    pr(minOperations(k))
    pr(minOperations(k2))
    pr(minOperations(k_debug1)) // 2
};

main()



/*

[1, 1]

*/