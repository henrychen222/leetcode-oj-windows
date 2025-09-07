/**
 * 06/15/24 evening
 * https://leetcode.com/contest/weekly-contest-402/problems/count-pairs-that-form-a-complete-day-ii/
 */

const pr = console.log;

const totPairs = (n) => n * (n - 1) / 2;

// Accepted chatGPT
const countCompleteDayPairs = (a) => {
    let remainderCounts = Array(24).fill(0), res = 0;
    for (const x of a) remainderCounts[x % 24]++;
    res += totPairs(remainderCounts[0]);
    res += totPairs(remainderCounts[12]);
    for (let r = 1; r < 12; r++) {
        res += remainderCounts[r] * remainderCounts[24 - r];
    }
    return res;
};


const main = () => {
    let a = [12, 12, 30, 24, 24];
    let a2 = [72, 48, 24, 3];
    pr(countCompleteDayPairs(a));
    pr(countCompleteDayPairs(a2))
};

main()




pr(999999984 / 24)