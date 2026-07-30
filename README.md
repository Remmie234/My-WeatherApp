# My Weather App

My simple 5-day weather forecast application built with vanilla JavaScript, CSS, and the OpenWeatherMap API, running on the Vite development server.

## Features

- Real-time city search with typing debounce.
- 5-day forecast displaying calculated daily high and low temperatures.
- Secured API configuration using environment variables.

### Prerequisites

You'll need [Node.js](https://nodejs.org) installed on your computer to run the setup commands.

## Installation

1. Clone this repository:
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   ```
2. Navigate into the folder:
   ```bash
   cd MY-WEATHERAPP
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file inside the `v0.1` folder and add your OpenWeatherMap API key:
   ```text
   VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
   ```
5. Launch the local development server:
   ```bash
   npx vite v0.1
   ```
