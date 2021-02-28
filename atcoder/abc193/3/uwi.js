/**
 * 02/27/21 night
 * https://atcoder.jp/contests/abc193/submissions?f.User=uwi
 */

///////////////////////////////// pre-define /////////////////////////////////////
const pr = console.log;
///////////////////////////////////////////////////////////////////////////////////

// Accepted --- 135ms https://atcoder.jp/contests/abc193/submissions/20576272
const solve = (n) => {
    let se = new Set();
    for (let i = 2; i <= 100000; i++) {
        let tmp = i ** 2;
        while (tmp <= n) {
            se.add(tmp);
            tmp *= i;
        }
    }
    pr(n - se.size);
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

