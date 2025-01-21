/**
 * 01/16/25 afternoon
 * https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/
 */

const pr = console.log;


const { MinPriorityQueue } = require('@datastructures-js/priority-queue')

// Accepted
/*
reference:
https://leetcode.com/contest/weekly-contest-176/ranking/  uwi
https://leetcode.cn/problems/maximum-number-of-events-that-can-be-attended/solutions/101227/zui-duo-ke-yi-can-jia-de-hui-yi-shu-mu-by-leetcode/
*/

// Accepted
const maxEvents = (events) => {
    events.sort((x, y) => x[0] - y[0]);
    let max = -Infinity, n = events.length;
    for (const [start, end] of events) max = Math.max(max, start, end);
    let pq = new MinPriorityQueue({ compare: (x, y) => x - y }), res = 0, i = 0;
    for (let curDay = 1; curDay <= max; curDay++) {
        while (i < n) {
            let [start, end] = events[i];
            if (start != curDay) break;
            pq.enqueue(end);
            i++;
        }
        // pr(curDay, pq.toArray())
        while (!pq.isEmpty()) {
            let cur = pq.dequeue();
            if (cur >= curDay) {
                res++;
                break;
            }
        }
    }
    return res;
};


const main = () => {
    let events = [[1, 2], [2, 3], [3, 4]];
    let events2 = [[1, 2], [2, 3], [3, 4], [1, 2]];
    let events_debug1 = [[1, 100000]];
    let events_debug2 = [[1, 4], [4, 4], [2, 2], [3, 4], [1, 1]];
    pr(maxEvents(events))
    pr(maxEvents(events2))
    pr(maxEvents(events_debug1)) // 1
    pr(maxEvents(events_debug2)) // 4
};

main()