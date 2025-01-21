/*
Created 07/15/23 night

reference:
https://leetcode.cn/circle/discuss/FfMCgb/
https://segmentfault.com/a/1190000040600758

(uwi) (08/22/24 night)
https://imoz.jp/algorithms/imos_method.html
https://note.com/kirimin_chan/n/n7663e3bb8a05
http://www.hankcs.com/program/algorithm/imos_method.html

Example problem:
1094 https://leetcode.com/problems/car-pooling/
1109 https://leetcode.com/problems/corporate-flight-bookings/
2381 https://leetcode.com/problems/shifting-letters-ii/ (todo)
2406 https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/  (todo)
2528 https://leetcode.com/problems/maximize-the-minimum-powered-city (+binary search) (todo)
2772 https://leetcode.com/problems/apply-operations-to-make-all-array-elements-equal-to-zero/ (todo)

2779 https://leetcode.com/problems/maximum-beauty-of-an-array-after-applying-operation/
2963 https://leetcode.com/problems/count-the-number-of-good-partitions/
*/

function DiffArray(n) {
    let imos = Array(n).fill(0);
    return { update, simulate, D }
    function update(l, r, v) {
        imos[l] += v;
        // imos[r] -= v;
        if (r + 1 < n) imos[r + 1] -= v;
    }
    function simulate() {
        for (let i = 1; i < n; i++) imos[i] += imos[i - 1];
    }
    function D() {
        return imos;
    }
}