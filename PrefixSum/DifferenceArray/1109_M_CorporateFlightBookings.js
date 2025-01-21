/*
 * 07/15/23 night  01/16/25 evening update
 * https://leetcode.com/problems/corporate-flight-bookings/
 */

const pr = console.log;

function DiffArray(n) {
    let imos = Array(n).fill(0);
    return { addRange, simulate, D }
    function addRange(l, r, v) {
        imos[l] += v;
        if (r + 1 < n) imos[r + 1] -= v;
    }
    function simulate() {
        for (let i = 1; i < n; i++) imos[i] += imos[i - 1];
    }
    function D() {
        return imos;
    }
}

// Accepted
const corpFlightBookings = (bookings, n) => {
    let da = new DiffArray(n + 1);
    for (const [l, r, v] of bookings) {
        da.addRange(l, r, v);
    }
    da.simulate();
    return da.D().slice(1);
};

const main = () => {
    let bookings = [[1, 2, 10], [2, 3, 20], [2, 5, 25]], n = 5;
    let bookings2 = [[1, 2, 10], [2, 2, 15]], n2 = 2
    pr(corpFlightBookings(bookings, n))
    pr(corpFlightBookings(bookings2, n2))
};

main()