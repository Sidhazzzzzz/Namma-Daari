# 🛡️ Namma Daari

A modern web application that helps you find the safest routes in Bengaluru by analyzing crime data and providing safety scores for alternative routes.

## Features

- 🗺️ **Interactive Map**: Powered by MapLibre GL JS with a beautiful dark theme
- 🛣️ **Multiple Routes**: Get up to 3 alternative routes between any two locations
- 🔒 **Safety Scoring**: Each route is analyzed against crime data and given a safety score (0-100)
- 📊 **Crime Visualization**: See crime hotspots on the map with severity indicators
- 🎨 **Premium UI**: Modern glassmorphism design with smooth animations
- ⚡ **Fast & Responsive**: Built with Vite for optimal performance

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Build Tool**: Vite
- **Mapping**: MapLibre GL JS
- **Routing API**: OSRM (Open Source Routing Machine)
- **Geocoding**: Nominatim (OpenStreetMap)
- **Styling**: Custom CSS with CSS Variables

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mf
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8081`

## Usage

1. Enter your **starting point** (e.g., "Indiranagar, Bengaluru")
2. Enter your **destination** (e.g., "Koramangala, Bengaluru")
3. Click **Find Safe Routes**
4. View the routes on the map with color-coded safety indicators:
   - 🟢 Green: Safest route (75-100 safety score)
   - 🟠 Orange: Moderate safety (50-74 safety score)
   - 🔴 Red: Caution advised (0-49 safety score)
5. Click on any route card or route line to highlight it

## How Safety Scores Work

The safety score is calculated by:
1. Analyzing the route path against known crime hotspots
2. Calculating proximity to crime areas (within 500m radius)
3. Weighting by crime severity (1-10 scale)
4. Normalizing to a 0-100 score where 100 is the safest

## Project Structure

```
mf/
├── src/
│   ├── services/
│   │   ├── geocodingService.js  # Location to coordinates conversion
│   │   ├── routeService.js      # Route fetching from OSRM
│   │   └── safetyService.js     # Crime data and safety scoring
│   ├── main.js                  # Main application logic
│   └── style.css                # Styling and design system
├── index.html                   # Entry point
├── package.json                 # Dependencies
└── vite.config.js              # Vite configuration
```

## API Credits

- **Routing**: [OSRM](http://project-osrm.org/)
- **Geocoding**: [Nominatim](https://nominatim.org/)
- **Map Tiles**: [Stadia Maps](https://stadiamaps.com/)

## Future Enhancements

- [ ] Real-time crime data integration
- [ ] User-reported incidents
- [ ] Time-based safety analysis (day vs night)
- [ ] Save favorite routes
- [ ] Share routes with others
- [ ] Mobile app version
