/**
 * 08/31/24 evening
 * https://leetcode.com/contest/weekly-contest-413/problems/select-cells-in-grid-with-maximum-score/
 */

const pr = console.log;

const { MinPriorityQueue } = require('@datastructures-js/priority-queue')

function Edge(from, to, cap, cost) {
    this.from = from;
    this.to = to;
    this.cap = cap;
    this.cost = cost;
}

function MCMF(n) {
    const initializeGraph = (n) => Array.from({ length: n }, () => []);
    let g = initializeGraph(n), cost = Array(n).fill(0), dis = Array(n).fill(0), par = Array(n).fill(0), pi = Array(n).fill(0);
    return { addEdge, minCostFlow }
    function addEdge(from, to, cap, cost) {
        g[from].push(new Edge(g[to].length, to, cap, cost));
        g[to].push(new Edge(g[from].length - 1, from, 0, -cost));
    }
    function minCostFlow(from, to, flow) {
        let res = { flow: 0, cost: 0 };
        while (flow > 0) {
            /////////////////////// shortest path //////////////////////////////////
            let pq = new MinPriorityQueue({ compare: (x, y) => x[0] - y[0] || x[1] - y[1] });
            dis.fill(Number.MAX_SAFE_INTEGER);
            dis[from] = 0;
            pq.enqueue([0, from]);
            while (pq.size()) {
                let [curDis, cur] = pq.dequeue();
                if (dis[cur] < curDis) continue;
                g[cur].map((child, i) => {
                    if (child.cap > 0 && dis[child.to] > dis[cur] + child.cost + cost[cur] - cost[child.to]) {
                        dis[child.to] = dis[cur] + child.cost + cost[cur] - cost[child.to];
                        par[child.to] = cur;
                        pi[child.to] = i;
                        pq.enqueue([dis[child.to], child.to]);
                    }
                });
            }
            /////////////////////////////////////////////////////////////////////////
            if (dis[to] == Number.MAX_SAFE_INTEGER) break;
            for (let i = 0; i < n; i++) cost[i] += dis[i];
            let min_flow = flow;
            for (let i = to; i != from; i = par[i]) {
                min_flow = Math.min(min_flow, g[par[i]][pi[i]].cap);
            }
            flow -= min_flow;
            res.flow += min_flow;
            res.cost += min_flow * cost[to];
            for (let i = to; i != from; i = par[i]) {
                let edge = g[par[i]][pi[i]];
                edge.cap -= min_flow;
                g[i][edge.from].cap += min_flow;
            }
        }
        return res;
    }
}

// Accepted
// reference: Yawn_Sean uwi
const maxScore = (g) => {
    let n = g.length, m = g[0].length, vals = new Set();
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            vals.add(g[i][j]);
        }
    }
    let len = vals.size, d = [...vals].sort((x, y) => x - y).map((x, i) => [x, i]), ma = new Map(d);
    let mcmf = new MCMF(n + len + 2), src = n + len, sink = src + 1;
    for (let i = 0; i < n; i++) mcmf.addEdge(src, i, 1, 0);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            mcmf.addEdge(i, n + ma.get(g[i][j]), 1, 0);
        }
    }
    for (let i = 0; i < len; i++) mcmf.addEdge(n + i, sink, 1, 100 - d[i][0]);
    // pr(n, len, vals, d)
    let res = mcmf.minCostFlow(src, sink, n);
    // let res = mcmf.minCostFlow(src, sink, len); // Accepted also
    // pr(res)
    return 100 * res.flow - res.cost;
};


////////////////////////////////////////////////////////////////////////////////////////
// const ToUnique = (a) => [...new Set(a)];
// const sm = (a) => a.reduce(((x, y) => x + y), 0);

// // TLE
// const maxScore1 = (G) => {
//     let n = G.length, m = G[0].length, vals, res = 0;
//     // pr(n, m)
//     for (let a = 0; a < m; a++) {
//         let one = G[0][a];
//         if (n >= 2) {
//             for (let b = 0; b < m; b++) {
//                 let two = G[1][b];
//                 if (n >= 3) {
//                     for (let c = 0; c < m; c++) {
//                         let three = G[2][c];
//                         if (n >= 4) {
//                             for (let d = 0; d < m; d++) {
//                                 let four = G[3][d];
//                                 if (n >= 5) {
//                                     for (let e = 0; e < m; e++) {
//                                         let five = G[4][e];
//                                         if (n >= 6) {
//                                             for (let f = 0; f < m; f++) {
//                                                 let six = G[5][f];
//                                                 if (n >= 7) {
//                                                     for (let g = 0; g < m; g++) {
//                                                         let seven = G[6][g];
//                                                         if (n >= 8) {
//                                                             for (let h = 0; h < m; h++) {
//                                                                 let eight = G[7][h];
//                                                                 if (n >= 9) {
//                                                                     for (let i = 0; i < m; i++) {
//                                                                         let nine = G[8][i];
//                                                                         if (n >= 10) {
//                                                                             for (let j = 0; j < m; j++) {
//                                                                                 let ten = G[9][j];
//                                                                                 vals = [one, two, three, four, five, six, seven, eight, nine, ten];
//                                                                                 vals = ToUnique(vals)
//                                                                                 res = Math.max(res, sm(vals));
//                                                                             }
//                                                                         } else {
//                                                                             vals = [one, two, three, four, five, six, seven, eight, nine];
//                                                                             vals = ToUnique(vals)
//                                                                             res = Math.max(res, sm(vals));
//                                                                         }
//                                                                     }
//                                                                 } else {
//                                                                     vals = [one, two, three, four, five, six, seven, eight];
//                                                                     vals = ToUnique(vals)
//                                                                     res = Math.max(res, sm(vals));
//                                                                 }
//                                                             }
//                                                         } else {
//                                                             vals = [one, two, three, four, five, six, seven];
//                                                             vals = ToUnique(vals)
//                                                             res = Math.max(res, sm(vals));
//                                                         }
//                                                     }
//                                                 } else {
//                                                     vals = [one, two, three, four, five, six];
//                                                     vals = ToUnique(vals)
//                                                     res = Math.max(res, sm(vals));
//                                                 }
//                                             }
//                                         } else {
//                                             vals = [one, two, three, four, five];
//                                             vals = ToUnique(vals)
//                                             res = Math.max(res, sm(vals));
//                                         }
//                                     }
//                                 } else {
//                                     vals = [one, two, three, four];
//                                     // pr(vals, isUnique(vals))
//                                     vals = ToUnique(vals)
//                                     res = Math.max(res, sm(vals));
//                                 }
//                             }
//                         } else {
//                             vals = [one, two, three];
//                             vals = ToUnique(vals)
//                             res = Math.max(res, sm(vals));
//                         }
//                     }
//                 } else {
//                     vals = [one, two];
//                     vals = ToUnique(vals)
//                     res = Math.max(res, sm(vals));
//                 }
//             }
//         } else {
//             vals = [one];
//             vals = ToUnique(vals)
//             res = Math.max(res, sm(vals));
//         }
//     }
//     return res;
// };


const main = () => {
    let g = [[1, 2, 3], [4, 3, 2], [1, 1, 1]]
    let g2 = [[8, 7, 6], [8, 3, 2]];
    let g_debug1 = [[5], [7], [19], [5]];
    pr(maxScore(g))
    pr(maxScore(g2))
    pr(maxScore(g_debug1))
};

main()