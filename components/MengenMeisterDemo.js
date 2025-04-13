import React, { useState } from 'react';

export default function MengenMeisterDemo() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    try {
      const output = eval(input); // Achtung: eval nur für Testzwecke
      setResult(output);
    } catch (err) {
      setResult('❌ Ungültiger Ausdruck');
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-xl shadow-lg max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">🧮 MengenMeister – Testfeld</h1>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="z. B. 5.6 * 3 + 2"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />

      <button
        onClick={handleCalculate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
      >
        Berechnen
      </button>

      {result !== null && (
        <div className="mt-4 text-lg font-semibold text-gray-800">
          Ergebnis: <span className="text-blue-700">{result}</span>
        </div>
      )}
    </div>
  );
}
