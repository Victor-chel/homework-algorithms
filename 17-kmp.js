//Быстрое вычисление префикс-функции
function computePrefixFunction(pattern) {
  const n = pattern.length;
  const pi = new Array(n).fill(0);
  let j = 0; // длина текущей границы

  for (let i = 1; i < n; i++) {
    // если символы не совпадают, откатываемся
    while (j > 0 && pattern[i] !== pattern[j]) {
      j = pi[j - 1];
    }
    //расширяем границу
    if (pattern[i] === pattern[j]) {
      j++;
    }
    pi[i] = j;
  }

  return pi;
}

//все вхождения шаблона pattern в текст text
function kmpSearch(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  if (m === 0) return []; // пустой шаблон 

  const pi = computePrefixFunction(pattern);
  const result = [];
  let j = 0; // текущее совпадение
  for (let i = 0; i < n; i++) {
    // при несовпадении откатываем
    while (j > 0 && text[i] !== pattern[j]) {
      j = pi[j - 1];
    }
    if (text[i] === pattern[j]) {
      j++;
    }
    if (j === m) {
      result.push(i - m + 1);
      j = pi[j - 1];
    }
  }

  return result;
}

// Пример использования
const text = "ababcabcabababd";
const pattern = "ababd";
console.log("Позиции вхождений:", kmpSearch(text, pattern));
// Ожидаемый вывод: [10]
