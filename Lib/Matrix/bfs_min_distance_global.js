/**
 * 04/07/26 night
 *
 * example problem:
 *
 * https://leetcode.com/problems/as-far-from-land-as-possible/
 * https://codeforces.com/problemset/problem/35/C
 * https://leetcode.com/problems/01-matrix/
 * https://leetcode.com/problems/rotting-oranges/
 * https://leetcode.com/problems/map-of-highest-peak/
 * https://leetcode.com/contest/weekly-contest-357/problems/find-the-safest-path-in-a-grid/
 */

const dx = [-1, 1, 0, 0], dy = [0, 0, -1, 1];
const minDisGlobal = (g) => {
    let nearest = 1, n = g.length, m = g[0].length, dis = initialize2DArray(n, m), q = [];
    for (let i = 0; i < n; i++) { // initialization / prepare
        for (let j = 0; j < m; j++) {
            if (g[i][j] == nearest) { // land
                dis[i][j] = 0;
                q.push([i, j]);
            } else {
                dis[i][j] = Number.MAX_SAFE_INTEGER;
            }
        }
    }
    while (q.length) {
        let [x, y] = q.shift();
        for (let k = 0; k < 4; k++) {
            let nx = x + dx[k], ny = y + dy[k];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            if (dis[nx][ny] > dis[x][y] + 1) {
                dis[nx][ny] = dis[x][y] + 1;
                q.push([nx, ny]);
            }
        }
    }
    return dis;
};