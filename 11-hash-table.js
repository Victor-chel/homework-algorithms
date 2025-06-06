//реализация хеш-таблицы (метод цепочек)

class HashTable {

  constructor(size = 16) {
    this._buckets = new Array(size);
    for (let i = 0; i < size; i++) {
      this._buckets[i] = [];
    }
    this._count = 0; 
  }

  //хеш-функция для строк.

  _hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode += key.charCodeAt(i);
    }
    // берем по модулю
    return hashCode % this._buckets.length;
  }

  //Вставка или обновление пары

  set(key, value) {
    const strKey = String(key);
    const index = this._hash(strKey);
    const bucket = this._buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const pair = bucket[i];
      if (pair.key === strKey) {
        pair.value = value;
        return;
      }
    }

    bucket.push({ key: strKey, value });
    this._count++;
  }

  //Получение значения по ключу

  get(key) {
    const strKey = String(key);
    const index = this._hash(strKey);
    const bucket = this._buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const pair = bucket[i];
      if (pair.key === strKey) {
        return pair.value;
      }
    }
    return undefined; 
  }

  //Проверка наличия ключа

  has(key) {
    return this.get(key) !== undefined;
  }

  //Удаление пары по ключу

  remove(key) {
    const strKey = String(key);
    const index = this._hash(strKey);
    const bucket = this._buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === strKey) {
        // Удаляем элемент из массива-цепочки
        bucket.splice(i, 1);
        this._count--;
        return true;
      }
    }
    return false;
  }

  //Возвращает количество пар в таблице
  size() {
    return this._count;
  }


  //Возвращает массив всех значений.
  values() {
    const result = [];
    for (let bucket of this._buckets) {
      for (let pair of bucket) {
        result.push(pair.value);
      }
    }
    return result;
  }

}


// Создаём таблицу с 8
const ht = new HashTable(8);

// Вставляем
ht.set('apple',  42);
ht.set('banana', 13);

// Обновляем значение
ht.set('banana', 777);

// Читаем
console.log(ht.get('apple')); 
console.log(ht.get('banana'));  

// Проверяем наличие
console.log(ht.has('apple'));

// Удаляем
console.log(ht.remove('apple'));

// Размер
console.log(ht.size()); 

// Список значений
console.log(ht.values());  

