/**
 * 02/27/21 morning
 * https://atcoder.jp/contests/abc193/tasks/abc193_b
 */

///////////////////////////////// pre-define /////////////////////////////////////
const pr = console.log;
const mi = Math.min;
///////////////////////////////////////////////////////////////////////////////////

// Accepted
const solve = (n, a) => {
    let res = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < n; i++) {
        if (a[i][2] - a[i][0] > 0) {
            res = mi(res, a[i][1]);
        }
    }
    pr(res == Number.MAX_SAFE_INTEGER ? -1 : res);
};

const main = () => {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    let input = [];
    rl.on('line', (line) => {
        input.push(line.split(" ").map(x => Number(x)));
    });
    rl.on('close', () => {
        solve(input[0][0], input.slice(1));
    });
};

main()