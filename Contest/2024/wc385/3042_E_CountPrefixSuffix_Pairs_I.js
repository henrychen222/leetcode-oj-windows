/**
 * 02/17/24 evening
 * https://leetcode.com/contest/weekly-contest-385/problems/count-prefix-and-suffix-pairs-i/
 */

const pr = console.log;

// Accepted
const countPrefixSuffixPairs = (a) => {
    let n = a.length, res = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (isPrefix(a[i], a[j]) && isSuffix(a[i], a[j])) res++;
        }
    }
    return res;
};

const isPrefix = (s, t) => {
    let pre = '';
    for (const c of t) {
        pre += c;
        if (s == pre) return true;
    }
    return false;
};

const isSuffix = (s, t) => {
    let suf = '';
    for (let i = t.length - 1; i >= 0; i--) {
        suf = t[i] + suf;
        if (s == suf) return true;
    }
    return false;
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
