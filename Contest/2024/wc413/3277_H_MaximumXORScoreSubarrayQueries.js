/**
 * 09/01/24 night
 * https://leetcode.com/contest/weekly-contest-413/problems/maximum-xor-score-subarray-queries/
 * 
 * reference:
 * https://leetcode.cn/circle/discuss/b27DFN/
 * https://leetcode.com/problems/maximum-xor-score-subarray-queries/solutions/5718161/java-c-python-dp-space-o-n/
 * uwi
 */

const pr = console.log;

const initialize2DArray = (n, m) => [...Array(n)].map(() => Array(m).fill(0));

// Accepted
const maximumSubarrayXor = (a, queries) => {
   let n = a.length, xor = initialize2DArray(n, n), score = initialize2DArray(n, n), res = [];
   for (let i = 0; i < n; i++) {
      xor[i][i] = a[i];
      score[i][i] = a[i];
   }
   for (let len = 1; len < n; len++) { // subarray length
      for (let l = 0; l + len < n; l++) {
         let r = l + len;
         xor[l][r] = xor[l][r - 1] ^ xor[l + 1][r];
      }
   }
   // pr(xor)
   for (let len = 1; len < n; len++) {
      for (let l = 0; l + len < n; l++) {
         let r = l + len;
         score[l][r] = Math.max(xor[l][r], score[l + 1][r], score[l][r - 1])
      }
   }
   // pr(score)
   queries.map(([l, r], i) => res.push(score[l][r]));
   return res;
};


const main = () => {
   let a = [2, 8, 4, 32, 16, 1], queries = [[0, 2], [1, 4], [0, 5]]
   let a2 = [0, 7, 3, 2, 8, 5, 1], queries2 = [[0, 3], [1, 5], [2, 4], [2, 6], [5, 6]]
   pr(maximumSubarrayXor(a, queries))
   pr(maximumSubarrayXor(a2, queries2))
};

main()