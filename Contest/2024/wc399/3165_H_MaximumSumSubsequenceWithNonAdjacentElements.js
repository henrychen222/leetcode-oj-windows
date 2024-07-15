/**
 * 05/25/24 evening  05/26/24 night fix
 * https://leetcode.com/contest/weekly-contest-399/problems/maximum-sum-of-subsequence-with-non-adjacent-elements/
 */

const pr = console.log;

// reference: https://leetcode.cn/circle/discuss/62U280/
// Accepted
function SegmentTreeNode(nodeArray) {
    let newNode = [0, 0, 0, 0], n = nodeArray.length, h = Math.ceil(Math.log2(n)), len = 2 * 2 ** h, a = Array(len).fill(newNode);
    initializeFromArray();
    return { update, query, tree }
    function initializeFromArray() {
        for (let i = 0; i < n; i++) a[n + i] = nodeArray[i];
        for (let i = n - 1; i >= 1; i--) pushup(i);
    }
    function update(pos, v) {
        a[n + pos] = v;
        for (let i = parent(n + pos); i >= 1; i = parent(i)) pushup(i);
    }
    function pushup(i) {
        a[i] = f(a[left(i)], a[right(i)]);
    }
    function query(l, r) { // [L, R)
        let resL = resR = newNode;
        if (l >= r) return 0;
        l += n;
        r += n;
        for (; l < r; l = parent(l), r = parent(r)) {
            if (l & 1) resL = f(resL, a[l++]);
            if (r & 1) resR = f(a[--r], resR); // fix
            // if (r & 1) resR = f(resR, a[--r]);
        }
        return f(resL, resR);
    }
    function f(x, y) {
        /*
        a: cover first number
        b: cover last number
        c: not cover first and last number
        d: cover both first and last number
        */
        let [a1, b1, c1, d1] = x, [a2, b2, c2, d2] = y;
        return [Math.max(a1 + Math.max(a2, c2), d1 + c2), Math.max(b1 + b2, c1 + Math.max(b2, d2)),
        Math.max(b1 + c2, c1 + Math.max(a2, c2)), Math.max(a1 + Math.max(d2, b2), d1 + b2)];
    }
    function parent(i) {
        return i >> 1;
    }
    function left(i) {
        return 2 * i;
    }
    function right(i) {
        return 2 * i + 1;
    }
    function tree() {
        return a;
    }
}

const mod = 1e9 + 7;

const maximumSumSubsequence = (a, queries) => {
    let n = a.length, nodeArray = a.map(x => [0, 0, 0, Math.max(0, x)]), st = new SegmentTreeNode(nodeArray), res = 0;
    for (const [i, x] of queries) {
        st.update(i, [0, 0, 0, Math.max(0, x)]);
        res += Math.max(...st.query(0, n));
        res %= mod;
    }
    return res;
};

/////////////////////////////////////////////////////////////////////////////////////
const maximumSumSubsequence1 = (a, queries) => {
    let res = 0;
    for (const [pos, x] of queries) {
        a[pos] = x;
        let sum = maxSumNoTwoElementsAdjacent(a);
        // pr(a, sum)
        res += Math.max(0, sum);
        res %= mod;
    }
    return res;
};

// Accepted java 14386ms  vinod2122
const maxSumNoTwoElementsAdjacent = (a) => {
    let n = a.length;
    if (n == 0) return 0;
    if (n == 1) return Math.max(0, a[0]);
    let prevInclude = Math.max(0, a[0]), prevExclude = 0;
    for (let i = 1; i < n; i++) {
        let newInclude = prevExclude + Math.max(0, a[i]);
        let newExclude = Math.max(prevInclude, prevExclude);
        prevInclude = newInclude;
        prevExclude = newExclude;
    }
    return Math.max(prevInclude, prevExclude);
};

// https://www.geeksforgeeks.org/maximum-sum-such-that-no-two-elements-are-adjacent/
// const maxSumNoTwoElementsAdjacent = (a) => {
//     let n = a.length;
//     if (n === 0) return 0;
//     if (n === 1) return Math.max(0, a[0]);
//     let dp = Array(n).fill(0);
//     dp[0] = Math.max(0, a[0]);
//     dp[1] = Math.max(dp[0], a[1]);
//     for (let i = 2; i < n; i++) {
//         dp[i] = Math.max(dp[i-1], dp[i-2] + a[i]);
//     }
//     return dp[n-1];
// };

// const initialize2DArray = (n, m) => [...Array(n)].map(() => Array(m).fill(0));

// const maxSumNoTwoElementsAdjacent1 = (a) => {
//     let n = a.length, dp = initialize2DArray(n, 2);
//     if (n == 1) return a[0];
//     dp[0][1] = a[0];
//     for (let i = 1; i < n; i++) {
//         dp[i][1] = dp[i - 1][0] + a[i];
//         dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][0]);
//     }
//     return Math.max(dp[n - 1][0], dp[n - 1][1]);
// };

const main = () => {
    let a = [3, 5, 9], queries = [[1, -2], [0, -3]]
    let a2 = [0, -1], queries2 = [[0, -5]];
    let a_debug1 = [6], queries_debug1 = [[0, -2]]
    let a_debug2 = [4, 0, -1, -2, 3, 1, -1], queries_debug2 = [[3, 1], [0, -2], [1, -1], [0, -2], [5, 4], [6, -3], [6, -2], [2, -1]]
    let a_debug3 = [0,-2,-4,7,-1,-8,1,4,-6], queries_debug3 = [[8,-7],[1,3],[5,6],[2,-8]];
    pr(maximumSumSubsequence(a, queries))
    pr(maximumSumSubsequence(a2, queries2))
    pr(maximumSumSubsequence(a_debug1, queries_debug1)) // 0
    pr(maximumSumSubsequence(a_debug2, queries_debug2)) // 36
    pr(maximumSumSubsequence(a_debug3, queries_debug3)) // 65
};

main()



// let A = [5, 5, 10, 100, 10, 5];
// pr(maxSumNoTwoElementsAdjacent(A)) // 110