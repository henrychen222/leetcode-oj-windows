//


const { MinPriorityQueue } = require('@datastructures-js/priority-queue');

const pr = console.log;

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
const maximumANDSum = (a, m) => {
    let n = a.length, mcmf = new MCMF(n + m + 2), src = n + m, sink = src + 1;
    for (let i = 0; i < n; i++) {
        mcmf.addEdge(src, i, 1, 0);
        for (let j = 0; j < m; j++) {
            mcmf.addEdge(i, j + n, 1, -(a[i] & (j + 1)));
        }
    }
    for (let i = 0; i < m; i++) mcmf.addEdge(i + n, sink, 2, 0);
    return -mcmf.minCostFlow(src, sink, n).cost;
};

const main = () => {
    let nums = [1, 2, 3, 4, 5, 6], numSlots = 3;
    let nums2 = [1, 3, 10, 4, 7, 1], numSlots2 = 9;
    pr(maximumANDSum(nums, numSlots))
    pr(maximumANDSum(nums2, numSlots2))
};

main()