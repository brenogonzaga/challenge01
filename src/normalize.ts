import { NormalizeOptions } from "./interfaces";

export function normalizeString(str: string, options: NormalizeOptions = {}): string {
  const defaultOptions: NormalizeOptions = {
    removeAccents: true,
    toLowerCase: true,
    replaceHyphens: true,
    stopwords: ["tipo", "de", "do", "da", "dos", "das", "e"],
    unitMappings: {
      l: ["l", "litro", "litros"],
      kg: ["kg", "quilo", "quilos"],
      g: ["g", "grama", "gramas"],
      ml: ["ml", "mililitro", "mililitros"],
    },
    sortTokens: true,
    synonymMapping: {},
  };

  const config = { ...defaultOptions, ...options };

  let s = str;
  if (config.removeAccents) {
    s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  if (config.toLowerCase) {
    s = s.toLowerCase();
  }
  if (config.replaceHyphens) {
    s = s.replace(/-/g, " ");
  }

  let tokens = s.split(/\s+/).filter((token) => token !== "");

  if (config.stopwords && config.stopwords.length > 0) {
    tokens = tokens.filter((token) => !config.stopwords!.includes(token));
  }

  if (config.synonymMapping) {
    tokens = tokens.map((token) => config.synonymMapping![token] || token);
  }

  const isNumeric = (token: string): boolean => /^\d+(\.\d+)?$/.test(token);

  const normalizedTokens: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (isNumeric(token) && i + 1 < tokens.length) {
      const nextToken = tokens[i + 1];
      let matchedUnit: string | null = null;
      if (config.unitMappings) {
        for (const [unit, aliases] of Object.entries(config.unitMappings)) {
          if (aliases.includes(nextToken)) {
            matchedUnit = unit;
            break;
          }
        }
      }
      if (matchedUnit) {
        normalizedTokens.push(token + matchedUnit);
        i++;
        continue;
      }
    }
    normalizedTokens.push(token);
  }

  if (config.sortTokens) {
    normalizedTokens.sort();
  }

  return normalizedTokens.join(" ");
}
