
///Реализовать два алгоритма подсчёта единичных битов в числе.

function getOnes_rev1(num) {
    let cnt = 0;
    while (num > 0) {
        if ((num & 0x01) > 0) {
            cnt++;
        }
        num = num >> 1;
    }
    return cnt;
}

// Пример работы:
const number = 13;
console.log(`Количество единиц в числе ${number}:`, getOnes_rev1(number));

//Алгоритм Кёрнигана
function getOnesRev2(num) {
    let cnt = 0;
    while (num > 0) {
        cnt++;
        num &= (num - 1);
    }
    return cnt;
}

// Пример работы
const number = 29;
const result = getOnesRev2(number);
console.log(`Количество единиц в числе ${number} (в двоичном виде ${number.toString(2)}): ${result}`);