/**
 * 04/23/26 night
 * https://leetcode.com/problems/shifting-letters-ii/
 */

const pr = console.log;

function DiffArray(n) {
    let diff = Array(n).fill(0);
    return { update, simulate, D }
    function update(l, r, v) {
        diff[l] += v;
        if (r + 1 < n) diff[r + 1] -= v;
    }
    function simulate() {
        for (let i = 1; i < n; i++) diff[i] += diff[i - 1];
    }
    function D() {
        return diff;
    }
}

const ord = (c) => c.charCodeAt();
const char = (ascii) => String.fromCharCode(ascii);
const moveChar = (c, step) => (ord(c) - 97 + (step % 26) + 26) % 26 + 97;

// Accepted
const shiftingLetters = (s, shifts) => {
    let n = s.length, da = new DiffArray(n);
    for (const [l, r, mark] of shifts) {
        if (mark == 0) {
            da.update(l, r, -1);
        } else {
            da.update(l, r, 1);
        }
    }
    da.simulate();
    let res = "";
    // pr(da.D())
    for (let i = 0; i < n; i++) {
        let ascii = moveChar(s[i], da.D()[i])
        // pr(ord(s[i]), s[i], x)
        res += char(ascii)
    }
    return res;
};

const main = () => {
    let s = "abc", shifts = [[0, 1, 0], [1, 2, 1], [0, 2, 1]];
    let s2 = "dztz", shifts2 = [[0, 0, 0], [1, 1, 1]];
    pr(shiftingLetters(s, shifts))
    pr(shiftingLetters(s2, shifts2))
};

main()