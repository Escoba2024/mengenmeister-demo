import React, { useState } from 'react';
import MengenTabelle from './MengenTabelle';

export default function MengenMeisterDemo() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    try {
      const output = eval(input); // Achtung: eval nur zu Testzwecken
      setResult(output);
    } catch (err) {
      setResult('❌ Ungültiger Ausdruck');
    }
  };

  return (
    <div className="p-6 space-y-10">
      {/* Block 1: Ausdruck berechnen */}
      <div className="bg-gray-100 rounded-xl shadow-lg max-w-xl mx-auto p-6">
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

      {/* Block 2: Positionstabelle mit Export */}
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-bold mb-4">📋 Leistungsverzeichnis / Positionen</h2>
        <MengenTabelle />
      </div>
    </div>
  );
}
