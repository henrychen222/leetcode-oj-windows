const preSum = (a) => {
    let pre = [0];
    for (let i = 0; i < a.length; i++) {
        pre.push(pre[i] + a[i]);
    }
    return pre;
};

const preSum = (a) => {
    let n = a.length, pre = Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        pre[i + 1] = pre[i] + a[i];
    }
    return pre;
};