/*
 * 11/05/22 night
 * https://leetcode.com/contest/weekly-contest-318/problems/minimum-total-distance-traveled/
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
// reference: kmjp
const minimumTotalDistance = (a, b) => {
    let n = a.length, m = b.length, mcmf = new MCMF(n + m + 2), src = n + m, sink = src + 1;
    for (let i = 0; i < n; i++) mcmf.addEdge(src, i, 1, 0);
    for (let i = 0; i < m; i++) mcmf.addEdge(n + i, sink, b[i][1], 0);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            mcmf.addEdge(i, n + j, 1, Math.abs(a[i] - b[j][0]));
        }
    }
    return mcmf.minCostFlow(src, sink, n).cost;
};

const main = () => {
    let a = [0, 4, 6], b = [[2, 2], [6, 2]];
    let a2 = [1, -1], b2 = [[-2, 1], [2, 1]]
    let a_debug1 = [9, 11, 99, 101], b_debug1 = [[10, 1], [7, 1], [14, 1], [100, 1], [96, 1], [103, 1]];

    let a_debug2 = [789300819, -600989788, 529140594, -592135328, -840831288, 209726656, -671200998],
        b_debug2 = [[-865262624, 6], [-717666169, 0], [725929046, 2], [449443632, 3], [-912630111, 0], [270903707, 3], [-769206598, 2], [-299780916, 4], [-159433745, 5], [-467185764, 3], [849991650, 7], [-292158515, 6], [940410553, 6], [258278787, 0], [83034539, 2], [54441577, 3], [-235385712, 2], [75791769, 3]]
    pr(minimumTotalDistance(a, b))
    pr(minimumTotalDistance(a2, b2))
    pr(minimumTotalDistance(a_debug1, b_debug1)) // 6
    pr(minimumTotalDistance(a_debug2, b_debug2)) // 582755368
};

main()