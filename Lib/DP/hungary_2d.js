/*
08/03/23 night
https://www.geeksforgeeks.org/hungarian-algorithm-for-assignment-problem-set-2-implementation/
https://www.npmjs.com/package/munkres-js
https://github.com/addaleax/munkres-js
*/

const hungarian = require('munkres-js');

const pr = console.log;

const minCost = (g) => {
    let coordinates = hungarian(g), res = 0;
    pr("coordinates", coordinates)
    for (const [x, y] of coordinates) res += g[x][y];
    return res;
};

const main = () => {
    let a = [[2500, 4000, 3500], [4000, 6000, 3500], [2000, 4000, 2500]];
    let a2 = [[3, 5], [10, 1]];
    let a3 = [[400, 150, 400], [400, 450, 600], [300, 225, 300]];
    pr(minCost(a)); // 9500
    pr(minCost(a2)); // 4
    pr(minCost(a3)); // 850
}

main();