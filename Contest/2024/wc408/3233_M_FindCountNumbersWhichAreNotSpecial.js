/**
 * 07/27/24 evening
 * https://leetcode.com/contest/weekly-contest-408/problems/find-the-count-of-numbers-which-are-not-special/
 */

const pr = console.log;

// Accepted  chatGPT
function nonSpecialCount(l, r) {
    // Helper function to check if a number is prime
    function isPrime(n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 === 0 || n % 3 === 0) return false;
        for (let i = 5; i * i <= n; i += 6) {
            if (n % i === 0 || n % (i + 2) === 0) return false;
        }
        return true;
    }

    // Get all primes up to the square root of r
    let primes = [];
    for (let i = 2; i * i <= r; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }

    // Count special numbers in the range [l, r]
    let specialCount = 0;
    for (let prime of primes) {
        let square = prime * prime;
        if (square >= l && square <= r) {
            specialCount++;
        }
    }

    // Total numbers in the range [l, r]
    let totalCount = r - l + 1;

    // Non-special numbers
    return totalCount - specialCount;
}

const main = () => {
    let L = 5, R = 7
    let L2 = 4, R2 = 16;
    let L_debug1 = 5, R_debug2 = 25;
    // pr(nonSpecialCount(L, R))
    // pr(nonSpecialCount(L2, R2))
    pr(nonSpecialCount(L_debug1, R_debug2)) // 19
    // pr(nonSpecialCount(1, 1e9))
};

main()