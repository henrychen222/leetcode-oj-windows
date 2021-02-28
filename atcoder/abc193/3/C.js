/**
 * 02/27/21 morning
 * https://atcoder.jp/contests/abc193/tasks/abc193_c
 */


///////////////////////////////// pre-define /////////////////////////////////////
const pr = console.log;
const abs = Math.abs;
const fl = Math.floor;
const ce = Math.ceil;
const sq = Math.sqrt;
const lgt = Math.log10;
///////////////////////////////////////////////////////////////////////////////////

const solve = (n) => {
    if (n == 1) return pr(1);
    if (n == 2) return pr(2);
    let sum = 0;
    let end = fl(sq(n));
    // pr(end);
    for (let i = 2; i <= end; i++) {
        let max = ce(lgt(n) / lgt(i));
        if (i ** max > n) max--;
        // pr(i, max);
        sum += max + 1;
    }
    pr(n - sum + 2);
};

const main = () => {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('line', (line) => {
        solve(Number(line));
    });
};

main()

// pr(10 ** 10 < Number.MAX_SAFE_INTEGER);

