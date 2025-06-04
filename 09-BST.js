// двоичное дерево поиска 
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  // Вставка элемента
  insert(x) {
    this.root = this._insertRec(this.root, x);
  }

  _insertRec(node, x) {
    if (node === null) {
      return new Node(x);
    }
    if (x < node.value) {
      node.left = this._insertRec(node.left, x);
    } else if (x > node.value) {
      node.right = this._insertRec(node.right, x);
    }
    return node;
  }

  // Поиск элемента
  search(x) {
    return this._searchRec(this.root, x);
  }

  _searchRec(node, x) {
    if (node === null) {
      return false;
    }
    if (x === node.value) {
      return true;
    } else if (x < node.value) {
      return this._searchRec(node.left, x);
    } else {
      return this._searchRec(node.right, x);
    }
  }

  // Удаление элемента
  remove(x) {
    this.root = this._removeRec(this.root, x);
  }

  _removeRec(node, x) {
    if (node === null) {
      return null;
    }
    if (x < node.value) {
      node.left = this._removeRec(node.left, x);
    } else if (x > node.value) {
      node.right = this._removeRec(node.right, x);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
      let succ = this._minValueNode(node.right);
      node.value = succ.value;
      node.right = this._removeRec(node.right, succ.value);
    }
    return node;
  }

  _minValueNode(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }
}

// Функция для перемешивания массива
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// создание двух деревьев, измерение производительности
(function() {
  const N = 5000; // Максимальный разер
  const K = Math.floor(N / 10); // Количество операций поиска и удаления

  const arr = Array.from({ length: N }, (_, i) => i);

  // Дерево A: вставка чисел в случайном порядке
  const arrRandom = arr.slice();
  shuffleArray(arrRandom);

  const treeRandom = new BST();
  const t0 = performance.now();
  for (let i = 0; i < N; i++) {
    treeRandom.insert(arrRandom[i]);
  }
  const t1 = performance.now();
  const insertTimeRandom = t1 - t0;

  // Дерево B: вставка чисел в возрастающем порядке
  const arrSorted = arr.slice();

  const treeSorted = new BST();
  const t2 = performance.now();
  for (let i = 0; i < N; i++) {
    treeSorted.insert(arrSorted[i]);
  }
  const t3 = performance.now();
  const insertTimeSorted = t3 - t2;

  // Подготовка ключей для поиска
  const searchKeys = [];
  for (let i = 0; i < K; i++) {
    searchKeys.push(Math.floor(Math.random() * N));
  }

  // Поиск в дереве A
  const t4 = performance.now();
  for (let i = 0; i < K; i++) {
    treeRandom.search(searchKeys[i]);
  }
  const t5 = performance.now();
  const searchTimeRandom = t5 - t4;

  // Поиск в дереве B
  const t6 = performance.now();
  for (let i = 0; i < K; i++) {
    treeSorted.search(searchKeys[i]);
  }
  const t7 = performance.now();
  const searchTimeSorted = t7 - t6;

  // Подготовка ключей для удаления
  const removeKeys = [];
  for (let i = 0; i < K; i++) {
    removeKeys.push(Math.floor(Math.random() * N));
  }

  // Удаление в дереве A
  const t8 = performance.now();
  for (let i = 0; i < K; i++) {
    treeRandom.remove(removeKeys[i]);
  }
  const t9 = performance.now();
  const removeTimeRandom = t9 - t8;

  // Удаление в дереве B
  const t10 = performance.now();
  for (let i = 0; i < K; i++) {
    treeSorted.remove(removeKeys[i]);
  }
  const t11 = performance.now();
  const removeTimeSorted = t11 - t10;

  // Вывод таблицы производительности
  console.group('=== Дерево: Случайный порядок вставки ===');
  console.log('Вставка (ms):', insertTimeRandom.toFixed(2));
  console.log('Поиск (ms):',   searchTimeRandom.toFixed(2));
  console.log('Удаление (ms):',removeTimeRandom.toFixed(2));
  console.groupEnd();

  console.group('=== Дерево: Возрастающий порядок вставки ===');
  console.log('Вставка (ms):', insertTimeSorted.toFixed(2));
  console.log('Поиск (ms):',   searchTimeSorted.toFixed(2));
  console.log('Удаление (ms):',removeTimeSorted.toFixed(2));
  console.groupEnd();
})();
