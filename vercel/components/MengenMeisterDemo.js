import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default function MengenMeisterDemo() {
  const [element, setElement] = useState('Bodenplatte')
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (element === 'Bodenplatte') {
      setResponse(`✅ Ergebnis: 25,94 m³ Beton\n\n📐 Berechnung:\n12,5 m × 8,3 m × 0,25 m = 25,9375 m³\n\n📝 Hinweis: Möchtest du eine zusätzliche Schutzschicht oder Dämmung mit einrechnen?`)
    } else if (element === 'Wand') {
      setResponse(`✅ Ergebnis: 46,00 m² Wandfläche\n\n📐 Berechnung:\n18,4 m × 2,5 m = 46 m²`)
    } else if (element === 'Fundament') {
      setResponse(`✅ Ergebnis: 3,60 m³ Beton\n\n📐 Berechnung:\n6 m × 1 m × 0,6 m = 3,6 m³`)
    } else {
      setResponse(`❓ Unbekanntes Bauteil. Bitte gib eine vollständige Beschreibung an.`)
    }
  }

  const handleExportExcel = () => {
    if (!response) return

    const rows = response.split('\n').filter((line) => line.trim() !== '')
    const worksheet = XLSX.utils.aoa_to_sheet(rows.map(line => [line]))
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'MengenMeister')

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, 'mengenmeister_ergebnis.xlsx')
  }

  const handleExportGAEB = () => {
    if (!response) return
    const blob = new Blob([response.replace(/✅ Ergebnis:/g, 'Ergebnis:')], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, 'mengenmeister_ergebnis.txt')
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🧠 MengenMeister – Demo-Berechnung</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Bauteil wählen:</label>
          <select
            className="w-full p-2 border rounded"
            value={element}
            onChange={(e) => setElement(e.target.value)}
          >
            <option value="Bodenplatte">Bodenplatte</option>
            <option value="Wand">Wand</option>
            <option value="Fundament">Fundament</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Technische Beschreibung / Maßeingabe:</label>
          <Textarea
            rows={4}
            placeholder="z. B. 12,5 m × 8,3 m × 0,25 m"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <Button type="submit">Menge berechnen</Button>
      </form>

      {response && (
        <Card className="mt-6">
          <CardContent>
            <pre className="whitespace-pre-wrap font-mono text-sm p-2">{response}</pre>
            <div className="flex gap-4 mt-4">
              <Button variant="outline" onClick={handleExportExcel}>
                📥 Export als Excel (XLSX)
              </Button>
              <Button variant="outline" onClick={handleExportGAEB}>
                📥 Export als GAEB (TXT)
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}