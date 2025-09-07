/**
 * 09/06/25 evening
 * https://leetcode.com/contest/weekly-contest-466/problems/minimum-operations-to-equalize-array
 */

const pr = console.log;

const aeq = (a) => a.every(x => x == a[0]);

// Accepted
const minOperations = (a) => {
    if (aeq(a)) return 0;
    let n = a.length, res = 0, cur = -1, target = a[0];
    for (let i = 1; i < n; i++) {
        target &= a[i];
    }
    for (let i = 0; i < n; i++) {
        cur &= a[i];
        if (cur == target) {
            res++;
            cur = -1;
        }
    }
    return Math.min(res, 1);
};


const main = () => {
    let a = [1, 2];
    let a2 = [5, 5, 5]
    let a3 = [5, 3, 7, 3];
    let debug1 = [109,14,19,32,89];
    pr(minOperations(a))
    pr(minOperations(a2))
    pr(minOperations(a3)) //
    pr(minOperations(debug1)) // 1
};

main()


// pr(~0)