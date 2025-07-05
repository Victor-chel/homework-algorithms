
function dijkstra(A, src) {
  // Класс ребра
  class Edge {
    constructor(v1, v2) {
      this.v1 = v1;
      this.v2 = v2;
    }
  }

  const N       = A.length;
  const dist    = new Array(N).fill(Infinity);
  const visited = new Array(N).fill(false);
  const prev    = new Array(N).fill(-1);

  dist[src] = 0;

  for (let it = 0; it < N; it++) {
    // Найти непосещённую вершину с наименьшим dist
    let u = -1, best = Infinity;
    for (let i = 0; i < N; i++) {
      if (!visited[i] && dist[i] < best) {
        best = dist[i];
        u = i;
      }
    }
    if (u === -1) break;
    visited[u] = true;

    for (let v of A[u]) {
      if (!visited[v] && dist[u] + 1 < dist[v]) {
        dist[v] = dist[u] + 1;
        prev[v] = u;
      }
    }
  }

  // Собираем ребра дерева кратчайших путей
  const edges = [];
  for (let v = 0; v < N; v++) {
    if (v !== src && prev[v] !== -1) {
      edges.push(new Edge(prev[v], v));
    }
  }
  return edges;
}

// Пример
const A = [
  [1,2],
  [0,2,3],
  [0,1,3],
  [1,2]
];
console.log( dijkstra(A, 0) );
// вывод [ {v1:0,v2:1}, {v1:0,v2:2}, {v1:1,v2:3} ]
