export default function asBase64ImageURI(file) {
  return (zip) => {
    return zip.file(file).async('base64').then((base64Image) => {
      return `data:image/png;base64,${base64Image}`
    });
  };
}
