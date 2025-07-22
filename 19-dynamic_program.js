//Функция для вычисления НОД, алгоритм Евклида)
function gcd(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}

//Основная функция: принимает строку вида "a/b+c/d" и возвращает "x/y"
function sumFractions(input) {
  //Парсинг входной строки
  const [part1, part2] = input.trim().split('+');
  const [a, b] = part1.split('/').map(Number);
  const [c, d] = part2.split('/').map(Number);

  //Считаем сумму через общий знаменатель
  let num = a * d + c * b;
  let den = b * d;

  //Сокращаем дробь
  const g = gcd(num, den);
  num /= g;
  den /= g;

  return num + '/' + den;
}

//Запрос данных и вывод результата
const userInput = prompt('Введите сумму дробей в формате a/b+c/d, например 2/100+3/100:');
if (userInput) {
  console.log(sumFractions(userInput));
}