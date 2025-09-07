/**
 * 07/20/24 evening
 * https://leetcode.com/contest/weekly-contest-407/problems/number-of-bit-changes-to-make-two-integers-equal/
 */

const pr = console.log;

let N = 20;
const checkIthBit = (x, i) => x & (1 << i);

// Accepted
const minChanges = (n, k) => {
    let res = 0;
    for (let i = 0; i <= N; i++) {
        // pr(i, checkIthBit(n, i), checkIthBit(k, i))
        if (checkIthBit(n, i)) {
            if (checkIthBit(k, i)) {
            } else { // 1 -> 0 of n
                res++;
            }
        } else {
            if (checkIthBit(k, i)) {
                return -1;
            } else {
            }
        }
    }
    return res;
};

const main = () => {
    let n = 13, k = 4;
    let n2 = 21, k2 = 21
    let n3 = 14, k3 = 13
    pr(minChanges(n, k))
    pr(minChanges(n2, k2))
    pr(minChanges(n3, k3))
};

main()


pr(1<<20, 2 ** 20)