/**
 * 9.9 morning  10.2 night complete
 * https://leetcode.com/problems/hand-of-straights/
 */

// Accepted --- 736ms 18.31%
const isNStraightHand = (nums, k) => {
    let n = nums.length;
    let p = n / k;
    let map = getRecord(nums);
    if (!ok(p)) return false;
    let SMap = sortMapByKey(map);
    while (p > 0) {
        let min = -1;
        for (const k of SMap.keys()) {
            let v = SMap.get(k);
            if (v > 0) {
                min = k;
                break;
            }
        }
        SMap.set(min, SMap.get(min) - 1);
        for (let i = 1; i <= k - 1; i++) {
            min = min + 1;
            if (!SMap.has(min)) {
                return false;
            } else {
                let v = SMap.get(min);
                if (v == 0) return false;
                SMap.set(min, v - 1);
            }
        }
        p--;
    }
    return true;
};

// Accepted --- 776ms 16.90%
const isNStraightHand2 = (nums, k) => {
    let n = nums.length;
    let p = n / k;
    let map = getRecord(nums);
    if (!ok(p)) return false;
    let SMap = sortMapByKey(map);
    while (p > 0) {
        let min = -1;
        for (const k of SMap.keys()) {
            let v = SMap.get(k);
            if (v > 0) {
                min = k;
                break;
            }
        }
        SMap.set(min, SMap.get(min) - 1);
        for (let i = 1; i <= k - 1; i++) {
            min = min + 1;
            if (!SMap.has(min)) {
                return false;
            } else {
                SMap.set(min, SMap.get(min) - 1);
            }
        }
        p--;
    }
    for (const v of SMap.values()) {
        if (v != 0) return false;
    }
    return true;
};

const getRecord = (arr) => {
    let map = new Map();
    for (const i of arr) {
        if (map.has(i)) {
            map.set(i, map.get(i) + 1);
        } else {
            map.set(i, 1);
        }
    }
    return map;
};

const ok = (n) => {
    if (n < 0) return false;
    let s = n + '';
    if (s.indexOf('.') != -1) return false;
    return true;
};

const sortMapByKey = (map) => {
    return new Map([...map].sort((a, b) => a[0] - b[0]));
};

const main = () => {
    let hand = [1, 2, 3, 6, 2, 3, 4, 7, 8],
        W = 3;
    let hand2 = [1, 2, 3, 4, 5],
        W2 = 4;
    console.log(isNStraightHand(hand, W));
    console.log(isNStraightHand(hand2, W2));
};

main()


// // don't know
// const isNStraightHand = (hand, W) => {
//     let n = hand.length;
//     if (n % W != 0) return false;
//     let map = new Map();
//     let element = [...new Set(hand)];
//     for (const e of element) {
//         map.set(e, getFrequency(hand, e))
//     }
//     let mapSort = new Map([...map].sort((a, b) => a[0] - b[0]));
//     console.log(map)
//     console.log(mapSort);
// };

// const getFrequency = (arr, item) => {
//     return arr.filter(x => x === item).length;
// };