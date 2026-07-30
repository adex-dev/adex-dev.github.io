export function mergeTheme(base: any, override: any) {
  const result = { ...base };

  for (const key in override) {
    if (
      typeof override[key] === "object" &&
      override[key] !== null &&
      !Array.isArray(override[key])
    ) {
      result[key] = mergeTheme(result[key] || {}, override[key]);
    } else {
      result[key] = override[key];
    }
  }

  return result;
}