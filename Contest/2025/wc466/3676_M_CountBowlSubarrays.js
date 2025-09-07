/**
 * 09/06/25 evening
 * https://leetcode.com/contest/weekly-contest-466/problems/count-bowl-subarrays
 */

const pr = console.log;

// Accepted
const bowlSubarrays = (a) => {
    let n = a.length, res = 0, [L, R] = MonotonicStack_PrevNextWall(a);
    // pr(L, R);
    for (let i = 0; i < n; i++) {
        if (L[i] != -1 && R[i] != n) res++;
    }
    return res;
};

const MonotonicStack_PrevNextWall = (a) => {
    let n = a.length, L = Array(n).fill(-1), R = Array(n).fill(n), st = [];
    for (let i = 0; i < n; i++) {
        while (st.length && a[st[st.length - 1]] < a[i]) R[st.pop()] = i;
        if (st.length) L[i] = st[st.length - 1];
        st.push(i);
    }
    return [L, R];
};

/////////////////////////////////////////////////////////////////////////////
// Accepted
// reference: https://leetcode.com/problems/count-bowl-subarrays/  uwi https://leetcode.com/contest/weekly-contest-466/ranking/3/
const bowlSubarrays2 = (a) => {
    let n = a.length, res = 0, L = enumPrevWall_MonotonicStack(a), R = enumNextWall_MonotonicStack(a);
    // pr(L, R)
    for (let i = 0; i < n; i++) {
        if (L[i] != -1 && R[i] != n) res++;
    }
    return res;
};

const enumPrevWall_MonotonicStack = (a) => { // The indices of the nearest greater element to its left
    let n = a.length, st = [], L = Array(n).fill(-1);
    for (let i = 0; i < n; i++) {
        while (st.length && a[st[st.length - 1]] < a[i]) st.pop();
        if (st.length) L[i] = st[st.length - 1];
        st.push(i);
    }
    return L;
};

const enumNextWall_MonotonicStack = (a) => { // The indices of the nearest greater element to its right
    let n = a.length, st = [], R = Array(n).fill(n);
    for (let i = n - 1; i >= 0; i--) {
        while (st.length && a[st[st.length - 1]] < a[i]) st.pop();
        if (st.length) R[i] = st[st.length - 1];
        st.push(i);
    }
    return R;
};

// TLE
// const bowlSubarrays1 = (a) => {
//     let n = a.length, res = 0;
//     for (let i = 1; i < n - 1; i++) {
//         let mid = a[i];
//         let l = i - 1;
//         while (l >= 0 && a[l] > mid) {
//             let r = i + 1;
//             while (r < n && a[r] > mid) {
//                 const minEnds = Math.min(a[l], a[r]);
//                 let maxMiddle = -Infinity;
//                 for (let k = l + 1; k < r; k++) {
//                     maxMiddle = Math.max(maxMiddle, a[k]);
//                 }
//                 if (minEnds > maxMiddle) {
//                     res++;
//                 }
//                 r++;
//             }
//             l--;
//         }
//     }
//     return res;
// };

const main = () => {
    let a = [2, 5, 3, 1, 4]
    let a2 = [5, 1, 2, 3, 4]
    let a3 = [1000000000, 999999999, 999999998];
    pr(bowlSubarrays(a))
    pr(bowlSubarrays(a2))
    pr(bowlSubarrays(a3))
};

main()