/**
 * 09/22/22 morning
 *
 * reference:
 * https://leetcode.cn/discuss/post/3144832/fen-xiang-gun-ti-dan-zi-fu-chuan-kmpzhan-ugt4/
 *
 * https://cp-algorithms.com/string/z-function.html#efficient-algorithm-to-compute-the-z-function
 * https://www.geeksforgeeks.org/z-algorithm-linear-time-pattern-searching-algorithm/
 * https://leetcode.com/contest/biweekly-contest-75/ranking cuiaoxiang
 *
 * Example Problem:
 * 2223 https://leetcode.com/problems/sum-of-scores-of-built-strings/
 * 2430 https://leetcode.com/problems/maximum-deletions-on-a-string/
 * 3031 https://leetcode.com/problems/minimum-time-to-revert-word-to-initial-state-ii/
 */


// z[i]: LCP(longest common prefix) of s[i:] and s
const z_function = (s) => {
    let n = s.length, l = 0, r = 0, z = Array(n).fill(0);
    for (let i = 1; i < n; i++) {
        if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }
    return z;
};


/*
reference:

*/
const z_function2 = (s) => {
    let n = s.length, l = 0, r = 0, z = Array(n).fill(0);
    for (let i = 1; i < n; ++i) {
        if (i > r) {
            l = r = i;
            while (r < n && s[r - l] == s[r]) r++;
            z[i] = r - l;
            r--;
        } else {
            let k = i - l;
            if (z[k] < r - i + 1) {
                z[i] = z[k];
            } else {
                l = i;
                while (r < n && s[r - l] == s[r]) r++;
                z[i] = r - l;
                r--;
            }
        }
    }
    return z;
};