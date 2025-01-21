/**
 * 08/10/24 night
 *
 * Example problem:
 * https://leetcode.com/problems/count-the-number-of-good-nodes/
 */

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