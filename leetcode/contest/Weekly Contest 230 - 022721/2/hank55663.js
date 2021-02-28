// 02/27/21 night

const pr = console.log;

// Accepted --- 88ms
const abs = Math.abs;
let res, tg, tc;
const closestCost = (bc, toppingCosts, target) => {
    tg = target;
    res = bc[0];
    tc = toppingCosts;
    m = tc.length;
    for (const b of bc) {
        dfs(0, b);
    }
    return res;
};

const dfs = (idx, sum) => {
    if (idx == m) {
        if (abs(sum - tg) < abs(res - tg)) {
            res = sum;
        }
        if (abs(sum - tg) == abs(res - tg) && sum < res) {
            res = sum;
        }
        return;
    }
    dfs(idx + 1, sum);
    dfs(idx + 1, sum + tc[idx]);
    dfs(idx + 1, sum + 2 * tc[idx]);
};

const main = () => {
    let baseCosts = [1, 7], toppingCosts = [3, 4], target = 10;
    let baseCosts2 = [2, 3], toppingCosts2 = [4, 5, 100], target2 = 18;
    let baseCosts3 = [3, 10], toppingCosts3 = [2, 5], target3 = 9;
    let baseCosts_debug1 = [10],toppingCosts_debug1 = [1], target_debug1 = 1;
    pr(closestCost(baseCosts, toppingCosts, target));
    pr(closestCost(baseCosts2, toppingCosts2, target2));
    pr(closestCost(baseCosts3, toppingCosts3, target3));
    pr(closestCost(baseCosts_debug1, toppingCosts_debug1, target_debug1)); // 10
};

main()