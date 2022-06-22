// A function to be re-used

export default function heroImage(data) {
  const heroImage = `${data?.gallery.find((url) => url)}`;
  return heroImage;
}
