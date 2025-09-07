/**
 * 08/10/24 evening
 * https://leetcode.com/contest/weekly-contest-410/problems/count-the-number-of-good-nodes/
 */

const pr = console.log;

// const initializeGraph = (n) => Array.from({ length: n }, () => []);
// const packUG = (g, edges) => { for (const [u, v] of edges) { g[u].push(v); g[v].push(u); } };

// // Accepted chatGPT
// let g, subSize, vis, goodNode;
// function countGoodNodes(edges) {
//     let n = edges.length + 1;
//     g = initializeGraph(n), subSize = Array(n).fill(0), vis = Array(n).fill(false);
//     packUG(g, edges)
//     dfs(0);
//     // pr(g, "subSize", subSize)
//     goodNode = new Set();
//     vis.fill(false);
//     isGoodNode(0);
//     // pr(goodNode)
//     return goodNode.size;
// }

// function isGoodNode(cur) {
//     vis[cur] = true;
//     let childSize = new Set(), isGood = true;
//     for (const child of g[cur]) {
//         if (!vis[child]) {
//             isGoodNode(child);
//             childSize.add(subSize[child]);
//         }
//     }
//     if (childSize.size > 1) {  // A node is good if all its children have subtrees of the same size
//         isGood = false;
//     }
//     if (isGood) goodNode.add(cur)
//     // pr("cur", cur, childSize, isGood)
//     return isGood;
// }

// function dfs(cur) {
//     vis[cur] = true;
//     let size = 1;
//     for (const child of g[cur]) {
//         if (!vis[child]) {
//             size += dfs(child);
//         }
//     }
//     subSize[cur] = size;
//     return size;
// };

function Graph(n, edges, start) {
    let g = Array.from({ length: n }, () => []);
    packUG(g, edges);
    let subSize = Array(n).fill(0), vis = Array(n).fill(false);
    let nodesWithAllSubTreeHasSameSize = new Set();
    return { subTreeSize, G, findAllNodes_WithAllItsSubTreeHasSameSize }
    function subTreeSize(start) {
        dfs(start)
        return subSize;
    }
    function findAllNodes_WithAllItsSubTreeHasSameSize(cur) {
        subTreeSize(start);
        reset();
        dfs2(start)
        return nodesWithAllSubTreeHasSameSize;
    }
    function dfs(cur) {
        vis[cur] = true;
        let size = 1;
        for (const child of g[cur]) {
            if (!vis[child]) {
                size += dfs(child);
            }
        }
        subSize[cur] = size;
        return size;
    }
    function dfs2(cur) {
        vis[cur] = true;
        let childSize = new Set(), ok = true;
        for (const child of g[cur]) {
            if (!vis[child]) {
                dfs2(child);
                childSize.add(subSize[child]);
            }
        }
        if (childSize.size > 1) ok = false;
        if (ok) nodesWithAllSubTreeHasSameSize.add(cur);
        return ok;
    }
    function reset() {
        vis.fill(false);
    }
    function packUG(g, edges) {
        for (const [u, v] of edges) {
            g[u].push(v);
            g[v].push(u);
        }
    }
    function G() {
        return g;
    }
}

// Accepted
const countGoodNodes = (edges) => {
    let n = edges.length + 1, g = new Graph(n, edges, 0);
    return g.findAllNodes_WithAllItsSubTreeHasSameSize().size;
}

const main = () => {
    let edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]]
    let edges2 = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [1, 6], [2, 7], [3, 8]]
    let edges3 = [[0, 1], [1, 2], [1, 3], [1, 4], [0, 5], [5, 6], [6, 7], [7, 8], [0, 9], [9, 10], [9, 12], [10, 11]]
    pr(countGoodNodes(edges))
    pr(countGoodNodes(edges2))
    pr(countGoodNodes(edges3))
};

main()