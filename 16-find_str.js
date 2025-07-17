function findSubstring(text, pattern) {
  const n = text.length;
  const m = pattern.length;

  // Если искомая строка пустая, считаем, что она находится в позиции 0
  if (m === 0) return 0;

  for (let i = 0; i <= n - m; i++) {
    let match = true;
    for (let j = 0; j < m; j++) {
      if (text[i + j] !== pattern[j]) {
        match = false;
        break;
      }
    
    if (match) {
      return i;
    }
  }
  // Ничего не нашли
  return -1;
}

// Примеры использования:
console.log(findSubstring("hello world", "world")); // 6
console.log(findSubstring("abracadabra", "cada"));  // 4
console.log(findSubstring("abc", "abcd"));          // -1
console.log(findSubstring("test", ""));             // 0