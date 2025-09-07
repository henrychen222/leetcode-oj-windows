/**
 * 02/09/25 night
 * https://leetcode.com/contest/weekly-contest-436/problems/sort-matrix-by-diagonals/
 */

const pr = console.log;

// Accepted
const sortMatrix = (g) => {
    diagonal_traverse_with_middle_topLeft_to_bottomRight(g)
    return g;
};

const diagonal_traverse_with_middle_topLeft_to_bottomRight = (g) => {
    let n = g.length, m = g[0].length;
    for (let i = n - 1; i >= 0; i--) { // contain middle diagonal
        let cur = [], p = 0;
        for (let y = 0; i + y < n && y < m; y++) cur.push(g[i + y][y]);
        // update
        cur.sort((x, y) => y - x)
        for (let y = 0; i + y < n && y < m; y++) g[i + y][y] = cur[p++];
    }
    for (let j = 1; j < m; j++) {
        let cur = [], p = 0;
        for (let x = 0; x < n && x + j < m; x++) cur.push(g[x][x + j]);
        cur.sort((x, y) => x - y)
        for (let x = 0; x < n && x + j < m; x++) g[x][x + j] = cur[p++];
    }
};

const main = () => {
    let g = [[1, 7, 3], [9, 8, 2], [4, 5, 6]];
    let g2 = [[0, 1], [1, 2]];
    let g3 = [[1]];
    pr(sortMatrix(g))
    pr(sortMatrix(g2))
    pr(sortMatrix(g3))
};

main()