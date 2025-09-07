/**
 * 02/09/25 night
 * https://leetcode.com/contest/weekly-contest-436/problems/assign-elements-to-groups-with-constraints/
 */

const pr = console.log;

const counter_value_in_indexA_in = (a_or_s) => { let m = new Map(); let n = a_or_s.length; for (let i = 0; i < n; i++) { if (!m.has(a_or_s[i])) m.set(a_or_s[i], []); m.get(a_or_s[i]).push(i); } return m; };

// Accepted
const assignElements = (a, b) => {
    let m = new Map(), u = new Set(a), mb = counter_value_in_indexA_in(b), res = [];
    for (const x of u) m.set(x, findAllFactors(x))
    a.map(x => {
        let factors = m.get(x), cur = Infinity;
        for (const f of factors) {
            if (mb.has(f)) cur = Math.min(cur, mb.get(f)[0])
        }
        res.push(cur == Infinity ? -1 : cur);
    })
    return res;
};

const findAllFactors = (n) => {
    let res = new Set();
    for (let i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            if (i == n / i) {
                res.add(i);
            } else {
                res.add(i);
                res.add(n / i);
            }
        }
    }
    return res;
};


const main = () => {
    let groups = [8, 4, 3, 2, 4], elements = [4, 2]
    let groups2 = [2, 3, 5, 7], elements2 = [5, 3, 3]
    let groups3 = [10, 21, 30, 41], elements3 = [2, 1]
    pr(assignElements(groups, elements))
    pr(assignElements(groups2, elements2))
    pr(assignElements(groups3, elements3))
};

main()

// pr(Math.sqrt(1e5))


let maxF = 0;
for (let i = 1; i <= 1e5; i++) maxF = Math.max(maxF, findAllFactors(i).size);
pr(maxF) // 128