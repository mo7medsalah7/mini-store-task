// A function to be re-used
// This to return the price of product based on label
// label may be USD, EUR, etc

export default function getPrice(data, label = 'USD') {
  const price = data?.prices?.filter((price) => price.currency.label === label);
  return price;
}
