/**
 * 05/04/24 evening
 * https://leetcode.com/contest/weekly-contest-396/problems/valid-word/
 */

const pr = console.log;

const isVowel = (c) => "aeiouAEIOU".indexOf(c) != -1;
// const isLower = (c) => /[a-z]/.test(c);
// const isUpper = (c) => /[A-Z]/.test(c);
const isConsonant = (c) => /[a-zA-Z]/.test(c) && !isVowel(c);
// const isDigit = (c) => /[0-9]/.test(c);
const isSpecial = (c) => !/[a-zA-Z0-9]/.test(c)

// Accepted
const isValid = (s) => {
    let special = 0, vowel = 0, consonant = 0;
    for (const c of s) {
        if (isSpecial(c)) special++;
        if (isVowel(c)) vowel++;
        if (isConsonant(c)) consonant++;
    }
    // pr(digit, lower, upper, vowel, consonant)
    return s.length >= 3 && (special == 0) && vowel > 0 && consonant > 0
};


const main = () => {
    let s = "234Adas"
    let s2 = "b3";
    let s3 = "a3$e";
    let debug1 = "AhI";
    let debug2 = "Ya$";
    let debug3 = "#zwI";
    pr(isValid(s))
    pr(isValid(s2))
    pr(isValid(s3))
    pr(isValid(debug1)) // true
    pr(isValid(debug2)) // false
    pr(isValid(debug3)) // false
};

main()