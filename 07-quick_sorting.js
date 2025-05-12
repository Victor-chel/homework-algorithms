// Генерирует массив из n случайных чисел (в диапазоне 0–9999)
function generateRandomArray(n) {
  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * 10000);
  }
  return arr;
}

// QuickSort
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];

  for (const el of arr) {
    if (el < pivot) left.push(el);
    else if (el > pivot) right.push(el);
    else equal.push(el);
  }

  return [...quickSort(left), ...equal, ...quickSort(right)];
}

// MergeSort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Функция измерения времени выполнения сортировки
function measureSort(sortFn, sizes) {
  console.group(sortFn.name);
  sizes.forEach(size => {
    const arr = generateRandomArray(size);
    const label = `${size}`;
    console.time(label);
    sortFn(arr);
    console.timeEnd(label);
  });
  console.groupEnd();
}

// Массив размеров для тестирования: 10^2, 10^3, 10^4, 10^5, 10^6
const sizes = [100, 1000, 10000, 100000, 1000000];

// Запускаем измерения для каждого алгоритма и каждого размера
measureSort(quickSort, sizes);
measureSort(mergeSort, sizes);





