/**
 * 03/23/24 night
 * https://leetcode.com/contest/weekly-contest-390/problems/most-frequent-ids/
 */

const pr = console.log;

const { MinPriorityQueue } = require('@datastructures-js/priority-queue')

// Accepted
// reference: https://leetcode.cn/circle/discuss/NA3dOo/
const mostFrequentIDs = (a, b) => {
    let pq = new MinPriorityQueue({ compare: (x, y) => y[1] - x[1]}), res = [];
    let n = a.length, max = Math.max(...a); f = Array(max + 1).fill(0);
    for (let i = 0; i < n; i++) {
        let x = a[i], occ = b[i];
        f[x] += occ;
        pq.enqueue([x, f[x]]);
        // pr(pq.toArray(), f)
        while (pq.size() > 0 && pq.front()[1] != f[pq.front()[0]]) pq.dequeue(); // lazy remove
        // pr(pq.toArray())
        res.push(pq.size() == 0 ? 0 : pq.front()[1]);
    }
    return res;
};

const main = () => {
    let a = [2, 3, 2, 1], b = [3, 2, -3, 1]
    let a2 = [5, 5, 3], b2 = [2, -2, 1]
    let a_debug1 = [7,7], b_debug1 = [3,5]
    pr(mostFrequentIDs(a, b))
    pr(mostFrequentIDs(a2, b2))
    pr(mostFrequentIDs(a_debug1, b_debug1))
};

main()