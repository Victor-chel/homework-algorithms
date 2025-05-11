// Генерирует массив из n случайных чисел (в диапазоне 0–9999)
function generateRandomArray(n) {
  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * 10000);
  }
  return arr;
}

// 1. SelectionSort
function selectionSort(a) {
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (a[j] < a[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const tmp = a[i];
      a[i] = a[minIndex];
      a[minIndex] = tmp;
    }
  }
  return a;
}

// 2. HeapSort
function heapify(a, heapSize, rootIndex) {
  let largest = rootIndex;
  const left = 2 * rootIndex + 1;
  const right = 2 * rootIndex + 2;

  if (left < heapSize && a[left] > a[largest]) {
    largest = left;
  }
  if (right < heapSize && a[right] > a[largest]) {
    largest = right;
  }
  if (largest !== rootIndex) {
    const tmp = a[rootIndex];
    a[rootIndex] = a[largest];
    a[largest] = tmp;
    heapify(a, heapSize, largest);
  }
}

function heapSort(a) {
  const n = a.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(a, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    const tmp = a[0];
    a[0] = a[i];
    a[i] = tmp;
    heapify(a, i, 0);
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

// Массив размеров для тестирования: 10^2, 10^3, 10^4, 10^5, 10^6
const sizes = [100, 1000, 10000, 100000, 1000000];

// Запускаем измерения для каждого алгоритма и каждого размера
sizes.forEach(size => {
  measureSort(selectionSort, size);
  measureSort(heapSort, size);
});
