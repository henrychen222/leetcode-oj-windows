/*
Created 08/29/21 night
Update 01/17/22 morning
Update 03/27/22 night
Reorganize 07/29/23 night
Reorganize 09/06/25 night 


Bit Manipulation(BitMask) Concept:
https://stackoverflow.com/questions/31575691/what-is-a-bitmask-and-a-mask
https://dev.to/somedood/bitmasks-a-very-esoteric-and-impractical-way-of-managing-booleans-1hlf
https://hezhaojiang.github.io/post/2020/2a7541d6/
https://blog.nowcoder.net/n/fcc30eadb2b44395862194814e819315?from=nowcoder_improve


Example Problems(Bit Manipulation)
https://leetcode.com/problems/increasing-subsequences
https://codeforces.com/contest/1658/problem/D1
https://leetcode.com/problems/maximum-good-people-based-on-statements/

String 'a' ~ 'z'
https://leetcode.com/problems/count-words-obtained-after-adding-a-letter/
https://leetcode.com/problems/groups-of-strings/
https://leetcode.com/problems/number-of-wonderful-substrings/



----------------------------------------------------------------------------------------------
BitMask DP/状压dp
https://www.hackerearth.com/practice/algorithms/dynamic-programming/bit-masking/tutorial/
https://usaco.guide/gold/dp-bitmasks
https://oi-wiki.org/dp/state/
https://codeforces.com/blog/entry/81516

Example Problems(BitMask DP):
https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/
https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks/
https://leetcode.com/problems/can-i-win/
https://leetcode.com/problems/beautiful-arrangement/
https://leetcode.com/problems/knight-dialer/
https://leetcode.com/problems/maximum-students-taking-exam/
*/


/*
x/mask: value


set ith bit to 1 / set, and sum(|) it       x |= (1 << j)

set ith bit to 0 / unset                    x = x & ~(1 << i)

check if ith bit is set to 1 (three ways)
    x & (1 << i)
    1 & (x >> i)     (from Heltion)
    x << ~i < 0      (from uwi)

Replace/Toggle ith bit 
    x ^ (1 << i)

*/


// Bit Manipulation Code Template:
for (let i = 0; i < 1 << n; i++) { //  i: mask
    for (let j = 0; j < n; j++) {
        if (i & (1 << j)) {}
        // if (1 & (i >> j)) {}
        // if (i << ~j < 0) {}
    }
}