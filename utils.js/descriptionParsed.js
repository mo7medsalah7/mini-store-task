// The descriptions provided in HTML format should be parsed and presented as HTML, not as plain text

export function parseDescription(data) {
  const el = data?.product?.description;
  const htmlDoc = new DOMParser().parseFromString(el, 'text/html');

  const descriptionWithoutTagName = htmlDoc.body.textContent;
  console.log(descriptionWithoutTagName);
  return descriptionWithoutTagName;
}
