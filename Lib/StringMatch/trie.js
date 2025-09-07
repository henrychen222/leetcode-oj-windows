/**
09/17/22 night
reference:
https://www.geeksforgeeks.org/dsa/trie-insert-and-search/
六 字典树
https://leetcode.cn/discuss/post/3144832/fen-xiang-gun-ti-dan-zi-fu-chuan-kmpzhan-ugt4/

Example problem:
Prefix
208 https://leetcode.com/problems/implement-trie-prefix-tree/
2416 https://leetcode.com/problems/sum-of-prefix-scores-of-strings/
3213 https://leetcode.com/problems/construct-string-with-minimum-cost/

Suffix
2781 https://leetcode.com/problems/length-of-the-longest-valid-substring/

Prefix + Suffix Bind
3045 https://leetcode.com/problems/count-prefix-and-suffix-pairs-ii/
*/

// use
class TrieMap {
    constructor() {
        this.next = new Map();
        this.cnt = 0;   // prefix count
        this.end = false; // represent if it is end of a word
    }
    insert(s) {
        let cur = this;
        for (const c of s) {
            if (!cur.next.has(c)) cur.next.set(c, new TrieMap());
            cur = cur.next.get(c);
            cur.cnt++;
        }
        cur.end = true;
    }
    search(t) { // t is in trie
        let cur = this;
        for (const c of t) {
            if (!cur.next.has(c)) return false;
            cur = cur.next.get(c);
        }
        return cur.end;
    }
    searchPrefix(t) { // check if a previously inserted string that has the prefix t
        let cur = this;
        for (const c of t) {
            if (!cur.next.has(c)) return false;
            cur = cur.next.get(c);
        }
        return true;
    }
    query(t) { // check the total count of t and other string has prefix
        let cur = this, res = 0;
        for (const c of t) {
            cur = cur.next.get(c);
            res += cur.cnt;
        }
        return res;
    }
}

/////////////////////////// Reverse Insert //////////////////////////////
class TrieMapSuffix {
    constructor() {
        this.next = new Map();
        this.cnt = 0; // suffix count
        this.end = false; // represent if it is end of a word
    }
    insert(s) {
        let cur = this;
        for (let i = s.length - 1; i >= 0; i--) { // reverse insert
            let c = s[i];
            if (!cur.next.has(c)) cur.next.set(c, new TrieMap());
            cur = cur.next.get(c);
            cur.cnt++;
        }
        cur.end = true;
    }
    queryIsAnySubstringMatch(t, l, r) { // query target substring[l, r] if exist in trie
        let cur = this;
        for (let i = r; i >= l; i--) {
            if (!cur.next.has(t[i])) return false;
            cur = cur.next.get(t[i]);
            if (cur.end) return true;
        }
        return false;
    }
}



//////////////////////////////////////////////////////////////
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




//////////////////////////////////////////////////////////////////////////////
// // Not recommend, May have memory out issue in JS of use Array
// class TrieArray {
//     constructor() {
//         this.next = Array(26).fill(null);
//         this.cnt = 0;
//         this.end = false; // represent if it is end of a word
//     }
//
//     insert(s) {
//         let cur = this;
//         for (let i = s.length - 1; i >= 0; i--) { // reverse insert for suffix
//             let c = s[i];
//             // for (const c of s) {
//             let idx = ord(c) - 97;
//             if (cur.next[idx] == null) cur.next[idx] = new Trie();
//             cur = cur.next[idx];
//             cur.cnt++;
//         }
//         cur.end = true;
//     }
//
//     search(s, prefix = false) {
//         let cur = this;
//         for (const c of s) {
//             let idx = ord(c) - 97;
//             if (cur.next[idx] == null) return false;
//             cur = cur.next[idx];
//         }
//         return prefix ? true : cur.end;
//     }
//
//     // query(s) {
//     //     let cur = this, res = 0;
//     //     for (const c of s) {
//     //         let idx = ord(c) - 97;
//     //         cur = cur.next[idx];
//     //         res += cur.cnt;
//     //     }
//     //     return res;
//     // }
// }