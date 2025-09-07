// 08/14/23 noon

/*
Example problem:
https://leetcode.com/problems/apply-operations-to-maximize-score/
https://leetcode.com/problems/count-bowl-subarrays/
*/

//////////////////////////////// version 1 uwi ////////////////////////////////////////////
const enumPrevWall = (a) => {
    let n = a.length, L = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        L[i] = i - 1;
        while (L[i] >= 0 && a[L[i]] < a[i]) L[i] = L[L[i]];
    }
    return L;
};

const enumNextWall = (a) => {
    let n = a.length, R = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        R[i] = i + 1;
        while (R[i] < n && a[R[i]] <= a[i]) R[i] = R[R[i]];
    }
    return R;
};


///////////////////////////////////// version 2 use ///////////////////////////////////////
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


///////////////////////////////////// version 3 use (merge version 2) reference: https://leetcode.cn/circle/discuss/ol6BYC/ ///////////////////////////////////////
// L: The indices of the nearest greater element to its left
// R: The indices of the nearest greater element to its right
const MonotonicStack_PrevNextWall = (a) => {
    let n = a.length, L = Array(n).fill(-1), R = Array(n).fill(n), st = [];
    for (let i = 0; i < n; i++) {
        while (st.length && a[st[st.length - 1]] < a[i]) R[st.pop()] = i;
        if (st.length) L[i] = st[st.length - 1];
        st.push(i);
    }
    return [L, R];
};