/**
 * 06/05/21 evening
 * https://leetcode.com/contest/weekly-contest-244/problems/reduction-operations-to-make-the-array-elements-equal/
 */

const pr = console.log;

const { MaxPriorityQueue } = require('@datastructures-js/priority-queue');

const priorAssign = 5 * 10 ** 4;
const reductionOperations1 = (a) => {
    let pq = new MaxPriorityQueue({ priority: x => x[0] * priorAssign - x[1] });
    let n = a.length;
    for (let i = 0; i < n; i++) {
        pq.enqueue([a[i], i]);
    }
    // pr(pq.toArray())
    // for (const e of pq.toArray()) {
    //     pr(e);
    // }
    let res = 0;
    while (1) {
        let cur = pq.dequeue().element;
        let a = pq.toArray();
        // pr('cur', cur, pq.size());
        // pr(a);
        let next;
        for (const e of a) {
            if (e.element[0] < cur[0]) {
                next = e.element[0];
                break;
            }
        }
        // pr('next', next)
        if (next != undefined) {
            cur[0] = next;
            pq.enqueue(cur);
            res++;
        } else {
            break;
        }
    }
    return res;
};


// Accepted
const stin = (a) => a.sort((x, y) => x - y);
const reductionOperations = (a) => {
    let se = new Set(a);
    let u = [...se];
    stin(u);
    let m = new Map();
    for (let i = 0; i < u.length; i++) {
        m.set(u[i], i);
    }
    // let min = Math.min.apply(Math, a);
    let n = a.length;
    // let final = Array(n).fill(min);
    let res = 0;
    // pr(a);
    // pr(final);
    for (let i = 0; i < n; i++) {
        res += m.get(a[i]);
    }
    return res;
};

const main = () => {
    let nums = [5, 1, 3];
    let nums2 = [1, 1, 1];
    let nums3 = [1, 1, 2, 2, 3];
    let debug1 = [37449,32264,7412,42446,24744,25061,13364,36497,254,18195,41651,39202,47336,48403,47736,33487,13034,30251,39377,33877,26802,48801,46671,20011,46065,11162,29452,40635,43834,34797,12935,23556,34485,231,44470,25505,37969,27910,26559,22021,40739,38302,48093,45843,49072,4440,32290,48875,16229,41967,42517,19064,41267,1362,26674,47271,41240,10230,41533,26039,17712,11676,4812,39680,664,22902,17340,46401,26945,44895,35668,19902,9967,30283,16997,31756,11117,30613,33445,2975,17749,33442,6464,48808,38708,27696,4572,23277,4391,43047,28999,1294,10757,33238,46547,10593,45250,6099,26341,41680,45149,18075,39649,19950,13690,34610,13613,15548,21886,17634,4493,4908,45823,34289,43175,24131,30667,33523,36547,48283,3260,11047,19457,42800,48175,46756,36454,17680,23322,39956,48487,15212,25727,36769,26196,11296,31695,17009,40004,21604,46928,14570,16959,39974,46314,16006,43309,2002,40794,26385,20745,28297,49912,16281,17636,12446,4754,41019,47994,10855,37955,29071,38105,47727,9712,39732,17170,30107,34511,10652,9085,9051,46908,28881,23665,20301,49243,26264,15761,7592,47066,13513,47087,44657,20021,4472,6973,14918,26019,21062,32268,6552,12240,2948,3627,39159,1526,49312,14193,44781,2275,32405,46133,34639,47446,40186,28986,22443,43446,17995,7738,40190,45393,11318,6242,14554,26196,15285,32442,29480,24766,49193,11050,15186,15450,18589,30316,35850,38007,25533,13888,29603,46854,16901,21635,32528,38904,7271,14015,5168,3029,1011,343,31484,20944,25110,38028,18823,12838,26210,10491,49714,42340,9980,1997,995,25381,9515,43570,35559,3744,37012,24871,16658,8519,5212,30336,42740,19884,947,2325,35192,3988,34401,8450,2806,17931,7697,28345,5967,12460,1811,32746,41781,8541,48800,18303,45009,12579,43452,29329,25540,21615,41358,17562,17030,42049,41656,15932,16085,3945,38531,38699,11487,22913,28081,39673,45748,36718,41837,34222,3985,23150,35844,27044,35265,13066,46639,35154,27796,43411,4594,46763,17505,48712,40021,47260,49297,4738,16488,11638,6329,9897,3848,13327,28057,2943,3462,41755,5979,33610,30748,32842,24265,6507,20493,2630,8299,34831,2175,29056,43533,8402,25900,46377,29235,1614,48276,34375,17695];
    pr(reductionOperations(nums))
    pr(reductionOperations(nums2))
    pr(reductionOperations(nums3))
    pr(reductionOperations(debug1))
};

main()