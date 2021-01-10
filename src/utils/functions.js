export function slugify(Text) {
  // return Text.toLowerCase()
  //   .replace(/[^\w ]+/g, "")
  //   .replace(/ +/g, "-");
  return 0;
}

export function toPrice(text) {
  const price = text
    ? text
        .toString()
        .toLowerCase()
        .replace(/[^0-9.]+/g, "")
    : 0.0;

  return parseFloat(price).toFixed(2);
}
export function formatPrice(text) {
  return toPrice(text).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
