// Генерирует массив из n случайных чисел (в диапазоне 0–9999)
function generateRandomArray(n) {
  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * 10000);
  }
  return arr;
}

// 1. BubbleSort 
function bubbleSort(a) {
  const n = a.length;
  // делаем n-1 проходов
  for (let i = 0; i < n - 1; i++) {
    // в каждом проходе «всплывает» максимальный элемент в конец
    for (let j = 0; j < n - 1; j++) {
      if (a[j] > a[j + 1]) {
        // обмен
        const tmp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = tmp;
      }
    }
  }
  return a;
}

// 2. InsertionSort 
function insertionSort(a) {
  const n = a.length;
  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;
    // сдвигаем все большие элементы вправо
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = key;
  }
  return a;
}

// 3. ShellSort (последовательность дельт: n/2, n/4, ...)
function shellSort(a) {
  const n = a.length;
  // начальный шаг — половина длины массива
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // выполняем «вставку» внутри каждого подмассива с шагом gap
    for (let i = gap; i < n; i++) {
      const temp = a[i];
      let j = i;
      while (j >= gap && a[j - gap] > temp) {
        a[j] = a[j - gap];
        j -= gap;
      }
      a[j] = temp;
    }
  }
  return a;
}

// Функция измерения времени выполнения сортировки
function measureSort(sortFn, size) {
  const arr = generateRandomArray(size);
  const label = `${sortFn.name} - ${size}`;
  console.time(label);
  sortFn(arr);
  console.timeEnd(label);
}

// Массив размеров для тестирования
const sizes = [100, 1000, 10000];

// Запускаем измерения для каждого алгоритма и каждого размера
sizes.forEach(size => {
  measureSort(bubbleSort, size);
  measureSort(insertionSort, size);
  measureSort(shellSort, size);
});
