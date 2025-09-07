/**
 * 01/20/24 morning
 * https://leetcode.com/contest/biweekly-contest-122/problems/minimize-length-of-array-using-operations/
 */

const pr = console.log;

const { MinPriorityQueue } = require('@datastructures-js/priority-queue')

// Accepted
const minimumArrayLength = (a) => {
    let min = Math.min(...a), cnt = a.filter(x => x == min).length, il = false;
    a.map(x => {
        if (x % min > 0) il = true;
    })
    return il ? 1 : (cnt + 1) >> 1;
};

const main = () => {
    let a = [1, 4, 3, 1]
    let a2 = [5, 5, 5, 10, 5]
    let a3 = [2, 3, 4]
    let a_debug1 = [5, 2, 2, 2, 9, 10];
    let a_debug2 = [3, 4, 3, 4, 1, 1, 1, 2];
    pr(minimumArrayLength(a))
    pr(minimumArrayLength(a2))
    pr(minimumArrayLength(a3))
    pr(minimumArrayLength(a_debug1)) // 1
    pr(minimumArrayLength(a_debug2)) // 2
};

main()