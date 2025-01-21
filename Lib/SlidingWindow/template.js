/*
reference
https://leetcode.cn/circle/discuss/0viNMK/       01/16/25 afternoon

---- Example Problems
3 https://leetcode.com/problems/longest-substring-without-repeating-characters/
1358 https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/
1438 https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/
1658 https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/
1695 https://leetcode.com/problems/maximum-erasure-value/
1839 https://leetcode.com/problems/longest-substring-of-all-vowels-in-order/
2401 https://leetcode.com/problems/longest-nice-subarray/
2516 https://leetcode.com/problems/take-k-of-each-character-from-left-and-right/
*/

// similar to Monotonic Stack template

const sliding_window = (a) => {
    let l = -1;
    for (let i = 0; i < n; i++) { // move right pointer
        while (l < i) { // move left pointer, condition depends
            // max or min result when L move
            l++;
        }
        // max or min result after L stop
    }
};