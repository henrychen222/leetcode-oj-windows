/**
 * 01/20/24 morning
 * https://leetcode.com/contest/biweekly-contest-122/problems/find-if-array-can-be-sorted/
 */

const pr = console.log;

// Accepted
const canSortArray = (a) => {
    let n = a.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (a[i] > a[j] && !ok(a[i], a[j])) {
                // pr(a[i], a[j])
                return false
            }
        }
    }
    return true;
};

const N = 9;
const ok = (x, y) => {
    let cx = 0, cy = 0;
    for (let i = 0; i < N; i++) {
        if (x & (1 << i)) cx++;
        if (y & (1 << i)) cy++;
    }
    // pr(x, y, "cnt", cx, cy)
    return cx == cy;
};

const main = () => {
    let a = [8, 4, 2, 30, 15]
    let a2 = [1, 2, 3, 4, 5]
    let a3 = [3, 16, 8, 4, 2]
    let a_debug1 = [1,256,64];
    pr(canSortArray(a))
    pr(canSortArray(a2))
    pr(canSortArray(a3))
    pr(canSortArray(a_debug1)) // true
};

main()


// pr(1 << 8, 2 ** 8)

// let x = 256, y = 64
// pr(x.toString(2), y.toString(2))