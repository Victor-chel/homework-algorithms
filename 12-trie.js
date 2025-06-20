//узел Trie
class TrieNode {
  constructor() {
    this.children = {};  
    this.isEndOfWord = false;
  }
}

//класс Trie
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Вставка слова в Trie
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }
      node = node.children[ch];
    }
    node.isEndOfWord = true;
  }

  // Проверка полного совпадения слова
  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) {
        return false;
      }
      node = node.children[ch];
    }
    return node.isEndOfWord;
  }

  // Проверка, есть ли хотя бы одно слово с данным префиксом
  startsWith(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) {
        return false;
      }
      node = node.children[ch];
    }
    return true;
  }
}

// Пример использования:
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));   // true
console.log(trie.search("app"));     // false
console.log(trie.startsWith("app")); // true
trie.insert("app");
console.log(trie.search("app"));     // true