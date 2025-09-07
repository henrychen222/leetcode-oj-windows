/**
 * 07/08/24 afternoon
 * https://leetcode.com/contest/weekly-contest-405/problems/construct-string-with-minimum-cost/
 */

const pr = console.log;


class TrieMap {
    constructor() {
        this.next = new Map();
        this.cost = Number.MAX_SAFE_INTEGER;
    }
    insert(s, cost) {
        let cur = this;
        for (const c of s) {
            if (!cur.next.has(c)) cur.next.set(c, new TrieMap());
            cur = cur.next.get(c);
        }
        cur.cost = Math.min(cur.cost, cost);
    }
    query(t) {
        let n = t.length, dp = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
        dp[0] = 0;
        for (let i = 0; i < n; i++) {
            let cur = this;
            if (dp[i] == Number.MAX_SAFE_INTEGER) continue;
            for (let j = i; j < n; j++) {
                if (!cur.next.has(t[j])) break;
                // pr(j, t[j], cur.cost)
                cur = cur.next.get(t[j]);  // find match
                dp[j + 1] = Math.min(dp[j + 1], dp[i] + cur.cost);
            }
        }
        return dp[n] == Number.MAX_SAFE_INTEGER ? -1 : dp[n];
    }
}

// Accepted
/*
reference: 
https://leetcode.com/contest/weekly-contest-405/ranking/29/ cslasher   (use)
https://leetcode.com/contest/weekly-contest-405/ranking/37/ justforfun21
https://leetcode.com/contest/weekly-contest-405/ranking/41/  uwi
*/
const minimumCost = (target, words, costs) => {
    let tree = new TrieMap();
    words.map((s, i) => tree.insert(s, costs[i]));
    return tree.query(target);
};

const main = () => {
    let target = "abcdef", words = ["abdef", "abc", "d", "def", "ef"], costs = [100, 1, 1, 10, 5]
    let target2 = "aaaa", words2 = ["z", "zz", "zzz"], costs2 = [1, 10, 100]
    let target_debug1 = "rrhrzfmk", words_debug1 = ["r", "rz", "k", "rhrzfmk"], costs_debug1 = [11, 3, 7, 8]
    pr(minimumCost(target, words, costs))
    pr(minimumCost(target2, words2, costs2))
    pr(minimumCost(target_debug1, words_debug1, costs_debug1))
};

main()
