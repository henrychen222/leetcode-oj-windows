// 07/10/21 afternoon

const pr = console.log;

// Accepted --- 140ms
const dx = [1, -1, 0, 0], dy = [0, 0, 1, -1];
const nearestExit = (g, entrance) => {
    let [n, m, ex, ey] = [g.length, g[0].length, entrance[0], entrance[1]];
    let dis = initialize2DArrayNew(n, m);
    let q = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if ((i == ex && j == ey) || g[i][j] == '+') continue;
            if (i == 0 || i == n - 1 || j == 0 || j == m - 1) {
                q.push([i, j]);
                dis[i][j] = 0;
            }
        }
    }
    pr(q);
    // pr(dis);
    while (q.length) {
        // pr(q);
        let cur = q.shift();
        let [x, y] = cur;
        // pr(x, y)
        // pr(dis);
        for (let k = 0; k < 4; k++) {
            let xx = x + dx[k];
            let yy = y + dy[k];
            if (xx < 0 || xx >= n || yy < 0 || yy >= m || g[xx][yy] == '+') continue;
            if (dis[xx][yy] > dis[x][y] + 1) {
                dis[xx][yy] = dis[x][y] + 1;
                q.push([xx, yy]);
            }
        }
    }
    let res = dis[ex][ey];
    return res == Number.MAX_SAFE_INTEGER ? -1 : res;
};

const initialize2DArrayNew = (n, m) => { let data = []; for (let i = 0; i < n; i++) { let tmp = Array(m).fill(Number.MAX_SAFE_INTEGER); data.push(tmp); } return data; };

const main = () => {
    let maze = [["+", "+", ".", "+"], [".", ".", ".", "+"], ["+", "+", "+", "."]], entrance = [1, 2];
    let maze2 = [["+", "+", "+"], [".", ".", "."], ["+", "+", "+"]], entrance2 = [1, 0];
    let maze3 = [[".", "+"]], entrance3 = [0, 0];
    let maze_debug1 = [["+", ".", "+", "+", "+", "+", "+"], ["+", ".", "+", ".", ".", ".", "+"], ["+", ".", "+", ".", "+", ".", "+"], ["+", ".", ".", ".", "+", ".", "+"], ["+", "+", "+", "+", "+", ".", "+"]],
        entrance_debug1 = [0, 1];
    pr(nearestExit(maze, entrance));
    pr(nearestExit(maze2, entrance2));
    pr(nearestExit(maze3, entrance3));
    pr(nearestExit(maze_debug1, entrance_debug1));
};

main()