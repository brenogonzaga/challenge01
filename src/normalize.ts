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
    unitConversions: {
      g: {
        kg: 1000,
      },
      ml: {
        l: 1000,
      },
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
  tokenLoop: for (let i = 0; i < tokens.length; i++) {
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
        // If a conversion rule exists for this unit, perform conversion if applicable.
        if (config.unitConversions && config.unitConversions[matchedUnit]) {
          const conversionMapping = config.unitConversions[matchedUnit];
          const num = parseFloat(token);
          for (const [targetUnit, factor] of Object.entries(conversionMapping)) {
            if (num >= factor) {
              const converted = num / factor;
              const convertedStr = Number.isInteger(converted)
                ? converted.toString()
                : converted.toFixed(2);
              normalizedTokens.push(`${convertedStr}${targetUnit}`);
              i++;
              continue tokenLoop;
            }
          }
        }
        // If no conversion was triggered, concatenate the original unit.
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
