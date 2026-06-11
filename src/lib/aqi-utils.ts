export function getAqiCategory(aqi: number): "good" | "moderate" | "unhealthySensitive" | "unhealthy" | "veryUnhealthy" | "hazardous" {
  if (aqi <= 50) return "good";
  if (aqi <= 100) return "moderate";
  if (aqi <= 150) return "unhealthySensitive";
  if (aqi <= 200) return "unhealthy";
  if (aqi <= 300) return "veryUnhealthy";
  return "hazardous";
}

export function getAqiColor(aqi: number): string {
  if (aqi <= 50) return "#4CAF50"; // Green
  if (aqi <= 100) return "#FFC107"; // Yellow
  if (aqi <= 150) return "#FF9800"; // Orange
  if (aqi <= 200) return "#F44336"; // Red
  if (aqi <= 300) return "#9C27B0"; // Purple
  return "#7B1FA2"; // Deep Purple
}

export function getAqiTextColorClass(category: string): string {
  switch (category) {
    case "good":
      return "text-green-600 dark:text-green-400";
    case "moderate":
      return "text-amber-500 dark:text-amber-400";
    case "unhealthySensitive":
      return "text-orange-500 dark:text-orange-400";
    case "unhealthy":
      return "text-red-500 dark:text-red-400";
    case "veryUnhealthy":
      return "text-purple-600 dark:text-purple-400";
    case "hazardous":
      return "text-purple-800 dark:text-purple-500";
    default:
      return "text-text-primary";
  }
}

export function getAqiBgColorClass(category: string): string {
  switch (category) {
    case "good":
      return "bg-green-500/10 text-green-600 border-green-500/20";
    case "moderate":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    case "unhealthySensitive":
      return "bg-orange-500/10 text-orange-600 border-orange-500/20";
    case "unhealthy":
      return "bg-red-500/10 text-red-600 border-red-500/20";
    case "veryUnhealthy":
      return "bg-purple-500/10 text-purple-600 border-purple-500/20";
    case "hazardous":
      return "bg-purple-800/10 text-purple-700 border-purple-800/20";
    default:
      return "bg-bg-secondary text-text-secondary border-border";
  }
}
