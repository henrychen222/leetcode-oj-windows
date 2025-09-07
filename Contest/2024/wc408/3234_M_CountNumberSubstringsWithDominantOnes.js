/**
 * 07/27/24 evening
 * https://leetcode.com/contest/weekly-contest-408/problems/count-the-number-of-substrings-with-dominant-ones/
 */

const pr = console.log;

const preCount = (a_or_s, t) => { let pre = [0]; for (let i = 0; i < a_or_s.length; i++) { pre.push(pre[i] + (a_or_s[i] == t ? 1 : 0)); } return pre; };
const subArrayCount = (a, l, r) => a[r + 1] - a[l];

const nextIndexArray = (a_or_s, t) => { let n = a_or_s.length, nxt = Array(n + 1); nxt[n] = n; for (let i = n - 1; i >= 0; i--) nxt[i] = a_or_s[i] == t ? i : nxt[i + 1]; return nxt; };

// Accepted
/*
reference:
https://leetcode.cn/circle/discuss/GNUiDD/ TsReaper
https://leetcode.cn/circle/discuss/9vok2U/
*/
const numberOfSubstrings = (s) => {
    let n = s.length, nxt = nextIndexArray(s, '0'), res = 0, limit = Math.ceil(Math.sqrt(n));
    // pr(limit, nxt)
    for (let i = 0; i < n; i++) {
        let j = i, zeroCnt = (s[i] == '0' ? 1 : 0);
        while (j < n && zeroCnt <= limit) {
            let nextZeroIndex = nxt[j + 1];
            // pr(j, nextZeroIndex)
            let oneCnt = nextZeroIndex - i - zeroCnt;
            if (oneCnt >= zeroCnt ** 2) {
                let cnt = Math.min(oneCnt - zeroCnt ** 2 + 1, nextZeroIndex - j);
                // pr("cnt", cnt)
                res += cnt;
            }
            j = nextZeroIndex;
            zeroCnt++;
        }
    }
    return res;
};

const main = () => {
    let s = "00011";
    let s2 = "101101";
    pr(numberOfSubstrings(s))
    pr(numberOfSubstrings(s2))
};

main()