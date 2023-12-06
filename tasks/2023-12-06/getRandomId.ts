export function getRandomId() {
  const randomId = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return randomId;
}
