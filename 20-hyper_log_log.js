//Реализация 32-битного FNV-1a хеша строки
function fnv1aHash(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash + ((hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24))) >>> 0;
  }
  return hash;
}

//Класс HyperLogLog
class HyperLogLog {
  constructor(b = 10) {
    if (b < 4 || b > 16) throw new Error("b должно быть от 4 до 16");
    this.b = b;               // число бит для индексации корзин
    this.m = 1 << b;          // количество корзин
    this.reg = Array(this.m).fill(0); // массив регистров
    // коэффициент alpha_m
    if (this.m === 16)       this.alpha = 0.673;
    else if (this.m === 32)  this.alpha = 0.697;
    else if (this.m === 64)  this.alpha = 0.709;
    else                     this.alpha = 0.7213 / (1 + 1.079 / this.m);
  }

  //Добавить элемент
  add(elem) {
    const hash = fnv1aHash(String(elem));
    const idx = hash >>> (32 - this.b); //Старшие b бит
    const w = (hash << this.b) | 0;     //Оставшиеся 32−b бит
    //Подсчитать количество ведущих нулей в w
    const zeros = Math.clz32(w) + 1;    
    this.reg[idx] = Math.max(this.reg[idx], zeros);
  }

  //Оценить мощность множества
  count() {
    const invSum = this.reg.reduce((s, v) => s + Math.pow(2, -v), 0);
    const E = this.alpha * this.m * this.m / invSum;

    //Малый диапазон
    if (E <= 5/2 * this.m) {
      const V = this.reg.filter(v => v === 0).length;
      if (V > 0) return this.m * Math.log(this.m / V);
      else       return E;
    }
    //Большой диапазон
    const TWO32 = 2 ** 32;
    if (E > (1/30) * TWO32) {
      return -TWO32 * Math.log(1 - E / TWO32);
    }
    //Без коррекции
    return E;
  }
}

//Пример использования
const hll = new HyperLogLog(12); // 4096 корзин

//100000 случайных чисел
for (let i = 0; i < 100000; i++) {
  hll.add('user_' + Math.floor(Math.random() * 200000));
}

console.log("Оценка количества уникальных:", Math.round(hll.count()));
console.log("Точное число уникальных:", (new Set(Array.from({length:100000}, (_,i) => 'user_' + Math.floor(Math.random()*200000)))).size);