/**
 * 07/06/24 morning
 * https://leetcode.com/contest/biweekly-contest-134/problems/alternating-groups-ii/
 */

const pr = console.log;

const cutMaxAlternating = (as) => { let d = [], l = 0, n = as.length; for (let i = 0; i + 1 < n; i++) { if (as[i + 1] ^ as[i] == 0) { d.push(as.slice(l, i + 1)); l = i + 1; } } d.push(as.slice(l)); return d; };
const cal = (len, k) => Math.max(0, len - k + 1);

// Accepted  12:44 AC  11:11 start (10:30 late 41min)
const numberOfAlternatingGroups = (a, k) => {
    let d = cutMaxAlternating(a), res = 0, n = a.length;
    pr(d)
    let first = d[0][0], lastA = d[d.length - 1], last = lastA[lastA.length - 1];
    // if (d.length == 1 && first ^ last == 1) return a.length;
    if (first ^ last == 1) {
        // let combine = d[0].length + lastA.length;
        // res += cal(combine, k);
        // pr(cal(combine, k))
        // for (let i = 0; i < d.length - 1; i++) {
        //     res += cal(d[i].length, k);
        // }
        for (let i = n - 1; i >= n - lastA.length; i--) {
            if (i + k - 1 > n - 1 && (i + k - 1) % n < d[0].length) res++;
        }
    }
    for (const e of d) {
        res += cal(e.length, k);
    }
    return res;
};


const main = () => {
    let a = [0, 1, 0, 1, 0], k = 3;
    let a2 = [0, 1, 0, 0, 1, 0, 1], k2 = 6;
    let a3 = [1, 1, 0, 1], k3 = 4;
    let a_debug1 = [0, 1, 0, 1], k_debug1 = 3;
    let a_debug2 = [0, 1, 0, 1], k_debug2 = 4;
    let a_debug3 = [0, 0, 1, 0, 1], k_debug3 = 3;
    let a_debug4 = [0, 1, 0, 0, 1], k_debug4 = 3;
    pr(numberOfAlternatingGroups(a, k))
    pr(numberOfAlternatingGroups(a2, k2))
    pr(numberOfAlternatingGroups(a3, k3))
    pr(numberOfAlternatingGroups(a_debug1, k_debug1)) // 4
    pr(numberOfAlternatingGroups(a_debug2, k_debug2)) // 4
    pr(numberOfAlternatingGroups(a_debug3, k_debug3)) // 3
    pr(numberOfAlternatingGroups(a_debug4, k_debug4)) // 3
};

main()


// [[0, 1], [0, 1, 0]]   [[0, 1, 0, 1], [0, 1, 0]] 