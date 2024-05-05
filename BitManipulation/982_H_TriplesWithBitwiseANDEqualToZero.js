/**
 * 01/10/24 night
 * https://leetcode.com/problems/triples-with-bitwise-and-equal-to-zero/
 * https://leetcode.com/contest/weekly-contest-121/ranking
 */

const pr = console.log;

// Accepted --- 2554ms
const countTriplets = (a) => {
    let n = a.length, res = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                // pr(a[i], a[j], a[k], a[i] & a[j] & a[k])
                if ((a[i] & a[j] & a[k]) == 0) res++;
            }
        }
    }
    return res;
};


const main = () => {
    let a = [2, 1, 3];
    let a2 = [0, 0, 0];
    pr(countTriplets(a))
    pr(countTriplets(a2))
};

main()