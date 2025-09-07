/**
 * 02/17/24 evening
 * https://leetcode.com/contest/weekly-contest-385/problems/count-prefix-and-suffix-pairs-ii/
 */

const pr = console.log;

const ll = BigInt;
function RollingHashPolynomial(s, base, mod) {
    base = ll(base), mod = ll(mod);
    let n = s.length, p = Array(n + 1).fill(1n), h = Array(n + 1).fill(0n);
    buildPower();
    buildPrefixHash();
    return { get }
    function buildPower() {
        for (let i = 1; i < p.length; i++) p[i] = (p[i - 1] * base) % mod;
    }
    function buildPrefixHash() {
        for (let i = 0; i + 1 < h.length; i++) h[i + 1] = ((h[i] * base) % mod + ll(s.charCodeAt(i))) % mod;
    }
    function get(l, r) { // [l, r]
        let res = h[r + 1] - h[l] * p[r - l + 1];
        return (res % mod + mod) % mod;
    }
}

const addOneOrManyMap = (m, x, cnt = 1) => m.set(x, m.get(x) + cnt || cnt);

// Accepted
const countPrefixSuffixPairs1 = (a) => {
    let res = 0, m = new Map();
    for (const s of a) {
        let n = s.length, rh = new RollingHashPolynomial(s, 61, 1e9 + 7);
        for (let i = 0; i < n; i++) { // Accepted
            let pre = rh.get(0, i);
            let suf = rh.get(n - i - 1, n - 1);
            if (pre == suf) res += m.get(pre) || 0;
        }
        // for (let i = 1; i <= n; i++) {
        //     let pre = rh.get(0, i - 1); // start with (0, 0)
        //     let suf = rh.get(n - i, n - 1); // start with (n - 1, n - 1)
        //     if (pre == suf) res += m.get(pre) || 0;
        // }
        addOneOrManyMap(m, rh.get(0, n - 1));
    }
    return res;
};

/////////////////////////////// Solution 2 Trie --- 06/16/25 morning ///////////////////////////////////////////
class TrieMapPrefixSuffixBind {
    constructor() {
        this.next = new Map();
        this.cnt = 0;  // prefix count
        this.end = false; // represent if it is end of a word
    }

    insert(s) {
        let cur = this, n = s.length;
        for (let i = 0; i < n; i++) {
            let c = `${s[i]}${s[n - i - 1]}`; // bind key
            // pr(c)
            if (!cur.next.has(c)) cur.next.set(c, new TrieMapPrefixSuffixBind());
            cur = cur.next.get(c);
            cur.cnt++;
        }
        cur.end = true;
    }
    query(t) {
        let cur = this, n = t.length;
        for (let i = 0; i < n; i++) {
            let c = `${t[i]}${t[n - i - 1]}`; // bind key
            if (!cur.next.has(c)) return 0;
            cur = cur.next.get(c);
        }
        return cur.cnt;
    }
}

/*
reference:
https://leetcode.com/problems/count-prefix-and-suffix-pairs-ii/solutions/6251253/trie-solution/
https://leetcode.cn/problems/count-prefix-and-suffix-pairs-ii/solutions/2645319/bu-chao-gang-qie-bao-zheng-zheng-que-xin-tl5g/
*/
const countPrefixSuffixPairs = (a) => {
    let res = 0, tree = new TrieMapPrefixSuffixBind();
    for (let i = a.length - 1; i >= 0; i--) {
        res += tree.query(a[i]);
        // pr(a[i], tree.query(a[i]))
        tree.insert(a[i]);
    }
    return res;
};
const main = () => {
    let words = ["a", "aba", "ababa", "aa"]
    let words2 = ["pa", "papa", "ma", "mama"]
    let words3 = ["abab", "ab"];
    let words_debug1 = ["a", "abb"];
    pr(countPrefixSuffixPairs(words))
    pr(countPrefixSuffixPairs(words2))
    pr(countPrefixSuffixPairs(words3))
    pr(countPrefixSuffixPairs(words_debug1)) // 0
};

main()
