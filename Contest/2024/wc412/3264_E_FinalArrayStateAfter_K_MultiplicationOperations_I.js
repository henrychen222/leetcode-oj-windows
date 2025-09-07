/**
 * 08/24/24 evening
 * https://leetcode.com/contest/weekly-contest-412/problems/final-array-state-after-k-multiplication-operations-i/
 */

const pr = console.log;

const { MinPriorityQueue } = require('@datastructures-js/priority-queue')

// Accepted
const getFinalState = (a, k, m) => {
    let pq = new MinPriorityQueue({ compare: (x, y) => x[0] - y[0] || x[1] - y[1] }), res = Array(a.length);
    a.map((x, i) => pq.enqueue([x, i]))
    while (k--) {
        let cur = pq.dequeue();
        cur[0] *= m;
        pq.enqueue(cur);
    }
    while (!pq.isEmpty()) {
        let cur = pq.dequeue();
        res[cur[1]] = cur[0];
    }
    return res;
};


const main = () => {
    let a = [2, 1, 3, 5, 6], k = 5, multiplier = 2
    let a2 = [1, 2], k2 = 3, multiplier2 = 4
    pr(getFinalState(a, k, multiplier))
    pr(getFinalState(a2, k2, multiplier2))
};

main()