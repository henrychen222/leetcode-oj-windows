/**
 * 12.19 evening  12.21 evening
 * https://leetcode.com/contest/weekly-contest-220/problems/jump-game-vi/
 *
 * read:
 * https://zxi.mytechroad.com/blog/dynamic-programming/leetcode-1696-jump-game-vi/
 */


// Accepted --- 108ms 87.50%   Bottom up DP + Monoqueue
/**
 * reference:
 * https://leetcode.com/contest/weekly-contest-220/ranking/2/  cuiaoxiang
 * https://leetcode.com/problems/jump-game-vi/discuss/978544/C%2B%2B-DP-%2B-Pruning-vs.-Monodeq
 */
const maxResult1 = (nums, k) => {
    let n = nums.length;
    let dp = Array(n).fill(0);
    dp[n - 1] = nums[n - 1];
    let deque = [];
    deque.push(n - 1);
    for (let i = n - 2; ~i; i--) {
        // console.log(deque);  // check monoqueue is decreasing
        while (deque.length && deque[0] - i > k) {
            deque.shift();
        }
        dp[i] = nums[i] + dp[deque[0]];
        while (deque.length && dp[deque[deque.length - 1]] <= dp[i]) {
            deque.pop();
        }
        deque.push(i);
    }
    // console.log(dp);
    return dp[0];
};


//////////////////////////////////////////////////////////////
// 06/03/22 night
function SegmentTreeRMQ(input) { // range max query
    let n, a;
    if (Number.isInteger(input)) {
        n = input;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(Number.MIN_SAFE_INTEGER);
    } else {
        n = input.length;
        a = Array(2 * 2 ** Math.ceil(Math.log2(n))).fill(Number.MIN_SAFE_INTEGER);
        initializeFromArray();
    }
    return { update, query, tree }
    function initializeFromArray() {
        for (let i = 0; i < n; i++) a[n + i] = input[i];
        for (let i = n - 1; i >= 1; i--) pushup(i);
    }
    function update(pos, v) {
        a[n + pos] = v;
        for (let i = parent(n + pos); i >= 1; i = parent(i)) pushup(i);
    }
    function pushup(i) {
        a[i] = f(a[left(i)], a[right(i)]);
    }
    function query(l, r) {
        return Query(l, r + 1);
    }
    function Query(l, r) { // [L, R)
        let res = Number.MIN_SAFE_INTEGER;
        if (l >= r) return res;
        l += n;
        r += n;
        for (; l < r; l = parent(l), r = parent(r)) {
            if (l & 1) res = f(res, a[l++]);
            if (r & 1) res = f(res, a[--r]);
        }
        return res;
    }
    function f(x, y) {
        return Math.max(x, y);
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

// Accepted --- 312ms 37.5%
/**
 * reference:
 * https://leetcode.com/contest/weekly-contest-220/ranking/3/  uwi
 * https://leetcode.com/contest/weekly-contest-220/ranking 	kirika-comp
 */
const maxResult = (a, k) => {
    let n = a.length, st = new SegmentTreeRMQ(n + 1), dp = Array(n).fill(0);
    dp[0] = a[0];
    st.update(0, a[0]);
    for (let i = 1; i < n; i++) {
        dp[i] = st.query(Math.max(0, i - k), i) + a[i];
        st.update(i, dp[i]);
    }
    return dp[n - 1];
};

// WA 7/58
// const maxResult1 = (nums, k) => {
//     let n = nums.length;
//     let res = nums[0];
//     for (let i = 0; i < n - 1;) {
//         let tmp = nums.slice(i + 1, Math.min(n, i + k + 1));
//         let max = Math.max.apply(Math, tmp);
//         // console.log(nums[i], tmp);
//         res += max;
//         let move = tmp.indexOf(max) + 1;
//         i += move;
//     }
//     return res;
// };

const main = () => {
    let nums = [1, -1, -2, 4, -7, 3],
        k = 2;
    let nums2 = [10, -5, -2, 4, 0, 3],
        k2 = 3;
    let nums3 = [1, -5, -20, 4, -1, 3, -6, -3],
        k3 = 2;
    console.log(maxResult(nums, k)); // 7
    console.log(maxResult(nums2, k2)); // 17
    console.log(maxResult(nums3, k3));
};

main()