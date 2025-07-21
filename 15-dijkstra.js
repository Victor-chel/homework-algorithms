// A структура смежности
// W веса
// src исходная вершина
function dijkstra(A, W, src) {
  // Класс ребра
  class Edge { constructor(v1, v2) { this.v1 = v1; this.v2 = v2; } }
  const N       = A.length;
  const dist    = Array(N).fill(Infinity);
  const visited = Array(N).fill(false);
  const prev    = Array(N).fill(-1);
  dist[src] = 0;
  // Найти непосещённую вершину с наименьшим dist
  for (let it = 0; it < N; it++) {
    let u = -1, best = Infinity;
    for (let i = 0; i < N; i++) {
      if (!visited[i] && dist[i] < best) {
        best = dist[i];
        u = i;
      }
    }
    if (u === -1) break;
    visited[u] = true;
    for (let k = 0; k < A[u].length; k++) {
      const v = A[u][k], w = W[u][k], alt = dist[u] + w;
      if (!visited[v] && alt < dist[v]) {
        dist[v] = alt;
        prev[v] = u;
      }
    }
  }
  const edges = [];
  for (let v = 0; v < N; v++) {
    if (v !== src && prev[v] !== -1) {
      edges.push(new Edge(prev[v], v));
    }
  } 
  edges.sort((a, b) => (a.v1 - b.v1) || (a.v2 - b.v2));
  return edges;
}

//Пример использования
//Граф
const A = [[1,2],[2,3],[1,3,4],[4],[3]];
// из 0 в 1, 0 в 2
// из 1 в 2, 1 в 3
// из 2 в 1, 2 в 3, 2 в 4
// из 3 в 4
// из 4 в 3
//Веса
const W = [[10,3],[1,2],[4,8,2],[7],[9]];
console.log( dijkstra(A, W, 0) );
