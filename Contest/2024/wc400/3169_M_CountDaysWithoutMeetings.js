/**
 * 06/01/24 evening
 * https://leetcode.com/contest/weekly-contest-400/problems/count-days-without-meetings/
 */

const pr = console.log;

const dis = (l, r) => Math.max(0, r - l - 1)

// Accepted
const countDays = (days, meetings) => {
    let d = mergeIntervalUnion(meetings), L = dis(0, d[0][0]), R = days - d[d.length - 1][1], middle = 0;
    // pr(d)
    if (d.length > 1) {
        let pre = d[0][1];
        for (let i = 1; i < d.length; i++) {
            let len = dis(d[i - 1][1], d[i][0]);
            middle += len;
            pre = d[i][1];
        }
    }
    // pr(L, middle, R);
    return L + middle + R;
};

const mergeIntervalUnion = (a) => {
    a.sort((x, y) => x[0] - y[0]);
    let res = [[a[0][0], a[0][1]]], preEnd = a[0][1];
    for (const [start, end] of a) {
        if (start > preEnd) {
            res.push([start, end]);
            preEnd = end;
        } else {
            let pre = res.pop();
            let left = Math.min(pre[0], start);
            let right = Math.max(pre[1], end);
            res.push([left, right]);
            preEnd = right;
        }
    }
    return res;
};

const main = () => {
    let a = 10, b = [[5, 7], [1, 3], [9, 10]]
    let a2 = 5, b2 = [[2, 4], [1, 3]]
    let a3 = 6, b3 = [[1, 6]]
    pr(countDays(a, b))
    pr(countDays(a2, b2))
    pr(countDays(a3, b3))
};

main()