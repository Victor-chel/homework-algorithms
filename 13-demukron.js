
function demukron(A) {
  const N = A.length;
  // 1) Считаем входящие степени
  const indegree = new Array(N).fill(0);
  for (let u = 0; u < N; u++) {
    for (let k = 0; k < A[u].length; k++) {
      const v = A[u][k];
      if (v >= 0) {
        indegree[v]++;
      }
    }
  }

  const level = [];
  let remaining = N;
  
  // 2) На каждом шаге выбираем все вершины с indegree == 0
  while (remaining > 0) {
    const thisLevel = [];
    
    for (let u = 0; u < N; u++) {
      if (indegree[u] === 0) {
        thisLevel.push(u);
      }
    }
    
    if (thisLevel.length === 0) {
      // Есть цикл, топологическая сортировка невозможна
      throw new Error("Граф содержит цикл – топологическая сортировка не возможна");
    }
    
    level.push(thisLevel);
    
    // 3) Удаляем эти вершины
    for (const u of thisLevel) {
      indegree[u] = -1; 
      remaining--;
      for (let k = 0; k < A[u].length; k++) {
        const v = A[u][k];
        if (v >= 0 && indegree[v] > 0) {
          indegree[v]--;
        }
      }
    }
  }
  
  return level;
}

// Пример использования:
const A = [
  /* 0 */ [1, 2, -1, -1],
  /* 1 */ [3, -1, -1, -1],
  /* 2 */ [3, 4, -1, -1],
  /* 3 */ [5, -1, -1, -1],
  /* 4 */ [5, -1, -1, -1],
  /* 5 */ [-1, -1, -1, -1]
];

const levels = demukron(A);
console.log(levels);
// Ожидаемый вывод:
// [
//   [0],      // уровень 0: вершины без входящих
//   [1,2],    // уровень 1: после удаления 0
//   [3,4],    // уровень 2
//   [5]       // уровень 3
// ]
