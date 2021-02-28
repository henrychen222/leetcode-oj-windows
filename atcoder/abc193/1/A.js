/**
 * 02/27/21 morning
 * https://atcoder.jp/contests/abc193/tasks/abc193_a
 */

///////////////////////////////// pre-define /////////////////////////////////////
const pr = console.log;
///////////////////////////////////////////////////////////////////////////////////

// Accepted
const solve = (a, b) => {
   let res = (a - b) / a;
   pr(res * 100);
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
        solve(input[0][0], input[0][1]);
    });
};

main()