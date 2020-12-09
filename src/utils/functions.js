export function slugify(Text) {
  return Text.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function toPrice(text) {
  const cleanedText = text.toLowerCase().replace(/[^0-9.]+/g, "");
  const price =cleanedText;
  return parseFloat(price).toFixed(2);
}
