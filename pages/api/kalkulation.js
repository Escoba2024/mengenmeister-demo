export default function handler(req, res) {
  if (req.method === 'POST') {
    const { menge, preis } = req.body;

    // Berechnung: Menge * Preis
    const gesamt = parseFloat(menge) * parseFloat(preis);

    // Rückgabe der Berechnung
    return res.status(200).json({ gesamt });
  } else {
    // Fehler für falsche HTTP-Methode
    res.status(405).json({ error: 'Method not allowed' });
  }
}
