(() => {
    const N = 5000;
    const SEARCH_COUNT = Math.floor(N / 10); // 500
    const REMOVE_COUNT = Math.floor(N / 10); // 500

    //Реализация Splay-дерева

    class SplayNode {
        constructor(key) {
            this.key = key;
            this.left = null;
            this.right = null;
            this.parent = null;
        }
    }

    class SplayTree {
        constructor() {
            this.root = null;
        }

        _rotateRight(x) {
            const y = x.left;
            if (!y) return;
            x.left = y.right;
            if (y.right) {
                y.right.parent = x;
            }
            y.parent = x.parent;
            if (!x.parent) {
                this.root = y;
            } else if (x === x.parent.left) {
                x.parent.left = y;
            } else {
                x.parent.right = y;
            }
            y.right = x;
            x.parent = y;
        }

        _rotateLeft(x) {
            const y = x.right;
            if (!y) return;
            x.right = y.left;
            if (y.left) {
                y.left.parent = x;
            }
            y.parent = x.parent;
            if (!x.parent) {
                this.root = y;
            } else if (x === x.parent.left) {
                x.parent.left = y;
            } else {
                x.parent.right = y;
            }
            y.left = x;
            x.parent = y;
        }

        _splay(x) {
            if (!x) return;
            while (x.parent) {
                const p = x.parent;
                const gp = p.parent;
                if (!gp) {
                    // Zig
                    if (x === p.left) {
                        this._rotateRight(p);
                    } else {
                        this._rotateLeft(p);
                    }
                } else if (x === p.left && p === gp.left) {
                    // Zig-Zig
                    this._rotateRight(gp);
                    this._rotateRight(p);
                } else if (x === p.right && p === gp.right) {
                    // Zig-Zig
                    this._rotateLeft(gp);
                    this._rotateLeft(p);
                } else if (x === p.right && p === gp.left) {
                    // Zig-Zag
                    this._rotateLeft(p);
                    this._rotateRight(gp);
                } else {
                    // Zig-Zag
                    this._rotateRight(p);
                    this._rotateLeft(gp);
                }
            }
        }

        insert(x) {
            if (!this.root) {
                this.root = new SplayNode(x);
                return;
            }
            let cur = this.root;
            let parent = null;
            while (cur) {
                parent = cur;
                if (x < cur.key) {
                    cur = cur.left;
                } else if (x > cur.key) {
                    cur = cur.right;
                } else {
                    this._splay(cur);
                    return;
                }
            }
            const node = new SplayNode(x);
            node.parent = parent;
            if (x < parent.key) {
                parent.left = node;
            } else {
                parent.right = node;
            }
            this._splay(node);
        }

        search(x) {
            let cur = this.root;
            let last = null;
            while (cur) {
                last = cur;
                if (x === cur.key) {
                    this._splay(cur);
                    return true;
                } else if (x < cur.key) {
                    cur = cur.left;
                } else {
                    cur = cur.right;
                }
            }
            if (last) this._splay(last);
            return false;
        }

        remove(x) {
            if (!this.root) return;
            if (!this.search(x)) {
                return;
            }
            const node = this.root;
            if (!node.left) {
                this.root = node.right;
                if (this.root) this.root.parent = null;
            } else {
                const leftSub = node.left;
                leftSub.parent = null;

                node.left = null;
                let maxNode = leftSub;
                while (maxNode.right) {
                    maxNode = maxNode.right;
                }
                this._splay(maxNode);
                maxNode.right = node.right;
                if (node.right) node.right.parent = maxNode;
                this.root = maxNode;
                maxNode.parent = null;
            }
        }
    }


    // Декартово дерево поиска

    class TreapNode {
        constructor(key) {
            this.key = key;
            this.priority = Math.random();
            this.left = null;
            this.right = null;
        }
    }

    class Treap {
        constructor() {
            this.root = null;
        }

        _rotateRight(y) {
            const x = y.left;
            if (!x) return y;
            y.left = x.right;
            x.right = y;
            return x;
        }

        _rotateLeft(x) {
            const y = x.right;
            if (!y) return x;
            x.right = y.left;
            y.left = x;
            return y;
        }

        _insertNode(node, x) {
            if (!node) {
                return new TreapNode(x);
            }
            if (x < node.key) {
                node.left = this._insertNode(node.left, x);
                if (node.left.priority < node.priority) {
                    node = this._rotateRight(node);
                }
            } else if (x > node.key) {
                node.right = this._insertNode(node.right, x);
                if (node.right.priority < node.priority) {
                    node = this._rotateLeft(node);
                }
            }
            return node;
        }

        insert(x) {
            this.root = this._insertNode(this.root, x);
        }

        search(x) {
            let cur = this.root;
            while (cur) {
                if (x === cur.key) return true;
                else if (x < cur.key) cur = cur.left;
                else cur = cur.right;
            }
            return false;
        }

        _removeNode(node, x) {
            if (!node) return null;
            if (x < node.key) {
                node.left = this._removeNode(node.left, x);
            } else if (x > node.key) {
                node.right = this._removeNode(node.right, x);
            } else {
                if (!node.left && !node.right) {
                    return null;
                } else if (!node.left) {
                    node = this._rotateLeft(node);
                    node.left = this._removeNode(node.left, x);
                } else if (!node.right) {
                    node = this._rotateRight(node);
                    node.right = this._removeNode(node.right, x);
                } else {
                    if (node.left.priority < node.right.priority) {
                        node = this._rotateRight(node);
                        node.right = this._removeNode(node.right, x);
                    } else {
                        node = this._rotateLeft(node);
                        node.left = this._removeNode(node.left, x);
                    }
                }
            }
            return node;
        }

        remove(x) {
            this.root = this._removeNode(this.root, x);
        }
    }


    //  Вспомогательные функции для генерации данных и замеров

    // Функция для генерации массива чисел от 1 до N
    function generateSequence(N) {
        const arr = new Array(N);
        for (let i = 0; i < N; i++) {
            arr[i] = i + 1;
        }
        return arr;
    }

    // Функция для случайного перемешивания массива
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Функция для выбора k случайных элементов из массива
    function sample(array, k) {
        const copy = array.slice();
        shuffle(copy);
        return copy.slice(0, k);
    }

    // Функция для генерации M случайных чисел в диапазоне [1, N]
    function generateRandomKeys(N, M) {
        const result = new Array(M);
        for (let i = 0; i < M; i++) {
            result[i] = Math.floor(Math.random() * N) + 1;
        }
        return result;
    }

    // Функция для бенчмарка: вставка, поиск, удаление
    function benchmarkTree(TreeClass, keysInserted, description) {
        console.group(description);

        // Вставка N элементов
        const tree = new TreeClass();
        const t0 = performance.now();
        for (let key of keysInserted) {
            tree.insert(key);
        }
        const t1 = performance.now();
        console.log(`Insert ${keysInserted.length} elements: ${(t1 - t0).toFixed(2)} ms`);

        // Поиск SEARCH_COUNT случайных ключей в дереве
        const searchKeys = generateRandomKeys(N, SEARCH_COUNT);
        const t2 = performance.now();
        let foundCount = 0;
        for (let key of searchKeys) {
            if (tree.search(key)) foundCount++;
        }
        const t3 = performance.now();
        console.log(`Search ${SEARCH_COUNT} random keys (found ${foundCount}): ${(t3 - t2).toFixed(2)} ms`);

        // Удаление REMOVE_COUNT случайных элементов
        const removeKeys = sample(keysInserted, REMOVE_COUNT);
        const t4 = performance.now();
        for (let key of removeKeys) {
            tree.remove(key);
        }
        const t5 = performance.now();
        console.log(`Remove ${REMOVE_COUNT} random keys: ${(t5 - t4).toFixed(2)} ms`);

        console.groupEnd();
    }


    // Основная логика: запуск бенчмарка

    // Подготовка данных
    const ascendingKeys = generateSequence(N); // [1, 2, ..., N]
    const randomKeys = ascendingKeys.slice();
    shuffle(randomKeys);

    // Запускаем бенчмарк для SplayTree
    benchmarkTree(SplayTree, randomKeys, "SplayTree — random insert");
    benchmarkTree(SplayTree, ascendingKeys, "SplayTree — ascending insert");

    // Запускаем бенчмарк для Treap
    benchmarkTree(Treap, randomKeys, "Treap — random insert");
    benchmarkTree(Treap, ascendingKeys, "Treap — ascending insert");
})();
