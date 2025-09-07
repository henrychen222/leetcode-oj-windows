/*
 * 07/13/24 evening
 * https://leetcode.com/contest/weekly-contest-406/problems/delete-nodes-from-linked-list-present-in-array/
 */

const pr = console.log;

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

const printLArray = (list) => {
    let res = [], cur = list;
    while (cur) {
        res.push(cur.val);
        cur = cur.next;
    }
    console.log(res);
};

const getAllData = (list) => {
    let res = [], cur = list;
    while (cur) {
        res.push(cur.val);
        cur = cur.next;
    }
    return res;
};

const createL = (a) => {
    let tmp, node = null, n = a.length;
    for (let i = n - 1; ~i; i--) {
        if (!node) {
            node = new ListNode(a[i]);
        } else {
            tmp = new ListNode(a[i]);
            tmp.next = node;
            node = tmp;
        }
    }
    return node;
};

// Accepted
const modifiedList = (v, head) => {
    v = new Set(v);
    let a = getAllData(head), res = a.filter(x => !v.has(x));
    return createL(res);
};

const main = () => {
    let v = [1, 2, 3], head = [1, 2, 3, 4, 5]
    let v2 = [1], head2 = [1, 2, 1, 2, 1, 2]
    printLArray(modifiedList(v, createL(head)));
    printLArray(modifiedList(v2, createL(head2)));
};

main()