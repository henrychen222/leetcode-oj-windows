/**
 * 08/24/24 evening
 * https://leetcode.com/contest/weekly-contest-412/problems/count-almost-equal-pairs-i/
 */

const pr = console.log;

// Accepted
const countPairs = (a) => {
    let n = a.length, res = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (a[i] == a[j] || ok(a[i], a[j]) || ok(a[j], a[i])) res++;
        }
    }
    return res;
};

const ok = (x, y) => {
    let sx = x + '', n = sx.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let swap = sx.slice(0, i) + sx[j] + sx.slice(i + 1, j) + sx[i] + sx.slice(j + 1);
            if (Number(swap) == y) return true;
        }
    }
    return false;
};

const main = () => {
    let a = [3, 12, 30, 17, 21];
    let a2 = [1, 1, 1, 1, 1];
    let a3 = [123, 231];
    pr(countPairs(a))
    pr(countPairs(a2))
    pr(countPairs(a3))
};

main()