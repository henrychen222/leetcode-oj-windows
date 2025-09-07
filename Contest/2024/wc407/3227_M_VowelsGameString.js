/**
 * 07/20/24 evening
 * https://leetcode.com/contest/weekly-contest-407/problems/vowels-game-in-a-string/
 */

const pr = console.log;

const isVowel = (c) => "aeiou".indexOf(c) != -1;

// Accepted
const doesAliceWin = (s) => {
    let cnt = 0, n = s.length;
    for (let i = 0; i < n; i++) {
        if (isVowel(s[i])) cnt++;
    }
    return cnt == 0 ? false : true;
};

const main = () => {
    let s = "leetcoder"
    let s2 = "bbcd";
    pr(doesAliceWin(s))
    pr(doesAliceWin(s2))
};

main()