/**
 * 02/27/21 evening
 * https://leetcode.com/contest/weekly-contest-230/problems/count-items-matching-a-rule/
 */

const pr = console.log;

// Accepted
const countMatches = (items, rk, rv) => {
    let res = 0;
    for (const e of items) {
        if (rk == 'type' && e[0] == rv) {
            res++;
        } else if (rk == 'color' && e[1] == rv) {
            res++;
        } else if (rk == 'name' && e[2] == rv) {
            res++;
        }
    }
    return res;
};

const main = () => {
    let items = [["phone", "blue", "pixel"], ["computer", "silver", "lenovo"], ["phone", "gold", "iphone"]], ruleKey = "color", ruleValue = "silver";
    let items2 = [["phone", "blue", "pixel"], ["computer", "silver", "phone"], ["phone", "gold", "iphone"]], ruleKey2 = "type", ruleValue2 = "phone";
    pr(countMatches(items, ruleKey, ruleValue));
    pr(countMatches(items2, ruleKey2, ruleValue2));
};

main()