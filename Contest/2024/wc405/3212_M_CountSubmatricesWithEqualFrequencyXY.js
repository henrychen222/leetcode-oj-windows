/**
 * 07/06/24 evening
 * https://leetcode.com/contest/weekly-contest-405/problems/count-submatrices-with-equal-frequency-of-x-and-y/
 */

const pr = console.log;


function prefixSum2D(g) {
    let n = g.length, m = g[0].length, pre = Array.from({ length: n }, () => Array(m).fill(0));
    build();
    // pr(pre)
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

const deepCopy2DArray = (g) => { let d = []; for (const a of g) d.push([...a]); return d; };

// Accepted
function numberOfSubmatrices(g) {
    let n = g.length, m = g[0].length, res = 0, X = deepCopy2DArray(g), Y = deepCopy2DArray(g);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            X[i][j] = X[i][j] == 'X' ? 1 : 0;
            Y[i][j] = Y[i][j] == 'Y' ? 1 : 0;
        }
    }
    let px = prefixSum2D(X), py = prefixSum2D(Y);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (i == 0 && j == 0) {
                for (let rowEnd = i; rowEnd < n; rowEnd++) {
                    for (let colEnd = j; colEnd < m; colEnd++) {
                        let xCount = px.regionSum(i, j, rowEnd, colEnd);
                        let yCount = py.regionSum(i, j, rowEnd, colEnd);
                        if (xCount > 0 && xCount === yCount) {
                            res++;
                        }
                    }
                }
            }
        }
    }
    return res;
};

/////////////////////////////////////////////////////////////////////////////////////////////////
const cal = (pre, x1, y1, x2, y2) => pre[x2 + 1][y2 + 1] - pre[x1][y2 + 1] - pre[x2 + 1][y1] + pre[x1][y1];

// Accepted
// reference: https://leetcode.com/contest/weekly-contest-405/ranking/22/ 	chatgpt + cslasher
function numberOfSubmatrices1(grid) {
    let n = grid.length, m = grid[0].length, count = 0;
    let prefixX = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    let prefixY = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            prefixX[i][j] = prefixX[i - 1][j] + prefixX[i][j - 1] - prefixX[i - 1][j - 1] + (grid[i - 1][j - 1] === 'X' ? 1 : 0);
            prefixY[i][j] = prefixY[i - 1][j] + prefixY[i][j - 1] - prefixY[i - 1][j - 1] + (grid[i - 1][j - 1] === 'Y' ? 1 : 0);
        }
    }
    // console.log(prefixX)
    // console.log(prefixY)
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (i == 0 && j == 0) {
                for (let rowEnd = i; rowEnd < n; rowEnd++) {
                    for (let colEnd = j; colEnd < m; colEnd++) {
                        let xCount = cal(prefixX, i, j, rowEnd, colEnd);
                        let yCount = cal(prefixY, i, j, rowEnd, colEnd);
                        if (xCount > 0 && xCount === yCount) {
                            count++;
                        }
                    }
                }
            }
        }
    }
    return count;
};

const main = () => {
    let g = [["X", "Y", "."], ["Y", ".", "."]];
    let g2 = [["X", "X"], ["X", "Y"]];
    let g3 = [[".", "."], [".", "."]];
    pr(numberOfSubmatrices(g))
    pr(numberOfSubmatrices(g2))
    pr(numberOfSubmatrices(g3))
};

main()