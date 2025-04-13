import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export default function MengenTabelle() {
  const [positionen, setPositionen] = useState([]);
  const [neu, setNeu] = useState({ pos: '', text: '', menge: '', preis: '' });

  const handleAdd = () => {
    if (!neu.pos || !neu.text || !neu.menge || !neu.preis) return;
    setPositionen([...positionen, neu]);
    setNeu({ pos: '', text: '', menge: '', preis: '' });
  };

  const exportToExcel = () => {
    const daten = positionen.map(p => ({
      Position: p.pos,
      Bezeichnung: p.text,
      "Menge [m3]": parseFloat(p.menge),
      "Einheitspreis [EUR/m3]": parseFloat(p.preis),
      "Gesamtpreis [EUR]": parseFloat(p.menge) * parseFloat(p.preis)
    }));
    const worksheet = XLSX.utils.json_to_sheet(daten);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leistungen");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'mengenmeister_export.xlsx');
  };

  const exportToGaeb = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<GAEB xmlns="http://www.gaeb.de/GAEB_DA_XML/DA_XML_3_1">\n  <Header><Version>3.1</Version></Header>\n  <Positions>\n    ${positionen.map(p => `
      <Position>
        <PosNr>${p.pos}</PosNr>
        <Text>${p.text}</Text>
        <Quantity>${p.menge}</Quantity>
        <Unit>m3</Unit>
        <UnitPrice>${p.preis}</UnitPrice>
      </Position>`).join('\n')}\n  </Positions>\n</GAEB>`;
    const blob = new Blob([xml], { type: 'application/xml' });
    saveAs(blob, 'mengenmeister_export.gaeb.xml');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2">
        <input type="text" placeholder="Position" className="border p-2" value={neu.pos} onChange={(e) => setNeu({ ...neu, pos: e.target.value })} />
        <input type="text" placeholder="Bezeichnung" className="border p-2" value={neu.text} onChange={(e) => setNeu({ ...neu, text: e.target.value })} />
        <input type="number" step="0.01" placeholder="Menge" className="border p-2" value={neu.menge} onChange={(e) => setNeu({ ...neu, menge: e.target.value })} />
        <input type="number" step="0.01" placeholder="Einheitspreis" className="border p-2" value={neu.preis} onChange={(e) => setNeu({ ...neu, preis: e.target.value })} />
      </div>
      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">+ Hinzufügen</button>

      <table className="w-full mt-4 border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Pos</th>
            <th className="border p-2">Text</th>
            <th className="border p-2">Menge</th>
            <th className="border p-2">EP</th>
            <th className="border p-2">Gesamt</th>
          </tr>
        </thead>
        <tbody>
          {positionen.map((p, i) => (
            <tr key={i}>
              <td className="border p-2">{p.pos}</td>
              <td className="border p-2">{p.text}</td>
              <td className="border p-2 text-right">{p.menge}</td>
              <td className="border p-2 text-right">{p.preis}</td>
              <td className="border p-2 text-right">{(parseFloat(p.menge) * parseFloat(p.preis)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4 mt-6">
        <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded">⬇ Excel Export</button>
        <button onClick={exportToGaeb} className="bg-yellow-600 text-white px-4 py-2 rounded">⬇ GAEB XML Export</button>
      </div>
    </div>
  );
}
