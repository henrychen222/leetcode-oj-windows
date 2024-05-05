/**
 * 05/04/24 night
 * https://leetcode.com/contest/weekly-contest-396/problems/minimum-cost-to-equalize-array/
 */

const pr = console.log;

const mod = 1e9 + 7, ll = BigInt, bmod = ll(mod)

// Accepted
// reference: https://leetcode.cn/circle/discuss/RTvRnh/
const minCostToEqualizeArray = (a, b, c) => {
    b = ll(b), c = ll(c)
    let n = ll(a.length), limit = 0;
    for (const x of a) limit = Math.max(limit, x);

    // 计算一开始每个桶里有几个石头
    let sum = 0n, max = 0n;
    for (const x of a) {
        let remove = ll(limit - x);
        sum += remove;
        if (remove > max) max = remove;
    }
    if (n <= 2 || b * 2n <= c) return ll(sum) * ll(b) % bmod;

    let res = ll(1e18);
    // 从 limit 到 limit * 2 枚举目标数
    for (let i = limit; i <= limit * 2; i++) {
        let tmp;
        if (max > sum - max) {
            tmp = (sum - max) * c;
            let rem = max - (sum - max);
            tmp += rem * b;
        } else {
            tmp = sum / 2n * c;
            if (sum % 2n != 0) tmp += b;
        }
        if (tmp < res) res = tmp;
        // 目标数每增加 1，s 增加 n，m 增加 1
        sum += n;
        max++;
    }
    return res % bmod;
};


const main = () => {
    let a = [4, 1], b = 5, c = 2
    let a2 = [2, 3, 3, 3, 5], b2 = 2, c2 = 1
    let a3 = [3, 5, 3], b3 = 1, c3 = 3
    pr(minCostToEqualizeArray(a, b, c))
    pr(minCostToEqualizeArray(a2, b2, c2))
    pr(minCostToEqualizeArray(a3, b3, c3)) // 3
};

main()