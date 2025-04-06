class SingleArray {
  constructor() {
    this.array = []; 
  }

  size() {
    return this.array.length;
  }

  add(item) {
    this._resize();
    this.array[this.size() - 1] = item;
  }

  get(index) {
    return this.array[index];
  }

  _resize() {
    const newSize = this.size() + 1;
    const newArray = new Array(newSize);
    for (let j = 0; j < this.size(); j++) {
      newArray[j] = this.array[j];
    }
    this.array = newArray;
  }

  remove(index) {
    if (index < 0 || index >= this.size()) {
      throw new Error("Индекс выходит за пределы массива");
    }
    const newSize = this.size() - 1;
    const newArray = new Array(newSize);
    for (let i = 0, j = 0; i < this.size(); i++) {
      if (i === index) continue;
      newArray[j++] = this.array[i];
    }
    this.array = newArray;
  }
}

class VectorArray {
  constructor(vector = 10) {
    this.vector = vector;
    this.array = new Array(0); 
    this.sizeVal = 0;
  }

  size() {
    return this.sizeVal;
  }

  add(item) {
    if (this.size() === this.array.length) {
      this._resize();
    }
    this.array[this.sizeVal] = item;
    this.sizeVal++;
  }

  get(index) {
    return this.array[index];
  }

  _resize() {
    const newLength = this.array.length + this.vector;
    const newArray = new Array(newLength);
    for (let i = 0; i < this.array.length; i++) {
      newArray[i] = this.array[i];
    }
    this.array = newArray;
  }

  remove(index) {
    if (index < 0 || index >= this.size()) {
      throw new Error("Индекс выходит за пределы массива");
    }
    for (let i = index; i < this.size() - 1; i++) {
      this.array[i] = this.array[i + 1];
    }
    this.sizeVal--;
    this.array[this.sizeVal] = undefined;
  }
}

class MatrixArray {
  constructor(vector = 10) {
    this.vector = vector;
    this.array = new SingleArray();
    this.sizeVal = 0;
  }

  size() {
    return this.sizeVal;
  }

  add(item) {
    if (this.sizeVal === this.array.size() * this.vector) {
      this.array.add(new VectorArray(this.vector));
    }
    const row = Math.floor(this.sizeVal / this.vector);
    this.array.get(row).add(item);
    this.sizeVal++;
  }

  get(index) {
    const row = Math.floor(index / this.vector);
    const col = index % this.vector;
    return this.array.get(row).get(col);
  }

  remove(index) {
    if (index < 0 || index >= this.sizeVal) {
      throw new Error("Индекс выходит за пределы массива");
    }
    const temp = [];
    for (let i = 0; i < this.sizeVal; i++) {
      temp.push(this.get(i));
    }
    temp.splice(index, 1);
    this.array = new SingleArray();
    this.sizeVal = 0;
    for (const item of temp) {
      this.add(item);
    }
  }
}

class FactorArray {
  constructor(factor = 50, initLength = 10) {
    this.factor = factor;
    this.array = new Array(initLength);
    this.sizeVal = 0;
  }

  size() {
    return this.sizeVal;
  }

  add(item) {
    if (this.sizeVal === this.array.length) {
      this._resize();
    }
    this.array[this.sizeVal] = item;
    this.sizeVal++;
  }

  get(index) {
    return this.array[index];
  }

  _resize() {
    const additional = Math.floor(this.array.length * this.factor / 100);
    const newLength = this.array.length + additional;
    const newArray = new Array(newLength);
    for (let i = 0; i < this.array.length; i++) {
      newArray[i] = this.array[i];
    }
    this.array = newArray;
  }

  remove(index) {
    if (index < 0 || index >= this.sizeVal) {
      throw new Error("Индекс выходит за пределы массива");
    }
    for (let i = index; i < this.sizeVal - 1; i++) {
      this.array[i] = this.array[i + 1];
    }
    this.sizeVal--;
    this.array[this.sizeVal] = undefined;
  }
}