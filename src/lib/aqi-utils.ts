export function getAqiCategory(aqi: number): "good" | "moderate" | "unhealthySensitive" | "unhealthy" | "veryUnhealthy" | "hazardous" {
  if (aqi <= 50) return "good";
  if (aqi <= 100) return "moderate";
  if (aqi <= 150) return "unhealthySensitive";
  if (aqi <= 200) return "unhealthy";
  if (aqi <= 300) return "veryUnhealthy";
  return "hazardous";
}

export function getAqiColor(aqi: number): string {
  if (aqi <= 50) return "#488B52"; // Theme Good
  if (aqi <= 100) return "#C98E34"; // Theme Moderate
  if (aqi <= 150) return "#C66B43"; // Theme Sensitive
  if (aqi <= 200) return "#B23A30"; // Theme Unhealthy
  if (aqi <= 300) return "#7A3580"; // Theme Very Unhealthy
  return "#521F50"; // Theme Hazardous
}

export function getAqiTextColorClass(category: string): string {
  switch (category) {
    case "good":
      return "text-aqi-good-text";
    case "moderate":
      return "text-aqi-moderate-text";
    case "unhealthySensitive":
      return "text-aqi-sensitive-text";
    case "unhealthy":
      return "text-aqi-unhealthy-text";
    case "veryUnhealthy":
      return "text-aqi-very-unhealthy-text";
    case "hazardous":
      return "text-aqi-hazardous-text";
    default:
      return "text-text-primary";
  }
}

export function getAqiBgColorClass(category: string): string {
  switch (category) {
    case "good":
      return "bg-aqi-good/10 text-aqi-good-text border-aqi-good/20";
    case "moderate":
      return "bg-aqi-moderate/10 text-aqi-moderate-text border-aqi-moderate/20";
    case "unhealthySensitive":
      return "bg-aqi-sensitive/10 text-aqi-sensitive-text border-aqi-sensitive/20";
    case "unhealthy":
      return "bg-aqi-unhealthy/10 text-aqi-unhealthy-text border-aqi-unhealthy/20";
    case "veryUnhealthy":
      return "bg-aqi-very-unhealthy/10 text-aqi-very-unhealthy-text border-aqi-very-unhealthy/20";
    case "hazardous":
      return "bg-aqi-hazardous/10 text-aqi-hazardous-text border-aqi-hazardous/20";
    default:
      return "bg-bg-secondary text-text-secondary border-border";
  }
}
