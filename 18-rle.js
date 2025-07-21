function rlePack(input) {
  const N = 127;
  const out = [];
  let i = 0;

  while (i < input.length) {
    // длина серии одинаковых символов в пределах N
    let runLen = 1;
    while (
      i + runLen < input.length &&
      input[i + runLen] === input[i] &&
      runLen < N
    ) {
      runLen++;
    }

    if (runLen >= 2) {
      // записываем серию повторов
      out.push([ runLen, input[i] ]);
      i += runLen;
    } else {
      // Собираем символы (до следующего повтора или до N символов)
      const lits = [ input[i] ];
      i++;
      while (
        i < input.length &&
        lits.length < N &&
        // не начинаем серию: если следующий и следующий за ним одинаковы
        !(i + 1 < input.length && input[i] === input[i + 1])
      ) {
        lits.push(input[i]);
        i++;
      }
      // Объединяем одиночные символы в строку и сохраняем
      out.push([ -lits.length, lits.join('') ]);
    }
  }

  return out;
}

//Примеры
const data1 = ['A','A','A','B','C','D','D','D','E','F','G'];
console.log(rlePack(data1));

const data2 = Array(256).fill('A');
console.log(rlePack(data2));
