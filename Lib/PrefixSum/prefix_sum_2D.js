/*
07/06/24 night
reference:
https://www.geeksforgeeks.org/prefix-sum-2d-array/
chatGPT

Example problem:
https://leetcode.com/problems/count-submatrices-with-equal-frequency-of-x-and-y/
*/

function prefixSum2D(g) {
    let n = g.length, m = g[0].length, pre = Array.from({ length: n }, () => Array(m).fill(0));
    build();
    return { regionSum }
    function build() {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                const up = i - 1 >= 0 ? pre[i - 1][j] : 0;
                const left = j - 1 >= 0 ? pre[i][j - 1] : 0;
                const upLeft = (i - 1 >= 0 && j - 1 >= 0) ? pre[i - 1][j - 1] : 0;
                pre[i][j] = g[i][j] + up + left - upLeft;
            }
        }
    }
    function regionSum(x1, y1, x2, y2) {
        const total = pre[x2][y2];
        const up = x1 - 1 >= 0 ? pre[x1 - 1][y2] : 0;
        const left = y1 - 1 >= 0 ? pre[x2][y1 - 1] : 0;
        const upLeft = (x1 - 1 >= 0 && y1 - 1 >= 0) ? pre[x1 - 1][y1 - 1] : 0;
        return total - up - left + upLeft;
    }
}


const g = [
    [3, 0, 1, 4, 2],
    [5, 6, 3, 2, 1],
    [1, 2, 0, 1, 5],
    [4, 1, 0, 1, 7],
    [1, 0, 3, 0, 5]
];


let p = prefixSum2D(g), sum = p.regionSum(1, 1, 3, 3)

console.log(sum); // 16
/*
6 3 2
2 0 1
1 0 1
 */
