const MAXN = 10000
const SQRSIZE = 100

const arr = new Array(MAXN)
for (let i = 0; i < MAXN; i++) {
  arr[i] = 0
}

const block = new Array(SQRSIZE)
for (let i = 0; i < SQRSIZE; i++) {
  block[i] = 0
}

const x = 0

// функция для обновления значения
// в конкретном индексе
// массива
function update(idx: number, val: number) {
  const blockNumber = idx / x
  block[blockNumber] += val - arr[idx]
  arr[idx] = val
}
function query(l: number, r: number) {
  let sum = 0
  while (l < r && l % x != 0 && l != 0) {
    // обход первого блока в диапазоне
    sum += arr[l]
    l++
  }
  while (l + x - 1 <= r) {
    // обход полностью
    // перекрывающихся блоков в диапазоне
    sum += block[l / x]
    l += x
  }
  while (l <= r) {
    // обход последнего блока в диапазоне
    sum += arr[l]
    l++
  }
  return sum
}

// заполняет значения в input[]
function preprocess(input: number[], n: number) {
  // инициализация указателя блока
  let x = -1

  // вычисление размера блока
  x = Math.floor(Math.sqrt(n))

  // построение декомпозированного массива
  for (let i = 0; i < n; i++) {
    arr[i] = input[i]
    if (i % x == 0) {
      // вход в следующий блок
      // увеличение указателя блока
      x++
    }
    block[x] += arr[i]
  }
}

const input = [1, 5, 2, 4, 6, 1, 3, 5, 7, 10]
const n = input.length

preprocess(input, n)

console.log('query(3,7) : ' + query(3, 7))
console.log('query(4,4) : ' + query(4, 4))
update(6, 0)
console.log('query(5,5) : ' + query(5, 5))
