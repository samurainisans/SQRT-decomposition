<template>
  <div class="algorithm-info">
    <header class="info-header">
      <h1>Square Root (SQRT) Декомпозиция</h1>
      <p class="subtitle">Эффективный метод оптимизации запросов для решения задач на отрезках</p>
    </header>

    <div class="content-sections">
      <section class="intro-section">
        <h2>Что такое SQRT-декомпозиция?</h2>
        <p>
          Square Root Декомпозиция — это техника оптимизации запросов, которая позволяет уменьшить
          временную сложность операций с <strong>O(N)</strong> до <strong>O(√N)</strong>.
        </p>
        <p>
          Основная идея заключается в разбиении массива размером N на блоки размером √N, для каждого
          из которых предварительно вычисляется желаемый результат (например, сумма элементов).
        </p>
      </section>

      <section class="approaches-section">
        <h2>Подходы к реализации</h2>

        <div class="approach">
          <h3>1. Наивный подход (Brute Force)</h3>
          <div class="complexity">
            Временная сложность: <span class="time-complexity">O(N)</span>
          </div>
          <p>Простая итерация по всем элементам в диапазоне [l, r] для вычисления результата.</p>

          <div class="code-block">
            <pre><code>function query(l, r) {
    let sum = 0;
    for (let i = l; i &lt;= r; i++) {
        sum += arr[i];
    }
    return sum;
}</code></pre>
          </div>
        </div>

        <div class="approach">
          <h3>2. Эффективный подход (SQRT-декомпозиция)</h3>
          <div class="complexity">
            Временная сложность: <span class="time-complexity optimized">O(√N)</span>
          </div>
          <p>
            Разбиваем массив на блоки размером √N и предварительно вычисляем сумму для каждого
            блока. При обработке запроса используем комбинацию готовых сумм блоков и отдельных
            элементов.
          </p>

          <div class="algorithm-steps">
            <h4>Алгоритм обработки запроса:</h4>
            <ol>
              <li>
                <strong>Обработка левой части:</strong> Если левая граница запроса не совпадает с
                началом блока, обрабатываем элементы поочередно до начала следующего блока.
              </li>
              <li>
                <strong>Обработка полных блоков:</strong> Для блоков, полностью попадающих в запрос,
                используем предварительно вычисленные суммы.
              </li>
              <li>
                <strong>Обработка правой части:</strong> Обрабатываем оставшиеся элементы
                поочередно.
              </li>
            </ol>
          </div>

          <div class="code-block">
            <pre><code>function query(l, r) {
    let sum = 0;
    let blockSize = Math.floor(Math.sqrt(n));

    // Обрабатываем левую часть
    while (l &lt; r && l % blockSize !== 0 && l !== 0) {
        sum += arr[l];
        l++;
    }

    // Обрабатываем полные блоки
    while (l + blockSize - 1 &lt;= r) {
        sum += block[l / blockSize];
        l += blockSize;
    }

    // Обрабатываем правую часть
    while (l &lt;= r) {
        sum += arr[l];
        l++;
    }

    return sum;
}</code></pre>
          </div>
        </div>
      </section>

      <section class="operations-section">
        <h2>Поддерживаемые операции</h2>

        <div class="operation-card">
          <h3>📊 Запрос суммы (Range Sum Query)</h3>
          <p>Вычисление суммы элементов на отрезке [l, r]</p>
          <div class="complexity">Сложность: O(√N)</div>
        </div>

        <div class="operation-card">
          <h3>✏️ Точечное обновление (Point Update)</h3>
          <p>Изменение значения элемента по индексу</p>
          <div class="complexity">Сложность: O(1)</div>
        </div>
      </section>

      <section class="example-section">
        <h2>Пример работы</h2>
        <p>Рассмотрим массив: <code>[1, 5, 2, 4, 6, 1, 3, 5, 7, 10]</code></p>

        <div class="example-visualization">
          <div class="example-array">
            <div class="block block-0">
              <div class="block-header">Блок 0</div>
              <div class="elements">
                <span class="element">1</span>
                <span class="element">5</span>
                <span class="element">2</span>
              </div>
              <div class="block-sum">Сумма: 8</div>
            </div>

            <div class="block block-1">
              <div class="block-header">Блок 1</div>
              <div class="elements">
                <span class="element">4</span>
                <span class="element">6</span>
                <span class="element">1</span>
              </div>
              <div class="block-sum">Сумма: 11</div>
            </div>

            <div class="block block-2">
              <div class="block-header">Блок 2</div>
              <div class="elements">
                <span class="element">3</span>
                <span class="element">5</span>
                <span class="element">7</span>
              </div>
              <div class="block-sum">Сумма: 15</div>
            </div>

            <div class="block block-3">
              <div class="block-header">Блок 3</div>
              <div class="elements">
                <span class="element">10</span>
              </div>
              <div class="block-sum">Сумма: 10</div>
            </div>
          </div>

          <div class="query-example">
            <h4>Запрос суммы на отрезке [3, 8]:</h4>
            <p><strong>Результат:</strong> 4 + 6 + 1 + 3 + 5 = 19</p>
            <p>
              <strong>Оптимизация:</strong> Элемент 4 + Блок 1 (11) + Элементы 3, 5 = 4 + 11 + 8 =
              23
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.algorithm-info {
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px;
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
  line-height: 1.6;
  color: #1f2937;
}

.info-header {
  text-align: center;
  margin-bottom: 48px;
  padding: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
}

.info-header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  letter-spacing: -0.025em;
}

.subtitle {
  font-size: 1.25rem;
  font-weight: 300;
  margin: 0;
  opacity: 0.9;
}

.content-sections {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

section {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 24px 0;
  border-bottom: 3px solid #3b82f6;
  padding-bottom: 12px;
}

h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 16px 0;
}

h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4b5563;
  margin: 0 0 12px 0;
}

p {
  margin: 0 0 16px 0;
  color: #4b5563;
}

.approach {
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid #e2e8f0;
}

.complexity {
  display: inline-block;
  background: #fee2e2;
  color: #dc2626;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 16px;
}

.time-complexity.optimized {
  background: #dcfce7;
  color: #16a34a;
}

.code-block {
  background: #1f2937;
  border-radius: 8px;
  padding: 20px;
  margin: 16px 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  color: #f9fafb;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.algorithm-steps ol {
  background: #eff6ff;
  border-left: 4px solid #3b82f6;
  border-radius: 8px;
  padding: 20px 20px 20px 40px;
  margin: 16px 0;
}

.algorithm-steps li {
  margin-bottom: 12px;
  color: #1e40af;
}

.operations-section {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
}

.operation-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  border: 1px solid #e0f2fe;
  transition: all 0.2s ease;
}

.operation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.advantage-card {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.2s ease;
}

.advantage-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.advantage-card h3 {
  color: #15803d;
  margin-bottom: 12px;
}

.example-visualization {
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
}

.example-array {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.block {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  min-width: 120px;
  transition: all 0.2s ease;
}

.block:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.block-header {
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  font-size: 14px;
}

.elements {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 8px;
}

.element {
  background: #dbeafe;
  color: #1e40af;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
}

.block-sum {
  font-weight: 700;
  color: #3b82f6;
  font-size: 14px;
}

.query-example {
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  border-radius: 8px;
  padding: 20px;
}

.query-example h4 {
  color: #92400e;
  margin-bottom: 12px;
}

.query-example p {
  color: #78350f;
  margin-bottom: 8px;
}

code {
  background: #f3f4f6;
  color: #1f2937;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .algorithm-info {
    padding: 16px;
  }

  .info-header h1 {
    font-size: 2rem;
  }

  .example-array {
    flex-direction: column;
  }

  .advantages-grid {
    grid-template-columns: 1fr;
  }
}
</style>
