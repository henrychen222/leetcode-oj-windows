/**
 * 01/08/21 afternoon
 * https://leetcode.com/problems/number-of-islands/
 * 
 * similar problem:
 * https://leetcode.com/problems/max-area-of-island/
 */

// Accepted --- 96ms 60.91%
const numIslands = (g) => {
    let areas = getAllAreas(g);
    return areas.length;
};

const dx = [1, -1, 0, 0], dy = [0, 0, 1, -1];
const getAllAreas = (g) => {
    const allow = '1', forbid = '0', floodFillMakeConnected = 'x';
    let n = g.length, m = g[0].length, res = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (g[i][j] == allow) {
                let q = [[i, j]], area = 0;
                while (q.length) {
                    let [x, y] = q.shift();
                    for (let k = 0; k < 4; k++) {
                        let nx = x + dx[k], ny = y + dy[k];
                        if (nx < 0 || nx >= n || ny < 0 || ny >= m || g[nx][ny] == forbid || g[nx][ny] == floodFillMakeConnected) continue;
                        g[nx][ny] = floodFillMakeConnected;
                        area++;
                        q.push([nx, ny]);
                    }
                }
                res.push(area == 0 ? 1 : area);
            }
        }
    }
    return res;
};