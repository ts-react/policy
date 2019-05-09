export function isString(value: any): boolean {
  return typeof value === 'string';
}

export function isArray(value: any): boolean {
  return Array.isArray(value) || value instanceof Array;
}
