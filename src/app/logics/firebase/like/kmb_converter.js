export function formatNumber(num) {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B"; // Billions
    }
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M"; // Millions
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K"; // Thousands
    }
    return num.toString(); // Less than 1000
  }
  