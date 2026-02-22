// Accent palette: Sky #8ACBE1, Lime #D6FF61, Orange #F97D37
// Chart colors are hues/shades derived from these three accent colors

export const CHART_COLORS = {
  languages: [
    '#8ACBE1', // sky (accent 1)
    '#D6FF61', // lime (accent 2)
    '#F97D37', // orange (accent 3)
    '#5FB0CC', // darker sky
    '#B8E644', // darker lime
    '#FB9E66', // lighter orange
    '#A8D9EB', // lighter sky
    '#E4FF8A', // lighter lime
    '#FDBE99', // much lighter orange
    '#3D96B3', // deep sky
  ],
  primary: '#8ACBE1',
  secondary: '#D6FF61',
  accent: '#F97D37',
};

// For the pie chart: cycle through accent hues
export function getLanguageColor(index: number): string {
  return CHART_COLORS.languages[index % CHART_COLORS.languages.length];
}

// Named color lookup is no longer used — pie chart uses index-based accent hues
export function getLanguageColorByName(_name: string): string {
  // Not used by pie chart anymore, kept for backward compat
  return '#CCCCCC';
}
