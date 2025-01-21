/*
02/12/21 night

Read:
https://en.wikipedia.org/wiki/Minimum-cost_flow_problem
https://cp-algorithms.com/graph/min_cost_flow.html
https://www.geeksforgeeks.org/minimum-cost-maximum-flow-from-a-graph-using-bellman-ford-algorithm/
https://www.programmersought.com/article/69371888737/
https://www.hackerearth.com/practice/algorithms/graphs/minimum-cost-maximum-flow/tutorial/

Example Questions:
Array
https://leetcode.com/problems/maximum-and-sum-of-array/
https://leetcode.com/problems/minimum-total-distance-traveled
https://codeforces.com/contest/1525/problem/D

Matrix
https://leetcode.com/problems/select-cells-in-grid-with-maximum-score/
*/
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

