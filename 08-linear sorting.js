// Генерирует массив из n случайных чисел (в диапазоне 0–999)
function generateRandomArray(n) {
  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * 1000);
  }
  return arr;
}

// Вспомогательные функции для поиска min и max без spread
function findMax(a) {
  let maxVal = a[0];
  for (let i = 1; i < a.length; i++) {
    if (a[i] > maxVal) maxVal = a[i];
  }
  return maxVal;
}

function findMin(a) {
  let minVal = a[0];
  for (let i = 1; i < a.length; i++) {
    if (a[i] < minVal) minVal = a[i];
  }
  return minVal;
}

// 1. CountingSort
function countingSort(a) {
  const n = a.length;
  if (n === 0) return a;
  const maxVal = findMax(a);
  const count = new Array(maxVal + 1).fill(0);
  for (let i = 0; i < n; i++) {
    count[a[i]]++;
  }
  let index = 0;
  for (let val = 0; val <= maxVal; val++) {
    while (count[val] > 0) {
      a[index++] = val;
      count[val]--;
    }
  }
  return a;
}

// 2. RadixSort
function radixSort(a) {
  const n = a.length;
  if (n === 0) return a;
  const maxVal = findMax(a);
  let exp = 1;
  const aux = new Array(n);
  while (Math.floor(maxVal / exp) > 0) {
    const count = new Array(10).fill(0);
    for (let i = 0; i < n; i++) {
      const digit = Math.floor((a[i] / exp) % 10);
      count[digit]++;
    }
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor((a[i] / exp) % 10);
      aux[--count[digit]] = a[i];
    }
    for (let i = 0; i < n; i++) a[i] = aux[i];
    exp *= 10;
  }
  return a;
}

// 3. BucketSort
function bucketSort(a) {
  const n = a.length;
  if (n === 0) return a;
  const minVal = findMin(a);
  const maxVal = findMax(a);
  const bucketCount = n;
  const buckets = Array.from({ length: bucketCount }, () => []);
  const range = maxVal - minVal + 1;
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(((a[i] - minVal) / range) * (bucketCount - 1));
    buckets[idx].push(a[i]);
  }
  let index = 0;
  for (let b = 0; b < bucketCount; b++) {
    const bucket = buckets[b];
    for (let i = 1; i < bucket.length; i++) {
      const key = bucket[i];
      let j = i - 1;
      while (j >= 0 && bucket[j] > key) {
        bucket[j + 1] = bucket[j];
        j--;
      }
      bucket[j + 1] = key;
    }
    for (let val of bucket) a[index++] = val;
  }
  return a;
}

// Функция измерения логов
function measureSort(sortFn, sizes) {
  console.group(sortFn.name);
  sizes.forEach(size => {
    const arr = generateRandomArray(size);
    const label = `${sortFn.name}-${size}`;
    console.time(label);
    sortFn(arr);
    console.timeEnd(label);
  });
  console.groupEnd();
}

// Массив размеров для тестирования: 10^2, 10^3, 10^4, 10^5, 10^6
const sizes = [1e2, 1e3, 1e4, 1e5, 1e6];

// Запускаем замеры, группируя по алгоритмам
measureSort(countingSort, sizes);
measureSort(radixSort, sizes);
measureSort(bucketSort, sizes);