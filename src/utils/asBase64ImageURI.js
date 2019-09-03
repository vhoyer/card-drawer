export default function asBase64ImageURI(file) {
  return async (deck) => {
    const base64Image = await deck.file(`${file}.png`).async('base64');

    return `data:image/png;base64,${base64Image}`
  };
}
