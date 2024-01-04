const VALID_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isValidDate(str) {
  const date = new Date(str);
  return !isNaN(date) && VALID_DATE_PATTERN.test(str);
}

export function isNumeric(str) {
  return typeof str === "string" 
    && !isNaN(str) 
    && !isNaN(parseInt(str));
}
