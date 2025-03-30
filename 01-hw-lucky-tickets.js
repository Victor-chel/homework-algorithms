function happyTickets(n) {
    let count = 0;
    const digits = n; 
    function recurseHappy(digitsLeft, sum1, sum2) {
        if (digitsLeft === 0) {
            if (sum1 === sum2) count++;
            return;
        }
        for (let d1 = 0; d1 < 10; d1++) {
            for (let d2 = 0; d2 < 10; d2++) {
                recurseHappy(digitsLeft - 1, sum1 + d1, sum2 + d2);
            }
        }
    }
    recurseHappy(digits, 0, 0);
    return count;
}
console.log(happyTickets(4));