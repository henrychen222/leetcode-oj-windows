/*
05/26/20 night  01/16/24 evening update
https://leetcode.com/problems/car-pooling/
https://www.acwing.com/solution/LeetCode/content/2562/
*/

const pr = console.log;

function DiffArray(n) {
    let imos = Array(n).fill(0);
    return { update, simulate, D }
    function update(l, r, v) {
        imos[l] += v;
        imos[r] -= v;
        // if (r + 1 < n) imos[r + 1] -= v;
    }
    function simulate() {
        for (let i = 1; i < n; i++) imos[i] += imos[i - 1];
    }
    function D() {
        return imos;
    }
}

// Accepted
const carPooling = (trips, capacity) => {
    let max = -Infinity;
    for (const [, from, to] of trips) max = Math.max(max, from, to);
    let da = new DiffArray(max + 1);
    for (const [v, from, to] of trips) {
        da.update(from, to, v);
    }
    da.simulate();
    pr(da.D())
    return da.D().every(x => x <= capacity);
};


const main = () => {
    let trips = [[2, 1, 5], [3, 3, 7]], capacity = 4;
    let trips2 = [[2, 1, 5], [3, 3, 7]], capacity2 = 5;
    let trip_debug1 = [[2, 1, 5], [3, 5, 7]], capacity_debug1 = 3;
    pr(carPooling(trips, capacity))
    pr(carPooling(trips2, capacity2))
    pr(carPooling(trip_debug1, capacity_debug1)) // true
}

main()
