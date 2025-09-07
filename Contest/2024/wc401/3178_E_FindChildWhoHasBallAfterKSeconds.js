/**
 * 06/08/24 evening
 * https://leetcode.com/contest/weekly-contest-401/problems/find-the-child-who-has-the-ball-after-k-seconds/
 */

const pr = console.log;

// Accepted
const numberOfChild = (n, k) => {
    let cur = 0, dir = 1;
    while (k--) {
        // pr(cur, k, dir)
        if (dir > 0) {
            if (cur + 1 <= n - 1) {
                cur++;
            } else {
                cur--;
                dir *= -1;
            }
        } else {
            if (cur - 1 >= 0) {
                cur--;
            } else {
                cur++;
                dir *= -1;
            }
        }
    }
    return cur;
};

const main = () => {
    let n = 3, k = 5
    let n2 = 5, k2 = 6
    let n3 = 4, k3 = 2
    let n_debug1 = 2, k_debug1 = 1
    pr(numberOfChild(n, k))
    pr(numberOfChild(n2, k2))
    pr(numberOfChild(n3, k3))
    pr(numberOfChild(n_debug1, k_debug1))
};

main()