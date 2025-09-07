/**
 * 06/08/24 night
 * https://leetcode.com/contest/weekly-contest-401/problems/maximum-total-reward-using-operations-ii/
 */

const pr = console.log;

const ll = BigInt;
const maxTotalReward = (a) => {
    a.sort((x, y) => x - y);
    let dp = 1n;
    for (const x of a) {
        let v = dp & ((1n << ll(x)) - 1n);
        dp |= v << ll(x);
        // pr(v, dp)
    }
    // pr(dp, dp.toString(2))
    return dp.toString(2).length - 1;
};

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


// 111100100000000101111100000000000101
// 111100100000000101111100000000000101