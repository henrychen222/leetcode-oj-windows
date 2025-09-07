/*
 * 07/13/24 evening
 * https://leetcode.com/contest/weekly-contest-406/problems/minimum-cost-for-cutting-cake-i/
 */

const pr = console.log;

// Accepted
// reference: https://www.geeksforgeeks.org/minimum-cost-cut-board-squares/
const minimumCost = (m, n, H, V) => {
    m--;
    n--;
    let res = 0;
    H.sort((x, y) => y - x);
    V.sort((x, y) => y - x);
    let Hcnt = 1, Vcnt = 1;
    let i = 0, j = 0;
    while (i < m && j < n) {
        if (H[i] > V[j]) {
            res += H[i] * Vcnt;
            Hcnt++;
            i++;
        } else {
            res += V[j] * Hcnt;
            Vcnt++;
            j++;
        }
    }
    let total = 0;
    while (i < m) total += H[i++];
    res += total * Vcnt;
    total = 0;
    while (j < n) total += V[j++];
    res += total * Hcnt;
    return res;
};

const main = () => {
    let m = 3, n = 2, horizontalCut = [1, 3], verticalCut = [5]
    let m2 = 2, n2 = 2, horizontalCut2 = [7], verticalCut2 = [4]
    let m3 = 6, n3 = 4, X = [2, 1, 3, 1, 4], Y = [4, 1, 2];
    pr(minimumCost(m, n, horizontalCut, verticalCut));
    pr(minimumCost(m2, n2, horizontalCut2, verticalCut2));
    pr(minimumCost(m3, n3, X, Y)); // 42
};

main()