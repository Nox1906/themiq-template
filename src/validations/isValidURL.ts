export default function isValidURL(url: string) {
  const urlPattern = /^(http|https):\/\/([\w.]+\/?)\S*$/;

  return urlPattern.test(url);
}
