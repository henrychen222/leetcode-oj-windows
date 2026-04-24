/**
 * 03/25/21 afternoon
 * Update 09/06/25 night
 * 
 * reference:
 * https://www.techiedelight.com/longest-common-subsequence/
 * 
 * Example Problem:
 * https://leetcode.com/problems/longest-common-subsequence/
 */
const longestCommonSubsequence = (a, b) => {
    let n = a.length, m = b.length, dp = [...Array(n + 1)].map(() => Array(m + 1).fill(0));
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (a[i - 1] == b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[n][m];
};