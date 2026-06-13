export const en = {
  nav: {
    brand: "AQI Jakarta Predictor",
    github: "GitHub Repository",
  },
  hero: {
    title: "Jakarta Air Quality Predictor",
    subtitle: "AI-powered forecasts of tomorrow's air quality based on weather conditions",
    badge: "Jakarta, Indonesia",
    cta: "Start Analysis",
    scrollHint: "Scroll down to forecast",
    liveAqi: "Live Today's AQI",
    liveAqiLabel: "Current Air Quality in Jakarta",
  },
  tabs: {
    predict: "Predict Tomorrow",
    predictShort: "Auto",
    manual: "Custom Scenario",
    manualShort: "Manual",
    history: "Historical Check",
    historyShort: "History",
  },
  metrics: {
    temperature_mean: "Avg Temperature",
    temperature_min: "Min Temperature",
    precipitation: "Precipitation",
    windSpeed: "Avg Wind Speed",
    humidity: "Relative Humidity",
    pressure: "Surface Pressure",
    cloudCover: "Cloud Cover",
    radiation: "Shortwave Radiation",
    currentAqi: "Current AQI",
  },
  metricDetails: {
    currentAqi: {
      meaning: "A standardized index indicating the current level of air pollution and associated health risks.",
      formula: "Calculated from concentrations of PM2.5, PM10, O3, NO2, SO2, and CO.",
      relation: "Acts as the baseline pollution level from which future forecasts are projected.",
    },
    temperature_mean: {
      meaning: "The average air temperature recorded at 2 meters above ground level over the 24-hour period.",
      formula: "T_mean = 1/24 * Sum(T_hourly) (°C)",
      relation: "Higher average temperatures accelerate the photochemical reactions that form ground-level ozone.",
    },
    temperature_min: {
      meaning: "The lowest temperature registered during the day.",
      formula: "T_min = Min(T_hourly) (°C)",
      relation: "Low minimum temperatures can cause temperature inversions, trapping particulate matter near the ground.",
    },
    precipitation: {
      meaning: "The total liquid or solid water falling from clouds, measured as depth.",
      formula: "P_sum = Sum(P_hourly) (mm)",
      relation: "Rain washes out airborne particulate matter and water-soluble gaseous pollutants (wet deposition).",
    },
    windSpeed: {
      meaning: "The average wind speed at 10 meters above the ground over the day.",
      formula: "WS_mean = 1/24 * Sum(WS_hourly) (km/h)",
      relation: "Strong winds disperse pollutants, reducing local concentrations, while calm winds lead to stagnation.",
    },
    humidity: {
      meaning: "The ratio of water vapor in the air compared to the maximum amount the air could hold at that temperature.",
      formula: "RH_mean = 1/24 * Sum(RH_hourly) (%)",
      relation: "High relative humidity facilitates the chemical conversion of gases into secondary PM2.5 particles.",
    },
    pressure: {
      meaning: "The atmospheric pressure exerted by the weight of the air column above the surface.",
      formula: "P_mean = 1/24 * Sum(P_hourly) (hPa)",
      relation: "High-pressure systems indicate stable air masses that trap pollutants, whereas low-pressure brings dispersion.",
    },
    cloudCover: {
      meaning: "The fraction of the sky covered by clouds on average over the day.",
      formula: "CC_mean = 1/24 * Sum(CC_hourly) (%)",
      relation: "Greater cloud cover limits solar radiation, slowing the formation of photochemical pollutants.",
    },
    radiation: {
      meaning: "The total solar energy reaching the surface in the form of shortwave radiation.",
      formula: "Rad_sum = Sum(Rad_hourly) (MJ/m²)",
      relation: "High shortwave radiation drives photochemical processes, increasing ground-level ozone and smog.",
    },
  },
  predictTab: {
    title: "Forecast Tomorrow's Air Quality",
    subtitle: "Retrieves today's real-time meteorological metrics to calculate the predicted AQI for tomorrow.",
    btnText: "Fetch & Predict Tomorrow",
    loadingText: "Retrieving weather data and running model...",
    lastUpdated: "Last updated today at",
    referenceDate: "Reference Date (Today)",
    predictionDate: "Forecast Date (Tomorrow)",
  },
  manualTab: {
    title: "Custom Scenario Simulation",
    subtitle: "Input arbitrary weather metrics to simulate how different conditions affect Jakarta's AQI.",
    btnText: "Simulate & Predict",
    validationError: "Please check that all values are within reasonable limits.",
    fields: {
      aqi: "Current AQI (0 - 500)",
      tempMean: "Avg Temperature (°C)",
      tempMin: "Min Temperature (°C)",
      precip: "Precipitation Sum (mm)",
      wind: "Avg Wind Speed (km/h)",
      humidity: "Avg Relative Humidity (%)",
      pressure: "Avg Surface Pressure (hPa)",
      cloud: "Avg Cloud Cover (%)",
      radiation: "Shortwave Radiation Sum (MJ/m²)",
    },
  },
  historyTab: {
    title: "Historical Meteorological Analysis",
    subtitle: "Select a past date to fetch its actual weather parameters and predict the following day's AQI.",
    btnText: "Analyze Historical Date",
    dateLabel: "Select Date",
    loadingText: "Fetching historical weather records...",
    noData: "No data available for this date. Open-Meteo records go back to 1940 up to 2-3 days ago.",
  },
  results: {
    title: "Prediction Results",
    waiting: "Awaiting Input",
    waitingDesc: "Choose a forecasting mode above and click predict to see results.",
    predictedAqi: "Predicted AQI",
    categoryLabel: "Air Quality Category",
    recommendations: "Health Recommendations",
    error: "Error occurred",
    details: "Details",
  },
  categories: {
    good: "Good",
    moderate: "Moderate",
    unhealthySensitive: "Unhealthy for Sensitive Groups",
    unhealthy: "Unhealthy",
    veryUnhealthy: "Very Unhealthy",
    hazardous: "Hazardous",
  },
  healthTips: {
    good: [
      "Perfect day for outdoor activities.",
      "Open windows to ventilate indoor spaces.",
      "Ideal weather for outdoor exercise and recreation."
    ],
    moderate: [
      "Extremely sensitive individuals should consider reducing heavy outdoor exertion.",
      "General public can still safely enjoy outdoor activities.",
      "Keep an eye on air quality if you have asthma or breathing difficulties."
    ],
    unhealthySensitive: [
      "People with respiratory or heart conditions, children, and elderly should limit outdoor exertion.",
      "Wear a mask (such as N95) if staying outdoors for extended periods.",
      "Run an air purifier indoors to reduce particulate levels."
    ],
    unhealthy: [
      "Everyone should begin to limit outdoor exertion, especially active children and adults.",
      "Wear N95/KF94 masks for any outdoor activities.",
      "Keep windows closed and run air conditioning/purifiers."
    ],
    veryUnhealthy: [
      "Avoid outdoor exertion. Susceptible groups should remain indoors.",
      "Wear high-efficiency masks outdoors for essential travel only.",
      "Seal windows and doors, and keep indoor air purifiers running on high speed."
    ],
    hazardous: [
      "HEALTH ALERT: Everyone should avoid all outdoor physical activity.",
      "Remain indoors in clean, sealed environments.",
      "Run high-efficiency air filtration systems constantly."
    ]
  },
  legend: {
    title: "AQI Scale Reference",
    good: "0-50 (Good)",
    moderate: "51-100 (Moderate)",
    sensitive: "101-150 (Unhealthy - Sensitive)",
    unhealthy: "151-200 (Unhealthy)",
    veryUnhealthy: "201-300 (Very Unhealthy)",
    hazardous: "300+ (Hazardous)",
  },
  chart: {
    title: "7-Day AQI Trend Analysis",
    desc: "Comparison of actual measured AQI levels versus the machine learning model's predicted forecasts over the last 7 days.",
    actual: "Actual AQI",
    predicted: "Predicted AQI",
  },
  footer: {
    builtBy: "Built with ❤️ for AI Project",
    credits: "Powered by Open-Meteo Weather API & Scikit-Learn ML Model",
  }
};
