//algebraic_algorithms


//итеративный O(N) алгоритм возведения числа в степень.

function pow(a, n) {
    if (n === 0) return 1.0;
    let p = 1.0;
    for (let i = 0; i < n; i++) {
        p *= a;
    }
    return p;
}

console.log(pow(5, 3));

//Реализовать алгоритм возведения в степень через двоичное разложение показателя степени

function powerR(a, n) {
    if (n === 0) return 1.0;
    if (n === 1) return a;  
    if (n % 2 === 0) {
	let x = powerR(a, (n / 2));
    	return x * x;
    } else {
	return a * powerR(a, n - 1)
    }
}

console.log(powerR(5, 3));

//рекурсивный алгоритм поиска чисел Фибоначчи.
function Fibonacci(n) {
    if (n === 1) return 1;
    if (n === 2) return 1;
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}
console.log(Fibonacci(20));

//итеративный алгоритм поиска чисел Фибоначчи
function Fibonacci_iter(n) {
    let f1 = 1, f2 = 1;
    for (let i = 2; i < n; i++) {
        let f3 = f2 + f1;
        f1 = f2;
        f2 = f3;
    }
    return f2;
}
console.log(Fibonacci_iter(20));

//алгоритм поиска количества простых чисел через перебор делителей
function isPrime(n) {
    let count = 0;
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            count++;
        }
    }
    return count === 2;
}
console.log(isPrime(3571));