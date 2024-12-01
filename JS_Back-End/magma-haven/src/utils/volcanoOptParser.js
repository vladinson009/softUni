export default function parseOpt(arr, selected) {
  const template = arr.map((el) => {
    if (el == selected) {
      return { value: el, selected: true };
    } else {
      return { value: el, selected: false };
    }
  });
  return template;
}
