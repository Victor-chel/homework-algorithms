// Класс ребра
function Edge(v1, v2, weight) {
  this.v1 = v1;
  this.v2 = v2;
  this.weight = weight;
}

function UnionFind(n) {
  this.parent = [];
  for (let i = 0; i < n; i++) {
    this.parent[i] = i;
  }
}

UnionFind.prototype.find = function(x) {
  while (this.parent[x] !== x) {
    x = this.parent[x];
  }
  return x;
};

UnionFind.prototype.union = function(a, b) {
  const ra = this.find(a);
  const rb = this.find(b);
  if (ra !== rb) {
    this.parent[rb] = ra;
    return true;
  }
  return false;
};

// Функция Краскала: A — список смежности, W — параллельная матрица весов
function kruskalFromAdjacency(A, W) {
  const N = A.length;
  const edges = [];

  // Собираем список всех рёбер 
  for (let i = 0; i < N; i++) {
    for (let k = 0; k < A[i].length; k++) {
      const j = A[i][k];
      if (j >= 0 && j < N && i < j) {
        const weight = W[i][k];
        edges.push(new Edge(i, j, weight));
      }
    }
  }

  //Сортируем рёбра по возрастанию веса
  edges.sort(function(e1, e2) {
    return e1.weight - e2.weight;
  });

  const uf = new UnionFind(N);
  const mst = [];

  // Проходим по каждому ребру в порядке роста веса
  for (let idx = 0; idx < edges.length; idx++) {
    const e = edges[idx];
    if (uf.union(e.v1, e.v2)) {
      mst.push(e);
      if (mst.length === N - 1) break; 
    }
  }

  return mst; 
}

//Пример использования

// Граф из 5 вершин:
const A = [
  [1, 2],    // из 0 в 1,2
  [0, 2, 3], // из 1 в 0,2,3
  [0, 1, 4], // из 2 в 0,1,4
  [1, 4],    // из 3 в 1,4
  [2, 3]     // из 4 в 2,3
];
// вес
const W = [
  [4, 1],    // веса 0–1:4, 0–2:1
  [4, 3, 2], // 1–0:4, 1–2:3, 1–3:2
  [1, 3, 5], // 2–0:1, 2–1:3, 2–4:5
  [2, 7],    // 3–1:2, 3–4:7
  [5, 7]     // 4–2:5, 4–3:7
];

const mst = kruskalFromAdjacency(A, W);
console.log("Минимальное остовное дерево (ребра):");
mst.forEach(function(e) {
  console.log(`(${e.v1}–${e.v2}) weight=${e.weight}`);
});
// Ожидаемый вывод:
// (0–2) weight=1
// (1–3) weight=2
// (0–1) weight=4
// (2–4) weight=5
