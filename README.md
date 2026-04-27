# Water Quality Awareness Tool

A full-stack responsive web application that helps users assess water quality and learn about water safety. Built with React.js (Vite) and Node.js/Express.

## Features

- **Water Quality Checker** — Enter pH, TDS, Turbidity, and Temperature values to get instant analysis with color-coded results (Safe/Moderate/Unsafe)
- **Interactive Charts** — Bar and radar charts visualize parameter quality scores using Recharts
- **Health Recommendations** — Smart suggestions based on your water quality results (boil water, use RO filter, etc.)
- **Awareness Section** — Educational content covering clean water importance, pollution causes, waterborne diseases, and prevention tips
- **Result History** — Save and track analyses locally with trend charts over time
- **Responsive Design** — Mobile-friendly, card-based modern UI

## Project Structure

```
waterqualityawarenesstool/
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Navbar, Footer, ResultCard
│   │   ├── pages/          # Home, Checker, Awareness, History
│   │   └── utils/          # Water analysis logic, local storage
│   ├── index.html
│   └── package.json
├── backend/                # Node.js + Express backend
│   ├── routes/
│   │   └── analyze.js      # POST /api/analyze endpoint
│   ├── server.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

### Backend

```bash
cd backend
npm install
node server.js
```

The API runs at `http://localhost:5000`.

### API Usage

**POST** `/api/analyze`

```json
{
  "ph": 7.2,
  "tds": 350,
  "turbidity": 2.5,
  "temperature": 22
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "results": [
      { "param": "pH", "value": 7.2, "status": "Safe", "level": "safe" },
      { "param": "TDS", "value": "350 ppm", "status": "Good", "level": "moderate" },
      { "param": "Turbidity", "value": "2.5 NTU", "status": "Safe", "level": "safe" },
      { "param": "Temperature", "value": "22 °C", "status": "Ideal", "level": "safe" }
    ],
    "overall": "moderate",
    "suggestions": ["High TDS detected. Use a Reverse Osmosis (RO) water purifier."]
  }
}
```

## Analysis Rules

| Parameter  | Safe           | Moderate     | Unsafe        |
| ---------- | -------------- | ------------ | ------------- |
| pH         | 6.5 – 8.5     | —            | < 6.5 or > 8.5 |
| TDS (ppm)  | < 300          | 300 – 1000   | > 1000        |
| Turbidity  | < 5 NTU        | —            | ≥ 5 NTU       |
| Temp (°C)  | 10 – 25        | 5–10 / 25–35 | < 5 or > 35   |

## Tech Stack

- **Frontend:** React 19, React Router, Recharts, Vite
- **Backend:** Node.js, Express, CORS
- **Storage:** Browser localStorage for result history

## License

MIT
